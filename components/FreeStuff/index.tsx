"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { submitEnquiry } from "@/utils/submitEnquiry";

type Resource = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fileUrl: string;
  fileSize?: string;
};

interface FreeStuffProps {
  publicKey: string;
}

const FreeStuff: React.FC<FreeStuffProps> = ({ publicKey }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const resources: Resource[] = [
    {
      id: "visa-guide",
      title: "Complete Visa Application Guide",
      description:
        "Step-by-step instructions to complete your visa application successfully with expert tips and common pitfalls to avoid.",
      imageUrl: "/images/stuff/book-stack1.png",
      fileUrl: "/downloads/visa-application-guide.pdf",
    },
  ];

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
    setEmail("");
    setEmailError("");
    setIsSuccess(false);
  };

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    submitEnquiry({
      email,
      source: "Free resource download",
      subject: selectedResource?.title || "Free resource",
      message: "Requested a free resource download.",
    })
      .then(
        () => {
          setIsLoading(false);
          setIsSuccess(true);

          // Automatically download file after 1.5 seconds of showing success message
          setTimeout(() => {
            if (selectedResource) {
              const link = document.createElement("a");
              link.href = selectedResource.fileUrl;
              link.download =
                selectedResource.fileUrl.split("/").pop() || "download";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }, 1500);
        },
        (error) => {
          console.error("FreeStuff Failed to send email:", error);
          setIsLoading(false);
          setEmailError(
            error.message ||
              "Failed to send email. Please check your connection and try again.",
          );
        },
      )
      .catch((error) => {
        console.error("FreeStuff EmailJS error:", error);
        setIsLoading(false);
        setEmailError("An unexpected error occurred. Please try again later.");
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  return (
    <>
      {/* Enhanced Hero Section with more attractive gradient and particles */}
      <motion.section
        className="relative h-96 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/features/free-stuff.png')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-500/80 to-sky-500/90" />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            className="mt-4 max-w-3xl px-2 sm:mt-10 sm:px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1
              className="mb-2 text-3xl font-bold leading-tight text-white sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Free Resources
            </motion.h1>
            <motion.p
              className="mx-auto mb-4 max-w-2xl text-base text-white opacity-90 sm:mb-8 sm:text-lg md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Download our expert guides to help navigate your immigration
              journey with confidence
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <a
                href="#resources"
                className="inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-sky-700 shadow-lg transition-all duration-300 hover:bg-sky-100 hover:shadow-xl sm:px-8 sm:py-3 sm:text-base"
              >
                Explore Resources
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction Section with improved typography and spacing */}
      <section className="bg-gray-50 py-16">
        <motion.div
          className="mx-auto max-w-4xl px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-3xl md:text-4xl  ">
            <span className="inline-block text-sky-600">Essential</span> For
            Immigrants
          </h2>
          <p className="mx-auto mb-10 text-lg leading-relaxed text-gray-700">
            We've created these comprehensive guides to help you navigate the
            complex immigration process with confidence. Each resource is
            created by our expert team with years of experience helping
            thousands of immigrants achieve their goals.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-sky-100 p-2">
                <svg
                  className="h-6 w-6 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Expert-Verified Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-sky-100 p-2">
                <svg
                  className="h-6 w-6 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Regularly Updated</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-sky-100 p-2">
                <svg
                  className="h-6 w-6 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">100% Free Downloads</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Resources Grid - Centered with improved card design */}
      <section id="resources" className="mx-auto max-w-6xl px-4 py-16">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Browse <span className="text-sky-600">Here</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              variants={fadeIn}
            >
              <div className="relative h-56 w-full overflow-hidden bg-sky-100">
                <Image
                  src={resource.imageUrl}
                  alt={resource.title}
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {resource.title}
                </h3>
                <div className="mb-4 flex items-center">
                  <div className="h-1 w-12 rounded bg-sky-500"></div>
                </div>
                <p className="flex-grow text-gray-600">
                  {resource.description}
                </p>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <svg
                    className="mr-2 h-5 w-5 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <span>PDF • {resource.fileSize || "2.4 MB"}</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleDownloadClick(resource)}
                  className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-white shadow-md transition-all duration-300 hover:from-sky-400 hover:to-sky-600 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center font-medium transition-transform duration-300 group-hover:scale-105">
                    <svg
                      className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Free Guide
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra call to action */}
        <motion.div
          className="mt-16 rounded-xl bg-gradient-to-r from-sky-700 to-sky-500 p-8 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 text-3xl font-bold text-white sm:text-3xl md:text-4xl ">
            Need Additional Help?
          </h3>
          <p className="mb-6 text-white opacity-90">
            Our immigration experts are available to answer your questions and
            provide personalised guidance.
          </p>
          <a
            href="/get-in-touch"
            className="rounded-lg bg-white px-6 py-3 font-medium text-sky-700 transition-all duration-300 hover:bg-sky-50"
          >
            Contact Our Team
          </a>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      {/* <motion.div
        className="mb-20 mt-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-3xl sm:text-3xl md:text-4xl  font-bold text-gray-800">
          Ready to join our success stories?
        </h2>
        <a href="/get-in-touch">
          <motion.button
            className="rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 px-8 py-3 font-bold text-white shadow-lg  hover:shadow-xl"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Consultation
          </motion.button>
        </a>
      </motion.div> */}

      {/* Email Collection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-xl font-bold text-sky-500">
                    {isSuccess ? "Thank You!" : "Download Your Free Guide"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                {isSuccess ? (
                  <div className="py-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <p className="mb-2 text-gray-700">
                      Your download is starting automatically...
                    </p>
                    <p className="text-sm text-gray-600">
                      We've also added you to our newsletter. Check your inbox
                      for a confirmation email.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mb-6 text-gray-700">
                      Enter your email address to get instant access to
                      <span className="font-semibold">
                        {" "}
                        {selectedResource?.title}
                      </span>
                    </p>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        className={`w-full border p-3 ${emailError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <p className="mt-1 text-sm text-red-600">
                          {emailError}
                        </p>
                      )}
                    </div>

                    <div className="mb-6 text-sm text-gray-600">
                      By downloading this resource, you agree to receive our
                      newsletter with immigration tips and updates. We respect
                      your privacy and you can unsubscribe at any time.
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="flex w-full items-center justify-center rounded-md bg-sky-500 px-4 py-3 font-medium text-white transition duration-300 hover:bg-sky-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Get Your Free Guide Now"
                      )}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FreeStuff;
