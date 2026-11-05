import OccupationFinder from "@/components/Services/SkilledVisaPage/OccupationFinder";
import { pageMetadata } from "@/sanity/lib/content";

export const generateMetadata = () => pageMetadata("soc-code-finder");

export default function SocCodeFinderPage() {
  return <main className="pb-12 pt-28"><OccupationFinder /></main>;
}
