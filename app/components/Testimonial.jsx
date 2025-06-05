import React from "react";

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
      filled ? "text-yellow-400" : "text-gray-300"
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.372 2.449a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.372-2.449a1 1 0 00-1.176 0l-3.372 2.449c-.784.57-1.838-.197-1.539-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.045 9.386c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.959z" />
  </svg>
);

const Testimonial = () => {
  return (
    <section className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          Trusted by top professionals and teams worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-[#222a3f] bg-opacity-80 rounded-3xl shadow-2xl border border-gray-800 p-8 hover:scale-[1.03] hover:shadow-cyan-900/30 transition-all duration-300 group"
            >
              {/* Quotation Icon */}
              <svg
                className="absolute -top-7 left-6 w-12 h-12 text-cyan-500 opacity-20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.17 15c-.11-1.72.12-3.39.68-5.02.27-.8.79-1.44 1.56-1.94.39-.25.62-.62.67-1.12.06-.5-.09-.94-.44-1.32-.35-.37-.79-.56-1.32-.56-.42 0-.82.14-1.21.41-.57.4-1.01.91-1.33 1.53C4.1 10.26 3.5 12.6 3.5 15v2c0 .55.22 1.02.66 1.41.44.39.95.59 1.53.59.62 0 1.14-.2 1.56-.59.42-.39.67-.86.76-1.41l.16-1zm10 0c-.11-1.72.12-3.39.68-5.02.27-.8.79-1.44 1.56-1.94.39-.25.62-.62.67-1.12.06-.5-.09-.94-.44-1.32-.35-.37-.79-.56-1.32-.56-.42 0-.82.14-1.21.41-.57.4-1.01.91-1.33 1.53-.96 1.78-1.56 4.12-1.56 6.52v2c0 .55.22 1.02.66 1.41.44.39.95.59 1.53.59.62 0 1.14-.2 1.56-.59.42-.39.67-.86.76-1.41l.16-1z" />
              </svg>
              {/* Testimonial text */}
              <p className="text-lg text-gray-200 leading-relaxed mb-6 relative z-10">
                “{testimonial.quote}”
              </p>
              {/* User Info */}
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-cyan-500 shadow-lg object-cover"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < testimonial.rating} />
                    ))}
                  </div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-cyan-300">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
