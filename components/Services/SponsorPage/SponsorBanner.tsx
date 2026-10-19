"use client";
import {PageText} from "@/components/CMS/PageContent";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SponsorBanner: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  // Animation to cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 4 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans mx-auto flex max-w-7xl flex-col-reverse items-center justify-between p-6 md:flex-row md:gap-8 md:p-10 2xl:px-0">
      <div className="mb-0 mt-10 w-full md:mb-0 md:mt-0 md:w-1/2 md:pr-10">
        <h1 className="mb-6 text-3xl font-bold leading-tight text-[#0096c7] sm:text-3xl md:text-4xl lg:text-5xl"><PageText field="heading">
          How Sponsor Licence
          <br />
          Will Help to Stay Ahead
          <br />
          of the Game?
        </PageText></h1>
        <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600"><PageText field="introduction">
          Securing your sponsor licence doesn't have to be difficult or
          expensive. Apply instantly via our platform and let our in-house
          immigration experts handle everything - starting from 995.
        </PageText></p>
        <a href="/get-in-touch">
          <button className="rounded bg-gradient-to-r from-sky-500 to-sky-800 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:brightness-110">
            Get in touch
          </button>
        </a>
      </div>

      <div className="flex h-full w-full items-center justify-center md:w-1/2">
        <motion.div
          className="w-full max-w-[600px] rounded-2xl bg-white p-4 pb-8 shadow-2xl shadow-sky-500/20 md:p-10 lg:p-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/features/sponsor-banner-1.svg"
            alt="Sponsor Licence"
            width={500}
            height={500}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorBanner;
