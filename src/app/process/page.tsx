// Process: the four project phases in detail, so clients know what happens and when.
import type { Metadata } from "next";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { processSteps } from "@/lib/process";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How a Keystone Builders project runs, from the first phone call and written estimate through construction, walkthrough, and warranty.",
  alternates: { canonical: `${site.url}/process/` },
};

const weekly = [
  { title: "Written update every Friday", body: "Progress photos, what was finished, what is next, and any decisions we need from you." },
  { title: "One phone number", body: "Your project manager's cell, answered during working hours and returned the same day." },
  { title: "Running budget", body: "Every approved change and its cost, so the final invoice never surprises you." },
];

export default function ProcessPage() {
  return (
    <>
      <ParallaxPageHeader
        title="How a Keystone project runs"
        intro="Four phases, one project manager, and a written update every week. Here is exactly what to expect from first call to final walkthrough."
        image={`${basePath}/images/crew-engineers.jpg`}
        imageAlt="Keystone Builders project leads reviewing plans on site"
      />

      <Section tone="linen">
        <ol className="space-y-6 md:space-y-8">
          {processSteps.map((step) => (
            <Reveal as="li" key={step.number}>
              <article className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:grid-cols-[180px_1fr] md:p-10">
                <div>
                  <p className="font-display text-5xl font-bold leading-none text-accent">{step.number}</p>
                  <p className="mt-3 text-sm font-semibold text-ink-soft">
                    {step.duration}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">{step.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-lg">{step.description}</p>
                  <ul className="mt-6 space-y-3">
                    {step.activities.map((a) => (
                      <li key={a} className="flex gap-3 text-base text-ink">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-lg border-l-4 border-accent bg-background px-4 py-3 text-base text-primary">
                    <span className="font-semibold">You receive: </span>
                    {step.deliverable}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="primary">
        <SectionHeading
          title="What you can count on every week"
          intro="Big projects go sideways when communication slips. These three habits are built into every job."
          invert
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {weekly.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.08} className="rounded-xl bg-background/5 p-6 ring-1 ring-background/10">
              <h3 className="font-display text-xl font-bold text-background">{w.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-background/75">{w.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTASection
        title="Step one is a conversation"
        intro="Call or send a few details about your project. We will set up a free site visit at a time that works for you."
      />
    </>
  );
}
