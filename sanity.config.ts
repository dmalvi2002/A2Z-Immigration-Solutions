"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/deskStructure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    templates: (prev) => [
      ...prev.filter((t) => !["page", "siteSettings"].includes(t.schemaType)),
      {
        id: "existing-page",
        title: "Existing page",
        schemaType: "page",
        parameters: [
          { name: "title", type: "string" },
          { name: "path", type: "string" },
        ],
        value: (params) => ({ title: params.title, path: params.path }),
      },
    ],
  },
  document: {
    actions: (prev, context) =>
      ["page", "siteSettings"].includes(context.schemaType)
        ? prev.filter(
            (action) =>
              !["delete", "duplicate", "unpublish"].includes(
                action.action || "",
              ),
          )
        : prev,
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          !["page", "siteSettings", "existing-page"].includes(item.templateId),
      ),
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
