import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('home');
import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import SponsorLicenceSection from "@/components/SponsorLicense";
import HowWeCanHelpYou from "@/components/HowCanHelp";
import StartYourJourney from "@/components/StartYourJourney";
import StepByStep from "@/components/StepByStep";
import StatsSection from "@/components/Stats";
import BlogSection from "@/components/Blog/BlogSection";
import WhoLovesUs from "@/components/WhoLoveUs";
import GoogleReviews from "@/components/Testimonial/GoogleReview";
import FAQSection from "@/components/FAQ/FAQ-Section";
import faqItems from "@/components/FAQ/homefaqData";



export default function Home() {
  return (<> <PageData id="home" />
    <main>
      <Hero />
      <Brands />
      <SponsorLicenceSection />
      <HowWeCanHelpYou />
      <StartYourJourney />
      <StepByStep />

      <StatsSection />
      <WhoLovesUs />
      <GoogleReviews
        appId="7b481c44-e91d-41e4-934c-2da27681f802"
        className="my-8 rounded-lg p-4 md:p-10 lg:p-16"
      />
      <BlogSection />
      <FAQSection faqItems={faqItems} />
    </main>
  </>);
}
