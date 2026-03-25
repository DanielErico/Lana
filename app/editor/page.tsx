"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { RimberioSlideData, RimberioBrand } from '@/components/templates/rimberio/schema';
import SlidePreview from '@/components/templates/rimberio/SlidePreview';
import { useBrand } from '@/components/providers/BrandProvider';
import { useRouter } from 'next/navigation';

const templates = [
  { id: "rimberio", name: "Rimberio Theme", type: "Tech SaaS", slides: 5 },
  // Future templates will go here
];

const defaultBrand: RimberioBrand = {
  colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
  logo: { text: "Rimberio" }
};

const initialSlides: RimberioSlideData[] = [
  {
    id: "1",
    slideNum: 1,
    layout: "intro_card",
    theme: "primary",
    headline: "Ready to Try It?",
    body: "Start simple. Create 3-5 slides, focus on value, and post consistently.",
    cta: "Need help? Drop us a DM",
    hasImage: false
  },
  {
    id: "2",
    slideNum: 2,
    layout: "text_left",
    theme: "light",
    headline: "Here's Why Posting Carousels Can Boost Your Content Game",
    body: "If you're not using carousels yet... you might be missing out.",
    cta: "Swipe to learn",
    hasImage: false
  },
  {
    id: "3",
    slideNum: 3,
    layout: "list_center",
    theme: "primary",
    headline: "Carousels Keep People on Your Post Longer",
    body: "Each swipe means more time spent on your content and the algorithm loves that.",
    cta: "",
    hasImage: false
  },
  {
    id: "4",
    slideNum: 4,
    layout: "text_center",
    theme: "dark",
    headline: "Break Down Ideas, Slide by Slide",
    body: "Carousels are perfect for sharing tips, steps, or stories without cluttering one single image.\n\nYou keep it clean and clear.",
    cta: "",
    hasImage: false
  },
  {
    id: "5",
    slideNum: 5,
    layout: "cta_save",
    theme: "light",
    headline: "People Love to Save Carousels",
    body: "Carousel posts tend to get more saves, which tells the platform:\nThat's how you build trust, visibility, and authority over time.",
    cta: "Save for Later",
    hasImage: false
  }
];

