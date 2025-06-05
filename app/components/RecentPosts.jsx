"use client";
import React from "react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Exploring the Future of AI in Everyday Life",
    image: "/assets/fashion.jpg",
    summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
    date: "May 28, 2025",
    slug: "ai-future",
  },
  {
    id: 2,
    title: "Top 10 Travel Destinations for 2025",
    image: "/assets/travel.jpg",
    summary: `Ready to explore the world? These handpicked destinations will give you unforgettable memories. From hidden gems to popular paradises, plan your perfect journey today.`,
    date: "May 26, 2025",
    slug: "top-travel",
  },
  {
    id: 3,
    title: "The Sustainable Fashion Revolution",
    image: "/assets/fashion.jpg",
    summary: `How eco-friendly materials and ethical practices are transforming the fashion industry. Learn about brands leading the charge toward a more sustainable future.`,
    date: "May 24, 2025",
    slug: "sustainable-fashion",
  },
  {
    id: 4,
    title: "Modern Web Development Trends in 2025",
    image: "/assets/travel.jpg",
    summary: `Stay ahead with the latest technologies shaping web development. From server components to AI integration, discover what's powering the next generation of web apps.`,
    date: "May 22, 2025",
    slug: "web-dev-trends",
  },
];

const RecentPosts = () => {
  return (
    <section className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-20 px-4 sm:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
          🔥 Recent Blog Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-4">
                <span className="text-xs font-medium text-cyan-400">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
