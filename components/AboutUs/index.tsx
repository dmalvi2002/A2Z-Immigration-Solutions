"use client";
import {PageText} from "@/components/CMS/PageContent";

import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const AboutUs: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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

  return (
    <div className="mb-20">
      {/* Hero Section */}
      <motion.section
        className="relative h-96 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/features/about-us-page-cover.png')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-500/80 to-sky-500/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <motion.h1
            className="mb-4 text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          ><PageText field="heading">
            A2Z Immigration Solutions Limited
          </PageText></motion.h1>
          <motion.p
            className="max-w-3xl text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          ><PageText field="introduction">
            Growing Talent, Simplifying Journeys
          </PageText></motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <h2 className="mb-6 text-3xl font-bold text-sky-500 sm:text-3xl md:text-4xl lg:text-5xl">
              Our Journey
            </h2>
            <p className="mb-4 text-gray-700">
              Our journey began in Aberdeen, Scotland, in April 2020, with the
              goal of becoming trusted specialists in Sponsor Licences and
              Skilled Worker visas. Starting in Aberdeen, our presence has grown
              steadily to Glasgow, Edinburgh, Inverness, Dundee, Lossiemouth,
              across various Shires in Scotland, and reaching as far north as
              Wick. Today, we proudly serve businesses across the UK.
            </p>
            <p className="mb-4 text-gray-700">
              From the start, we specialised in simplifying Sponsor Licence
              applications. Over 100 businesses from sectors including
              healthcare, engineering, IT services, hospitality, property
              management, travel agencies, and religious institutions have
              relied on our support to secure sponsorship approvals. With
              careful attention to detail and tailored support, we enable each
              client to achieve compliance and attract essential global talent.
            </p>
          </motion.div>
          <motion.div
            className="relative h-80 overflow-hidden rounded-lg shadow-xl"
            variants={fadeIn}
          >
            <Image
              src="/images/features/blogs-banner.png"
              alt="A2Z Immigrants team members"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-2 text-center">
              <p className="text-sm italic text-white">
                Our dedicated team serving clients across the UK
              </p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-700">
            Alongside our Sponsor Licence expertise, we have extensive
            experience managing Skilled Worker visas, including complex
            self-sponsorship scenarios. Our clients also benefit from guidance
            on Indefinite Leave to Remain (ILR), British Citizenship,
            Discretionary Leave to Remain, Private Life applications, Spouse
            Visas, Adult Dependent Relatives, and the Ukraine Scheme.
            Additionally, we provide digitised HR management solutions, ensuring
            businesses maintain compliance effortlessly.
          </p>
          <p className="mt-6 text-gray-700">
            As recognised Experts in Sponsor Licence and Work Permit processes,
            we are committed to simplifying your immigration experience—Growing
            Talent, Simplifying Journeys.
          </p>
        </motion.div>
      </section>

      {/* Our Vision and Mission Section */}
      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-sky-500 sm:text-3xl md:text-4xl lg:text-5xl">
              Vision & Mission
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-10 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              className="rounded-lg bg-gradient-to-b from-sky-200/20 via-sky-300/25 to-sky-400/30  p-8 shadow-md"
              variants={fadeIn}
            >
              <h3 className="mb-4 text-center text-2xl font-bold text-sky-500">
                Our Vision
              </h3>
              <p className="text-gray-700">
                Our vision is to become a trusted authority in Sponsor Licences
                and Skilled Worker Visas in the UK, delivering professional
                guidance combined with innovative digital HR solutions,
                supporting sustainable growth and creating opportunities for
                businesses nationwide. "Growing Talent, Simplifying Journeys."
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg bg-gradient-to-b from-sky-200/20 via-sky-300/25 to-sky-400/30 p-8 shadow-md"
              variants={fadeIn}
            >
              <h3 className="mb-4 text-center text-2xl font-bold text-sky-500">
                Our Mission
              </h3>
              <p className="text-gray-700">
                Our mission is to simplify Sponsor Licence and Skilled Worker
                visa processes, providing reliable immigration guidance that
                enables UK businesses to attract and retain global talent
                efficiently and compliantly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      {/* <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-sky-500">Our Approach</h2>
          <p className="mx-auto max-w-3xl text-gray-700">
            At A2Z Immigrants, we've developed a distinctive methodology that
            combines legal expertise with human-centered care, ensuring your
            immigration journey is both successful and supportive.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            {
              title: "Personalised Strategy",
              description:
                "We analyze your unique circumstances, goals, and timeline to create a tailored immigration plan optimized for your specific situation.",
              icon: "🔍",
            },
            {
              title: "Transparent Communication",
              description:
                "We believe in complete clarity—explaining complex procedures in understandable terms, providing realistic timelines, and being honest about potential challenges.",
              icon: "💬",
            },
            {
              title: "Continuous Support",
              description:
                "Our commitment extends beyond paperwork. We provide cultural integration resources, community connections, and ongoing support throughout your adjustment period.",
              icon: "🤝",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-white p-8 text-center shadow-md"
              variants={fadeIn}
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-sky-500">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section> */}

      {/* Our Services Section */}
      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-sky-500 sm:text-3xl md:text-4xl lg:text-5xl">
              Comprehensive Services
            </h2>
            <p className="mx-auto max-w-3xl text-gray-700">
              Our expertise spans the entire immigration spectrum, allowing us
              to support you at every stage.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Sponsor Licence",
                description:
                  "We assist businesses in obtaining and maintaining their sponsor licence, ensuring compliance with UKVI regulations and smooth processing.",
                icon: "📄",
              },
              {
                title: "Compliance",
                description:
                  "We help maintain your compliance standards to reduce the risk of losing your sponsor licence through regular audits, documentation management, and policy reviews.",
                icon: "⚖️",
              },
              {
                title: "Skilled Worker Visa",
                description:
                  "Our end-to-end visa application process for skilled workers ensures a smooth experience with guaranteed results and full support throughout the journey.",
                icon: "🛂",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="h-full rounded-lg bg-white p-8 text-center shadow-md"
                variants={fadeIn}
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-sky-500">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Success Stories Section */}
      <section className="bg-gradient-to-b from-white to-sky-50 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-2 inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-500">
              Making A Difference
            </span>
            <h2 className="mb-4 text-3xl font-bold text-sky-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Our Impact
            </h2>
            <div className="mx-auto h-1 w-24 bg-sky-600"></div>
          </motion.div>

          {/* Stats Counters */}
          <motion.div
            className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { number: "300+", label: "Success Stories" },
              { number: "UK", label: "Countries Served" },
              { number: "121+", label: "Companies Trust Us" },
              { number: "75+", label: "Sponsor Licences Granted" },
              { number: "200+", label: "Visas Granted" },
              { number: "99%", label: "Home Office Approval Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:scale-105"
                variants={fadeIn}
              >
                <span className="mb-2 text-2xl font-bold text-sky-700 sm:text-3xl md:text-4xl lg:text-5xl">
                  {stat.number}
                </span>
                <span className="text-gray-600">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Recognition Carousel */}
          {/* <motion.div
            className="mb-12 overflow-hidden rounded-xl bg-white p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-6 text-center text-2xl font-bold text-sky-900">
              Awards & Accreditations
            </h3>

            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  icon: "🏆",
                  title: "Excellence in Immigration",
                  year: "2022",
                },
                { icon: "🌟", title: "Community Impact Award", year: "2021" },
                { icon: "🥇", title: "Best Client Experience", year: "2019" },
                { icon: "📜", title: "IAIC Certified", year: "2018" },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  className="flex w-64 flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-5 text-center transition-all hover:border-sky-200 hover:bg-sky-50"
                  initial={{ opacity: 0, rotateY: 30 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <span className="mb-3 text-4xl">{award.icon}</span>
                  <h4 className="font-bold text-sky-500">{award.title}</h4>
                  <span className="text-sm text-gray-600">{award.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Testimonial Preview */}
          <motion.div
            className="rounded-2xl bg-sky-900 p-10 text-center text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 text-5xl">❝</div>
            <p className="mb-6 text-xl font-light italic">
              A huge thank you to Fiyadh and his team for expertly guiding us
              through the process of maintaining our Sponsor Licence. Their deep
              expertise in immigration compliance, especially in SMS portal
              management and HR compliance, has been invaluable in keeping us
              fully aligned with all regulations.
            </p>
            <div className="mx-auto mb-4 h-px w-24 bg-sky-300"></div>
            <p className="font-medium">Yerasimos Angelis</p>
            <p className="text-sm text-sky-300">
              Managing Director of GA R&D LTD
            </p>

            <Link
              href="/our-clients"
              className="mt-8 inline-block rounded-full border border-white bg-transparent px-8 py-3 font-medium transition-colors hover:bg-white hover:text-sky-900"
            >
              Read More Success Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-sky-500 sm:text-3xl md:text-4xl lg:text-5xl">
              Leadership Team
            </h2>
            <p className="mx-auto max-w-3xl text-gray-700">
              Meet the dedicated professionals guiding our organization's
              mission and vision.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Fiyadh Hosne Mowla",
                role: "Director",
                bio: "Fiyadh joined A2Z in 2016 after a successful career in international development. Born in Bangladesh and having immigrated to three different countries throughout his life, he brings unique insight to our operations. Fiyadh specialises in family reunification cases and has personally overseen more than 1,500 successful applications. He holds an MBA from INSEAD and speaks five languages fluently.",
                image: "/images/user/team-02.png",
              },
              {
                name: "Shovon Mostofa",
                role: "Director",
                bio: "With a background in social work and immigration policy, Shovon leads our client experience team with empathy and precision. After experiencing the challenges of the immigration system with his own family, he dedicated his career to improving this journey for others. Shoovon has developed our renowned client-centered methodology and training program that ensures consistent, compassionate service across all our locations.",
                image: "/images/user/team-04.png",
              },
              {
                name: "Shabbir Rahman",
                role: "Director",
                bio: "Shabbir is a seasoned finance professional with over 10 years of experience. ",
                image: "/images/user/team-03.png",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
                variants={fadeIn}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-sky-500">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-sky-600">{member.role}</p>
                  {/* <p className="text-gray-700">{member.bio}</p> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
          >
        <Link
          href="/about/team"
          className="inline-block rounded-md bg-sky-500 px-6 py-3 font-medium text-white transition duration-300 hover:bg-sky-700"
        >
          Meet Our Full Team
        </Link>
          </motion.div> */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-sky-500 px-4 py-16 text-white md:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-3xl font-bold sm:text-3xl md:text-4xl">
            Begin Your Immigration Journey With Confidence
          </h2>
          <p className="mb-8 text-xl">
            Join thousands of successful clients who have trusted A2Z Immigrants
            to guide them through the complexities of immigration. Our team is
            ready to create a customised plan for your specific needs.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/services/sponsor-licence"
              className="rounded-md bg-white px-6 py-3 font-medium text-sky-500 transition duration-300 hover:bg-gray-100"
            >
              Explore Our Services
            </Link>
            <Link
              href="/get-in-touch"
              className="rounded-md border-2 border-white bg-transparent px-6 py-3 font-medium transition duration-300 hover:bg-sky-700"
            >
              Schedule a Consultation
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
