// SectionHeading: title plus optional intro. No overline pill labels (AI tell).
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function SectionHeading({
  title,
  intro,
  align = "left",
  invert = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <h2
        className={`font-display text-3xl font-bold leading-tight md:text-4xl ${
          invert ? "text-background" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            invert ? "text-background/80" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
      <span
        className={`mt-6 block h-1 w-16 rounded-full bg-accent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </Reveal>
  );
}
