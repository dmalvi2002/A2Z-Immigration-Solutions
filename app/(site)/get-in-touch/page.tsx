import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('get-in-touch');
import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";



const GetInTouchPage = () => {
  return (<> <PageData id="get-in-touch" />
    <div className="pb-20 pt-40">
      <Contact
        serviceId="service_yj3nlrh"
        templateId="template_nastr37"
        publicKey="8seFmYH7EcPOmhmGg"
      />
    </div>
  </>);
};

export default GetInTouchPage;
