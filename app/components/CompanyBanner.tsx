"use client";
import React, { useEffect, useState } from "react";
import ScheduleCallModal from "./ScheduleCallModal";

const CompanyBanner = () => {
  const [watermarkGrid, setWatermarkGrid] = useState<
    { top: string; left: string; rotate: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const rows = 5, cols = 4, grid = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        grid.push({
          top: `${(r * 100) / rows + 2}%`,
          left: `${(c * 100) / cols + 2}%`,
          rotate: `${Math.random() * 30 - 15}deg`,
        });
    setWatermarkGrid(grid);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-20 px-6 sm:px-12 lg:px-24 rounded-4xl shadow-xl border border-gray-200 dark:border-gray-800">
      {/* Watermark Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-fade-in-slow">
        {watermarkGrid.map((pos, i) => (
          <span
            key={i}
            className="absolute text-xl sm:text-3xl font-semibold select-none opacity-5 whitespace-nowrap text-gray-900 dark:text-white"
            style={{ top: pos.top, left: pos.left, transform: `rotate(${pos.rotate})` }}
          >
            Errteknalozy
          </span>
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-700 via-fuchsia-500 to-orange-400">
          Building Exceptional Digital Products
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          At{" "}
          <span className="font-semibold text-black dark:text-white">
            Errteknalozy
          </span>
          , we craft high-impact websites, powerful applications, and end-to-end
          digital systems that fuel business innovation. Our agile process and
          deep tech expertise guarantee precision delivery at scale.
        </p>
        <div className="mt-10">
          <button
            className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white px-8 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 hover:opacity-90 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:focus:ring-cyan-700"
            onClick={() => setShowModal(true)}
          >
            Schedule a Call
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <ScheduleCallModal onClose={() => setShowModal(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyBanner;