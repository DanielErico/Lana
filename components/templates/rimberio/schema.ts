export type RimberioTheme = "primary" | "light" | "dark";
export type SlideLayout = "intro_card" | "text_left" | "list_center" | "text_center" | "cta_save";

export interface RimberioBrand {
  colors: {
    primary: string;
    light: string;
    dark: string;
  };
  logo: {
    text: string;
    iconUrl?: string;
  };
  website?: string; // Optional: used by AI to scrape brand context
  info?: {
    audience?: string;
    tone?: string;
    services?: string;
    mission?: string;
  };
}

export interface RimberioSlideData {
  id: string;
  headline: string;
  body: string;
  cta: string;
  hasImage: boolean;
  slideNum: number;
  theme: RimberioTheme;
  layout: SlideLayout;
}

export interface RimberioTemplateData {
  id: string;
  brand: RimberioBrand;
  slides: RimberioSlideData[];
}
