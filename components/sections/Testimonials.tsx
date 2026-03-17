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
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Social proof logos */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {logos.map((logo) => (
              <span key={logo} className="font-heading font-black text-slate-900 text-xl tracking-tight">{logo}</span>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Real brands.{" "}
            <span className="gradient-text">Real results.</span>
          </h2>
          <p className="text-lg text-slate-500">Join 10,000+ brands growing on Instagram with Lana.</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B">
                    <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5L7 1Z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
