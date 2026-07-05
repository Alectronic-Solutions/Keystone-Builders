"use client";

// StatStrip: headline proof points with animated counters. Years stays current via foundedYear.
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { site } from "@/lib/site";

export default function StatStrip() {
  const years = new Date().getFullYear() - site.foundedYear;

  const stats = [
    { value: `${years}`, label: "Years building in Pittsburgh", suffix: "+" },
    { value: site.projectsCompleted, label: "Projects completed" },
    { value: site.onTimeRate, label: "On-time completion" },
    { value: site.warranty, label: "Workmanship warranty" },
  ];

  return (
    <section className="border-y border-primary/10 bg-white">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-y-10 px-4 py-14 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="flex flex-col items-center rounded-xl border border-primary/10 px-4 py-6 text-center transition-transform duration-200 hover:scale-[1.02] hover:border-primary/20">
              <CountUp
                value={stat.value}
                className="block font-display text-4xl font-bold text-primary md:text-5xl"
              />
              <span className="relative mt-3 block h-0.5 w-8 overflow-hidden rounded-full bg-accent/20" aria-hidden="true">
                <motion.span
                  className="absolute inset-y-0 left-0 block w-full origin-left rounded-full bg-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 + 0.3 }}
                />
              </span>
              <p className="mt-3 text-base font-medium text-ink-soft">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
