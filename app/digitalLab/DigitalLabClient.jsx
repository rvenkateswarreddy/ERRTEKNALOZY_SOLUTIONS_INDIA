'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation if needed within this page
import {
  FaNodeJs,
  FaPython,
  FaReact,
  FaSearch,
  FaWordpress,
} from 'react-icons/fa';
import {
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
} from 'react-icons/si';

// Import child components (ensure paths are correct)
import OurWorks from '../components/OurWorks';
import Testimonial from '../components/Testimonial';
import WhatWeOffer from '../components/WhatWeOffer';
// Removed ContactSection import, will embed structure below
// import ContactSection from '../components/ContactSection';

// Import the hero image
import hero from '../../public/assets/projects.jpg'; // Adjust path if needed

const workflow = [
  // ... (workflow data remains the same)
  {
    icon: '📝',
    title: 'Requirement Gathering',
    desc: 'We listen, analyze, and document your needs.',
  },
  {
    icon: '🎨',
    title: 'Planning & Design',
    desc: 'Wireframes, UI/UX, and clear milestones.',
  },
  {
    icon: '💻',
    title: 'Development',
    desc: 'Agile coding, regular updates, and transparency.',
  },
  {
    icon: '🧪',
    title: 'Testing',
    desc: 'Manual and automated QA for a flawless experience.',
  },
  {
    icon: '🚀',
    title: 'Launch & Support',
    desc: 'Go-live, monitor, and support post-delivery.',
  },
];

const techStack = [
  // ... (techStack data remains the same)
  { icon: FaReact, name: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
  { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
  { icon: FaPython, name: 'Python', color: '#3776AB' },
  { icon: FaWordpress, name: 'WordPress', color: '#21759B' },
  { icon: FaSearch, name: 'SEO Tools', color: '#E10098' },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function DigitalLabClient() {
  return (
    <main className="bg-gradient-to-br from-[#E3F1F5] via-[#f0f5f8] to-[#ddeaf0] min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* Aurora Background */}
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#67e8f9] to-[#22d3ee] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 z-10 relative"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-gray-900">
              Welcome to the <span className="text-cyan-600">Digital Lab</span>
              <br />
              Where <span className="text-blue-600">Ideas</span> Meet{' '}
              <span className="text-indigo-600">Innovation</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto md:mx-0">
              Explore our digital solutions crafted for impact — from powerful
              web apps to SEO-optimized websites.
            </p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.a
                href="#contact"
                className="px-7 py-3 rounded-full bg-cyan-600 text-white font-semibold shadow-md hover:bg-cyan-700 transition focus:outline-none focus:ring-2 ring-offset-2 ring-cyan-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="#work"
                className="px-7 py-3 rounded-full border-2 border-cyan-600 text-cyan-700 font-semibold hover:bg-cyan-600 hover:text-white transition focus:outline-none focus:ring-2 ring-offset-2 ring-cyan-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Our Work
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center mt-10 md:mt-0"
          >
            <Image
              src={hero}
              alt="Digital Solutions Showcase"
              width={520}
              height={380}
              priority
              className="drop-shadow-xl max-w-full h-auto rounded-2xl border-2 border-white/50 shadow-lg"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* What We Offer */}
      <motion.section
        className="py-16 px-4"
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-700">
            What We Offer
          </h2>
          <WhatWeOffer />
        </div>
      </motion.section>

      {/* Our Work Showcase */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-b from-[#f0f5f8] to-[#ddeaf0]/80"
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Projects & Capabilities
          </h2>
          <OurWorks />
        </div>
      </motion.section>

      {/* Workflow Process */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-cyan-700 tracking-wide">
            Our Development Workflow
          </h2>
          <motion.div
            className="flex flex-wrap md:flex-nowrap items-stretch justify-center gap-6 relative"
            variants={sectionVariants}
          >
            {workflow.map((step, idx) => (
              <motion.div
                key={step.title}
                className="relative flex flex-col items-center text-center flex-1 min-w-[160px] sm:min-w-[200px] max-w-xs"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-cyan-200 px-6 py-10 flex flex-col items-center w-full h-full transition-shadow duration-300 hover:shadow-cyan-300/50"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-xs font-semibold uppercase text-cyan-600 mb-2">
                    Step {idx + 1}
                  </div>
                  <div className="text-5xl sm:text-6xl mb-4 text-cyan-500">
                    {step.icon}
                  </div>
                  <div className="font-bold text-gray-800 mb-2 text-lg sm:text-xl">
                    {step.title}
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base flex-grow">
                    {step.desc}
                  </div>
                </motion.div>
                {idx < workflow.length - 1 && (
                  <div className="hidden md:block absolute right-[-24px] lg:right-[-34px] top-1/2 -translate-y-1/2 z-10 text-cyan-400 opacity-70">
                    <svg
                      width="44"
                      height="24"
                      viewBox="0 0 44 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12H40M40 12L31 3M40 12L31 21"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-b from-[#ddeaf0]/80 to-[#E3F1F5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
            Technologies We Use
          </h2>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-10"
            variants={sectionVariants}
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center group w-20" // Added fixed width
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                title={tech.name} // Added title for hover tooltip
              >
                {/* Recreate the icon with the color */}
                <tech.icon
                  className="text-5xl sm:text-6xl mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="text-xs font-medium text-gray-600 transition-opacity duration-300 opacity-80 group-hover:opacity-100">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Testimonial />
      </motion.section>

      {/* Replace this with your actual Contact Section JSX */}
      <motion.section
        id="contact"
        className="py-20 px-4 bg-gradient-to-b from-[#E3F1F5] to-[#f0f5f8]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="max-w-3xl mx-auto text-center bg-white/50 backdrop-blur-lg p-10 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-cyan-700">
            Get In Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have a project in mind or just want to learn more? Reach out to us!
          </p>
          {/* Placeholder for your actual contact form or details */}
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                required
                className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="px-8 py-3 rounded-full bg-cyan-600 text-white font-semibold shadow-md hover:bg-cyan-700 transition focus:outline-none focus:ring-2 ring-offset-2 ring-cyan-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
          {/* You can add direct contact info here too */}
          {/* <div className="mt-8 text-gray-600">
             <p>Email: info@example.com</p>
             <p>Phone: +123 456 7890</p>
           </div> */}
        </div>
      </motion.section>
      {/* --- END OF REVERTED CONTACT SECTION --- */}

      {/* Sticky Mobile CTA */}
      <motion.div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm px-2 block md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 1 }}
      >
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full shadow-lg flex items-center justify-between px-3 py-2">
          <span className="text-white font-medium text-sm pl-2">
            Ready to build?
          </span>
          <Link
            href="#contact"
            className="px-4 py-1.5 bg-white text-cyan-700 rounded-full font-bold text-sm shadow-sm hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
