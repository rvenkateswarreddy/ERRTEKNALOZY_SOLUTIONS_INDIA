'use client';
import React from 'react';
import Head from 'next/head';
import TeamSection from '../components/TeamSection';

export default function AboutUs() {
  return (
    <>
      {/* SEO & Open Graph */}
      <Head>
        <title>
          About Us | Talent With Us - Digital Transformation Experts
        </title>
        <meta
          name="description"
          content="Talent With Us: Your technology partner for websites, apps, project support, documentation, and innovative digital solutions. Discover our mission, vision, values, and expert team."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Us | Talent With Us" />
        <meta
          property="og:description"
          content="Transform your business with Talent With Us. We deliver world-class digital products, project support, code contests, and interactive tools. Meet our team!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.talentwithus.com/about" />
        <meta
          property="og:image"
          content="https://www.talentwithus.com/og-aboutus.jpg"
        />
        <link rel="canonical" href="https://www.talentwithus.com/about" />
      </Head>
      <section
        className="py-16 px-4 bg-gradient-to-br from-[#E3F1F5] via-[#DDEFF2] to-[#C8E7EE]
 min-h-screen text-white"
        aria-labelledby="aboutus-heading"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 mb-12">
            <div className="flex-1 text-center md:text-left flex flex-col justify-center gap-8">
              <h1
                id="aboutus-heading"
                className="text-3xl md:text-6xl font-bold mb-2 text-cyan-600 drop-shadow-lg"
              >
                About <br />{' '}
                <span className="text-black/80">Talent With Us</span>
              </h1>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto md:mx-0 font-medium">
                Empowering businesses and individuals with intelligent,
                scalable, and user-centric digital solutions – from custom web &
                mobile apps to project support, documentation, and next-gen
                digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
                <a
                  href="#whatwedo"
                  className="px-6 py-2 bg-cyan-600 text-cynan rounded-full font-semibold shadow  hover:bg-cyan-800 focus:ring-2 transition ring-cyan-400"
                  aria-label="What We Do"
                >
                  What We Do
                </a>
                <a
                  href="#team"
                  className="px-6 py-2 bg-transparent border-2 border-cyan-600 text-cyan-600 rounded-full font-semibold shadow transition hover:bg-cyan-700 hover:text-white focus:ring-2 ring-cyan-600"
                  aria-label="Meet Our Team"
                >
                  Meet Our Team
                </a>
                <a
                  href="#contact"
                  className="px-6 py-2 bg-cyan-900 text-cyan-200 rounded-full font-semibold shadow transition hover:bg-cyan-700 hover:text-white focus:ring-2 ring-cyan-400"
                  aria-label="Contact Us"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img
                src="/about.jpg"
                alt="Talent With Us team collaborating"
                className="rounded-2xl shadow-2xl hover:opacity-80 w-full max-w-sm object-cover transition-all"
                loading="eager"
                width={400}
                height={400}
              />
            </div>
          </div>

          {/* Who We Are, Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Who We Are */}
            <div className="bg-[#DDE9EF] rounded-2xl shadow-lg border-2 border-cyan-400 p-7 flex flex-col items-center hover:scale-[1.02] transition">
              <h2 className="text-xl font-bold mb-3 text-cyan-600 flex items-center gap-2 text-center">
                <span role="img" aria-label="rocket">
                  🚀
                </span>
                Who We Are
              </h2>
              <p className="text-gray-700 text-center">
                Talent With Us is a passionate collective of developers,
                designers, strategists, and technologists. We drive digital
                transformation for businesses of all sizes, prioritizing
                innovation, reliability, and client success above all.
              </p>
            </div>
            {/* Mission */}
            <div className="bg-gradient-to-br from-[#E3EEF5] to-[#D9E9F2] rounded-2xl shadow-lg border-2 border-cyan-300 p-7 flex flex-col items-center hover:scale-[1.02] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/7198/7198217.png"
                alt="Talent With Us Mission"
                className="rounded-xl w-20 h-20 object-cover mb-4"
                loading="lazy"
                width={80}
                height={80}
              />
              <h2 className="text-xl font-bold mb-2 text-cyan-600 flex items-center gap-2 text-center">
                <span role="img" aria-label="compass">
                  🧭
                </span>
                Our Mission
              </h2>
              <p className="text-gray-800 text-center">
                To deliver transformative digital solutions, foster growth, and
                create lasting value through innovative products, seamless
                integrations, and dedicated project support.
              </p>
            </div>
            {/* Vision */}
            <div className="bg-gradient-to-br from-[#E3EEF5] to-[#D9E9F2] rounded-2xl shadow-lg border-2 border-cyan-300 p-7 flex flex-col items-center hover:scale-[1.02] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4800/4800178.png"
                alt="Talent With Us Vision"
                className="rounded-xl w-20 font-extrabold h-20 object-cover mb-4"
                loading="lazy"
                width={80}
                height={80}
              />
              <h2 className="text-xl font-bold mb-2 text-cyan-600 flex items-center gap-2 text-center">
                <span role="img" aria-label="earth">
                  🌍
                </span>
                Our Vision
              </h2>
              <p className="text-gray-800 text-center">
                To be a global leader in digital innovation, empowering our
                clients to set new standards in their industries and inspiring
                progress through technology.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div id="whatwedo">
            <h2 className="text-3xl font-bold text-center mb-10 text-cyan-600">
              🔧 What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Website & App Development */}
              <div className="relative group bg-[#DEEAF3] rounded-2xl p-7 border-2 border-cyan-200 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10382/10382366.png"
                  alt="Websites & Apps"
                  className="absolute opacity-10 top-0 left-0 w-full h-full object-contain transition z-0"
                  loading="lazy"
                />
                <h3 className="text-cyan-900 font-semibold mb-2 relative z-10 text-center">
                  Websites & App Development
                </h3>
                <p className="text-gray-900 relative z-10 text-center">
                  Custom, high-performance websites and mobile apps tailored for
                  your business goals.
                </p>
              </div>
              {/* Project Support & Digital Solutions */}
              <div className="relative group bg-[#DEEAF3] rounded-2xl p-7 border-2 border-cyan-200 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11481/11481933.png"
                  alt="Project Support"
                  className="absolute opacity-10 top-0 left-0 w-full h-full object-contain transition z-0"
                  loading="lazy"
                />
                <h3 className="text-cyan-900 font-semibold mb-2 relative z-10 text-center">
                  Project Support & Consultancy
                </h3>
                <p className="text-gray-900 relative z-10 text-center">
                  Expert guidance and hands-on support for your ongoing or
                  upcoming projects. We help you succeed at every step.
                </p>
              </div>
              {/* PPTs, PDFs & Documentation */}
              <div className="relative group bg-[#DEEAF3] rounded-2xl p-7 border-2 border-cyan-200 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/15678/15678431.png"
                  alt="Documentation Services"
                  className="absolute opacity-10 top-0 left-0 w-full h-full object-contain transition z-0"
                  loading="lazy"
                />
                <h3 className="text-cyan-900 font-semibold mb-2 relative z-10 text-center">
                  PPTs, PDFs & Documentation
                </h3>
                <p className="text-gray-900 relative z-10 text-center">
                  Professional presentations, detailed PDFs, and accurate
                  documentation for your business, academics, or training needs.
                </p>
              </div>
              {/* Digital Solutions */}
              <div className="relative group bg-[#DEEAF3] rounded-2xl p-7 border-2 border-cyan-200 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11663/11663519.png"
                  alt="Digital Solutions"
                  className="absolute opacity-10 top-0 left-0 w-full h-full object-contain transition z-0"
                  loading="lazy"
                />
                <h3 className="text-cyan-900 font-semibold mb-2 relative z-10 text-center">
                  End-to-End Digital Solutions
                </h3>
                <p className="text-gray-900 relative z-10 text-center">
                  From ideation to deployment – we cover all your digital needs,
                  including e-commerce, UI/UX, DevOps, AI, and more.
                </p>
              </div>
              {/* Code Contests & Interactive Editors */}
              <div className="relative group bg-[#DEEAF3] rounded-2xl p-7 border-2 border-cyan-200 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/16750/16750327.png"
                  alt="Code Contests & Editors"
                  className="absolute opacity-10 top-0 left-0 w-full h-full object-contain transition z-0"
                  loading="lazy"
                />
                <h3 className="text-cyan-900 font-semibold mb-2 relative z-10 text-center">
                  Contests & Code Editors
                </h3>
                <p className="text-gray-900 relative z-10 text-center">
                  Participate in live coding contests and sharpen your skills
                  with our in-browser code editors and interactive tools.
                </p>
              </div>
              {/* AI, Data & Automation */}
              <div className="relative group bg-[#DEEAF3] rounded-2xl p-7 border-2 border-cyan-200 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/14381/14381721.png"
                  alt="AI, Data & Automation"
                  className="absolute opacity-10 top-0 left-0 w-full h-full object-contain transition z-0"
                  loading="lazy"
                />
                <h3 className="text-cyan-900 font-semibold mb-2 relative z-10 text-center">
                  AI, Data & Automation
                </h3>
                <p className="text-gray-900 relative z-10 text-center">
                  Leverage smart tools, automation, and analytics to unlock new
                  business opportunities and drive efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Meet Our Team */}
          <div id="team">
            <TeamSection />
          </div>

          {/* Why Choose Us */}
          <div id="whychooseus">
            <h2 className="text-3xl font-bold text-center mb-10 text-cyan-600">
              🌟 Why Choose Talent With Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#18223a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col gap-4 items-center hover:scale-[1.02] transition">
                <ul className="space-y-3 text-gray-200 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✅</span>
                    <b>Client-Centric Approach</b> – We listen, strategize, and
                    deliver exactly what you envision.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✅</span>
                    <b>Enterprise-Grade Security & Quality</b> – ISO practices,
                    rigorous QA, and secure development.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✅</span>
                    <b>Agile & Transparent Process</b> – Fast, flexible, and
                    always in touch.
                  </li>
                </ul>
              </div>
              <div className="bg-[#18223a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col gap-4 items-center hover:scale-[1.02] transition">
                <ul className="space-y-3 text-gray-200 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✅</span>
                    <b>Innovation First</b> – We’re ahead of trends: AI, cloud,
                    and modern frameworks.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✅</span>
                    <b>24/7 Support</b> – Prompt, reliable, and ongoing help
                    even after delivery.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✅</span>
                    <b>End-to-End Ownership</b> – From discovery to launch and
                    beyond, we’re with you.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="flex justify-center pt-16 pb-8">
            <div className="w-full max-w-5xl bg-gradient-to-br from-[#1e2a44] to-[#17213b] rounded-3xl shadow-2xl border-2 border-cyan-700 p-10 flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-2 text-cyan-400">
                <span role="img" aria-label="handshake">
                  🤝
                </span>
                Let’s Build Something Amazing Together
              </h2>
              <p className="text-gray-300 mb-6 text-center">
                Have a project, idea, or digital challenge? Let's collaborate
                and turn your vision into reality. Our experts are ready to help
                you succeed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                <div className="flex flex-col items-center gap-1 w-full">
                  <span className="text-base text-cyan-300 font-semibold flex items-center gap-2">
                    <span role="img" aria-label="mail">
                      📧
                    </span>
                    Email
                  </span>
                  <a
                    href="mailto:info@talentwithus.com"
                    className="text-lg text-cyan-200 underline hover:text-cyan-400 break-all"
                  >
                    info@talentwithus.com
                  </a>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                  <span className="text-base text-cyan-300 font-semibold flex items-center gap-2">
                    <span role="img" aria-label="phone">
                      📞
                    </span>
                    Call
                  </span>
                  <a
                    href="tel:+919812345678"
                    className="text-lg text-cyan-200 underline hover:text-cyan-400"
                  >
                    +91-9812345678
                  </a>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                  <span className="text-base text-cyan-300 font-semibold flex items-center gap-2">
                    <span role="img" aria-label="globe">
                      🌐
                    </span>
                    Website
                  </span>
                  <a
                    href="https://www.talentwithus.com"
                    className="text-lg text-cyan-200 underline hover:text-cyan-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.talentwithus.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Schema.org JSON-LD for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Talent With Us',
                url: 'https://www.talentwithus.com',
                logo: 'https://www.talentwithus.com/logo.png',
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    email: 'info@talentwithus.com',
                    telephone: '+91-9812345678',
                    contactType: 'customer support',
                  },
                ],
                sameAs: [
                  'https://www.linkedin.com/company/talentwithus',
                  'https://twitter.com/talentwithus',
                ],
                description:
                  'Talent With Us: Websites, apps, project support, documentation, code contests, and digital innovation for your business.',
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
