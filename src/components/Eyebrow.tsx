// Eyebrow: small contained pill badge for category/context labels.
// Not a bare overline (banned AI tell). Always a filled, rounded shape.
import type { ReactNode } from "react";

export default function Eyebrow({
  children,
  invert = false,
}: {
  children: ReactNode;
  invert?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        invert ? "bg-background/15 text-accent" : "bg-accent/15 text-accent-ink"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      {children}
    </span>
  );
}
