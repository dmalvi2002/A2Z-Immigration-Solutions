import { editorGroups } from "./seoType";
import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: editorGroups,
  fields: [
    defineField({
      name: "excerpt",
      title: "Post excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Visible on blog cards; also a fallback search description. Example: A practical guide to sponsor licence requirements and costs.",
    }),
    defineField({
      name: "seo",
      title: "SEO settings",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "title",
      title: "Post title (visible heading)",
      group: "content",
      validation: (R) => R.required(),
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "URL slug — keep existing URLs",
      group: "publishing",
      description:
        "Changing an existing slug breaks links unless a developer adds a redirect.",
      validation: (R) => R.required(),
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      group: "content",
      description:
        "Visible author name and article metadata. Bio, portrait and slug are internal records; no author archive exists.",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Featured image",
      group: "content",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description:
            "Describe the image for screen readers. Example: Employer checking sponsor licence documents. Avoid keyword stuffing.",
        }),
      ],
    }),
    defineField({
      name: "categories",
      group: "content",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date (display only)",
      group: "publishing",
      description:
        "Controls visible date and newest-first ordering. A future date does not schedule publication. Use Publish to go live.",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Article content",
      group: "content",
      type: "blockContent",
      description:
        "Use the block content to add text, images, and inline tables.",
    }),
    defineField({
      name: "dataTables",
      title: "Data Tables",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "table" } })],
      description:
        "Deprecated: use the table block inside the Body field to place tables inline with content.",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
