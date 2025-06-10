"use client";
import React from "react";

const CompanyBanner = () => {
  // Create a grid layout for watermark spans (e.g., 5 rows x 4 columns)
  const watermarkGrid = [];
  const rows = 5;
  const cols = 4;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      watermarkGrid.push({
        top: `${(r * 100) / rows + 2}%`,
        left: `${(c * 100) / cols + 2}%`,
        rotate: `${Math.random() * 30 - 15}deg`,
      });
    }
  }

  return (
    <section className="relative bg-white text-gray-900 py-20 px-4 sm:px-8 lg:px-24 overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {watermarkGrid.map((pos, i) => (
          <span
            key={i}
            className="absolute text-2xl text-black sm:text-3xl  opacity-10 font-semibold select-none whitespace-nowrap"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotate})`,
            }}
          >
            Errteknalozy
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Building Exceptional Digital Products
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          At <span className="text-black font-semibold">Errteknalozy</span>, we
          engineer cutting-edge websites, robust applications, and full-scale
          digital systems that accelerate business growth. Our agile development
          process ensures high-quality delivery with speed and precision.
        </p>
        <button className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:scale-105 hover:opacity-90 transition-transform duration-300">
          Schedule a Call
        </button>
      </div>
    </section>
  );
};

export default CompanyBanner;