export default function EditorPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  const [slides, setSlides] = useState<RimberioSlideData[]>(initialSlides);
  const [loadingPost, setLoadingPost] = useState(!!postId);
  const [postTitle, setPostTitle] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("template");
  const [caption, setCaption] = useState("");
  const { brand } = useBrand();
  const router = useRouter();
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);

  // Load slides from the post if postId is provided in URL
  useEffect(() => {
    if (!postId) return;
    fetch(`/api/posts?postId=${postId}`)
      .then(r => r.json())
      .then(data => {
        if (data.post?.slides?.length) {
          setSlides(data.post.slides);
          setPostTitle(data.post.title);
          setActiveSlide(0);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingPost(false));
  }, [postId]);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  // ResizeObserver custom hook for dynamic canvas scaling
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canvasScale, setCanvasScale] = useState(1);
  const THUMBNAIL_SCALE = 0.13; // Thumbnails get fixed static scale in JS wrapper

  useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasScale(entry.contentRect.width / 1080);
      }
    });
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  const currentSlide = slides[activeSlide];

  const updateSlide = (field: keyof RimberioSlideData, value: any) => {
    setSlides(prev => prev.map((s, i) => i === activeSlide ? { ...s, [field]: value } : s));
  };

  const genAI = async (type: string) => {
    setGeneratingAI(type);
    await new Promise(r => setTimeout(r, 1800));
    if (type === "caption") {
      setCaption("🤖 We tested 50+ AI tools so you don't have to. Here are the 5 that actually saved us time and money.\n\n📌 Save for later\n💬 Comment your favorite!\n\n#AITools #ProductivityHacks #WorkSmarter #Automation #StartupLife");
    }
    setGeneratingAI(null);
  };

  return (
    <div className="flex flex-col h-screen w-full relative z-10 font-sans animate-fade-in bg-transparent overflow-hidden">
      {/* Top toolbar */}
      <div className="h-16 bg-white/60 backdrop-blur-xl border-b border-white shadow-sm flex items-center justify-between px-6 flex-shrink-0 z-20 relative">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-white/60 transition-colors text-clay-muted hover:text-clay-foreground" title="Go Back">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex items-center gap-3">
              <h1 className="font-black text-clay-foreground text-lg tracking-wide uppercase drop-shadow-sm">
                {loadingPost ? "Loading..." : (postTitle || "Carousel Editor")}
              </h1>
              {!postTitle && <Badge variant="warning" size="sm" className="shadow-sm">v2.0</Badge>}
            </div>
          </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" className="bg-white/80 border-white shadow-sm font-bold">Save Draft</Button>
          <Button variant="primary" size="md" className="shadow-clayButton font-black" onClick={() => setScheduleOpen(true)}>Schedule Post</Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[250px_1fr_300px] overflow-hidden relative min-h-0">
        {/* Left: Slide list */}
        <div className="w-full lg:w-[250px] flex-shrink-0 lg:flex-shrink bg-white/40 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white shadow-sm overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto p-4 flex lg:flex-col gap-3 z-10 relative">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(i)}
              className={`relative rounded-[20px] overflow-hidden aspect-square cursor-pointer transition-all shadow-sm flex items-center justify-center bg-white shrink-0 ${i === activeSlide ? "ring-4 ring-clay-accent shadow-clayCard scale-105" : "hover:ring-4 hover:ring-white/80 hover:shadow-clayCardHover"}`}
              style={{ width: 100, height: 100 }}
            >
              <div 
                className="absolute top-0 left-0"
                style={{
                  width: 1080,
                  height: 1080,
                  transformOrigin: 'top left',
                  transform: `scale(${100 / 1080})` // Scale directly to 100px thumbnail based on the wrapper size
                }}
              >
                <div style={{ width: 1080, height: 1080 }}>
                  <SlidePreview slide={slide} brand={brand} />
                </div>
              </div>
              <div className="absolute inset-0 p-2 flex flex-col justify-between pointer-events-none z-20">
                <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-[10px] font-black shadow-sm">{i + 1}</span>
              </div>
            </div>
          ))}
          <button
            onClick={() => setSlides([...slides, { 
              id: Date.now().toString(), 
              slideNum: slides.length + 1,
              layout: "text_center", 
              theme: "light",
              headline: "New Slide",
              body: "Double click to edit text",
              cta: "Next",
              hasImage: false
            }])}
            className="w-[100px] lg:w-full shrink-0 aspect-square rounded-[20px] bg-white/50 border-2 border-dashed border-white hover:border-clay-accent hover:bg-white hover:shadow-clayCard flex items-center justify-center cursor-pointer transition-all group"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-clay-muted group-hover:text-clay-accent transition-colors group-hover:scale-110">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-hidden relative min-w-0 h-full">
          <div className="relative flex flex-col items-center justify-center h-full w-full">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/60 backdrop-blur-xl border border-white px-4 py-2 rounded-full shadow-clayButton z-20">
              <button onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0} className="w-8 h-8 rounded-full bg-white text-clay-muted border border-white flex items-center justify-center cursor-pointer hover:bg-white/80 hover:text-clay-foreground hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round"/></svg>
              </button>
              <span className="text-sm font-black text-clay-foreground tracking-widest">{activeSlide + 1} / {slides.length}</span>
              <button onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))} disabled={activeSlide === slides.length - 1} className="w-8 h-8 rounded-full bg-white text-clay-muted border border-white flex items-center justify-center cursor-pointer hover:bg-white/80 hover:text-clay-foreground hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round"/></svg>
              </button>
            </div>
            
            {/* Scaled Canvas Wrapper */}
            <div className="flex-1 w-full flex items-center justify-center mt-16 min-h-0">
              <div 
                ref={viewportRef}
                className="canvas-viewport w-full max-w-[600px] aspect-square shrink-0 rounded-[40px] shadow-clayDeep relative overflow-hidden transition-all duration-50 bg-white ring-4 ring-white/50"
              >
                <div 
                  className="canvas-scale absolute top-0 left-0"
                  style={{ 
                    width: 1080,
                    height: 1080,
                    transformOrigin: 'top left',
                    transform: `scale(${canvasScale})` 
                  }}
                >
                  <div className="canvas-inner" style={{ width: 1080, height: 1080 }}>
                    <SlidePreview slide={currentSlide} brand={brand} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Right: Control panel */}
        <div className="w-full lg:w-[300px] flex-shrink-0 min-w-[300px] lg:h-full bg-white/40 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white shadow-sm overflow-y-auto flex flex-col z-10 relative max-h-[40vh] lg:max-h-full">
          <div className="flex border-b border-white/40 p-2 gap-2">
            {["template","design","content","brand"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-[16px] text-xs font-black capitalize cursor-pointer transition-all ${activeTab === tab ? "bg-white text-clay-accent shadow-clayPressed" : "text-clay-muted hover:text-clay-foreground hover:bg-white/60"}`}>{tab}</button>
            ))}
          </div>

          <div className="p-5 flex-1 space-y-6">
            {activeTab === "template" && (
              <div>
                <p className="text-sm font-black text-clay-muted mb-4 uppercase tracking-widest">Choose Template</p>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map(t => (
                    <div key={t.id} className={`aspect-square rounded-[20px] bg-white border-2 border-clay-accent cursor-pointer hover:ring-4 hover:ring-clay-accent/30 hover:scale-105 shadow-clayCard transition-all relative overflow-hidden group flex flex-col items-center justify-center p-4 text-center`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-500/5 group-hover:opacity-100 transition-opacity"/>
                      <span className="text-[32px] mb-2">✨</span>
                      <p className="text-clay-foreground text-sm font-black tracking-tight leading-tight relative">{t.name}</p>
                      <p className="text-clay-muted text-[10px] uppercase font-bold tracking-widest mt-1 relative">{t.slides} slides</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "design" && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-black text-clay-muted mb-4 uppercase tracking-widest">Theme Style</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["primary","light","dark"].map((theme) => (
                      <button 
                        key={theme} 
                        onClick={() => {
                          const newSlides = [...slides];
                          newSlides[activeSlide] = { ...newSlides[activeSlide], theme: theme as any };
                          setSlides(newSlides);
                        }}
                        className={`py-3 rounded-[14px] text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all border-2 shadow-sm ${currentSlide.theme === theme ? 'border-clay-accent ring-2 ring-clay-accent/30 bg-white text-clay-accent shadow-clayPressed' : 'border-transparent bg-white/60 text-clay-muted hover:bg-white hover:text-clay-foreground'}`}
                      >
                         {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-black text-clay-muted mb-4 uppercase tracking-widest">Slide Type</p>
                  <p className="text-xs font-bold text-clay-foreground bg-white/60 p-3 rounded-[14px] border border-white capitalize">{currentSlide.layout.replace('_', ' ')}</p>
                </div>
              </div>
            )}
            
            {activeTab === "content" && (
              <div className="space-y-4">
                <p className="text-sm font-black text-clay-muted mb-4 uppercase tracking-widest">Edit Text Fields</p>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-clay-muted mb-1 block">Headline</label>
                  <textarea 
                    className="w-full bg-white/60 border border-white p-2 rounded-xl text-xs font-bold leading-relaxed resize-none h-24" 
                    value={currentSlide.headline} 
                    onChange={e => updateSlide('headline', e.target.value)} 
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-clay-muted mb-1 block">Body Text</label>
                  <textarea 
                    className="w-full bg-white/60 border border-white p-2 rounded-xl text-xs font-bold leading-relaxed resize-none h-32" 
                    value={currentSlide.body} 
                    onChange={e => updateSlide('body', e.target.value)} 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-clay-muted mb-1 block">Call to Action (CTA)</label>
                  <input 
                    className="w-full bg-white/60 border border-white p-2 rounded-xl text-xs font-bold" 
                    value={currentSlide.cta} 
                    onChange={e => updateSlide('cta', e.target.value)} 
                  />
                </div>
              </div>
            )}
            
            {activeTab === "brand" && (
              <div className="space-y-5">
                <div className="p-4 bg-white/60 rounded-[24px] border border-white shadow-clayPressed text-center">
                  <p className="text-xs font-black text-clay-accent tracking-widest uppercase mb-3 drop-shadow-sm">Brand Kit</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-700 shadow-sm"/><div className="w-6 h-6 rounded-full bg-purple-700 shadow-sm"/><div className="w-6 h-6 rounded-full bg-amber-500 shadow-sm"/>
                  </div>
                </div>
                <Button variant="primary" size="lg" className="w-full font-black shadow-clayButton">Apply Brand Kit</Button>
              </div>
            )}
          </div>

          {/* AI tools */}
          <div className="p-5 border-t border-white/40 space-y-3 bg-white/20 backdrop-blur-sm">
            <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mb-2 px-1">AI Tools</p>
            <button onClick={() => genAI("caption")} disabled={!!generatingAI} className="w-full flex items-center gap-4 p-3.5 rounded-[24px] bg-white/50 border border-white hover:bg-white cursor-pointer transition-all shadow-sm hover:shadow-clayCard Hover text-left group">
              <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
              <div>
                <p className="text-sm font-black text-clay-foreground tracking-wide">{generatingAI === "caption" ? "Generating…" : "Generate Caption"}</p>
                <p className="text-xs font-bold text-clay-muted uppercase tracking-widest mt-0.5">+ Hashtags</p>
              </div>
            </button>
            <button onClick={() => genAI("hook")} disabled={!!generatingAI} className="w-full flex items-center gap-4 p-3.5 rounded-[24px] bg-white/50 border border-white hover:bg-white cursor-pointer transition-all shadow-sm hover:shadow-clayCard Hover text-left group">
              <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <p className="text-sm font-black text-clay-foreground tracking-wide">{generatingAI === "hook" ? "Generating…" : "Viral Hook"}</p>
                <p className="text-xs font-bold text-clay-muted uppercase tracking-widest mt-0.5">First slide copy</p>
              </div>
            </button>
            {caption && (
              <div className="p-4 bg-white/80 rounded-[24px] border border-white shadow-clayPressed mt-4">
                <p className="text-[10px] font-black text-clay-accent uppercase tracking-widest mb-2">Generated Caption</p>
                <p className="text-xs font-bold text-clay-muted leading-relaxed whitespace-pre-line line-clamp-4">{caption}</p>
                <button className="text-[10px] tracking-widest uppercase text-indigo-600 font-black mt-3 hover:text-indigo-800 cursor-pointer transition-colors block w-full text-center py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl">Copy caption</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleOpen && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-clayDeep border border-white w-full max-w-sm p-10 animate-slide-up">
            <h2 className="font-black text-3xl tracking-tight text-clay-foreground mb-2 text-center">Schedule Post</h2>
            <p className="text-sm font-bold text-clay-muted mb-8 text-center">Pick when to auto-publish</p>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-clay-muted block mb-2 px-1">Date</label>
                <input type="date" defaultValue="2026-03-19" className="w-full px-5 py-4 rounded-[20px] bg-white/50 border border-white shadow-clayPressed text-sm font-bold text-clay-foreground focus:outline-none focus:bg-white focus:shadow-sm cursor-pointer transition-all"/>
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-clay-muted block mb-3 px-1">Best Times (AI Suggested)</label>
                <div className="flex gap-2">
                  {["9:00 AM","12:00 PM","6:00 PM"].map(t => (
                    <button key={t} className="flex-1 py-3 rounded-[16px] border-2 border-transparent bg-white/60 text-xs font-black text-clay-muted hover:bg-white hover:text-clay-accent hover:shadow-sm cursor-pointer transition-all">{t}</button>
                  ))}
                </div>
                <p className="text-[10px] tracking-widest uppercase text-emerald-500 mt-3 font-black text-center">💡 6:00 PM = peak engagement</p>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button variant="secondary" size="lg" className="flex-1 font-bold shadow-sm bg-white" onClick={() => setScheduleOpen(false)}>Cancel</Button>
              <Button variant="primary" size="lg" className="flex-1 font-black shadow-clayButton" onClick={() => setScheduleOpen(false)}>Schedule</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
