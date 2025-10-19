'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

const TESTIMONIALS = [
  {
    name: 'Samantha Lee',
    title: 'Senior Product Manager, Google',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    quote:
      'Working with this team was transformative. Their technical depth and proactive approach made our project a true success. We saw quality and speed at a level I’d expect only from Google’s own engineers.',
    rating: 5,
    highlight: 'Matched Google’s engineering excellence.',
  },
  {
    name: 'David Chen',
    title: 'Principal Engineer, Microsoft',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    quote:
      'The code quality, documentation, and delivery cadence rival the best at Microsoft. Their attention to scalability and security brought peace of mind at every step.',
    rating: 5,
    highlight: 'Enterprise-ready, world-class delivery.',
  },
  {
    name: 'Ava Patel',
    title: 'CTO, IBM',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    companyLogo:
      'https://static.vecteezy.com/system/resources/previews/021/515/152/large_2x/ibm-brand-symbol-software-computer-logo-white-design-illustration-with-blue-background-free-vector.jpg',
    quote:
      'Their team thinks strategically, executes flawlessly, and communicates transparently. We achieved our goals faster, and with greater confidence, than with any previous partner.',
    rating: 5,
    highlight: 'Strategic, seamless partnership.',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  // Auto-cycle every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-8 bg-gradient-to-br from-[#e6f0ff] via-[#edf4ff] to-[#f7faff]">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0066FF]">
          What Industry Leaders Say
        </h2>
        <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
          Trusted by top engineers and executives from the world’s most
          innovative companies.
        </p>
      </div>
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Avatars and selector */}
        <div className="flex md:flex-col gap-6 md:gap-8 items-center md:items-start">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => setActive(idx)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`flex flex-col items-center transition-all duration-300 ${
                idx === active
                  ? 'scale-110'
                  : 'opacity-60 grayscale hover:scale-105'
              }`}
            >
              <div className="relative">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${
                    idx === active
                      ? 'border-[#1983de] shadow-xl'
                      : 'border-gray-400'
                  }`}
                  loading="lazy"
                />
                <img
                  src={t.companyLogo}
                  alt={t.title}
                  className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border border-gray-200 shadow"
                  style={{ background: '#fff' }}
                />
              </div>
              <span className="mt-2 text-gray-200 font-semibold text-sm text-center">
                {t.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
        {/* Testimonial Content */}
        <div className="flex-1 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-[#B8E0E8]/70 rounded-2xl shadow-2xl px-8 py-10 flex flex-col justify-center items-center"
              aria-live="polite"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 text-amber-400" />
                ))}
              </div>
              {/* Highlight */}
              <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 via-fuchsia-600 to-orange-400 text-white font-bold mb-3">
                {TESTIMONIALS[active].highlight}
              </span>
              {/* Text */}
              <blockquote className="text-lg md:text-2xl text-gray-900 font-semibold mb-6 text-center">
                “{TESTIMONIALS[active].quote}”
              </blockquote>
              {/* Profile */}
              <div className="flex flex-col items-center gap-0">
                <span className="font-bold text-[#007d9c] text-lg">
                  {TESTIMONIALS[active].name}
                </span>
                <span className="text-gray-800 text-sm">
                  {TESTIMONIALS[active].title}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Dots navigation for mobile */}
      <div className="flex justify-center mt-8 md:hidden">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
              i === active ? 'bg-fuchsia-500' : 'bg-gray-400 opacity-60'
            }`}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
