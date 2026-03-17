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
        fixed top-6 left-6 right-6 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/80 backdrop-blur-2xl border border-white shadow-clayCard rounded-[32px]"
          : "bg-white/40 backdrop-blur-md border border-white/40 rounded-[32px]"}
      `}
    >
      <nav className="flex items-center justify-between px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-clayButton transition-transform group-hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity="1"/>
              <circle cx="9" cy="9" r="3" fill="white"/>
            </svg>
          </div>
          <span className="font-black text-2xl text-clay-foreground tracking-tight">Lana</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-clay-muted hover:text-clay-accent transition-colors duration-200 cursor-pointer tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="md" className="font-bold text-clay-muted hover:text-clay-foreground">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="md" className="font-bold shadow-clayButton">Get Started Free</Button>
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
        <div className="md:hidden border-t border-white/40 px-6 py-5 flex flex-col gap-4 animate-fade-in bg-white/80 backdrop-blur-xl rounded-b-[32px] mt-2 shadow-clayCard">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base font-bold text-clay-foreground py-2 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/60">
            <Link href="/login"><Button variant="secondary" size="lg" className="w-full font-bold shadow-clayButton">Sign In</Button></Link>
            <Link href="/register"><Button variant="primary" size="lg" className="w-full font-bold shadow-clayButton">Get Started Free</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
