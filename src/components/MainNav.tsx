import React from "react";
import Link from "next/link";
import { 
  Home as LucideHome, 
  Menu as LucideMenu, 
  X as LucideX,
  Sun,
  Moon,
  Briefcase,
  LayoutDashboard,
  FileText,
  PlusCircle,
  User
} from "lucide-react";
import { isUserLoggedIn } from "@/lib/authClient";

export default function MainNav({ 
  onToggleTheme, 
  isDark 
}: { 
  onToggleTheme?: () => void; 
  isDark?: boolean 
}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(isUserLoggedIn());
    }
  }, []);

  // Close menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/jobs", label: "Jobs", icon: <Briefcase size={18} /> },
    { href: "/dashboard/my-jobs", label: "My Jobs", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/applications", label: "My Applications", icon: <FileText size={18} /> },
    { href: "/dashboard/post-job", label: "Post a Job", icon: <PlusCircle size={18} /> },
  ];

  const authLinks = isLoggedIn
    ? [{ href: "/profile", label: "Profile", icon: <User size={18} /> }]
    : [{ href: "/signup", label: "Get Started", icon: <User size={18} /> }];

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 supports-backdrop-blur:bg-background/60">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/fivicon.png" alt="JobInRW Logo" className="h-18 w-18 rounded-full"/>
            <span className="hidden sm:inline">JobInRW</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          
          {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-semibold">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <LucideX size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  
                  <div className="h-px bg-border my-2" />
                  
                  {authLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  © {new Date().getFullYear()} JobInRW
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}