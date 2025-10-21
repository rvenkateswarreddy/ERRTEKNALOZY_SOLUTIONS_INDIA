'use client'; // <-- Keep this!
import { motion } from 'framer-motion';
import Image from 'next/image';
import TeamSection from '../components/TeamSection';

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function AboutClientPage() {
  return (
    <>
      {/* Metadata is handled by the parent page.jsx */}
      <section
        className="py-12 md:py-20 px-4 bg-gradient-to-br from-[#E3F1F5] via-[#DDEFF2] to-[#C8E7EE] min-h-screen text-gray-800"
        aria-labelledby="aboutus-heading"
      >
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-24">
          {/* Hero Section */}
          <motion.div
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              variants={itemVariants}
              className="flex-1 text-center md:text-left flex flex-col justify-center gap-6"
            >
              <h1
                id="aboutus-heading"
                className="text-4xl md:text-6xl font-bold text-cyan-700 drop-shadow-lg"
              >
                About <br />{' '}
                <span className="text-gray-900">Talent With Us</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto md:mx-0 font-medium">
                Empowering businesses and individuals with intelligent,
                scalable, and user-centric digital solutions – from custom web &
                mobile apps to project support, documentation, and next-gen
                digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
                <motion.a
                  href="#whatwedo"
                  className="px-6 py-2.5 bg-cyan-600 text-white rounded-full font-semibold shadow hover:bg-cyan-700 focus:outline-none focus:ring-2 ring-offset-2 ring-cyan-400 transition"
                  aria-label="What We Do"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  What We Do
                </motion.a>
                <motion.a
                  href="#team"
                  className="px-6 py-2.5 bg-transparent border-2 border-cyan-600 text-cyan-700 rounded-full font-semibold shadow transition hover:bg-cyan-600 hover:text-white focus:outline-none focus:ring-2 ring-offset-2 ring-cyan-400"
                  aria-label="Meet Our Team"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Meet Our Team
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-6 py-2.5 bg-cyan-900 text-cyan-100 rounded-full font-semibold shadow transition hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 ring-offset-2 ring-cyan-400"
                  aria-label="Contact Us"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex-1 flex items-center justify-center"
            >
              <Image
                src="/about.jpg"
                alt="Talent With Us team collaborating"
                className="rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md object-cover"
                priority
                width={500}
                height={500}
              />
            </motion.div>
          </motion.div>

          {/* Who We Are, Mission & Vision */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants} // Parent controls stagger
          >
            {/* Who We Are */}
            <motion.div
              className="bg-gradient-to-br from-[#E3EEF5] to-[#D9E9F2] rounded-2xl shadow-lg border-2 border-cyan-400 p-7 flex flex-col items-center hover:shadow-cyan-300/40 transition-shadow duration-300"
              variants={itemVariants} // Child uses item variant
              whileHover={{ y: -5 }} // Use framer-motion hover
            >
              <h2 className="text-xl font-bold mb-3 text-cyan-700 flex items-center gap-2 text-center">
                <span role="img" aria-label="rocket">
                  🚀
                </span>{' '}
                Who We Are
              </h2>
              <p className="text-gray-700 text-center text-sm md:text-base">
                Talent With Us is a passionate collective of developers,
                designers, strategists, and technologists driving digital
                transformation. We prioritize innovation, reliability, and
                client success.
              </p>
            </motion.div>
            {/* Mission */}
            <motion.div
              className="bg-gradient-to-br from-[#E3EEF5] to-[#D9E9F2] rounded-2xl shadow-lg border-2 border-cyan-300 p-7 flex flex-col items-center hover:shadow-cyan-300/40 transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/7198/7198217.png"
                alt=""
                className="w-16 h-16 object-contain mb-4"
                width={64}
                height={64}
              />
              <h2 className="text-xl font-bold mb-2 text-cyan-700 flex items-center gap-2 text-center">
                <span role="img" aria-label="compass">
                  🧭
                </span>{' '}
                Our Mission
              </h2>
              <p className="text-gray-700 text-center text-sm md:text-base">
                To deliver transformative digital solutions, foster growth, and
                create lasting value through innovation, seamless integrations,
                and dedicated support.
              </p>
            </motion.div>
            {/* Vision */}
            <motion.div
              className="bg-gradient-to-br from-[#E3EEF5] to-[#D9E9F2] rounded-2xl shadow-lg border-2 border-cyan-300 p-7 flex flex-col items-center hover:shadow-cyan-300/40 transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/128/4800/4800178.png"
                alt=""
                className="w-16 h-16 object-contain mb-4"
                width={64}
                height={64}
              />
              <h2 className="text-xl font-bold mb-2 text-cyan-700 flex items-center gap-2 text-center">
                <span role="img" aria-label="earth">
                  🌍
                </span>{' '}
                Our Vision
              </h2>
              <p className="text-gray-700 text-center text-sm md:text-base">
                To be a global leader in digital innovation, empowering clients
                to set new industry standards and inspiring progress through
                technology.
              </p>
            </motion.div>
          </motion.div>

          {/* What We Do */}
          <motion.div
            id="whatwedo"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-cyan-700 flex items-center justify-center gap-2">
              <span role="img" aria-label="tools">
                🔧
              </span>{' '}
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Websites & App Development',
                  iconSrc:
                    'https://cdn-icons-png.flaticon.com/128/10382/10382366.png',
                  description:
                    'Custom, high-performance websites and mobile apps tailored for your business goals.',
                },
                {
                  title: 'Project Support & Consultancy',
                  iconSrc:
                    'https://cdn-icons-png.flaticon.com/128/11481/11481933.png',
                  description:
                    'Expert guidance and hands-on support for your projects. We help you succeed at every step.',
                },
                {
                  title: 'PPTs, PDFs & Documentation',
                  iconSrc:
                    'https://cdn-icons-png.flaticon.com/128/15678/15678431.png',
                  description:
                    'Professional presentations, detailed PDFs, and accurate documentation for business or training.',
                },
                {
                  title: 'End-to-End Digital Solutions',
                  iconSrc:
                    'https://cdn-icons-png.flaticon.com/128/11663/11663519.png',
                  description:
                    'From ideation to deployment – including e-commerce, UI/UX, DevOps, AI, and more.',
                },
                {
                  title: 'Contests & Code Editors',
                  iconSrc:
                    'https://cdn-icons-png.flaticon.com/128/16750/16750327.png',
                  description:
                    'Live coding contests and in-browser editors to sharpen skills with interactive tools.',
                },
                {
                  title: 'AI, Data & Automation',
                  iconSrc:
                    'https://cdn-icons-png.flaticon.com/128/14381/14381721.png',
                  description:
                    'Leverage smart tools, automation, and analytics to unlock opportunities and drive efficiency.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative group bg-[#DEEAF3] rounded-2xl p-7 border border-cyan-200 shadow-md flex flex-col items-center hover:shadow-cyan-300/50 transition-shadow duration-300 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Image
                    src={item.iconSrc}
                    alt="" // Decorative
                    className="absolute opacity-5 top-0 left-0 w-full h-full object-contain transition z-0 group-hover:opacity-[0.08] group-hover:scale-110"
                    width={128}
                    height={128}
                    sizes="100px"
                  />
                  <h3 className="text-lg text-cyan-800 font-semibold mb-2 relative z-10 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 relative z-10 text-center text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Meet Our Team */}
          <motion.div
            id="team"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <TeamSection />
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            id="whychooseus"
            className="py-16 bg-gradient-to-tr from-blue-50 to-cyan-100 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-cyan-700 flex items-center justify-center gap-2">
              <span role="img" aria-label="star">
                🌟
              </span>{' '}
              Why Choose Talent With Us?
            </h2>
            <motion.div
              className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
              variants={sectionVariants} // Stagger children
            >
              {/* Card 1 */}
              <motion.div
                className="bg-[#deeaf3]/70 backdrop-blur-sm shadow-xl border-t-4 md:border-l-4 md:border-t-0 border-cyan-500 rounded-2xl p-7 hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-4"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <ul className="space-y-5 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-500 text-xl pt-0.5">🤝</span>
                    <div>
                      <b>Client-Centric Approach</b> – We listen, strategize,
                      and deliver exactly what you envision.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-500 text-xl pt-0.5">🔒</span>
                    <div>
                      <b>Enterprise-Grade Security & Quality</b> – ISO
                      practices, rigorous QA, and secure development.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-500 text-xl pt-0.5">⚡</span>
                    <div>
                      <b>Agile & Transparent Process</b> – Fast, flexible, and
                      always in touch.
                    </div>
                  </li>
                </ul>
              </motion.div>
              {/* Card 2 */}
              <motion.div
                className="bg-[#deeaf3]/70 backdrop-blur-sm shadow-xl border-t-4 md:border-l-4 md:border-t-0 border-yellow-500 rounded-2xl p-7 hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-4"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <ul className="space-y-5 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 text-xl pt-0.5">💡</span>
                    <div>
                      <b>Innovation First</b> – We're ahead of trends: AI,
                      cloud, and modern frameworks.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 text-xl pt-0.5">⏰</span>
                    <div>
                      <b>24/7 Support</b> – Prompt, reliable, and ongoing help
                      even after delivery.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 text-xl pt-0.5">🚀</span>
                    <div>
                      <b>End-to-End Ownership</b> – From discovery to launch and
                      beyond, we're with you.
                    </div>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            id="contact"
            className="py-16 bg-gradient-to-br from-[#1e2a44] to-[#17213b] rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <motion.div
              className="w-full max-w-5xl mx-auto px-6 md:px-10 py-10 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center border border-white/10"
              variants={itemVariants} // Animate the inner box
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3 text-cyan-300 drop-shadow-lg text-center">
                <span className="w-10 h-10 bg-cyan-700/30 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-lg">
                  🤝
                </span>
                Let’s Build Something Amazing Together
              </h2>
              <p className="text-gray-200 mb-8 text-center text-base md:text-lg max-w-2xl bg-white/10 px-4 py-3 rounded-xl shadow">
                Have a project, idea, or digital challenge? Let's collaborate
                and turn your vision into reality. Our experts are ready to help
                you succeed.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-8 w-full mt-2">
                {/* Email */}
                <motion.div
                  className="flex flex-col items-center gap-2 w-full bg-white/10 p-6 rounded-2xl shadow hover:bg-white/15 transition group"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-cyan-400/30 rounded-full flex items-center justify-center text-xl group-hover:bg-cyan-400/60 transition">
                      📧
                    </span>
                    <span className="text-cyan-200 font-semibold text-sm">
                      Email
                    </span>
                  </span>
                  <a
                    href="mailto:info@talentwithus.com"
                    className="text-sm text-cyan-100 underline hover:text-cyan-300 break-all"
                  >
                    info@talentwithus.com
                  </a>
                </motion.div>
                {/* Divider */}
                <div className="hidden sm:flex items-center">
                  <div className="h-16 w-px bg-cyan-700/40 rounded-full"></div>
                </div>
                {/* Call */}
                <motion.div
                  className="flex flex-col items-center gap-2 w-full bg-white/10 p-6 rounded-2xl shadow hover:bg-white/15 transition group"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-cyan-400/30 rounded-full flex items-center justify-center text-xl group-hover:bg-cyan-400/60 transition">
                      📞
                    </span>
                    <span className="text-cyan-200 font-semibold text-sm">
                      Call
                    </span>
                  </span>
                  <a
                    href="tel:+919812345678"
                    className="text-sm text-cyan-100 underline hover:text-cyan-300"
                  >
                    +91-9812345678 {/* Replace with actual number */}
                  </a>
                </motion.div>
                {/* Divider */}
                <div className="hidden sm:flex items-center">
                  <div className="h-16 w-px bg-cyan-700/40 rounded-full"></div>
                </div>
                {/* Website */}
                <motion.div
                  className="flex flex-col items-center gap-2 w-full bg-white/10 p-6 rounded-2xl shadow hover:bg-white/15 transition group"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-cyan-400/30 rounded-full flex items-center justify-center text-xl group-hover:bg-cyan-400/60 transition">
                      🌐
                    </span>
                    <span className="text-cyan-200 font-semibold text-sm">
                      Website
                    </span>
                  </span>
                  <a
                    href="https://www.talentwithus.com"
                    className="text-sm text-cyan-100 underline hover:text-cyan-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.talentwithus.com {/* Replace with actual URL */}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Talent With Us',
                url: 'https://www.talentwithus.com', // Replace with actual URL
                logo: 'https://www.talentwithus.com/logo.png', // Replace with actual URL
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    email: 'info@talentwithus.com',
                    telephone: '+91-9812345678', // Replace with actual number
                    contactType: 'customer support',
                  },
                ],
                sameAs: [
                  // Add actual social links if available
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
