# Skilled Worker occupation finder

The finder has a dedicated page at /soc-code-finder, linked from the Free Stuff dropdown and the Skilled Worker hero CTA. Each of the 412 occupations has a server-rendered detail URL under /services/skilled-worker-visa/occupations/{code}, included in the sitemap.

## Quick manual updates

Edit data/skilled-worker-occupations.json. Search for the four-digit code and update title, relatedTitles, skillLevel, standardRate or lowerRate. Rates are display strings and can include annual and hourly figures on separate lines. Use null when no published rate is available; never substitute zero. Update reviewedAt (YYYY-MM-DD). generalThreshold controls the general salary figure across both views. sources stores the official reference links. Commit and redeploy through the normal website workflow; editing a local file does not change the live website.

A simple amount correction is a small data edit. A change to eligibility rules, categories or salary exceptions also requires reviewing utils/skilled-worker.ts and the explanatory copy in the finder and detail page. Medium Skilled intentionally means conditional, not an automatic eligibility decision. This version does not calculate personalised thresholds or automatically publish government changes.

Initial data: GOV.UK occupation eligibility and going-rate tables (both source publications dated 22 July 2025), retrieved 6 November 2026. 412 occupations, 270 published rate rows. Healthcare/education and other missing salary rows link back to official guidance rather than inventing a rate. The source text is reused under OGL v3.0; attribution appears in the UI.

## Validation

Run node --test tests/occupations.test.cjs and npx tsc --noEmit --incremental false, then npm run build. Check that the changed occupation matches its official source and inspect its detail URL before publishing.
