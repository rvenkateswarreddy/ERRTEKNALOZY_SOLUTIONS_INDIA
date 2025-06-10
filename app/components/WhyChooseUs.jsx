"use client";
import React from "react";
import { FaCheckSquare } from "react-icons/fa";

const points = [
  {
    title: "Exceptional Talent",
    description:
      "We maintain the highest standards in hiring to ensure you get access to top-tier, proven professionals.",
  },
  {
    title: "Optimized Teams",
    description:
      "From individual contributors to full-scale teams, we build flexible units tailored to your needs.",
  },
  {
    title: "Aligned Time Zones",
    description:
      "Our nearshore teams are available when you are, ensuring seamless communication and collaboration.",
  },
  {
    title: "Scalable Engagements",
    description:
      "Easily scale your team up or down to match project demands — without compromising on quality or speed.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className=" text-white pb-10 px-6 sm:px-10 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          Discover the Advantage.
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Partnering with us means working with a team committed to your
          success. From elite talent to seamless collaboration, we provide
          everything you need to thrive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {points.map((point, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-orange-500 text-2xl mt-1">
              <FaCheckSquare />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{point.title}</h3>
              <p className="text-gray-400">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
