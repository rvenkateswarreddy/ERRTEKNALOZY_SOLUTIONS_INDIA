'use client';
import React, { useRef, useState, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { FiMail, FiSend, FiPhone, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';
import Head from 'next/head';

// Lazily load horizontal ad (example of code splitting for performance)

// SEO metadata for production-level discoverability
const SEO = () => (
  <Head>
    <title>Contact Talent With Us | Project Inquiry & Support</title>
    <meta
      name="description"
      content="Get in touch with Talent With Us for project inquiries, ideas, or support. Let's create something remarkable together. Contact us via email, phone, or our secure form."
    />
    <meta
      property="og:title"
      content="Connect with Talent With Us | Contact, Project, Support"
    />
    <meta
      property="og:description"
      content="Got a project, idea, or just want to say hello? We’d love to hear from you. Reach out and let’s create something remarkable together."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://talentwithus.com/contact" />
    <meta
      property="og:image"
      content="https://talentwithus.com/assets/contact.jpg"
    />
    <meta
      name="robots"
      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
    <link rel="canonical" href="https://talentwithus.com/contact" />
  </Head>
);

// Helper for accessibility & spam protection (honeypot)
const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
};

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Basic field validation
  const validate = () =>
    form.name.trim() &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
    form.subject.trim() &&
    form.message.trim();

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (static, can be wired to backend/sendgrid/whatever)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) {
      setError('Please fill in all fields with valid information.');
      return;
    }
    if (form.company.length > 0) {
      // Honeypot filled, treat as spam
      setError('Submission failed. Please try again.');
      return;
    }
    setSending(true);
    try {
      // Simulate sending or call your backend API here
      await new Promise((res) => setTimeout(res, 1350));
      setSent(true);
      setForm(initialForm);
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] relative overflow-x-hidden">
        {/* Decorative Glow */}
        <div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/15 blur-3xl rounded-full z-0 pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          {/* Heading Section */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-5 tracking-tight flex items-center justify-center gap-3">
              <span>Connect with Talent With Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Got a project, idea, or just want to say hello?{' '}
              <br className="hidden md:block" />
              We’d love to hear from you. Reach out and let’s create something
              remarkable together.
            </p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
            {/* Left Column - Image & Contact Info */}
            <section
              className="flex flex-col gap-10 items-center lg:items-start"
              aria-label="Contact Details"
            >
              <figure className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
                <Image
                  src="/assets/contact.jpg"
                  alt="Contact Us"
                  fill
                  className="object-cover scale-105"
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  quality={85}
                  loading="eager"
                />
                <figcaption className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-800/30 to-[#1a1a1a]/70" />
              </figure>
              {/* Contact Information Card */}
              <div
                className="bg-[#13151b] p-8 rounded-3xl shadow-lg w-full"
                aria-label="Contact Information"
              >
                <h2 className="text-2xl font-bold text-fuchsia-400 mb-6 flex items-center gap-2">
                  <FiMail className="text-cyan-400" aria-hidden="true" />{' '}
                  Contact Information
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4">
                    <div className="bg-cyan-500/10 p-3 rounded-xl">
                      <FiMail
                        className="text-cyan-400 text-2xl"
                        aria-label="Email"
                      />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                        Email
                      </div>
                      <a
                        href="mailto: contact@talentwithus.com"
                        className="text-cyan-200 text-lg font-semibold hover:underline hover:text-fuchsia-400 transition"
                        aria-label="Email address"
                      >
                        contact@talentwithus.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-fuchsia-500/10 p-3 rounded-xl">
                      <FiPhone
                        className="text-fuchsia-400 text-2xl"
                        aria-label="Phone"
                      />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                        Phone
                      </div>
                      <a
                        href="tel:+919876543210"
                        className="text-fuchsia-200 text-lg font-semibold hover:underline hover:text-cyan-400 transition"
                        aria-label="Phone number"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl">
                      <FiMapPin
                        className="text-blue-400 text-2xl"
                        aria-label="Location"
                      />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                        Address
                      </div>
                      <address className="not-italic text-blue-100 text-lg font-semibold">
                        Tirupati, Andhra Pradesh, India
                      </address>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Right Column - Contact Form */}
            <section
              className="bg-[#13151b] p-10 rounded-3xl shadow-xl h-fit sticky top-8"
              aria-label="Contact Form"
            >
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <FiSend className="text-fuchsia-400" aria-hidden="true" />
                Send Us a Message
              </h2>
              {sent ? (
                <div className="text-green-400 font-semibold text-lg py-6 text-center">
                  Thank you for reaching out! We’ll get back to you soon.
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="space-y-6"
                  autoComplete="on"
                  spellCheck="true"
                  aria-label="Contact Form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Honeypot anti-spam field (hidden from humans) */}
                  <input
                    type="text"
                    name="company"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={handleChange}
                  />
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Full Name{' '}
                      <span aria-hidden="true" className="text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={64}
                      disabled={sending}
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Email Address{' '}
                      <span aria-hidden="true" className="text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      maxLength={128}
                      disabled={sending}
                      onChange={handleChange}
                      value={form.email}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Subject{' '}
                      <span aria-hidden="true" className="text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                      placeholder="What's this about?"
                      required
                      minLength={3}
                      maxLength={92}
                      disabled={sending}
                      onChange={handleChange}
                      value={form.subject}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Your Message{' '}
                      <span aria-hidden="true" className="text-red-400">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-[#181c2b] border-none rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all font-medium"
                      placeholder="Tell us about your project..."
                      required
                      minLength={10}
                      maxLength={2000}
                      disabled={sending}
                      onChange={handleChange}
                      value={form.message}
                    ></textarea>
                  </div>
                  {error && (
                    <div className="text-red-500 font-medium text-sm py-2">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-fuchsia-500 cursor-pointer transition-all duration-300 group mt-2 text-lg shadow-xl ${
                      sending ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={sending}
                    aria-busy={sending}
                    aria-label="Send Message"
                  >
                    {sending ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="ml-3 transition-transform duration-300 group-hover:translate-x-1 text-xl" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </section>
          </main>

          {/* Lazy load ad for performance */}

          {/* Optional Map or Social Links Section */}
          <section className="text-center mt-20">
            <p className="text-gray-400 text-lg">
              Prefer email? Reach us directly at{' '}
              <a
                href="mailto:contact@talentwithus.com"
                className="text-cyan-300 font-semibold underline hover:text-fuchsia-400 transition"
                aria-label="Direct email"
              >
                contact@talentwithus.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
