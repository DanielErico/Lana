import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import PricingSection from "@/components/sections/PricingSection";
import CtaBanner from "@/components/sections/CtaBanner";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <main className="bg-transparent relative z-10">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
