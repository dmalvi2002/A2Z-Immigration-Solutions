import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('offers');
import "./offers.css";
export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><PageData id="offers" />{children}</>;
}
