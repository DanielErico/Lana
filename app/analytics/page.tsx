"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const kpis = [
  { label: "Avg Engagement Rate", value: "8.3%", change: "+1.2%", up: true, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Total Reach", value: "248K", change: "+23%", up: true, color: "text-purple-700", bg: "bg-purple-50" },
  { label: "Follower Growth", value: "+1,840", change: "+18%", up: true, color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Best Post Score", value: "94/100", change: "AI scored", up: null, color: "text-amber-700", bg: "bg-amber-50" },
];

const topPosts = [
  { title: "10 ChatGPT Prompts for Entrepreneurs", eng: "12.4%", reach: "8.2K", saves: "1.2K", score: 94, gradient: "from-blue-400 to-indigo-500" },
  { title: "Morning Routine of Successful CEOs", eng: "10.1%", reach: "6.9K", saves: "980", score: 88, gradient: "from-purple-400 to-pink-500" },
  { title: "How to Write Viral Hooks", eng: "9.8%", reach: "7.4K", saves: "1.1K", score: 85, gradient: "from-emerald-400 to-teal-500" },
  { title: "5 AI Tools That Changed Workflow", eng: "9.2%", reach: "5.8K", saves: "870", score: 81, gradient: "from-amber-400 to-orange-500" },
];

function MiniChart({ color, points }: { color: string; points: string }) {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-16">
      <defs>
        <linearGradient id={`g${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <path d={points + " V60 H0 Z"} fill={`url(#g${color.replace("#","")})`}/>
    </svg>
  );
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [range, setRange] = useState("30d");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-3 bg-white/60 border border-white hover:bg-white rounded-[20px] transition-colors text-clay-muted shadow-sm hover:shadow-clayCard">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h1 className="font-black text-4xl text-clay-foreground tracking-tight drop-shadow-sm">Analytics</h1>
            <p className="text-clay-muted font-bold text-sm mt-2 uppercase tracking-widest">Track your Instagram performance</p>
          </div>
        </div>
        <div className="flex gap-2 bg-white/60 backdrop-blur-md p-1.5 rounded-[20px] border border-white shadow-sm">
          {["7d","30d","90d"].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-5 py-2 rounded-[16px] text-sm font-black cursor-pointer transition-all uppercase tracking-widest ${range === r ? "bg-white text-clay-accent shadow-clayPressed" : "text-clay-muted hover:text-clay-foreground hover:bg-white/60"}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map(k => (
          <div key={k.label} className="bg-white/70 backdrop-blur-xl rounded-[32px] border border-white shadow-clayCard p-7 hover:shadow-clayCardHover hover:-translate-y-1 transition-all duration-300 group">
            <div className={`w-12 h-12 rounded-[16px] ${k.bg} ${k.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform`}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={`font-black text-3xl tracking-tight ${k.color} drop-shadow-sm`}>{k.value}</div>
            <div className="text-[10px] font-black text-clay-muted uppercase tracking-widest mt-2">{k.label}</div>
            {k.up !== null ? (
              <div className={`text-xs font-black mt-3 flex items-center gap-1.5 uppercase tracking-widest ${k.up ? "text-emerald-600" : "text-red-500"}`}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d={k.up ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {k.change} vs last period
              </div>
            ) : (
              <div className="text-[10px] font-black text-clay-muted mt-3 uppercase tracking-widest">{k.change}</div>
            )}
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-xl text-clay-foreground tracking-tight drop-shadow-sm">Engagement Rate</h3>
            <Badge variant="success" dot>Live data</Badge>
          </div>
          <MiniChart color="#6366f1" points="M0,45 C25,42 50,30 75,28 C100,26 125,38 150,20 C175,10 187,18 200,12"/>
          <div className="flex justify-between text-[10px] font-black text-clay-muted mt-3 px-1 uppercase tracking-widest">
            {["Mar 1","Mar 8","Mar 15","Mar 22","Mar 28"].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8">
          <h3 className="font-black text-xl text-clay-foreground tracking-tight drop-shadow-sm mb-6">By Post Type</h3>
          <div className="space-y-5">
            {[
              { label: "Carousel", pct: 68, color: "bg-blue-600" },
              { label: "Reel", pct: 22, color: "bg-purple-600" },
              { label: "Single Image", pct: 10, color: "bg-slate-400" },
            ].map(t => (
              <div key={t.label}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-black text-clay-muted uppercase tracking-widest">{t.label}</span>
                  <span className="font-black text-clay-foreground">{t.pct}%</span>
                </div>
                <div className="h-3 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden border border-white shadow-inner">
                  <div className={`h-full ${t.color} rounded-full transition-all duration-700 shadow-sm`} style={{ width: `${t.pct}%` }}/>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/50">
            <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mb-3">Growth Trend</p>
            <MiniChart color="#10b981" points="M0,50 C20,46 50,40 80,32 C110,24 140,20 170,14 C185,10 195,12 200,10"/>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8 bg-gradient-to-br from-purple-50/60 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-black text-xl text-clay-foreground tracking-tight drop-shadow-sm">Trend Topics (AI)</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["#AITools","#ProductivityHacks","#StartupLife","#ContentCreator","#SocialMediaTips","#WorkSmarter","#GrowthHacking"].map(t => (
              <span key={t} className="px-4 py-2 bg-white/80 border border-white text-clay-accent font-black text-xs rounded-full cursor-pointer hover:bg-white hover:shadow-sm shadow-sm transition-all">{t}</span>
            ))}
          </div>
          <p className="text-[10px] font-black text-clay-muted mt-4 uppercase tracking-widest">Updated 2 hours ago · Based on your industry</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8 bg-gradient-to-br from-blue-50/60 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="font-black text-xl text-clay-foreground tracking-tight drop-shadow-sm">Competitor Insights (AI)</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: "@competitor_a", posts: "4/wk", avg: "6.2%", arrow: "up" },
              { name: "@competitor_b", posts: "2/wk", avg: "4.8%", arrow: "down" },
              { name: "@competitor_c", posts: "7/wk", avg: "9.1%", arrow: "up" },
            ].map(c => (
              <div key={c.name} className="flex items-center justify-between py-3 border-b border-white/50 last:border-0">
                <span className="text-sm font-black text-clay-foreground">{c.name}</span>
                <div className="flex items-center gap-4 text-xs font-black text-clay-muted uppercase tracking-widest">
                  <span>{c.posts}</span>
                  <span className={`${c.arrow === "up" ? "text-emerald-600" : "text-clay-muted"}`}>{c.avg} eng</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top posts table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-xl text-clay-foreground tracking-tight drop-shadow-sm">Best Performing Posts</h3>
          <Badge variant="info">AI Scored</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/50">
                <th className="text-left text-[10px] font-black text-clay-muted pb-4 pr-4 uppercase tracking-widest">Post</th>
                <th className="text-center text-[10px] font-black text-clay-muted pb-4 px-3 uppercase tracking-widest">Engagement</th>
                <th className="text-center text-[10px] font-black text-clay-muted pb-4 px-3 uppercase tracking-widest">Reach</th>
                <th className="text-center text-[10px] font-black text-clay-muted pb-4 px-3 uppercase tracking-widest">Saves</th>
                <th className="text-center text-[10px] font-black text-clay-muted pb-4 pl-3 uppercase tracking-widest">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {topPosts.map((p, i) => (
                <tr key={i} className="hover:bg-white/60 rounded-[16px] cursor-pointer transition-all group">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-br ${p.gradient} flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}/>
                      <span className="text-clay-foreground font-black text-sm leading-tight group-hover:text-clay-accent transition-colors">{p.title}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-3 text-emerald-600 font-black text-sm">{p.eng}</td>
                  <td className="text-center py-4 px-3 text-clay-muted font-black text-sm">{p.reach}</td>
                  <td className="text-center py-4 px-3 text-clay-muted font-black text-sm">{p.saves}</td>
                  <td className="text-center py-4 pl-3">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                      p.score >= 90 ? "bg-emerald-100 text-emerald-700" :
                      p.score >= 80 ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>{p.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
