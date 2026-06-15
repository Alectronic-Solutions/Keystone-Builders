// PageHeader: compact title band at the top of inner pages.
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function PageHeader({
  title,
  intro,
  eyebrow,
}: {
  title: string;
  intro?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className="bg-primary text-background">
      <div className="mx-auto max-w-content px-4 pb-14 pt-16 md:pb-16 md:pt-20">
        <Reveal className="max-w-2xl">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-background/80 md:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
