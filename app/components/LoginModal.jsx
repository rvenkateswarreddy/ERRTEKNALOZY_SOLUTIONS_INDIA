'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile, // Import updateProfile
} from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import Image from 'next/image'; // 1. Import next/image
import { Loader2, X } from 'lucide-react'; // For icons

// --- 2. Helper for User-Friendly Error Messages ---
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// --- 3. Reusable AuthForm Component ---
// This reduces code duplication for the login and register forms.
const AuthForm = ({ isRegistering, onSubmit, isLoading, error }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      {isRegistering && (
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Your full name"
            className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md bg-[#212542] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      {/* Error message now inside the form */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-400 text-center mb-4 px-3 py-1.5 rounded bg-red-900/60 text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold py-2 rounded-md hover:from-cyan-600 hover:to-fuchsia-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isRegistering ? (
          'Register'
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default function LoginModal({ isOpen, onClose }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // --- 4. Handle Escape key and body scroll lock ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = isRegistering ? e.target.fullName.value : null;

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Set the user's display name after registration
        if (userCredential.user && fullName) {
          await updateProfile(userCredential.user, { displayName: fullName });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // --- 5. Click backdrop to close ---
      >
        <motion.div
          className="bg-gradient-to-br from-[#12172A] via-[#192146] to-[#1A233A] text-white rounded-2xl shadow-2xl p-0 max-w-3xl w-full flex flex-col md:flex-row relative overflow-hidden border border-cyan-900"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Left Section: Blog Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 md:px-8 md:py-12 bg-gradient-to-tl from-fuchsia-800/60 to-cyan-900/40 border-b md:border-b-0 md:border-r border-gray-700">
            <div className="mb-4 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg border-4 border-cyan-400 bg-white flex items-center justify-center">
              {/* --- 6. Replaced <img> with next/image --- */}
              <Image
                src="/talent-with-us-logo copy.png"
                alt="Talent with Us Blog Logo"
                width={100}
                height={100}
                className="object-contain"
                draggable={false}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-cyan-300 tracking-wide drop-shadow-lg text-center">
              Talent With Us Blog
            </h1>
            <p className="text-center text-gray-300 mb-4 text-sm md:text-base">
              Unlock insights, tips, and the latest trends from the world of
              technology, development, and creative digital solutions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-cyan-700/80 text-cyan-100 tracking-wide">
                #Tech
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-fuchsia-700/80 text-fuchsia-100 tracking-wide">
                #Inspiration
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white tracking-wide">
                #Digital
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              By continuing, you agree to our{' '}
              <a href="#" className="text-cyan-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-cyan-400 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full bg-white text-cyan-800 font-semibold py-2 rounded-lg shadow hover:bg-cyan-100 transition-all mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Continue with Google
            </button>
          </div>

          {/* Right Section: Auth Form */}
          <div className="w-full md:w-1/2 px-6 py-8 md:p-8 flex flex-col justify-center">
            {/* --- 7. Animated switch between Login and Register --- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isRegistering ? 'register' : 'login'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h2 className="text-lg md:text-xl font-bold mb-4 text-white text-center">
                  {isRegistering ? 'Create your account' : 'Welcome back!'}
                </h2>
                <AuthForm
                  isRegistering={isRegistering}
                  onSubmit={handleAuthAction}
                  isLoading={isLoading}
                  error={error}
                />
                <p className="text-sm text-gray-400 mt-6 text-center">
                  {isRegistering
                    ? 'Already have an account? '
                    : 'Don’t have an account? '}
                  <button
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setError(''); // Clear error on switch
                    }}
                    className="text-cyan-400 hover:underline cursor-pointer font-semibold"
                  >
                    {isRegistering ? 'Login' : 'Register'}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
