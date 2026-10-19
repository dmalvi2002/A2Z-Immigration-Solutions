import { client } from "@/sanity/lib/client";

/**
 * Fetch all blog posts with basic information
 * @param limit Optional number of posts to return
 * @returns Array of blog posts
 */
export async function fetchPosts(limit?: number) {
  const query = `*[_type == "post" && defined(slug.current)] {
    _id,
    title,
    slug,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    author -> {
      name,
      image { asset -> { url } }
    },
    publishedAt
  } | order(publishedAt desc)${limit ? ` [0...${limit}]` : ""}`;

  return await client.fetch(query);
}

/**
 * Fetch a single blog post by slug with full details
 * @param slug The slug of the blog post to fetch
 * @returns The blog post or null if not found
 */
export async function fetchPostBySlug(slug: string) {
  const query = `*[_type == "post" && defined(slug.current) && slug.current == $slug][0] {
    _id,
    title,
    seo,
    slug,
    excerpt,
    _updatedAt,
    body[]{
      ...,
      _type == "tableBlock" => {
        _type,
        _key,
        caption,
        "table": table-> {
          _id,
          title,
          description,
          headers,
          rows,
          tableStyle,
          slug
        }
      }
    },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    author -> {
      name,
      bio,
      image { asset -> { url } }
    },
    publishedAt,
    dataTables[]-> {
      _id,
      title,
      description,
      headers,
      rows,
      tableStyle,
      slug
    },
    "relatedPosts": *[_type == "post" && defined(slug.current) && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] {
      _id,
      title,
      slug,
      mainImage {
        alt,
        asset -> { url }
      },
      publishedAt
    } | order(publishedAt desc) [0...3]
  }`;

  return await client.fetch(query, { slug });
}

/**
 * Fetch all blog categories
 * @returns Array of blog categories
 */
export async function fetchCategories() {
  const query = `*[_type == "category"] {
    _id,
    title,
    seo,
    slug,
    description,
    "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)])
  } | order(title asc)`;

  return await client.fetch(query);
}

/**
 * Fetch posts by category
 * @param categorySlug The slug of the category to fetch posts for
 * @param limit Optional number of posts to return
 * @returns Array of blog posts in the specified category
 */
export async function fetchPostsByCategory(
  categorySlug: string,
  limit?: number,
) {
  const query = `*[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current] {
    _id,
    title,
    slug,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    author -> {
      name,
      image { asset -> { url } }
    },
    publishedAt
  } | order(publishedAt desc)${limit ? ` [0...${limit}]` : ""}`;

  return await client.fetch(query, { categorySlug });
}

/**
 * Search for posts by query term
 * @param searchTerm The search term to look for in post title and content
 * @param limit Optional number of posts to return
 * @returns Array of matching blog posts
 */
export async function searchPosts(searchTerm: string, limit: number = 10) {
  const query = `*[_type == "post" && defined(slug.current) && (
    title match $searchTerm ||
    pt::text(body) match $searchTerm
  )] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    publishedAt
  } | order(publishedAt desc)[0...${limit}]`;

  // Use * as wildcard for partial matching
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

/**
 * Fetch featured posts (posts marked as featured)
 * @param limit Optional number of featured posts to return
 * @returns Array of featured blog posts
 */
export async function fetchFeaturedPosts(limit: number = 3) {
  const query = `*[_type == "post" && defined(slug.current) && featured == true] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    author -> {
      name,
      image { asset -> { url } }
    },
    publishedAt
  } | order(publishedAt desc)[0...${limit}]`;

  return await client.fetch(query);
}

/**
 * Fetch paginated posts
 * @param pageSize Number of posts per page
 * @param pageNumber Page number (starting from 1)
 * @returns Object with posts array and pagination info
 */
export async function fetchPaginatedPosts(
  pageSize: number = 10,
  pageNumber: number = 1,
) {
  // Calculate start and end indexes
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;

  // Get total count for pagination
  const totalCountQuery = `count(*[_type == "post" && defined(slug.current)])`;
  const totalCount = await client.fetch(totalCountQuery);

  // Fetch paginated posts
  const query = `*[_type == "post" && defined(slug.current)] {
    _id,
    title,
    slug,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    author -> {
      name,
      image { asset -> { url } }
    },
    publishedAt
  } | order(publishedAt desc)[${start}...${end}]`;

  const posts = await client.fetch(query);

  return {
    posts,
    pagination: {
      totalPosts: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
      pageSize,
    },
  };
}
/**
 * Fetch trending posts based on recent publication date
 * @param limit Optional number of trending posts to return
 * @returns Array of trending blog posts
 */
export async function fetchTrendingPosts(limit: number = 5) {
  const query = `*[_type == "post" && defined(slug.current)] {
    _id,
    title,
    slug,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    mainImage {
      alt,
      asset -> { url }
    },
    categories[]-> { title, slug },
    author -> {
      name,
      image { asset -> { url } }
    },
    publishedAt
  } | order(publishedAt desc)[0...${limit}]`;

  return await client.fetch(query);
}
