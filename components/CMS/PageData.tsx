import { getPage } from "@/sanity/lib/content";
import { customJsonLd } from "@/sanity/lib/seo";
import JsonLd from "./JsonLd";
import { PageContentProvider } from "./PageContent";
export default async function PageData({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const page = await getPage(id);
  return (
    <PageContentProvider
      value={{ heading: page?.heading, introduction: page?.introduction }}
    >
      <JsonLd value={customJsonLd(page?.seo)} />
      {children}
    </PageContentProvider>
  );
}
