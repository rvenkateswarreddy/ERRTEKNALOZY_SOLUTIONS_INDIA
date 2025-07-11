"use client";
import React, { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Lazily load heavy/secondary components for better performance ("above the fold" loads first)
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });
const PopularCategories = dynamic(() => import("./components/PopularCategories"), { ssr: false });
const RecentPosts = dynamic(() => import("./components/RecentPosts"), { ssr: false });
const AdComponent = dynamic(() => import("./components/AdComponent"), { ssr: false });
const ImportantUpdates = dynamic(() => import("./components/ImportantUpdates"), { ssr: false });
const Testimonial = dynamic(() => import("./components/Testimonial"), {
  loading: () => <div className="text-gray-400 w-full text-center py-8">Loading testimonials…</div>,
  ssr: false,
});
const HorizontalAd = dynamic(() => import("./components/HorizontalAd"), {
  loading: () => <div className="text-gray-400 w-full text-center py-4">Loading ad…</div>,
  ssr: false,
});
const HeroVideoSection = dynamic(() => import("./components/HeroVideoSection"), { ssr: false });
const WhatWeDo = dynamic(() => import("./components/WhatWeDo"), { ssr: false });
const TechStackShowcase = dynamic(() => import("./components/TechStackShowcase"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), { ssr: false });
const CompanyBanner = dynamic(() => import("./components/CompanyBanner"), { ssr: false });
const OurRecentCreations = dynamic(() => import("./components/OurRecentCreations"), { ssr: false });

// SEO improvements
const SEO = () => (
  <Head>
    <title>ERRTEKNALOZY | Full Stack Tech Agency | Innovation & Solutions</title>
    <meta
      name="description"
      content="ERRTEKNALOZY is a leading tech agency specializing in digital innovation, web and mobile solutions, cloud, AI, and more. Discover our services, stack, and recent work."
    />
    <meta property="og:title" content="ERRTEKNALOZY | Full Stack Tech Agency" />
    <meta
      property="og:description"
      content="Explore ERRTEKNALOZY's offerings in web, mobile, cloud, AI, and more. See why leading brands choose us."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://errteknalozy.com/" />
    <meta property="og:image" content="https://errteknalozy.com/assets/og-image.jpg" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="https://errteknalozy.com/" />
  </Head>
);

const Page = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] text-white px-4 sm:px-6 lg:px-0 ">
        {/* Navbar: if you want it persistent, move outside Suspense */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        
        {/* Hero section is above the fold, load early */}
        <Suspense fallback={<div className="w-full text-center py-16">Loading hero...</div>}>
          <HeroVideoSection />
        </Suspense>

        <Suspense fallback={<div className="w-full text-center py-10">Loading content...</div>}>
          <WhatWeDo />
          <TechStackShowcase />
          <WhyChooseUs />
          <OurRecentCreations />
          <CompanyBanner />
        </Suspense>

        {/* Uncomment below if you want to show important updates */}
        {/* <Suspense fallback={null}>
          <section className="mb-16">
            <ImportantUpdates />
          </section>
        </Suspense> */}

        {/* Uncomment for horizontal or display ads */}
        {/* <Suspense fallback={null}>
          <HorizontalAd dataAdFormat="auto" dataFullWidthResponsive={true} />
        </Suspense> */}

        {/* Uncomment for blog/recent post feed */}
        {/* <Suspense fallback={null}>
          <section className="mb-16">
            <RecentPosts />
          </section>
        </Suspense> */}

        {/* Testimonials (always shown) */}
        <section className="mb-4">
          <Suspense fallback={<div className="text-gray-400 w-full text-center py-8">Loading testimonials…</div>}>
            <Testimonial />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default Page;