
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        sans: ["Abel", "Helvetica", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        pixel: {
          purple: "#a379f0",
          pink: "#d95cff",
          blue: "#6d6dfb",
          magenta: "#e352c9",
          dark: "#1A1F2C",
          light: "#f9f9ed",
        },
      },
      backgroundImage: {
        "pixel-gradient": "linear-gradient(to right, #6d6dfb, #e352c9)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        load: {
          "0%": { background: "transparent" },
          "100%": { background: "linear-gradient(to right, #6d6dfb, #e352c9)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "title-change": {
          "0%, 33%": { transform: "translateY(0)" },
          "33.1%, 66%": { transform: "translateY(-100%)" },
          "66.1%, 100%": { transform: "translateY(-200%)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "rotate-carousel": {
          from: { transform: "perspective(1000px) rotateX(-16deg) rotateY(0deg)" },
          to: { transform: "perspective(1000px) rotateX(-16deg) rotateY(360deg)" },
        },
        expand: {
          from: { height: "64px" },
          to: { height: "100vh" },
        },
        collapse: {
          from: { height: "100vh" },
          to: { height: "64px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        load: "load 0.4s forwards",
        blink: "blink 1s infinite",
        float: "float 6s ease-in-out infinite",
        "title-change": "title-change 9s infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "rotate-carousel": "rotate-carousel 20s linear infinite",
        "expand": "expand 0.5s ease-out forwards",
        "collapse": "collapse 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;


