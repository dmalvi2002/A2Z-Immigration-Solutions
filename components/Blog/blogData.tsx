"use client";
import { BlogType } from "@/types/blog";
import { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchCategories,
} from "@/app/utils/api/SanityAPI";

interface BlogDataProps {
  categorySlug?: string;
  initialPosts?: BlogType[];
}

interface BlogDataResult {
  posts: BlogType[];
  loading: boolean;
  error: string | null;
  categoryTitle: string;
  totalPosts: number;
}

// Refactored to handle both all posts and category-specific posts
const useBlogData = ({ categorySlug, initialPosts }: BlogDataProps): BlogDataResult => {
  const [posts, setPosts] = useState<BlogType[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState<string | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    if (initialPosts) {setPosts(initialPosts); setLoading(false); return;}
    const loadPosts = async () => {
      try {
        setLoading(true);
        let fetchedPosts;

        // Special case for "show-all"
        if (categorySlug === "show-all") {
          console.log("Showing all posts");
          fetchedPosts = await fetchPosts();
          setCategoryTitle("");
        }
        // Category-specific fetching
        else if (categorySlug) {
          console.log(`Fetching posts for category: ${categorySlug}`);

          // First check if this is a valid category
          const categories = await fetchCategories();
          const category = categories.find(
            (cat: any) => cat.slug?.current === categorySlug,
          );

          if (category) {
            // Valid category, fetch posts for it
            fetchedPosts = await fetchPostsByCategory(categorySlug);
            setCategoryTitle(category.title);
          } else {
            // Invalid category
            console.log(`Category ${categorySlug} not found`);
            fetchedPosts = [];
            setCategoryTitle("");
            setError(
              `Category "${categorySlug}" not found. Please select a valid category.`,
            );
          }
        }
        // Default case - all posts
        else {
          console.log("Fetching all posts");
          fetchedPosts = await fetchPosts();
          setCategoryTitle("");
        }

        if (fetchedPosts && Array.isArray(fetchedPosts)) {
          setTotalPosts(fetchedPosts.length);

          // Format posts to match BlogType
          const formattedPosts = fetchedPosts.map(
            (post: any, index: number) => ({
              id: index + 1,
              title: post.title,
              excerpt: post.excerpt || "Read more about this topic...",
              category:
                post.categories && post.categories.length > 0
                  ? post.categories[0].title
                  : "Uncategorised",
              date: new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              readTime: post.estimatedReadingTime
                ? `${post.estimatedReadingTime} min read`
                : "5 min read",
              imageAlt: post.mainImage?.alt || post.title,
              thumbnail:
                post.mainImage?.asset?.url || "/images/blog/blog-01.png",
              slug: post.slug.current,
            }),
          );

          setPosts(formattedPosts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [categorySlug, initialPosts]);

  return { posts, loading, error, categoryTitle, totalPosts };
};

export default useBlogData;
