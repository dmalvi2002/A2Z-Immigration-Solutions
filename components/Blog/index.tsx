"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BlogHeader from "@/components/Blog/lib/BlogHeader";
import BlogGrid from "@/components/Blog/lib/BlogGrid";
import Sidebar from "@/components/Blog/lib/Sidebar";
import useBlogData from "./blogData";
import FindCTA from "./lib/sub/FindCTA";

const Blog = ({archiveTitle, archiveDescription, postsPerPage = 10, initialPosts}: {archiveTitle?: string; archiveDescription?: string; postsPerPage?: number; initialPosts?: import('@/types/blog').BlogType[]}) => {
  // Extract category slug from URL path
  const pathname = usePathname();
  const categorySlug = pathname.startsWith("/blog/category/")
    ? pathname.split("/blog/category/")[1]
    : undefined;
  const [currentPage, setCurrentPage] = useState(1);

  // Get blog data using the custom hook
  const { posts, loading, error, categoryTitle, totalPosts } = useBlogData({
    categorySlug,
    initialPosts,
  });

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug]);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      {" "}
      <BlogHeader categoryTitle={categoryTitle} archiveTitle={archiveTitle} archiveDescription={archiveDescription} />
      <section className="bg-gray-50 py-10" data-blog-section>
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
          {/* Show notification for "show-all" */}
          {/* {categorySlug === "show-all" && (
            <div className="mb-8 rounded-md bg-blue-50 p-4 text-center text-blue-700">
              Showing all blog posts. Total posts: {totalPosts}
            </div>
          )} */}

          <div className="flex flex-col gap-10 lg:flex-row">
            <>
              {error ? (
                <div className="flex-1">
                  <div className="rounded-md bg-red-50 p-4 text-center text-red-600">
                    {error}
                  </div>
                </div>
              ) : loading ? (
                <div className="flex-1">
                  <div className="flex h-96 items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                </div>
              ) : posts.length === 0 ? (
                <div className="flex-1">
                  <div className="rounded-md bg-gray-100 p-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold">No posts found</h2>
                    <p className="text-gray-600">
                      {categorySlug && categorySlug !== "show-all"
                        ? `There are no posts in the "${categoryTitle}" category yet.`
                        : `There are no blog posts available.`}
                    </p>
                  </div>
                </div>
              ) : (
                <BlogGrid
                  posts={currentPosts}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </>

            {/* Sidebar is outside the loading/error/empty states */}
            <Sidebar
              currentCategory={
                categorySlug === "show-all" ? undefined : categorySlug
              }
            />
          </div>
        </div>
      </section>
      <FindCTA />
    </>
  );
};

export default Blog;
