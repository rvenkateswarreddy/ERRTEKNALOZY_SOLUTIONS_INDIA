'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Github, Mail, X } from 'lucide-react';
import PropTypes from 'prop-types'; // <-- FIX: Import PropTypes

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, children }) => {
  // <-- FIX: Removed TypeScript types
  useEffect(() => {
    const handleEsc = (e) => {
      // <-- FIX: Removed TypeScript type
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-[#14223c] rounded-2xl shadow-2xl border border-cyan-700/50 p-8 max-w-md w-full relative text-white"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-cyan-300 hover:text-cyan-500 p-1 rounded-full hover:bg-white/10 transition"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- FIX: Added PropTypes for type checking in JavaScript ---
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// Team member data
const teamMembers = [
  {
    name: 'Aarav Patel',
    role: 'Lead Developer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Aarav specializes in scalable backend architecture and cloud integrations. With 8+ years’ experience in full-stack development, Aarav leads the engineering team and mentors new developers.',
    email: 'aarav.patel@example.com',
    linkedin: 'https://linkedin.com/in/aaravpatel',
    github: 'https://github.com/',
  },
  {
    name: 'Saanvi Sharma',
    role: 'UI/UX Designer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Saanvi crafts beautiful, intuitive interfaces and user experiences. She blends creativity and research to ensure every product is engaging and accessible.',
    email: 'saanvi.sharma@example.com',
    linkedin: 'https://linkedin.com/in/saanvisharma',
    github: 'https://github.com/',
  },
  {
    name: 'Rohan Gupta',
    role: 'Mobile App Specialist',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    bio: 'Rohan has a passion for mobile-first solutions. He’s developed dozens of cross-platform apps and keeps up with the latest in Flutter and React Native.',
    email: 'rohan.gupta@example.com',
    linkedin: 'https://linkedin.com/in/rohandgupta',
    github: 'https://github.com/',
  },
  {
    name: 'Priya Desai',
    role: 'AI & Data Analytics Lead',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Priya transforms data into insights. She leads the AI/ML initiatives and helps clients unlock the power of analytics for better business decisions.',
    email: 'priya.desai@example.com',
    linkedin: 'https://linkedin.com/in/priyadesai',
    github: 'https://github.com/',
  },
];

// Animation Variants for the grid
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function TeamSection() {
  const [selectedIdx, setSelectedIdx] = useState(null); // <-- FIX: Removed TypeScript type
  const selectedMember = selectedIdx !== null ? teamMembers[selectedIdx] : null;

  return (
    <section className="py-16 md:py-20">
      <motion.h2
        className="text-3xl font-bold text-cyan-600 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <span role="img" aria-label="people gesturing ok">
          👥
        </span>{' '}
        Meet Our Expert Team
      </motion.h2>

      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {teamMembers.map((member, idx) => (
          <motion.button
            key={member.name}
            className="relative bg-gradient-to-tr from-[#192a4a] to-[#1b2944] backdrop-blur-md rounded-3xl border border-cyan-600/50 shadow-lg p-7 flex flex-col items-center cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#1b2944]"
            onClick={() => setSelectedIdx(idx)}
            variants={cardVariants}
            whileHover={{
              y: -5,
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0, 255, 255, 0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View details for ${member.name}`}
          >
            <div className="relative w-28 h-28 mb-6 rounded-full overflow-hidden shadow-lg ring-2 ring-cyan-400/75">
              <Image
                src={member.image}
                alt={member.name}
                width={112}
                height={112}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-transparent to-cyan-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-semibold text-white leading-tight mb-1 drop-shadow-lg">
              {member.name}
            </h3>
            <p className="italic text-cyan-300 font-light tracking-wide text-sm drop-shadow-sm mb-4">
              {member.role}
            </p>
            <div className="flex space-x-5 mt-auto pt-2">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn`}
                  className="text-cyan-300 hover:text-cyan-500 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={20} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub`}
                  className="text-cyan-300 hover:text-cyan-500 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      <Modal
        isOpen={selectedMember !== null}
        onClose={() => setSelectedIdx(null)}
      >
        {selectedMember && (
          <div className="flex flex-col items-center text-center text-gray-200">
            <div className="relative w-32 h-32 mb-5 rounded-full overflow-hidden ring-4 ring-cyan-400 ring-opacity-70 shadow-lg">
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/30 via-transparent to-cyan-600/40 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3 className="text-2xl font-bold tracking-wide text-white drop-shadow-md mb-1">
              {selectedMember.name}
            </h3>

            <p className="text-cyan-300 font-light italic tracking-wide text-base mb-4 drop-shadow-sm">
              {selectedMember.role}
            </p>

            <p className="text-gray-300 leading-relaxed mb-6 px-2 text-sm max-w-prose">
              {selectedMember.bio}
            </p>

            <div className="flex flex-col gap-3 items-center text-sm">
              {selectedMember.email && (
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="text-cyan-200 font-semibold underline hover:text-cyan-400 transition flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={16} />
                  {selectedMember.email}
                </a>
              )}
              {selectedMember.linkedin && (
                <a
                  href={selectedMember.linkedin}
                  className="text-cyan-200 font-semibold underline hover:text-cyan-400 transition flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              )}
              {selectedMember.github && (
                <a
                  href={selectedMember.github}
                  className="text-cyan-200 font-semibold underline hover:text-cyan-400 transition flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  GitHub Profile
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
