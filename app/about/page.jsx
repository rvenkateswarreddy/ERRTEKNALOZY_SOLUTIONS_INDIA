"use client";
import React from "react";
import TeamSection from "../components/TeamSection";

export default function AboutUs() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#061a2e] via-[#0f1624] to-[#202a44] min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 mb-8">
          <div className="flex-1 text-center md:text-left flex flex-col justify-center gap-6">
            <h1 className="text-5xl font-extrabold mb-2 text-cyan-400 drop-shadow-lg">
              About Us
            </h1>
            <p className="text-lg text-gray-200">
              Empowering businesses and individuals through intelligent, scalable, and user-centric digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
              <a
                href="#whatwedo"
                className="px-6 py-2 bg-cyan-600 text-white rounded-full font-semibold shadow transition hover:bg-cyan-800"
              >
                What We Do
              </a>
              <a
                href="#team"
                className="px-6 py-2 bg-transparent border-2 border-cyan-400 text-cyan-200 rounded-full font-semibold shadow transition hover:bg-cyan-700 hover:text-white"
              >
                Meet Our Team
              </a>
              <a
                href="#contact"
                className="px-6 py-2 bg-cyan-900 text-cyan-200 rounded-full font-semibold shadow transition hover:bg-cyan-700 hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=650&q=80"
              alt="Team working together"
              className="rounded-2xl shadow-2xl border-4 border-cyan-600 w-full max-w-sm object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>

        {/* Who We Are, Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-7">
          {/* Who We Are Card */}
          <div className="bg-[#18223a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col items-center hover:scale-[1.02] transition">
            <h2 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2 text-center">
              <span role="img" aria-label="rocket">🚀</span>
              Who We Are
            </h2>
            <p className="text-gray-200 text-center">
              We are a passionate team of developers, designers, and innovators dedicated to building intelligent, scalable, and user-centric digital solutions. Our mission is to empower businesses and individuals through cutting-edge technologies and seamless user experiences.
            </p>
          </div>
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-[#163c5a] to-[#22486a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col items-center hover:scale-[1.02] transition">
            <img
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
              alt="Mission"
              className="rounded-xl w-20 h-20 object-cover mb-4 border-2 border-cyan-400"
            />
            <h2 className="text-xl font-bold mb-2 text-cyan-400 flex items-center gap-2 text-center">
              <span role="img" aria-label="compass">🧭</span>
              Our Mission
            </h2>
            <p className="text-gray-200 text-center">
              To deliver innovative software solutions that solve real-world problems, drive growth, and create lasting value for our clients and communities.
            </p>
          </div>
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-[#163c5a] to-[#22486a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col items-center hover:scale-[1.02] transition">
            <img
              src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
              alt="Vision"
              className="rounded-xl w-20 h-20 object-cover mb-4 border-2 border-cyan-400"
            />
            <h2 className="text-xl font-bold mb-2 text-cyan-400 flex items-center gap-2 text-center">
              <span role="img" aria-label="earth">🌍</span>
              Our Vision
            </h2>
            <p className="text-gray-200 text-center">
              To be a global leader in digital transformation, inspiring change through technology and setting benchmarks in software excellence.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div id="whatwedo">
          <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400">🔧 What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-900 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
                alt="Custom Software"
                className="absolute opacity-20 top-0 left-0 w-full h-full object-cover transition group-hover:opacity-30 z-0"
              />
              <h3 className="text-cyan-300 font-semibold mb-2 relative z-10 text-center">Custom Software Development</h3>
              <p className="text-gray-300 relative z-10 text-center">Tailor-made applications that align with your unique business needs.</p>
            </div>
            <div className="relative group bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-900 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
                alt="Web & Mobile App"
                className="absolute opacity-20 top-0 left-0 w-full h-full object-cover transition group-hover:opacity-30 z-0"
              />
              <h3 className="text-cyan-300 font-semibold mb-2 relative z-10 text-center">Web & Mobile App Development</h3>
              <p className="text-gray-300 relative z-10 text-center">Responsive, fast, and secure apps that keep users engaged.</p>
            </div>
            <div className="relative group bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-900 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                alt="UI/UX Design"
                className="absolute opacity-20 top-0 left-0 w-full h-full object-cover transition group-hover:opacity-30 z-0"
              />
              <h3 className="text-cyan-300 font-semibold mb-2 relative z-10 text-center">UI/UX Design</h3>
              <p className="text-gray-300 relative z-10 text-center">Intuitive and impactful designs that drive conversions and enhance usability.</p>
            </div>
            <div className="relative group bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-900 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508385082359-f48b1c1c1751?auto=format&fit=crop&w=400&q=80"
                alt="Cloud Integration & DevOps"
                className="absolute opacity-20 top-0 left-0 w-full h-full object-cover transition group-hover:opacity-30 z-0"
              />
              <h3 className="text-cyan-300 font-semibold mb-2 relative z-10 text-center">Cloud Integration & DevOps</h3>
              <p className="text-gray-300 relative z-10 text-center">Scalable infrastructure and CI/CD practices for reliable delivery.</p>
            </div>
            <div className="relative group bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-900 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
                alt="E-commerce Solutions"
                className="absolute opacity-20 top-0 left-0 w-full h-full object-cover transition group-hover:opacity-30 z-0"
              />
              <h3 className="text-cyan-300 font-semibold mb-2 relative z-10 text-center">E-commerce Solutions</h3>
              <p className="text-gray-300 relative z-10 text-center">End-to-end eCommerce platforms that are secure, flexible, and optimized for performance.</p>
            </div>
            <div className="relative group bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-900 shadow flex flex-col items-center hover:shadow-cyan-700 hover:scale-[1.03] transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1465101178521-c1a9136a37b7?auto=format&fit=crop&w=400&q=80"
                alt="AI & Data Analytics"
                className="absolute opacity-20 top-0 left-0 w-full h-full object-cover transition group-hover:opacity-30 z-0"
              />
              <h3 className="text-cyan-300 font-semibold mb-2 relative z-10 text-center">AI & Data Analytics</h3>
              <p className="text-gray-300 relative z-10 text-center">Smart tools powered by AI/ML for better decision-making and predictive analytics.</p>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div id="team">
          <TeamSection />
        </div>

        {/* Why Choose Us */}
        <div id="whychooseus">
          <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400">🌟 Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#18223a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col gap-4 items-center hover:scale-[1.02] transition">
              <ul className="space-y-3 text-gray-200 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✅</span>
                  Client-Centric Approach – We listen, plan, and deliver exactly what you need.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✅</span>
                  Agile Development – Fast, flexible, and transparent process.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✅</span>
                  Top-Notch Support – We’re with you every step of the way.
                </li>
              </ul>
            </div>
            <div className="bg-[#18223a] rounded-2xl shadow-lg border-2 border-cyan-700 p-7 flex flex-col gap-4 items-center hover:scale-[1.02] transition">
              <ul className="space-y-3 text-gray-200 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✅</span>
                  Innovation First – We stay ahead of trends and bring new ideas to the table.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✅</span>
                  End-to-End Delivery – From ideation to deployment and beyond.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="flex justify-center pt-16 pb-8">
          <div className="w-full max-w-5xl bg-gradient-to-br from-[#1e2a44] to-[#17213b] rounded-3xl shadow-2xl border-2 border-cyan-700 p-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-3 flex items-center gap-2 text-cyan-400">
              <span role="img" aria-label="handshake">🤝</span>
              Let’s Build Something Amazing Together
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              Have a project in mind or want to collaborate? Reach out to us and let’s turn your vision into reality.<br />
              We’re always eager to discuss new ideas and help you achieve digital success!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
              <div className="flex flex-col items-center gap-1 w-full">
                <span className="text-base text-cyan-300 font-semibold flex items-center gap-2">
                  <span role="img" aria-label="mail">📧</span>
                  Email
                </span>
                <a href="mailto:hello@brightmindsoft.com" className="text-lg text-cyan-200 underline hover:text-cyan-400 break-all">
                  hello@brightmindsoft.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 w-full">
                <span className="text-base text-cyan-300 font-semibold flex items-center gap-2">
                  <span role="img" aria-label="phone">📞</span>
                  Call
                </span>
                <a href="tel:+919876543210" className="text-lg text-cyan-200 underline hover:text-cyan-400">
                  +91-9876543210
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 w-full">
                <span className="text-base text-cyan-300 font-semibold flex items-center gap-2">
                  <span role="img" aria-label="globe">🌐</span>
                  Website
                </span>
                <a
                  href="https://www.brightmindsoft.com"
                  className="text-lg text-cyan-200 underline hover:text-cyan-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.brightmindsoft.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}