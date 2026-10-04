// Testimonials: static grid of client reviews. No auto-advance or carousel UI.
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { testimonials, type Testimonial } from "@/lib/testimonials";

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

export default function Testimonials({
  tone = "white",
  limit = 4,
}: {
  tone?: "white" | "linen";
  limit?: number;
}) {
  return (
    <Section tone={tone}>
      <SectionHeading
        title="What our clients say"
        intro="The same crews, the same standards, project after project across Greater Pittsburgh."
        align="center"
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {testimonials.slice(0, limit).map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.08}>
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Button href="/reviews" variant="outline">
          Read more client reviews
        </Button>
      </div>
    </Section>
  );
}

export function TestimonialCard({
  testimonial,
  tone = "linen",
}: {
  testimonial: Testimonial;
  tone?: "linen" | "white";
}) {
  return (
    <div className={`flex h-full flex-col rounded-2xl px-6 py-7 shadow-sm ring-1 ring-primary/10 sm:px-8 sm:py-8 ${tone === "white" ? "bg-white" : "bg-background"}`}>
      <p className="flex gap-0.5 text-accent" role="img" aria-label="Rated 5 out of 5">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
        ))}
      </p>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink md:text-lg">
        {testimonial.quote}
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
          {initials(testimonial.name)}
        </span>
        <div>
          <p className="font-semibold text-primary">{testimonial.name}</p>
          <p className="text-base text-ink-soft">
            {testimonial.project} &middot; {testimonial.location}, {testimonial.year}
          </p>
        </div>
      </div>
    </div>
  );
}
