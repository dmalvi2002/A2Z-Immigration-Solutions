import type { BlogType } from "@/types/blog";
export function postCard(post: any, index: number): BlogType {
  return {
    id: index + 1,
    title: post.title,
    slug: post.slug?.current,
    excerpt: post.excerpt || "Read more about this topic...",
    category: post.categories?.[0]?.title || "Uncategorised",
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      : "No date",
    readTime: post.estimatedReadingTime
      ? `${post.estimatedReadingTime} min read`
      : "5 min read",
    thumbnail: post.mainImage?.asset?.url || "/images/blog/blog-01.png",
    imageAlt: post.mainImage?.alt || post.title,
  };
}
