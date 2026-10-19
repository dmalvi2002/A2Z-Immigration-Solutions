"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fetchTrendingPosts } from "@/app/utils/api/SanityAPI";

// Define types
interface TrendingPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    alt?: string;
    asset: {
      url: string;
    };
  };
  publishedAt: string;
}

const TrendingPosts = () => {
  const [posts, setPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch trending posts
  useEffect(() => {
    const loadTrendingPosts = async () => {
      try {
        setLoading(true);
        const trendingPosts = await fetchTrendingPosts(6); // Get 6 trending posts
        setPosts(trendingPosts);
      } catch (err) {
        console.error("Error fetching trending posts:", err);
        setError("Failed to load trending posts");
      } finally {
        setLoading(false);
      }
    };

    loadTrendingPosts();
  }, []);

  // Trigger animations when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Default fallback image
  const defaultImage = "/images/blog/blog-01.png";

  return (
    <div className="mt-8 w-full">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="mb-4 text-2xl font-bold text-black"
      >
        Trending Posts
      </motion.h2>

      {loading ? (
        // Loading state
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        // Error state
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
          {error}
        </div>
      ) : posts.length === 0 ? (
        // Empty state
        <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-500">
          No trending posts found
        </div>
      ) : (
        // Posts list with animations
        <motion.div
          // ref={ref}
          // initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col space-y-2"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              variants={itemVariants}
              className="flex gap-2"
              whileHover={{
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image thumbnail */}
              <motion.div
                className="flex-shrink-0 overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.8 },
                  }}
                >
                  <Image
                    src={post.mainImage?.asset?.url || defaultImage}
                    alt={post.mainImage?.alt || post.title}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Post content */}
              <motion.div
                className="flex flex-1 items-center bg-gradient-to-t from-sky-500/80 via-sky-500 to-sky-500/90 px-4"
                whileHover={{
                  x: 5,
                  background:
                    "linear-gradient(to top, rgba(14, 165, 233, 0.9), rgb(14, 165, 233), rgba(12, 162, 233, 0.95))",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}
              >
                <div className="flex flex-col py-2">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-sm text-gray-100 hover:text-white"
                  >
                    <motion.span
                      whileHover={{
                        x: 3,
                        transition: { type: "spring", stiffness: 500 },
                      }}
                      className="block"
                    >
                      {post.title}
                    </motion.span>
                  </Link>

                  {/* Date */}
                  <div className="mt-1 text-xs font-light text-sky-100">
                    {formatDate(post.publishedAt)}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TrendingPosts;
