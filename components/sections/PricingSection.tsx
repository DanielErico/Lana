import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    badge: null,
    desc: "Perfect for getting started and testing the waters.",
    cta: "Start Free",
    ctaVariant: "secondary" as const,
    href: "/register",
    features: [
      "5 carousel posts/month",
      "AI caption generator",
      "Basic templates",
      "1 Instagram account",
      "7-day scheduling",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 23 },
    badge: "Most Popular",
    desc: "For growing brands serious about Instagram.",
    cta: "Start Pro Trial",
    ctaVariant: "gradient" as const,
    href: "/register?plan=pro",
    features: [
      "Unlimited posts",
      "AI content calendar (30-day)",
      "Viral hook generator",
      "Trend topic detection",
      "3 Instagram accounts",
      "Advanced analytics",
      "Brand kit & voice trainer",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Agency",
    price: { monthly: 99, annual: 79 },
    badge: null,
    desc: "Manage multiple clients with full control.",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    href: "/register?plan=agency",
    features: [
      "Everything in Pro",
      "Unlimited accounts",
      "Multi-client workspace",
      "Competitor analyzer",
      "White-label reports",
      "Engagement prediction AI",
      "Admin fraud dashboard",
      "Dedicated account manager",
    ],
    highlight: false,
  },
];

export default function PricingSection({ annual = false }: { annual?: boolean }) {
  return (
    <section id="pricing" className="py-24 px-4 relative z-10 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-clay-foreground mb-6 tracking-tight">
            Simple, transparent{" "}
            <span className="clay-text-gradient">pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-clay-muted font-medium">Start free. Scale as you grow. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative rounded-[40px] p-8 flex flex-col transition-all duration-300
                ${plan.highlight
                  ? "bg-gradient-to-b from-clay-accent to-purple-600 text-white shadow-clayDeep scale-105 z-10 hover:scale-110"
                  : "bg-white/80 backdrop-blur-xl border border-white shadow-clayCard text-clay-foreground hover:-translate-y-2 hover:shadow-clayCardHover"
                }
              `}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-clay-breathe">
                  <Badge variant="warning" size="md" className="shadow-md">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`font-black text-2xl mb-2 tracking-tight ${plan.highlight ? "text-white" : "text-clay-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm font-medium h-10 ${plan.highlight ? "text-white/80" : "text-clay-muted"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-end gap-1 mt-6">
                  <span className={`font-black text-5xl tracking-tighter ${plan.highlight ? "text-white" : "text-clay-foreground"}`}>
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className={`text-base font-bold pb-1 ${plan.highlight ? "text-white/60" : "text-clay-muted/60"}`}>
                      /mo
                    </span>
                  )}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className={`text-xs font-bold mt-2 tracking-wide uppercase ${plan.highlight ? "text-white/60" : "text-clay-accent"}`}>
                    Billed annually (save 20%)
                  </p>
                )}
              </div>

              <ul className="space-y-4 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-white/20' : 'bg-emerald-100'}`}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={plan.highlight ? "text-white" : "text-emerald-600"}>
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={plan.highlight ? "text-white/90" : "text-clay-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="w-full mt-auto">
                <Button
                  variant={plan.highlight ? "secondary" : plan.ctaVariant}
                  size="xl"
                  className={`w-full ${plan.highlight ? "bg-white text-clay-accent shadow-clayButton hover:bg-slate-50 font-black" : "font-black"}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
