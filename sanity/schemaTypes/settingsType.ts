import { defineField, defineType } from "sanity";
import { editorGroups } from "./seoType";

export const settingsType = defineType({
  name: "siteSettings",
  title: "Settings",
  type: "document",
  groups: editorGroups,
  fields: [
    defineField({
      name: "siteName",
      title: "Website name",
      type: "string",
      group: "seo",
      description:
        "Used in social metadata and automatic article publisher data. Default: A2Z Immigration.",
    }),
    defineField({
      name: "defaultDescription",
      title: "Default search description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Fallback when a post has neither a meta description, excerpt nor body text.",
    }),
    defineField({
      name: "defaultSocialImage",
      title: "Default social image",
      type: "image",
      group: "seo",
      description:
        "Fallback sharing image; does not change visible page images.",
      fields: [{ name: "alt", title: "Image description", type: "string" }],
    }),
    defineField({
      name: "blogTitle",
      title: "Blog archive heading",
      type: "string",
      group: "content",
      description:
        "Visible on /blog/category/show-all. Default: Blogs & Articles.",
    }),
    defineField({
      name: "blogDescription",
      title: "Blog archive introduction",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Visible below the archive heading and used as the archive search summary unless archive SEO overrides it.",
    }),
    defineField({
      name: "postsPerPage",
      title: "Posts per archive page",
      type: "number",
      group: "content",
      description:
        "Controls numbered pagination in the blog and category grids. Default: 10.",
      validation: (R) => R.integer().min(1).max(50),
    }),
    defineField({
      name: "showRelatedPosts",
      title: "Show related articles below posts",
      type: "boolean",
      group: "content",
      description: "Matches articles by shared category. Default: enabled.",
    }),
    defineField({
      name: "archiveSeo",
      title: "Blog archive SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Website & blog settings" }) },
});
