
import { fetchPostBySlug } from "@/app/utils/api/SanityAPI";
import { format } from "date-fns";
import { DataTable } from "@/types/blog";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: string;
  mainImageAlt?: string;
  content: string[] | any;
  estimatedReadingTime?: string;
  additionalImages?: string[];
  dataTables?: DataTable[];
  relatedPosts?: Array<{
    id: string;
    title: string;
    slug: string;
    mainImage: string;
    mainImageAlt?: string;
    publishDate: string;
  }>;
}

export async function getSingleBlogPost(
  slug: string,
  existingPost?: any,
): Promise<BlogPost | null> {
  try {
    // Validate slug input
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      console.warn("Invalid slug provided:", slug);
      return null;
    }

    // Only trim whitespace but preserve case
    const trimmedSlug = slug.trim();

    // Attempt to fetch the post
    const post = existingPost || await fetchPostBySlug(trimmedSlug);

    // Handle post not found
    if (!post) {
      console.warn(`Post with slug "${trimmedSlug}" not found`);
      return null;
    }

    // Ensure body is always an array for PortableText
    const bodyContent = Array.isArray(post.body) ? post.body : [];

    // Find any tables already embedded inside the body content
    const inlineTableBlocks =
      bodyContent?.filter(
        (block: any) => block?._type === "tableBlock" && block?.table,
      ) || [];
    const inlineTableIds = new Set(
      inlineTableBlocks
        .map((block: any) => block.table?._id || block.table?.slug?.current)
        .filter(Boolean),
    );

    // Keep any legacy dataTables that were not already embedded inline
    const remainingDataTables = (post.dataTables || []).filter(
      (table: DataTable) => {
        const id = table?._id || table?.slug?.current;
        return id ? !inlineTableIds.has(id) : true;
      },
    );

    // Format the post data to match BlogPost interface
    const formattedPost: BlogPost = {
      id: post._id || `temp-id-${Date.now()}`,
      title: post.title || "Untitled Post",
      author: post.author?.name || "Anonymous",
      publishDate: post.publishedAt
        ? format(new Date(post.publishedAt), "MMMM d, yyyy")
        : "No date",
      category:
        post.categories && post.categories.length > 0
          ? post.categories[0].title
          : "Uncategorised",
      mainImage: post.mainImage?.asset?.url || "/images/blog/blog-01.png",
      mainImageAlt: post.mainImage?.alt || post.title,
      content: bodyContent,
      estimatedReadingTime: post.estimatedReadingTime
        ? `${post.estimatedReadingTime} min read`
        : undefined,
      additionalImages: post.additionalImages?.map(
        (image: any) => image?.asset?.url || "/images/blog/blog-01.png",
      ),
      // Legacy fallback tables (those not already embedded inline)
      dataTables: remainingDataTables,
      // Format related posts if available
      relatedPosts: post.relatedPosts?.map((relatedPost) => ({
        id: relatedPost._id || `related-${Date.now()}`,
        title: relatedPost.title || "Related Post",
        slug: relatedPost.slug?.current || "related-post",
        mainImage:
          relatedPost.mainImage?.asset?.url || "/images/blog/blog-01.png",
        mainImageAlt: relatedPost.mainImage?.alt || relatedPost.title,
        publishDate: relatedPost.publishedAt
          ? format(new Date(relatedPost.publishedAt), "MMMM d, yyyy")
          : "No date",
      })),
    };

    return formattedPost;
  } catch (error: any) {
    // Enhanced error logging and handling
    if (error.message && error.message.includes("not found")) {
      console.warn(`Post with slug "${slug}" not found:`, error.message);
    } else {
      console.error("Error fetching blog post:", error);
    }

    // Let the route error boundary handle outages instead of rendering sample content.
    throw error;
  }
}
