import React from 'react';
import { RimberioSlideData, RimberioBrand } from './schema';

interface Props {
  slide: RimberioSlideData;
  brand: RimberioBrand;
  isSmall?: boolean;
}

const Asterisk = ({ color }: { color: string }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className={color} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
  </svg>
);

const RLogo = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" className={color} stroke="currentColor" strokeWidth="6">
    <path d="M20 80V20h30c15 0 25 10 25 25s-10 25-25 25H20m30 0l20 30" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 70h30" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SlidePreview({ slide, brand, isSmall = false }: Props) {
  const renderHighlightedText = (text: string, highlightWord?: string, highlightColor?: string) => {
    if (!highlightWord) return text;
    const parts = text.split(new RegExp(`(${highlightWord})`, 'gi'));
    return parts.map((part, i) => {
      if (part.toLowerCase() === highlightWord.toLowerCase()) {
        return (
          <span key={i} className="relative inline-block px-2 whitespace-nowrap">
            <span className="relative z-10">{part}</span>
            <svg className="absolute inset-0 w-full h-full -z-10 animate-fade-in" style={{ color: highlightColor }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M5,50 C10,10 90,10 95,50 C90,90 10,90 5,50 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        );
      }
      return part;
    });
  };

  const getThemeColors = () => {
    switch(slide.theme) {
      case 'primary': return { bg: brand.colors.primary, text: brand.colors.light, inverted: brand.colors.dark };
      case 'dark': return { bg: brand.colors.dark, text: brand.colors.light, inverted: brand.colors.primary };
      case 'light': default: return { bg: brand.colors.light, text: brand.colors.dark, inverted: brand.colors.primary };
    }
  };

  const colors = getThemeColors();

  return (
    <div 
      className="shrink-0 relative font-sans overflow-hidden flex justify-center items-center box-border"
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: colors.bg,
      }}
    >
      <div 
        className="absolute inset-0 flex flex-col justify-between p-[80px] box-border"
        style={{
          width: 1080,
          height: 1080,
          color: colors.text
        }}
      >
        {slide.layout === 'intro_card' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between box-border overflow-hidden">
            <div className="flex justify-between items-center text-[36px] font-medium tracking-tight mb-8 shrink-0 opacity-50" style={{ width: 920 }}>
              <span>Slide {slide.slideNum}</span>
            </div>

            <div className="flex-1 flex justify-center items-center min-h-0 box-border relative" style={{ width: 920 }}>
              <div 
                className="inner-card mx-auto bg-[#F4F5F6] flex flex-col items-center justify-center text-center shadow-2xl relative z-10 gap-[24px] box-border overflow-hidden"
                style={{
                  width: '90%',
                  maxWidth: '920px',
                  borderRadius: '32px',
                  borderTopLeftRadius: '120px',
                  padding: '50px 40px',
                  margin: '0 auto',
                  boxSizing: 'border-box'
                }}
              >
                <h1 className="text-[100px] leading-[1.1] text-[#0A0A0A] font-black tracking-tighter shrink-0 min-h-min break-words [overflow-wrap:anywhere] min-w-0 px-4 whitespace-normal" style={{ maxWidth: '100%' }}>{slide.headline}</h1>
                <p className="text-[44px] leading-[1.5] text-[#111] shrink-0 min-h-min break-words [overflow-wrap:anywhere] min-w-0 px-4 whitespace-normal" style={{ maxWidth: '100%' }}>{slide.body}</p>
              </div>
            </div>

            <div className="flex justify-between items-end pb-4 mt-8 shrink-0" style={{ width: 920 }}>
              <Asterisk color="text-white" />
              <RLogo color="text-white" />
            </div>
          </div>
        )}

        {slide.layout === 'text_left' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full">
            <div className="flex justify-between items-start">
              <Asterisk color="currentColor" />
            </div>

            <div className="flex-1 mt-[40px] flex flex-col justify-center gap-[24px]">
              <h1 className="text-[110px] leading-[1.2] tracking-tighter font-black max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.headline}
              </h1>
              <p className="text-[50px] leading-[1.5] max-w-[820px] font-medium opacity-90 shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.body}
              </p>
            </div>

            <div className="flex justify-between items-center pb-4 text-[42px] font-bold">
              <div className="flex items-center gap-4">
                <RLogo color="currentColor" />
                <span>{slide.cta || brand.logo.text}</span>
              </div>
              <span className="opacity-50">0{slide.slideNum}</span>
            </div>
          </div>
        )}

        {slide.layout === 'list_center' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full items-center text-center">
            <div className="flex-1 flex flex-col justify-center items-center gap-[24px] w-full max-w-[820px]">
              <h1 className="text-[100px] leading-[1.2] font-black tracking-tighter max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.headline}</h1>
              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.body}</p>
            </div>

            <div className="w-full flex justify-between items-end pb-4">
              <RLogo color="currentColor" />
              <span className="text-[40px] font-bold opacity-50">0{slide.slideNum}</span>
            </div>
          </div>
        )}

        {slide.layout === 'text_center' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full">
            <div className="flex justify-between items-start">
              <Asterisk color="currentColor" />
              <RLogo color="currentColor" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center gap-[24px]">
              <h1 className="text-[130px] leading-[1.2] tracking-tighter font-black max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.headline}
              </h1>
              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.body}
              </p>
            </div>

            <div className="w-full flex justify-end pb-10 pr-10">
              <span className="text-[40px] font-bold opacity-50">0{slide.slideNum}</span>
            </div>
          </div>
        )}

        {slide.layout === 'cta_save' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full">
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-[24px]">
              <h1 className="text-[110px] leading-[1.2] tracking-tighter font-black max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.headline}
              </h1>
              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.body}
              </p>

              {slide.cta && (
                <div className="mt-[24px] mb-[24px] border-[4px] border-current bg-transparent rounded-[60px] px-[60px] py-[30px] shrink-0 max-w-[820px]">
                  <span className="text-[56px] font-black shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.cta}</span>
                </div>
              )}
            </div>

            <div className="w-full flex justify-between items-end pb-4">
              <RLogo color="currentColor" />
              <span className="text-[40px] font-bold opacity-50">0{slide.slideNum}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
