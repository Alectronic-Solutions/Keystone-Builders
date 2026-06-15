// About page: company story, values, credentials, and proof.
import type { Metadata } from "next";
import Image from "next/image";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { site, basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Keystone Builders is a family-owned general contractor serving Greater Pittsburgh since 2009.",
};

const values = [
  {
    title: "Craftsmanship",
    body: "We build the way we would build for our own families. Details matter, and we do not cut corners where no one is looking.",
  },
  {
    title: "Communication",
    body: "You hear from us every week. No chasing, no guessing where your project stands.",
  },
  {
    title: "Integrity",
    body: "We give you an honest estimate and an honest timeline, then we do what we said we would do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <ParallaxPageHeader
        eyebrow="About Keystone"
        title="A Pittsburgh builder you can count on"
        intro="Family owned since 2009, we have grown from kitchen remodels into one of the region's trusted names in custom homes and commercial construction."
        image={`${basePath}/images/crew-working.jpg`}
        imageAlt="Keystone Builders crew at work on a Pittsburgh construction site"
      />

      {/* Story. */}
      <Section tone="linen">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={`${basePath}/images/foundation-crew.jpg`}
              alt="Keystone Builders crew working on a residential foundation"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading title="Our story" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
              <p>
                Keystone Builders started in {site.foundedYear} with a single
                crew, a used truck, and a simple promise: do excellent work and
                treat people right. Word traveled fast through {site.serviceArea}.
              </p>
              <p>
                Today we build custom homes, additions, and commercial spaces
                across the region. We are bigger, but the promise has not
                changed. Every project still gets a dedicated project manager and
                the same crews who built our reputation.
              </p>
              <p>
                We are licensed, insured, and proud to call Pittsburgh home.
                When you hire Keystone, you are hiring neighbors who plan to be
                here for the long haul.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <StatStrip />

      {/* Values. */}
      <Section tone="white">
        <SectionHeading
          title="What we stand for"
          intro="Three principles guide every decision we make on your project."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal
              key={value.title}
              delay={i * 0.08}
              className="rounded-lg bg-background p-7 shadow-sm ring-1 ring-primary/5"
            >
              <h3 className="font-display text-xl font-bold text-primary">
                {value.title}
              </h3>
              <span className="mt-3 block h-1 w-12 rounded-full bg-accent" />
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProcessSection />

      {/* Credentials. */}
      <Section tone="linen">
        <SectionHeading
          title="Licensed, insured, and accountable"
          intro="The credentials behind every Keystone project."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "License", value: site.license },
            { label: "Insurance", value: "General Liability and Workers Comp" },
            { label: "Service area", value: `${site.serviceArea} and Allegheny County` },
            { label: "Warranty", value: `${site.warranty} workmanship warranty` },
          ].map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.06}
              className="rounded-lg border border-primary/10 bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {item.label}
              </p>
              <p className="mt-2 font-semibold text-primary">{item.value}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Testimonials tone="white" />
      <CTASection />
    </>
  );
}
