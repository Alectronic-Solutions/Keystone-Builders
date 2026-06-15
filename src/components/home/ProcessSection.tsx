"use client";

// ProcessSection: four steps that light up one at a time as they enter the viewport.
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { processSteps } from "@/lib/process";

function ProcessStep({
  step,
  index,
}: {
  step: { number: string; title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.18 }}
    >
      {/* Number: starts dim, glows to accent gold when in view. */}
      <motion.p
        className="font-display text-5xl font-bold leading-none"
        initial={reduce ? false : { color: "rgba(201,169,110,0.2)" }}
        animate={inView ? { color: "#C9A96E" } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.18 + 0.25 }}
      >
        {step.number}
      </motion.p>

      {/* Connector bar that grows after the number lights up. */}
      <motion.span
        className="mt-4 block h-px bg-accent/40"
        initial={reduce ? false : { scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.18 + 0.4 }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.18 + 0.45 }}
      >
        <h3 className="mt-4 font-display text-xl font-bold text-background">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-background/75">
          {step.description}
        </p>
      </motion.div>
    </motion.li>
  );
}

export default function ProcessSection() {
  return (
    <section className="bg-primary text-background">
      <div className="mx-auto max-w-content px-4 py-16 md:py-24">
        <SectionHeading
          title="How we work"
          intro="A clear path from first call to final walkthrough, so you always know what comes next."
          invert
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
