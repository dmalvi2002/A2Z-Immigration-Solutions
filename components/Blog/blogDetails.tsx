"use client";
import SharePost from "@/components/Blog/lib/SharePost";
import BookCallSidebar from "@/components/Blog/lib/sub/BookCall";
import CategoryList from "@/components/Blog/lib/sub/CategoryList";
import TrendingPosts from "@/components/Blog/lib/sub/TrendingPosts";
import TableComponent from "@/components/Blog/lib/TableComponent";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@/utils/PortableText";
import { DataTable } from "@/types/blog";

// Define types
interface BlogPost {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: string;
  mainImageAlt?: string;
  content: string[] | any; // Support both array of strings and PortableText blocks
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

const BlogDetails = ({post: blogPost, showRelatedPosts = true}: {post: BlogPost; showRelatedPosts?: boolean}) => {
  // Determine if there are legacy tables that still need rendering
  const inlineTableIds = Array.isArray(blogPost.content)
    ? blogPost.content
        .filter((block: any) => block?._type === "tableBlock" && block?.table)
        .map(
          (block: any) => block.table?._id || block.table?.slug?.current || "",
        )
        .filter(Boolean)
    : [];
  const remainingDataTables =
    blogPost.dataTables?.filter((table) => {
      const id = table?._id || table?.slug?.current;
      return id ? !inlineTableIds.includes(id) : true;
    }) || [];

  // Render function to handle content display with error info
  const renderContent = () => {

    return (
      <section className="pb-20 pt-20 lg:pb-25 lg:pt-25 xl:pb-30 xl:pt-30">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13  md:p-10">
                {/* Main Blog Image */}
                <div className="mb-10 w-full overflow-hidden">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={blogPost.mainImage}
                      alt={blogPost.mainImageAlt || blogPost.title}
                      fill
                      className="rounded-md object-cover object-center"
                      priority
                    />
                  </div>
                </div>

                {/* Blog Title */}
                <h1 className="mb-5 mt-11 text-3xl font-semibold text-black  2xl:text-sectiontitle2">
                  {blogPost.title}
                </h1>

                {/* Blog Metadata */}
                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li className="flex items-center">
                    <span className="mr-1 text-black ">Author: </span>
                    {blogPost.author}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-1 text-black ">Published On:</span>
                    {blogPost.publishDate}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-1 text-black ">Category:</span>
                    {blogPost.category}
                  </li>
                  {blogPost.estimatedReadingTime && (
                    <li className="flex items-center">
                      <svg
                        className="mr-1.5 h-4 w-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {blogPost.estimatedReadingTime}
                    </li>
                  )}
                </ul>

                {/* Blog Content */}
                <div className="blog-details text-body-color space-y-6 text-base leading-relaxed">
                  <div className="mb-6">
                    {/* Safe rendering of content with explicit error handling for PortableText */}
                    {(() => {
                      try {
                        return <PortableText value={blogPost.content} />;
                      } catch (contentError) {
                        console.error("Error rendering content:", contentError);
                        // Fallback to rendering plain text if PortableText fails
                        return (
                          <div>
                            {Array.isArray(blogPost.content) ? (
                              blogPost.content.map((paragraph, i) =>
                                typeof paragraph === "string" ? (
                                  <p key={i} className="mb-4">
                                    {paragraph}
                                  </p>
                                ) : null,
                              )
                            ) : typeof blogPost.content === "string" ? (
                              <p className="mb-4">{blogPost.content}</p>
                            ) : (
                              <p className="mb-4 text-red-500">
                                Content could not be displayed
                              </p>
                            )}
                          </div>
                        );
                      }
                    })()}
                  </div>{" "}
                  {/* Legacy Data Tables Section (for posts not yet migrated to inline tables) */}
                  {remainingDataTables.length > 0 && (
                    <div className="my-8">
                      {remainingDataTables.map((table, index) => (
                        <TableComponent
                          key={table.slug?.current || table._id || index}
                          table={table}
                          className="mb-8 last:mb-0"
                        />
                      ))}
                    </div>
                  )}
                  {/* Additional Images */}
                  {blogPost.additionalImages &&
                    blogPost.additionalImages.length > 0 && (
                      <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {blogPost.additionalImages.map((img, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-lg"
                          >
                            <Image
                              src={img}
                              width={500}
                              height={300}
                              alt={`Blog image ${index + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                <SharePost />

                {/* Related Posts Section */}
                {showRelatedPosts && blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
                  <div className="mt-16 border-t border-gray-200 pt-12 ">
                    <h3 className="mb-8 text-2xl font-semibold text-black ">
                      Related Articles
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {blogPost.relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                        >
                          <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg ">
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={relatedPost.mainImage}
                                alt={relatedPost.mainImageAlt || relatedPost.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="line-clamp-2 font-medium text-black ">
                                {relatedPost.title}
                              </h4>
                              <p className="text-body-color  mt-2 text-sm">
                                {relatedPost.publishDate}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/2 lg:w-[32%]">
              <div className="sticky top-24 space-y-10">
                <CategoryList />
                <BookCallSidebar />
                <TrendingPosts />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Return the rendered content
  return renderContent();
};

export default BlogDetails;
