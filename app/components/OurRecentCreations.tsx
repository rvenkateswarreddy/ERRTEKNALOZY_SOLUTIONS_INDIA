'use client';

// Added useMemo for code cleanup
import { useState, useMemo } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
// Added motion, AnimatePresence for animations
import { motion, AnimatePresence } from 'framer-motion';
// Added Loader2 for the submit button
import { Loader2 } from 'lucide-react';

const TYPE_OPTIONS = [
  {
    value: 'website',
    label: 'Website',
    desc: 'Professional, scalable web platforms for any purpose.',
  },
  {
    value: 'app',
    label: 'App',
    desc: 'Mobile apps for iOS, Android, or both — native or cross-platform.',
  },
  {
    value: 'automation',
    label: 'Automation Tool',
    desc: 'Automate workflows, business logic, or repetitive tasks.',
  },
  {
    value: 'ai',
    label: 'AI/ML Solution',
    desc: 'Custom AI models, chatbots, analytics & intelligent systems.',
  },
  {
    value: 'product',
    label: 'Digital Product',
    desc: 'SaaS, e-commerce, dashboards, portals and more.',
  },
  { value: 'other', label: 'Other', desc: 'Tell us your unique vision!' },
];

export default function CreationRequestForm() {
  const [type, setType] = useState(TYPE_OPTIONS[0].value);
  const [form, setForm] = useState({
    name: '',
    purpose: '',
    platform: '',
    features: '',
    targetAudience: '',
    phone: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  // Added loading state for the submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleaned up repetitive label logic
  const currentTypeLabel = useMemo(
    () => TYPE_OPTIONS.find((opt) => opt.value === type)?.label || 'Project',
    [type]
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- IMPROVED UX ---
  // No longer resets the entire form, just clears errors.
  // Preserves user input like name, phone, etc.
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newType = e.target.value;
    setType(newType);

    // Only reset platform if the new type doesn't need it
    if (!['app', 'automation'].includes(newType)) {
      setForm((f) => ({ ...f, platform: '' }));
    }

    setSubmitted(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true); // Set loading state
    try {
      const dataToSave = {
        requestType: type,
        projectName: form.name,
        purpose: form.purpose,
        // Logic ensures platform is only saved if relevant
        platform: ['app', 'automation'].includes(type) ? form.platform : '',
        features: form.features,
        targetAudience: form.targetAudience,
        phoneNumber: form.phone,
        details: form.details,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'creationRequests'), dataToSave);
      setSubmitted(true);
      setForm({
        // Reset form on success
        name: '',
        purpose: '',
        platform: '',
        features: '',
        targetAudience: '',
        phone: '',
        details: '',
      });
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitted(false);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <section className="py-16 px-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d1e7f9] via-[#dbe3f0] to-[#bbc3df] text-gray-900">
      <div className="w-full max-w-4xl mx-auto bg-white/95 rounded-2xl p-12 sm:p-16 shadow-2xl border border-sky-200">
        <h2 className="text-3xl font-bold mb-4 text-center text-sky-700 tracking-wide">
          Request Your Digital Solution
        </h2>
        <p className="text-center text-slate-700 mb-12 max-w-xl mx-auto">
          Looking for a website, app, or something custom? Tell us your vision —
          our expert team will guide you from idea to launch!
        </p>

        {/* Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition shadow-md select-none text-center ${
                type === opt.value
                  ? 'bg-sky-700 text-white border-sky-800 shadow-lg'
                  : 'bg-white border-slate-300 hover:border-sky-500 text-slate-700'
              }`}
              title={opt.desc}
            >
              <input
                type="radio"
                name="type"
                value={opt.value}
                checked={type === opt.value}
                onChange={handleTypeChange}
                className="sr-only"
              />
              <span className="text-lg font-semibold">{opt.label}</span>
              {/* --- ACCESSIBILITY FIX ---
                Changed text color for better contrast on blue background */}
              <small
                className={`mt-1 text-sm ${
                  type === opt.value ? 'text-sky-100' : 'text-slate-500'
                }`}
              >
                {opt.desc}
              </small>
            </label>
          ))}
        </div>

        {submitted ? (
          // --- IMPROVED UX ---
          // Success message is no longer a dead end
          <div className="p-8 bg-green-600 rounded-lg shadow-lg text-white text-center">
            <h3 className="text-xl font-semibold mb-4">
              Thanks for submitting! Our team will contact you soon.
            </h3>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-6 py-2 bg-white/30 text-white font-semibold rounded-full hover:bg-white/50 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* --- CODE CLEANUP ---
                Using variable for dynamic label */}
              <label className="block mb-2 font-semibold text-slate-700">
                {currentTypeLabel} Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="What should we call your project?"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Purpose
              </label>
              <input
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                required
                placeholder="e.g. Sell products, automate tasks, launch SaaS"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* --- IMPROVED UI ---
              Conditional field is now animated */}
            <AnimatePresence>
              {(type === 'app' || type === 'automation') && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden" // Prevents content spill
                >
                  <label className="block mb-2 font-semibold text-slate-700">
                    Platform
                  </label>
                  <select
                    name="platform"
                    value={form.platform}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="">Select platform</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="iOS & Android">iOS & Android</option>
                    <option value="Desktop (Windows/Mac)">
                      Desktop (Windows/Mac)
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Key Features / Requirements
              </label>
              <input
                name="features"
                value={form.features}
                onChange={handleChange}
                required
                placeholder="e.g. Payments, AI, chat, admin panel"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Target Audience
              </label>
              <input
                name="targetAudience"
                value={form.targetAudience}
                onChange={handleChange}
                required
                placeholder="e.g. Students, enterprises, public"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                type="tel"
                pattern="[0-9]{10,15}"
                title="Please enter 10 to 15 digits." // Added title for validation
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                More Details (optional)
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your requirements, timelines, inspirations, or questions…"
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* --- IMPROVED FEEDBACK ---
              Button shows loading state and is disabled */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-700 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400 disabled:bg-sky-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                `Request ${currentTypeLabel}` // Using variable
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
