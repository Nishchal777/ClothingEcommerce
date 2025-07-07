"use client";

import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const topNavRef = useRef(null);
  const navbarRef = useRef(null);
  const [topNavHeight, setTopNavHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const updateHeights = () => {
      if (topNavRef.current) setTopNavHeight(topNavRef.current.offsetHeight);
      if (navbarRef.current) setNavbarHeight(navbarRef.current.offsetHeight);
    };

    // Initial height update
    updateHeights();

    // Update on scroll and resize
    window.addEventListener("resize", updateHeights);
    window.addEventListener("scroll", updateHeights);

    // Optional: observe height changes using ResizeObserver
    const resizeObserver = new ResizeObserver(updateHeights);
    if (topNavRef.current) resizeObserver.observe(topNavRef.current);
    if (navbarRef.current) resizeObserver.observe(navbarRef.current);

    return () => {
      window.removeEventListener("resize", updateHeights);
      window.removeEventListener("scroll", updateHeights);
      resizeObserver.disconnect();
    };
  }, []);

  if (!isHydrated) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className}`}
        >
          <div ref={topNavRef}>
            <TopNav />
          </div>
          <div ref={navbarRef}>
            <Navbar topNavHeight={0} />
          </div>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} antialiased`}
      >
        <div ref={topNavRef}>
          <TopNav />
        </div>
        <div ref={navbarRef}>
          <Navbar topNavHeight={topNavHeight} />
        </div>
        <main
          style={{
            minHeight: `calc(100vh - ${topNavHeight}px)`,
          }}
        >
          {children}
          {/* <Toaster position="top-center" reverseOrder={false} /> */}
        </main>
      </body>
    </html>
  );
}
