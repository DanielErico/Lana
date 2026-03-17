const testimonials = [
  {
    quote: "Lana completely transformed how we handle our Instagram content. We went from spending 20 hours a week on content to just 2 hours of review. Our engagement tripled in 60 days.",
    name: "Sarah Chen",
    role: "Head of Marketing · TechFlow SaaS",
    initials: "SC",
    color: "from-blue-500 to-indigo-600",
    rating: 5,
  },
  {
    quote: "As an agency managing 12 client accounts, Lana is a lifesaver. The AI brand voice trainer nails each client's tone perfectly. It feels like we hired 5 extra content writers.",
    name: "Marcus Williams",
    role: "Founder · Pixel Agency",
    initials: "MW",
    color: "from-purple-500 to-pink-600",
    rating: 5,
  },
  {
    quote: "The viral hook generator alone is worth the subscription. Our first slide impressions went up 280% in the first month. Absolutely game-changing for our e-commerce brand.",
    name: "Priya Sharma",
    role: "Social Media Manager · Botaniq",
    initials: "PS",
    color: "from-emerald-500 to-teal-600",
    rating: 5,
  },
];

const logos = ["Acme Corp", "TechFlow", "Pixel Co", "Botaniq", "Luminary", "Nexus"];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Social proof logos */}
        <div className="text-center mb-20">
          <p className="text-sm font-bold text-clay-muted mb-8 uppercase tracking-[0.2em]">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-60 mix-blend-multiply">
            {logos.map((logo) => (
              <span key={logo} className="font-heading font-black text-clay-foreground text-2xl tracking-tight">{logo}</span>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-clay-foreground mb-6 tracking-tight">
            Real brands.{" "}
            <span className="clay-text-gradient">Real results.</span>
          </h2>
          <p className="text-lg md:text-xl text-clay-muted font-medium">Join 10,000+ brands growing on Instagram with Lana.</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-clayCard hover:shadow-clayCardHover transition-all duration-300 hover:-translate-y-2 cursor-default group"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 14 14" fill="#F59E0B" className="drop-shadow-sm group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                    <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5L7 1Z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-clay-foreground text-base leading-relaxed font-medium mb-8">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-sm`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-black text-clay-foreground text-base">{t.name}</div>
                  <div className="text-xs font-bold text-clay-muted uppercase tracking-wider mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
