"use client";
import React, { useState } from "react";
import Image from "next/image";



const categories = [
  {
    icon: "🌐",
    title: "Websites",
    description:
      "Enterprise-grade, high-performance websites—from business portals to full-featured eCommerce—optimized for SEO, accessibility, and conversion.",
    
  },
  {
    icon: "📱",
    title: "Apps",
    description:
      "Modern Android/iOS apps built for scale and engagement. We deliver seamless UX, robust integration, and future-ready technology.",
   
  },
  {
    icon: "🛠",
    title: "Tools & SaaS",
    description:
      "Custom SaaS platforms, dashboards, and calculators to automate business processes and empower decision-making with actionable data.",
    
  },
  {
    icon: "💡",
    title: "Digital Products",
    description:
      "From interactive code editors to online contest platforms, we deliver innovative digital products that empower learning, productivity, and engagement.",
   
  },
  {
    icon: "🧾",
    title: "PPTs & PDFs",
    description:
      "Professional presentations, branded PDF brochures, and documentation—delivered with clarity, style, and impact for business, academics, or marketing.",
  
  },
  {
    icon: "🧠",
    title: "AI / ML",
    description:
      "We create advanced AI solutions—chatbots, analytics, and recommendation engines—making next-gen intelligence accessible for your business.",
    
  },
  {
    icon: "🎨",
    title: "Branding",
    description:
      "Distinctive branding: logos, guidelines, social kits, and UI systems—ensuring your digital presence is memorable and consistent everywhere.",
   
  },
];

export default function WhatWeOffer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [sliderIdx, setSliderIdx] = useState(0);

  const handleOpen = (idx: number) => {
    setOpenIdx(idx);
    setSliderIdx(0);
  };

  return (
    <section aria-labelledby="what-we-offer-heading" className="w-full">
      <h2 id="what-we-offer-heading" className="sr-only">
        What We Offer
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
        {categories.map((cat, idx) => (
          <div key={cat.title} className="relative h-full">
            <div
              className={`flex flex-col items-center text-center justify-between bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] border-2 border-cyan-900 rounded-2xl p-6 shadow-lg h-full min-h-[320px] hover:scale-105 transition cursor-pointer focus:outline-none`}
              style={{ minHeight: "320px" }}
              onClick={() => handleOpen(idx)}
              tabIndex={0}
              aria-label={`Learn more about ${cat.title}`}
            >
              <div>
                <div className="text-4xl mb-2" aria-hidden="true">{cat.icon}</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2">{cat.title}</h3>
                <div className="text-gray-300 text-base">{cat.description}</div>
              </div>
            </div>
            {openIdx === idx && (
              <div
                className="fixed z-30 inset-0 bg-black/80 flex justify-center items-center px-3"
                aria-modal="true"
                role="dialog"
              >
                <div className="bg-gradient-to-br from-[#151a22] via-[#10121a] to-[#23272f] border-2 border-cyan-400 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in flex flex-col items-center">
                  <button
                    onClick={() => setOpenIdx(null)}
                    className="absolute top-4 right-5 text-2xl text-cyan-300 hover:text-cyan-200 transition"
                    aria-label="Close"
                    tabIndex={0}
                  >
                    &times;
                  </button>
                  <div className="flex flex-col items-center mb-6">
                    <span className="text-4xl mb-2" aria-hidden="true">{cat.icon}</span>
                    <div className="text-xl font-bold text-cyan-300">{cat.title}</div>
                    <div className="text-gray-300 text-center mt-2 text-sm">{cat.description}</div>
                  </div>
                  {/* Slider for recent items */}
                 
                </div>
                <style jsx>{`
                  .animate-fade-in {
                    animation: fadeIn 0.18s;
                  }
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: translateY(10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}