import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Blog", "Documentation", "API Reference", "Status"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity="0.9"/>
                  <circle cx="9" cy="9" r="3" fill="white"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-white">Lana</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-4">
              AI-powered Instagram carousel platform for modern brands and agencies.
            </p>
            <div className="flex items-center gap-3">
              {["twitter", "instagram", "linkedin"].map((s) => (
                <a
                  key={s}
                  href={`https://${s}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={s}
                >
                  <div className="w-3.5 h-3.5 bg-slate-400 rounded-sm opacity-70"/>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
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
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © 2026 Lana AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
