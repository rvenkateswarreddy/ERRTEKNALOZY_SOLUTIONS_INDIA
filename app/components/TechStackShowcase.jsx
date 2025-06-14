"use client";
import React from "react";
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
} from "react-icons/fa";
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
} from "react-icons/si";

const techRowOne = [
  <FaReact />,
  <SiNextdotjs />,
  <SiTailwindcss />,
  <FaNodeJs />,
  <SiExpress />,
  <SiMongodb />,
  <SiRedux />,
  <SiTypescript />,
  <FaGitAlt />,
  <FaGithub />,
];

const techRowTwo = [
  <FaJava />,
  <FaPython />,
  <FaHtml5 />,
  <FaCss3Alt />,
  <SiGraphql />,
  <SiFirebase />,
  <SiMysql />,
  <SiPostgresql />,
  <FaAws />,
  <FaDocker />,
];

const TechStackShowcase = () => {
  return (
    <section className=" bg-gradient-to-br from-[#061a2e] via-[#0f1624] to-[#202a44] text-white py-20 px-4 sm:px-8 lg:px-0">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400">
          Technologies We Master
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          At <span className="text-white font-semibold">Errteknalozy</span>, we
          stay ahead with a modern tech stack to deliver powerful, scalable, and
          secure solutions. From frontend to backend, we craft every project
          with precision using the best tools available.
        </p>
      </div>

      {/* Scrolling Row One */}
      <div className="overflow-hidden relative mb-20 group">
        <div className="flex w-[200%] animate-marquee group-hover:[animation-play-state:paused] space-x-12">
          {techRowOne.concat(techRowOne).map((Icon, idx) => (
            <div
              key={idx}
              className="text-8xl text-cyan-300 hover:text-cyan-500 hover:scale-110 transition duration-300 p-5"
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Row Two */}
      <div className="overflow-hidden relative mb-16 group">
        <div className="flex w-[200%] animate-marquee2 group-hover:[animation-play-state:paused] space-x-12">
          {techRowTwo.concat(techRowTwo).map((Icon, idx) => (
            <div
              key={idx}
              className="text-8xl text-orange-300 hover:text-orange-500 hover:scale-110 transition duration-300 p-5 "
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-8 py-3 rounded-xl shadow-lg font-semibold text-lg hover:opacity-90 hover:scale-105 transition-transform duration-300">
          Explore Our Full Repository
        </button>
      </div>
    </section>
  );
};

export default TechStackShowcase;
