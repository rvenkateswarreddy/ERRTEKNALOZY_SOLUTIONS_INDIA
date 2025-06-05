"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Hide navbar for /blogs and all /blogs/* routes
  const hideNavbar = hydrated && pathname.startsWith("/blogs");
  const mainClassName = `${!hideNavbar ? "pt-16 md:pt-20" : ""} min-h-screen`;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={mainClassName}>{children}</main>
      <Footer />
    </>
  );
}
