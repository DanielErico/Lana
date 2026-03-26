import React from 'react';
import { RimberioSlideData, RimberioBrand } from '../rimberio/schema';

interface Props {
  slide: RimberioSlideData;
  brand: RimberioBrand;
  isSmall?: boolean;
}

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function SerenePreview({ slide, brand, isSmall = false }: Props) {
  const brandName = brand.logo.text || "YourBrand";
  const handle = `@${brandName.toLowerCase().replace(/\s+/g, '')}`;
  
  // Use the brand's fontFamily if set, otherwise default to a classic serif for this theme
  const fontClass = brand.fontFamily 
    ? `font-${brand.fontFamily.toLowerCase()}` 
    : 'font-serif'; // fallback to standard serif or --font-playfair

  return (
    <div 
      className={`shrink-0 relative overflow-hidden flex justify-center items-center box-border select-none ${fontClass}`}
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: '#3D3228', // Deep earthy brown from image
        color: '#FDF8F1', // Off-white/Cream text
        fontFamily: brand.fontFamily ? `var(--font-${brand.fontFamily.toLowerCase()})` : 'var(--font-playfair), serif'
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-[80px] box-border">
        
        {/* Header */}
        <div className="flex justify-between items-center text-[28px] tracking-[0.2em] font-medium uppercase opacity-80">
          <span>{handle}</span>
          <span>0{slide.slideNum}</span>
        </div>

        {/* Dynamic Layouts */}
        <div className="flex-1 flex flex-col justify-center gap-12">
          
          {slide.layout === 'intro_card' && (
            <div className="flex flex-col gap-8">
              <h1 className="text-[140px] leading-[1.05] italic font-normal tracking-tight break-words">
                {slide.headline}
              </h1>
              <p className="text-[48px] leading-[1.4] font-light max-w-[850px] opacity-90 normal-case">
                {slide.body}
              </p>
            </div>
          )}

          {(slide.layout === 'text_left' || slide.layout === 'list_center' || slide.layout === 'text_center') && (
            <div className={`flex flex-col gap-10 ${slide.layout === 'text_left' ? 'text-left' : 'text-center items-center'}`}>
              <h1 className="text-[120px] leading-[1.1] font-normal tracking-tight max-w-[950px] italic">
                {slide.headline}
              </h1>
              <p className="text-[52px] leading-[1.6] font-light max-w-[850px] opacity-90 normal-case">
                {slide.body}
              </p>
            </div>
          )}

          {slide.layout === 'cta_save' && (
             <div className="flex flex-col items-center text-center gap-12">
               <h1 className="text-[120px] leading-[1.1] italic font-normal tracking-tight">
                {slide.headline}
              </h1>
              <p className="text-[48px] leading-[1.6] font-light max-w-[850px] opacity-90 normal-case">
                {slide.body}
              </p>
              {slide.cta && (
                <div className="mt-8 border-[2px] border-[#FDF8F1]/30 p-8 px-16 rounded-full flex items-center gap-4 hover:bg-[#FDF8F1]/5 transition-colors">
                  <span className="text-[42px] font-medium uppercase tracking-widest">{slide.cta}</span>
                  <ShareIcon />
                </div>
              )}
             </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-8 border-t border-[#FDF8F1]/10">
          <div className="flex items-center gap-4 text-[24px] uppercase tracking-widest font-bold">
            <ShareIcon />
            <span>Share</span>
          </div>
          <div className="flex items-center gap-4 text-[24px] uppercase tracking-widest font-bold">
            <SaveIcon />
            <span>Save</span>
          </div>
        </div>
      </div>
    </div>
  );
}
