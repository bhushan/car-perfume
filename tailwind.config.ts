import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        graphite: "var(--graphite)",
        charcoal: "var(--charcoal)",
        ivory: "var(--ivory)",
        muted: "var(--muted)",
        gold: "var(--gold)",
        champagne: "var(--champagne)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      letterSpacing: {
        widest2: "0.42em",
      },
    },
  },
  plugins: [],
};
export default config;
