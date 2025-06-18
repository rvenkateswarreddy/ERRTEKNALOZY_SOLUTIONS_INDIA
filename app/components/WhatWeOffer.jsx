"use client";
import React, { useState } from "react";
import Image from "next/image";

// Demo images (replace these with your actual images or update as needed)
import project1 from "../../public/assets/projects.jpg";
import project2 from "../../public/assets/projects.jpg";
import app1 from "../../public/assets/projects.jpg";
import app2 from "../../public/assets/projects.jpg";
import website1 from "../../public/assets/projects.jpg";
import website2 from "../../public/assets/projects.jpg";
import seo1 from "../../public/assets/projects.jpg";
import seo2 from "../../public/assets/projects.jpg";
import tool1 from "../../public/assets/projects.jpg";
import tool2 from "../../public/assets/projects.jpg";
import ai1 from "../../public/assets/projects.jpg";
import ai2 from "../../public/assets/projects.jpg";
import branding1 from "../../public/assets/projects.jpg";
import branding2 from "../../public/assets/projects.jpg";

const categories = [
  {
    icon: "🚀",
    title: "Projects",
    description:
      "From academic solutions to enterprise-grade software, we craft custom projects that solve real-world problems and drive innovation. We collaborate closely, ensuring each solution is robust, scalable, and tailored to your needs.",
    recent: [
      {
        image: project1,
        title: "College Fee Portal",
        desc: "Streamlined fee payments, digital receipts, and admin dashboards for educational institutions.",
      },
      {
        image: project2,
        title: "Academic Result Analyzer",
        desc: "Automated data-driven insights for educators with interactive reporting.",
      }
    ],
  },
  {
    icon: "📱",
    title: "Apps",
    description:
      "We build high-performance mobile apps for Android & iOS, focused on user-centric design, seamless integration, and real-world business value. Our apps are engineered for scalability and reliability using modern frameworks.",
    recent: [
      {
        image: app1,
        title: "Ecommerce App",
        desc: "End-to-end shopping experience with secure payments and real-time order tracking.",
      },
      {
        image: app2,
        title: "Fitness Tracker",
        desc: "Personalized workout planning and health analytics for fitness enthusiasts.",
      }
    ],
  },
  {
    icon: "💻",
    title: "Websites",
    description:
      "We create visually stunning, conversion-focused websites—from portfolios and business sites to full-featured eCommerce platforms—optimized for SEO, performance, and accessibility.",
    recent: [
      {
        image: website1,
        title: "Law Firm Website",
        desc: "Professional site with lead capture, blog, and legal resources.",
      },
      {
        image: website2,
        title: "Portfolio Site",
        desc: "Modern developer portfolio with interactive project showcase.",
      }
    ],
  },
  {
    icon: "🔍",
    title: "SEO",
    description:
      "Boost your online visibility and rank higher with our complete SEO suite—covering technical optimization, content strategy, and ongoing analytics for measurable organic growth.",
    recent: [
      {
        image: seo1,
        title: "Real Estate SEO",
        desc: "Improved site structure and content, resulting in 1M+ monthly traffic.",
      },
      {
        image: seo2,
        title: "Blog Authority",
        desc: "Achieved top 3 Google ranking for competitive industry keywords.",
      }
    ],
  },
  {
    icon: "🛠",
    title: "Tools",
    description:
      "Our team delivers custom SaaS tools, dashboards, and calculators to automate business processes, visualize data, and provide actionable insights for decision makers.",
    recent: [
      {
        image: tool1,
        title: "Expense Dashboard",
        desc: "Visualizes business spending trends for finance teams.",
      },
      {
        image: tool2,
        title: "Loan Calculator",
        desc: "Easy-to-use calculator for planning and comparison.",
      }
    ],
  },
  {
    icon: "🧠",
    title: "AI/ML",
    description:
      "Leverage the power of AI & ML: we build chatbots, recommendation engines, and predictive systems tailored to your data and business goals. We make advanced analytics accessible.",
    recent: [
      {
        image: ai1,
        title: "Product Recommender",
        desc: "AI-powered suggestions to boost online sales conversions.",
      },
      {
        image: ai2,
        title: "Support Chatbot",
        desc: "24/7 automated customer support with natural language understanding.",
      }
    ],
  },
  {
    icon: "🧾",
    title: "Branding",
    description:
      "Stand out with our creative branding solutions: logos, style guides, social templates, and UI kits designed for maximum impact across all platforms.",
    recent: [
      {
        image: branding1,
        title: "Logo Pack",
        desc: "Distinctive logo suite for modern startups.",
      },
      {
        image: branding2,
        title: "Social Kit",
        desc: "Ready-to-use brand templates for social media growth.",
      }
    ],
  }
];

export default function WhatWeOffer() {
  const [openIdx, setOpenIdx] = useState(null);
  const [sliderIdx, setSliderIdx] = useState(0);

  const handleOpen = (idx) => {
    setOpenIdx(idx);
    setSliderIdx(0);
  };

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
      {categories.map((cat, idx) => (
        <div key={cat.title} className="relative h-full">
          <div
            className={`flex flex-col items-center text-center justify-between bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] border-2 border-cyan-900 rounded-2xl p-6 shadow-lg h-full min-h-[320px] hover:scale-105 transition cursor-pointer`}
            style={{ minHeight: "320px" }}
            onClick={() => handleOpen(idx)}
          >
            <div>
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{cat.title}</h3>
              <div className="text-gray-300 text-base">{cat.description}</div>
            </div>
          </div>
          {/* Modal/Expanded */}
          {openIdx === idx && (
            <div className="fixed z-30 inset-0 bg-black/80 flex justify-center items-center px-3">
              <div className="bg-gradient-to-br from-[#151a22] via-[#10121a] to-[#23272f] border-2 border-cyan-400 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in flex flex-col items-center">
                <button
                  onClick={() => setOpenIdx(null)}
                  className="absolute top-4 right-5 text-2xl text-cyan-300 hover:text-cyan-200 transition"
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className="flex flex-col items-center mb-6">
                  <span className="text-4xl mb-2">{cat.icon}</span>
                  <div className="text-xl font-bold text-cyan-300">{cat.title}</div>
                  <div className="text-gray-300 text-center mt-2 text-sm">{cat.description}</div>
                </div>
                {/* Slider for recent items */}
                <div className="w-full flex flex-col items-center mb-6">
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={cat.recent[sliderIdx].image}
                      alt={cat.recent[sliderIdx].title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                  </div>
                  <div className="font-semibold text-cyan-200">{cat.recent[sliderIdx].title}</div>
                  <div className="text-gray-300 text-sm mb-1">{cat.recent[sliderIdx].desc}</div>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => setSliderIdx((sliderIdx - 1 + cat.recent.length) % cat.recent.length)}
                      className="px-3 py-1 rounded bg-cyan-800 text-white font-bold hover:bg-cyan-700 transition"
                      aria-label="Previous"
                    >
                      &#8592;
                    </button>
                    <button
                      onClick={() => setSliderIdx((sliderIdx + 1) % cat.recent.length)}
                      className="px-3 py-1 rounded bg-cyan-800 text-white font-bold hover:bg-cyan-700 transition"
                      aria-label="Next"
                    >
                      &#8594;
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-cyan-500">{sliderIdx + 1} / {cat.recent.length}</div>
                </div>
              </div>
              <style jsx>{`
                .animate-fade-in {
                  animation: fadeIn 0.18s;
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px);}
                  to { opacity: 1; transform: translateY(0);}
                }
              `}</style>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}