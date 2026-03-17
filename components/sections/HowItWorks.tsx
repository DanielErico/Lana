import Badge from "@/components/ui/Badge";

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
    <section id="how-it-works" className="py-24 px-4 relative z-10 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <Badge variant="purple" size="md" className="mb-6 bg-white/50">
            Simple 3-Step Process
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-clay-foreground mb-6 tracking-tight">
            From zero to{" "}
            <span className="clay-text-gradient">posted in minutes</span>
          </h2>
          <p className="text-lg md:text-xl text-clay-muted max-w-xl mx-auto font-medium">
            No design skills needed. No scheduling headaches. Just results.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-1 bg-white shadow-sm rounded-full z-0" />

          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center group">
                {/* Icon circle */}
                <div className={`
                  w-28 h-28 rounded-[32px] bg-gradient-to-br ${s.color}
                  flex items-center justify-center mb-6 shadow-clayButton
                  transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-clayButtonHover
                `}>
                  {s.icon}
                </div>

                <div className="text-sm font-black text-clay-muted/60 tracking-[0.2em] mb-3">STEP {s.step}</div>
                <h3 className="font-black text-2xl text-clay-foreground mb-4 tracking-tight">{s.title}</h3>
                <p className="text-clay-muted leading-relaxed text-base max-w-[280px] font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
