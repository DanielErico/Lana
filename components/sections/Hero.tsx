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
    <section className="hero-bg min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 relative">
      {/* Background blobs */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Pill badge */}
        <Badge variant="info" className="mb-6 badge-glow px-4 py-1.5 text-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-blue-600">
            <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5L7 1Z" fill="currentColor"/>
          </svg>
          Powered by Gemini AI — Now in Public Beta
        </Badge>

        {/* Headline */}
        <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
          Instagram Carousels
          <br />
          <span className="gradient-text">on Autopilot</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Lana uses AI to plan, design, schedule and publish engaging Instagram carousel posts — 
          all while staying true to your brand. Less effort, more reach.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/register">
            <Button variant="gradient" size="xl" rightIcon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }>
              Start Free — No Card Needed
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="secondary" size="xl" leftIcon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
              </svg>
            }>
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-heading font-black gradient-text">{s.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto max-w-4xl animate-float">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <span className="w-3 h-3 rounded-full bg-red-400"/>
              <span className="w-3 h-3 rounded-full bg-amber-400"/>
              <span className="w-3 h-3 rounded-full bg-emerald-400"/>
              <span className="flex-1 mx-4 bg-slate-200 rounded-full h-5 text-xs flex items-center justify-center text-slate-400">
                app.lana.ai/dashboard
              </span>
            </div>

            {/* Dashboard preview */}
            <div className="grid grid-cols-4 gap-0 h-72 md:h-96">
              {/* Sidebar */}
              <div className="col-span-1 bg-white border-r border-slate-100 p-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700"/>
                  <span className="text-xs font-bold text-slate-700">Lana</span>
                </div>
                {["Dashboard","Calendar","Editor","Analytics","Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium ${i === 0
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="col-span-3 bg-slate-50 p-4 overflow-hidden">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Posts", val: "124", color: "text-blue-600" },
                    { label: "Reach", val: "48K", color: "text-purple-600" },
                    { label: "Engage", val: "8.3%", color: "text-emerald-600" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
                      <div className={`text-lg font-bold font-heading ${s.color}`}>{s.val}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 mb-3">
                  <div className="text-xs font-semibold text-slate-600 mb-2">Engagement Trend</div>
                  <svg viewBox="0 0 300 80" className="w-full h-14">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,60 C40,50 70,30 100,35 C130,40 160,20 200,15 C230,10 260,25 300,20"
                      fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"
                    />
                    <path
                      d="M0,60 C40,50 70,30 100,35 C130,40 160,20 200,15 C230,10 260,25 300,20 V80 H0 Z"
                      fill="url(#chartGrad)"
                    />
                  </svg>
                </div>

                {/* Post grid */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    "from-blue-400 to-indigo-500",
                    "from-purple-400 to-pink-500",
                    "from-emerald-400 to-teal-500",
                    "from-amber-400 to-orange-500",
                  ].map((g, i) => (
                    <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${g} opacity-80`}/>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating pill badges */}
          <div className="absolute -left-6 top-12 glass-card px-3 py-2 shadow-md animate-slide-in-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-700">Post Published!</span>
            </div>
          </div>

          <div className="absolute -right-6 top-1/3 glass-card px-3 py-2 shadow-md">
            <div className="text-xs font-bold text-purple-700">+340% Reach</div>
            <div className="text-xs text-slate-400">vs last month</div>
          </div>
        </div>
      </div>
    </section>
  );
}
