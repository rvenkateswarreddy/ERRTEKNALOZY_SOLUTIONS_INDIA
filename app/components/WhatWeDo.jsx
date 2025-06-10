"use client";
import React from "react";
import {
  FaGem,
  FaRobot,
  FaRocket,
  FaCode,
  FaPencilRuler,
  FaUsers,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGem className="text-cyan-400 text-4xl" />,
    title: "Product Scope",
    desc: "A structured 15-day process to align your product vision with your business goals.",
  },
  {
    icon: <FaRobot className="text-purple-400 text-4xl" />,
    title: "AI Development & Enablement",
    desc: "We leverage ML and Generative AI strategically to ensure your business is future-ready.",
  },
  {
    icon: <FaRocket className="text-yellow-400 text-4xl" />,
    title: "MVP Builder",
    desc: "Go to the market quickly with a high-quality Minimum Viable Product.",
  },
  {
    icon: <FaCode className="text-teal-400 text-4xl" />,
    title: "Custom Software Development",
    desc: "Lean frameworks applied to your vision to create an innovative custom software solution.",
  },
  {
    icon: <FaPencilRuler className="text-pink-400 text-4xl" />,
    title: "UX/UI Design",
    desc: "Design an engaging product that is easy-to-use, attractive and functional.",
  },
  {
    icon: <FaUsers className="text-orange-400 text-4xl" />,
    title: "Dedicated Teams",
    desc: "Build your product with a dedicated team of developers.",
  },
];

const WhatWeDo = () => {
  return (
    <section className=" text-white pb-10 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">What we do</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          We help entrepreneurs and business leaders build and launch innovative
          custom software solutions across industries. From MVPs to full-scale
          platforms, our services scale with your growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-2xl p-8 text-left shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 border border-zinc-800"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">
              {service.title}
            </h3>
            <p className="text-gray-400">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
