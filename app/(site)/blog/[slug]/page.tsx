import { cache } from "react";
import { notFound } from "next/navigation";
import BlogDetails from "@/components/Blog/blogDetails";
import BlogsBanner from "@/components/Blog/lib/sub/BlogsBanner";
import BookTimeCTA from "@/components/Blog/lib/sub/BookTimeCTA";
import { fetchPostBySlug } from "@/app/utils/api/SanityAPI";
import { getSingleBlogPost } from "@/components/Blog/blogDetailsData";
import { getSettings } from "@/sanity/lib/content";
import {
  buildMetadata,
  absoluteUrl,
  customJsonLd,
  imageUrl,
} from "@/sanity/lib/seo";
import JsonLd from "@/components/CMS/JsonLd";
export const dynamic = "force-dynamic";
const getPost = cache(fetchPostBySlug);
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();
  return buildMetadata({
    path: `/blog/${slug}`,
    title: post.title,
    description:
      post.excerpt ||
      post.body
        ?.filter((b: any) => b._type === "block")
        .map((b: any) => b.children?.map((c: any) => c.text || "").join(""))
        .join(" ")
        .slice(0, 160),
    seo: post.seo,
    image: post.mainImage,
    settings,
    article: true,
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [raw, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!raw) notFound();
  const post = await getSingleBlogPost(slug, raw);
  if (!post) notFound();
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: raw.title,
    mainEntityOfPage: raw.seo?.canonicalUrl || absoluteUrl(`/blog/${slug}`),
    ...(raw.author?.name
      ? { author: { "@type": "Person", name: raw.author.name } }
      : {}),
    publisher: {
      "@type": "Organization",
      name: settings.siteName || "A2Z Immigration",
    },
    ...(raw.publishedAt ? { datePublished: raw.publishedAt } : {}),
    dateModified: raw._updatedAt,
    image: imageUrl(raw.mainImage),
    description: raw.seo?.description || raw.excerpt,
  };
  return (
    <>
      <JsonLd value={article} />
      <JsonLd value={customJsonLd(raw.seo)} />
      <BlogsBanner />
      <BlogDetails
        post={post}
        showRelatedPosts={settings.showRelatedPosts !== false}
      />
      <BookTimeCTA />
    </>
  );
}
