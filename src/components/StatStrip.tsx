// StatStrip: headline proof points with animated counters. Years stays current via foundedYear.
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
            <div className="flex flex-col items-center text-center">
              <CountUp
                value={stat.value}
                className="block font-display text-4xl font-bold text-primary md:text-5xl"
              />
              <span className="mt-3 block h-0.5 w-8 rounded-full bg-accent" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-ink-soft">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
