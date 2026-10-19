"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchCategories } from "@/app/utils/api/SanityAPI";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define the Category type
interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  postCount: number;
}

interface CategoryListProps {
  currentCategory?: string;
}

const CategoryList = ({ currentCategory }: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Handle clear filter click
  const handleClearFilter = () => {
    router.push("/blog/category/show-all");
  };
  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        // Fetch categories and total post count separately
        const fetchedCategories = await fetchCategories();

        // Get actual total post count directly from all posts (including uncategorized)
        const totalPostsQuery = `count(*[_type == "post" && defined(slug.current)])`;
        const total = await client.fetch(totalPostsQuery);

        setTotalPosts(total);

        // Sort categories by post count (most posts first)
        const sortedCategories = fetchedCategories.sort(
          (a: Category, b: Category) => b.postCount - a.postCount,
        );

        setCategories(sortedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="mb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <motion.h3
          className="text-2xl font-bold text-black"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Categories
        </motion.h3>

        {/* Filter status and clear button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          {currentCategory && currentCategory !== "show-all" ? (
            <>
              <button
                onClick={handleClearFilter}
                className="flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Filter
              </button>
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                {totalPosts} Total Posts
              </span>
            </>
          ) : (
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
              {totalPosts} Total Posts
            </span>
          )}
        </motion.div>
      </div>

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
      ) : categories.length === 0 ? (
        // Empty state
        <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-500">
          No categories found
        </div>
      ) : (
        // Categories list with animations
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.ul className="space-y-2" variants={containerVariants}>
            {/* Using Next.js Link for client-side navigation */}
            {categories.map((category) => (
              <motion.li
                key={category._id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`/blog/category/${category.slug.current}`} passHref>
                  <motion.div
                    className={`flex items-center justify-between rounded-md p-2 shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-sky-500 hover:via-sky-600 hover:to-sky-700 hover:text-white
                      ${
                        currentCategory === category.slug.current
                          ? "bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 text-white"
                          : "bg-white text-black"
                      }`}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{
                      scale: 1.02,
                      transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    }}
                  >
                    <div className="flex items-center">
                      <motion.svg
                        className="mr-2 h-3 w-3 font-extrabold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                      <span>{category.title}</span>
                    </div>

                    {/* Post count badge */}
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium
                      ${
                        currentCategory === category.slug.current
                          ? "bg-sky-500 bg-opacity-40 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.postCount}
                    </span>
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryList;
