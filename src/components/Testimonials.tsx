// Testimonials: static grid of client reviews. No auto-advance or carousel UI.
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/testimonials";

function initials(name: string) {
  return name
    .replace(/^The\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials({ tone = "white" }: { tone?: "white" | "linen" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        title="What our clients say"
        intro="The same crews, the same standards, project after project across Greater Pittsburgh."
        align="center"
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl bg-background px-8 py-8 shadow-sm ring-1 ring-primary/8">
              <p
                className="font-display text-4xl leading-none text-accent"
                aria-hidden="true"
              >
                &ldquo;
              </p>
              <blockquote className="mt-1 flex-1 text-base leading-relaxed text-ink md:text-lg">
                {t.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="font-semibold text-primary">{t.name}</p>
                  <p className="text-sm text-ink-soft">
                    {t.project} &middot; {t.location}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
