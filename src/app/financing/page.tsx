// Financing: common ways clients pay for larger projects, and how payments line up with the build.
import type { Metadata } from "next";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Common ways Keystone Builders clients finance custom homes, additions, and remodels, plus how our milestone payment schedule works.",
  alternates: { canonical: `${site.url}/financing/` },
};

const options = [
  {
    title: "Home equity line of credit",
    bestFor: "Remodels and additions",
    body: "Borrow against the equity in your current home and draw funds as milestones are reached. Interest is typically paid only on what you use.",
  },
  {
    title: "Renovation loan",
    bestFor: "Major remodels and purchases",
    body: "Loans based on the home's value after the work is done, which can help when current equity alone will not cover the project.",
  },
  {
    title: "Construction-to-permanent loan",
    bestFor: "New custom homes",
    body: "One loan that funds the build in stages and converts to a standard mortgage when your home is complete, with a single closing.",
  },
];

const milestones = [
  { stage: "Contract signing", share: "10%" },
  { stage: "Rough-in complete", share: "30%" },
  { stage: "Drywall and cabinets", share: "30%" },
  { stage: "Finishes installed", share: "20%" },
  { stage: "Final walkthrough", share: "10%" },
];

export default function FinancingPage() {
  return (
    <>
      <ParallaxPageHeader
        title="Ways to pay for your project"
        intro="Most of our clients finance larger projects. Here are the options they use most, and how our payment schedule fits around them."
        image={`${basePath}/images/home-exterior-terrace.jpg`}
        imageAlt="Finished home exterior with a new upper terrace"
      />

      <Section tone="linen">
        <SectionHeading
          title="Common financing options"
          intro="We are a builder, not a lender. We are glad to talk with your bank and provide the budgets, drawings, and schedules they ask for."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {options.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 0.08} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-7">
              <h3 className="font-display text-xl font-bold text-primary">{o.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent-ink">Best for {o.bestFor.toLowerCase()}</p>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{o.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              title="Pay as the work gets done"
              intro="Payments follow construction milestones written into your contract, so you never pay far ahead of finished, inspected work. Lenders like this structure because it matches how construction draws are released."
            />
            <Reveal className="mt-8">
              <Button href="/contact" variant="primary">Start with a free estimate</Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="rounded-2xl bg-background p-6 ring-1 ring-primary/10 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Typical remodel schedule</p>
            <ol className="mt-5 divide-y divide-primary/10">
              {milestones.map((m, i) => (
                <li key={m.stage} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-center gap-3 text-base text-ink">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">{i + 1}</span>
                    {m.stage}
                  </span>
                  <span className="font-display text-xl font-bold text-primary">{m.share}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-soft">New homes follow a longer draw schedule set with your lender.</p>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Know your number before you apply"
        intro="A written, itemized estimate is the first thing any lender will ask for. We provide one free after a site visit."
      />
    </>
  );
}
