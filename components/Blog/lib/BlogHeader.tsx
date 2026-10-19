import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogHeaderProps {
  categoryTitle?: string;
  archiveTitle?: string;
  archiveDescription?: string;
}

const BlogHeader = ({ categoryTitle, archiveTitle, archiveDescription }: BlogHeaderProps) => {
  return (
    <motion.div
      className="relative h-96 w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/features/blog-header.png')",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-500/80 to-sky-500/90" />
      <div className="absolute inset-x-0 bottom-0 top-1/3 px-3 sm:top-1/3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-c-1280">
          <div className="max-w-3xl text-center text-white sm:mx-auto">
            <h1 className="mb-2 text-3xl font-bold leading-tight sm:mb-3 sm:text-3xl md:mb-4 md:text-4xl lg:mb-5 lg:text-5xl">
              {archiveTitle || (categoryTitle
                ? `${categoryTitle} Blog Posts`
                : "Blogs & Articles")}
            </h1>
            <p className="xs:text-base mx-auto px-2 text-sm sm:text-lg md:max-w-2xl">
              {archiveDescription || (categoryTitle
                ? `Browse our collection of articles about ${categoryTitle}`
                : "Find lots of useful information that answers the most common questions")}
            </p>

            {/* Breadcrumb */}
            <div className="mt-4 flex justify-center space-x-2 text-xs text-white sm:mt-6 md:mt-8 md:text-sm">
              <Link href="/" className="hover:text-gray-200">
                Home
              </Link>
              <span>•</span>
              <Link
                href="/blog/category/show-all"
                className="hover:text-gray-200"
              >
                Blog
              </Link>
              {categoryTitle && (
                <>
                  <span>•</span>
                  <span className="font-medium">{categoryTitle}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogHeader;
