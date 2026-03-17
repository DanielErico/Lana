import Card from "@/components/ui/Card";

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" strokeLinecap="round"/>
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
    title: "30-Day AI Content Calendar",
    desc: "Instantly generate a full month of Instagram carousel ideas tailored to your brand voice and industry trends.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    color: "bg-purple-50 text-purple-600",
    title: "AI Carousel Slide Designer",
    desc: "Auto-generate beautiful, on-brand carousel slides with smart layouts, typography, and your brand colors.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600",
    title: "Caption & Hashtag Generator",
    desc: "Craft scroll-stopping captions and research-backed hashtag sets optimized for maximum reach and engagement.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
    title: "Viral Hook Generator",
    desc: "Generate proven first-slide hooks that stop the scroll and drive saves, shares, and profile visits.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-rose-50 text-rose-600",
    title: "Trend Topic Detection",
    desc: "Real-time trend monitoring ensures your content stays culturally relevant and algorithm-friendly at all times.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l2 2" strokeLinecap="round"/>
      </svg>
    ),
    color: "bg-cyan-50 text-cyan-600",
    title: "Auto-Schedule & Publish",
    desc: "Set it and forget it. Lana publishes your carousels at the perfect time via the Meta Instagram Graph API.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            AI-Powered Features
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">dominate Instagram</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Lana combines powerful AI with smart automation so you can focus on growing your brand, not managing content.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card
              key={f.title}
              variant="gradient"
              hover
              className="group border border-slate-100 hover:border-blue-100 transition-all"
            >
              <div className={`w-11 h-11 rounded-2xl ${f.color} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                {f.icon}
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
