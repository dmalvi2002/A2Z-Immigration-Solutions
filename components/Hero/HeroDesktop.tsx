"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Define tab content types
type TabContent = {
  title: string;
  description: string;
  cta: string;
  features: {
    icon: React.ReactNode;
    text: string;
    highlighted: boolean;
  }[];
};

const HeroDesktop: React.FC = () => {
  // Define tab state
  const [activeTab, setActiveTab] = useState<
    "sponsor" | "compliance" | "immigration"
  >("sponsor");

  // Auto rotation for tabs
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        if (current === "sponsor") return "compliance";
        if (current === "compliance") return "immigration";
        return "sponsor";
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Define content for each tab
  const tabContents: Record<
    "sponsor" | "compliance" | "immigration",
    TabContent
  > = {
    sponsor: {
      title: "SECURE YOUR SPONSOR LICENCE WITH US!",
      description: "WHY NOT CALL US TODAY?",
      cta: "BOOK A FREE ELIGIBILITY ASSESSMENT",
      features: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          text: "Affordable Services",
          highlighted: true,
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
          text: "Peace of Mind",
          highlighted: false,
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
          text: "Customer Focus",
          highlighted: true,
        },
      ],
    },
    compliance: {
      title: "STAY COMPLIANT & AUDIT READY AT ALL TIMES",
      description: "STAY AHEAD OF REGULATIONS",
      cta: "GET A COMPLIANCE AUDIT",
      features: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          text: "Affordable Services",
          highlighted: true,
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
          text: "Peace of Mind",
          highlighted: false,
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
          text: "Customer Focus",
          highlighted: true,
        },
      ],
    },
    immigration: {
      title: "STREAMLINE YOUR IMMIGRATION PROCESS",
      description:
        "SUCCESSFUL VISA APPLICATIONS REQUIRE MEETING ELIGIBILITY CRITERIA, ACCURATE DOCUMENTATION, AND SKILLS DEMONSTRATION. OUR MOCK SESSIONS IMPROVE CONFIDENCE AND SUCCESS RATES.",
      cta: "",
      features: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          text: "Affordable Services",
          highlighted: true,
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
          text: "Peace of Mind",
          highlighted: false,
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
          text: "Customer Focus",
          highlighted: true,
        },
      ],
    },
  };

  // Tab selection handler
  const handleTabChange = (tab: "sponsor" | "compliance" | "immigration") => {
    setActiveTab(tab);
    setAutoRotate(false); // Stop auto rotation when manually changing tabs
  };

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

  const floatingAnimation = {
    y: [0, -1, 0],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-[600px] w-full overflow-hidden bg-white md:min-h-[700px] lg:min-h-[792px]">
      {/* Enhanced 3D background with gradients */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute h-full w-full bg-white opacity-70"></div>

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-b from-blue-300 to-blue-100 opacity-30 backdrop-blur-md"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${Math.random() * 30}deg) rotateY(${Math.random() * 30}deg)`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotateX: [
                Math.random() * 30,
                Math.random() * -30,
                Math.random() * 30,
              ],
              rotateY: [
                Math.random() * 30,
                Math.random() * -30,
                Math.random() * 30,
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute h-full w-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`surface-${i}`}
              className="absolute bg-gradient-to-br from-blue-200 to-transparent"
              style={{
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                opacity: 0.1,
                transform: `perspective(1000px) rotateX(${i * 5}deg) rotateY(${i * 3}deg) translateZ(${i * 10}px)`,
              }}
              animate={{
                rotateX: [i * 5, i * 5 + 2, i * 5],
                rotateY: [i * 3, i * 3 + 2, i * 3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div> */}

      {/* Main content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 py-28 md:flex-row md:px-16 md:py-46 lg:px-12 xl:px-8 min-[1380px]:px-0">
        {/* Left Content with Enhanced 3D Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-1/2"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-20"
          >
            <motion.div
              variants={itemVariants}
              className="mb-2 text-xl font-bold text-sky-800 sm:text-2xl md:text-3xl xl:text-4xl"
            >
              <span className="inline-block">E</span>
              <span className="inline-block">x</span>
              <span className="inline-block">p</span>
              <span className="inline-block">e</span>
              <span className="inline-block">r</span>
              <span className="inline-block">t</span>
              <span className="inline-block">&nbsp;</span>
              <span className="inline-block">i</span>
              <span className="inline-block">n</span>
            </motion.div>

            <motion.div variants={itemVariants} className="relative mb-3">
              <h1 className="text-3xl font-bold text-[#1DA1C9] sm:text-4xl md:text-5xl  xl:text-6xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="inline-block"
                  style={{
                    textShadow: "0 2px 10px rgba(29, 161, 201, 0.3)",
                    background: "linear-gradient(to bottom, #1DA1C9, #0C87AF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Sponsor Licence
                </motion.span>
              </h1>
              {/* <motion.div
                className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              /> */}
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mb-6 text-xl font-bold text-sky-800  sm:text-2xl md:text-3xl xl:text-4xl"
            >
              & Work Permit
            </motion.h2>

            <motion.div variants={itemVariants} className="relative mb-8">
              <p className="text-base text-gray-600 sm:text-lg">
                Comprehensive Immigration Support
                <br />
                All In One Platform
              </p>
              {/* <motion.div
                className="absolute -right-10 bottom-0 h-10 w-10 rounded-full bg-gradient-to-b from-blue-300 to-blue-400 opacity-30"
                animate={floatingAnimation}
              /> */}
            </motion.div>

            <motion.div variants={itemVariants} className="flex transform-gpu flex-wrap items-center gap-3">
              <Link href="/get-in-touch" className="group inline-block">
                <motion.button
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-sky-800 px-6 py-3 font-medium text-white shadow-2xl  hover:shadow-2xl"
                  style={{
                    transform: "perspective(1000px)",
                    boxShadow:
                      "0 0 10px rgba(0, 198, 243, 0.2), 0 0 20px rgba(0, 219, 243, 0.3)",
                  }}
                  whileHover={{
                    background: "linear-gradient(to right, #1DA1C9, #0C87AF)",
                    boxShadow:
                      "0 0 20px rgba(0, 166, 243, 0.5), 0 0 30px rgba(0, 203, 243, 0.5)",
                  }}
                >
                  <motion.span className="relative z-10 flex items-center">
                    Book A Free Consultation
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      style={{ rotate: "-45deg" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </motion.svg>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-sky-500 to-sky-800 opacity-50 blur-md"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-md bg-sky-400 opacity-20 blur-lg"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                </motion.button>
              </Link>
              <Link
                href="/calculator"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-6 py-3 border border-white/70 bg-gradient-to-br from-white/70 via-white/40 to-sky-100/30 font-medium text-sky-900 shadow-[0_4px_20px_rgba(14,116,144,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition-all duration-300 hover:border-white/90 hover:from-white/85 hover:via-white/60 hover:to-sky-100/50 hover:shadow-[0_6px_24px_rgba(14,116,144,0.18),inset_0_1px_0_rgba(255,255,255,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
              >
                Visa Fee Calculator
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced 3D decorative elements */}
          {/* <motion.div
            className="absolute -left-10 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-70 shadow-xl"
            style={{
              filter: "blur(2px)",
              transform: "perspective(1000px) rotateX(10deg) rotateY(-10deg)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, -10, 0],
              rotateX: [10, 15, 10],
              rotateY: [-10, -15, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-200 to-blue-100 opacity-70 shadow-xl"
            style={{
              filter: "blur(2px)",
              transform: "perspective(1000px) rotateX(-10deg) rotateY(10deg)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
              rotateX: [-10, -15, -10],
              rotateY: [10, 15, 10],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          /> */}
        </motion.div>

        {/* Right Card with Enhanced 3D and Shadow Effects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-xl md:w-[60%]"
        >
          {/* Animated 3D shadow effect */}
          <motion.div
            className="absolute inset-0 -left-8 h-full w-full rounded-full bg-gradient-to-br from-blue-400 to-sky-500 opacity-90"
            style={{
              filter: "blur(200px)",
              transform: "perspective(1000px) rotateX(10deg) rotateY(-10deg)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -50, 0],
              rotateX: [10, 15, 10],
              rotateY: [-10, -15, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />

          {/* Animated 3D card effect */}
          <motion.div
            className="absolute -left-4 -top-4 h-[80%] w-full rounded-lg bg-gradient-to-br from-[#18b1ff] to-[#95deff] opacity-50"
            style={{
              transform: "perspective(1000px) rotateX(3deg) rotateY(-2deg)",
              filter: "blur(2px)",
            }}
            animate={{
              rotate: [-1, 1, -1],
              x: [0, 4, 0],
              y: [0, -4, 0],
              rotateX: [3, 5, 3],
              rotateY: [-2, -3, -2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />

          <motion.div
            className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#04A4D8] to-[#025772] shadow-xl"
            style={{
              transform: "perspective(1000px)",
              height: "auto", // Changed from fixed height to auto
              minHeight: "340px",
            }}
          >
            {/* Enhanced Tab Header with responsive text sizes */}
            <div className="flex flex-wrap gap-0">
              {["sponsor", "compliance", "immigration"].map((tab) => (
                <motion.div
                  key={tab}
                  className={`flex-1 cursor-pointer p-1 text-center font-semibold sm:p-2
        ${activeTab === tab ? "rounded-tl-3xl rounded-tr-3xl bg-transparent text-white" : "border-none bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700"}
        ${
          activeTab === "sponsor"
            ? tab === "compliance"
              ? "rounded-bl-3xl rounded-br-none"
              : tab === "immigration"
                ? "rounded-none"
                : ""
            : activeTab === "immigration"
              ? tab === "sponsor"
                ? "rounded-none"
                : tab === "compliance"
                  ? "rounded-bl-none rounded-br-3xl"
                  : ""
              : activeTab === "compliance"
                ? tab === "sponsor"
                  ? "rounded-bl-none rounded-br-3xl"
                  : tab === "immigration"
                    ? "rounded-bl-3xl rounded-br-none"
                    : ""
                : "rounded-bl-3xl rounded-br-3xl"
        }`}
                  onClick={() => handleTabChange(tab as any)}
                  style={{
                    transform:
                      activeTab === tab
                        ? "perspective(1000px) translateZ(10px)"
                        : "perspective(1000px)",
                    boxShadow: activeTab === tab ? "" : "none",
                  }}
                  whileHover={{
                    backgroundColor:
                      activeTab === tab ? "transparent" : "#e5e7eb",
                    translateZ: 5,
                  }}
                  whileTap={{ scale: 1 }}
                >
                  <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay:
                        0.1 *
                        ["sponsor", "compliance", "immigration"].indexOf(tab),
                    }}
                    className="text-xs sm:text-sm"
                  >
                    {tab === "sponsor" ? "SPONSOR LICENCE" : tab.toUpperCase()}
                  </motion.div>
                  {activeTab === tab && (
                    <motion.div
                      className="mx-auto mt-1 h-1 w-1/2 rounded-full bg-white"
                      layoutId="activeTab"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Card Content with responsive layout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-transparent p-3 text-white sm:p-6"
                style={{
                  transform: "perspective(1000px)",
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-6 w-6 rotate-45 rounded-md border border-white sm:h-8 sm:w-8"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `perspective(1000px) rotateX(${Math.random() * 45}deg) rotateY(${Math.random() * 45}deg) translateZ(${Math.random() * 20}px)`,
                      }}
                      animate={{
                        rotate: ["45deg", "135deg", "45deg"],
                        scale: [1, 1.2, 1],
                        rotateX: [
                          Math.random() * 45,
                          Math.random() * -45,
                          Math.random() * 45,
                        ],
                        rotateY: [
                          Math.random() * 45,
                          Math.random() * -45,
                          Math.random() * 45,
                        ],
                      }}
                      transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Responsive content layout - stacked on mobile, side-by-side on larger screens */}
                <div className="relative z-10 flex min-h-[236px] flex-col sm:flex-row">
                  <div className="flex flex-1 flex-col pr-1">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-2 text-xl font-extrabold sm:mb-6 sm:text-2xl"
                      style={{
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        fontWeight: "bolder",
                      }}
                    >
                      {tabContents[activeTab].title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-shadow-sm mb-1 text-sm text-white/60 sm:text-base"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                    >
                      {tabContents[activeTab].description}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="test-shadow-sm mb-4 text-sm text-white/60 sm:mb-6 sm:text-base"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                    >
                      {tabContents[activeTab].cta}
                    </motion.p>
                  </div>

                  {/* Responsive image container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="flex items-center justify-center sm:justify-end"
                  >
                    <div className="mt-2 flex h-24 w-24 items-center justify-center overflow-hidden bg-transparent sm:mt-0 sm:h-36 sm:w-36">
                      <motion.div
                        animate={floatingAnimation}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transform: "perspective(1000px) rotateY(10deg)",
                        }}
                        className="flex items-center justify-center"
                      >
                        <Image
                          src={`/images/hero/${activeTab}.png`}
                          alt={`${activeTab} illustration`}
                          layout="fill"
                          className="rounded-md object-cover drop-shadow-lg"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tab Progress Indicator */}
            {autoRotate && (
              <motion.div
                className="absolute bottom-0 h-1 bg-gradient-to-r from-[#04A4D8] to-[#025772]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Enhanced 3D Feature Cards with Gradient Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {tabContents[activeTab].features.map((feature, index) => (
              <motion.div
                key={`feature-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`relative flex h-17 flex-1 items-center rounded-lg p-2 shadow-md transition-all duration-300 hover:shadow-lg ${
                  feature.highlighted
                    ? "bg-gradient-to-br from-[#04A4D8] to-[#025772] text-white"
                    : "bg-gradient-to-br from-white to-blue-50 text-gray-700"
                }`}
                style={{
                  transform: "perspective(1000px) rotateX(2deg)",
                  minWidth: "130px",
                }}
                whileHover={{
                  scale: 1.03,
                  rotateX: 0,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-lg opacity-20"
                  style={{ zIndex: 0 }}
                >
                  <motion.div
                    className={`h-full w-full ${
                      feature.highlighted
                        ? "bg-gradient-to-r from-blue-300 to-blue-400"
                        : "bg-gradient-to-r from-blue-100 to-blue-200"
                    }`}
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 5 + index,
                    }}
                  />
                </motion.div>

                <div className="relative z-10 mr-2 flex-shrink-0 text-lg sm:text-xl">
                  {feature.icon}
                </div>
                <div className="relative z-10 text-xs font-bold sm:text-sm">
                  {feature.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroDesktop;
