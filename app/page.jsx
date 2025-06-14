"use client";
import React from "react";
import Navbar from "./components/Navbar";
import PopularCategories from "./components/PopularCategories";
import RecentPosts from "./components/RecentPosts";
import AdComponent from "./components/AdComponent";
import ImportantUpdates from "./components/ImportantUpdates";
import Testimonial from "./components/Testimonial";
import HorizontalAd from "./components/HorizontalAd";
import HeroVideoSection from "./components/HeroVideoSection";
import WhatWeDo from "./components/WhatWeDo";
import TechStackShowcase from "./components/TechStackShowcase";
import WhyChooseUs from "./components/WhyChooseUs";
import CompanyBanner from "./components/CompanyBanner";
import OurRecentCreations from "./components/OurRecentCreations";

const Page = () => {
  return (
    <>
      {/* Main container */}
      <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] text-white px-4 sm:px-6 lg:px-0 ">
        {/* Hero Section with Background Video and Quote */}
        <HeroVideoSection />

        {/* 💼 What We Do Section */}
        <WhatWeDo />

        <TechStackShowcase />

        <WhyChooseUs />

        <OurRecentCreations/>

        <CompanyBanner />

        {/* <section className="mb-16">
          <ImportantUpdates />
        </section> */}

        {/* Horizontal Ad */}
        <HorizontalAd dataAdFormat="auto" dataFullWidthResponsive={true} />

        {/* <section className="mb-16">
          <RecentPosts />
        </section> */}

        {/* Another Horizontal Ad */}
        {/* <HorizontalAd dataAdFormat="auto" dataFullWidthResponsive={true} /> */}

        {/* Testimonials */}
        <section className="mb-4">
          <Testimonial />
        </section>
      </div>
    </>
  );
};

export default Page;
