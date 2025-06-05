"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import image from "../public/assets/project1.jpg";
import PopularCategories from "./components/PopularCategories";
import RecentPosts from "./components/RecentPosts";
import AdComponent from "./components/AdComponent";
import ImportantUpdates from "./components/ImportantUpdates";
import Testimonial from "./components/Testimonial";
import HorizontalAd from "./components/HorizontalAd";

const Page = () => {
  return (
    <>
      {/* Main container */}
      <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] text-white px-4 sm:px-6 lg:px-12 py-10 lg:py-20">
        {/* Blog Quote Section */}
        <section className="text-center max-w-5xl mx-auto mb-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-snug text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-orange-400 drop-shadow-xl mb-6">
            “Words have the power to build worlds, spark revolutions, and echo
            across time. Every sentence is a doorway to new perspectives, every
            story a spark of change.”
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-medium">
            Step into a world where thoughts transform into inspiration —{" "}
            <span className="text-cyan-400 font-semibold">
              welcome to our blog.
            </span>
          </p>
        </section>

        {/* Image and Text Section */}
        {/* <section className="flex flex-col md:flex-row items-center bg-zinc-900/90 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto mb-20 border border-cyan-800/20"> */}
        {/* Image Left */}
        {/* <div className="w-full md:w-1/2 h-80 md:h-full relative">
            <Image
              src={image}
              alt="Blog Inspiration"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div> */}

        {/* Text Right */}
        {/* <div className="w-full md:w-1/2 px-8 py-12 flex flex-col items-center md:items-start justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Discover the Voice Behind the Vision
            </h2>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-lg">
              Dive into our carefully crafted articles filled with insights,
              creativity, and stories that inspire. Whether you're here to
              learn, reflect, or simply explore, there's something for every
              curious mind.
            </p>
            <button className="mt-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-8 py-3 rounded-xl shadow-lg font-semibold text-base sm:text-lg hover:opacity-90 hover:scale-105 transition-transform duration-300">
              Explore Posts
            </button>
          </div>
        </section> */}

        {/* Important Updates */}
        <section className="">
          <ImportantUpdates />
        </section>

        <HorizontalAd
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          // className="h-96"
        />

        {/* Recent Posts */}
        <section className="">
          <RecentPosts />
        </section>
        <HorizontalAd
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          // className="h-96"
        />
        {/* Testimonials */}
        <section className="mb-4">
          <Testimonial />
        </section>
      </div>
    </>
  );
};

export default Page;
