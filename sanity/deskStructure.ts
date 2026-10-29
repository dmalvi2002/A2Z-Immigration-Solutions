import type { StructureResolver } from "sanity/structure";
import { pageRegistry } from "./pageRegistry";
export const structure: StructureResolver = (S) =>
  S.list()
    .title("A2Z website")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Existing website pages — SEO settings")
            .items(
              pageRegistry.map((page) =>
                S.listItem()
                  .title(page.title)
                  .child(
                    S.document()
                      .title(page.title)
                      .schemaType("page")
                      .documentId(`page-${page.id}`)
                      .initialValueTemplate("existing-page", {
                        title: page.title,
                        path: page.path,
                      }),
                  ),
              ),
            ),
        ),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("table").title("Reusable tables"),
      S.divider(),
      S.listItem()
        .title("Settings")
        .child(
          S.document()
            .title("Website & blog settings")
            .schemaType("siteSettings")
            .documentId("site-settings"),
        ),
    ]);
