'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react'; // <-- For consistent icons
import PropTypes from 'prop-types'; // <-- FIX: Import PropTypes for JS type checking
import { useEffect, useState } from 'react';
import {
  FaAndroid,
  FaAngular,
  FaApple,
  FaAws,
  FaDatabase,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import {
  SiDjango,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiKubernetes,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiTailwindcss,
} from 'react-icons/si';

// --- Reusable Modal Component (for consistency) ---
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-gradient-to-br from-[#181b29] via-[#0a0a0a] to-[#191c24] border border-cyan-700/50 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-cyan-300 hover:text-cyan-200 transition p-1 rounded-full hover:bg-white/10"
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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

// --- Data (Moved outside component) ---
const techSupports = [
  {
    icon: <FaReact className="text-cyan-400 text-4xl" />,
    name: 'React.js',
    short: 'Modern UI & Single Page Applications',
    desc: 'We provide comprehensive support for React.js projects, including code reviews, complex state management, performance optimization, UI/UX best practices, and troubleshooting. Ideal for startups and enterprises building scalable frontends.',
    highlights: [
      'SPA architecture and routing',
      'Hooks & Context API',
      'Performance tuning',
      'Component library integration',
    ],
  },
  {
    icon: <SiNextdotjs className="text-gray-200 text-4xl" />,
    name: 'Next.js',
    short: 'SSR, SSG, and Fullstack Capabilities',
    desc: 'From server-side rendering to API routes, our team helps you leverage Next.js for SEO-friendly, highly performant web applications. We support deployment, static export, and advanced routing strategies.',
    highlights: [
      'Server-side rendering (SSR)',
      'API routes and backend integration',
      'Static site generation (SSG)',
      'SEO optimization',
    ],
  },
  {
    icon: <FaNodeJs className="text-green-500 text-4xl" />,
    name: 'Node.js',
    short: 'Backend APIs & Real-Time Solutions',
    desc: 'Expertise in building scalable REST APIs, WebSockets, and microservices with Node.js and Express. We help debug, optimize, and scale your backend for production and cloud environments.',
    highlights: [
      'REST API development',
      'Real-time & event-driven apps',
      'Express.js, NestJS, Socket.IO',
      'Cloud deployment (AWS/GCP/Azure)',
    ],
  },
  {
    icon: <SiMongodb className="text-green-400 text-4xl" />,
    name: 'MongoDB',
    short: 'Flexible NoSQL Database Support',
    desc: 'Get help with schema design, aggregation pipelines, performance tuning, and Atlas setup. We resolve data migration, security, and scaling issues for high-traffic MongoDB deployments.',
    highlights: [
      'Schema modeling & validation',
      'Aggregation framework',
      'Performance optimization',
      'Atlas cloud setup',
    ],
  },
  {
    icon: <FaPython className="text-yellow-400 text-4xl" />,
    name: 'Python',
    short: 'Automation, Scripting & ML/AI',
    desc: 'We support automation scripts, data analysis, and end-to-end machine learning workflows using Python. Our team assists with troubleshooting, code optimization, and deployment.',
    highlights: [
      'Automation & data pipelines',
      'Flask, Django web frameworks',
      'Machine learning (scikit-learn, TensorFlow)',
      'Scripting best practices',
    ],
  },
  {
    icon: <SiDjango className="text-green-200 text-4xl" />,
    name: 'Django',
    short: 'Robust Web Backends',
    desc: 'Support for Django projects including ORM queries, admin customization, REST APIs with DRF, and deployment. Ideal for businesses needing secure, scalable backend solutions.',
    highlights: [
      'Django ORM and admin',
      'Authentication & permissions',
      'Django REST Framework (DRF)',
      'Server deployment (Gunicorn/Nginx)',
    ],
  },
  {
    icon: <FaJava className="text-orange-400 text-4xl" />,
    name: 'Java',
    short: 'Enterprise Apps & Android Backend',
    desc: 'Our Java experts provide support for Spring Boot microservices, enterprise systems, and Android backend integrations. We help with debugging, scalability, and deployment.',
    highlights: [
      'Spring Boot microservices',
      'Java EE & REST APIs',
      'Performance tuning',
      'Android backend integration',
    ],
  },
  {
    icon: <FaAndroid className="text-green-300 text-4xl" />,
    name: 'Android',
    short: 'Native Mobile App Support',
    desc: 'Get assistance with native Android app development, UI/UX, API integration, and troubleshooting. We help you publish and optimize apps for the Play Store.',
    highlights: [
      'Kotlin & Java app development',
      'UI/UX & Material Design',
      'API & Firebase integration',
      'Publishing & Play Store support',
    ],
  },
  {
    icon: <FaApple className="text-gray-200 text-4xl" />,
    name: 'iOS',
    short: 'Swift & Objective-C Apps',
    desc: 'We support iOS mobile projects from UI building to backend integration and App Store deployment, ensuring quality and performance.',
    highlights: [
      'Swift & Objective-C',
      'UI/UX with UIKit/SwiftUI',
      'API & Core Data integration',
      'App Store publishing',
    ],
  },
  {
    icon: <SiFlutter className="text-cyan-400 text-4xl" />,
    name: 'Flutter',
    short: 'Cross-Platform Mobile Apps',
    desc: 'Build and support high-quality mobile apps for Android and iOS from a single codebase using Dart and Flutter. Assistance with widgets, plugins, and deployment.',
    highlights: [
      'Custom widget development',
      'State management (Provider, Bloc)',
      'Plugin integration',
      'Cross-platform deployment',
    ],
  },
  {
    icon: <FaAngular className="text-red-400 text-4xl" />,
    name: 'Angular',
    short: 'Enterprise-Grade Web Apps',
    desc: 'Support for Angular projects including enterprise architecture, RxJS, services, and CLI tooling. Best for scalable, maintainable web applications.',
    highlights: [
      'RxJS & reactive programming',
      'Component & module structure',
      'CLI and build tools',
      'State management (NgRx)',
    ],
  },
  {
    icon: <SiTailwindcss className="text-cyan-300 text-4xl" />,
    name: 'Tailwind CSS',
    short: 'Rapid UI Development',
    desc: 'Expert guidance in crafting custom designs and responsive layouts with Tailwind CSS. We assist with best practices and integration.',
    highlights: [
      'Utility-first CSS',
      'Custom theming',
      'Responsive design',
      'Performance optimization',
    ],
  },
  {
    icon: <FaPhp className="text-indigo-400 text-4xl" />,
    name: 'PHP',
    short: 'Websites, APIs & WordPress',
    desc: 'From custom PHP applications to WordPress and Laravel, we support code fixes, plugin integration, and security hardening.',
    highlights: [
      'Custom PHP development',
      'WordPress plugins & themes',
      'Laravel framework',
      'Security & optimization',
    ],
  },
  {
    icon: <SiLaravel className="text-red-400 text-4xl" />,
    name: 'Laravel',
    short: 'Modern PHP Web Framework',
    desc: 'Support for Laravel-based web apps, REST APIs, Blade templating, and deployment. We help with migrations, authentication, and testing.',
    highlights: [
      'RESTful API development',
      'Blade templates & Mix',
      'Database migrations',
      'Authentication & middleware',
    ],
  },
  {
    icon: <SiMysql className="text-blue-400 text-4xl" />,
    name: 'MySQL',
    short: 'Reliable Relational Databases',
    desc: 'We help design, optimize, and troubleshoot MySQL databases, from queries to backups and cloud hosting.',
    highlights: [
      'Schema design',
      'Query optimization',
      'Replication & backups',
      'Cloud database setup',
    ],
  },
  {
    icon: <FaDatabase className="text-purple-400 text-4xl" />,
    name: 'Other Databases',
    short: 'PostgreSQL, Redis, Firebase, etc.',
    desc: 'We also provide support for PostgreSQL, Redis, Firebase, and other databases. Get help with setup, queries, and integrations.',
    highlights: [
      'PostgreSQL/Redis setup',
      'Realtime databases (Firebase)',
      'Data migration',
      'Backup and restore',
    ],
  },
  {
    icon: <FaAws className="text-yellow-300 text-4xl" />,
    name: 'AWS Cloud',
    short: 'Cloud Infrastructure & DevOps',
    desc: 'Full support for AWS services including EC2, S3, Lambda, IAM, and deployment pipelines. We help you scale and secure your infrastructure.',
    highlights: [
      'EC2, S3, Lambda',
      'IAM & security',
      'CI/CD pipelines',
      'Scalability & monitoring',
    ],
  },
  {
    icon: <SiKubernetes className="text-blue-400 text-4xl" />,
    name: 'Kubernetes',
    short: 'Container Orchestration',
    desc: 'Support for Kubernetes setup, scaling, and management. We assist with deployment, monitoring, and troubleshooting clusters.',
    highlights: [
      'Cluster setup',
      'Pod & service management',
      'Helm charts',
      'Scaling & monitoring',
    ],
  },
  {
    icon: <SiDocker className="text-blue-300 text-4xl" />,
    name: 'Docker',
    short: 'Containerization & DevOps',
    desc: 'Get help with Dockerizing your apps, creating Dockerfiles & Compose files, and CI/CD integration for rapid deployment.',
    highlights: [
      'Dockerfile & Compose',
      'CI/CD pipelines',
      'Container security',
      'Multi-environment support',
    ],
  },
  {
    icon: <SiFirebase className="text-yellow-400 text-4xl" />,
    name: 'Firebase',
    short: 'Realtime Apps & Cloud Functions',
    desc: 'Full stack support for Firebase projects: Realtime DB, Firestore, Auth, Cloud Functions, and hosting.',
    highlights: [
      'Realtime DB & Firestore',
      'Authentication',
      'Cloud Functions',
      'Hosting & deployment',
    ],
  },
  {
    icon: <FaHtml5 className="text-orange-400 text-4xl" />,
    name: 'HTML5',
    short: 'Modern, Accessible Web Markup',
    desc: 'Support for writing semantic, accessible, and SEO-friendly HTML5 for web projects and landing pages.',
    highlights: [
      'Semantic markup',
      'SEO best practices',
      'Responsive design',
      'Accessibility (a11y)',
    ],
  },
];

// --- Animation Variants ---
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, ease: 'easeOut' },
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

export default function OurWorks() {
  const [modalIdx, setModalIdx] = useState(null); // Use index for modal state
  const selectedTech = modalIdx !== null ? techSupports[modalIdx] : null;

  return (
    <div>
      <div className="text-center mx-auto max-w-3xl mb-12">
        {' '}
        {/* Increased max-width */}
        <p className="text-gray-700 text-base md:text-lg">
          {' '}
          {/* Adjusted text size */}
          Our team provides end-to-end support, project delivery,
          troubleshooting, and optimization on a wide range of leading
          technologies and platforms. Whether you need full-stack development,
          mobile apps, cloud, or DevOps—we've got your stack covered.
        </p>
      </div>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" // Adjusted grid for better spacing
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {techSupports.map((tech, idx) => (
          <motion.button
            key={tech.name}
            className="flex flex-col items-center bg-gradient-to-br from-[#161b22] via-[#10121a] to-[#23272f] border border-cyan-900/50 rounded-2xl shadow-lg p-6 min-h-[260px] cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#10121a]" // Accessibility
            onClick={() => setModalIdx(idx)}
            variants={cardVariants}
            whileHover={{
              y: -5,
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0, 255, 255, 0.1)',
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Learn more about ${tech.name}`}
          >
            <div className="mb-4">{tech.icon}</div> {/* Increased margin */}
            <div className="text-lg font-semibold text-cyan-300 mb-2">
              {' '}
              {/* Increased margin */}
              {tech.name}
            </div>
            <div className="text-cyan-200/80 text-sm mb-3 font-medium">
              {' '}
              {/* Increased margin */}
              {tech.short}
            </div>
            {/* Use line-clamp for cleaner truncation */}
            <div className="text-gray-400 text-xs line-clamp-2 flex-grow">
              {tech.desc}
            </div>
            {/* Visual cue instead of a nested button */}
            <div
              className="mt-5 text-sm font-semibold text-cyan-500 group-hover:text-cyan-300 transition-colors"
              aria-hidden="true"
            >
              Learn More &rarr;
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Reusable Modal */}
      <Modal isOpen={selectedTech !== null} onClose={() => setModalIdx(null)}>
        {selectedTech && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span>{selectedTech.icon}</span>
              <h3 className="text-2xl font-bold text-cyan-300">
                {selectedTech.name}
              </h3>
            </div>
            <p className="mb-4 text-cyan-200/90 text-base font-semibold">
              {selectedTech.short}
            </p>
            <p className="mb-6 text-gray-300 text-sm leading-relaxed">
              {selectedTech.desc}
            </p>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3 border-b border-cyan-800 pb-2">
                Key Areas We Support:
              </h4>
              <ul className="text-gray-300 text-sm space-y-2">
                {selectedTech.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              onClick={() => setModalIdx(null)}
              className="block w-full text-center py-3 mt-8 rounded-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition text-white shadow-lg text-base"
            >
              Book a Consultation
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}
