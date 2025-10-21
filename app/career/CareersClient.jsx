'use client';
import React from 'react';
import { motion } from 'framer-motion'; // <-- 1. Import motion
import OpenPositions from '../components/OpenPositions'; // Assuming this component exists
import { useAuth } from '../context/AuthContext'; // Assuming this context exists
import Link from 'next/link';
import { Loader2 } from 'lucide-react'; // For loading state

const culturePoints = [
  {
    icon: '🤝',
    title: 'Collaboration',
    desc: 'We believe the best solutions come from working together.',
  },
  {
    icon: '🚀',
    title: 'Innovation',
    desc: 'We encourage bold ideas and continuous improvement.',
  },
  {
    icon: '🧑‍🎓',
    title: 'Growth Mindset',
    desc: 'Personal and professional development is part of every role.',
  },
  {
    icon: '🌐',
    title: 'Diversity & Inclusion',
    desc: 'We welcome team members from all backgrounds and experiences.',
  },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function CareersClient() {
  const { user, loading } = useAuth();

  return (
    // Changed default text color
    <section className="py-14 px-4 min-h-screen bg-gradient-to-br from-[#E3F1F5] via-[#DDEFF2] to-[#C8E7EE] text-gray-800">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
        {' '}
        {/* Adjusted spacing */}
        {/* Header */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible" // Animate header on load
          variants={sectionVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 text-cyan-700 drop-shadow-lg" // Darker cyan
          >
            Careers at Talent With Us
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto" // Darker gray
          >
            Join our mission to build impactful digital solutions and grow with
            a passionate, innovative team.
          </motion.p>
        </motion.div>
        {/* Culture Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            {' '}
            {/* Darker text */}
            <span role="img" aria-label="star">
              🌟
            </span>{' '}
            Our Culture & Values
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {culturePoints.map((point) => (
              <motion.div
                key={point.title}
                className="bg-[#DEEAF3]/70 backdrop-blur-sm rounded-xl p-7 border border-cyan-300 shadow-lg flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-cyan-300/50"
                variants={itemVariants}
                whileHover={{ y: -5 }} // <-- 3. Enhanced hover
              >
                <span className="text-4xl mb-3">{point.icon}</span>
                <h3 className="text-xl font-semibold mb-1 text-cyan-800">
                  {' '}
                  {/* Darker text */}
                  {point.title}
                </h3>
                <p className="text-gray-700 text-sm">{point.desc}</p>{' '}
                {/* Darker text */}
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Open Positions Section */}
        <motion.div
          className="w-full py-16 bg-gradient-to-tr from-cyan-100 via-white to-blue-100 relative overflow-hidden rounded-3xl" // Added rounding
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <motion.div
            variants={itemVariants} // Animate the inner card
            className="max-w-4xl mx-auto relative z-10 bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.18)] border border-cyan-300 p-10 md:p-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-cyan-700 flex items-center justify-center gap-3 drop-shadow-lg">
              <span className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/30 text-2xl md:text-3xl flex items-center justify-center rounded-full shadow-lg">
                <span role="img" aria-label="briefcase">
                  💼
                </span>
              </span>
              Open Positions
            </h2>

            {/* --- 2. Clear Loading State --- */}
            {loading && (
              <div className="flex justify-center items-center gap-3 text-cyan-700 font-medium p-4 rounded-lg bg-cyan-100/50 border border-cyan-200 mb-8">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading positions...</span>
              </div>
            )}

            {/* --- 3. Refined Login Prompt --- */}
            {!loading && !user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex justify-center"
              >
                <div className="bg-white/80 backdrop-blur-md border border-cyan-200 px-6 py-4 rounded-xl shadow-md flex items-center gap-3">
                  <span className="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xl shadow-sm">
                    <span role="img" aria-label="lock">
                      🔒
                    </span>
                  </span>
                  <p className="text-cyan-800 font-medium">
                    {' '}
                    {/* Darker text */}
                    Please{' '}
                    <Link
                      href="/login" // Assuming you have a login page route
                      className="underline text-cyan-700 hover:text-cyan-900 font-semibold transition"
                    >
                      log in
                    </Link>{' '}
                    to view and apply for jobs.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Only render OpenPositions if not loading AND user exists OR if loading is finished (handles case where no jobs exist) */}
            {!loading && <OpenPositions user={user} />}
          </motion.div>
        </motion.div>
        {/* Easy Apply Card */}
        <motion.div
          className="flex justify-center py-12 bg-gradient-to-br from-[#1e2a44] to-[#17213b] relative rounded-3xl overflow-hidden" // Added rounding and overflow hidden
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          {/* Blurred Accent for Depth */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl z-0"></div>

          <motion.div
            variants={itemVariants} // Animate inner card
            className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-700/50 p-10 w-full max-w-2xl flex flex-col items-center text-center"
          >
            <motion.span
              className="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-700/30 text-3xl mb-6 shadow-xl"
              animate={{ y: [0, -5, 0] }} // Subtle bounce animation
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span role="img" aria-label="envelope with arrow">
                📩
              </span>
            </motion.span>
            <h2 className="text-2xl font-bold mb-4 text-cyan-300 drop-shadow-lg tracking-tight">
              Don't See Your Role? Apply Here!
            </h2>
            <p className="text-gray-200 mb-6 text-base md:text-lg px-4 leading-relaxed">
              Interested in joining us but don’t see a matching position? Send
              your resume and a short intro — we love meeting talented people!
            </p>
            {/* --- 3. Enhanced Button --- */}
            <motion.a
              href="mailto:careers@talentwithus.com?subject=Open Application" // Corrected email
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-500 text-white text-lg font-semibold rounded-full transition shadow-lg hover:shadow-cyan-300/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.a>
            <div className="mt-6 text-sm text-cyan-100">
              Or email us directly at{' '}
              <a
                href="mailto:careers@talentwithus.com" // Corrected email
                className="underline hover:text-cyan-300 transition"
              >
                careers@talentwithus.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
