"use client";

// File: /components/Banner/SponsorLicenceBanner.tsx
import React from "react";
import Image from "next/image";

const BlogsBanner = () => {
  return (
    <div className="relative -z-0  h-96 w-full  overflow-hidden">
      {/* Background Image - Tower Bridge */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/features/blogs-banner.png"
          alt="Tower Bridge London"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Blue gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-sky-500/70 to-sky-600/60"
        aria-hidden="true"
      />

      {/* Title */}
      <div className="relative flex h-full items-center justify-center px-4 md:px-8">
        <p className="text-center text-3xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl">
          Blogs & Articles
        </p>
      </div>
    </div>
  );
};

export default BlogsBanner;
