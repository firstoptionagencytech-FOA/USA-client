import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#FCF6F8",
          100: "#F9ECF1",
          200: "#F4D9E4",
          300: "#E9B6CA",
          400: "#DC86A7",
          500: "#C94E7D",
          600: "#B02B5E",
          700: "#8B0032",
          800: "#7A0026",
          900: "#52001A",
          950: "#360010",
        },
        roseAccent: {
          50: "#FFF1F5",
          100: "#FFE4EC",
          200: "#FECDD9",
          300: "#FDA4BA",
          400: "#FB7194",
          500: "#F43F6F",
          600: "#E11D58",
          700: "#BE1245",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        'glow-brand': '0 0 35px -5px rgba(139, 0, 50, 0.35)',
        'glow-pill': '0 4px 20px 0 rgba(139, 0, 50, 0.4)',
        'card-soft': '0 12px 36px -8px rgba(122, 0, 38, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
} satisfies Config;
