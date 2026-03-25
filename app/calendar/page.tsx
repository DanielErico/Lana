"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const days = [
  "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
];

const posts: Record<number, { title: string; status: string; time: string; color: string }[]> = {
  3: [{ title: "AI Productivity Hacks", status: "published", time: "9AM", color: "bg-emerald-500" }],
  5: [{ title: "Morning Routine Series", status: "published", time: "6PM", color: "bg-emerald-500" }],
  8: [{ title: "10 SaaS Tools", status: "published", time: "10AM", color: "bg-emerald-500" }],
  10: [{ title: "Growth Hacking Tips", status: "published", time: "12PM", color: "bg-emerald-500" }],
  12: [{ title: "AI Prompts Vol. 3", status: "published", time: "8AM", color: "bg-emerald-500" }],
  15: [{ title: "Brand Voice Guide", status: "scheduled", time: "9AM", color: "bg-blue-500" }],
  17: [{ title: "5 Tools We Use Daily", status: "scheduled", time: "6PM", color: "bg-blue-500" }],
  19: [{ title: "CEO Morning Routine", status: "scheduled", time: "12PM", color: "bg-blue-500" }],
  20: [{ title: "Pricing Strategy 101", status: "draft", time: "5PM", color: "bg-amber-500" }],
  22: [{ title: "Instagram Algorithm", status: "draft", time: "9AM", color: "bg-amber-500" }],
  24: [{ title: "Viral Hook Formula", status: "draft", time: "6PM", color: "bg-amber-500" }],
  26: [{ title: "LinkedIn vs Instagram", status: "draft", time: "10AM", color: "bg-amber-500" }],
};

const queue = [
  { title: "Brand Voice Guide", time: "Mar 15 · 9AM", status: "scheduled" },
  { title: "5 Tools We Use Daily", time: "Mar 17 · 6PM", status: "scheduled" },
  { title: "CEO Morning Routine", time: "Mar 19 · 12PM", status: "scheduled" },
  { title: "Pricing Strategy 101", time: "Mar 20 · 5PM", status: "draft" },
  { title: "Instagram Algorithm", time: "Mar 22 · 9AM", status: "draft" },
];

