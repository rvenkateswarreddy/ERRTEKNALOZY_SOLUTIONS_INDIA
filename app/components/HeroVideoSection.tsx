"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";

const FEATURES = [
  {
    title: "Web Development",
    description: "Enterprise-grade websites and platforms built to scale.",
    image: "/web.png",
  },
  {
    title: "Mobile Apps",
    description: "High-performance native and cross-platform mobile solutions.",
    image: "/app.png",
  },
  {
    title: "Automation Tools",
    description: "Streamline operations with custom intelligent automation.",
    image: "/automation.png",
  },
  {
    title: "Digital Products",
    description: "Bespoke digital experiences that solve real business challenges.",
    image: "/digital.png",
  },
] as const;

const AUTO_ADVANCE_INTERVAL = 4000;

export default function HeroVideoSection() {
  const [index, setIndex] = useState(0);

  // Memoize theme colors and classes for performance
  const {
    bgGradient,
    textColor,
    subTextColor,
    buttonPrimary,
    buttonSecondary,
    cardBg,
    dotActive,
    dotInactive,
  } = useMemo(() => ({
    bgGradient: "bg-gradient-to-b from-white via-gray-100 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-black",
    textColor: "text-gray-900 dark:text-white",
    subTextColor: "text-gray-600 dark:text-gray-300",
    buttonPrimary: "bg-gradient-to-r from-blue-600 to-purple-500 text-white dark:from-blue-500 dark:to-purple-600",
    buttonSecondary: "border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400",
    cardBg: "bg-white/90 backdrop-blur dark:bg-black/70",
    dotActive: "bg-blue-600 dark:bg-blue-500",
    dotInactive: "bg-gray-400 dark:bg-gray-600",
  }), []);

  // Auto-advance logic, robust against unmount/mount
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % FEATURES.length);
    }, AUTO_ADVANCE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Keyboard accessibility for carousel dots
  const handleDotKeyDown = useCallback((i: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setIndex(i);
    }
  }, []);

  // Prefetch images for smooth transitions (only the next one)
  useEffect(() => {
    const nextIdx = (index + 1) % FEATURES.length;
    const img = new window.Image();
    img.src = FEATURES[nextIdx].image;
  }, [index]);

  // SEO meta tags
  const seoTitle = "ERRTEKNALOZY SOLUTIONS | Digital Innovation Experts";
  const seoDesc = "We build world-class digital solutions: websites, mobile apps, automation tools, and AI-driven platforms for enterprises.";

  return (
    <section
      className={`relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-16 ${bgGradient} ${textColor} overflow-hidden transition-colors duration-500`}
      aria-label="Hero Banner: Digital Innovation Experts"
    >
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={FEATURES[index].image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Left: Text */}
      <motion.div
        className="lg:w-1/2 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Digital Innovation
          </span>
          <br />
          That Moves Enterprises Forward
        </h1>
        <p className={`text-lg md:text-xl mb-8 max-w-xl ${subTextColor}`}>
          From concept to launch, we build performant, scalable, and stunning digital products tailored for enterprise impact.
        </p>
        <nav aria-label="Hero Call to Action" className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 rounded-full text-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${buttonPrimary} transition`}
            tabIndex={0}
            aria-label="Start Your Project"
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="/work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 rounded-full text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${buttonSecondary}`}
            tabIndex={0}
            aria-label="Explore Our Work"
          >
            Explore Our Work
          </motion.a>
        </nav>
      </motion.div>

      {/* Right: Optimized Image Carousel */}
      <div className="lg:w-1/2 relative mt-12 lg:mt-0 z-10">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={FEATURES[index].image}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ willChange: "opacity, transform" }}
            >
              <Image
                src={FEATURES[index].image}
                alt={FEATURES[index].title}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover w-full h-full rounded-2xl select-none"
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              <div className={`absolute bottom-0 left-0 right-0 px-6 py-4 ${cardBg} rounded-b-2xl`}>
                <h3 className="text-xl font-semibold">{FEATURES[index].title}</h3>
                <p className={`text-base ${subTextColor}`}>{FEATURES[index].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Dots */}
        <nav
          className="flex justify-center mt-6 space-x-2"
          aria-label="Slide navigation"
        >
          {FEATURES.map((feat, i) => (
            <button
              key={feat.title}
              onClick={() => setIndex(i)}
              onKeyDown={e => handleDotKeyDown(i, e)}
              className={`w-3 h-3 rounded-full transition-all outline-none focus:ring-2 focus:ring-blue-400 ${i === index ? `${dotActive} scale-110` : dotInactive}`}
              aria-label={`Show ${feat.title} slide`}
              aria-current={i === index}
              tabIndex={0}
              type="button"
            />
          ))}
        </nav>
      </div>
    </section>
  );
}

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import Head from 'next/head';
// import { 
//   ArrowPathIcon,
//   CodeBracketIcon,
//   CpuChipIcon,
//   DevicePhoneMobileIcon,
//   GlobeAltIcon,
//   RocketLaunchIcon,
//   ServerIcon,
//   ShieldCheckIcon
// } from '@heroicons/react/24/outline';

// const HeroVideoSection = () => {
//   const [currentFeature, setCurrentFeature] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrollY, setScrollY] = useState(0);

//   const features = [
//     {
//       title: "Web Development",
//       description: "Cutting-edge websites that drive results",
//       icon: <GlobeAltIcon className="h-12 w-12" />
//     },
//     {
//       title: "Mobile Apps",
//       description: "Native and cross-platform mobile solutions",
//       icon: <DevicePhoneMobileIcon className="h-12 w-12" />
//     },
//     {
//       title: "Automation Tools",
//       description: "Streamline your workflows with smart automation",
//       icon: <ArrowPathIcon className="h-12 w-12" />
//     },
//     {
//       title: "Digital Products",
//       description: "Innovative solutions tailored to your needs",
//       icon: <RocketLaunchIcon className="h-12 w-12" />
//     }
//   ];

