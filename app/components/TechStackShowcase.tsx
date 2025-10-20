import { memo, useState } from 'react';
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

const techIconsRowOne = [
  { icon: FaReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: FaNodeJs, label: 'Node.js' },
  { icon: SiExpress, label: 'Express.js' },
  { icon: SiMongodb, label: 'MongoDB' },
  { icon: SiRedux, label: 'Redux' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: FaGitAlt, label: 'Git' },
  { icon: FaGithub, label: 'GitHub' },
];

const techIconsRowTwo = [
  { icon: FaJava, label: 'Java' },
  { icon: FaPython, label: 'Python' },
  { icon: FaHtml5, label: 'HTML5' },
  { icon: FaCss3Alt, label: 'CSS3' },
  { icon: SiGraphql, label: 'GraphQL' },
  { icon: SiFirebase, label: 'Firebase' },
  { icon: SiMysql, label: 'MySQL' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: FaAws, label: 'AWS' },
  { icon: FaDocker, label: 'Docker' },
];

const MarqueeRow = ({
  icons,
  colorClass,
  isAlt,
}: {
  icons: { icon: any; label: string }[];
  colorClass: string;
  isAlt?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="overflow-hidden relative mb-12 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`flex w-[200%] space-x-14 ${
          isAlt ? 'flex-row-reverse' : 'flex-row'
        }`}
        animate={{
          x: isHovered ? 0 : ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: isHovered ? 0 : Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        }}
      >
        {[...icons, ...icons].map(({ icon: Icon, label }, idx) => (
          <motion.div
            key={idx}
            className={`text-7xl sm:text-8xl md:text-9xl ${colorClass} transition-transform duration-300 flex flex-col items-center justify-center`}
            whileHover={{ scale: 1.2, color: colorClass.replace('300', '600') }}
            aria-label={label}
            title={label}
          >
            <Icon />
            <span className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100 select-none pointer-events-none">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const TechStackShowcase = () => {
  return (
    <section
      className="bg-gradient-to-br from-[#e6f0ff] via-[#edf4ff] to-[#f7faff] py-14 sm:py-20 px-6 sm:px-10 md:px-16 lg:px-28"
      aria-labelledby="tech-stack-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2
          id="tech-stack-heading"
          className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-[#1EB8F3] to-[#0066FF] bg-clip-text text-transparent"
        >
          Technologies We Master
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-700 text-lg sm:text-xl font-medium">
          At <span className="font-bold text-gray-900">Talent With Us</span>, we
          use a cutting-edge tech stack to build scalable, secure, and
          high-performance digital solutions. From frontend to backend, we
          ensure quality and innovation.
        </p>
      </motion.div>

      <MarqueeRow
        icons={techIconsRowOne}
        colorClass="text-cyan-400 hover:text-cyan-600"
      />
      <MarqueeRow
        icons={techIconsRowTwo}
        colorClass="text-orange-400 hover:text-orange-600"
        isAlt
      />

      <div className="text-center mt-12 mb-10">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 0px 15px rgba(0,174,239,0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#00AEEF] cursor-pointer to-[#0052CC] text-white px-10 py-4 rounded-full shadow-lg font-semibold text-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Explore our full repository"
        >
          Explore Our Full Repository
        </motion.button>
      </div>
    </section>
  );
};

export default memo(TechStackShowcase);
