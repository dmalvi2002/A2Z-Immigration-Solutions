import Blog from "@/components/Blog";
import { notFound } from "next/navigation";
import {
  fetchCategories,
  fetchPosts,
  fetchPostsByCategory,
} from "@/app/utils/api/SanityAPI";
import { postCard } from "@/sanity/lib/postCard";
import { getSettings } from "@/sanity/lib/content";
import { buildMetadata, customJsonLd } from "@/sanity/lib/seo";
import JsonLd from "@/components/CMS/JsonLd";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ category: string }> };
async function archive(category: string) {
  const settings = await getSettings();
  if (category === "show-all")
    return {
      title: settings.blogTitle || "Blogs & Articles",
      description:
        settings.blogDescription ||
        "Find lots of useful information that answers the most common questions",
      seo: settings.archiveSeo,
      settings,
      isAll: true,
    };
  const categories = await fetchCategories();
  const found = categories.find((c: any) => c.slug?.current === category);
  if (!found) notFound();
  return { ...found, settings, isAll: false };
}
export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const data = await archive(category);
  return buildMetadata({
    path: `/blog/category/${category}`,
    title: data.title,
    description: data.description,
    seo: data.seo,
    settings: data.settings,
  });
}
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const data = await archive(category);
  const posts = data.isAll
    ? await fetchPosts()
    : await fetchPostsByCategory(category);
  return (
    <>
      <JsonLd value={customJsonLd(data.seo)} />
      <section className="pb-10">
        <Blog
          key={category}
          initialPosts={posts.map(postCard)}
          archiveTitle={data.isAll ? data.title : `${data.title} Blog Posts`}
          archiveDescription={data.description}
          postsPerPage={data.settings.postsPerPage || 10}
        />
      </section>
    </>
  );
}
