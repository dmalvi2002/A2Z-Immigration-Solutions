import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('calculator');
import React from "react";
import { Metadata } from "next";

import Calculator from "@/components/Calculator";



const CalculatorPage = () => {
  return <><PageData id="calculator" /><Calculator /></>;
};

export default CalculatorPage;
