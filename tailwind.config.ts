import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark dominants
        cape: {
          DEFAULT: "#0A2536",
          900: "#06182A",
          800: "#0A2536",
          700: "#102E42",
          600: "#1A3D54",
        },
        // Mid blue — borders, secondary accents on dark
        obsidian: {
          DEFAULT: "#33566D",
          400: "#4E6F86",
          300: "#6E8BA0",
        },
        // Light accent
        mint: {
          DEFAULT: "#DAF6EF",
          dark: "#B8E5DA",
        },
        // Off-white
        porcelain: {
          DEFAULT: "#F3FAFF",
          warm: "#E9F1F8",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.2rem, 8vw, 7rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.8rem, 6.5vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.2rem, 4.5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.6rem, 2.8vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        eyebrow: ["0.72rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      letterSpacing: {
        wider: "0.12em",
        widest: "0.18em",
      },
      borderRadius: {
        DEFAULT: "4px",
        md: "6px",
        lg: "10px",
        pill: "999px",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      backdropBlur: {
        xl: "24px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "bounce-y": "bounceY 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
