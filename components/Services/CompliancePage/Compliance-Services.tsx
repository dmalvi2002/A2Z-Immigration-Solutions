"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define interfaces for type safety
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link?: string;
  benefits: string[];
}

const ComplianceServices: React.FC = () => {
  // Dynamic state for service cards
  const [services, setServices] = useState<ServiceCard[]>([
    {
      id: "sponsor-licence",
      title: "Sponsor License",
      description:
        "We assist businesses in obtaining and maintaining their sponsor license, ensuring compliance with UKVI regulations and smooth processing.",
      icon: "/images/icon/sponsor.svg",
      color: "#1565c0",
      benefits: [
        "Expert guidance through the application process",
        "Regular compliance audits",
        "Comprehensive documentation support",
        "Ongoing support and advice",
      ],
    },
    {
      id: "skilled-worker-visa",
      title: "Skilled Worker Visa",
      description:
        "Our visa application service for skilled workers provides careful preparation, clear guidance and support throughout the process. Each application is assessed on its individual circumstances, and outcomes are determined by the Home Office.",
      icon: "/images/icon/skilledvisa.svg",
      color: "#1565c0",
      benefits: [
        "Personalised expert support throughout the process",
        "Faster processing with our streamlined systems",
        "Higher success rate than industry average",
        "Comprehensive documentation guidance",
      ],
    },
    // {
    //   id: "other-services",
    //   title: "Other Services",
    //   description:
    //     "Cillum qui nulla qui eu ullamco est. Ipsum esse occaecat proident nulla nostrud laborum enim cillum reprehenderit sunt voluptate consequat. Ad cillum cupidatat laborum laborum.",
    //   icon: "user",
    //   color: "#1565c0",
    //   benefits: [
    //     "Personalised expert support throughout the process",
    //     "Faster processing with our streamlined systems",
    //     "Higher success rate than industry average",
    //     "Comprehensive documentation guidance",
    //   ],
    // },
  ]);

  // State for managing modal
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedService, setSelectedService] = useState<ServiceCard | null>(
  //   null,
  // );

  // // State for FAQ visibility
  // const [showFaq, setShowFaq] = useState(false);

  // // Sample FAQ data
  // const faqs = [
  //   {
  //     question: "What is the processing time for a Skilled Worker Visa?",
  //     answer:
  //       "Processing times typically range from 3-8 weeks depending on the service option selected and your specific circumstances.",
  //   },
  //   {
  //     question: "What compliance documents do I need to maintain?",
  //     answer:
  //       "You need to maintain accurate records of employee right-to-work documents, attendance monitoring systems, and internal HR policies aligned with UKVI requirements.",
  //   },
  //   {
  //     question: "Do you offer emergency visa services?",
  //     answer:
  //       "Yes, we offer premium and priority services for urgent cases with expedited processing times.",
  //   },
  // ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.1 },
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // const faqVariants = {
  //   closed: { height: 0, opacity: 0 },
  //   open: { height: "auto", opacity: 1, transition: { duration: 0.5 } },
  // };

  // const modalVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { duration: 0.3 },
  //   },
  //   exit: {
  //     opacity: 0,
  //     scale: 0.8,
  //     transition: { duration: 0.2 },
  //   },
  // };

  // const backdropVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 },
  //   exit: { opacity: 0 },
  // };

  // // Function to render the appropriate icon based on the icon name
  // const renderIcon = (iconName: string) => {
  //   switch (iconName) {
  //     case "document":
  //       return (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 text-white"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  //           />
  //         </svg>
  //       );
  //     case "user":
  //       return (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 text-white"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  //           />
  //         </svg>
  //       );
  //     // Add more icon cases as needed
  //     default:
  //       return (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 text-white"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //           />
  //         </svg>
  //       );
  //   }
  // };

  // Function to open modal with service details
  // const openServiceModal = (service: ServiceCard) => {
  //   setSelectedService(service);
  //   setModalOpen(true);
  // };

  // // Close modal when clicking outside or on close button
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <div className="w-full bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="mb-6 text-3xl font-bold text-[#0e9dcc] sm:text-3xl md:text-4xl lg:text-5xl "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Other Services
          </motion.h1>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dynamically render service cards */}
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="rounded-lg bg-[#f7fbff] p-6 shadow-md md:max-h-[285px] md:max-w-[480px]"
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              layout
            >
              <div className="mb-4 flex items-center">
                <div className="mr-3 rounded-md transition-colors duration-300">
                  <img src={service.icon} alt={service.title} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h2>
              </div>

              <motion.p
                className="mb-6 text-sm text-gray-600"
                initial={{ height: "auto" }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {service.description}
              </motion.p>
              <a href={`/services/${service.id}`}>
                <motion.button
                  className="flex w-full items-center justify-center rounded-md px-4 py-3 text-white transition-colors duration-300"
                  style={{ backgroundColor: service.color }}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  // onClick={() => openServiceModal(service)}
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </motion.button>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        {/* <AnimatePresence>
          {modalOpen && selectedService && (
            <>
              <motion.div
                className="fixed inset-0 z-999 bg-black bg-opacity-50"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeModal}
              />

              <motion.div
                className="fixed inset-0 z-99999 flex items-center justify-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-md">
                        <img
                          src={selectedService.icon}
                          alt={selectedService.title}
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedService.title}
                      </h2>
                    </div>
                    <button
                      onClick={closeModal}
                      className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600">
                      {selectedService.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 font-semibold text-gray-800">
                      Key Benefits:
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-gray-600">
                      {selectedService.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 font-semibold text-gray-800">
                      Why Choose Us:
                    </h3>
                    <p className="text-gray-600">
                      Our team of immigration experts provides tailored
                      solutions with a track record of success. We offer
                      transparent pricing, continuous support, and a
                      client-centered approach.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      className="rounded-md px-6 py-2 text-white"
                      style={{ backgroundColor: selectedService.color }}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={closeModal}
                    >
                      Contact Us
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
};

export default ComplianceServices;
