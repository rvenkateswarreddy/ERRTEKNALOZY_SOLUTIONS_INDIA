import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ServerIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

// Service data is static, so useMemo for performance and clarity
const SERVICES = [
  {
    title: "Web Development",
    description: "High-performance websites with modern tech stacks.",
    icon: CodeBracketIcon,
  },
  {
    title: "Mobile Applications",
    description: "iOS & Android apps with flawless UX.",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "Automation Tools",
    description: "Smart solutions to streamline your workflows.",
    icon: ArrowPathIcon,
  },
  {
    title: "Digital Products",
    description: "Custom software for your specific needs.",
    icon: CpuChipIcon,
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure for your applications.",
    icon: ServerIcon,
  },
  {
    title: "UI/UX Design",
    description: "Beautiful interfaces with intuitive experiences.",
    icon: RocketLaunchIcon,
  },
  {
    title: "Maintenance & Support",
    description: "Reliable ongoing support for your digital assets.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Consulting",
    description: "Expert guidance for your digital strategy.",
    icon: GlobeAltIcon,
  },
] as const;

const CARD_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.10, type: "spring", stiffness: 90, damping: 15 }
  }),
};

const SECTION_ANIMATION = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function WhatWeDoComponent() {
  // Use triggerOnce:true for performance, but set to false if content changes
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Memoize services to avoid re-renders
  const services = useMemo(() => SERVICES, []);

  return (
    <section
      id="services"
      ref={ref}
      aria-label="Our Digital Services"
      className="py-20 relative bg-gradient-to-b from-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={SECTION_ANIMATION}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Digital Services
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your unique business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={CARD_ANIMATION_VARIANTS}
                custom={idx}
                tabIndex={0}
                aria-label={service.title}
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/40 focus-within:border-blue-400 transition-all hover:-translate-y-2 focus-within:-translate-y-2 shadow-lg outline-none"
              >
                <div className="text-blue-400 mb-4" aria-hidden="true">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Memoize for extra performance if used in large pages
export default memo(WhatWeDoComponent);