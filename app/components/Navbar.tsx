"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, ChevronDown, X, Menu, Loader2 } from "lucide-react";
 // custom context, see above
import { auth } from "../../FirebaseConfig";
import { signOut, User } from "firebase/auth";
import LoginModal from "./LoginModal";

// Utility for classNames
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const navLinks = [
  { id: "/", label: "Home" },
  {
    id: "/solutions",
    label: "Solutions",
    subLinks: [
      { id: "/solutions/enterprise", label: "Enterprise Solutions" },
      { id: "/solutions/smb", label: "SMB Solutions" },
      { id: "/solutions/startups", label: "Startup Programs" }
    ]
  },
  { id: "/blogs", label: "Blogs" },
  { id: "/about", label: "About Us" },
  { id: "/careers", label: "Careers" },
  {
    id: "/labs",
    label: "Digital Labs",
    subLinks: [
      { id: "/labs/research", label: "Research" },
      { id: "/labs/innovation", label: "Innovation" },
      { id: "/labs/prototyping", label: "Prototyping" }
    ]
  },
  { id: "/contactUs", label: "Contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);



  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Animate header shadow/blur on scroll
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setScrolled(window.scrollY > 20), 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Route change navigation loader
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Sign out logic
  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      if (pathname.includes("/dashboard")) router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, [pathname, router]);

  // Escape key for menu close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileSubMenu) setMobileSubMenu(null);
        else setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, mobileSubMenu]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setMobileSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Desktop dropdown: delay closing to avoid "jumpy" menu
  const handleDropdownEnter = (id: string) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setHoveredElement(id);
  };
  const handleDropdownLeave = () => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setSubmenuTimeout(setTimeout(() => setHoveredElement(null), 200));
  };

  const getLinkClass = (linkId: string) =>
    cn(
      "px-3 py-2 rounded-md transition-all text-sm font-medium flex items-center",
      "hover:text-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      pathname === linkId || pathname.startsWith(`${linkId}/`)
        ? "text-primary bg-accent"
        : "text-foreground/90 hover:text-primary"
    );

  const handleMobileLinkClick = (link: any) => {
    if (link.subLinks) setMobileSubMenu(link.id);
    else {
      setIsOpen(false);
      router.push(link.id);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100]"
            aria-label="Page loading indicator"
            role="status"
          />
        )}
      </AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 bg-background/80 border-b transition-shadow transition-blur",
          scrolled ? "border-border/50 shadow-lg backdrop-blur-lg" : "border-transparent"
        )}
        style={{ willChange: "transform, opacity" }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                aria-label="Go to home page"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full overflow-hidden bg-background border-2 border-primary flex items-center justify-center"
                >
                  <Image
                    src="/assets/ERRTEKNALOZY.jpg"
                    alt="ERRTEKNALOZY Logo"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    priority
                  />
                </motion.div>
              <motion.span
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
 className="hidden sm:block ml-3 font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tight"
  style={{ willChange: "opacity, transform" }}
>
  ERRTEKNALOZY
</motion.span>
              </Link>
            </div>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(link.id)}
                  onMouseLeave={handleDropdownLeave}
                  tabIndex={0}
                  aria-haspopup={!!link.subLinks}
                  aria-expanded={hoveredElement === link.id}
                >
                  <div className="flex items-center">
                    <Link
                      href={link.id}
                      className={getLinkClass(link.id)}
                      aria-current={
                        pathname === link.id || pathname.startsWith(`${link.id}/`)
                          ? "page"
                          : undefined
                      }
                      tabIndex={0}
                    >
                      {link.label}
                      {link.subLinks && (
                        <ChevronDown className="ml-1 h-4 w-4 opacity-70 transition-transform group-hover:rotate-180" />
                      )}
                    </Link>
                  </div>
                  <AnimatePresence>
                    {link.subLinks && hoveredElement === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.20, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute left-0 top-full mt-1 w-56 rounded-xl shadow-xl border border-border/70 z-50
bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
transition-all duration-200"
                        onMouseEnter={() => handleDropdownEnter(link.id)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="py-1">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.id}
                              href={subLink.id}
                              className="block px-4 py-2 text-sm text-popover-foreground/90 hover:bg-accent hover:text-primary transition-colors"
                              onClick={() => setHoveredElement(null)}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            {/* Desktop right buttons */}
            <div className="hidden md:flex items-center space-x-3">
         
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-md font-medium text-sm shadow-lg hover:shadow-primary/30 transition-all"
              >
                Book Consultation
              </motion.button>
              {!loading ? (
                user ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                      aria-label="Go to dashboard"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.displayName?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm font-medium text-foreground/90 group-hover:text-primary">
                        {user.displayName?.split(" ")[0] || "Account"}
                      </span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="p-2 rounded-full hover:bg-accent text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Sign out"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-4 py-2 border border-primary text-primary rounded-md font-medium text-sm hover:bg-accent/50 transition-colors"
                  >
                    Sign In
                  </button>
                )
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              )}
            </div>
            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center space-x-3">
         
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="p-2 rounded-full hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={isOpen ? "Close menu" : "Open menu"}
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
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-40 pt-20 pb-8 px-6 overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              <nav className="flex flex-col space-y-2">
                {mobileSubMenu ? (
                  <>
                    <button
                      onClick={() => setMobileSubMenu(null)}
                      className="flex items-center text-sm font-medium text-foreground/80 hover:text-primary mb-4"
                    >
                      <ChevronDown className="h-5 w-5 rotate-90 mr-1" />
                      Back
                    </button>
                    {navLinks
                      .find(link => link.id === mobileSubMenu)
                      ?.subLinks?.map((subLink) => (
                        <Link
                          key={subLink.id}
                          href={subLink.id}
                          onClick={() => {
                            setIsOpen(false);
                            setMobileSubMenu(null);
                          }}
                          className={cn(
                            "px-4 py-3 rounded-md text-base font-medium",
                            "hover:text-primary hover:bg-accent",
                            pathname === subLink.id
                              ? "text-primary bg-accent"
                              : "text-foreground"
                          )}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                  </>
                ) : (
                  <>
                    {navLinks.map((link) => (
                      <div key={link.id}>
                        <button
                          onClick={() => handleMobileLinkClick(link)}
                          className={cn(
                            "w-full flex justify-between items-center px-4 py-3 rounded-md text-base font-medium",
                            "hover:text-primary hover:bg-accent",
                            (pathname === link.id || pathname.startsWith(`${link.id}/`))
                              ? "text-primary bg-accent"
                              : "text-foreground"
                          )}
                        >
                          {link.label}
                          {link.subLinks && (
                            <ChevronDown className="h-5 w-5 ml-2" />
                          )}
                        </button>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-border/50">
                      {!loading ? (
                        user ? (
                          <>
                            <Link
                              href="/dashboard"
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                            >
                              My Account
                            </Link>
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                handleSignOut();
                              }}
                              className="w-full text-left px-4 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
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
                            className="w-full px-4 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                            aria-label="Sign in"
                          >
                            Sign In
                          </button>
                        )
                      ) : (
                        <div className="flex justify-center px-4 py-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </nav>
              <div className="mt-8">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-md font-medium text-base shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Book Free Consultation
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      {/* Login modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}