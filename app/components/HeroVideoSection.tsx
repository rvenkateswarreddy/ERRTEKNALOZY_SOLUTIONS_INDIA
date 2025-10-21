'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

// --- DATA & CONSTANTS ---

const FEATURES = [
  {
    title: 'Web Development',
    description: 'Enterprise-grade websites and platforms built to scale.',
    image: '/web.png',
  },
  {
    title: 'Mobile Apps',
    description: 'High-performance native and cross-platform mobile solutions.',
    image: '/app.png',
  },
  {
    title: 'Automation Tools',
    description: 'Streamline operations with custom intelligent automation.',
    image: '/automation.png',
  },
  {
    title: 'Digital Products',
    description:
      'Bespoke digital experiences that solve real business challenges.',
    image: '/digital.png',
  },
] as const;

const AUTO_ADVANCE_INTERVAL = 4000;

// --- COMPONENT ---

export default function HeroVideoSection() {
  const [index, setIndex] = useState(0);

  // Memoized theme colors and classes
  const theme = useMemo(
    () => ({
      textColor: 'text-gray-900',
      subTextColor: 'text-gray-700',
      buttonPrimary: 'bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white',
      buttonSecondary:
        'bg-gray-900 text-white border-2 border-gray-800 hover:border-blue-400',
      cardBg: 'bg-white',
      activeTabBg: 'bg-white',
      inactiveTabBg: 'bg-white/50 backdrop-blur-sm',
      headlineGradient:
        'bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0059FF]',
      sectionBg: 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
      shadowStrong: 'shadow-2xl shadow-blue-500/20',
      shadowMedium: 'shadow-lg shadow-blue-500/10',
    }),
    []
  );

  // Auto-advance logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FEATURES.length);
    }, AUTO_ADVANCE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Keyboard accessibility for tabs
  const handleTabKeyDown = useCallback(
    (i: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Use standard Tab key for navigation; Enter/Space for selection
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIndex(i);
      }
    },
    []
  );

  // Prefetch images for smooth transitions
  useEffect(() => {
    const nextIdx = (index + 1) % FEATURES.length;
    const img = new window.Image();
    img.src = FEATURES[nextIdx].image;
  }, [index]);

  // SEO meta tags
  const seoTitle = 'Talent With Us | Digital Innovation Experts';
  const seoDesc =
    'We build world-class digital solutions: websites, mobile apps, automation tools, and AI-driven platforms for enterprises.';
  const seoImage = FEATURES[0].image; // Pin to first image for consistent SEO

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section
        className={`relative isolate min-h-screen w-full overflow-hidden ${theme.sectionBg} ${theme.textColor}`}
        aria-label="Hero Banner: Digital Innovation Experts"
      >
        {/* Modern "Aurora" Background Glow */}
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1EB8F3] to-[#0059FF] opacity-15 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* Main Content Wrapper */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Top: Centered Text Content */}
          <motion.div
            className="max-w-3xl mx-auto text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1
              className={`text-5xl font-extrabold tracking-tight ${theme.textColor} sm:text-7xl`}
            >
              <span className={theme.headlineGradient}>Digital Innovation</span>
              <br />
              That Moves Enterprises Forward
            </h1>
            <p
              className={`mt-6 text-lg leading-8 ${theme.subTextColor} sm:text-xl`}
            >
              From concept to launch, we build performant, scalable, and
              stunning digital products tailored for enterprise impact.
            </p>
            <nav
              aria-label="Hero Call to Action"
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.a
                href="/contactUs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-full sm:w-auto px-8 py-3 rounded-full text-center text-lg font-semibold shadow-lg ${theme.buttonPrimary} ${theme.shadowStrong} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
                tabIndex={0}
                aria-label="Start Your Project"
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="/work"
                whileHover={{ scale: 1.05, border: '2px solid #3b82f6' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-full sm:w-auto px-8 py-3 rounded-full text-center text-lg font-semibold ${theme.buttonSecondary} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
                tabIndex={0}
                aria-label="Explore Our Work"
              >
                Explore Our Work
              </motion.a>
            </nav>
          </motion.div>

          {/* Bottom: Interactive Tabbed Carousel */}
          <div className="mt-16 sm:mt-24 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 lg:items-start">
              {/* Left: Feature Tabs */}
              <nav
                className="flex flex-col space-y-4 lg:col-span-4"
                role="tablist"
                aria-label="Feature selection"
              >
                {FEATURES.map((feat, i) => (
                  <button
                    key={feat.title}
                    id={`feature-tab-${i}`}
                    role="tab"
                    tabIndex={0}
                    aria-selected={i === index}
                    aria-controls={`feature-panel-${i}`}
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => handleTabKeyDown(i, e)}
                    className={`relative w-full text-left p-5 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      i === index
                        ? `${theme.shadowMedium}`
                        : `${theme.inactiveTabBg} hover:${theme.activeTabBg}/80`
                    }`}
                  >
                    {/* Animated "Magic" Background */}
                    {i === index && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className={`absolute inset-0 rounded-xl ${theme.activeTabBg}`}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <div className="relative z-10">
                      <h3
                        className={`text-lg font-semibold ${theme.textColor}`}
                      >
                        {feat.title}
                      </h3>
                      <p className={`mt-1 text-sm ${theme.subTextColor}`}>
                        {feat.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Right: Image Panel */}
              <div className="lg:col-span-8 mt-10 lg:mt-0">
                <div
                  className={`relative w-full aspect-[16/9] overflow-hidden rounded-2xl ${theme.shadowStrong}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={FEATURES[index].image}
                      id={`feature-panel-${index}`}
                      role="tabpanel"
                      tabIndex={0}
                      aria-labelledby={`feature-tab-${index}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <Image
                        src={FEATURES[index].image}
                        alt={FEATURES[index].title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover w-full h-full select-none"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
