"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_START_DAY = 2; // March 2026 starts on Sunday index 2
const DAYS_IN_MONTH = 31;

type Post = {
  id: string;
  title: string;
  status: string;
  scheduled_for: string;
  slides: any[];
};

type DateMode = null | 'ai' | 'manual';
type Step = 'dateMode' | 'focus' | 'manualPick' | 'generating' | 'done';

const FOCUS_OPTIONS = ["Educational", "Motivational", "Product", "Behind-the-scenes", "Trending"];
const FREQUENCY_OPTIONS = ["3x/week", "5x/week", "Daily"];

export default function CalendarPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clearing, setClearing] = useState(false);

  // Wizard state
  const [step, setStep] = useState<Step>('dateMode');
  const [dateMode, setDateMode] = useState<DateMode>(null);
  const [focusTypes, setFocusTypes] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("3x/week");
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/posts');
    const json = await res.json();
    setPosts(json.posts || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleGenerate = async () => {
    setGenerating(true);
    setStep('generating');
    setError(null);
    try {
      const res = await fetch('/api/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateMode,
          selectedDates: selectedDates.map(d => {
            const date = new Date(2026, 2, d); // March 2026
            return date.toISOString();
          }),
          focusTypes,
          frequency
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await fetchPosts();
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Generation failed');
      setStep('focus');
    } finally {
      setGenerating(false);
    }
  };

  const handleClear = async () => {
    if (!confirm('Clear all generated post plans? This cannot be undone.')) return;
    setClearing(true);
    await fetch('/api/posts', { method: 'DELETE' });
    setPosts([]);
    setClearing(false);
  };

  const openModal = () => {
    setStep('dateMode');
    setDateMode(null);
    setFocusTypes([]);
    setFrequency('3x/week');
    setSelectedDates([]);
    setError(null);
    setShowModal(true);
  };

  // Group posts by day-of-month
  const postsByDay: Record<number, Post[]> = {};
  posts.forEach(p => {
    const d = new Date(p.scheduled_for).getDate();
    if (!postsByDay[d]) postsByDay[d] = [];
    postsByDay[d].push(p);
  });

  const today = new Date().getDate();

  const statusColor = (status: string) => {
    if (status === 'published') return 'bg-emerald-500';
    if (status === 'scheduled') return 'bg-blue-500';
    return 'bg-amber-500';
  };

  const selectedDayPosts = selected ? (postsByDay[selected] || []) : [];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8 animate-fade-in relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-3 bg-white/60 border border-white hover:bg-white rounded-[20px] transition-colors text-clay-muted shadow-sm">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h1 className="font-black text-4xl text-clay-foreground tracking-tight drop-shadow-sm">Content Calendar</h1>
            <p className="text-clay-muted font-bold text-sm mt-2 uppercase tracking-widest">March 2026 · {posts.length} plan{posts.length !== 1 ? 's' : ''} generated</p>
          </div>
        </div>
        <div className="flex gap-3">
          {posts.length > 0 && (
            <button
              onClick={handleClear}
              disabled={clearing}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-red-200 text-red-500 px-4 py-3 rounded-[20px] text-sm font-black cursor-pointer hover:bg-red-50 hover:shadow-sm transition-all disabled:opacity-50"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
              {clearing ? 'Clearing…' : 'Clear All'}
            </button>
          )}
          <button
            onClick={openModal}
            className="flex items-center gap-2.5 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-5 py-3 rounded-[20px] text-sm font-black cursor-pointer hover:-translate-y-0.5 hover:shadow-clayButton transition-all shadow-sm"
          >
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            AI Generate Plan
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white/60 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-black text-clay-muted py-1 uppercase tracking-widest">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: MONTH_START_DAY }).map((_, i) => (
              <div key={`e-${i}`} className="h-20 rounded-[16px] bg-white/30"/>
            ))}
            {Array.from({ length: DAYS_IN_MONTH }).map((_, idx) => {
              const day = idx + 1;
              const dayPosts = postsByDay[day] || [];
              const isSelected = selected === day;
              const isToday = day === today;
              return (
                <div
                  key={day}
                  onClick={() => setSelected(isSelected ? null : day)}
                  className={`h-20 p-2 rounded-[16px] border cursor-pointer transition-all duration-150 overflow-hidden ${
                    isSelected ? "border-clay-accent bg-white shadow-clayCard scale-105" :
                    isToday ? "border-indigo-300 bg-indigo-50/80" :
                    dayPosts.length > 0 ? "border-white/60 bg-white/40 hover:bg-white hover:shadow-sm" :
                    "border-transparent hover:border-white hover:bg-white/40"
                  }`}
                >
                  <div className={`text-xs font-black mb-1 ${isToday ? "text-indigo-600" : isSelected ? "text-clay-accent" : "text-clay-muted"}`}>
                    {day}{isToday && <span className="ml-1 text-indigo-400">·</span>}
                  </div>
                  <div className="space-y-0.5">
                    {dayPosts.slice(0,2).map((p, i) => (
                      <div key={i} className={`${statusColor(p.status)} text-white text-[10px] px-1.5 py-0.5 rounded-lg truncate font-black shadow-sm`}>
                        {new Date(p.scheduled_for).getHours()}:00 {p.title.split(" ").slice(0,2).join(" ")}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/60">
            {[{ color:"bg-emerald-500", label:"Published" }, { color:"bg-blue-500", label:"Scheduled" }, { color:"bg-amber-500", label:"Draft" }].map(l => (
              <div key={l.label} className="flex items-center gap-2 text-xs font-black text-clay-muted uppercase tracking-widest">
                <span className={`w-3 h-3 rounded-full ${l.color} shadow-sm`}/>
                {l.label}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs text-emerald-600 font-black uppercase tracking-widest px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Best: 9AM · 12PM · 6PM
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-8 flex flex-col">
          {selected && selectedDayPosts.length > 0 ? (
            <>
              <h3 className="font-black text-xl text-clay-foreground tracking-tight mb-1">March {selected}</h3>
              <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mb-6">{selectedDayPosts.length} post{selectedDayPosts.length > 1 ? 's' : ''}</p>
              <div className="space-y-3 flex-1">
                {selectedDayPosts.map((p, i) => (
                  <div key={i} className="p-4 rounded-[20px] bg-white/70 border border-white shadow-sm">
                    <p className="text-sm font-black text-clay-foreground">{p.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] font-bold text-clay-muted uppercase tracking-widest">
                        {new Date(p.scheduled_for).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <Badge variant={p.status === 'published' ? 'success' : p.status === 'scheduled' ? 'info' : 'warning'} size="sm">
                        {p.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="font-black text-xl text-clay-foreground tracking-tight mb-1">Post Queue</h3>
              <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mb-6">Upcoming & Drafts</p>
              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-clay-accent/30 border-t-clay-accent rounded-full animate-spin"/>
                </div>
              ) : posts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-[20px] bg-purple-50 flex items-center justify-center">
                    <svg width="28" height="28" fill="none" stroke="#7C3AED" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-xs font-black text-clay-muted uppercase tracking-widest">No plans yet.<br/>Click AI Generate Plan!</p>
                </div>
              ) : (
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {posts.slice(0,6).map((p, i) => (
                    <div key={i} className="p-4 rounded-[20px] bg-white/50 hover:bg-white border border-transparent hover:border-white cursor-pointer transition-all shadow-sm group">
                      <p className="text-sm font-black text-clay-foreground truncate group-hover:text-clay-accent transition-colors">{p.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] font-bold text-clay-muted uppercase tracking-widest">
                          {new Date(p.scheduled_for).toLocaleDateString('en-US', { month:'short', day:'numeric' })}
                        </span>
                        <Badge variant={p.status === 'published' ? 'success' : p.status === 'scheduled' ? 'info' : 'warning'} size="sm">
                          {p.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          <button onClick={openModal} className="w-full mt-6 py-3 text-xs font-black text-clay-accent uppercase tracking-widest border-2 border-dashed border-clay-accent/30 rounded-[20px] hover:bg-white hover:border-clay-accent hover:shadow-sm cursor-pointer transition-all">
            + Generate More Plans
          </button>
        </div>
      </div>

      {/* AI Generate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => !generating && setShowModal(false)}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-clayDeep border border-white w-full max-w-md p-10 animate-slide-up" onClick={e => e.stopPropagation()}>

            {/* Step: Date Mode */}
            {step === 'dateMode' && (
              <>
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-clayButton">
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h2 className="font-black text-2xl text-clay-foreground text-center tracking-tight mb-2">How should we schedule?</h2>
                <p className="text-sm font-bold text-clay-muted text-center mb-8 uppercase tracking-widest">Let AI pick or choose manually</p>
                <div className="space-y-3">
                  <button
                    onClick={() => { setDateMode('ai'); setStep('focus'); }}
                    className="w-full p-5 rounded-[24px] bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 hover:shadow-clayCard cursor-pointer transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm flex-shrink-0">
                        <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <p className="font-black text-clay-foreground text-base">AI picks best dates</p>
                        <p className="text-xs font-bold text-clay-muted mt-0.5">Optimal times for max engagement</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => { setDateMode('manual'); setStep('focus'); }}
                    className="w-full p-5 rounded-[24px] bg-white/60 border-2 border-white hover:border-clay-accent/40 hover:shadow-clayCard cursor-pointer transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[14px] bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" fill="none" stroke="#4F46E5" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                      <div>
                        <p className="font-black text-clay-foreground text-base">I'll pick the dates</p>
                        <p className="text-xs font-bold text-clay-muted mt-0.5">Choose specific days from calendar</p>
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* Step: Focus & Frequency */}
            {step === 'focus' && (
              <>
                <button onClick={() => setStep('dateMode')} className="flex items-center gap-1 text-xs text-clay-muted font-black uppercase tracking-widest mb-6 hover:text-clay-foreground transition-colors cursor-pointer">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back
                </button>
                <h2 className="font-black text-2xl text-clay-foreground tracking-tight mb-2">What to post?</h2>
                <p className="text-sm font-bold text-clay-muted mb-6 uppercase tracking-widest">Select focus areas</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {FOCUS_OPTIONS.map(t => (
                    <button
                      key={t}
                      onClick={() => setFocusTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                      className={`px-4 py-2 rounded-full border-2 text-xs font-black cursor-pointer transition-all shadow-sm ${focusTypes.includes(t) ? 'border-clay-accent bg-clay-accent/10 text-clay-accent' : 'border-white bg-white/60 text-clay-muted hover:border-clay-accent/40'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <label className="text-[10px] font-black text-clay-muted block mb-3 uppercase tracking-widest">Posting frequency</label>
                <div className="flex gap-3 mb-8">
                  {FREQUENCY_OPTIONS.map(f => (
                    <button key={f} onClick={() => setFrequency(f)} className={`flex-1 py-3 rounded-[16px] border-2 text-xs font-black cursor-pointer transition-all ${frequency === f ? 'border-clay-accent bg-clay-accent/10 text-clay-accent' : 'border-white bg-white/60 text-clay-muted hover:border-clay-accent/40'}`}>{f}</button>
                  ))}
                </div>
                {error && <p className="text-red-500 text-xs font-black mb-4 p-3 bg-red-50 rounded-[14px]">{error}</p>}
                <button
                  onClick={() => dateMode === 'manual' ? setStep('manualPick') : handleGenerate()}
                  className="w-full py-4 rounded-[24px] bg-gradient-to-br from-purple-600 to-pink-600 text-white font-black text-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-clayDeep transition-all shadow-clayButton"
                >
                  {dateMode === 'manual' ? 'Next: Pick Dates →' : '✨ Generate Plan'}
                </button>
              </>
            )}

            {/* Step: Manual Date Picker */}
            {step === 'manualPick' && (
              <>
                <button onClick={() => setStep('focus')} className="flex items-center gap-1 text-xs text-clay-muted font-black uppercase tracking-widest mb-6 hover:text-clay-foreground transition-colors cursor-pointer">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back
                </button>
                <h2 className="font-black text-2xl text-clay-foreground tracking-tight mb-2">Pick your dates</h2>
                <p className="text-sm font-bold text-clay-muted mb-6 uppercase tracking-widest">Select days in March 2026</p>
                <div className="grid grid-cols-7 gap-1 mb-8">
                  {DAYS.map(d => <div key={d} className="text-[9px] font-black text-clay-muted text-center mb-1 uppercase">{d}</div>)}
                  {Array.from({ length: MONTH_START_DAY }).map((_, i) => <div key={`ep-${i}`}/>)}
                  {Array.from({ length: DAYS_IN_MONTH }).map((_, idx) => {
                    const day = idx + 1;
                    const picked = selectedDates.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDates(prev => picked ? prev.filter(d => d !== day) : [...prev, day])}
                        className={`h-8 rounded-[8px] text-xs font-black cursor-pointer transition-all ${picked ? 'bg-clay-accent text-white' : 'bg-white/60 text-clay-muted hover:bg-white hover:text-clay-foreground'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mb-4">{selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''} selected</p>
                <button
                  onClick={handleGenerate}
                  disabled={selectedDates.length === 0}
                  className="w-full py-4 rounded-[24px] bg-gradient-to-br from-purple-600 to-pink-600 text-white font-black text-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-clayDeep transition-all shadow-clayButton disabled:opacity-50"
                >
                  ✨ Generate {selectedDates.length} Post{selectedDates.length !== 1 ? 's' : ''}
                </button>
              </>
            )}

            {/* Step: Generating */}
            {step === 'generating' && (
              <div className="flex flex-col items-center justify-center py-8 gap-6">
                <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-clayButton">
                  <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <h2 className="font-black text-2xl text-clay-foreground tracking-tight mb-2">Generating Plans…</h2>
                  <p className="text-sm font-bold text-clay-muted uppercase tracking-widest">Gemini is building your carousel ideas</p>
                </div>
              </div>
            )}

            {/* Step: Done */}
            {step === 'done' && (
              <div className="flex flex-col items-center justify-center py-8 gap-6">
                <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-clayButton">
                  <svg width="36" height="36" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="text-center">
                  <h2 className="font-black text-2xl text-clay-foreground tracking-tight mb-2">Plans Generated! 🎉</h2>
                  <p className="text-sm font-bold text-clay-muted uppercase tracking-widest mb-6">Your calendar is updated</p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-[20px] bg-clay-accent text-white font-black text-sm cursor-pointer hover:shadow-clayButton transition-all"
                  >
                    View Calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
