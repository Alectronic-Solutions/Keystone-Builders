// PageHeader: compact title band at the top of inner pages.
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) {
  return (
    <section className="bg-primary text-background">
      {/* Top padding clears the fixed navbar (about 108px tall at page top). */}
      <div className="mx-auto max-w-content px-4 pb-14 pt-32 md:pb-16 md:pt-36">
        <Reveal className="max-w-2xl">
          <h1 className="font-display text-[2.25rem] font-bold leading-tight text-background md:text-5xl">
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
