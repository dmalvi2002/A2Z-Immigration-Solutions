import { defineField, defineType } from "sanity";
import { editorGroups } from "./seoType";
import { pageRegistry } from "../pageRegistry";
const hasContent = (document: any) =>
  [
    "page-about-us",
    "page-sponsor-licence",
    "page-skilled-worker-visa",
    "page-compliance",
    "page-other-services",
  ].includes((document?._id || "").replace(/^drafts\./, ""));

export const pageType = defineType({
  name: "page",
  title: "Page settings",
  type: "document",
  groups: editorGroups,
  preview: {
    select: { title: "title", id: "_id", path: "path" },
    prepare({ title, id, path }) {
      const definition = pageRegistry.find(
        (page) => `page-${page.id}` === (id || "").replace(/^drafts\./, ""),
      );
      return {
        title: title || definition?.title || "Page settings",
        subtitle: path || definition?.path,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Page name (editor label)",
      type: "string",
      group: "content",
      readOnly: true,
      description:
        "The name shown in Studio. It does not change the heading visitors see. Use the fields below to change supported page text.",
    }),
    defineField({
      name: "heading",
      title: "Visible page heading",
      type: "string",
      group: "content",
      hidden: ({ document }) => !hasContent(document),
      description:
        "Changes the large heading on this page (the Support Services heading on Other Services). Leave blank to keep the current heading. SEO title is a separate field.",
    }),
    defineField({
      name: "introduction",
      title: "Visible introduction",
      type: "text",
      rows: 3,
      group: "content",
      hidden: ({ document }) => !hasContent(document),
      description:
        "Changes the short paragraph below the heading. Leave blank to keep the current text. Example: Practical help for UK employers applying for a sponsor licence.",
    }),
    defineField({
      name: "path",
      title: "Website address",
      type: "string",
      group: "publishing",
      readOnly: true,
      description:
        "Fixed route. Publishing these settings updates the existing page; it does not create or remove a website page.",
    }),
    defineField({
      name: "seo",
      title: "SEO settings",
      type: "seo",
      group: "seo",
    }),
  ],
});
