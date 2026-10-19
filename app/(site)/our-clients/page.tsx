import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('our-clients');
import React from "react";
import { Metadata } from "next";
import ClientsPage from "@/components/OurClients";
import ClientsHero from "@/components/OurClients/ClientsHero";



const OurClientsPage = () => {
  return (<> <PageData id="our-clients" />
    <div>
      <ClientsHero />
      <ClientsPage />
    </div>
  </>);
};

export default OurClientsPage;
