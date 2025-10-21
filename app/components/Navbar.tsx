'use client';

import { signOut, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { auth } from '../../FirebaseConfig';
import LoginModal from './LoginModal';

// Moved outside component - this is a constant
const navLinks = [
  { id: '/', label: 'Home' },
  { id: '/blogs', label: 'Blogs' },
  { id: '/about', label: 'About Us' },
  { id: '/career', label: 'Careers' },
  { id: '/digitalLab', label: 'Digital Labs' },
  { id: '/contactUs', label: 'Contact' },
  { id: '/compilers', label: 'Compilers' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Centralized theme colors for consistency
  const theme = useMemo(
    () => ({
      primary: '#039fe3', // Main active color
      gradientFrom: '#00AEEF',
      gradientTo: '#0052CC',
      loaderGradient: 'from-[#0056D2] via-[#007BFF] to-[#00A8FF]',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      danger: 'text-red-600',
    }),
    []
  );

  // Manage auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Shadow on scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change loader animation
  useEffect(() => {
    // This creates a "fake" loader that shows for 400ms on every page change
    setIsNavigating(true);
    const id = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(id);
  }, [pathname]);

  // Sign out handler
  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      if (pathname.includes('/dashboard')) router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [pathname, router]);

  // Close menu on outside click (FIXED)
  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  // Close menu on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Memoized function for link classes (BUG FIX)
  const getLinkClass = useCallback(
    (linkId: string) => {
      // FIX: Special case for root path '/'
      const isActive =
        linkId === '/' ? pathname === '/' : pathname.startsWith(linkId);

      return {
        isActive,
        className: `relative px-3 py-2 rounded-md transition-colors text-sm font-medium ${
          isActive
            ? `text-[${theme.primary}]`
            : `${theme.textPrimary} hover:text-[${theme.primary}]`
        }`,
      };
    },
    [pathname, theme.primary, theme.textPrimary]
  );

  const handleMobileNav = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Navigation progress bar */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ width: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed top-0 left-0 h-1 ${theme.loaderGradient} z-[100]`}
            aria-label="Page loading indicator"
            role="status"
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md transition-shadow ${
          scrolled ? 'shadow-lg shadow-black/[0.03]' : 'border-transparent'
        }`}
        style={{ willChange: 'transform, opacity' }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Go to home page" className="flex-shrink-0">
            <Image
              src="/talent-with-us-logo copy.png"
              alt="Talent With Us Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav with "Magic Line" */}
          <nav
            className="hidden md:flex items-center space-x-2 lg:space-x-4"
            aria-label="Main navigation"
          >
            {navLinks.map(({ id, label }) => {
              const { isActive, className } = getLinkClass(id);
              return (
                <Link
                  key={id}
                  href={id}
                  className={className}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={0}
                >
                  {label}
                  {/* The "Magic Line" indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: theme.primary }}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 text-white rounded-md font-medium text-sm shadow-lg transition-all cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
              }}
              onClick={() => router.push('/contactUs')}
            >
              Book Consultation
            </motion.button>

            {!loading ? (
              user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/dashboard"
                    aria-label="Go to dashboard"
                    className="flex items-center space-x-2 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div
                      className="h-8 w-8 rounded-full transition-opacity hover:opacity-80 flex items-center justify-center text-white font-bold text-sm cursor-pointer select-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
                      }}
                    >
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    aria-label="Sign out"
                    className="p-2 rounded-full hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <LogOut
                      className={`h-5 w-5 ${theme.danger} transition-colors`}
                    />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 border rounded-md font-medium text-sm hover:bg-blue-500/10 transition-colors"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary,
                  }}
                >
                  Sign In
                </button>
              )
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              ref={menuToggleRef}
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden absolute inset-x-0 top-16 z-60 bg-white/95 backdrop-blur-lg shadow-xl overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 4rem)' }}
              role="dialog"
              aria-modal="true"
            >
              <nav
                className="flex flex-col space-y-1 pt-4 pb-3 px-4"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => {
                  const { isActive } = getLinkClass(link.id);
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleMobileNav(link.id)}
                      className={`w-full text-left cursor-pointer rounded-md py-3 px-4 text-base font-medium transition ${
                        isActive
                          ? 'bg-blue-500/10'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        color: isActive ? theme.primary : undefined,
                      }}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-gray-200">
                  {!loading ? (
                    user ? (
                      <>
                        <button
                          onClick={() => handleMobileNav('/dashboard')}
                          className="block w-full text-left rounded-md px-4 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          My Account
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleSignOut();
                          }}
                          className={`w-full text-left cursor-pointer rounded-md px-4 py-3 text-base font-medium ${theme.danger} hover:bg-red-500/10 transition`}
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsLoginModalOpen(true);
                        }}
                        className="w-full text-left rounded-md px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 transition"
                        aria-label="Sign in"
                      >
                        Sign In
                      </button>
                    )
                  ) : (
                    <div className="flex justify-center px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="pt-4 px-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-md py-3 px-6 text-white font-medium shadow-lg transition"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
                    }}
                    onClick={() => handleMobileNav('/contactUs')}
                  >
                    Book Consultation
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
