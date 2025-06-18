"use client";
import { useState } from "react";

// Team member data
const teamMembers = [
  {
    name: "Aarav Patel",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Aarav specializes in scalable backend architecture and cloud integrations. With 8+ years’ experience in full-stack development, Aarav leads the engineering team and mentors new developers.",
    email: "aarav.patel@example.com",
    linkedin: "https://linkedin.com/in/aaravpatel",
  },
  {
    name: "Saanvi Sharma",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Saanvi crafts beautiful, intuitive interfaces and user experiences. She blends creativity and research to ensure every product is engaging and accessible.",
    email: "saanvi.sharma@example.com",
    linkedin: "https://linkedin.com/in/saanvisharma",
  },
  {
    name: "Rohan Gupta",
    role: "Mobile App Specialist",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    bio: "Rohan has a passion for mobile-first solutions. He’s developed dozens of cross-platform apps and keeps up with the latest in Flutter and React Native.",
    email: "rohan.gupta@example.com",
    linkedin: "https://linkedin.com/in/rohandgupta",
  },
  {
    name: "Priya Desai",
    role: "AI & Data Analytics Lead",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Priya transforms data into insights. She leads the AI/ML initiatives and helps clients unlock the power of analytics for better business decisions.",
    email: "priya.desai@example.com",
    linkedin: "https://linkedin.com/in/priyadesai",
  },
];

export default function TeamSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="mt-14 mb-12">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
        👥 Meet Our Team
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className={`bg-[#1b2740] rounded-xl border-2 border-cyan-800 shadow-xl p-5 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => setSelected(idx)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full border-4 border-cyan-400 object-cover mb-4 shadow-lg"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-cyan-300 font-medium">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for member info */}
      {selected !== null && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-70 flex items-center justify-center px-3">
          <div className="bg-[#14223c] rounded-2xl shadow-2xl border-2 border-cyan-700 p-8 max-w-md w-full relative text-white animate-fade-in">
            <button
              className="absolute top-3 right-4 text-2xl text-cyan-300 hover:text-cyan-500"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={teamMembers[selected].image}
                alt={teamMembers[selected].name}
                className="w-28 h-28 rounded-full border-4 border-cyan-400 object-cover mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-1">{teamMembers[selected].name}</h3>
              <p className="text-cyan-300 font-medium mb-3">{teamMembers[selected].role}</p>
              <p className="text-gray-200 mb-4 text-center">{teamMembers[selected].bio}</p>
              <div className="flex flex-col gap-2 items-center">
                <a
                  href={`mailto:${teamMembers[selected].email}`}
                  className="text-cyan-200 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📧 {teamMembers[selected].email}
                </a>
                <a
                  href={teamMembers[selected].linkedin}
                  className="text-cyan-200 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.22s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </section>
  );
}