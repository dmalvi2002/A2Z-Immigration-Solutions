import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/sanity/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
