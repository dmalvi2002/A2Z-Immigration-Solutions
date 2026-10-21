# Website enquiries

Google account: `realonlinebump@gmail.com`.

- [Enquiries spreadsheet](https://docs.google.com/spreadsheets/d/1CU6AVc4wV5KcGrqV-3F5GEghUNUCrE76vZXXNA1ckgc/edit)
- [Apps Script project](https://script.google.com/u/7/home/projects/16QR_6q14IZ9cqT9bFhoTL3HJJBj1H-twoTNIQEyPkthJx6mZ_zhbifTT/edit)
- Web app deployment: `AKfycbwmLFeoUe6BTX8vbYB_GCsvlQe0MMHKkE4JLZAJuQgFvns3puN-2c2FiBhE7lwAHuzU`
- Endpoint: `https://script.google.com/macros/s/AKfycbwmLFeoUe6BTX8vbYB_GCsvlQe0MMHKkE4JLZAJuQgFvns3puN-2c2FiBhE7lwAHuzU/exec`

Google authorization, sheet setup, retry trigger, and Web app deployment were
completed on 21 October 2026. Local server environment variables are configured.
The real API handler submitted a labelled test enquiry twice: both requests
returned HTTP 200, exactly one row appeared in the private sheet, and email status
was Sent. A separate Chrome submission through the local contact form also
displayed success, reset the form, and created one row with Sent status.
Two clearly labelled test rows are retained in the sheet. This verifies Google's acceptance of the notification for
`info@a2zimmigrations.co.uk`; inbox delivery has not been inspected.
Production hosting variables and redeployment must be completed before the live
website uses this integration. Use the local `.env.local` server-only values in
the hosting provider's environment settings; never commit the token.

Contact, offers, book-a-call, reusable contact, and free-resource forms use
`utils/submitEnquiry.ts` to submit to `POST /api/enquiries`. The server validates
the fields and forwards them to Apps Script with a server-only token. Only Apps
Script writes to the spreadsheet and sends notifications to
`info@a2zimmigrations.co.uk`. Notifications use the enquirer's email as Reply-To.

The sheet includes received time (Europe/London), name, email, phone, subject,
message, form, consent, and enquiry ID. Page URLs are no longer collected.
Enquiries are saved before email is attempted. Pending notifications are tracked
privately in Script Properties as `PENDING_<enquiry ID>` and retry every 10 minutes;
there is no email-status column. Google account email quotas still apply.
A saved enquiry returns success even when notification delivery is delayed.
The schema migration preserves pending retries before removing the old Page and
Email status columns from existing rows.

Repeated submissions with the same enquiry ID return success without another row
or email. The browser reuses IDs for matching enquiries for 10 minutes, including
after a network timeout. Apps Script enforces at most five new enquiries per client
in 10 minutes under a script lock, shared by all website instances. Limits persist
in Script Properties and use keyed IP hashes; raw IPs are not stored in Sheets.
The website host must overwrite `X-Forwarded-For`/`X-Real-IP` with trusted client
addresses. Requests without these headers share a fallback limit. Cross-origin
browser submissions, oversized fields, invalid email addresses, and missing required
consent are rejected by the server. Keep existing hosting-level bot controls enabled.

## Configuration and deployment

1. Copy `scripts/google-apps-script/Code.gs` into the Apps Script project. Replace
   `REPLACE_WITH_SERVER_TOKEN` with the server's `GOOGLE_SCRIPT_TOKEN` value before
   running `setup`. Never commit that value.
2. Run `setup` once and authorize spreadsheet access, email sending, and trigger
   management. This creates/formats the Enquiries tab and installs the retry trigger.
3. Deploy as a Web app, executing as the owner, accessible to Anyone. The handler
   requires the secret token to accept writes; GET only reports service health and
   never returns enquiry records. Keep the spreadsheet itself private.
4. Set `GOOGLE_SCRIPT_URL` to the deployment's `/exec` URL and set
   `GOOGLE_SCRIPT_TOKEN` in the website hosting environment as server-only variables.
   The local `.env.local` contains the locally configured token. Redeploy/restart
   the website after changing environment variables.
5. Submit a clearly labelled test enquiry through the website and verify its row
   and receipt at the notification inbox. For failed delivery, inspect Apps Script
   execution logs and private `PENDING_` script properties.

Later Apps Script changes require updating the existing deployment to a new
version. Keep its URL unchanged. Avoid running setup with the placeholder token;
it overwrites the ENQUIRY_TOKEN property.

## Verification

Run `node --test tests/enquiries.test.cjs` and `npm run typecheck`.

Local code changes alone do not update the production website. Google authorization,
Web app deployment, hosting configuration, and a successful end-to-end test must
all be completed before this integration is live.
