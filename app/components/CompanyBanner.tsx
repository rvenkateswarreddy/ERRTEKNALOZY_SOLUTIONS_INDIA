'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleCallModal from './ScheduleCallModal';

// --- Reusable Modal Component ---
// This component encapsulates all modal logic:
// - Animation (AnimatePresence)
// - Backdrop
// - Escape key to close
// - Body scroll lock
// - Accessibility (ARIA)
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            {/* Pass onClose to children so they can close the modal too */}
            {React.cloneElement(children as React.ReactElement, { onClose })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Improved Company Banner ---
const CompanyBanner = () => {
  const [showModal, setShowModal] = useState(false);

  // --- Re-added your watermark grid logic ---
  const [watermarkGrid, setWatermarkGrid] = useState<
    { top: string; left: string; rotate: string }[]
  >([]);

  useEffect(() => {
    const rows = 5,
      cols = 4,
      grid = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        grid.push({
          top: `${(r * 100) / rows + 4}%`,
          left: `${(c * 100) / cols + 4}%`,
          rotate: `${Math.random() * 30 - 15}deg`,
        });
    setWatermarkGrid(grid);
  }, []);
  // --- End of watermark logic ---

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <>
      <section className="relative overflow-hidden my-8 bg-white/90 text-gray-900 py-24 px-6 sm:px-12 lg:px-24 rounded-3xl shadow-2xl border border-gray-300">
        {/* --- Your Watermark Grid --- */}
        <div className="absolute inset-0 pointer-events-none z-0 select-none">
          {watermarkGrid.map((pos, i) => (
            <span
              key={i}
              className="absolute text-2xl sm:text-4xl font-extrabold opacity-5 whitespace-nowrap text-gray-900"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotate})`,
                userSelect: 'none',
              }}
            >
              Talent With Us
            </span>
          ))}
        </div>
        {/* --- End of Watermark Grid --- */}

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0066FF] drop-shadow-md"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            Building Exceptional Digital Products
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-gray-800 leading-relaxed"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{ transitionDelay: '0.1s' }}
          >
            At{' '}
            <span className="font-semibold text-gray-900">Talent With Us</span>,
            we craft high-impact websites, powerful applications, and end-to-end
            digital systems that fuel business innovation.
          </motion.p>
          <motion.div
            className="mt-12"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{ transitionDelay: '0.2s' }}
          >
            <motion.button
              aria-label="Schedule a call"
              onClick={() => setShowModal(true)}
              className="inline-block bg-gradient-to-r from-[#00AEEF] to-[#0052CC] text-white font-semibold text-lg px-10 py-3 rounded-xl shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-60"
              whileHover={{
                scale: 1.05,
                shadow: '0 10px 30px -5px rgba(0,174,239,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Schedule a Call
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* New Modal Implementation */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ScheduleCallModal onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default CompanyBanner;
