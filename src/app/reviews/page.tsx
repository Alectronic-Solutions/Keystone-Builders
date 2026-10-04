// Reviews: every client testimonial in one place, with headline proof points.
import type { Metadata } from "next";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { TestimonialCard } from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { testimonials } from "@/lib/testimonials";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Reviews",
  description:
    "Read what homeowners and businesses across Greater Pittsburgh say about building and remodeling with Keystone Builders.",
  alternates: { canonical: `${site.url}/reviews/` },
};

export default function ReviewsPage() {
  const years = new Date().getFullYear() - site.foundedYear;
  const proof = [
    { value: site.projectsCompleted, label: "Projects completed" },
    { value: site.onTimeRate, label: "Finished on schedule" },
    { value: `${years}+`, label: "Years in Pittsburgh" },
  ];

  return (
    <>
      <ParallaxPageHeader
        title="In our clients' words"
        intro="Homeowners and business owners across four counties, on what it was actually like to build with us."
        image={`${basePath}/images/home-exterior-minimal.jpg`}
        imageAlt="Finished modern home on a landscaped lot"
      />

      {/* Proof points. */}
      <section className="border-b border-primary/10 bg-white">
        <dl className="mx-auto grid max-w-content grid-cols-3 gap-4 px-4 py-10 text-center">
          {proof.map((p) => (
            <div key={p.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm font-medium text-ink-soft md:text-base">{p.label}</dt>
              <dd className="font-display text-3xl font-bold text-primary md:text-4xl">{p.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section tone="linen">
        <ul className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 2) * 0.08}>
              <TestimonialCard testimonial={t} tone="white" />
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTASection
        title="Become our next review"
        intro="Start with a free site visit and a written estimate. No pressure, no obligation."
      />
    </>
  );
}