export default function CalendarPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(17);
  const [showAI, setShowAI] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setShowAI(false);
  };

  const startDay = 2; // March 1 starts on Sunday index
  const daysInMonth = 31;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8 animate-fade-in relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-3 bg-white/60 border border-white hover:bg-white rounded-[20px] transition-colors text-clay-muted shadow-sm hover:shadow-clayCard">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h1 className="font-black text-4xl text-clay-foreground tracking-tight drop-shadow-sm">Content Calendar</h1>
            <p className="text-clay-muted font-bold text-sm mt-2 uppercase tracking-widest">March 2026 · 30-Day View</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAI(true)}
            className="flex items-center gap-2.5 bg-white/70 backdrop-blur-md border border-white shadow-sm text-clay-muted px-5 py-3 rounded-[20px] text-sm font-black cursor-pointer hover:bg-white hover:text-clay-accent hover:shadow-clayCard transition-all group"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-clay-accent group-hover:scale-110 transition-transform">
              <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
              <path d="M12 8v4l3 3" strokeLinecap="round"/>
            </svg>
            AI Generate Plan
          </button>
          <button className="flex items-center gap-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-[20px] text-sm font-black cursor-pointer hover:-translate-y-0.5 hover:shadow-clayButton transition-all shadow-sm">
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
            Add Post
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-3 bg-white/60 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {days.map(d => (
              <div key={d} className="text-center text-[10px] font-black text-clay-muted py-1 uppercase tracking-widest">{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty cells before month start */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20 rounded-[16px] bg-white/30"/>
            ))}
            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dayPosts = posts[day] || [];
              const isSelected = selected === day;
              const isToday = day === 17;
              return (
                <div
                  key={day}
                  onClick={() => setSelected(day)}
                  className={`h-20 p-2 rounded-[16px] border cursor-pointer transition-all duration-150 overflow-hidden ${
                    isSelected ? "border-clay-accent bg-white shadow-clayCard scale-105" :
                    isToday ? "border-indigo-300 bg-indigo-50/80" :
                    "border-transparent hover:border-white hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className={`text-xs font-black mb-1 ${
                    isToday ? "text-indigo-600" : isSelected ? "text-clay-accent" : "text-clay-muted"
                  }`}>
                    {day}
                    {isToday && <span className="ml-1 text-indigo-400">·</span>}
                  </div>
                  <div className="space-y-0.5">
                    {dayPosts.map((p, i) => (
                      <div key={i} className={`${p.color} text-white text-[10px] px-1.5 py-0.5 rounded-lg truncate font-black shadow-sm`}>
                        {p.time} {p.title.split(" ").slice(0,2).join(" ")}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/60">
            {[
              { color: "bg-emerald-500", label: "Published" },
              { color: "bg-blue-500", label: "Scheduled" },
              { color: "bg-amber-500", label: "Draft" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2 text-xs font-black text-clay-muted uppercase tracking-widest">
                <span className={`w-3 h-3 rounded-full ${l.color} shadow-sm`}/>
                {l.label}
              </div>
            ))}
            {/* Smart time suggestion */}
            <div className="ml-auto flex items-center gap-2 text-xs text-emerald-600 font-black uppercase tracking-widest px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Best: 9AM · 12PM · 6PM
            </div>
          </div>
        </div>

        {/* Queue panel */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8 flex flex-col">
          <h3 className="font-black text-xl text-clay-foreground tracking-tight drop-shadow-sm mb-1">Post Queue</h3>
          <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mb-6">Upcoming &amp; Drafts</p>
          <div className="space-y-3 flex-1">
            {queue.map((p, i) => (
              <div key={i} className="p-4 rounded-[20px] border border-transparent bg-white/50 hover:bg-white hover:border-white cursor-pointer transition-all shadow-sm hover:shadow-clayCard group">
                <p className="text-sm font-black text-clay-foreground truncate group-hover:text-clay-accent transition-colors">{p.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-bold text-clay-muted uppercase tracking-widest">{p.time}</span>
                  <Badge variant={p.status === "scheduled" ? "success" : "warning"} size="sm">
                    {p.status === "scheduled" ? "✓ Queued" : "Draft"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-xs font-black text-clay-accent uppercase tracking-widest border-2 border-dashed border-clay-accent/30 rounded-[20px] hover:bg-white hover:border-clay-accent hover:shadow-sm cursor-pointer transition-all">
            + Add to Queue
          </button>
        </div>
      </div>

      {/* AI Generate Modal */}
      {showAI && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => !generating && setShowAI(false)}>
          <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-clayDeep border border-white w-full max-w-md p-10 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-clayButton">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
                <path d="M12 8v4l3 3" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="font-black text-3xl text-clay-foreground text-center tracking-tight mb-3 drop-shadow-sm">AI Content Plan</h2>
            <p className="text-sm font-bold text-clay-muted text-center mb-8 uppercase tracking-widest">Generate a full 30-day Instagram plan</p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-[10px] font-black text-clay-muted block mb-3 uppercase tracking-widest px-1">Content Focus</label>
                <div className="flex flex-wrap gap-2">
                  {["Educational","Motivational","Product","Behind-the-scenes","Trending"].map(t => (
                    <button key={t} className="px-4 py-2 rounded-full border-2 border-transparent bg-white/60 text-xs font-black text-clay-muted hover:border-clay-accent hover:bg-white hover:text-clay-accent cursor-pointer transition-all shadow-sm">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-clay-muted block mb-3 uppercase tracking-widest px-1">Posting frequency</label>
                <div className="flex gap-3">
                  {["Daily","3x/week","5x/week"].map(f => (
                    <button key={f} className="flex-1 py-3 rounded-[16px] border-2 border-transparent bg-white/60 text-xs font-black text-clay-muted hover:bg-white hover:border-clay-accent hover:text-clay-accent cursor-pointer transition-all shadow-sm">{f}</button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-4 rounded-[24px] bg-gradient-to-br from-purple-600 to-pink-600 text-white font-black text-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-clayDeep transition-all shadow-clayButton disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {generating ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Generating your plan…
                </>
              ) : (
                <>
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Generate 30-Day Plan
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
