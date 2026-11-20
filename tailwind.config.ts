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
          50: "#f6f6ef",
          100: "#edf3e3",
          200: "#dce3d4",
          300: "#b5c7a5",
          400: "#6d883e",
          500: "#274c3b", // Official Jewar Helpdesk Accent
          600: "#203e30",
          700: "#1a3328",
          800: "#182c26", // Official Jewar Navy / Ink
          900: "#11201b",
          950: "#0b1512",
        },
        cyberLime: {
          DEFAULT: "#d2f56d", // Official Jewar Brand Highlight
          400: "#e0fa8c",
          500: "#d2f56d",
          600: "#bce457",
        },
        roseAccent: {
          50: "#f6f6ef",
          100: "#edf3e3",
          200: "#dce3d4",
          300: "#b5c7a5",
          400: "#6d883e",
          500: "#274c3b",
          600: "#182c26",
          700: "#11201b",
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        'glow-brand': '0 0 35px -5px rgba(39, 76, 59, 0.4)',
        'glow-lime': '0 0 30px rgba(210, 245, 109, 0.45)',
        'glow-pill': '0 4px 20px 0 rgba(24, 44, 38, 0.4)',
        'card-soft': '0 12px 36px -8px rgba(24, 44, 38, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
} satisfies Config;
