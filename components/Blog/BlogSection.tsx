"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import UnderlineAnimation from "../Common/UnderlineAnimate";
import { fetchTrendingPosts } from "@/app/utils/api/SanityAPI";
import { format } from "date-fns";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    alt?: string;
    asset: {
      url: string;
    };
  };
  publishedAt: string;
}

const BlogCard: React.FC<{
  post: BlogPost;
  index: number;
}> = ({ post, index }) => {
  // Format the date
  const formattedDate = post.publishedAt ? format(
    new Date(post.publishedAt),
    "MMMM dd, yyyy",
  ).toUpperCase() : 'No date';

  // Get image URL from Sanity
  const imageUrl = post.mainImage?.asset?.url || "/images/blog/blog-01.png";

  // Get description from excerpt
  const description =
    post.excerpt || "Read more about this insightful article on our blog.";

  return (
    <div className="relative z-10 flex h-full flex-col rounded-xl border border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-square max-h-[350px] w-full overflow-hidden rounded-xl">
        <div className="h-full w-full transition-transform duration-500 hover:scale-110">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <span className="mb-1 text-xs font-bold uppercase text-blue-600">
          {formattedDate}
        </span>

        <h3 className="mb-4 text-lg font-bold text-slate-700">{post.title}</h3>

        <p className="mb-4 font-medium text-slate-600">{description}</p>

        <div className="mt-auto">
          <Link
            href={`/blog/${post.slug.current}`}
            className="group flex items-center gap-2 py-2 text-sm font-bold uppercase text-slate-600 transition-colors duration-300 hover:text-blue-600"
          >
            Read more
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight
                size={18}
                className="transition-colors duration-300 group-hover:text-blue-600"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trending posts from Sanity
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const trendingPosts = await fetchTrendingPosts(3); // Limit to 3 posts

        if (trendingPosts && trendingPosts.length > 0) {
          setPosts(trendingPosts);
        } else {
          // If no posts found, set empty array but don't use fallback
          console.log("No posts found in Sanity");
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching trending posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="relative mb-10 md:mb-16 lg:mb-20">
          <h2 className="mx-auto max-w-3xl bg-gradient-to-t from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-center text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-[1.2] text-transparent">
            Blog & News
          </h2>
          <div className="mt-2 md:mt-3">
            <UnderlineAnimation />
          </div>
        </div>

        {loading ? (
          // Loading state
          <div className="mx-auto flex h-64 w-full max-w-lg items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          // Error state
          <div className="mx-auto max-w-lg rounded-lg bg-red-50 p-8 text-center">
            <p className="text-red-600">{error}</p>
            <p className="mt-4 text-sm text-gray-600">
              Please check back later for our latest blog posts.
            </p>
          </div>
        ) : posts.length === 0 ? (
          // No posts available state
          <div className="mx-auto max-w-lg rounded-lg bg-blue-50 p-8 text-center">
            <p className="text-blue-600">
              No blog posts available at the moment.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Please check back soon for our latest articles.
            </p>
          </div>
        ) : (
          // Blog posts using flexbox instead of grid
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.75rem)]"
              >
                <BlogCard post={post} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
