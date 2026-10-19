# A2Z Sanity editing and SEO integration

The simplified dark editor guide is saved outside the repository at `C:\Users\ABU BAKAR\Desktop\my father doc\A2Z - Sanity Editor Handbook.html`. The public HTML route and Studio handbook tool were removed at the user's request. The standalone guide covers everyday editing, examples, field explanations, publishing and troubleshooting. Developer notes remain here.

## Existing project inspected

- Next.js 16.2.9 App Router, React 18, TypeScript, Tailwind and embedded Sanity 3.81.0.
- Thirteen fixed website pages, blog archive/category routes, individual post route, client-side blog widgets, Portable Text, inline table references and legacy `dataTables` references.
- Existing Sanity project `ztfniri3`, dataset `production`. Read-only audit: **51 posts, 9 categories, 2 authors, 4 reusable tables**. No missing post slugs/bodies or duplicate post slugs. Two posts contain inline tables; one has legacy table references. No posts had the new `seo` object; only five had featured-image alt text.
- No existing Sanity documents were mutated. No content migration, slug regeneration, document recreation or bulk publication was performed.

## Implementation

- Preserves all existing document type and field names. Optional `seo` object added to Posts, Categories and fixed Page settings. Existing Portable Text and legacy tables remain supported.
- Content, SEO & social sharing and Publishing groups, plain labels/examples, illustrative snippet preview and character counts. Focus keyword is planning only; no analysis or score is claimed or emitted.
- Collapsed advanced SEO fieldset: canonical override, noindex and custom JSON-LD with JSON validation and script-safe serialization.
- Pages menu maps deterministic `page-*` IDs to existing routes. About Us and four service pages expose optional heading/introduction overrides through `PageData` → `PageContentProvider` → `PageText`. Original children remain the fallback, including existing markup/line breaks.
- Other page body sections stay in code; their Studio settings expose only SEO. This deliberately avoids fields disconnected from the actual implementation. Fixed-page editor names/paths are read-only. Page/Settings duplicate, delete and unpublish actions are hidden in Studio.
- `site-settings` controls archive heading/intro, posts per page (1–50), related-post display, social site name, default description/image and archive SEO. There is no arbitrary permalink, tag, menu, comment or scheduled-publication setting.
- All post content and first-page archive cards render on the server. Existing article/archive components retain their presentation. `/blog` redirects permanently to `/blog/category/show-all`. Missing published posts/categories return 404; outages propagate errors with a retry screen. Unrelated demo content is removed from the article data path.
- Server root layouts own HTML/body. Interactive website providers/widgets remain in `SiteShell`; unrelated Redux login initialisation is removed from the Studio layout. Removes the fake ambient `sanity/structure` typings, renames the local structure module to `deskStructure.ts` to avoid shadowing the package, and lets package exports provide real types.
- Per-document title, description, canonical, robots, Open Graph and Twitter metadata. Legacy absent fields projected by GROQ as `null` are explicitly handled. Social image order: SEO image, valid post image, valid global image. BlogPosting JSON-LD is automatic; custom JSON-LD is additive.
- Dynamic sitemap includes indexable fixed routes, posts, category archives and main archive; excludes noindex and external-canonical URLs, Studio and redirect routes. Robots advertises sitemap and disallows Studio/API; Studio separately emits noindex.

## Publishing/cache contract

`client.ts`: `perspective: 'published'`, `useCdn: false`, `fetch: {cache: 'no-store'}`. Content routes render on demand, as verified in the production build route table; sitemap is explicitly dynamic. No persistent Next data cache, CDN invalidation or webhook dependency. Refresh the public page after publication. External proxy/browser/router/search/social caches remain separate. Higher Sanity API traffic is the tradeoff; monitor usage before considering a cache/webhook architecture.

Publication date controls display and ordering only. It is not a scheduling gate. Draft-preview mode, timed publishing and editorial approval stages are not implemented. New posts require title/slug; existing dated/undated posts retain their data. References should be published before their parent post.

## Validation on 20 October 2026 (Asia/Dhaka)

