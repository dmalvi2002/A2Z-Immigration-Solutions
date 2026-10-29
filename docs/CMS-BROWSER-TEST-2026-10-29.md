# Sanity browser acceptance checks — 29 October 2026

Tested through the user's logged-in Chrome session at the deployed `/studio`. Created one demonstration post draft, not a published article. Existing articles, author/category records, shared tables and global settings were not edited.

**Follow-up completed:** the demo draft has now been deleted through Studio, with the successful-deletion confirmation verified. All 13 fixed pages subsequently received real publish-and-verify SEO tests on the live domain, followed by restoration. See [live SEO verification](CMS-LIVE-SEO-VERIFICATION-2026-10-29.md). The draft-only limitations below describe the earlier phase, not the completed page SEO follow-up.

## Demo draft

- Title: **DEMO — CMS Field Test — 29 October 2026 (Do Not Publish)**
- Studio: https://www.a2zimmigrations.co.uk/studio/structure/post;0851980c-aa26-4f3d-af29-5f14f4d65712
- Document ID: `0851980c-aa26-4f3d-af29-5f14f4d65712` (draft only).
- Slug: `demo-cms-field-test-2026-10-29`.
- Content is explicitly labelled as a CMS demonstration, not immigration advice.
- Reused an existing image, author, category and table through their pickers; no asset upload or shared-record edits were needed.

## Checks exercised by writing to the demo

| Field/workflow | Result |
| --- | --- |
| Visible title and excerpt | Entered, autosaved and retained after reload. |
| Author reference | Existing A2Z Immigration author selected. |
| Category reference | Existing Skilled Worker Visa category selected. |
| Featured image and alt text | Existing image selected; per-post alt text entered and saved. |
| Article text | Multiple paragraphs and H2 heading saved. |
| Inline table | Existing `Testiing table` reference inserted, with a demo caption. Shared table unchanged. |
| Inline image and alt text | Existing image inserted into the body with its own description. |
| Slug generation | Generated from title, then replaced with the deliberate demo slug. |
| Duplicate slug | Temporarily used an existing slug: **Slug is already in use** appeared and Publish was disabled. Restored unique demo slug. |
| Publication date | Entered `2026-10-29 12:00` in the date field and verified it remained saved. No scheduling claim or scheduling test. |
| SEO title/description | Entered; preview and character counts updated. |
| SEO length warnings | A 97-character title and 199-character description produced the configured warnings. Replaced with valid 41/145-character examples. |
| Focus keyword | Planning text saved; no analysis/score claimed. |
| Social image and description | Separate social-image selection and description saved. |
| Canonical URL validation | `not-a-valid-url` was rejected and Publish disabled. Replaced with the full demo URL. |
| Noindex | Checked and retained after reload. This is an additional precaution, not what makes the draft private. |
| Custom JSON-LD | Broken JSON was rejected and Publish disabled. Replaced with a valid WebPage example. |
| Reload persistence | Draft reopened from the deployed Studio with saved SEO, images, references, date, canonical, noindex and JSON-LD. |
| Publish action | Never clicked. A valid draft showed Publish available; invalid values disabled it. Actual publication/unpublication was not tested. |

## Real issue found: Portable Text link editing

The deployed Studio crashed when creating/editing a link annotation:

`TypeError: t.getAttribute is not a function`

This matches the [upstream Sanity issue #9391](https://github.com/sanity-io/sanity/issues/9391). [Upstream fix #9571](https://github.com/sanity-io/sanity/pull/9571) identifies the old popover's `FocusLock as={Fragment}` incompatibility with newer React implementations. The installed Sanity 3.81.0 source contains that affected code.

Prepared a focused schema workaround: `options: {modal: {type: 'dialog'}}` on the existing `link` annotation. It changes only the Studio editing surface, not stored field names, links or the public renderer. No package upgrade or content migration.

Tested the fix in a logged-in local Studio against this same demo draft: opened an existing annotation, entered a URL, removed an annotation, created a new annotation, entered the contact-page URL and saved. The link dialog no longer crashed. These edits were limited to the demo draft.

**The live Studio still needs a deployment of this code before the link fix is available there.** A local pass is not a deployed pass.

Other browser console observations: the original live text-entry sequence logged React error #185; it did not recur in the subsequent local link/inline-image checks. Local development also logged a hydration attribute warning showing Grammarly-injected body attributes. Do not treat these observations as proof that every browser/extension combination is error-free.

Also corrected the new Settings pane's “Untitled” label with an explicit **Website & blog settings** document-pane title. Verified that title locally, without editing or publishing settings.

## Inspected without changing shared content

- Pages menu and fixed service-page mapping.
- Read-only page name, visible heading/introduction fields and tab separation.
- Page SEO preview using its actual code defaults.
- Advanced canonical/noindex/JSON-LD fields and collapsed initial state.
- Shared Settings content/SEO tabs: archive heading/intro, posts per page, related-post switch, website name, default description/image and archive SEO.

These shared controls were inspected, not all written/published. A production end-to-end test of each page override or global option would require intentional content changes and publication; it was not performed silently.

## Public website checks

- Published-only Sanity query returns **no demo document**.
- Demo public URL returns **404**.
- Live `/sitemap.xml` returns **200** and excludes the demo slug.
- Published dataset currently has **52 posts**; the draft is not counted by the published perspective.
- Existing `/blog/skilled-worker-dependant-visa-uk` returns **200**, its actual article title, a canonical link and BlogPosting JSON-LD. The previous integration has reached the public site; older deployment observations in earlier notes are historical.

## Local verification of the source changes

- TypeScript: passed.
- Six CMS regression tests: passed.
- Sanity schema extraction: passed.
- ESLint on the two changed Studio files: passed.
- Production build: passed.
- Local Turbopack development initially failed in its CSS worker before Studio loaded. Retried with Next's supported `--webpack` development option for the browser test. The final normal Turbopack production build passed; the package scripts were not changed.

Historical screenshot: ignored local artifact `.cache/cms-browser-test/demo-draft-seo.jpg`. The demo has since been deleted; its old Studio link above is retained only as an audit identifier.
