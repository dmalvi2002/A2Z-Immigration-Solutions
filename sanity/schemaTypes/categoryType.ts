import { editorGroups } from "./seoType";
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  groups: editorGroups,
  fields: [
    defineField({
      name: "seo",
      title: "SEO settings",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "title",
      group: "content",
      title: "Category name (visible)",
      validation: (R) => R.required(),
      type: "string",
    }),
    defineField({
      name: "slug",
      group: "publishing",
      description:
        "Keep existing slugs to preserve links. show-all is reserved.",
      validation: (R) =>
        R.required().custom((value) =>
          value?.current === "show-all" ? "show-all is reserved." : true,
        ),
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      title: "Category introduction (visible)",
      group: "content",
      type: "text",
    }),
  ],
});
