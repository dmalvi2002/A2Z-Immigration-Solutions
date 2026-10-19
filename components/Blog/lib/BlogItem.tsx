"use client";
// File: /components/Blog/BlogItem.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@/types/blog";

interface BlogItemProps {
  post: BlogType;
}

const BlogItem: React.FC<BlogItemProps> = ({ post }) => {
  return (
    <div className="overflow-hidden rounded-sm bg-gradient-to-b from-slate-50 via-cyan-100/50 to-cyan-100/70 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative">
        <Image
          src={post.thumbnail || "/images/blog/placeholder.jpg"}
          alt={post.imageAlt || post.title}
          width={400}
          height={250}
          className="h-56 w-full object-cover p-1"
        />
        <span className="absolute left-4 top-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center text-xs text-gray-500">
          <span className="mr-3">{post.date}</span>
          <span className="flex items-center">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {post.readTime}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
        <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>
        <Link
          href={`/blog/${post?.slug}`}
          className="text-xs font-semibold uppercase tracking-wider text-blue-500 hover:text-blue-700"
        >
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
