'use client';
import { AnimatePresence, motion } from 'framer-motion'; // <-- 1. Import motion
import { X } from 'lucide-react'; // <-- 5. Import icon
import PropTypes from 'prop-types'; // <-- 4. Import PropTypes
import { useEffect, useState } from 'react'; // Added useEffect

// --- Reusable Modal Component (Consistent Pattern) ---
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" // Added backdrop-blur
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            // Adjusted background and border for consistency
            className="bg-gradient-to-br from-[#151a22] via-[#10121a] to-[#23272f] border border-cyan-700/60 rounded-2xl shadow-2xl p-8 max-w-md w-full relative flex flex-col items-center"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-cyan-300 hover:text-cyan-200 transition p-1 rounded-full hover:bg-white/10" // Adjusted styling
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} /> {/* <-- 5. Use Lucide icon */}
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

// --- Data (Moved outside component) ---
const categories = [
  {
    icon: '🌐',
    title: 'Websites',
    description:
      'Enterprise-grade, high-performance websites—from business portals to full-featured eCommerce—optimized for SEO, accessibility, and conversion.',
  },
  {
    icon: '📱',
    title: 'Apps',
    description:
      'Modern Android/iOS apps built for scale and engagement. We deliver seamless UX, robust integration, and future-ready technology.',
  },
  {
    icon: '🛠️',
    title: 'Tools & SaaS',
    description:
      'Custom SaaS platforms, dashboards, and calculators to automate business processes and empower decision-making with actionable data.',
  }, // Fixed icon
  {
    icon: '💡',
    title: 'Digital Products',
    description:
      'From interactive code editors to online contest platforms, we deliver innovative digital products that empower learning, productivity, and engagement.',
  },
  {
    icon: '🧾',
    title: 'PPTs & PDFs',
    description:
      'Professional presentations, branded PDF brochures, and documentation—delivered with clarity, style, and impact for business, academics, or marketing.',
  },
  {
    icon: '🧠',
    title: 'AI / ML',
    description:
      'We create advanced AI solutions—chatbots, analytics, and recommendation engines—making next-gen intelligence accessible for your business.',
  },
  {
    icon: '🎨',
    title: 'Branding',
    description:
      'Distinctive branding: logos, guidelines, social kits, and UI systems—ensuring your digital presence is memorable and consistent everywhere.',
  },
  // Add an 8th item if you want a full 4-column row, or adjust grid-cols
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description:
      'Infrastructure setup, CI/CD pipelines, monitoring, and cloud cost optimization on AWS, Azure, or GCP.',
  }, // Example 8th item
];

// --- Animation Variants ---
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function WhatWeOffer() {
  const [openIdx, setOpenIdx] = useState(null); // <-- 4. Removed TS type

  const handleOpen = (idx) => {
    // <-- 4. Removed TS type
    setOpenIdx(idx);
    // Removed sliderIdx state as it wasn't used
  };

  const handleClose = () => {
    setOpenIdx(null);
  };

  const selectedCategory = openIdx !== null ? categories[openIdx] : null;

  return (
    <section aria-labelledby="what-we-offer-heading" className="w-full">
      <h2 id="what-we-offer-heading" className="sr-only">
        What We Offer
      </h2>
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-7"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible" // Animate when section scrolls into view
        viewport={{ once: true, amount: 0.1 }}
      >
        {categories.map((cat, idx) => (
          // --- 3. Changed div to motion.button ---
          <motion.button
            key={cat.title}
            className="relative h-full flex flex-col items-center text-center justify-between bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] border border-cyan-900/60 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]" // Adjusted border, added focus styles
            style={{ minHeight: '280px' }} // Slightly reduced min height
            onClick={() => handleOpen(idx)}
            aria-label={`Learn more about ${cat.title}`}
            variants={cardVariants} // Apply item animation
            whileHover={{ y: -5, scale: 1.03 }} // Apply hover animation
            whileTap={{ scale: 0.98 }}
          >
            {/* Group content for better layout control */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3" aria-hidden="true">
                {' '}
                {/* Increased margin */}
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3 pb-2 border-b border-gray-700 w-full">
                {' '}
                {/* <-- 5. Replaced div divider */}
                {cat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-5">
                {' '}
                {/* Adjusted text color/size, added line-clamp */}
                {cat.description}
              </p>
            </div>
            {/* Visual cue - removed button */}
            <div
              className="mt-4 text-xs font-semibold text-cyan-500 group-hover:text-cyan-300 transition-colors"
              aria-hidden="true"
            >
              Learn More &rarr;
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* --- 2. Replaced with reusable Modal component --- */}
      <Modal isOpen={selectedCategory !== null} onClose={handleClose}>
        {selectedCategory && (
          <>
            <div className="flex flex-col items-center mb-6 text-center">
              <span className="text-5xl mb-3" aria-hidden="true">
                {' '}
                {/* Increased size/margin */}
                {selectedCategory.icon}
              </span>
              <h3 className="text-2xl font-bold text-cyan-300 mb-2 border-b border-cyan-800 pb-2 px-4">
                {' '}
                {/* Added border/padding */}
                {selectedCategory.title}
              </h3>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed max-w-xs">
                {' '}
                {/* Adjusted styles */}
                {selectedCategory.description}
              </p>
            </div>
            {/* Placeholder for potential slider or additional details */}
            {/* Example: Add a link or button */}
            <a
              href="#contact" // Link to contact section
              onClick={handleClose} // Close modal on click
              className="block w-full max-w-xs mx-auto mt-4 text-center py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition text-white shadow text-base"
            >
              Discuss {selectedCategory.title} Project
            </a>
          </>
        )}
      </Modal>
    </section>
  );
}
