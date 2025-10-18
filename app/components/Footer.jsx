'use client';
import Link from 'next/link';

const NAV_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Industries', href: '/industries' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/support' },
      { label: 'API Reference', href: '/api' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 20h-3v-9h3v9zm-1.5-10.216c-.966 0-1.75-.784-1.75-1.75 0-.965.784-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .966-.784 1.75-1.75 1.75zm15.25 10.216h-3v-4.604c0-1.098-.02-2.513-1.529-2.513-1.53 0-1.764 1.195-1.764 2.428v4.689h-3v-9h2.884v1.232h.041c.401-.757 1.379-1.557 2.841-1.557 3.042 0 3.604 2.002 3.604 4.604v4.721z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.39 4.482c-4.086-.205-7.713-2.165-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.228-.616c-.054 1.985 1.407 3.837 3.548 4.259a4.935 4.935 0 0 1-2.224.085c.629 1.965 2.445 3.393 4.6 3.433a9.868 9.868 0 0 1-6.102 2.104c-.396 0-.788-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.5 14.009-14.009 0-.213-.005-.425-.014-.636a10.033 10.033 0 0 0 2.46-2.548z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.85 10.89.57.1.78-.25.78-.55v-2.15c-3.19.7-3.86-1.54-3.86-1.54-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1 1.62.76 1.84 1.08.12-.68.4-1.15.73-1.42-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.44-2.29 1.15-3.1-.12-.29-.5-1.48.11-3.08 0 0 .94-.3 3.09 1.18A10.67 10.67 0 0 1 12 6.82c.95.01 1.9.13 2.79.38 2.15-1.48 3.09-1.18 3.09-1.18.61 1.6.23 2.79.11 3.08.71.81 1.15 1.84 1.15 3.1 0 4.43-2.68 5.41-5.23 5.69.41.36.76 1.08.76 2.18v3.24c0 .3.21.65.79.54C20.72 21.38 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#D6F0F8] border-t border-[#C2E0E8] text-gray-700 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:justify-between gap-12 md:gap-4">
        {/* Brand & tagline */}
        <div className="flex items-center md:items-start flex-col gap-4 md:w-1/4">
          <Link
            href="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400"
          >
            Talent With Us
          </Link>
          <p className="text-gray-800 text-sm leading-relaxed max-w-xs">
            Building world-class digital solutions for ambitious teams, with a
            focus on quality, security, and scale.
          </p>
          <div className="flex gap-4 mt-2">
            {SOCIALS.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.label}
                className="hover:text-cyan-600 transition-colors"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Navigation */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {NAV_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-lg font-semibold text-black mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-cyan-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom - legal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-14 border-t border-[#172c3a] pt-6 gap-2 text-sm text-gray-600">
        <div>
          &copy; {new Date().getFullYear()} Talent With Us. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="hover:text-cyan-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-cyan-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
