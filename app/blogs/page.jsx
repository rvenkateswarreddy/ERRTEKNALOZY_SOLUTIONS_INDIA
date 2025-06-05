"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { GiArrowsShield } from "react-icons/gi";
import { AiOutlineArrowRight } from "react-icons/ai";
import HorizontalAd from "../components/HorizontalAd";
import VerticalAd from "../components/VerticalAd";

// Blog data with more entries & professional categories
const blogPosts = [
  // ... (same as your original blogPosts array)
  {
    id: 1,
    title: "Exploring the Future of AI in Everyday Life",
    image: "/assets/fashion.jpg",
    summary:
      "Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.",
    date: "May 28, 2025",
    category: "AI & Tech",
    trending: true,
  },
  {
    id: 2,
    title: "Top 10 Travel Destinations for 2025",
    image: "/assets/travel.jpg",
    summary:
      "Ready to explore the world? These handpicked destinations will give you unforgettable memories. From hidden gems to popular paradises, plan your perfect journey today.",
    date: "May 26, 2025",
    category: "Travel",
    trending: true,
  },
  {
    id: 3,
    title: "The Sustainable Fashion Revolution",
    image: "/assets/fashion.jpg",
    summary:
      "How eco-friendly materials and ethical practices are transforming the fashion industry. Learn about brands leading the charge toward a more sustainable future.",
    date: "May 24, 2025",
    category: "Fashion",
    trending: false,
  },
  {
    id: 4,
    title: "Modern Web Development Trends in 2025",
    image: "/assets/travel.jpg",
    summary:
      "Stay ahead with the latest technologies shaping web development. From server components to AI integration, discover what's powering the next generation of web apps.",
    date: "May 22, 2025",
    category: "Web Development",
    trending: false,
  },
  {
    id: 5,
    title: "The Future of Remote Work",
    image: "/assets/fashion.jpg",
    summary:
      "How remote work is evolving in 2025 with new technologies and work paradigms. Explore the tools and practices shaping the future of distributed teams.",
    date: "May 20, 2025",
    category: "Business",
    trending: false,
  },
  {
    id: 6,
    title: "Healthy Eating Habits for Programmers",
    image: "/assets/travel.jpg",
    summary:
      "Nutrition tips and meal plans designed specifically for developers and tech professionals who spend long hours at their computers.",
    date: "May 18, 2025",
    category: "Health",
    trending: false,
  },
  {
    id: 7,
    title: "Mastering Data Science: What to Expect in 2025",
    image: "/assets/data.jpg",
    summary:
      "Data science continues to evolve rapidly. Learn about the skills, tools, and trends that will dominate in the coming year.",
    date: "May 15, 2025",
    category: "AI & Tech",
    trending: false,
  },
  {
    id: 8,
    title: "Eco-Friendly Travel: Tips for a Greener Adventure",
    image: "/assets/green_travel.jpg",
    summary:
      "Explore the world sustainably. Discover actionable tips for reducing your environmental impact while traveling.",
    date: "May 12, 2025",
    category: "Travel",
    trending: false,
  },
  {
    id: 9,
    title: "Top 5 Investment Strategies for Millennials",
    image: "/assets/business.jpg",
    summary:
      "Financial freedom is within reach. These investment strategies are tailored for the goals and challenges of the millennial generation.",
    date: "May 10, 2025",
    category: "Business",
    trending: false,
  },
  {
    id: 10,
    title: "Yoga and Mindfulness: The Modern Developer's Guide",
    image: "/assets/health.jpg",
    summary:
      "Balance your mind and body. Learn how yoga and mindfulness practices can boost your productivity and well-being.",
    date: "May 8, 2025",
    category: "Health",
    trending: false,
  },
  {
    id: 11,
    title: "Minimalism in Fashion: Less is More",
    image: "/assets/minimal_fashion.jpg",
    summary:
      "Minimalist fashion is on the rise. Discover how simplicity in style can be both elegant and sustainable.",
    date: "May 5, 2025",
    category: "Fashion",
    trending: false,
  },
  {
    id: 12,
    title: "React Server Components: The Next Revolution",
    image: "/assets/webdev.jpg",
    summary:
      "React Server Components are set to change the way we build web apps. Dive into the future of front-end development.",
    date: "May 2, 2025",
    category: "Web Development",
    trending: true,
  },
  {
    id: 12,
    title: "React Server Components: The Next Revolution",
    image: "/assets/webdev.jpg",
    summary:
      "React Server Components are set to change the way we build web apps. Dive into the future of front-end development.",
    date: "May 2, 2025",
    category: "Fashion",
    trending: false,
  },
];

// Side images (unchanged)
const sideImages = [
  {
    url: "/assets/side1.jpg",
    alt: "Cityscape at sunset",
    caption: "Urban Inspiration",
  },

  {
    url: "/assets/side3.jpg",
    alt: "Healthy food",
    caption: "Eat Well, Live Well",
  },
  {
    url: "/assets/side4.jpg",
    alt: "Remote work setup",
    caption: "Work From Anywhere",
  },
];

const RecentPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isCategoriesSticky, setIsCategoriesSticky] = useState(false);

  // Categories with "All" at the front
  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];
  const categoryRefs = useRef({});
  const trendingRef = useRef(null);
  const categoriesBarRef = useRef(null);
  const leftColRef = useRef(null);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(
        typeof window !== "undefined" && window.innerWidth >= 1024
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trending & Categorywise post filtering
  const filteredTrending = blogPosts.filter(
    (post) =>
      post.trending &&
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group non-trending posts by category
  const filteredByCategory = blogPosts
    .filter(
      (post) =>
        !post.trending &&
        (selectedCategory === "All" || post.category === selectedCategory) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .reduce((acc, post) => {
      acc[post.category] = acc[post.category] || [];
      acc[post.category].push(post);
      return acc;
    }, {});

  // --- Sticky & Scroll highlight logic ---
  useEffect(() => {
    if (!isLargeScreen) return;

    const leftCol = leftColRef.current;
    if (!leftCol) return;

    let ticking = false;
    const handleScroll = () => {
      if (!isCategoriesSticky) return; // Only activate scroll highlight when sticky

      let sectionPositions = [];
      if (trendingRef.current && filteredTrending.length > 0) {
        sectionPositions.push({
          category: "Trending",
          ref: trendingRef,
          top: trendingRef.current.getBoundingClientRect().top,
        });
      }
      if (selectedCategory === "All") {
        Object.keys(filteredByCategory).forEach((cat) => {
          const ref = categoryRefs.current[cat];
          if (ref) {
            sectionPositions.push({
              category: cat,
              ref,
              top: ref.getBoundingClientRect().top,
            });
          }
        });
      } else {
        const ref = categoryRefs.current[selectedCategory];
        if (ref) {
          sectionPositions.push({
            category: selectedCategory,
            ref,
            top: ref.getBoundingClientRect().top,
          });
        }
      }

      const offset =
        (categoriesBarRef.current?.offsetHeight || 0) +
        (categoriesBarRef.current?.getBoundingClientRect().top || 0);

      let current = "All";
      for (let i = 0; i < sectionPositions.length; i++) {
        const { category, ref } = sectionPositions[i];
        const rect = ref.current.getBoundingClientRect();
        // Use leftCol's scroll container as a reference
        if (
          rect.top -
            (categoriesBarRef.current?.getBoundingClientRect().bottom || 0) <=
          0
        ) {
          current = category;
        }
      }
      if (current === "Trending") {
        setSelectedCategory("All");
      } else if (current && current !== selectedCategory) {
        setSelectedCategory(current);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    leftCol.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      leftCol.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line
  }, [
    isLargeScreen,
    isCategoriesSticky,
    selectedCategory,
    filteredByCategory,
    filteredTrending.length,
  ]);

  // Categories sticky detection: set isCategoriesSticky when bar is at top
  useEffect(() => {
    if (!isLargeScreen) return;
    const handleWindowScroll = () => {
      if (!categoriesBarRef.current) return;
      const rect = categoriesBarRef.current.getBoundingClientRect();
      setIsCategoriesSticky(rect.top <= 0);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [isLargeScreen]);

  // Scroll to section on category click (only for All)
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      if (isLargeScreen && leftColRef.current) {
        leftColRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (categoryRefs.current[cat]) {
      const offset = (categoriesBarRef.current?.offsetHeight || 0) + 16;
      let top = 0;
      if (isLargeScreen && leftColRef.current) {
        top =
          leftColRef.current.scrollTop +
          categoryRefs.current[cat].getBoundingClientRect().top -
          leftColRef.current.getBoundingClientRect().top -
          offset;
        leftColRef.current.scrollTo({ top, behavior: "smooth" });
      } else {
        top =
          window.scrollY +
          categoryRefs.current[cat].getBoundingClientRect().top -
          offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  // Attach refs to each category section
  const getCatRef = (cat) => {
    if (!categoryRefs.current[cat]) {
      categoryRefs.current[cat] = React.createRef();
    }
    return categoryRefs.current[cat];
  };

  return (
    <section className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-16 px-2 sm:px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <FaFireAlt className="text-fuchsia-400 animate-bounce" />
          Dive Into Inspiring Ideas & Stories!
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-300 mb-8 sm:mb-10">
          Discover handpicked articles, tips, and insights to spark your
          curiosity.
        </p>

        {/* Search box */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-2 sm:pr-4 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none">
                <path
                  d="M12.5 12.5L17 17M14 8.5A5.5 5.5 0 1 1 3 8.5a5.5 5.5 0 0 1 11 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Categories - sticky bar */}
        <div
          ref={categoriesBarRef}
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12 sticky top-0 z-30 py-2 backdrop-blur-md transition-all"
          style={{
            borderBottom: "1px solid rgba(34,211,238,0.07)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium border-2 text-xs sm:text-base transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 border-transparent text-white shadow-lg"
                  : "border-gray-700 text-cyan-300 hover:border-cyan-400 hover:text-white"
              }`}
            >
              <MdOutlineCategory className="text-cyan-400 text-sm sm:text-base" />
              {cat}
            </button>
          ))}
        </div>

        {/* Main grid: Left - posts, Right - images */}
        <div className="lg:grid lg:grid-cols-3 gap-6 sm:gap-12 flex flex-col">
          {/* LEFT COLUMN: Blog lists (scrollable on large screens only, no scroll bar shown) */}
          <div
            ref={leftColRef}
            className={`
              lg:col-span-2 flex flex-col gap-6 sm:gap-10
              ${!isLargeScreen ? "w-full max-w-xl mx-auto" : ""}
              ${
                isLargeScreen
                  ? "h-[100vh] overflow-y-auto pr-2 scrollbar-hide"
                  : ""
              }
            `}
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {/* Trending Now */}
            {filteredTrending.length > 0 && (
              <div
                ref={trendingRef}
                className="rounded-xl bg-gradient-to-r from-fuchsia-900/70 via-cyan-900/50 to-orange-700/30 p-3 sm:p-6 shadow-md border border-fuchsia-500/30 mb-4 sm:mb-8"
              >
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 flex items-center gap-2 text-orange-300">
                  <FaFireAlt className="text-fuchsia-400 animate-pulse" />
                  Trending Now
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-3">
                  {filteredTrending.map((post) => (
                    <Link
                      key={post.id}
                      href={{
                        pathname: `/blogs/${post.id}`,
                        query: { blog: JSON.stringify(post) },
                      }}
                      className="flex items-center gap-2 rounded-lg p-2 sm:p-4  transition group lg:p-1 "
                    >
                      <GiArrowsShield className="text-fuchsia-400 text-lg sm:text-xl shrink-0" />
                      <span className="text-xs sm:text-lg font-semibold text-orange-200 ">
                        {post.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Category-wise Posts */}
            {selectedCategory === "All" ? (
              Object.keys(filteredByCategory).map((cat) => (
                <div
                  key={cat}
                  ref={getCatRef(cat)}
                  className="bg-[#181d2a] rounded-xl shadow-lg p-3 sm:p-6 border border-cyan-800/30 mb-4 sm:mb-8"
                >
                  <h3 className="text-base sm:text-xl font-bold text-cyan-300 mb-2 sm:mb-4 flex items-center gap-2">
                    <MdOutlineCategory className="text-cyan-400 text-base sm:text-xl" />
                    {cat}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                    {filteredByCategory[cat].length === 0 ? (
                      <li className="text-gray-400 text-center py-4 sm:py-8 font-semibold text-xs sm:text-base ">
                        No posts found.
                      </li>
                    ) : (
                      filteredByCategory[cat].map((post) => (
                        <li
                          key={post.id}
                          className="flex items-center gap-1 sm:gap-2  rounded-md p-2 sm:p-4  transition group lg:p-0"
                        >
                          <AiOutlineArrowRight className="text-cyan-400 text-base sm:text-lg shrink-0" />
                          <Link
                            href={{
                              pathname: `/blogs/${post.id}`,
                              query: { blog: JSON.stringify(post) },
                            }}
                            className="text-xs sm:text-base font-semibold text-cyan-100 hover:underline hover:text-fuchsia-400 transition lg:text-sm"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <div
                ref={getCatRef(selectedCategory)}
                className="bg-[#181d2a] rounded-xl shadow-lg p-3 sm:p-6 border border-cyan-800/30 mb-4 sm:mb-8"
              >
                <h3 className="text-base sm:text-xl font-bold text-cyan-300 mb-2 sm:mb-4 flex items-center gap-2">
                  <MdOutlineCategory className="text-cyan-400 text-base sm:text-xl" />
                  {selectedCategory}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                  {filteredByCategory[selectedCategory]?.length === 0 ? (
                    <li className="text-gray-400 text-center py-4 sm:py-8 font-semibold text-xs sm:text-base">
                      No posts found.
                    </li>
                  ) : (
                    filteredByCategory[selectedCategory]?.map((post) => (
                      <li
                        key={post.id}
                        className="flex items-center gap-1 sm:gap-2 bg-[#161a23] rounded-md p-2 sm:p-4 border border-cyan-700/40 hover:border-cyan-400 transition group"
                      >
                        <AiOutlineArrowRight className="text-cyan-400 text-base sm:text-lg shrink-0" />
                        <Link
                          href={{
                            pathname: `/blogs/${post.id}`,
                            query: { blog: JSON.stringify(post) },
                          }}
                          className="text-xs sm:text-base font-semibold text-cyan-100 hover:underline hover:text-fuchsia-400 transition "
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Side Images (scrolls only after left is scrolled to bottom) */}
          <div
            className="lg:col-span-1 hidden lg:flex flex-col gap-4 sm:gap-8 h-[100vh] sticky top-[106px]"
            style={{ alignSelf: "flex-start" }}
          >
            {sideImages.map((img, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md flex flex-col border border-gray-800"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-28 sm:h-40 object-cover"
                />
                <div className="p-2 sm:p-4 flex-1 flex items-end">
                  <span className="text-cyan-400 text-xs font-semibold">
                    {img.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <HorizontalAd
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          // className="h-96"
        />
      </div>

      {/* Hide scrollbar in all browsers */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecentPosts;
