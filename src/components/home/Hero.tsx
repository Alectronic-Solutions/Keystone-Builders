"use client";

// Hero: full-bleed construction image with a scroll-linked parallax background.
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { site, basePath } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Background drifts down as the section scrolls out; disabled if reduced motion.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 top-[-12%] -z-10 h-[124%]"
      >
        <Image
          src={`${basePath}/images/hero-construction-site.jpg`}
          alt="A custom two-story home under construction in the Pittsburgh area"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Slate wash so the white headline stays readable over the photo. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />

      <div className="mx-auto w-full max-w-content px-4 py-24 sm:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
              Licensed and Insured General Contractor
            </p>
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
