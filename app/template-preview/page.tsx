"use client";
import React from 'react';
import SlidePreview from '@/components/templates/rimberio/SlidePreview';
import { RimberioSlideData, RimberioBrand } from '@/components/templates/rimberio/schema';

const brand: RimberioBrand = {
  colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
  logo: { text: "Rimberio" }
};

const slides: RimberioSlideData[] = [
  {
    id: "1",
    slideNum: 1,
    layout: "intro_card",
    theme: "primary",
    headline: "Ready to Try It?",
    body: "Start simple. Create 3-5 slides, focus on value, and post consistently.",
    cta: "Need help? Drop us a DM",
    hasImage: false
  },
  {
    id: "2",
    slideNum: 2,
    layout: "text_left",
    theme: "light",
    headline: "Here's Why Posting Carousels Can Boost Your Content Game",
    body: "If you're not using carousels yet... you might be missing out.",
    cta: "Swipe to learn",
    hasImage: false
  },
  {
    id: "3",
    slideNum: 3,
    layout: "list_center",
    theme: "primary",
    headline: "Carousels Keep People on Your Post Longer",
    body: "Each swipe means more time spent on your content and the algorithm loves that.",
    cta: "",
    hasImage: false
  },
  {
    id: "4",
    slideNum: 4,
    layout: "text_center",
    theme: "dark",
    headline: "Break Down Ideas, Slide by Slide",
    body: "Carousels are perfect for sharing tips, steps, or stories without cluttering one single image.\n\nYou keep it clean and clear.",
    cta: "",
    hasImage: false
  },
  {
    id: "5",
    slideNum: 5,
    layout: "cta_save",
    theme: "light",
    headline: "People Love to Save Carousels",
    body: "Carousel posts tend to get more saves, which tells the platform:\nThat's how you build trust, visibility, and authority over time.",
    cta: "Save for Later",
    hasImage: false
  }
];

export default function TemplatePreview() {
  return (
    <div className="min-h-screen bg-slate-100 p-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-black mb-2 text-slate-800 tracking-tight">Rimberio Engine Preview</h1>
        <p className="text-slate-500 mb-10 font-semibold">1080x1080 layouts dynamically scaled to fit. Fully programmable via JSON.</p>
        
        <div className="flex flex-wrap gap-10 items-start justify-center">
          {slides.map((slide, i) => (
            <div key={slide.id} className="flex flex-col items-center">
              <span className="mb-4 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">Slide {i + 1} • {slide.layout}</span>
              <div className="shadow-2xl rounded-2xl overflow-hidden ring-4 ring-white w-[432px] h-[432px] relative">
                <div 
                  className="absolute top-0 left-0"
                  style={{
                    width: 1080,
                    height: 1080,
                    transformOrigin: 'top left',
                    transform: 'scale(0.4)'
                  }}
                >
                   <SlidePreview slide={slide} brand={brand} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
