import React from 'react';
import { RimberioSlideData, RimberioBrand } from './schema';

interface Props {
  slide: RimberioSlideData;
  brand: RimberioBrand;
  scale?: number;
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

export default function RimberioSlide({ slide, brand, scale = 1 }: Props) {
  // Utility to split headline and wrap HIGHLIGHT WORD in an SVG circle marker
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
      className="shrink-0 relative font-sans overflow-hidden"
      style={{
        width: 1080 * scale,
        height: 1080 * scale,
        backgroundColor: colors.bg,
      }}
    >
      <div 
        className="absolute inset-0 flex flex-col justify-between p-[80px]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: 1080,
          height: 1080,
          color: colors.text
        }}
      >
        {/* SLIDE: INTRO CARD */}
        {slide.type === 'intro_card' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between">
            <div className="flex justify-between items-center text-[36px] font-medium tracking-tight">
              <span>{slide.topLeftText}</span>
              <span>{slide.topRightText}</span>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <div className="w-[840px] bg-[#F4F5F6] rounded-[60px] p-[60px] flex flex-col items-center justify-center text-center shadow-2xl relative z-10 gap-[24px]">
                <h1 className="text-[100px] leading-[1.2] text-[#0A0A0A] font-black tracking-tighter max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.cardHeading}</h1>
                <p className="text-[44px] leading-[1.5] text-[#111] max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.cardSubheading}</p>
                
                <div className="flex items-center w-full max-w-[640px] border-[3px] border-[#0A0A0A] rounded-[80px] p-3 pl-12 bg-transparent justify-between mt-[16px]">
                  <span className="text-[40px] text-[#0A0A0A] shrink-0 overflow-hidden line-clamp-1 break-all">{slide.searchPlaceholder}</span>
                  <div className="h-[80px] w-[80px] rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: brand.colors.primary }}>
                    <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </div>
                </div>

                <p className="text-[36px] text-[#222] shrink-0 mt-[16px]">{slide.cardFooter}</p>
              </div>
            </div>

            <div className="flex justify-between items-end pb-4">
              <Asterisk color="text-white" />
              <RLogo color="text-white" />
            </div>
          </div>
        )}

        {/* SLIDE: TEXT LEFT */}
        {slide.type === 'text_left' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full">
            <div className="flex justify-between items-start">
              <Asterisk color="text-[#FE4B17]" />
            </div>

            <div className="flex-1 mt-[40px] flex flex-col justify-center gap-[24px]">
              <h1 className="text-[110px] leading-[1.2] tracking-tighter font-black max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {renderHighlightedText(slide.heading, slide.highlightWord, brand.colors.primary)}
              </h1>
              <p className="text-[50px] leading-[1.5] max-w-[820px] font-medium text-[#222] opacity-90 shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.body}
              </p>
              
              <div className="mt-[40px] self-start inline-block border-[4px] border-[#0A0A0A] rounded-[60px] px-[50px] py-[24px] shrink-0">
                <span className="text-[48px] font-black">{slide.badgeText}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pb-4 text-[42px] font-bold">
              <div className="flex items-center gap-4 text-[#FE4B17]">
                <RLogo color="text-[#FE4B17]" />
                <span>{slide.footerLeft}</span>
              </div>
              <span>{slide.footerRight}</span>
            </div>
          </div>
        )}

        {/* SLIDE: LIST CENTER */}
        {slide.type === 'list_center' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full items-center text-center text-[#0A0A0A]">
            <div className="flex-1 flex flex-col justify-center items-center gap-[24px] w-full max-w-[820px]">
              <h1 className="text-[100px] leading-[1.2] font-black tracking-tighter max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.heading}</h1>
              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.body}</p>

              <div className="flex flex-col items-center justify-center gap-[24px] w-full mt-[32px] shrink-0">
                {slide.listItems.map((item, idx) => (
                  <div key={idx} className="bg-[#0A0A0A] text-white rounded-[60px] px-[50px] py-[30px] flex items-center justify-center gap-6 shadow-2xl skew-x-[-2deg] hover:skew-x-0 transition-transform w-[820px] max-w-full">
                    <div className="w-[60px] h-[60px] rounded-full border-[4px] border-[#FE4B17] flex items-center justify-center shrink-0 bg-transparent">
                      <svg width="34" height="34" fill="none" stroke="#FE4B17" strokeWidth="4" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-[48px] font-black tracking-tight shrink-0">{item.textLeft}</span>
                    <span className="text-[48px] font-bold text-white/80 shrink-0">{item.textRight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-between items-end pb-4">
              <RLogo color="text-white" />
              <div className="flex flex-col items-center relative">
                <svg width="120" height="120" viewBox="0 0 100 100" className="absolute -top-[70px] -right-[10px] origin-center -rotate-12">
                  <path id="curve" d="M 10 50 A 40 40 0 1 1 90 50" fill="transparent" />
                  <text className="text-[16px] font-bold tracking-widest uppercase" fill="black">
                    <textPath href="#curve">next page</textPath>
                  </text>
                </svg>
                <div className="w-[70px] h-[70px] rounded-full bg-transparent flex items-center justify-center border-[4px] border-transparent">
                  <svg width="50" height="50" fill="none" stroke="white" strokeWidth="6" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE: TEXT CENTER */}
        {slide.type === 'text_center' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full bg-[#0A0A0A] text-white">
            <div className="flex justify-between items-start">
              <Asterisk color="text-[#FE4B17]" />
              <RLogo color="text-white" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center gap-[24px]">
              <h1 className="text-[130px] leading-[1.2] tracking-tighter font-black max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.heading}
              </h1>
              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.body.split(slide.highlightText || "").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-[#FE4B17] font-black">{slide.highlightText}</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="w-full flex justify-end pb-10 pr-10">
              <div className="border-[3px] border-[#FE4B17] rounded-full px-[40px] py-[20px] flex items-center gap-[60px]">
                <svg width="60" height="20" fill="none" stroke="#FE4B17" strokeWidth="6" viewBox="0 0 60 20"><path d="M0 10h55M45 2l12 8-12 8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-[36px] font-medium text-[#FE4B17]">{slide.nextPageText}</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE: CTA SAVE */}
        {slide.type === 'cta_save' && (
          <div className="absolute inset-0 flex flex-col p-[80px] justify-between h-full bg-[#F4F5F6] text-[#0A0A0A]">
            <div className="absolute right-[80px] top-[80px] w-[140px] h-[140px]">
                <svg width="140" height="140" viewBox="0 0 100 100" className="origin-center rotate-12">
                  <path id="curve2" d="M 10 50 A 40 40 0 1 1 90 50" fill="transparent" />
                  <text className="text-[15px] font-bold tracking-widest uppercase" fill="black">
                    <textPath href="#curve2">next page</textPath>
                  </text>
                  <path d="M30 60L70 40M55 35l15 5-5 15" stroke="#FE4B17" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center gap-[24px]">
              <h1 className="text-[110px] leading-[1.2] tracking-tighter font-black max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {renderHighlightedText(slide.heading, slide.highlightWord, brand.colors.primary)}
              </h1>
              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.bodyTop}
              </p>

              <div className="mt-[24px] mb-[24px] border-[4px] border-[#0A0A0A] bg-transparent rounded-[60px] px-[60px] py-[30px] shrink-0 max-w-[820px]">
                <span className="text-[56px] font-black text-[#FE4B17] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">{slide.badgeText}</span>
              </div>

              <p className="text-[48px] leading-[1.5] font-medium max-w-[820px] shrink-0 min-h-min break-words [overflow-wrap:anywhere]">
                {slide.bodyBottom}
              </p>
            </div>

            <div className="w-full flex justify-between items-end pb-4">
              <RLogo color="text-[#FE4B17]" />
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#FE4B17">
                <path d="M5 3v20l7-5 7 5V3a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
