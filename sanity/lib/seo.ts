import type { Metadata } from "next";

export type Seo = {
  title?: string;
  description?: string;
  focusKeyword?: string;
  socialImage?: any;
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: string;
};
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://a2zimmigrations.co.uk"
).replace(/\/$/, "");
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
export function imageUrl(image: any): string | undefined {
  if (image?.asset?.url) return image.asset.url;
  const ref = image?.asset?._ref;
  if (!ref) return undefined;
  const match = /^image-(.+)-(\d+x\d+)-(\w+)$/.exec(ref);
  return match
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ztfniri3"}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/${match[1]}-${match[2]}.${match[3]}`
    : undefined;
}
export function buildMetadata({
  path,
  title,
  description,
  seo = {},
  image,
  settings = {},
  article = false,
}: {
  path: string;
  title: string;
  description?: string;
  seo?: Seo;
  image?: any;
  settings?: any;
  article?: boolean;
}): Metadata {
  // GROQ projects absent fields as null, including every legacy post's SEO.
  seo = seo || {};
  const resolvedTitle = seo.title || title;
  const resolvedDescription =
    seo.description ||
    description ||
    settings.defaultDescription ||
    "A2Z Immigration";
  const socialImage = [
    seo.socialImage,
    image,
    settings.defaultSocialImage,
  ].find((candidate) => imageUrl(candidate));
  const url = imageUrl(socialImage);
  const canonical = seo.canonicalUrl || absoluteUrl(path);
  return {
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: { canonical },
    robots: { index: !seo.noindex, follow: true },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      type: article ? "article" : "website",
      siteName: settings.siteName || "A2Z Immigration",
      images: url ? [{ url, alt: socialImage?.alt || resolvedTitle }] : [],
    },
    twitter: {
      card: url ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: url ? [url] : [],
    },
  };
}
export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export function customJsonLd(seo?: Seo) {
  try {
    const value = JSON.parse(seo?.structuredData || "null");
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}
export function isSitemapEntry(path: string, seo?: Seo) {
  return (
    !seo?.noindex &&
    (!seo?.canonicalUrl || seo.canonicalUrl === absoluteUrl(path))
  );
}
