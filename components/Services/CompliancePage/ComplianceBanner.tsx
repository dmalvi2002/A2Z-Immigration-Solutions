"use client";
import {PageText} from "@/components/CMS/PageContent";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ComplianceBanner: React.FC = () => {
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
          Book an Appointment for Digital Compliance Support!
        </PageText></h1>
        <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600"><PageText field="introduction">
          Unburden your team, avoid expensive penalties and gain peace of mind
          with automated, real-time compliance monitoring.
        </PageText></p>
        <a href="/get-in-touch">
          <button className="rounded bg-gradient-to-r from-sky-500 to-sky-800 px-6 py-3 font-semibold text-white transition-colors duration-300  hover:brightness-110">
            Get in touch
          </button>
        </a>
      </div>

      <div className="relative flex w-full items-center justify-center md:w-1/2">
        <motion.div
          className="absolute inset-0 max-h-[300px] max-w-[500px] rounded-full bg-gradient-to-br from-sky-400/80 to-sky-500/90 opacity-90"
          style={{
            filter: "blur(200px)",
            transform: "perspective(1000px) rotateX(10deg) rotateY(-10deg)",
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="relative w-full max-w-md rounded-2xl bg-white p-0 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/features/compliance-banner.png"
            alt="Sponsor Licence"
            width={500}
            height={500}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ComplianceBanner;
