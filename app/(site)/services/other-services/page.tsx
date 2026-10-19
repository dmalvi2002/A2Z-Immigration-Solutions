import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('other-services');
import React from "react";
import { Metadata } from "next";
import OtherSupport from "@/components/Services/OtherSupport";
import SupportCTA from "@/components/Services/OtherSupport/SupportCTA";



const OtherSupportPage = () => {
  return (<> <PageData id="other-services">
    <div className="py-20">
      <OtherSupport />
      <SupportCTA />
    </div>
  </PageData></>);
};

export default OtherSupportPage;
