const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function scriptHarness({ mailFails = false, initialRows = [] } = {}) {
  const rows = initialRows.map(row => [...row]);
  const emails = [];
  const properties = { ENQUIRY_TOKEN: 'test-token' };
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: row => rows.push(row),
    deleteColumn: col => rows.forEach(row => row.splice(col - 1, 1)),
    getDataRange: () => ({ getValues: () => rows }),
    getRange: (row, col) => ({
      getValue: () => rows[row - 1]?.[col - 1],
      setValue: value => { rows[row - 1][col - 1] = value; },
      createTextFinder: value => ({ matchEntireCell: () => ({ findNext: () => rows.slice(1).find(r => r[col - 1] === value) || null }) }),
    }),
  };
  const lock = { waitLock() {}, tryLock: () => true, hasLock: () => true, releaseLock() {} };
  const context = vm.createContext({
    console: { error() {} },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: key => properties[key],
      getProperties: () => ({ ...properties }),
      setProperty: (key, value) => { properties[key] = value; },
      deleteProperty: key => { delete properties[key]; },
    }) },
    LockService: { getScriptLock: () => lock },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
    MailApp: { getRemainingDailyQuota: () => 10, sendEmail: data => {
      if (mailFails) throw new Error('Mail unavailable');
      emails.push(data);
    } },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
  });
  vm.runInContext(fs.readFileSync('scripts/google-apps-script/Code.gs', 'utf8'), context);
  return { context, rows, emails, properties, recoverMail: () => { mailFails = false; } };
}
const enquiry = { token: 'test-token', requestId: '12345678-1234-1234-1234-123456789012', rateKey: 'a'.repeat(64), name: 'Test enquiry', email: 'test@example.com', number: '+447000000000', message: '=DANGEROUS()', source: 'Contact page', consent: true };

test('Apps Script saves text safely and emails the configured recipient', () => {
  const h = scriptHarness();
  const result = h.context.doPost({ postData: { contents: JSON.stringify(enquiry) } });
  assert.equal(result.result, 'success');
  assert.equal(h.rows.length, 2);
  assert.equal(h.rows[1][5], "'=DANGEROUS()");
  assert.equal(h.rows[1][3], "'+447000000000");
  assert.equal(h.rows[1].length, 9);
  assert.equal(h.properties['PENDING_' + enquiry.requestId], undefined);
  assert.equal(h.emails[0].to, 'info@a2zimmigrations.co.uk');
  assert.equal(h.emails[0].replyTo, 'test@example.com');
});

test('Apps Script rejects unauthorized writes without saving or emailing', () => {
  const h = scriptHarness();
  const result = h.context.doPost({ postData: { contents: JSON.stringify({ ...enquiry, token: 'wrong' }) } });
  assert.equal(result.result, 'error');
  assert.equal(h.rows.length, 0);
  assert.equal(h.emails.length, 0);
});

test('mail failure preserves enquiry and retry sends it once', () => {
  const h = scriptHarness({ mailFails: true });
  assert.equal(h.context.doPost({ postData: { contents: JSON.stringify(enquiry) } }).result, 'success');
  assert.equal(h.properties['PENDING_' + enquiry.requestId], '1');
  h.recoverMail();
  h.context.retryNotifications();
  h.context.retryNotifications();
  assert.equal(h.properties['PENDING_' + enquiry.requestId], undefined);
  assert.equal(h.emails.length, 1);
});

function apiHarness(result = { result: 'success' }) {
  const calls = [];
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync('app/api/enquiries/route.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = vm.createContext({
    exports, AbortSignal, URL,
    process: { env: { GOOGLE_SCRIPT_URL: 'https://script.google.com/test/exec', GOOGLE_SCRIPT_TOKEN: 'server-secret' } },
    require: name => {
      if (name === 'node:crypto') return require(name);
      assert.equal(name, 'next/server');
      return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    },
    fetch: async (url, options) => { calls.push({ url, ...options }); return { ok: true, json: async () => result }; },
  });
  vm.runInContext(code, context);
  return { post: (data, headers = {}) => exports.POST({
    url: 'https://example.com/api/enquiries',
    headers: new Headers(headers),
    text: async () => JSON.stringify(data),
  }), calls };
}

