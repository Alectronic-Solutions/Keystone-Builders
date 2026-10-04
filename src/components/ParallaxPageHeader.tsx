"use client";

// ParallaxPageHeader: full-bleed photo hero with scroll-linked parallax for inner pages.
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function ParallaxPageHeader({
  title,
  intro,
  image,
  imageAlt,
}: {
  title: string;
  intro?: string;
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
      className="relative isolate flex min-h-[60svh] items-end overflow-hidden md:min-h-[60vh]"
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

      {/* Gradient overlay, dark enough for text at any photo brightness. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/40" />

      {/* Top padding clears the fixed navbar when the copy is taller than min-h. */}
      <div className="mx-auto w-full max-w-content px-4 pb-12 pt-32 md:pb-16 md:pt-36">
        <Reveal className="max-w-2xl">
          <h1 className="font-display text-[2.25rem] font-bold leading-tight text-background md:text-5xl lg:text-6xl">
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
