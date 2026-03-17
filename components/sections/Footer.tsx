import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Blog", "Documentation", "API Reference", "Status"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="relative z-10 m-4 mt-24">
      <div className="bg-white/60 backdrop-blur-3xl border border-white rounded-super p-10 md:p-16 shadow-clayCard mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-clayButton">
                <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity="1"/>
                  <circle cx="9" cy="9" r="3" fill="white"/>
                </svg>
              </div>
              <span className="font-black text-2xl text-clay-foreground tracking-tight">Lana</span>
            </div>
            <p className="text-base font-medium leading-relaxed text-clay-muted mb-6">
              AI-powered Instagram carousel platform for modern brands and agencies.
            </p>
            <div className="flex items-center gap-3">
              {["twitter", "instagram", "linkedin"].map((s) => (
                <a
                  key={s}
                  href={`https://${s}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/60 hover:bg-white border border-white/40 shadow-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer hover:shadow-clayButtonHover"
                  aria-label={s}
                >
                  <div className="w-4 h-4 bg-clay-muted rounded-sm opacity-80"/>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-black text-clay-foreground text-sm uppercase tracking-widest mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm font-bold text-clay-muted hover:text-clay-accent transition-colors cursor-pointer"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-clay-muted/80">
            © 2026 Lana AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5 text-sm font-bold text-clay-muted/80 bg-white/40 px-4 py-2 rounded-full border border-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm animate-pulse"/>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
