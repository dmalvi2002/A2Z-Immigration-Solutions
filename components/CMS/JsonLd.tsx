import { safeJsonLd } from "@/sanity/lib/seo";
export default function JsonLd({ value }: { value: unknown }) {
  return value ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(value) }}
    />
  ) : null;
}
