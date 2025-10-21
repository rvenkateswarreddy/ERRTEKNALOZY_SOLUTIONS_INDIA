'use client';

import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaDocker,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiTypescript,
  SiGraphql,
  SiFirebase,
  SiMysql,
  SiPostgresql,
} from 'react-icons/si';

// --- IMPROVED DATA STRUCTURE ---
// Colors are now part of the data, making the Marquee component more reusable.
// Using official brand colors for authenticity.
const techIconsRowOne = [
  { icon: FaReact, label: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#000000' },
  { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#06B6D4' },
  { icon: FaNodeJs, label: 'Node.js', color: '#339933' },
  { icon: SiExpress, label: 'Express.js', color: '#000000' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
  { icon: SiRedux, label: 'Redux', color: '#764ABC' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: FaGitAlt, label: 'Git', color: '#F05032' },
  { icon: FaGithub, label: 'GitHub', color: '#181717' },
];

const techIconsRowTwo = [
  { icon: FaJava, label: 'Java', color: '#007396' },
  { icon: FaPython, label: 'Python', color: '#3776AB' },
  { icon: FaHtml5, label: 'HTML5', color: '#E34F26' },
  { icon: FaCss3Alt, label: 'CSS3', color: '#1572B6' },
  { icon: SiGraphql, label: 'GraphQL', color: '#E10098' },
  { icon: SiFirebase, label: 'Firebase', color: '#FFCA28' },
  { icon: SiMysql, label: 'MySQL', color: '#4479A1' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
  { icon: FaAws, label: 'AWS', color: '#232F3E' },
  { icon: FaDocker, label: 'Docker', color: '#2496ED' },
];

// --- REFACTORED MARQUEE COMPONENT ---
// Now uses a pure CSS animation for a smoother, more performant loop.
const MarqueeRow = ({
  icons,
  direction = 'left',
}: {
  icons: { icon: any; label: string; color: string }[];
  direction?: 'left' | 'right';
}) => {
  const marqueeVariants = {
    animate: {
      x: direction === 'left' ? [0, -1018] : [-1018, 0], // Adjusted for a bit of overscan
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 40,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden relative group mb-8">
      <motion.div
        className="flex space-x-14 whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
        // Pause animation on hover using CSS animation-play-state
        style={{ animationPlayState: 'running' }}
        onHoverStart={(e) => {
          (e.target as HTMLElement).style.animationPlayState = 'paused';
        }}
        onHoverEnd={(e) => {
          (e.target as HTMLElement).style.animationPlayState = 'running';
        }}
      >
        {/* Render the icons twice for a seamless loop */}
        {[...icons, ...icons].map(({ icon: Icon, label, color }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center group/item transition-transform duration-300"
            title={label}
          >
            <div className="relative">
              {/* Soft glow effect on hover */}
              <div
                className="absolute -inset-2 rounded-full opacity-0 group-hover/item:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: color, filter: 'blur(20px)' }}
              />
              <Icon
                className="text-7xl sm:text-8xl transition-transform duration-300 group-hover/item:scale-110"
                style={{ color: color }}
                aria-label={label}
              />
            </div>
            {/* Label appears on hover */}
            <span className="mt-3 text-sm font-semibold text-gray-700 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 select-none pointer-events-none">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TechStackShowcase = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32"
      aria-labelledby="tech-stack-heading"
    >
      {/* Dynamic Background Glow */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1EB8F3] to-[#0066FF] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            id="tech-stack-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#1EB8F3] to-[#0066FF] bg-clip-text text-transparent"
          >
            Technologies We Master
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-700">
            At <span className="font-bold text-gray-900">Talent With Us</span>,
            we use a cutting-edge tech stack to build scalable, secure, and
            high-performance digital solutions.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="mt-16 flex flex-col space-y-8">
        <MarqueeRow icons={techIconsRowOne} direction="left" />
        <MarqueeRow icons={techIconsRowTwo} direction="right" />
      </div>

      <div className="mt-20 text-center">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 10px 30px -5px rgba(0,174,239,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-gradient-to-r from-[#00AEEF] cursor-pointer to-[#0052CC] text-white px-8 py-3 rounded-full shadow-lg font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Explore our full repository"
        >
          Explore Our Full Repository
        </motion.button>
      </div>
    </section>
  );
};

export default TechStackShowcase;
