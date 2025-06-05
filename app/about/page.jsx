"use client";
import React from "react";
import VerticalAd from "../components/VerticalAd";
import HorizontalAd from "../components/HorizontalAd";
import AdComponent from "../components/AdComponent";

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] min-h-screen py-16 px-4">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto pb-20">
        {/* Left: Logo & Intro */}
        <div className="flex flex-col items-center md:items-start flex-1">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-full border-4 border-fuchsia-400 overflow-hidden shadow-lg bg-white">
              <img
                src="assets/ERRTEKNALOZY.jpg"
                alt="ERRTEKNALOZY Logo"
                className="object-cover w-full h-full"
                draggable={false}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-yellow-400">
              ERRTEKNALOZY
            </h1>
          </div>
          <div className="text-lg md:text-xl text-gray-200 max-w-md mb-4 text-center md:text-left">
            <span className="text-cyan-300 font-semibold">Building ideas</span>
            <span className="mx-1 text-gray-400">into</span>
            <span className="text-fuchsia-400 font-semibold">reality</span>
            <span className="mx-1 text-gray-400">
              at the speed of innovation.
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white font-semibold shadow">
              #WebDevelopment
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold shadow">
              #AI
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-orange-400 text-white font-semibold shadow">
              #Inspiration
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow">
              #TechTips
            </span>
          </div>
        </div>
        {/* Right: Tech Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/assets/company.jpg"
            alt="Technology illustration"
            className="rounded-2xl shadow-2xl w-full max-w-lg border-2 border-cyan-900"
          />
        </div>
      </section>

      {/* Info Grid Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">
        {/* Our Mission */}
        <div className="bg-[#181d31]/60 rounded-2xl shadow-xl border border-cyan-900 p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-gray-300 mb-2">
            To empower technology enthusiasts, developers, and creators with the
            latest trends, guides, and inspiration from the ever-evolving
            digital world.
          </p>
        </div>
        {/* Why ERRTEKNALOZY */}
        <div className="bg-[#181d31]/60 rounded-2xl shadow-xl border border-fuchsia-900 p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Why ERRTEKNALOZY?
          </h2>
          <p className="text-gray-300 mb-2">
            We’re more than just a blog—ERRTEKNALOZY is a vibrant community and
            your trusted resource for knowledge that sparks curiosity, fuels
            growth, and drives digital innovation.
          </p>
        </div>
        {/* Our Vision */}
        <div className="bg-[#181d31]/60 rounded-2xl shadow-xl border border-yellow-900 p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-gray-300 mb-2">
            To create a space where curiosity meets expertise, and every reader
            leaves with new knowledge or inspiration—ready to shape the future.
          </p>
        </div>
      </section>

      <VerticalAd />

      {/* Call-to-action Section */}
      <section className="max-w-4xl mx-auto mt-20 text-center">
        <div className="bg-gradient-to-r from-cyan-800/80 via-fuchsia-800/80 to-yellow-800/70 rounded-2xl shadow-lg p-10 border border-fuchsia-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-fuchsia-400 to-cyan-400">
            Ready to start your journey?
          </h3>
          <p className="text-lg text-gray-200 mb-6">
            Dive into our blog, join the conversation, and let’s build the
            future together with{" "}
            <span className="text-fuchsia-400 font-bold">ERRTEKNALOZY</span>.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-semibold shadow-lg transition-all duration-300"
          >
            Explore the Blog
          </a>
        </div>
      </section>
    </main>
  );
}