test('API validates fields and consent before contacting Google', async () => {
  const h = apiHarness();
  assert.equal((await h.post({ ...enquiry, email: 'invalid' })).status, 400);
  assert.equal((await h.post({ ...enquiry, consent: false })).status, 400);
  assert.equal((await h.post({ ...enquiry, message: 'x'.repeat(8001) })).status, 400);
  assert.equal(h.calls.length, 0);
});

test('API adds server credential and never returns it to the browser', async () => {
  const h = apiHarness();
  const response = await h.post({ ...enquiry, token: 'attacker-value' });
  assert.equal(response.status, 200);
  assert.equal(JSON.parse(h.calls[0].body).token, 'server-secret');
  assert.deepEqual(JSON.parse(JSON.stringify(response.body)), { result: 'success' });
});

test('API does not report success when Google rejects the write', async () => {
  const h = apiHarness({ result: 'error' });
  assert.equal((await h.post(enquiry)).status, 502);
});

test('duplicate request ID creates one sheet row and one notification', () => {
  const h = scriptHarness();
  for (let i = 0; i < 3; i++) {
    assert.equal(h.context.doPost({ postData: { contents: JSON.stringify(enquiry) } }).result, 'success');
  }
  assert.equal(h.rows.length, 2);
  assert.equal(h.emails.length, 1);
});

test('sixth new enquiry from one client is limited, and duplicates still succeed', () => {
  const h = scriptHarness();
  for (let i = 0; i < 6; i++) {
    const data = { ...enquiry, requestId: `12345678-1234-1234-1234-12345678901${i}` };
    const result = h.context.doPost({ postData: { contents: JSON.stringify(data) } });
    assert.equal(result.result, i < 5 ? 'success' : 'error');
    if (i === 5) assert.equal(result.error, 'Rate limit exceeded');
  }
  assert.equal(h.rows.length, 6);
  assert.equal(h.emails.length, 5);
  assert.equal(h.context.doPost({ postData: { contents: JSON.stringify(enquiry) } }).result, 'success');
});

test('API rejects cross-origin submissions and maps rate limits to 429', async () => {
  const h = apiHarness({ result: 'error', error: 'Rate limit exceeded' });
  assert.equal((await h.post(enquiry, { origin: 'https://other.example' })).status, 403);
  assert.equal(h.calls.length, 0);
  assert.equal((await h.post(enquiry, { origin: 'https://example.com', 'x-forwarded-for': '192.0.2.1' })).status, 429);
  const forwarded = JSON.parse(h.calls[0].body);
  assert.match(forwarded.rateKey, /^[a-f0-9]{64}$/);
  assert.equal(h.calls[0].body.includes('192.0.2.1'), false);
});

test('API accepts same-host browser requests when Next normalizes the internal URL', async () => {
  const h = apiHarness();
  assert.equal((await h.post(enquiry, { origin: 'https://a2zimmigrations.co.uk', host: 'a2zimmigrations.co.uk' })).status, 200);
});

test('old columns are removed without losing enquiries or pending mail retries', () => {
  const h = scriptHarness({ initialRows: [
    ['Received (UK time)', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Form', 'Page', 'Consent', 'Email status', 'Enquiry ID'],
    [new Date(), 'Existing enquiry', 'test@example.com', '', '', 'Existing message', 'Contact page', 'https://example.com', 'Yes', 'Pending', enquiry.requestId],
  ] });
  h.context.getEnquirySheet();
  h.context.getEnquirySheet();
  assert.deepEqual(h.rows[0], ['Received (UK time)', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Form', 'Consent', 'Enquiry ID']);
  assert.equal(h.rows[1][7], 'Yes');
  assert.equal(h.rows[1][8], enquiry.requestId);
  h.context.retryNotifications();
  assert.equal(h.emails.length, 1);
  assert.equal(h.properties['PENDING_' + enquiry.requestId], undefined);
  assert.equal(h.emails[0].body.includes('Page:'), false);
});