//   const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: false });
//   const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: false });
//   const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: false });

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFeature((prev) => (prev + 1) % features.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
//       <Head>
//         <title>ERRTEKNALOZY SOLUTIONS | Digital Innovation Experts</title>
//         <meta name="description" content="We build websites, apps, automation tools, and digital solutions that drive your business forward." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-blue-500/10"
//             initial={{
//               x: Math.random() * 100,
//               y: Math.random() * 100,
//               width: Math.random() * 300 + 100,
//               height: Math.random() * 300 + 100,
//               opacity: 0.1
//             }}
//             animate={{
//               x: Math.random() * 100,
//               y: Math.random() * 100,
//               opacity: [0.1, 0.2, 0.1]
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               repeatType: 'reverse'
//             }}
//           />
//         ))}
//       </div>


     

    
//       <section className="relative min-h-screen flex items-center pt-20 pb-32">
//         <div className="container mx-auto px-6 z-10">
//           <div className="flex flex-col lg:flex-row items-center">
//             <div className="lg:w-1/2 mb-16 lg:mb-0">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//                     Digital Innovation
//                   </span>
//                   <br />
//                   <span>That Drives Growth</span>
//                 </h1>
//                 <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
//                   We craft exceptional digital experiences - from websites and apps to automation tools and custom solutions that propel your business forward.
//                 </p>
//                 <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                   <motion.button
//                     className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-medium hover:shadow-xl transition-all"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Start Your Project
//                   </motion.button>
//                   <motion.button
//                     className="px-8 py-3 bg-transparent border-2 border-gray-700 rounded-full text-lg font-medium hover:border-blue-400 hover:text-blue-400 transition-all"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Explore Our Work
//                   </motion.button>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="lg:w-1/2 relative">
//               <div className="relative">
//                 <motion.div
//                   className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"
//                   animate={{
//                     scale: [1, 1.2, 1],
//                     opacity: [0.2, 0.3, 0.2]
//                   }}
//                   transition={{
//                     duration: 8,
//                     repeat: Infinity,
//                     repeatType: 'reverse'
//                   }}
//                 />
//                 <motion.div
//                   className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"
//                   animate={{
//                     scale: [1, 1.3, 1],
//                     opacity: [0.2, 0.4, 0.2]
//                   }}
//                   transition={{
//                     duration: 10,
//                     repeat: Infinity,
//                     repeatType: 'reverse'
//                   }}
//                 />
//                 <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentFeature}
//                       initial={{ opacity: 0, x: 50 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -50 }}
//                       transition={{ duration: 0.5 }}
//                       className="flex flex-col items-center text-center"
//                     >
//                       <div className="mb-6 text-blue-400">
//                         {features[currentFeature].icon}
//                       </div>
//                       <h3 className="text-2xl font-bold mb-2">{features[currentFeature].title}</h3>
//                       <p className="text-gray-300">{features[currentFeature].description}</p>
//                     </motion.div>
//                   </AnimatePresence>
//                   <div className="flex justify-center mt-8 space-x-2">
//                     {features.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentFeature(index)}
//                         className={`w-2 h-2 rounded-full transition-all ${currentFeature === index ? 'bg-blue-500 w-4' : 'bg-gray-600'}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <motion.div
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//           animate={{
//             y: [0, 10, 0]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity
//           }}
//         >
//           <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//           </svg>
//         </motion.div>
//       </section>

 
//       <section id="services" className="py-20 relative" ref={ref1}>
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={inView1 ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Digital Services</h2>
//             <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//               Comprehensive solutions tailored to your unique business needs
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 title: "Web Development",
//                 description: "High-performance websites with modern tech stacks",
//                 icon: <CodeBracketIcon className="h-8 w-8" />
//               },
//               {
//                 title: "Mobile Applications",
//                 description: "iOS & Android apps with flawless UX",
//                 icon: <DevicePhoneMobileIcon className="h-8 w-8" />
//               },
//               {
//                 title: "Automation Tools",
//                 description: "Smart solutions to streamline your workflows",
//                 icon: <ArrowPathIcon className="h-8 w-8" />
//               },
//               {
//                 title: "Digital Products",
//                 description: "Custom software for your specific needs",
//                 icon: <CpuChipIcon className="h-8 w-8" />
//               },
//               {
//                 title: "Cloud Solutions",
//                 description: "Scalable infrastructure for your applications",
//                 icon: <ServerIcon className="h-8 w-8" />
//               },
//               {
//                 title: "UI/UX Design",
//                 description: "Beautiful interfaces with intuitive experiences",
//                 icon: <RocketLaunchIcon className="h-8 w-8" />
//               },
//               {
//                 title: "Maintenance & Support",
//                 description: "Reliable ongoing support for your digital assets",
//                 icon: <ShieldCheckIcon className="h-8 w-8" />
//               },
//               {
//                 title: "Consulting",
//                 description: "Expert guidance for your digital strategy",
//                 icon: <GlobeAltIcon className="h-8 w-8" />
//               }
//             ].map((service, index) => (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={inView1 ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all hover:-translate-y-2"
//               >
//                 <div className="text-blue-400 mb-4">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{service.title}</h3>
//                 <p className="text-gray-400">{service.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

    



   
//     </div>
//   );
// };

// export default HeroVideoSection;