import React, { useState } from "react";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Ava Williams",
    role: "Product Designer, InnovateX",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "This platform transformed the way our team collaborates. The intuitive design and powerful features have made us more productive and creative than ever!",
    rating: 5,
  },
  {
    id: 2,
    name: "Liam Johnson",
    role: "Software Engineer, DevSolutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Seamless integration and fantastic support. The attention to detail in every feature shows how much the team cares about user experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "CTO, TechMind",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "We saw immediate improvements in our workflow. Highly recommended for teams aiming for excellence and efficiency.",
    rating: 4,
  },
];

const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 inline-block ${
      filled ? "text-yellow-400" : "text-gray-600"
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.372 2.449a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.372-2.449a1 1 0 00-1.176 0l-3.372 2.449c-.784.57-1.838-.197-1.539-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.045 9.386c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.959z" />
  </svg>
);

const ArrowButton = ({ onClick, direction = "left", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Previous" : "Next"}
    className={`
      absolute top-1/2 z-20 -translate-y-1/2 
      ${direction === "left" ? "left-4" : "right-4"}
      bg-[#131c36] hover:bg-cyan-700 hover:scale-110
      text-cyan-400 border-2 border-cyan-700 shadow-lg
      rounded-full p-3 transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-cyan-500
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}
    style={{ boxShadow: "0 8px 32px 0 rgba(0,255,255, 0.10)" }}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      {direction === "left" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

const TestimonialCard = ({ testimonial, animateDirection }) => (
  <div
    className={`relative bg-gradient-to-br from-[#232f47] via-[#181d2a] to-[#10141c] bg-opacity-90 rounded-3xl shadow-2xl border border-cyan-900
      px-8 py-8 max-w-3xl mx-auto transition-all duration-500
      ${
        animateDirection === "right"
          ? "animate-slide-in-right"
          : animateDirection === "left"
          ? "animate-slide-in-left"
          : ""
      }
    `}
    style={{
      minHeight: 250,
    }}
  >
    {/* Quotation Icon */}
    <svg
      className="absolute -top-7 left-7 w-14 h-14 text-cyan-500 opacity-25"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M7.17 15c-.11-1.72.12-3.39.68-5.02.27-.8.79-1.44 1.56-1.94.39-.25.62-.62.67-1.12.06-.5-.09-.94-.44-1.32-.35-.37-.79-.56-1.32-.56-.42 0-.82.14-1.21.41-.57.4-1.01.91-1.33 1.53C4.1 10.26 3.5 12.6 3.5 15v2c0 .55.22 1.02.66 1.41.44.39.95.59 1.53.59.62 0 1.14-.2 1.56-.59.42-.39.67-.86.76-1.41l.16-1zm10 0c-.11-1.72.12-3.39.68-5.02.27-.8.79-1.44 1.56-1.94.39-.25.62-.62.67-1.12.06-.5-.09-.94-.44-1.32-.35-.37-.79-.56-1.32-.56-.42 0-.82.14-1.21.41-.57.4-1.01.91-1.33 1.53-.96 1.78-1.56 4.12-1.56 6.52v2c0 .55.22 1.02.66 1.41.44.39.95.59 1.53.59.62 0 1.14-.2 1.56-.59.42-.39.67-.86.76-1.41l.16-1z" />
    </svg>
    {/* Testimonial text */}
    <p className="text-xl text-gray-200 leading-relaxed mb-8 relative z-10 font-medium">
      “{testimonial.quote}”
    </p>
    {/* User Info */}
    <div className="flex items-center gap-5 mt-2">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-xl object-cover ring-2 ring-cyan-700"
      />
      <div className="text-left">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < testimonial.rating} />
          ))}
        </div>
        <div className="font-semibold text-white text-lg">
          {testimonial.name}
        </div>
        <div className="text-sm text-cyan-300 font-medium">
          {testimonial.role}
        </div>
      </div>
    </div>
  </div>
);

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const [animateDirection, setAnimateDirection] = useState(null);

  const handlePrev = () => {
    setAnimateDirection("left");
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setAnimateDirection(null);
    }, 300); // match the animation duration
  };

  const handleNext = () => {
    setAnimateDirection("right");
    setTimeout(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setAnimateDirection(null);
    }, 300);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-10 px-4 sm:px-8 min-h-[500px] overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
          What Our Clients Say
        </h2>
        <p className="text-lg text-cyan-200 mb-10 font-medium">
          Trusted by top professionals and teams worldwide.
        </p>
      </div>
      <div className="relative flex justify-center items-center min-h-[300px]">
        {/* Left Arrow */}
        <ArrowButton
          direction="left"
          onClick={handlePrev}
          disabled={testimonials.length <= 1}
        />
        {/* Testimonial Card */}
        <TestimonialCard
          testimonial={testimonials[current]}
          animateDirection={animateDirection}
        />
        {/* Right Arrow */}
        <ArrowButton
          direction="right"
          onClick={handleNext}
          disabled={testimonials.length <= 1}
        />
      </div>
      {/* Dots */}
      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-cyan-600 transition-all duration-300
              ${
                current === idx
                  ? "bg-cyan-400 scale-125 shadow-lg"
                  : "bg-gray-800"
              }
            `}
            onClick={() => setCurrent(idx)}
            aria-label={`Show testimonial ${idx + 1}`}
          />
        ))}
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(80px) scale(0.98);}
            100% { opacity: 1; transform: translateX(0) scale(1);}
          }
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-80px) scale(0.98);}
            100% { opacity: 1; transform: translateX(0) scale(1);}
          }
          .animate-slide-in-right {
            animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
          }
          .animate-slide-in-left {
            animation: slideInLeft 0.3s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </section>
  );
};

export default Testimonial;
