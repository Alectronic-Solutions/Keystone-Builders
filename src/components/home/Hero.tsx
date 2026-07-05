"use client";

// Hero: full-bleed crossfading video background with headline copy.
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import HeroVideoBackground from "@/components/home/HeroVideoBackground";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroVideoBackground />
      </div>
      {/* Slate wash so the white headline stays readable over the video. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />

      <div className="mx-auto w-full max-w-content px-4 py-24 sm:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow invert>Licensed and Insured General Contractor</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.05] text-background sm:text-5xl md:text-6xl">
              Built right, the first time
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/85 sm:text-lg">
              {site.serviceArea} homeowners and businesses trust Keystone
              Builders for custom homes, remodels, additions, and commercial
              construction. One accountable team, from first sketch to final
              walkthrough.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="accent">
                Get a Free Estimate
              </Button>
              <Button href="/projects" variant="outline-light">
                View Our Work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 text-xs text-background/70 sm:text-sm">
              Serving {site.serviceArea} since {site.foundedYear}
              <span className="mx-2 text-accent">&middot;</span>
              {site.license}
            </p>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
