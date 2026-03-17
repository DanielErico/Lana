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
    <section id="pricing" className="py-24 px-4 bg-surface-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-slate-500">Start free. Scale as you grow. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative rounded-2xl p-6 flex flex-col
                ${plan.highlight
                  ? "bg-gradient-to-br from-blue-700 to-purple-700 text-white shadow-2xl scale-105"
                  : "bg-white border border-slate-200 shadow-card text-slate-900"
                }
              `}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="warning" className="px-3 py-1 text-xs font-bold shadow-md">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-heading font-bold text-xl mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-blue-100" : "text-slate-500"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-end gap-1">
                  <span className={`font-heading font-black text-5xl ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className={`text-sm mb-2 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>
                      /mo
                    </span>
                  )}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className={`text-xs mt-1 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>
                    Billed annually (save 20%)
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={plan.highlight ? "text-green-300" : "text-blue-600"}>
                      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.15"/>
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={plan.highlight ? "text-blue-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.highlight ? "secondary" : plan.ctaVariant}
                  size="lg"
                  className={`w-full ${plan.highlight ? "bg-white text-blue-700 hover:bg-blue-50 font-bold" : ""}`}
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
