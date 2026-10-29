# Live Sanity SEO verification — 29 October 2026

## Outcome

Tested the deployed Studio at https://www.a2zimmigrations.co.uk/studio using the user's logged-in Chrome session. For every fixed page, published temporary SEO overrides, opened the matching public page, checked the rendered metadata, cleared the overrides, published again and verified that the original metadata returned. The final independent HTTP audit completed at **2026-10-29 13:38 UTC**.

All 13 pages passed. All returned HTTP 200 after restoration. The sitemap returned HTTP 200 and included all 13 fixed page URLs. No temporary SEO values remained in the published page settings or returned page HTML.

## What was tested on every page

- SEO title and meta description appeared in the live page's document metadata.
- Open Graph and Twitter titles/descriptions matched those overrides.
- The normal canonical URL and robots setting remained unchanged during the basic test.
- Custom WebPage JSON-LD appeared in the public HTML.
- Clearing the overrides and publishing restored the original title, description, social titles/descriptions, canonical and robots metadata.

Focus keyword text was entered as a planning note; public-output checks found no emitted test keyword or meta-keywords tag. No keyword scoring or content analysis is implemented or claimed.

| Page | Live route | Publish, live output and restoration |
| --- | --- | --- |
| Home | `/` | Passed |
| About Us | `/about-us` | Passed |
| Sponsor Licence | `/services/sponsor-licence` | Passed |
| Skilled Worker Visa | `/services/skilled-worker-visa` | Passed |
| Compliance | `/services/compliance` | Passed |
| Other Services | `/services/other-services` | Passed |
| Get in touch | `/get-in-touch` | Passed |
| Our Clients | `/our-clients` | Passed |
| Resources | `/resources` | Passed |
| Calculator | `/calculator` | Passed |
| Offers | `/offers` | Passed |
| Terms | `/terms` | Passed |
| Privacy Policy | `/privacy-policy` | Passed |

Example temporary homepage title: `UK Immigration Support | A2Z`. Each page received a relevant temporary title and description. Custom JSON-LD used a page-specific `#cms-verification-20261029` identifier. These test values were removed after verification.

## Advanced fields: live Privacy Policy test

1. Selected the existing `Small Logo.png` asset as the social image and supplied a page-specific image description. Published and verified the live Open Graph/Twitter image URLs and Open Graph image description. No asset was uploaded or edited.
2. Set a temporary canonical URL ending in `?source=cms-check`. Published and verified the live canonical and Open Graph URL. Verified the normal Privacy Policy URL was excluded from the live sitemap while this override was active.
3. Cleared the canonical override and enabled noindex. Published and verified the normal canonical URL, `noindex, follow` robots metadata and sitemap exclusion.
4. Cleared the image reference and image description, disabled noindex and published restoration. Verified the original metadata, absence of the temporary social image, `index, follow` and restoration of the Privacy Policy URL in the sitemap.

These checks prove that published changes reached the live domain and sitemap during the test. They do not measure an exact cache propagation guarantee or exercise every possible webhook failure.

## Demo cleanup and existing content

Deleted the draft titled **DEMO — CMS Field Test — 29 October 2026 (Do Not Publish)** through Studio's Delete action. Verified the confirmation: **The document was successfully deleted**.

- Deleted document ID: `0851980c-aa26-4f3d-af29-5f14f4d65712`.
- Slug: `demo-cms-field-test-2026-10-29`.
- Final public URL: HTTP **404**.
- Final published query: **0** matching demo posts.
- Final sitemap: no demo URL.
- Published post count remained **52**.

Existing published articles and their shared author, category, image and table records were not edited in this follow-up. The deleted demo had only referenced existing shared records; deleting it did not delete those records.

The page tests created the 13 normal fixed Page settings documents, which remain available for editors. Their optional SEO overrides are cleared and noindex is false. The original public metadata was restored; the dataset is not claimed to be byte-identical to its initial state.

## Why the SEO fields can be blank

The Studio fields are optional overrides. Blank fields do not mean the website has no title or description. The live website falls back to the project's existing defaults, which these tests confirmed.

Those existing defaults are basic: for example, the homepage description is `A2Z Immigration`, and About Us currently falls back to the existing text `A2Z Immgiants`. They were preserved, including that spelling, during restoration. The editor can now publish more useful page-specific descriptions from Studio. Passing the integration checks does not mean the existing wording is already optimized.

## Remaining deployment and test limits

Two local Studio improvements from the earlier browser checks still require the normal website deployment:

- Open Portable Text link editing in a dialog to avoid the deployed link-popover crash.
- Show `Website & blog settings` as the Settings pane title.

The page SEO integration tested here is already deployed. No deployment was performed during these live content tests. Earlier local verification passed TypeScript, six CMS regression tests, schema extraction, scoped ESLint and the production build; this follow-up changed test documentation only.

Global settings were inspected but were not all changed and published. Blog fields were exercised using the now-deleted draft, with validation and reload checks; a full published blog lifecycle was not performed. This report does not certify every global setting or every browser/extension combination as error-free.

## Local evidence

Machine-readable evidence is stored in the ignored `.cache/cms-live-test/` folder:

- `live-baselines.json`: original metadata for all 13 pages.
- `results.json`: individual publication and restoration observations.
- `privacy-canonical-social.json`, `privacy-noindex.json`, `privacy-restored.json`: advanced-field observations.
- `final-audit.json`: final live HTTP, sitemap, published-data and cleanup audit.
- `home-published-studio.jpg`: temporary homepage SEO values in Studio.
- `home-restored-public.jpg`: public homepage after restoration.

These files are local evidence, not website assets and not part of a deployment.
