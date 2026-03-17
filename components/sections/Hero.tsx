import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const stats = [
  { value: "10,000+", label: "Brands Trust Lana" },
  { value: "2.4M+", label: "Posts Scheduled" },
  { value: "340%", label: "Avg. Engagement Increase" },
];

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 relative">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Pill badge */}
        <Badge variant="purple" size="md" className="mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-purple-600">
            <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5L7 1Z" fill="currentColor"/>
          </svg>
          Powered by Gemini AI — Now in Public Beta
        </Badge>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.05]">
          Instagram Carousels
          <br className="hidden sm:block" />
          <span className="clay-text-gradient ml-3 sm:ml-0">on Autopilot</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-clay-muted max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Lana uses AI to plan, design, schedule and publish visually stunning Instagram carousel posts — 
          all while staying true to your brand's unique identity.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="xl" className="w-full" rightIcon={
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }>
              Start Free — No Card Needed
            </Button>
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto">
            <Button variant="secondary" size="xl" className="w-full" leftIcon={
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
              </svg>
            }>
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="text-4xl sm:text-5xl font-black clay-text-gradient cursor-default animate-clay-breathe inline-block">{s.value}</div>
              <div className="text-sm font-bold text-clay-muted mt-2 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto max-w-5xl animate-clay-float">
          <div className="rounded-super overflow-hidden shadow-clayDeep bg-white/60 backdrop-blur-2xl border border-white p-2">
            <div className="rounded-[40px] overflow-hidden bg-clay-canvas border border-white/40 shadow-inner">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-6 py-4 bg-white/40 backdrop-blur-md border-b border-white/40">
                <span className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-sm"/>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm"/>
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm"/>
                <span className="flex-1 mx-4 bg-white/60 rounded-full h-8 text-sm font-medium flex items-center justify-center text-clay-muted shadow-sm">
                  app.lana.ai/dashboard
                </span>
              </div>

              {/* Dashboard preview */}
              <div className="flex flex-col md:grid md:grid-cols-4 gap-0 h-[-webkit-fill-available] min-h-[400px]">
                {/* Sidebar */}
                <div className="hidden md:flex col-span-1 bg-white/40 border-r border-white/40 p-5 flex-col gap-3">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-clay-accent to-purple-400 shadow-clayButton"/>
                    <span className="text-base font-black text-clay-foreground tracking-tight">Lana</span>
                  </div>
                  {["Dashboard","Calendar","Editor","Analytics","Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2.5 rounded-2xl text-sm font-bold transition-all ${i === 0
                        ? "bg-white text-clay-accent shadow-sm"
                        : "text-clay-muted hover:bg-white/50"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main area */}
                <div className="md:col-span-3 p-4 md:p-6 overflow-hidden bg-transparent flex-1">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                    {[
                      { label: "Posts Created", val: "124", color: "text-blue-600" },
                      { label: "Total Reach", val: "48K", color: "text-purple-600" },
                      { label: "Avg Engage", val: "8.3%", color: "text-emerald-600" },
                    ].map((s) => (
                      <div key={s.label} className="bg-white/80 backdrop-blur-md rounded-[24px] p-4 shadow-clayCard">
                        <div className={`text-2xl font-black ${s.color} animate-clay-breathe inline-block`}>{s.val}</div>
                        <div className="text-xs font-bold text-clay-muted mt-1 uppercase tracking-wide">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="bg-white/80 backdrop-blur-md rounded-[32px] shadow-clayCard p-5 mb-6">
                    <div className="text-sm font-bold text-clay-foreground mb-4 px-2">Engagement Trend</div>
                    <svg viewBox="0 0 300 80" className="w-full h-20">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,60 C40,50 70,30 100,35 C130,40 160,20 200,15 C230,10 260,25 300,20"
                        fill="none" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round"
                      />
                      <path
                        d="M0,60 C40,50 70,30 100,35 C130,40 160,20 200,15 C230,10 260,25 300,20 V80 H0 Z"
                        fill="url(#chartGrad)"
                      />
                    </svg>
                  </div>

                  {/* Post grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "from-sky-400 to-indigo-500",
                      "from-purple-400 to-pink-500",
                      "from-emerald-400 to-teal-500",
                      "from-amber-400 to-orange-500",
                    ].map((g, i) => (
                      <div key={i} className={`aspect-square rounded-2xl bg-gradient-to-br ${g} shadow-sm opacity-90`}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating pill badges */}
          <div className="hidden lg:block absolute -left-10 top-20 bg-white/90 backdrop-blur-xl rounded-[24px] px-5 py-3 shadow-clayCard animate-clay-float border border-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-clay-foreground">Post Published!</span>
            </div>
          </div>

          <div className="hidden lg:block absolute -right-8 top-1/2 bg-white/90 backdrop-blur-xl rounded-[24px] px-5 py-3 shadow-clayCard animate-clay-float-delayed border border-white">
            <div className="text-base font-black text-clay-accent">+340% Reach</div>
            <div className="text-xs font-bold text-clay-muted mt-0.5">VS LAST MONTH</div>
          </div>
        </div>
      </div>
    </section>
  );
}
