import { defineField, defineType } from "sanity";
import { SeoInput } from "../components/SeoInput";

export const editorGroups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO & social sharing" },
  { name: "publishing", title: "Publishing" },
];

export const seoType = defineType({
  name: "seo",
  title: "Search & social settings",
  type: "object",
  components: { input: SeoInput },
  fieldsets: [
    {
      name: "advanced",
      title: "Advanced — ask your SEO developer",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      description:
        "Search metadata only; does not change the page heading. Example: UK Sponsor Licence Guide | A2Z. Aim for about 50–60 characters; Google may rewrite it.",
      validation: (R) => R.max(60).warning("Consider a shorter search title."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "Search and social summary, not visible page copy. Example: Learn the sponsor licence requirements, costs and application steps for UK employers. Aim for about 140–160 characters.",
      validation: (R) =>
        R.max(160).warning("This summary may be truncated in search results."),
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus keyword (planning only)",
      type: "string",
      description:
        "Example: UK sponsor licence requirements. An internal editorial note: no scoring, keyword analysis or meta keywords tag is implemented.",
    }),
    defineField({
      name: "socialImage",
      title: "Social sharing image",
      type: "image",
      options: { hotspot: true },
      description:
        "Used in social metadata. Recommended: 1200 × 630 pixels. Falls back to the post image, then Settings.",
      fields: [
        {
          name: "alt",
          title: "Image description",
          type: "string",
          description:
            "Describe the picture, e.g. Employer reviewing sponsor licence documents.",
        },
      ],
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      fieldset: "advanced",
      description:
        "Normally leave blank: the website uses this page’s URL. Use a complete https:// URL only for a deliberate duplicate-content strategy.",
      validation: (R) => R.uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "noindex",
      title: "Hide this URL from search engines",
      type: "boolean",
      fieldset: "advanced",
      initialValue: false,
      description:
        "Adds noindex, follow and excludes the URL from the sitemap. Visitors can still open it; this is not privacy protection.",
    }),
    defineField({
      name: "structuredData",
      title: "Custom structured data (JSON-LD)",
      type: "text",
      rows: 8,
      fieldset: "advanced",
      description:
        "Developer only. Add a JSON object or array matching visible facts. Added alongside automatic BlogPosting data; avoid duplicate article entities.",
      validation: (R) =>
        R.custom((value) => {
          if (!value) return true;
          try {
            const parsed = JSON.parse(value);
            return parsed && typeof parsed === "object"
              ? true
              : "Enter a JSON object or array.";
          } catch {
            return "Enter valid JSON, without script tags.";
          }
        }),
    }),
  ],
});
