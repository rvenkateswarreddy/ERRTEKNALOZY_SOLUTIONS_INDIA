"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { GiArrowsShield } from "react-icons/gi";
import { AiOutlineArrowRight } from "react-icons/ai";
import HorizontalAd from "../components/HorizontalAd";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

// --- Types ---
interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  trending?: boolean;
  date: string | { seconds: number };
  [key: string]: any;
}

interface Promotion {
  id: string;
  url: string;
  image: string;
  name?: string;
}

// --- Utils ---
const formatDate = (date: string | { seconds: number } | undefined): string => {
  if (!date) return "";
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  if (typeof date === "object" && date.seconds) {
    return new Date(date.seconds * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return "";
};

// --- Main Component ---
const BlogPosts: React.FC = () => {
  // State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [sideImages, setSideImages] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isCategoriesSticky, setIsCategoriesSticky] = useState(false);

  // Refs
  const categoryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const trendingRef = useRef<HTMLDivElement | null>(null);
  const categoriesBarRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const [blogsSnapshot, promoSnapshot] = await Promise.all([
          getDocs(query(collection(db, "blogs"), orderBy("date", "desc"))),
          getDocs(query(collection(db, "promotions"), orderBy("createdAt", "desc"))),
        ]);
        if (!isMounted) return;
        const blogsData: BlogPost[] = [];
        blogsSnapshot.forEach((doc) => blogsData.push({ ...doc.data(), id: doc.id } as BlogPost));
        const promoData: Promotion[] = [];
        promoSnapshot.forEach((doc) => promoData.push({ ...doc.data(), id: doc.id } as Promotion));
        setBlogPosts(blogsData);
        setSideImages(promoData);
      } catch (err) {
        // TODO: Error boundary/logging
        // Optionally show UI error state
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // --- Responsive ---
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Derived Data ---
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(blogPosts.map((post) => post.category))),
    ],
    [blogPosts]
  );

  const filteredTrending = useMemo(
    () =>
      blogPosts.filter(
        (post) =>
          post.trending &&
          (selectedCategory === "All" || post.category === selectedCategory) &&
          (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary?.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [blogPosts, selectedCategory, searchTerm]
  );

  const filteredByCategory = useMemo(() => {
    return blogPosts
      .filter(
        (post) =>
          !post.trending &&
          (selectedCategory === "All" || post.category === selectedCategory) &&
          (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .reduce<Record<string, BlogPost[]>>((acc, post) => {
        acc[post.category] = acc[post.category] || [];
        acc[post.category].push(post);
        return acc;
      }, {});
  }, [blogPosts, selectedCategory, searchTerm]);

  // --- Sticky/Scroll Highlight Logic ---
  useEffect(() => {
    if (!isLargeScreen) return;
    const leftCol = leftColRef.current;
    if (!leftCol) return;

    let ticking = false;
    const handleScroll = () => {
      if (!isCategoriesSticky) return;

      let sectionPositions: Array<{ category: string; ref: any; top: number }> = [];
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
              top: ref.current ? ref.current.getBoundingClientRect().top : 0,
            });
          }
        });
      } else {
        const ref = categoryRefs.current[selectedCategory];
        if (ref) {
          sectionPositions.push({
            category: selectedCategory,
            ref,
            top: ref.current ? ref.current.getBoundingClientRect().top : 0,
          });
        }
      }

      let current = "All";
      for (let i = 0; i < sectionPositions.length; i++) {
        const { category, ref } = sectionPositions[i];
        const rect = ref.current.getBoundingClientRect();
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
  }, [isLargeScreen, isCategoriesSticky, selectedCategory, filteredByCategory, filteredTrending.length]);

  // --- Sticky Detection for Categories Bar ---
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

  // --- Scroll to Section on Category Click ---
  const handleCategoryClick = useCallback(
    (cat: string) => {
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
            categoryRefs.current[cat].current.getBoundingClientRect().top -
            leftColRef.current.getBoundingClientRect().top -
            offset;
          leftColRef.current.scrollTo({ top, behavior: "smooth" });
        } else {
          top =
            window.scrollY +
            categoryRefs.current[cat].current.getBoundingClientRect().top -
            offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
    [isLargeScreen]
  );

  // --- Attach refs dynamically to each category section ---
  const getCatRef = (cat: string) => {
    if (!categoryRefs.current[cat]) {
      categoryRefs.current[cat] = React.createRef<HTMLDivElement>();
    }
    return categoryRefs.current[cat];
  };

  // --- Loading State ---
  if (loading) {
    return (
      <section className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-16 px-2 sm:px-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-40">
          <span className="text-lg text-cyan-400" role="status" aria-live="polite">Loading...</span>
        </div>
      </section>
    );
  }

  // --- Render ---
  return (
    <section
      className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-16 px-2 sm:px-4 text-white"
      aria-labelledby="blog-posts-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h2
          id="blog-posts-heading"
          className="text-3xl sm:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-center gap-3"
        >
          <FaFireAlt className="text-fuchsia-400 animate-bounce" />
          Dive Into Inspiring Ideas & Stories!
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-300 mb-8 sm:mb-10">
          Discover handpicked articles, tips, and insights to spark your curiosity.
        </p>

        {/* Search box */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="relative w-full max-w-md">
            <label htmlFor="blog-search" className="sr-only">
              Search blog posts
            </label>
            <input
              id="blog-search"
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-2 sm:pr-4 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              aria-label="Search blog posts"
              autoComplete="off"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
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
        <nav
          ref={categoriesBarRef}
          aria-label="Blog categories"
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12 sticky top-0 z-30 py-2 backdrop-blur-md transition-all"
          style={{
            borderBottom: "1px solid rgba(34,211,238,0.07)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium border-2 text-xs sm:text-base transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 border-transparent text-white shadow-lg"
                  : "border-gray-700 text-cyan-300 hover:border-cyan-400 hover:text-white"
              }`}
              aria-current={selectedCategory === cat ? "page" : undefined}
            >
              <MdOutlineCategory className="text-cyan-400 text-sm sm:text-base" />
              <span>{cat}</span>
            </button>
          ))}
        </nav>

        {/* Main grid: Left - posts, Right - images */}
        <div className="lg:grid lg:grid-cols-3 gap-6 sm:gap-12 flex flex-col">
          {/* LEFT COLUMN */}
          <div
            ref={leftColRef}
            className={`
              lg:col-span-2 flex flex-col gap-6 sm:gap-10
              ${!isLargeScreen ? "w-full max-w-xl mx-auto" : ""}
              ${isLargeScreen ? "h-[100vh] overflow-y-auto pr-2 scrollbar-hide" : ""}
            `}
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {/* Trending Now */}
            {filteredTrending.length > 0 && (
              <section
                ref={trendingRef}
                aria-label="Trending Now"
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
                        query: { blog: encodeURIComponent(JSON.stringify(post)) },
                      }}
                      className="flex items-center gap-2 rounded-lg p-2 sm:p-4 transition group lg:p-1"
                      aria-label={`Trending post: ${post.title}`}
                    >
                      <GiArrowsShield className="text-fuchsia-400 text-lg sm:text-xl shrink-0" />
                      <span className="text-xs sm:text-lg font-semibold text-orange-200 ">
                        {post.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Category-wise Posts */}
            {selectedCategory === "All" ? (
              Object.keys(filteredByCategory).map((cat) => (
                <section
                  key={cat}
                  ref={getCatRef(cat)}
                  aria-labelledby={`cat-${cat}`}
                  className="bg-[#181d2a] rounded-xl shadow-lg p-3 sm:p-6 border border-cyan-800/30 mb-4 sm:mb-8"
                >
                  <h3
                    id={`cat-${cat}`}
                    className="text-base sm:text-xl font-bold text-cyan-300 mb-2 sm:mb-4 flex items-center gap-2"
                  >
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
                              query: { blog: encodeURIComponent(JSON.stringify(post)) },
                            }}
                            className="text-xs sm:text-base font-semibold text-cyan-100 hover:underline hover:text-fuchsia-400 transition lg:text-sm"
                            aria-label={`Read post: ${post.title}`}
                          >
                            {post.title}
                          </Link>
                          <span className="text-[10px] text-gray-400 ml-2">
                            {formatDate(post.date)}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </section>
              ))
            ) : (
              <section
                ref={getCatRef(selectedCategory)}
                aria-labelledby={`cat-${selectedCategory}`}
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
                            query: { blog: encodeURIComponent(JSON.stringify(post)) },
                          }}
                          className="text-xs sm:text-base font-semibold text-cyan-100 hover:underline hover:text-fuchsia-400 transition "
                          aria-label={`Read post: ${post.title}`}
                        >
                          {post.title}
                        </Link>
                        <span className="text-[10px] text-gray-400 ml-2">
                          {formatDate(post.date)}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Side Images */}
          <aside
            className="lg:col-span-1 hidden lg:flex flex-col gap-4 sm:gap-8 h-[100vh] sticky top-[106px]"
            style={{ alignSelf: "flex-start" }}
            aria-label="Promotions"
          >
            {sideImages.map((img, i) => (
              <a
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                key={img.id}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md flex flex-col border border-gray-800 hover:shadow-lg transition"
                style={{ textDecoration: "none" }}
                aria-label={img.name || "Promotion"}
                tabIndex={0}
              >
                <img
                  src={img.image}
                  alt={img.name || "Promotion"}
                  className="w-full h-40 sm:h-40 object-cover"
                  loading="lazy"
                  width={320}
                  height={160}
                />
              </a>
            ))}
          </aside>
        </div>
      
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

export default BlogPosts;