'use client';
import React, { useRef, useState } from 'react';
// FIX: Replace Info with FiInfo
import { FiMail, FiSend, FiPhone, FiMapPin, FiInfo } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '', // Honeypot field
};

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

export default function ContactClient() {
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  // Basic validation
  const validate = () =>
    form.name.trim().length > 1 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
    form.subject.trim().length > 2 &&
    form.message.trim().length > 5;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSent(false);

    if (form.company.length > 0) {
      console.log('Honeypot triggered');
      setSent(true);
      return;
    }

    if (!validate()) {
      setError('Please fill in all required fields with valid information.');
      return;
    }

    setSending(true);
    try {
      // --- Replace this with your actual form submission logic ---
      // Example using fetch to an API route:
      /*
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           name: form.name,
           email: form.email,
           subject: form.subject,
           message: form.message
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      */
      // --- End of example submission logic ---

      // Simulate network delay for demo
      await new Promise((res) => setTimeout(res, 1500));

      setSent(true);
      setForm(initialForm);
      // Optional: Reset native form element if needed, though usually not required with controlled components
      // if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        'Something went wrong sending your message. Please try again later.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F1F5] via-[#f0f5f8] to-[#ddeaf0] relative overflow-x-hidden text-gray-800">
      {/* Aurora Glow */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#67e8f9] to-[#22d3ee] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <motion.header
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-5 tracking-tight"
          >
            Connect with Talent With Us
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Got a project, idea, or just want to say hello?{' '}
            <br className="hidden md:block" />
            We’d love to hear from you. Reach out and let’s create something
            remarkable together.
          </motion.p>
        </motion.header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left - Contact Info */}
          <motion.section
            className="flex flex-col gap-10 items-center lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <motion.figure
              variants={itemVariants}
              className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/assets/contact.jpg"
                alt="Abstract image representing connection or communication"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.figure>

            <motion.div
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-lg w-full"
            >
              <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
                <FiMail /> Contact Information
              </h2>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="bg-cyan-100 p-3 rounded-xl shadow-sm">
                    <FiMail className="text-cyan-600 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                      Email
                    </div>
                    <a
                      href="mailto:contact@talentwithus.com"
                      className="text-cyan-700 text-lg font-semibold hover:text-blue-600 transition"
                    >
                      contact@talentwithus.com
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl shadow-sm">
                    <FiPhone className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                      Phone
                    </div>
                    <a
                      href="tel:+919876543210" // Replace with actual number
                      className="text-blue-700 text-lg font-semibold hover:text-cyan-600 transition"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-xl shadow-sm">
                    <FiMapPin className="text-indigo-600 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                      Address
                    </div>
                    <address className="not-italic text-indigo-700 text-base font-medium">
                      Hyderabad, Telangana, India
                    </address>
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.section>

          {/* Right - Form */}
          <motion.section
            className="bg-white/70 backdrop-blur-lg border border-gray-200 p-8 md:p-10 rounded-2xl shadow-xl h-fit lg:sticky top-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl text-cyan-700 font-bold mb-6 flex items-center gap-2">
              <FiSend /> Send Us a Message
            </h2>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-10 px-6 bg-green-50 border border-green-200 rounded-lg"
                  aria-live="polite"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-green-700 font-semibold text-lg">
                    Thank you! Your message has been sent.
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-4 py-2 text-sm font-medium text-green-700 bg-green-200 hover:bg-green-300 rounded-md transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  className="space-y-5"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Honeypot field - visually hidden */}
                  <input
                    type="text"
                    name="company"
                    className="absolute w-px h-px overflow-hidden -left-[5000px]"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={handleChange}
                    aria-hidden="true" // Hide from screen readers too
                  />
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="Enter your name"
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      value={form.email}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="What's this about?"
                      onChange={handleChange}
                      value={form.subject}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                      placeholder="Tell us about your project..."
                      onChange={handleChange}
                      value={form.message}
                    />
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 font-medium text-sm p-3 rounded-md"
                        role="alert"
                        aria-live="polite"
                      >
                        {/* FIX: Use FiInfo here */}
                        <FiInfo size={16} className="flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all text-base shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: sending ? 1 : 1.03 }}
                    whileTap={{ scale: sending ? 1 : 0.97 }}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />{' '}
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FiSend className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>
        </main>

        <motion.section
          className="text-center mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={itemVariants}
        >
          <p className="text-gray-500 text-base">
            Prefer email? Reach us directly at{' '}
            <a
              href="mailto:contact@talentwithus.com"
              className="text-cyan-600 font-semibold underline hover:text-blue-700 transition"
            >
              contact@talentwithus.com
            </a>
          </p>
        </motion.section>
      </div>
    </div>
  );
}
