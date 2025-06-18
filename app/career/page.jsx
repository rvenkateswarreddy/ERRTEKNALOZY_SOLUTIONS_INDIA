"use client";
import React from "react";
import OpenPositions from "../components/OpenPositions";

const jobs = [
  {
    title: "Frontend Developer",
    location: "Hyderabad, India (Hybrid)",
    type: "Full-time",
    description:
      "Work with React, Next.js, and modern UI frameworks to build engaging, scalable web applications. Collaborate closely with designers and backend engineers.",
    requirements: [
      "2+ years experience with React or similar frameworks",
      "Strong CSS/JS fundamentals",
      "Experience with REST APIs",
      "Good communication skills",
    ],
  },
  {
    title: "Backend Developer",
    location: "Remote / Hyderabad",
    type: "Full-time",
    description:
      "Design and implement APIs, microservices, and scalable backend systems. Work with Node.js, Python, or Go in a collaborative Agile team.",
    requirements: [
      "2+ years experience with Node.js/Python/Go",
      "Familiarity with cloud platforms (AWS, GCP, Azure)",
      "Experience with databases (SQL/NoSQL)",
      "Understanding of RESTful APIs",
    ],
  },
  {
    title: "UI/UX Designer",
    location: "Hyderabad, India",
    type: "Full-time",
    description:
      "Create visually stunning, user-centric interfaces for web and mobile platforms. Work closely with product and engineering teams.",
    requirements: [
      "Portfolio of design projects",
      "Proficiency in Figma/Adobe XD/Sketch",
      "Understanding of design systems",
      "User research experience is a plus",
    ],
  },
];

const benefits = [
  {
    icon: "🌴",
    title: "Flexible Work",
    desc: "Hybrid & remote options, flexible hours for work-life balance.",
  },
  {
    icon: "💻",
    title: "Modern Tech",
    desc: "Latest tools, hardware, and opportunities to learn new tech.",
  },
  {
    icon: "📚",
    title: "Learning & Growth",
    desc: "Sponsored courses, mentorship, and regular knowledge sessions.",
  },
  {
    icon: "🏆",
    title: "Recognition",
    desc: "Performance bonuses, awards, and regular feedback.",
  },
  {
    icon: "🏥",
    title: "Health & Wellness",
    desc: "Comprehensive health insurance and wellness programs.",
  },
  {
    icon: "🎉",
    title: "Team Culture",
    desc: "Friendly, diverse, and inclusive environment with regular team events.",
  },
];

const culturePoints = [
  {
    icon: "🤝",
    title: "Collaboration",
    desc: "We believe the best solutions come from working together.",
  },
  {
    icon: "🚀",
    title: "Innovation",
    desc: "We encourage bold ideas and continuous improvement.",
  },
  {
    icon: "🧑‍🎓",
    title: "Growth Mindset",
    desc: "Personal and professional development is part of every role.",
  },
  {
    icon: "🌐",
    title: "Diversity & Inclusion",
    desc: "We welcome team members from all backgrounds and experiences.",
  },
];

export default function CareersPage() {
  return (
    <section className="py-14 px-4 min-h-screen bg-gradient-to-br from-[#061a2e] via-[#0f1624] to-[#202a44] text-white">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-4 text-cyan-400 drop-shadow-lg">
            Careers at Errteknalozy
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Join our mission to build impactful digital solutions and grow with a passionate, innovative team.
          </p>
        </div>

        {/* Culture & Values */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-7 text-white">🌟 Company Culture & Values</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {culturePoints.map((point) => (
              <div
                key={point.title}
                className="bg-[#18223a] rounded-xl p-7 border-2 border-cyan-700 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition"
              >
                <span className="text-3xl mb-3">{point.icon}</span>
                <h3 className="text-xl font-semibold mb-1 text-cyan-300">{point.title}</h3>
                <p className="text-gray-200 text-base">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-7 text-white">💼 Open Positions</h2>
          <OpenPositions />
        </div>

        {/* Benefits & Perks */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-7 text-white">🎁 Benefits & Perks</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-[#17213b] rounded-xl p-7 border-2 border-cyan-700 shadow-md flex flex-col items-center text-center hover:scale-[1.03] transition"
              >
                <span className="text-3xl mb-3">{b.icon}</span>
                <h3 className="text-lg font-semibold mb-1 text-cyan-300">{b.title}</h3>
                <p className="text-gray-200 text-base">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Easy Apply Card */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-[#1e2a44] to-[#17213b] rounded-3xl shadow-2xl border-2 border-cyan-700 p-10 w-full max-w-6xl flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-cyan-400">
              📩 Quick Apply
            </h2>
            <p className="text-gray-300 mb-4">
              Interested in joining us but don’t see a matching position? Send your resume and introduction to our team — we always love meeting talented people!
            </p>
            <a
              href="mailto:careers@brightmindsoft.com?subject=Open Application"
              className="px-7 py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold rounded-full transition shadow"
            >
              Apply Now
            </a>
            <div className="mt-5 text-sm text-cyan-200">
              Or email us at <a href="mailto:careers@brightmindsoft.com" className="underline">careers@brightmindsoft.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}