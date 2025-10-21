import React from 'react';
import AboutClientPage from './AboutClientPage'; // Import the component you just renamed

// --- Metadata Object (Lives in the Server Component) ---
export const metadata = {
  title: 'About Us | Talent With Us - Digital Transformation Experts',
  description:
    'Talent With Us: Your technology partner for websites, apps, project support, documentation, and innovative digital solutions. Discover our mission, vision, values, and expert team.',
  robots: 'index, follow',
  openGraph: {
    title: 'About Us | Talent With Us',
    description:
      'Transform your business with Talent With Us. We deliver world-class digital products, project support, code contests, and interactive tools. Meet our team!',
    type: 'website',
    url: 'https://www.talentwithus.com/about', // Replace with your actual URL
    images: [
      {
        url: 'https://www.talentwithus.com/og-aboutus.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'About Talent With Us',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.talentwithus.com/about', // Replace with your actual URL
  },
};

// --- This is the main Server Component for the route ---
export default function AboutPage() {
  // It renders the Client Component that contains your page content and animations
  return <AboutClientPage />;
}
