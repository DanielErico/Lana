"use client";
import React from 'react';
import RimberioSlide from '@/components/templates/rimberio/RimberioSlide';
import { RimberioTemplateData } from '@/components/templates/rimberio/schema';

const previewData: RimberioTemplateData = {
  id: "rimberio-001",
  brand: {
    colors: { primary: "#FE4B17", light: "#F4F5F6", dark: "#0A0A0A" },
    logo: { text: "Rimberio" }
  },
  slides: [
    {
      type: "intro_card",
      theme: "primary",
      id: "1",
      topLeftText: "Need help?",
      topRightText: "Drop us a DM",
      cardHeading: "Ready to Try It?",
      cardSubheading: "Start simple. Create 3-5 slides, focus on value, and post consistently.",
      searchPlaceholder: "Need help? Drop us a DM",
      cardFooter: "we'd love to help you get started."
    },
    {
      type: "text_left",
      theme: "light",
      id: "2",
      heading: "Here's Why Posting Carousels Can Boost Your Content Game",
      highlightWord: "Boost",
      body: "If you're not using carousels yet... you might be missing out.",
      badgeText: "Swipe to learn",
      footerLeft: "Rimberio",
      footerRight: "2040"
    },
    {
      type: "list_center",
      theme: "primary",
      id: "3",
      heading: "Carousels Keep People on Your Post Longer",
      body: "Each swipe means more time spent on your content and the algorithm loves that.",
      listItems: [
        { icon: "clock", textLeft: "more time =", textRight: "more reach" },
        { icon: "check", textLeft: "=", textRight: "more results" }
      ]
    },
    {
      type: "text_center",
      theme: "dark",
      id: "4",
      heading: "Break Down Ideas, Slide by Slide",
      body: "Carousels are perfect for sharing tips, steps, or stories without cluttering one single image.\n\nYou keep it clean and clear.",
      highlightText: "clean and clear.",
      nextPageText: "next page"
    },
    {
      type: "cta_save",
      theme: "light",
      id: "5",
      heading: "People Love to Save Carousels",
      highlightWord: "Love",
      bodyTop: "Carousel posts tend to get more saves, which tells the platform:",
      badgeText: "“This content is valuable”",
      bodyBottom: "That's how you build trust, visibility, and authority over time."
    }
  ]
};

export default function TemplatePreview() {
  return (
    <div className="min-h-screen bg-slate-100 p-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-black mb-2 text-slate-800 tracking-tight">Rimberio Engine Preview</h1>
        <p className="text-slate-500 mb-10 font-semibold">1080x1080 layouts dynamically scaled to fit. Fully programmable via JSON.</p>
        
        <div className="flex flex-wrap gap-10 items-start justify-center">
          {previewData.slides.map((slide, i) => (
            <div key={slide.id} className="flex flex-col items-center">
              <span className="mb-4 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">Slide {i + 1} • {slide.type}</span>
              <div className="shadow-2xl rounded-2xl overflow-hidden ring-4 ring-white">
                <RimberioSlide slide={slide} brand={previewData.brand} scale={0.4} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
