"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { FiBriefcase, FiHome, FiMail, FiMenu, FiX } from "react-icons/fi";
import { FaBlogger, FaLaptopCode, FaUserCheck } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const navLinks = [
    { id: "/", label: "Home", icon: <FiHome /> },
    { id: "/blogs", label: "Blogs", icon: <FaBlogger /> },
    { id: "/about", label: "About", icon: <FaUserCheck /> },
    { id: "/career", label: "Careers", icon: <FiBriefcase  /> },
    { id: "/digitalLab", label: "Digital Lab", icon: <FaLaptopCode /> },
    { id: "/contactUs", label: "Contact", icon: <FiMail /> },
  ];

  return (
    <>
      {/* Loading Indicator */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-blue-400 z-[100]"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] shadow-md transition-all duration-300">
        <div className="max-w-8xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 md:h-20 transition-all duration-300">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white shadow-lg border-2 border-fuchsia-400 group-hover:scale-105 transition-transform">
              <Image
                src="/assets/ERRTEKNALOZY.jpg"
                alt="ERRTEKNALOZY Logo"
                width={56}
                height={56}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <span className="hidden sm:block font-extrabold text-xl md:text-2xl bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wider drop-shadow-md">
              ERRTEKNALOZY
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) =>
              link.id === "/blogs" ? (
                <Link
                  key={link.id}
                  href={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-full transition-all
                      ${
                        pathname === link.id
                          ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
                      }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.id}
                  href={link.id}
                  className={`flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-full transition-all
                    ${
                      pathname === link.id
                        ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
                    }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* User/Login */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && user ? (
              <>
                <span className="text-cyan-300 text-lg font-semibold">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm bg-gradient-to-r from-fuchsia-500 to-blue-500 px-5 py-2 rounded-full text-white font-semibold hover:from-blue-600 hover:to-fuchsia-600 shadow transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              !loading && (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-fuchsia-600 hover:to-cyan-600 transition-all"
                >
                  Login
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/90 z-40 flex flex-col"
            >
              {/* Close Button */}
              {/* <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <FiX size={32} />
              </button> */}
              <nav className="mt-24 flex flex-col items-center gap-6">
                {navLinks.map((link) =>
                  link.id === "/blogs" ? (
                    <Link
                      key={link.id}
                      href={link.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-8 py-3 text-xl font-semibold rounded-full w-64 justify-center
                          ${
                            pathname === link.id
                              ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-lg"
                              : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
                          }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.id}
                      href={link.id}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-8 py-3 text-xl font-semibold rounded-full w-64 justify-center
                        ${
                          pathname === link.id
                            ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
                        }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  )
                )}
                {!loading && user ? (
                  <div className="flex flex-col items-center mt-10 gap-4">
                    <span className="text-cyan-300 text-lg font-semibold">
                      {user.displayName?.split(" ")[0] || "User"}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="bg-gradient-to-r from-fuchsia-500 to-blue-500 px-8 py-2 rounded-full text-white font-semibold hover:from-blue-600 hover:to-fuchsia-600 shadow transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  !loading && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="mt-10 px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-full font-semibold shadow hover:from-fuchsia-600 hover:to-cyan-600 transition-all"
                    >
                      Login
                    </button>
                  )
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
