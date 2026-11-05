"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const HeroMobile: React.FC = () => {
  // Service card data stored in an object array
  const serviceCards = [
    {
      id: 1,
      type: "SPONSOR LICENCE",
      title: "GET APPROVED QUICKLY & SECURELY.",
      subText: "CALL US FOR A FREE ELIGIBILITY ASSESSMENT!",
      imageName: "sponsor",
    },
    {
      id: 2,
      type: "COMPLIANCE",
      title: "STAY COMPLIANT & AUDIT READY AT ALL TIMES",
      imageName: "compliance",
    },
    {
      id: 3,
      type: "SKILLED WORKER VISA",
      title: "NOTHING HIDDEN, FULLY TRANSPARENT PROCESS",
      imageName: "immigration",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Background blob configuration for more dynamic generation
  const backgroundBlobs = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    width: Math.random() * 200 + 100,
    height: Math.random() * 200 + 100,
    left: Math.random() * 100,
    top: Math.random() * 100,
    rotateX: Math.random() * 30,
    rotateY: Math.random() * 30,
    duration: Math.random() * 20 + 15,
  }));

  // 3D surface elements configuration
  const surfaceElements = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    rotateX: i * 5,
    rotateY: i * 3,
    translateZ: i * 10,
    duration: 10 + i * 2,
  }));

  // Customized renderer for the first (sponsor) card
  const renderFirstCard = () => (
    <motion.div
      key={serviceCards[0].id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + serviceCards[0].id * 0.1 }}
      className="relative min-h-[9rem] w-full min-w-[18rem] overflow-hidden rounded-lg bg-gradient-to-r from-[#04A4D8] to-[#025772] p-3 text-white shadow-lg md:min-h-[12rem] lg:min-h-[15rem]"
    >
      <div className="flex h-full flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="mb-8 text-xs font-bold uppercase leading-tight sm:text-sm md:text-base lg:text-lg">
            {serviceCards[0].type}
          </div>
          <div className="mb-4 flex flex-wrap gap-1 text-[10px] font-medium leading-tight sm:text-xs md:text-sm lg:text-base">
            <span className="h-4 sm:h-5 md:h-6">{serviceCards[0].title}</span>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-1 text-[10px] font-medium leading-tight sm:text-xs md:text-sm lg:text-base">
            <span className="h-4 sm:h-5 md:h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1 inline-block h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              {serviceCards[0].subText}
            </span>
          </div>
        </div>
        <div className="relative h-[7.5rem] w-[7.5rem] flex-shrink-0 sm:h-[8rem] sm:w-[8rem] md:h-[9rem] md:w-[9rem] lg:h-[11rem] lg:w-[11rem]">
          <Image
            src={`/images/hero/${serviceCards[0].imageName}.png`}
            alt={`${serviceCards[0].type} illustration`}
            layout="fill"
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </motion.div>
  );

  // Service card renderer for other cards - using the data from the array
  const renderServiceCard = (card) => {
    // Skip the first card as it has a custom renderer
    if (card.id === 1) return null;

    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + card.id * 0.1 }}
        className="relative min-h-[11rem] w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#04A4D8] to-[#025772] p-2 text-white shadow-lg sm:min-h-[14rem] md:min-h-[16rem] lg:min-h-[18rem]"
      >
        <div className="mb-1 text-center text-[10px] font-bold uppercase sm:text-sm md:text-base lg:text-lg">
          {card.type}
        </div>
        <div className="mb-1 flex items-center justify-center">
          <div className="relative min-h-[6rem] w-full sm:h-[9rem] md:h-[11rem] lg:h-[14rem]">
            <Image
              src={`/images/hero/${card.imageName}.png`}
              alt={`${card.type} illustration`}
              layout="fill"
              className="rounded-md object-cover"
            />
          </div>
        </div>
        <div className="text-left text-[10px] leading-tight sm:text-sm md:text-base lg:text-lg">
          {card.title}
        </div>
      </motion.div>
    );
  };

  // Animation letters - stored as array for dynamic generation
  const expertInText = "Expert in".split("");

  return (
    <div className="relative h-auto w-full overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-14">
      {/* Enhanced 3D background with gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute h-full w-full bg-white opacity-70"></div>

        {/* 3D surface effect with gradient blobs - dynamically generated */}
        {backgroundBlobs.map((blob) => (
          <motion.div
            key={`blob-${blob.id}`}
            className="absolute rounded-full bg-gradient-to-b from-blue-300 to-blue-100 opacity-30 backdrop-blur-md"
            style={{
              width: `${blob.width}px`,
              height: `${blob.height}px`,
              left: `${blob.left}%`,
              top: `${blob.top}%`,
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${blob.rotateX}deg) rotateY(${blob.rotateY}deg)`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              rotateX: [blob.rotateX, -blob.rotateX, blob.rotateX],
              rotateY: [blob.rotateY, -blob.rotateY, blob.rotateY],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Additional 3D surface elements - dynamically generated */}
        <div className="absolute h-full w-full overflow-hidden">
          {surfaceElements.map((element) => (
            <motion.div
              key={`surface-${element.id}`}
              className="absolute bg-gradient-to-br from-blue-200 to-transparent"
              style={{
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                opacity: 0.1,
                transform: `perspective(1000px) rotateX(${element.rotateX}deg) rotateY(${element.rotateY}deg) translateZ(${element.translateZ}px)`,
              }}
              animate={{
                rotateX: [
                  element.rotateX,
                  element.rotateX + 2,
                  element.rotateX,
                ],
                rotateY: [
                  element.rotateY,
                  element.rotateY + 2,
                  element.rotateY,
                ],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content - responsive layout */}
      <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32">
        {/* Content with Enhanced 3D Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-20 text-center"
          >
            {/* Animated "Expert in" text with individual letter animations */}
            <motion.div
              variants={itemVariants}
              className=" text-xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {expertInText.map((letter, index) => (
                <span
                  key={`letter-${index}`}
                  className="inline-block font-medium text-sky-900"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-2xl font-bold text-sky-900 sm:text-3xl md:text-4xl lg:text-5xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="inline-block bg-gradient-to-r from-[#1DA1C9] to-[#0C87AF] bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 2px 10px rgba(29, 161, 201, 0.3)",
                  }}
                >
                  Sponsor Licence
                </motion.span>
              </h1>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className=" mb-3 text-2xl font-medium text-sky-900 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              & Work Permit
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="relative mb-6 sm:mb-8 md:mb-10 lg:mb-12"
            >
              <p className="text-xs text-gray-600 sm:text-sm md:text-base lg:text-lg">
                Comprehensive Immigration Support
                <br />
                All In One Platform
              </p>
            </motion.div>

            {/* CTA Button - responsive styling */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="transform-gpu"
            >
              <Link href="/get-in-touch" className="group inline-block w-full">
                <motion.button
                  className="relative w-48 overflow-hidden rounded-lg bg-gradient-to-r from-sky-500 to-sky-800 px-4 py-3 text-center text-sm font-medium text-white shadow-lg transition duration-300 hover:shadow-xl sm:w-56 sm:text-base md:w-64 md:text-lg lg:w-72"
                  style={{
                    transform: "perspective(1000px)",
                  }}
                >
                  <motion.span className="relative z-10 flex items-center justify-center">
                    Book Your Consultation
                  </motion.span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-r from-[#0A7A9E] to-[#065E7A] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              <Link
                href="/calculator"
                className="relative inline-flex items-center justify-center overflow-hidden mt-3 w-48 rounded-lg px-4 py-3 text-sm sm:w-56 sm:text-base border border-white/70 bg-gradient-to-br from-white/70 via-white/40 to-sky-100/30 font-medium text-sky-900 shadow-[0_4px_20px_rgba(14,116,144,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition-all duration-300 hover:border-white/90 hover:from-white/85 hover:via-white/60 hover:to-sky-100/50 hover:shadow-[0_6px_24px_rgba(14,116,144,0.18),inset_0_1px_0_rgba(255,255,255,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
              >
                Visa Fee Calculator
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Service Cards using Flexbox layout - responsive design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-6 flex w-full flex-wrap gap-3 sm:mt-8 sm:gap-4 md:mt-10 md:gap-6 lg:mt-12 lg:gap-8"
        >
          {/* First Row - Single Card with Full Width - Using custom first card */}
          <div className="w-full">{renderFirstCard()}</div>

          {/* Second Row - Two Cards Side by Side - Responsive width */}
          <div className="flex w-full gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="w-1/2">{renderServiceCard(serviceCards[1])}</div>
            <div className="w-1/2">{renderServiceCard(serviceCards[2])}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMobile;
