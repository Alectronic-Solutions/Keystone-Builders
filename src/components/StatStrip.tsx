"use client";

// StatStrip: headline proof points with animated counters. Years stays current via foundedYear.
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { site } from "@/lib/site";

export default function StatStrip() {
  const years = new Date().getFullYear() - site.foundedYear;

  const stats = [
    { value: `${years}+`, label: "Years building in Pittsburgh" },
    { value: site.projectsCompleted, label: "Projects completed" },
    { value: site.onTimeRate, label: "On-time completion" },
    { value: site.warranty, label: "Workmanship warranty" },
  ];

  return (
    <section className="border-y border-primary/10 bg-white">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-3 px-4 py-12 sm:gap-6 md:grid-cols-4 md:py-14">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="flex flex-col items-center h-full rounded-xl border border-primary/10 px-3 py-6 text-center sm:px-4 transition-transform duration-200 hover:scale-[1.02] hover:border-primary/20">
              <CountUp
                value={stat.value}
                className="block font-display text-4xl font-bold text-primary md:text-5xl"
              />
              <p className="mt-2 text-sm font-medium text-ink-soft sm:text-base">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
