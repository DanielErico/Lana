"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`
        fixed top-4 left-4 right-4 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/90 backdrop-blur-xl border border-slate-200 shadow-card rounded-2xl"
          : "bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl"}
      `}
    >
      <nav className="flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity="0.9"/>
              <circle cx="9" cy="9" r="3" fill="white"/>
            </svg>
          </div>
          <span className="font-heading font-bold text-xl text-slate-900">Lana</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="gradient" size="sm">Get Started Free</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round"/>
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 px-6 py-4 flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 py-1 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Link href="/login"><Button variant="secondary" size="sm" className="w-full">Sign In</Button></Link>
            <Link href="/register"><Button variant="gradient" size="sm" className="w-full">Get Started Free</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
