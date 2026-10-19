import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('resources');
import React from "react";
import { Metadata } from "next";
import FreeStuff from "@/components/FreeStuff";



const FreeStuffPage = () => {
  return (<> <PageData id="resources" />
    <div>
      <FreeStuff publicKey="8seFmYH7EcPOmhmGg" />
    </div>
  </>);
};

export default FreeStuffPage;