- `npx sanity schema extract --path .cache/schema.json`: passed.
- `npm run typecheck`: passed.
- `npm run test:cms`: passed (metadata defaults/null legacy fields, overrides, sitemap indexing policy, social fallback, JSON-LD escaping, legacy card fields and table mapper compatibility).
- `npm run build`: passed. Existing Google font download needs network access. Warnings remain for deprecated `images.domains` and old Browserslist data.
- `npm run audit:cms`: passed; ignored `.cache/cms-audit.json` stores the inspectable read-only result.
- `node scripts/smoke-cms.cjs` against the production build: **all 51 post URLs, 9 category archives and 13 fixed pages passed**, including server search titles/descriptions/canonical tags, article JSON-LD with actual headline, inline/legacy table rendering, sitemap, robots, archive server cards, missing post/category 404s, 308 blog redirect and Studio noindex.
- `npm run lint`: runs after replacing obsolete `next lint`. **67 pre-existing errors and 24 warnings**; compared errors to original HEAD source through the same ESLint configuration: **zero new lint errors**. Most errors are unescaped JSX punctuation. The lint configuration has not been weakened to hide these issues.
- Handbook visually reviewed in the local browser: white background, system fonts, navigation, readable layout and simple diagrams. Responsive CSS and print styles included.
- Authenticated Studio editing/publishing was **not exercised**: the local browser reached Sanity's CORS setup dialog for `http://localhost:3100`. Schema extraction and build passed, but account-level access must be completed before the editor acceptance test. No live content was published just to test the UI.

## Account/deployment handoff

1. Back up the production dataset using your authenticated Sanity CLI/account.
2. Deploy this Next.js source to the existing hosting project. Embedded Studio is bundled in the app. Update any separately hosted Studio with these same schemas if one exists.
3. Retain the existing Sanity project/dataset; see `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the real public origin, including the intended www choice. Canonicals/sitemap must use the deployed origin, never localhost or a staging domain.
4. In Sanity Manage → API → CORS origins, allow the actual website/embedded Studio origin and your development origin if needed. The test browser specifically requires `http://localhost:3100`. Use your organisation's normal origin/credential policy for Studio login.
5. Invite the SEO editor with appropriate publishing permissions in Sanity project members. Authors are not accounts. The existing public dataset is read without a token; do not add public write tokens. A private dataset requires a separate server-only read design.
6. Open `/studio`, verify menus/preview/advanced collapse, make an intentional change on one selected document, Publish, then refresh its public URL and inspect metadata. Check a draft change does not appear until Publish. This account-level acceptance test remains to be completed.
7. Publish initial Settings/Page overrides only as desired; old blogs work without filling new fields. Review existing alt text gradually. Keep current slugs or add deliberate redirects before changes.
8. Verify deployed sitemap/robots and submit the sitemap in the owner's Search Console account as appropriate. No webhook, purge token or scheduler needs provisioning.

Rollback is a code deployment revert; optional new fields can remain in Sanity and will be ignored by older code. For content mistakes, use available document history rather than restoring the entire dataset over newer edits.

## Follow-up verification and guide changes

- The editor guide was rewritten in simpler English, switched to a dark theme and moved to the Desktop location above. Its developer setup section was removed. The public guide HTML and the Studio handbook tool were removed from the source.
- Page document panes now have an explicit title and a preview fallback based on their fixed document ID, avoiding the confusing “Untitled” label. The page SEO preview now shows its actual code defaults and explains that empty SEO fields use those defaults.
- A read-only published-data query found no published `page` SEO override documents. This does not mean page metadata is empty: `pageMetadata()` falls back to the registry values. It does not inspect private drafts.
- Public-domain check of `https://www.a2zimmigrations.co.uk` found the older deployment: home description “Find the best”, Skilled Worker Visa title “Skilled Worker Visa Page - A2Z”, a sample blog title “Blog Post | A2Z Consultation” and no BlogPosting JSON-LD. `/sitemap.xml` returned 404. `/studio` itself returned 200. The new repository integration must be deployed before its metadata, sitemap and Studio changes can be relied on at the public domain. A working Studio on localhost is not evidence of a production deployment.
- No content was published or changed in Sanity during these checks.
