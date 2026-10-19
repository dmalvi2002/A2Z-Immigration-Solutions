import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('about-us');
import AboutUs from "@/components/AboutUs";
import { Metadata } from "next";



export default function AboutPage() {
  return <><PageData id="about-us"><AboutUs /></PageData></>;
}
