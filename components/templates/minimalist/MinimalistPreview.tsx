import React from 'react';
import { RimberioSlideData, RimberioBrand } from '../rimberio/schema';

interface Props {
  slide: RimberioSlideData;
  brand: RimberioBrand;
  isSmall?: boolean;
}

const OrangeArrow = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FE4B17]">
    <path d="M10 40C30 40 50 30 70 15M70 15L60 10M70 15L75 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 45C35 45 55 55 85 70" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
  </svg>
);

const HandUnderline = () => (
  <svg width="400" height="20" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FE4B17]">
    <path d="M5 15C100 12 300 18 395 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const DashedLine = () => (
  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FE4B17] opacity-60">
    <path d="M10 80C60 80 120 20 190 20" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" />
    <path d="M170 10L190 20L180 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function MinimalistPreview({ slide, brand, isSmall = false }: Props) {
  const brandName = brand.logo.text || "YourBrand";
  const handle = `@${brandName.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <div 
      className="shrink-0 relative font-sans overflow-hidden flex justify-center items-center box-border select-none"
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: '#EAE2D5', // Paper/Cream background
        backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")`, // Subtle paper texture
      }}
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-[60px] box-border text-black uppercase font-bold tracking-tight">
        
        {/* Header */}
        <div className="flex justify-between items-start text-[32px] tracking-widest">
          <span className="font-extrabold">{brandName}</span>
          <span className="opacity-80">#branding</span>
        </div>

        {/* Dynamic Layouts */}
        <div className="flex-1 flex flex-col justify-center relative">
          
          {slide.layout === 'intro_card' && (
            <div className="flex flex-col gap-4 relative">
              <h1 className="text-[140px] leading-[0.9] font-black tracking-tighter text-left z-10 break-words">
                {slide.headline}
              </h1>
              <div className="h-6 w-[600px] -mt-2">
                <HandUnderline />
              </div>
              <div className="absolute right-0 bottom-[-100px] scale-150 rotate-[-10deg]">
                <DashedLine />
              </div>
            </div>
          )}

          {(slide.layout === 'text_left' || slide.layout === 'list_center') && (
            <div className="flex flex-col gap-8">
              <h1 className="text-[110px] leading-[1] font-black tracking-tighter">
                {slide.headline}
              </h1>
              <div className="relative mt-8">
                <div className="bg-[#FE4B17] p-8 pr-12 inline-block">
                   <p className="text-[44px] leading-[1.3] font-bold text-white normal-case max-w-[700px]">
                    {slide.body}
                  </p>
                </div>
                <div className="absolute -top-16 -left-12 rotate-[15deg]">
                  <OrangeArrow />
                </div>
              </div>
            </div>
          )}

          {slide.layout === 'text_center' && (
             <div className="flex flex-col items-center text-center gap-12">
               <h1 className="text-[120px] leading-[0.9] font-black tracking-tighter max-w-[900px]">
                {slide.headline}
              </h1>
              <div className="bg-[#FE4B17] p-8 px-12 block">
                 <p className="text-[44px] leading-[1.3] font-bold text-white normal-case max-w-[750px]">
                  {slide.body}
                </p>
              </div>
             </div>
          )}

          {slide.layout === 'cta_save' && (
            <div className="flex flex-col gap-8 relative">
               <h1 className="text-[120px] leading-[1] font-black tracking-tighter">
                {slide.headline}
              </h1>
              <div className="bg-[#FE4B17] p-8 pr-12 inline-block mt-4">
                 <p className="text-[44px] leading-[1.3] font-bold text-white normal-case max-w-[700px]">
                  {slide.body}
                </p>
              </div>
              {slide.cta && (
                <div className="mt-8 border-[6px] border-black p-6 px-12 self-start rounded-full">
                  <span className="text-[48px] font-black">{slide.cta}</span>
                </div>
              )}
               <div className="absolute right-10 bottom-0 rotate-[-45deg] scale-125">
                 <DashedLine />
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end text-[40px] font-black tracking-tight pt-10 border-t-2 border-black/10">
          <span className="text-[44px] lowecase font-medium tracking-normal text-black/60 pt-4">{handle}</span>
          <span className="opacity-80">2025</span>
        </div>
      </div>
    </div>
  );
}
