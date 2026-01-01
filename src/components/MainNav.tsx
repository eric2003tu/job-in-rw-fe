import React from "react";
import Link from "next/link";

import { Home as LucideHome } from "lucide-react";
import { FaBriefcase, FaPlus, FaSignInAlt, FaTachometerAlt, FaUser } from "react-icons/fa";

export default function MainNav({ onToggleTheme, isDark }: { onToggleTheme?: () => void; isDark?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("access-token"));
    }
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-background border-b border-border top-0 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <LucideHome size={22} />
          JobInRW
        </Link>
      </div>
      <button
        aria-label="Toggle dark mode"
        onClick={onToggleTheme}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20,
          marginLeft: 16,
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </button>
      <div className="flex items-center gap-6">
        <Link href="/jobs" className="flex items-center gap-1 hover:text-primary transition-colors">
          <FaBriefcase /> Jobs
        </Link>
        <Link href="/dashboard/my-jobs" className="flex items-center gap-1 hover:text-primary transition-colors">
          <FaTachometerAlt /> My jobs
        </Link>
        <Link href="/dashboard/applications" className="flex items-center gap-1 hover:text-primary transition-colors">
          <FaTachometerAlt /> My Applications
        </Link>
        <Link href="/dashboard/post-job" className="flex items-center gap-1 hover:text-primary transition-colors">
          <FaPlus /> Post a Job
        </Link>
        {!isLoggedIn && (
          <Link href="/signup" className="flex items-center gap-1 hover:text-primary transition-colors">
            <FaSignInAlt /> Get Started
          </Link>
        )}
        {isLoggedIn && (
          <Link href="/profile" className="flex items-center gap-1 hover:text-primary transition-colors">
            <FaUser /> Profile
          </Link>
        )}
      </div>
    </nav>
  );
}
