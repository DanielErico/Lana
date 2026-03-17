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
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#1E40AF",
          800: "#1e3a8a",
          900: "#1e3048",
        },
        purple: {
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7C3AED",
          800: "#6d28d9",
          900: "#4c1d95",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FDE68A",
          dark: "#D97706",
        },
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#F8FAFC",
          tertiary: "#F1F5F9",
          border: "#E2E8F0",
        },
        text: {
          primary: "#1E293B",
          secondary: "#475569",
          muted: "#94A3B8",
          inverse: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px -4px rgba(0,0,0,0.10), 0 4px 8px -4px rgba(0,0,0,0.06)",
        sidebar: "1px 0 0 0 #E2E8F0",
        topbar: "0 1px 0 0 #E2E8F0",
        "glow-blue": "0 0 20px 4px rgba(99,102,241,0.15)",
        "glow-purple": "0 0 20px 4px rgba(124,58,237,0.15)",
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
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
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
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
