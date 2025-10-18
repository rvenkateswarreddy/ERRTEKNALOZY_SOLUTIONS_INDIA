'use client';

import React from 'react';
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
  icons: any[];
  colorClass: string;
  isAlt?: boolean;
}) => (
  <div className="overflow-hidden relative group mb-12">
    <div
      className={`flex w-[200%] ${
        isAlt ? 'marquee2' : 'marquee'
      } pause-on-hover space-x-12`}
    >
      {icons.concat(icons).map(({ icon: Icon, label }, idx) => (
        <div
          key={idx}
          className={`text-6xl sm:text-7xl md:text-8xl ${colorClass} hover:scale-110 transition-transform duration-300 p-4`}
          aria-label={label}
          title={label}
        >
          <Icon />
        </div>
      ))}
    </div>
  </div>
);

const TechStackShowcase = () => {
  return (
    <section
      className="bg-gradient-to-br from-[#e6f0ff] via-[#edf4ff] to-[#f7faff] text-white py-5 px-4 sm:px-8 "
      aria-labelledby="tech-stack-heading"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2
          id="tech-stack-heading"
          className="text-4xl sm:text-5xl font-bold my-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400"
        >
          Technologies We Master
        </h2>
        <p className="text-black/70 text-lg max-w-3xl mx-auto">
          At <span className="text-black font-semibold">Talent With Us</span>,
          we use a cutting-edge tech stack to build scalable, secure, and
          high-performance digital solutions. From frontend to backend, we
          ensure quality and innovation.
        </p>
      </div>

      <MarqueeRow
        icons={techIconsRowOne}
        colorClass="text-cyan-300 hover:text-cyan-500"
      />
      <MarqueeRow
        icons={techIconsRowTwo}
        colorClass="text-orange-300 hover:text-orange-500"
        isAlt
      />

      <div className="text-center mt-12 mb-10">
        <button
          className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-8 py-3 rounded-xl shadow-lg font-semibold text-lg hover:opacity-90 hover:scale-105 transition-transform duration-300"
          aria-label="Explore our full repository"
        >
          Explore Our Full Repository
        </button>
      </div>
    </section>
  );
};

export default TechStackShowcase;
