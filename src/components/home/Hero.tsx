"use client";

// Hero: full-bleed crossfading video background with headline copy.
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import HeroVideoBackground from "@/components/home/HeroVideoBackground";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroVideoBackground />
      </div>
      {/* Slate wash so the white headline stays readable over the video. On phones the
          copy spans the full width, so a lighter vertical wash lets the footage show
          through; from md up the heavier left-side gradient sits behind the text column. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/85 md:bg-gradient-to-r md:from-primary/95 md:via-primary/75 md:to-primary/40" />

      <div className="mx-auto w-full max-w-content px-4 pb-16 pt-32 sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <Reveal>
            <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] text-background text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
              Built right, the first time
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-background/90 sm:mt-6 sm:text-lg md:mx-0">
              {site.serviceArea} homeowners and businesses trust Keystone
              Builders for custom homes, remodels, additions, and commercial
              construction. One accountable team, from first sketch to final
              walkthrough.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Button href="/contact" variant="accent">
                Get a Free Estimate
              </Button>
              <Button href="/projects" variant="outline-light">
                View Our Work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 text-xs text-background/70 sm:text-sm">
              Serving {site.serviceArea} since {site.foundedYear}
              <span className="mx-2 text-accent">&middot;</span>
              <span className="whitespace-nowrap">{site.license}</span>
            </p>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
