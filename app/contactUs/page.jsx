"use client";
import React from "react";
import { FiMail, FiSend, FiPhone, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import VerticalAd from "../components/VerticalAd";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] relative overflow-x-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/15 blur-3xl rounded-full z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-5 tracking-tight flex items-center justify-center gap-3">
            <span>Connect with ERRTEKNALOZY</span>
            {/* <span className="relative w-10 h-10 inline-flex items-center justify-center mx-2">
              <Image
                src="/assets/ERRTEKNALOZY.jpg"
                alt="ERRTEKNALOZY Logo"
                fill
                className="object-contain rounded-full"
                style={{ background: "#fff" }}
                sizes="45px"
                priority
              />
            </span> */}
            {/* <span></span> */}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Got a project, idea, or just want to say hello?{" "}
            <br className="hidden md:block" />
            We’d love to hear from you. Reach out and let’s create something
            remarkable together.
          </p>
        </div>

        {/* Content Grid - Image Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          {/* Left Column - Image & Contact Info */}
          <div className="flex flex-col gap-10 items-center lg:items-start">
            <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
              <Image
                src="/assets/contact.jpg"
                alt="Contact Us"
                fill
                className="object-cover scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-800/30 to-[#1a1a1a]/70"></div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-[#13151b] p-8 rounded-3xl shadow-lg w-full">
              <h2 className="text-2xl font-bold text-fuchsia-400 mb-6 flex items-center gap-2">
                <FiMail className="text-cyan-400" /> Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-xl">
                    <FiMail className="text-cyan-400 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                      Email
                    </div>
                    <a
                      href="mailto:contact@errteknalozy.com"
                      className="text-cyan-200 text-lg font-semibold hover:underline hover:text-fuchsia-400 transition"
                    >
                      contact@errteknalozy.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-fuchsia-500/10 p-3 rounded-xl">
                    <FiPhone className="text-fuchsia-400 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                      Phone
                    </div>
                    <a
                      href="tel:+919876543210"
                      className="text-fuchsia-200 text-lg font-semibold hover:underline hover:text-cyan-400 transition"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-xl">
                    <FiMapPin className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                      Address
                    </div>
                    <p className="text-blue-100 text-lg font-semibold">
                      Tirupati, Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#13151b] p-10 rounded-3xl shadow-xl h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
              <FiSend className="text-fuchsia-400" /> Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-fuchsia-500 transition-all duration-300 group mt-2 text-lg shadow-xl"
              >
                Send Message
                <FiSend className="ml-3 transition-transform duration-300 group-hover:translate-x-1 text-xl" />
              </button>
            </form>
          </div>
        </div>

        <VerticalAd />

        {/* Optional Map or Social Links Section */}
        <div className="text-center mt-20">
          <p className="text-gray-400 text-lg">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:contact@errteknalozy.com"
              className="text-cyan-300 font-semibold underline hover:text-fuchsia-400 transition"
            >
              contact@errteknalozy.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
