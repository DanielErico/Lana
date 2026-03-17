import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="py-24 px-4 relative z-10 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-12 md:p-16 text-center shadow-clayDeep border border-white/20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white blur-3xl animate-clay-float"/>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-300 blur-3xl animate-clay-float-delayed"/>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm"/>
              No credit card required
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
              Ready to transform your Instagram?
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
              Join 10,000+ brands already growing with AI-powered carousel content. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  variant="secondary"
                  className="w-full bg-white text-purple-700 hover:bg-slate-50 font-black shadow-clayButton"
                  rightIcon={
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full border-2 border-white/40 text-white hover:bg-white/10 font-bold backdrop-blur-sm">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
