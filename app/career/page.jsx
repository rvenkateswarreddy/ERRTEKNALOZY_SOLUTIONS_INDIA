'use client';
import React from 'react';
import OpenPositions from '../components/OpenPositions';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const culturePoints = [
  {
    icon: '🤝',
    title: 'Collaboration',
    desc: 'We believe the best solutions come from working together.',
  },
  {
    icon: '🚀',
    title: 'Innovation',
    desc: 'We encourage bold ideas and continuous improvement.',
  },
  {
    icon: '🧑‍🎓',
    title: 'Growth Mindset',
    desc: 'Personal and professional development is part of every role.',
  },
  {
    icon: '🌐',
    title: 'Diversity & Inclusion',
    desc: 'We welcome team members from all backgrounds and experiences.',
  },
];

export default function CareersPage() {
  const { user, loading } = useAuth();

  return (
    <>
      <head>
        <title>Careers at Talent With Us</title>
        <meta
          name="description"
          content="Join Talent With Us! Explore our company culture and open tech positions. Grow with an innovative, diverse team. Apply now for Frontend, Backend, and UI/UX roles."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Careers at Talent With Us" />
        <meta
          property="og:description"
          content="Build impactful digital solutions with Talent With Us. See open jobs and company values."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://talentwithus.in/careers" />
      </head>
      <section className="py-14 px-4 min-h-screen bg-gradient-to-br from-[#E3F1F5] via-[#DDEFF2] to-[#C8E7EE]text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-cyan-600 drop-shadow-lg">
              Careers at Talent With Us
            </h1>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">
              Join our mission to build impactful digital solutions and grow
              with a passionate, innovative team.
            </p>
          </div>

          {/* Culture & Values */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-7 text-black">
              🌟 Company Culture & Values
            </h2>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              {culturePoints.map((point) => (
                <div
                  key={point.title}
                  className="bg-[#DEEAF3] rounded-xl p-7 border-2 border-cyan-400 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition"
                >
                  <span className="text-3xl mb-3">{point.icon}</span>
                  <h3 className="text-xl font-semibold mb-1 text-cyan-700">
                    {point.title}
                  </h3>
                  <p className="text-gray-800 text-base">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-7 text-black">
              💼 Open Positions
            </h2>
            {!loading && !user && (
              <div className="mb-8 text-center">
                <p className="text-cyan-200">
                  You must{' '}
                  <Link href="/login" className="underline text-cyan-400">
                    log in
                  </Link>{' '}
                  to apply for jobs.
                </p>
              </div>
            )}
            <OpenPositions user={user} />
          </div>

          {/* Easy Apply Card */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-[#1e2a44] to-[#17213b] rounded-3xl shadow-2xl border-2 border-cyan-700 p-10 w-full max-w-6xl flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-cyan-400">
                📩 Quick Apply
              </h2>
              <p className="text-gray-300 mb-4">
                Interested in joining us but don’t see a matching position? Send
                your resume and introduction to our team — we always love
                meeting talented people!
              </p>
              <a
                href="mailto:careers@brightmindsoft.com?subject=Open Application"
                className="px-7 py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold rounded-full transition shadow"
              >
                Apply Now
              </a>
              <div className="mt-5 text-sm text-cyan-200">
                Or email us at{' '}
                <a href="mailto:careers@talentwithus.com" className="underline">
                  mailto:careers@talentwithus.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
