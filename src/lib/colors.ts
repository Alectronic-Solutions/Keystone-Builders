// Mirrors tailwind.config.ts. Only import here for raw SVG fill or Framer Motion
// color interpolation that cannot use Tailwind utility classes.
export const colors = {
  primary: "#1C2B3A",
  accent: "#C9A96E",
  background: "#F5F1EB",
  rust: "#8B3A2A",
  ink: "#1A1A1A",
  inkSoft: "#5A5A5A",
} as const;

export const accentFaint = "rgba(201,169,110,0.2)";
