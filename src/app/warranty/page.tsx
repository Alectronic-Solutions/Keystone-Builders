// Warranty: what the two-year workmanship warranty covers and how to make a claim.
import type { Metadata } from "next";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Warranty",
  description:
    "Keystone Builders backs every project with a two-year written workmanship warranty. See what is covered and how to request service.",
  alternates: { canonical: `${site.url}/warranty/` },
};

const covered = [
  "Framing, structural carpentry, and installed trim",
  "Drywall cracks and nail pops beyond normal settling",
  "Tile, grout, and stone installed by our crews",
  "Plumbing and electrical work performed under our contract",
  "Doors, windows, and cabinetry that bind, sag, or fall out of adjustment",
  "Roofing and flashing installed as part of your project",
];

const notCovered = [
  "Normal wear, cosmetic scuffs, and paint touch-ups after move-in",
  "Damage from storms, flooding, or other events outside our control",
  "Changes or repairs made by other contractors after completion",
  "Owner-supplied materials and appliances (covered by their makers)",
  "Natural movement in wood and stone within industry tolerances",
];

const claimSteps = [
  { title: "Tell us what you see", body: `Call ${site.phoneDisplay} or email ${site.email} with a short description and a photo if you can.` },
  { title: "We schedule a visit", body: "A project manager contacts you within two business days to look at the issue in person." },
  { title: "We make it right", body: "Covered repairs are scheduled at no cost to you, done by the same crews who built your project." },
];

export default function WarrantyPage() {
  return (
    <>
      <ParallaxPageHeader
        title="Two years, in writing"
        intro="Every Keystone project comes with a written two-year workmanship warranty. If something we built is not right, we come back and fix it."
        image={`${basePath}/images/framing-wood-house.jpg`}
        imageAlt="Completed framing of a two-story home"
      />

      <Section tone="linen">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-8">
            <h2 className="font-display text-2xl font-bold text-primary">What is covered</h2>
            <ul className="mt-6 space-y-3">
              {covered.map((c) => (
                <li key={c} className="flex gap-3 text-base text-ink">
                  <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">&#10003;</span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-8">
            <h2 className="font-display text-2xl font-bold text-primary">What is not covered</h2>
            <ul className="mt-6 space-y-3">
              {notCovered.map((c) => (
                <li key={c} className="flex gap-3 text-base text-ink-soft">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-ink-soft" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading title="How to request warranty service" />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {claimSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="rounded-xl bg-background p-6 ring-1 ring-primary/10">
              <p className="font-display text-3xl font-bold text-accent-ink">{i + 1}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-primary">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-ink-soft">
            Manufacturer warranties on windows, roofing, fixtures, and appliances are passed through to you in writing at
            project close. Many of them run 10 years or longer, and we help you register products so that coverage is in
            your name from day one.
          </p>
        </Reveal>
      </Section>

      <CTASection
        title="Build with a contractor who comes back"
        intro="Our warranty is part of every contract, not an upsell. Start with a free site visit and written estimate."
      />
    </>
  );
}
