"use client";

// ParallaxPageHeader: full-bleed photo hero with scroll-linked parallax for inner pages.
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function ParallaxPageHeader({
  title,
  intro,
  eyebrow,
  image,
  imageAlt,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  image: string;
  imageAlt: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[52vh] items-end overflow-hidden md:min-h-[60vh]"
    >
      {/* Parallax background. */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 top-[-12%] -z-10 h-[124%]"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay — dark enough for text at any photo brightness. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/40" />

      <div className="mx-auto w-full max-w-content px-4 pb-14 pt-20 md:pb-16 md:pt-24">
        <Reveal className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-background md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-background/80 md:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
