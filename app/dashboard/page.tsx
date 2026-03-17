"use client";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const stats = [
  {
    label: "Total Posts",
    value: "124",
    change: "+12 this month",
    up: true,
    color: "text-blue-700",
    bg: "bg-blue-50",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Total Reach",
    value: "48.2K",
    change: "+23% vs last month",
    up: true,
    color: "text-purple-700",
    bg: "bg-purple-50",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    label: "Avg Engagement",
    value: "8.3%",
    change: "+1.2% vs last month",
    up: true,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Scheduled",
    value: "17",
    change: "Next: Today 6PM",
    up: null,
    color: "text-amber-700",
    bg: "bg-amber-50",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const upcomingPosts = [
  { title: "5 AI Tools That Changed Our Workflow", time: "Today, 6:00 PM", status: "scheduled", slides: 7 },
  { title: "How We Grew to 10K Followers in 90 Days", time: "Tomorrow, 9:00 AM", status: "scheduled", slides: 9 },
  { title: "The Ultimate SaaS Pricing Strategy Guide", time: "Mar 19, 12:00 PM", status: "draft", slides: 6 },
  { title: "Why Your Instagram Reach is Dropping (& Fix)", time: "Mar 20, 5:00 PM", status: "draft", slides: 8 },
];

const topPosts = [
  { title: "10 ChatGPT Prompts for Entrepreneurs", eng: "12.4%", reach: "8.2K", gradient: "from-blue-400 to-indigo-500" },
  { title: "Morning Routine of Successful CEOs", eng: "10.1%", reach: "6.9K", gradient: "from-purple-400 to-pink-500" },
  { title: "How to Write Viral Hooks That Stop Scroll", eng: "9.8%", reach: "7.4K", gradient: "from-emerald-400 to-teal-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-black text-4xl text-clay-foreground tracking-tight mb-2 drop-shadow-sm">Good morning, Alex 👋</h1>
          <p className="text-clay-muted font-bold text-base tracking-wide">Here&apos;s what&apos;s happening with your Instagram today.</p>
        </div>
        <Link href="/editor">
          <button className="flex items-center gap-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-[20px] text-sm font-black cursor-pointer hover:-translate-y-1 transition-transform shadow-clayButton">
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
            New Carousel
          </button>
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Card key={s.label} variant="glass" padding="lg" hover={true}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-[16px] ${s.bg} ${s.color} flex items-center justify-center shadow-sm`}>
                {s.icon}
              </div>
              {s.up !== null && (
                <span className={`text-sm font-black flex items-center gap-1 ${s.up ? "text-emerald-500" : "text-pink-500"}`}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d={s.up ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </div>
            <div className={`font-black tracking-tight text-3xl ${s.color} mb-1 drop-shadow-sm`}>{s.value}</div>
            <div className="text-sm text-clay-muted font-bold tracking-wide">{s.label}</div>
            <div className="text-xs font-bold text-clay-muted/70 mt-2 uppercase tracking-widest">{s.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Engagement chart */}
        <Card variant="default" padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm">Engagement Trend</h3>
              <p className="text-sm font-bold text-clay-muted mt-1 uppercase tracking-wider">Last 30 days</p>
            </div>
            <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-[16px] border border-white/60 shadow-sm">
              {["7d","30d","90d"].map((t, i) => (
                <button key={t} className={`px-4 py-2 rounded-[12px] text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${i === 1 ? "bg-clay-accent text-white shadow-clayButton hover:scale-105" : "text-clay-muted hover:text-clay-foreground hover:bg-white"}`}>{t}</button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 500 160" className="w-full h-48 drop-shadow-md">
            <defs>
              <linearGradient id="eng" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="reach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[40,80,120].map(y => (
              <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
            ))}
            {/* Engagement area */}
            <path d="M0,120 C40,110 80,90 120,85 C160,80 200,95 240,75 C280,55 320,60 360,45 C400,30 450,50 500,40" fill="none" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round"/>
            <path d="M0,120 C40,110 80,90 120,85 C160,80 200,95 240,75 C280,55 320,60 360,45 C400,30 450,50 500,40 V160 H0 Z" fill="url(#eng)"/>
            {/* Reach area */}
            <path d="M0,130 C40,125 80,115 120,110 C160,105 200,118 240,100 C280,82 320,88 360,72 C400,56 450,68 500,62" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round"/>
            {/* Dots highlight */}
            {[[240,75],[360,45],[500,40]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="6" fill="#7C3AED" stroke="white" strokeWidth="3" className="drop-shadow-sm"/>
            ))}
          </svg>
          <div className="flex items-center gap-8 mt-6">
            <div className="flex items-center gap-3 text-sm font-black text-clay-muted tracking-wide uppercase">
              <span className="w-4 h-1 bg-indigo-500 inline-block rounded-full shadow-sm"/>Engagement
            </div>
            <div className="flex items-center gap-3 text-sm font-black text-clay-muted tracking-wide uppercase">
              <span className="w-4 h-1 bg-amber-500 inline-block rounded-full border border-dashed border-white shadow-sm"/>Reach
            </div>
          </div>
        </Card>

        {/* Top posts */}
        <Card variant="gradient" padding="lg">
          <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm mb-6">Top Posts</h3>
          <div className="space-y-4">
            {topPosts.map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-[20px] bg-white/60 hover:bg-white border border-transparent hover:border-white shadow-sm hover:shadow-clayCardHover cursor-pointer transition-all group">
                <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-br ${p.gradient} flex-shrink-0 shadow-sm transition-transform group-hover:scale-105`}/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-clay-foreground truncate tracking-wide">{p.title}</p>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{p.eng} eng</span>
                    <span className="text-xs font-bold text-clay-muted uppercase tracking-widest">{p.reach} reach</span>
                  </div>
                </div>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-clay-muted group-hover:text-indigo-500 transition-colors">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
          <Link href="/analytics">
            <button className="w-full mt-6 text-sm text-clay-accent font-black py-4 hover:bg-white/60 rounded-[20px] cursor-pointer transition-all border border-transparent hover:border-white shadow-sm hover:shadow-clayButton">
              View all analytics →
            </button>
          </Link>
        </Card>
      </div>

      {/* Upcoming posts */}
      <Card variant="default" padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm">Upcoming Posts</h3>
          <Link href="/calendar">
            <button className="text-sm font-black text-clay-accent hover:text-indigo-600 cursor-pointer tracking-wide uppercase">View Calendar →</button>
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingPosts.map((p, i) => (
            <div key={i} className="flex items-center gap-5 p-4 rounded-[24px] bg-white/40 hover:bg-white border border-transparent hover:border-white cursor-pointer transition-all shadow-sm hover:shadow-clayCardHover group">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-sm ${p.status === "scheduled" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}/>
              <div className="flex-1 min-w-0">
                <p className="text-base font-black text-clay-foreground truncate tracking-wide">{p.title}</p>
                <p className="text-sm font-bold text-clay-muted mt-1 tracking-wide uppercase">{p.time} · {p.slides} slides</p>
              </div>
              <Badge variant={p.status === "scheduled" ? "success" : "warning"} dot size="lg">
                {p.status === "scheduled" ? "Scheduled" : "Draft"}
              </Badge>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-clay-muted group-hover:text-clay-accent transition-colors flex-shrink-0 transform group-hover:translate-x-1">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 pt-4">
        {[
          { label: "Generate 30-Day Plan", color: "from-blue-600 to-indigo-700", href: "/calendar", icon: "📅" },
          { label: "Create New Carousel", color: "from-purple-600 to-pink-600", href: "/editor", icon: "✨" },
          { label: "Analyze Competitors", color: "from-emerald-600 to-teal-600", href: "/analytics", icon: "🔍" },
          { label: "Setup Brand Voice", color: "from-amber-500 to-orange-500", href: "/brand", icon: "🎨" },
        ].map((a) => (
          <Link key={a.label} href={a.href}>
            <div className={`bg-gradient-to-br ${a.color} rounded-[32px] p-6 text-white cursor-pointer transition-transform duration-300 shadow-clayButton hover:shadow-clayCard Hover hover:-translate-y-2 flex flex-col items-center text-center group`}>
              <div className="text-5xl mb-4 drop-shadow-md group-hover:scale-110 transition-transform">{a.icon}</div>
              <div className="text-base font-black leading-tight tracking-wide">{a.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
