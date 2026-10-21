// Paste into the Apps Script project linked in docs/enquiry-integration.md.
const SPREADSHEET_ID = '1CU6AVc4wV5KcGrqV-3F5GEghUNUCrE76vZXXNA1ckgc';
const NOTIFICATION_EMAIL = 'info@a2zimmigrations.co.uk';
const HEADERS = ['Received (UK time)', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Form', 'Consent', 'Enquiry ID'];

function setup() {
  // Replace before running setup; use the same value as server-only GOOGLE_SCRIPT_TOKEN.
  PropertiesService.getScriptProperties().setProperty('ENQUIRY_TOKEN', 'REPLACE_WITH_SERVER_TOKEN');
  const sheet = getEnquirySheet();
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0369a1').setFontColor('#ffffff');
  sheet.setColumnWidths(1, HEADERS.length, 180);
  sheet.setColumnWidth(6, 400);
  sheet.getRange('A:A').setNumberFormat('dd MMM yyyy HH:mm:ss');
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
  SpreadsheetApp.openById(SPREADSHEET_ID).setSpreadsheetTimeZone('Europe/London');
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'retryNotifications')) {
    ScriptApp.newTrigger('retryNotifications').timeBased().everyMinutes(10).create();
  }
}

function getEnquirySheet() {
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = book.getSheetByName('Enquiries');
  if (!sheet) {
    sheet = book.getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.setName('Enquiries');
    else sheet = book.insertSheet('Enquiries');
  }
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  // Upgrade the previous layout while preserving any pending notification retries.
  if (sheet.getRange(1, 10).getValue() === 'Email status') {
    const properties = PropertiesService.getScriptProperties();
    const rows = sheet.getDataRange().getValues();
    rows.slice(1).forEach(row => {
      if (row[9] === 'Pending' && row[10]) properties.setProperty('PENDING_' + row[10], '1');
    });
    sheet.deleteColumn(10);
  }
  if (sheet.getRange(1, 8).getValue() === 'Page') sheet.deleteColumn(8);
  return sheet;
}

function doGet() {
  return json({ service: 'A2Z enquiry integration', result: 'ready' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(e.postData.contents);
    const token = PropertiesService.getScriptProperties().getProperty('ENQUIRY_TOKEN');
    if (!token || data.token !== token) return json({ result: 'error', error: 'Unauthorized' });
    if (typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return json({ result: 'error', error: 'Invalid email' });
    }
    if (!/^[a-f0-9-]{36}$/i.test(data.requestId || '') || !/^[a-f0-9]{64}$/i.test(data.rateKey || '')) {
      return json({ result: 'error', error: 'Invalid request' });
    }
    const limits = { name: 200, email: 254, number: 50, subject: 300, message: 8000, source: 100 };
    for (const key in limits) {
      if (data[key] != null && (typeof data[key] !== 'string' || data[key].length > limits[key])) {
        return json({ result: 'error', error: 'Invalid fields' });
      }
    }
    lock.waitLock(20000);
    const sheet = getEnquirySheet();
    // IDs are persisted in the sheet, so retries cannot insert another enquiry.
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 9, sheet.getLastRow() - 1, 1)
      .createTextFinder(data.requestId).matchEntireCell(true).findNext()) {
      return json({ result: 'success' });
    }
    // Persist timestamps in Script Properties so limits survive cache eviction
    // and apply across all website server instances. Bound storage to 500 clients.
    const properties = PropertiesService.getScriptProperties();
    const now = Date.now();
    const rateProperty = 'RATE_' + data.rateKey;
    const all = properties.getProperties();
    let activeClients = 0;
    for (const key in all) {
      if (key.indexOf('RATE_') !== 0) continue;
      const timestamps = JSON.parse(all[key]).filter(t => now - t < 600000);
      if (!timestamps.length) properties.deleteProperty(key);
      else activeClients++;
    }
    const recent = JSON.parse(all[rateProperty] || '[]').filter(t => now - t < 600000);
    if (recent.length >= 5 || (!recent.length && activeClients >= 500)) {
      return json({ result: 'error', error: 'Rate limit exceeded' });
    }
    properties.setProperty(rateProperty, JSON.stringify(recent.concat(now)));
    const row = [new Date(), data.name, data.email, data.number, data.subject, data.message, data.source, data.consent ? 'Yes' : 'Not requested', data.requestId];
    const pendingKey = 'PENDING_' + data.requestId;
    properties.setProperty(pendingKey, '1');
    sheet.appendRow(row.map((value, index) => index === 0 ? value : safeCell(value)));
    SpreadsheetApp.flush();
    try {
      notify(row);
      properties.deleteProperty(pendingKey);
    } catch (error) {
      // The enquiry is safely stored. The scheduled trigger retries the email.
      console.error('Notification pending; will retry.');
    }
    return json({ result: 'success' });
  } catch (error) {
    return json({ result: 'error', error: 'Unable to save enquiry' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function retryNotifications() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    const sheet = getEnquirySheet();
    const rows = sheet.getDataRange().getValues();
    const properties = PropertiesService.getScriptProperties();
    for (let i = 1; i < rows.length; i++) {
      const pendingKey = 'PENDING_' + rows[i][8];
      if (!properties.getProperty(pendingKey)) continue;
      if (MailApp.getRemainingDailyQuota() < 1) break;
      try {
        notify(rows[i]);
        properties.deleteProperty(pendingKey);
      } catch (error) { console.error('Notification retry failed.'); }
    }
  } finally { lock.releaseLock(); }
}

function notify(row) {
  const text = HEADERS.slice(0, 8).map((header, i) => header + ': ' + row[i]).join('\n\n');
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    replyTo: String(row[2]).replace(/^'/, ''),
    subject: 'New A2Z website enquiry — ' + String(row[6] || 'Website').replace(/[\r\n]/g, ' '),
    body: text + '\n\nView enquiries: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit',
    name: 'A2Z Immigration Solutions',
  });
}

function safeCell(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
