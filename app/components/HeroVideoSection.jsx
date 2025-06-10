"use client";
import React from "react";

const HeroVideoSection = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden  shadow-2xl mb-20">
      {/* Background Video */}
      <video
        autoPlay
        // loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0  flex flex-col justify-center items-center text-center px-4 sm:px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-orange-400 drop-shadow-xl mb-6 leading-tight">
          Empowering Innovation, Delivering Excellence
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 font-medium max-w-3xl">
          At <span className="font-semibold text-cyan-400">Errteknalozy</span>,
          we transform ideas into impactful digital experiences. With a passion
          for technology and a commitment to quality, we specialize in building
          cutting-edge software solutions that drive growth, innovation, and
          success for businesses worldwide.
        </p>
      </div>
    </div>
  );
};

export default HeroVideoSection;
