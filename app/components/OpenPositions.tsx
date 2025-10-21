'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage } from '../../FirebaseConfig'; // Adjust path if needed
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { motion, AnimatePresence } from 'framer-motion'; // <-- 3, 4, 5. Import motion
import { Loader2, X, UploadCloud, CheckCircle } from 'lucide-react'; // <-- 5. Import icons
import PropTypes from 'prop-types'; // <-- 7. Import PropTypes

// --- Reusable Modal Component (Same pattern as before) ---
const Modal = ({ isOpen, onClose, children }) => {
  // <-- 7. Removed TS types
  useEffect(() => {
    const handleEsc = (e) => {
      // <-- 7. Removed TS types
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto" // Added overflow-y-auto
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-[#14223c]/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-cyan-700/50 max-w-lg w-full relative p-6 md:p-8 text-gray-300" // Adjusted border/padding
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-cyan-400 hover:text-cyan-600 transition p-1 rounded-full hover:bg-white/10" // Adjusted close button style
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 7. Added PropTypes ---
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// --- Animation Variants ---
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function OpenPositions() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]); // <-- 7. Removed TS types
  const [isLoadingJobs, setIsLoadingJobs] = useState(true); // <-- 1. Loading state for jobs
  const [selectedJob, setSelectedJob] = useState(null); // <-- 7. Removed TS types
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    coverLetter: '',
    resume: null, // <-- 7. Removed TS types
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoadingJobs(true); // Start loading
      try {
        const snap = await getDocs(collection(db, 'jobs'));
        setJobs(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error('Error fetching jobs:', err);
        // Optionally set an error state here to show in the UI
      } finally {
        setIsLoadingJobs(false); // Stop loading
      }
    };
    fetchJobs();
  }, []);

  // Open modal for job details
  const handleJobClick = (job) => {
    // <-- 7. Removed TS types
    setSelectedJob(job);
    setShowForm(false);
    setSuccess('');
    setError('');
  };

  // Open application form
  const handleApplyClick = () => {
    setShowForm(true);
    setSuccess('');
    setError('');
  };

  // Close modal
  const handleClose = () => {
    setSelectedJob(null);
    setShowForm(false);
    setForm({ coverLetter: '', resume: null });
    setSuccess('');
    setError('');
  };

  // Form input handlers
  const handleInputChange = (e) => {
    // <-- 7. Removed TS types
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    // <-- 7. Removed TS types
    setForm({ ...form, resume: e.target.files?.[0] ?? null });
  };

  // Handle application submit
  const handleSubmit = async (e) => {
    // <-- 7. Removed TS types
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');

    if (!user) {
      setError('You must be logged in to apply.');
      setSubmitting(false);
      return;
    }
    if (!form.resume) {
      setError('Please upload your resume.');
      setSubmitting(false);
      return;
    }
    if (!selectedJob) {
      // Should not happen, but good practice
      setError('No job selected.');
      setSubmitting(false);
      return;
    }

    try {
      // Upload resume
      const fileRef = storageRef(
        storage,
        `appliedApplications/resumes/${selectedJob.id}_${
          user.uid
        }_${Date.now()}_${form.resume.name}`
      );
      await uploadBytes(fileRef, form.resume);
      const resumeUrl = await getDownloadURL(fileRef);

      // Store application in Firestore
      await addDoc(collection(db, 'appliedApplications'), {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        userId: user.uid,
        userName: user.displayName || 'N/A',
        userEmail: user.email || 'N/A',
        coverLetter: form.coverLetter,
        resumeUrl,
        resumeName: form.resume.name,
        appliedAt: serverTimestamp(),
        status: 'Received', // Add initial status
      });

      setSuccess(
        'Your application has been submitted successfully! We will review it shortly.'
      );
      setForm({ coverLetter: '', resume: null });
      setShowForm(false);
      // Keep selectedJob open briefly to show success message, then close after delay
      setTimeout(() => {
        setSelectedJob(null); // Close modal after showing success
        setSuccess(''); // Clear success message for next time
      }, 4000); // Close after 4 seconds
    } catch (err) {
      console.error('Application submission error:', err);
      setError(
        'Failed to submit application. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* --- 1. Loading State for Jobs --- */}
      {isLoadingJobs && (
        <div className="flex justify-center items-center gap-3 text-cyan-700 font-medium p-4 rounded-lg bg-cyan-100/50 border border-cyan-200 my-8">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading open positions...</span>
        </div>
      )}

      {/* --- 2. Empty State --- */}
      {!isLoadingJobs && jobs.length === 0 && (
        <div className="text-center text-gray-500 py-10 px-6 bg-white/30 rounded-lg border border-gray-300">
          <span
            className="text-4xl block mb-3"
            role="img"
            aria-label="Magnifying glass"
          >
            🔍
          </span>
          <p className="font-semibold text-lg text-gray-700">
            No open positions at the moment.
          </p>
          <p>Check back soon or send us an open application!</p>
        </div>
      )}

      {/* --- Job Cards Grid --- */}
      {!isLoadingJobs && jobs.length > 0 && (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" // Adjusted grid columns
          variants={gridVariants}
          initial="hidden"
          animate="visible" // Animate on load if already in view
        >
          {jobs.map((job) => (
            // --- 6. Changed to motion.button ---
            <motion.button
              key={job.id}
              className="relative group bg-gradient-to-br cursor-pointer from-[#162544] via-[#1e2a44] to-[#14223c] rounded-3xl p-8 shadow-xl border border-cyan-700/50 transition-shadow duration-300 hover:shadow-cyan-400/30 min-h-[240px] flex flex-col gap-3 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#14223c]" // Added focus styles, text-left
              onClick={() => handleJobClick(job)}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }} // Use framer motion hover
              whileTap={{ scale: 0.98 }}
              aria-label={`View details for ${job.title}`}
            >
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"></div>

              <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-1 flex items-center gap-2 drop-shadow">
                <span className="w-7 h-7 flex items-center justify-center bg-cyan-900/50 rounded-full text-base shadow">
                  <span role="img" aria-label="briefcase">
                    💼
                  </span>
                </span>
                {job.title}
              </h3>

              <span className="self-start bg-cyan-800 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow mb-2">
                {job.type}
              </span>

              <p className="mb-3 text-gray-300 text-sm leading-relaxed line-clamp-3">
                {' '}
                {/* Adjusted text size */}
                {job.shortDesc}
              </p>

              {/* Prevent button inside button issue - rely on card click */}
              <div
                className="mt-auto self-start text-cyan-300 font-semibold group-hover:text-cyan-100 transition text-sm flex items-center gap-1"
                aria-hidden="true" // Hide decorative element from screen readers
              >
                View More & Apply{' '}
                <span className="group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* --- 3. Replaced with reusable Modal component --- */}
      <Modal isOpen={selectedJob !== null} onClose={handleClose}>
        {/* Show Success Message FIRST if applicable */}
        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
            <div className="text-xl font-bold mb-3 text-green-400">
              Application Submitted!
            </div>
            <div className="text-gray-300 mb-6">{success}</div>
            <button
              onClick={handleClose}
              className="mt-2 px-8 py-2.5 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-semibold transition shadow focus:outline-none focus:ring-4 focus:ring-cyan-400"
            >
              Close
            </button>
          </motion.div>
        )}

        {/* Show Job Details or Application Form if NO success message */}
        {!success && selectedJob && (
          <AnimatePresence mode="wait">
            {/* Application Form View */}
            {showForm ? (
              <motion.form
                key="apply-form"
                onSubmit={handleSubmit}
                className="space-y-4" // Reduced spacing
                encType="multipart/form-data"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="text-xl font-bold mb-3 text-cyan-400">
                  Apply for {selectedJob.title}
                </h3>
                {/* User Info (Readonly) */}
                {[
                  { label: 'Name', value: user?.displayName || 'N/A' },
                  { label: 'Email', value: user?.email || 'N/A' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block mb-1 text-sm font-medium text-gray-400">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      disabled
                      className="w-full px-4 py-2 rounded-md bg-[#101828]/50 border border-cyan-700/50 text-gray-400 text-sm cursor-not-allowed"
                    />
                  </div>
                ))}
                {/* Cover Letter */}
                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block mb-1 text-sm font-medium"
                  >
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleInputChange}
                    rows={3} // Reduced rows
                    className="w-full px-4 py-2 rounded-md bg-[#101828] border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm resize-none"
                    placeholder="Why are you a great fit for this role?"
                    disabled={submitting}
                  />
                </div>
                {/* Resume Upload */}
                <div>
                  <label
                    htmlFor="resumeFile"
                    className="block mb-1 text-sm font-medium"
                  >
                    Resume (PDF, DOC, DOCX) *
                  </label>
                  {/* --- 8. Improved File Input Styling --- */}
                  <label
                    htmlFor="resumeFile"
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-cyan-700 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer hover:bg-[#101828]/50 transition ${
                      form.resume ? 'border-green-500' : 'bg-[#101828]'
                    }`}
                  >
                    <UploadCloud
                      size={18}
                      className={form.resume ? 'text-green-400' : ''}
                    />
                    <span
                      className={`text-sm ${
                        form.resume ? 'text-green-300 font-medium' : ''
                      }`}
                    >
                      {form.resume
                        ? form.resume.name
                        : 'Choose your resume file'}
                    </span>
                  </label>
                  <input
                    type="file"
                    id="resumeFile" // Match label htmlFor
                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" // More specific MIME types
                    onChange={handleFileChange}
                    required
                    className="sr-only" // Hide the default ugly input
                    disabled={submitting}
                  />
                </div>
                {/* Error Message */}
                {error && (
                  <div className="text-red-400 text-sm text-center py-1 bg-red-900/40 rounded">
                    {error}
                  </div>
                )}
                {/* Submit Button */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button" // Important: Not submit
                    onClick={() => setShowForm(false)} // Go back to details
                    disabled={submitting}
                    className="px-5 py-2 rounded-lg text-cyan-300 font-medium hover:bg-white/10 transition text-sm disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 h-10 flex items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition focus:outline-none focus:ring-4 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Job Details View */
              <motion.div
                key="job-details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-cyan-400 drop-shadow-lg">
                  {selectedJob.title}
                </h3>
                <span className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold mb-5 inline-block shadow-inner">
                  {selectedJob.type}
                </span>
                <p className="mb-4 leading-relaxed text-sm">
                  {selectedJob.description}
                </p>
                <h4 className="font-semibold text-cyan-300 mb-2 mt-4 border-b border-cyan-700/50 pb-1 text-base">
                  Requirements:
                </h4>
                <ul className="pl-5 list-disc text-gray-300 text-xs space-y-1 mb-6">
                  {selectedJob.requirements?.map(
                    (
                      req,
                      i // Added optional chaining and index key
                    ) => <li key={i}>{req}</li>
                  ) || <li>Details not specified.</li>}
                </ul>
                {user ? (
                  <button
                    className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    onClick={handleApplyClick}
                    aria-label={`Apply for ${selectedJob.title}`}
                  >
                    Apply Now
                  </button>
                ) : (
                  <div className="text-center text-sm text-cyan-300 font-semibold p-3 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                    Please log in to apply for this position.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Modal>
    </div>
  );
}

// Remember to add 'randomuser.me' to next.config.js image domains if TeamSection uses it.
// Also add any domains used for job application resume storage if applicable.
