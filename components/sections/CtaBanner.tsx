import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-12 text-center shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl"/>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-300 blur-3xl"/>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              No credit card required
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
              Ready to transform your Instagram?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join 10,000+ brands already growing with AI-powered carousel content. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="xl"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg"
                  rightIcon={
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="xl" className="border-2 border-white/50 text-white hover:bg-white/10">
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
