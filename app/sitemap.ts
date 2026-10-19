import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { getSettings } from "@/sanity/lib/content";
import { pageRegistry } from "@/sanity/pageRegistry";
import { absoluteUrl, isSitemapEntry } from "@/sanity/lib/seo";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [docs, settings] = await Promise.all([
    client.fetch(
      `*[_type in ["post", "category", "page"]]{_id,_type,slug,path,seo,_updatedAt}`,
    ),
    getSettings(),
  ]);
  const entries: MetadataRoute.Sitemap = pageRegistry
    .filter((page) =>
      isSitemapEntry(
        page.path,
        docs.find((d: any) => d._id === `page-${page.id}`)?.seo,
      ),
    )
    .map((page) => ({ url: absoluteUrl(page.path) }));
  const archivePath = "/blog/category/show-all";
  if (isSitemapEntry(archivePath, settings.archiveSeo))
    entries.push({ url: absoluteUrl(archivePath) });
  for (const doc of docs) {
    if (
      !["post", "category"].includes(doc._type) ||
      !doc.slug?.current ||
      (doc._type === "category" && doc.slug.current === "show-all")
    )
      continue;
    const path = `/blog/${doc._type === "category" ? "category/" : ""}${doc.slug.current}`;
    if (isSitemapEntry(path, doc.seo))
      entries.push({ url: absoluteUrl(path), lastModified: doc._updatedAt });
  }
  return entries;
}
