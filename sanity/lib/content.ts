import { cache } from "react";
import { client } from "./client";
import { pageRegistry } from "../pageRegistry";
import { buildMetadata } from "./seo";

export const getSettings = cache(
  async () =>
    (await client.fetch(
      `*[_type == "siteSettings" && _id == "site-settings"][0]`,
    )) || {},
);
export const getPage = cache(async (id: string) =>
  client.fetch(`*[_type == "page" && _id == $id][0]`, { id: `page-${id}` }),
);
export async function pageMetadata(id: string) {
  const definition = pageRegistry.find((page) => page.id === id)!;
  const [page, settings] = await Promise.all([getPage(id), getSettings()]);
  return buildMetadata({
    path: definition.path,
    title: definition.title,
    description: definition.description,
    seo: page?.seo,
    settings,
  });
}
