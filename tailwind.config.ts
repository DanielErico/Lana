import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          canvas: "#F4F1FA",
          foreground: "#332F3A",
          muted: "#635F69",
          cardBg: "rgba(255, 255, 255, 0.7)",
          accent: {
            DEFAULT: "#7C3AED", // Vivid Violet
            alt: "#DB2777", // Hot Pink
            info: "#0EA5E9", // Sky Blue
            success: "#10B981", // Emerald
            warning: "#F59E0B", // Amber
          }
        },
        // Legacy colors kept for backwards compatibility during refactor
        brand: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#1E40AF", 800: "#1e3a8a", 900: "#1e3048" },
        purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7C3AED", 800: "#6d28d9", 900: "#4c1d95" },
        accent: { DEFAULT: "#F59E0B", light: "#FDE68A", dark: "#D97706" },
        surface: { DEFAULT: "#ffffff", secondary: "#F8FAFC", tertiary: "#F1F5F9", border: "#E2E8F0" },
        text: { primary: "#1E293B", secondary: "#475569", muted: "#94A3B8", inverse: "#ffffff" },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-nunito)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      boxShadow: {
        // High-Fidelity Clay Shadows
        "clayDeep": "30px 30px 60px #cdc6d9, -30px -30px 60px #ffffff, inset 10px 10px 20px rgba(139, 92, 246, 0.05), inset -10px -10px 20px rgba(255, 255, 255, 0.8)",
        "clayCard": "16px 16px 32px rgba(160, 150, 180, 0.2), -10px -10px 24px rgba(255, 255, 255, 0.9), inset 6px 6px 12px rgba(139, 92, 246, 0.03), inset -6px -6px 12px rgba(255, 255, 255, 1)",
        "clayCardHover": "20px 20px 40px rgba(160, 150, 180, 0.25), -12px -12px 28px rgba(255, 255, 255, 1), inset 8px 8px 16px rgba(139, 92, 246, 0.04), inset -8px -8px 16px rgba(255, 255, 255, 1)",
        "clayButton": "12px 12px 24px rgba(139, 92, 246, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(0, 0, 0, 0.1)",
        "clayButtonHover": "16px 16px 32px rgba(139, 92, 246, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(255, 255, 255, 0.5), inset -4px -4px 8px rgba(0, 0, 0, 0.1)",
        "clayPressed": "inset 10px 10px 20px #d9d4e3, inset -10px -10px 20px #ffffff",
        
        // Legacy shadows
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px -4px rgba(0,0,0,0.10), 0 4px 8px -4px rgba(0,0,0,0.06)",
        sidebar: "1px 0 0 0 #E2E8F0",
        topbar: "0 1px 0 0 #E2E8F0",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #f0fdf4 100%)",
        "brand-gradient": "linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)",
        "card-gradient": "linear-gradient(135deg, #ffffff 0%, #F8FAFC 100%)",
        "cta-gradient": "linear-gradient(135deg, #4f46e5 0%, #7C3AED 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        // Clay animations
        "clay-float": "clay-float 8s ease-in-out infinite",
        "clay-float-delayed": "clay-float-delayed 10s ease-in-out infinite",
        "clay-float-slow": "clay-float-slow 12s ease-in-out infinite",
        "clay-breathe": "clay-breathe 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "clay-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "clay-float-delayed": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(-2deg)" },
        },
        "clay-float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        "clay-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        }
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
        "super": "48px",
        "hyper": "60px",
      },
    },
  },
  plugins: [],
};

export default config;
