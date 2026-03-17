import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" strokeLinecap="round"/>
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
    title: "30-Day AI Content Calendar",
    desc: "Instantly generate a full month of Instagram carousel ideas tailored to your brand voice and industry trends.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
    color: "bg-gradient-to-br from-purple-400 to-purple-600 text-white",
    title: "AI Carousel Slide Designer",
    desc: "Auto-generate beautiful, on-brand carousel slides with smart layouts, typography, and your brand colors.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
    title: "Caption & Hashtag Generator",
    desc: "Craft scroll-stopping captions and research-backed hashtag sets optimized for maximum reach and engagement.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
    title: "Viral Hook Generator",
    desc: "Generate proven first-slide hooks that stop the scroll and drive saves, shares, and profile visits.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-gradient-to-br from-rose-400 to-rose-600 text-white",
    title: "Trend Topic Detection",
    desc: "Real-time trend monitoring ensures your content stays culturally relevant and algorithm-friendly at all times.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l2 2" strokeLinecap="round"/>
      </svg>
    ),
    color: "bg-gradient-to-br from-cyan-400 to-cyan-600 text-white",
    title: "Auto-Schedule & Publish",
    desc: "Set it and forget it. Lana publishes your carousels at the perfect time via the Meta Instagram Graph API.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" size="md" className="mb-6 bg-white/50">
            <span className="text-clay-accent">★</span> AI-Powered Features
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-clay-foreground mb-6 tracking-tight">
            Everything you need to
            <br />
            <span className="clay-text-gradient">dominate Instagram</span>
          </h2>
          <p className="text-lg md:text-xl text-clay-muted max-w-2xl mx-auto font-medium">
            Lana combines powerful AI with smart automation so you can focus on growing your brand, not managing content.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card
              key={f.title}
              variant="default"
              hover
              className={`group transition-all ${i === 0 ? "md:col-span-2 md:row-span-2 p-10 lg:p-12" : "p-8"}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6 shadow-clayButton transition-transform duration-300 group-hover:scale-110`}>
                {f.icon}
              </div>
              <h3 className={`font-black text-clay-foreground ${i === 0 ? "text-3xl" : "text-xl"} mb-3 tracking-tight`}>{f.title}</h3>
              <p className={`text-clay-muted leading-relaxed font-medium ${i === 0 ? "text-lg max-w-md" : "text-base"}`}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
