import type { Config } from "tailwindcss";

// Design tokens map 1:1 to the palette and typography defined in CLAUDE.md.
// JSX must reference these named tokens, never raw hex values.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C2B3A", // slate charcoal
        accent: "#C9A96E", // warm stone gold
        background: "#F5F1EB", // off-white linen
        rust: "#8B3A2A", // deep rust, use sparingly
        ink: "#1A1A1A", // primary text
        "ink-soft": "#5A5A5A", // secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
