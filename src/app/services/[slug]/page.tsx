// Service detail: one page per service, covering scope, timeline, inclusions, proof, and FAQs.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import ProjectGallery from "@/components/ProjectGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import FaqList from "@/components/FaqList";
import CTASection from "@/components/CTASection";
import { services, getService } from "@/lib/services";
import { getProject, type Project } from "@/lib/projects";
import { faqSchema } from "@/lib/faqs";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };
  return {
    title: `${service.title} in ${site.city}`,
    description: service.heroIntro,
    alternates: { canonical: `${site.url}/services/${service.slug}/` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = service.projectSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p));
  const comparison = related.find((p) => p.comparisons);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }}
      />

      <ParallaxPageHeader
        title={service.title}
        intro={service.heroIntro}
        image={service.heroImage}
        imageAlt={service.heroImageAlt}
      />

      {/* At-a-glance facts. */}
      <section className="border-b border-primary/10 bg-white">
        <dl className="mx-auto grid max-w-content grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 md:grid-cols-4">
          {service.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{fact.label}</dt>
              <dd className="mt-1 font-display text-lg font-bold text-primary sm:text-xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Overview. */}
      <Section tone="linen">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={`How we approach ${service.title.toLowerCase()}`} />
            <Reveal className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
              {service.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-base text-ink">
                    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* What is included. */}
      <Section tone="white">
        <SectionHeading
          title="What is included"
          intro="Every project is run by one Keystone project manager, from first estimate to final walkthrough."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.08} className="rounded-xl bg-background p-6 ring-1 ring-primary/10">
              <h3 className="font-display text-lg font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Before and after, when one of this service's projects has matched shots. */}
      {comparison?.comparisons && (
        <Section tone="linen">
          <SectionHeading
            title="See the difference"
            intro={`${comparison.title}. Drag the handle to compare the original room with the finished work.`}
          />
          <Reveal className="mt-10">
            <BeforeAfterSlider before={comparison.comparisons[0].before} after={comparison.comparisons[0].after} />
          </Reveal>
          <Reveal className="mt-6">
            <Link
              href="/before-after"
              className="inline-flex min-h-11 items-center text-base font-semibold text-accent-ink underline underline-offset-2 hover:text-primary"
            >
              More before and after photos
            </Link>
          </Reveal>
        </Section>
      )}

      {/* Photo gallery. */}
      <Section tone={comparison ? "white" : "linen"}>
        <SectionHeading title="From our job sites" />
        <div className="mt-10">
          <ProjectGallery images={service.gallery} />
        </div>
      </Section>

      {/* Related case studies. */}
      {related.length > 0 && (
        <Section tone={comparison ? "linen" : "white"}>
          <SectionHeading title="Related projects" intro="Case studies with scope, timeline, and budget." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* FAQs. */}
      <Section tone={comparison ? "white" : "linen"}>
        <div className="mx-auto max-w-2xl">
          <SectionHeading title={`${service.title} questions`} align="center" />
          <div className="mt-10">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </Section>

      {/* Other services. */}
      <section className="border-t border-primary/10 bg-background">
        <div className="mx-auto max-w-content px-4 py-12">
          <h2 className="text-center font-display text-2xl font-bold text-primary md:text-left">Other services</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-3 rounded-xl bg-white px-5 py-4 ring-1 ring-primary/10 transition-shadow hover:shadow-md"
                >
                  <span className="font-semibold text-primary">{s.title}</span>
                  <span aria-hidden="true" className="text-accent-ink transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center md:text-left">
            <Button href="/services" variant="outline">All services</Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to talk about your project?"
        intro={`Tell us about your ${service.title.toLowerCase()} plans and we will schedule a free site visit and written estimate.`}
      />
    </>
  );
}
