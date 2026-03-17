export type RimberioTheme = "primary" | "light" | "dark";

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
}

export type SlideType = 'intro_card' | 'text_left' | 'list_center' | 'text_center' | 'cta_save';

export interface BaseSlide {
  id: string;
  type: SlideType;
  theme: RimberioTheme;
}

export interface IntroCardSlide extends BaseSlide {
  type: 'intro_card';
  topLeftText: string;
  topRightText: string;
  cardHeading: string;
  cardSubheading: string;
  searchPlaceholder: string;
  cardFooter: string;
}

export interface TextLeftSlide extends BaseSlide {
  type: 'text_left';
  heading: string;
  highlightWord: string;
  body: string;
  badgeText: string;
  footerLeft: string;
  footerRight: string;
}

export interface ListCenterSlide extends BaseSlide {
  type: 'list_center';
  heading: string;
  body: string;
  listItems: Array<{ icon: "clock" | "chart" | "check"; textLeft: string; textRight: string }>;
}

export interface TextCenterSlide extends BaseSlide {
  type: 'text_center';
  heading: string;
  body: string;
  highlightText?: string;
  nextPageText: string;
}

export interface CTASaveSlide extends BaseSlide {
  type: 'cta_save';
  heading: string;
  highlightWord: string;
  bodyTop: string;
  badgeText: string;
  bodyBottom: string;
}

export type RimberioSlideData = IntroCardSlide | TextLeftSlide | ListCenterSlide | TextCenterSlide | CTASaveSlide;

export interface RimberioTemplateData {
  id: string;
  brand: RimberioBrand;
  slides: RimberioSlideData[];
}
