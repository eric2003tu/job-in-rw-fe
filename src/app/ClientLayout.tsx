"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MainNav = dynamic(() => import("../components/MainNav"), { ssr: false });
const ToastProvider = dynamic(() => import("../components/ToastProvider"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    let theme = window.localStorage.getItem("theme");
    if (!theme) {
      window.localStorage.setItem("theme", "light");
      theme = "light";
    }
    const darkPref = theme === "dark";
    setIsDark(darkPref);
    document.documentElement.classList.toggle("dark", darkPref);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev: boolean) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <MainNav onToggleTheme={toggleTheme} isDark={isDark} />
      <ToastProvider />
      <main className="w-full mx-auto px-2 sm:px-6 md:px-8 py-4">
        {children}
      </main>
      <Footer />
    </body>
  );
}
