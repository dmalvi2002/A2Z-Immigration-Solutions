"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronDown, ChevronUp } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  position: string;
  location: string;
  avatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "Had a great experience! Big thanks for all the support with my visa. The team’s really helpful, especially Fahim bhai. Would definitely recommend if you need help with visa stuff!",
    name: "Tanafz",
    position: "CEO",
    location: "Scotland, UK",
    avatar: "/images/user/user-01.png",
    rating: 5,
  },
  {
    id: 3,
    content:
      "I had a super experience throughout the journey. Me and my wife always got great help and cooperation from the team. Everyone is very helpful. A special thanks to Fahim bhai for his continuous support. Wish you good luck A2Z Immigration Solutions Ltd.",
    name: "Mohammed Afzal",
    position: "Product Manager",
    location: "Scotland, UK",
    avatar: "/images/user/user-01.png",
    rating: 4,
  },
  {
    id: 4,
    content:
      "A2Z Immigration Solution team is fantastic! They helped me with my immigration docs, and I’m thrilled with the outcome. Sharon’s professionalism and the team’s efficiency are amazing. Highly recommend their friendly, expert service!",
    name: "Nahid Tangil Rahaman",
    position: "Founder",
    location: "Scotland, UK",
    avatar: "/images/user/user-02.png",
    rating: 5,
  },
  {
    id: 5,
    content:
      "They provide their clients all the relevant and true information required to make their migration journey as obstacle free as possible, would highly recommend to all people who are interested in moving to UK.",
    name: "Aamna Haneef",
    position: "CTO",
    location: "Scotland, UK",
    avatar: "/images/user/user-01.png",
    rating: 5,
  },
  {
    id: 6,
    content:
      "I'm really appreciate their service. everyone is very helpful and kind. One thing i really like,that is they always give good and helpful advice.",
    name: "Ahmed Shuvo",
    position: "VP of Operations",
    location: "Scotland, UK",
    avatar: "/images/user/user-02.png",
    rating: 5,
  },
  {
    id: 7,
    content: "Very friendly & work with care .service was good",
    name: "Iqra Mukther",
    position: "Startup Founder",
    location: "Scotland, UK",
    avatar: "/images/user/user-01.png",
    rating: 4,
  },
  {
    id: 8,
    content:
      "Excellent service and very helpful. Always got very quick response if I needed to know anything. I would recommend them anytime.",
    name: "Fayez Ahmed",
    position: "Creative Director",
    location: "Scotland, UK",
    avatar: "/images/user/user-02.png",
    rating: 5,
  },
  {
    id: 9,
    content: "Very good service and well guidance. Thank you!",
    name: "Imran Ahmed",
    position: "Head of Digital",
    location: "Scotland, UK",
    avatar: "/images/user/user-01.png",
    rating: 5,
  },
  {
    id: 10,
    content: "Very good service provided by A2Z.",
    name: "Zubair Ahmad",
    position: "Head of Digital",
    location: "Scotland, UK",
    avatar: "/images/user/user-02.png",
    rating: 5,
  },
];

const WhoLovesUs: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Animation variants - simplified for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const moreCardsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
        delay: 0.05 * custom,
      },
    }),
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  // Get initial visible testimonials and hidden ones
  const firstSixTestimonials = testimonials.slice(0, 6);
  const remainingTestimonials = testimonials.slice(6, 9);

  return (
    <section className="bg-gradient-to-b from-sky-600 to-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <motion.div
            className="mx-auto mb-2 h-1 w-16 rounded-full bg-white/70"
            animate={{
              width: ["0%", "30%"],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Discover why our clients love working with us. Real stories from
            real people who have experienced the difference our services make.
          </p>
        </motion.div>

        {/* First 6 Testimonial Cards */}
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {firstSixTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                onHoverStart={() => setActiveCard(testimonial.id)}
                onHoverEnd={() => setActiveCard(null)}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300"
              >
                <div className="p-6 lg:p-7">
                  {/* Border top with gradient */}
                  {/* <div className="absolute inset-x-0 top-0 h-0 bg-gradient-to-r from-primary to-primary/60"></div> */}

                  {/* Card content with smooth hover state */}
                  <div className="relative">
                    {/* Rating stars */}
                    {/* <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div> */}

                    {/* Testimonial text */}
                    <div className="relative mb-6">
                      {/* <Quote className="absolute -left-1 -top-1 h-8 w-8 text-primary/15" /> */}
                      <p className="pl-2 pt-2 leading-relaxed text-gray-700">
                        {testimonial.content}
                      </p>
                    </div>

                    {/* Author info with smooth hover effect */}
                    <motion.div
                      className="mt-6 flex items-center gap-4"
                      animate={{
                        scale: activeCard === testimonial.id ? 1.02 : 1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/10 shadow-sm">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {testimonial.name}
                        </h3>
                        {/* <p className="text-sm font-medium text-gray-600">
                          {testimonial.position}
                        </p> */}
                        <p className="text-xs text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Remaining Cards (Shown when expanded) */}
        <div className="relative">
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {remainingTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    custom={index}
                    variants={moreCardsVariants}
                    onHoverStart={() => setActiveCard(testimonial.id)}
                    onHoverEnd={() => setActiveCard(null)}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300"
                  >
                    <div className="p-6 lg:p-7">
                      {/* Border top with gradient */}
                      {/* <div className="absolute inset-x-0 top-0 h-0 bg-gradient-to-r from-primary to-primary/60"></div> */}

                      {/* Card content with smooth hover state */}
                      <div className="relative">
                        {/* Rating stars */}
                        {/* <div className="mb-4 flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div> */}

                        {/* Testimonial text */}
                        <div className="relative mb-6">
                          {/* <Quote className="absolute -left-1 -top-1 h-8 w-8 text-primary/15" /> */}
                          <p className="pl-2 pt-2 leading-relaxed text-gray-700">
                            {testimonial.content}
                          </p>
                        </div>

                        {/* Author info with smooth hover effect */}
                        <motion.div
                          className="mt-6 flex items-center gap-4"
                          animate={{
                            scale: activeCard === testimonial.id ? 1.02 : 1,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/10 shadow-sm">
                            {testimonial.avatar ? (
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                                {testimonial.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              {testimonial.name}
                            </h3>
                            {/* <p className="text-sm font-medium text-gray-600">
                              {testimonial.position}
                            </p> */}
                            <p className="text-xs text-gray-500">
                              {testimonial.location}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fade effect for hidden cards */}
        </div>

        {/* Toggle button - improved with subtle animation */}
        <motion.div
          className="mt-8 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={buttonVariants}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover="hover"
            variants={buttonVariants}
            className="z-30 flex items-center gap-2 rounded-full bg-gradient-to-t from-sky-500 via-sky-600 to-sky-700 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:brightness-110"
          >
            {showAll ? (
              <>
                See Less <ChevronUp className="h-5 w-5" />
              </>
            ) : (
              <>
                See More <ChevronDown className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
      {!showAll && (
        <div className="relative -bottom-20 z-10 w-full">
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
        </div>
      )}
    </section>
  );
};

export default WhoLovesUs;
