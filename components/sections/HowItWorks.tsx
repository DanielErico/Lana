const steps = [
  {
    step: "01",
    title: "Set Up Your Brand",
    desc: "Upload your logo, choose your colors and fonts, and define your brand voice. Lana learns your identity in minutes.",
    color: "from-blue-500 to-blue-700",
    icon: (
      <svg width="24" height="24" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "Generate Your Content Plan",
    desc: "Ask the AI to create a 30-day Instagram content calendar. Get carousel ideas, captions, hooks, and posting schedule — all in seconds.",
    color: "from-purple-500 to-purple-700",
    icon: (
      <svg width="24" height="24" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Publish on Autopilot",
    desc: "Review, tweak, and approve your posts in the drag-and-drop editor. Lana handles publishing at the optimal time via Instagram API.",
    color: "from-emerald-500 to-teal-600",
    icon: (
      <svg width="24" height="24" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-surface-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Simple 3-Step Process
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            From zero to{" "}
            <span className="gradient-text">posted in minutes</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            No design skills needed. No scheduling headaches. Just results.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 z-0" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center group">
                {/* Icon circle */}
                <div className={`
                  w-28 h-28 rounded-3xl bg-gradient-to-br ${s.color}
                  flex items-center justify-center mb-6 shadow-lg
                  transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1
                `}>
                  {s.icon}
                </div>

                <div className="text-xs font-bold text-slate-400 tracking-widest mb-2">STEP {s.step}</div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
