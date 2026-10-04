// Project case study: hero, stats bar, narrative, before/after slider on remodels, and a gallery lightbox.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import ProjectGallery from "@/components/ProjectGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `${site.url}/projects/${project.slug}/`,
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const stats = [
    { label: "Location", value: project.location },
    { label: "Square Footage", value: project.squareFootage },
    { label: "Timeline", value: project.timeline },
    { label: "Project Value", value: project.value },
  ];

  const narrative = [
    { label: "The challenge", body: project.challenge },
    { label: "Our solution", body: project.solution },
    { label: "The result", body: project.result },
  ];

  return (
    <>
      {/* Full-bleed hero. */}
      <section className="relative isolate flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
        <div className="mx-auto w-full max-w-content px-4 pb-12 pt-32">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center text-base font-semibold text-background/80 transition-colors hover:text-background"
            >
              &larr; All projects
            </Link>
            <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-tight text-background md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-base text-background/80">
              {project.category} &middot; {project.location}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats bar. */}
      <section className="border-b border-primary/10 bg-white">
        <div className="mx-auto grid max-w-content grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-primary sm:text-xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-background">
        <div className="mx-auto max-w-content px-4 py-16 md:py-24">
          {/* Summary. */}
          <Reveal className="max-w-3xl">
            <p className="font-display text-2xl leading-snug text-primary md:text-3xl">
              {project.summary}
            </p>
          </Reveal>

          {/* Narrative: challenge, solution, result. */}
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {narrative.map((block, i) => (
              <Reveal key={block.label} delay={i * 0.08}>
                <h2 className="font-display text-xl font-bold text-primary">{block.label}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{block.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Before/after sliders, only for projects with matched before and after shots. */}
          {project.comparisons && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-primary">
                Before and after
              </h2>
              <p className="mt-2 text-base text-ink-soft">
                Drag the handle to compare the original room with the finished work.
              </p>
              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                {project.comparisons.map((c) => (
                  <Reveal key={c.label}>
                    <h3 className="mb-3 font-sans text-base font-semibold text-primary">{c.label}</h3>
                    <BeforeAfterSlider before={c.before} after={c.after} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Gallery with lightbox. */}
          <div className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-primary">
              Project gallery
            </h2>
            <ProjectGallery images={project.gallery} />
          </div>
        </div>
      </div>

      <CTASection
        title="Start your project"
        intro="If you are planning something similar, we would love to talk through it. Get a free, no-obligation estimate."
      />
    </>
  );
}
