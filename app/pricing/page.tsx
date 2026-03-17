"use client";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col pt-16">
      <Navbar />

      <main className="flex-1 animate-fade-in">
        {/* Header */}
        <section className="py-24 text-center px-4 relative overflow-hidden bg-transparent">
          <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
            <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] mix-blend-multiply"/>
            <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[80px] mix-blend-multiply"/>
          </div>
          
          <div className="relative max-w-4xl mx-auto z-10 px-4">
            <h1 className="font-black text-5xl md:text-7xl text-clay-foreground tracking-tighter mb-8 drop-shadow-sm leading-tight">
              Pricing that scales with <br className="hidden md:block"/><span className="clay-text-gradient">your growth</span>
            </h1>
            <p className="text-xl md:text-2xl text-clay-muted font-bold max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your Instagram presence with AI-powered tools. Start for free. Upgrade when you need more power.
            </p>
            <div className="flex items-center justify-center gap-6 bg-white/60 backdrop-blur-md p-3 rounded-[24px] shadow-clayPressed w-max mx-auto border border-white">
              <span className="text-sm font-black text-clay-muted uppercase tracking-widest pl-2">Monthly</span>
              <button className="w-16 h-8 rounded-full bg-clay-accent relative cursor-pointer px-1 shadow-clayButtonHover transition-all hover:scale-105">
                <div className="w-6 h-6 rounded-full bg-white absolute right-1 top-1 shadow-sm transition-all"/>
              </button>
              <span className="text-sm font-black text-clay-foreground uppercase tracking-widest">Annually</span>
              <Badge variant="success" size="lg" className="ml-2 shadow-sm relative -top-0.5">Save 20%</Badge>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-12 px-4 max-w-6xl mx-auto relative z-20">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 border border-white shadow-clayCard flex flex-col hover:shadow-clayCardHover hover:-translate-y-2 transition-all duration-300 group">
              <h3 className="font-black text-3xl mb-3 text-clay-foreground tracking-tight drop-shadow-sm group-hover:text-clay-accent transition-colors">Free</h3>
              <p className="text-sm font-bold text-clay-muted mb-8 uppercase tracking-widest">Perfect for getting started</p>
              <div className="mb-8 relative">
                <span className="font-black text-6xl text-clay-foreground tracking-tighter drop-shadow-sm">$0</span>
              </div>
              <Button variant="secondary" size="lg" className="w-full mb-10 shadow-sm bg-white border-2 border-clay-muted/10 font-black text-clay-foreground group-hover:border-clay-accent transition-colors py-4" onClick={() => window.location.href = '/register'}>Start Free</Button>
              <div className="space-y-5 flex-1 pl-2">
                {[
                  "5 carousel posts/month",
                  "AI caption generator",
                  "Basic templates",
                  "1 Instagram account",
                  "7-day scheduling",
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 text-sm font-bold text-clay-muted items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="14" height="14" fill="none" stroke="#10B981" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[44px] p-10 shadow-clayDeep md:scale-105 flex flex-col relative text-white border-4 border-indigo-400/30 overflow-hidden transform-gpu z-10">
              <div className="absolute inset-0 bg-white/5 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.2),transparent)] mix-blend-overlay pointer-events-none"/>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <Badge variant="warning" size="lg" className="shadow-lg border-2 border-white/20 px-6 py-2">MOST POPULAR</Badge>
              </div>
              <h3 className="font-black text-3xl mb-3 mt-4 text-white drop-shadow-md tracking-tight">Pro</h3>
              <p className="text-sm font-bold text-blue-200 mb-8 uppercase tracking-widest drop-shadow-sm">For growing brands</p>
              <div className="mb-2 relative">
                <span className="font-black text-6xl text-white tracking-tighter drop-shadow-md">$23</span>
                <span className="text-blue-200 font-bold ml-2 text-lg uppercase tracking-widest">/mo</span>
              </div>
              <p className="text-xs font-bold text-blue-300 mb-8 uppercase tracking-widest">Billed $276 annually</p>
              <Button variant="secondary" size="lg" className="w-full mb-10 text-indigo-700 font-black bg-white shadow-clayButton hover:scale-105 transition-transform py-4 border-none" onClick={() => window.location.href = '/register?plan=pro'}>Start 14-Day Free Trial</Button>
              <div className="space-y-5 flex-1 pl-2 relative z-10">
                {[
                  "Unlimited posts",
                  "AI 30-day content calendar",
                  "Viral hook generator",
                  "Trend topic detection",
                  "3 Instagram accounts",
                  "Advanced analytics",
                  "Brand kit & voice trainer",
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 text-sm font-bold text-blue-50 items-start">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/30">
                      <svg width="14" height="14" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Agency */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 border border-white shadow-clayCard flex flex-col hover:shadow-clayCardHover hover:-translate-y-2 transition-all duration-300 group">
              <h3 className="font-black text-3xl mb-3 text-clay-foreground tracking-tight drop-shadow-sm group-hover:text-clay-accent transition-colors">Agency</h3>
              <p className="text-sm font-bold text-clay-muted mb-8 uppercase tracking-widest">Manage multiple clients</p>
              <div className="mb-2 relative">
                <span className="font-black text-6xl text-clay-foreground tracking-tighter drop-shadow-sm">$79</span>
                <span className="text-clay-muted font-bold ml-2 text-lg uppercase tracking-widest">/mo</span>
              </div>
              <p className="text-xs font-bold text-clay-muted mb-8 uppercase tracking-widest">Billed $948 annually</p>
              <Button variant="secondary" size="lg" className="w-full mb-10 shadow-sm bg-white border-2 border-clay-muted/10 font-black text-clay-foreground group-hover:border-clay-accent transition-colors py-4" onClick={() => window.location.href = '/register?plan=agency'}>Contact Sales</Button>
              <div className="space-y-5 flex-1 pl-2">
                <p className="font-black text-sm text-clay-foreground uppercase tracking-widest mb-6">Everything in Pro, plus:</p>
                {[
                  "Unlimited accounts",
                  "Multi-client workspace",
                  "Competitor analyzer",
                  "White-label reports",
                  "Dedicated account manager",
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 text-sm font-bold text-clay-muted items-start">
                    <div className="w-6 h-6 rounded-[8px] bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="14" height="14" fill="none" stroke="#4F46E5" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl border-t border-white pointer-events-none"/>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="font-black text-4xl mt-12 mb-16 text-center text-clay-foreground tracking-tight drop-shadow-sm">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "Is there a free trial for the Pro plan?", a: "Yes, you can try the Pro plan free for 14 days. No credit card required until the trial ends." },
                { q: "Do you post directly to Instagram?", a: "Yes, once you connect your Instagram Professional account via Meta OAuth, Lana can auto-publish your carousels at the scheduled time." },
                { q: "What happens if I go over my monthly limit?", a: "On the free plan, you will need to upgrade to Pro to publish more than 5 carousels in a month. Pro and Agency plans have unlimited posts." },
                { q: "Can I manage multiple brands?", a: "Yes, the Agency plan includes multi-client workspaces where you can set up isolated brand kits, voice trainers, and content calendars for unlimited clients." },
              ].map((faq, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl p-8 rounded-[24px] border border-white shadow-clayCard cursor-pointer hover:-translate-y-1 hover:shadow-clayCardHover transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-lg text-clay-foreground group-hover:text-clay-accent transition-colors drop-shadow-sm">{faq.q}</h4>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-clay-muted group-hover:text-clay-accent transition-colors group-hover:scale-110">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-bold text-clay-muted mt-4 leading-relaxed pr-8">{faq.a}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 mb-12 text-center p-10 bg-white/60 backdrop-blur-xl rounded-[40px] border border-white shadow-clayPressed">
              <h4 className="font-black text-2xl text-clay-foreground mb-3 drop-shadow-sm">Still have questions?</h4>
              <p className="text-sm font-bold text-clay-muted mb-8 uppercase tracking-widest max-w-sm mx-auto">Our team is here to help you build your Instagram strategy.</p>
              <Button variant="primary" size="lg" className="shadow-clayButton font-black w-full max-w-xs mx-auto">Contact Support</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
