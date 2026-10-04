// Before and after: matched photos from remodel projects, using matched shots.
import type { Metadata } from "next";
import Link from "next/link";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CTASection from "@/components/CTASection";
import { projects } from "@/lib/projects";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Before and After",
  description:
    "Drag the slider to see kitchens and bathrooms across Greater Pittsburgh before and after a Keystone Builders remodel.",
  alternates: { canonical: `${site.url}/before-after/` },
};

export default function BeforeAfterPage() {
  const remodels = projects.filter((p) => p.comparisons);

  return (
    <>
      <ParallaxPageHeader
        title="Before and after"
        intro="Same room, same camera position. Drag the handle on each photo to see what a Keystone remodel changes."
        image={`${basePath}/images/whole-home-kitchen-after.jpg`}
        imageAlt="Renovated kitchen with dark wood cabinets and stainless appliances"
      />

      {remodels.map((project, i) => (
        <Section key={project.slug} tone={i % 2 === 0 ? "linen" : "white"}>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight text-primary">
                {project.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{project.challenge}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-ink-soft">Timeline</dt>
                  <dd className="mt-0.5 font-display text-lg font-bold text-primary">{project.timeline}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-ink-soft">Location</dt>
                  <dd className="mt-0.5 font-display text-lg font-bold text-primary">{project.location}</dd>
                </div>
              </dl>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex min-h-11 items-center text-base font-semibold text-accent-ink underline underline-offset-2 hover:text-primary"
              >
                Read the full case study
              </Link>
            </Reveal>
            <div className="space-y-10">
              {project.comparisons!.map((c, ci) => (
                <Reveal key={c.label} delay={ci === 0 ? 0.1 : 0}>
                  <h3 className="mb-3 font-sans text-base font-semibold text-primary">{c.label}</h3>
                  <BeforeAfterSlider before={c.before} after={c.after} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <CTASection
        title="Picture your own before and after"
        intro="Every project on this page started with a free site visit. Tell us about your space and we will tell you what it would take."
      />
    </>
  );
}
