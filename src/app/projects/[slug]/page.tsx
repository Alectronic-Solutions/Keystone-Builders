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

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
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

  const isRemodel =
    project.category.toLowerCase().includes("remodel") ||
    project.category.toLowerCase().includes("renovation");

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
        <div className="mx-auto w-full max-w-content px-4 py-12">
          <Reveal>
            <Link
              href="/projects"
              className="text-sm font-semibold text-background/80 transition-colors hover:text-background"
            >
              &larr; All projects
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {project.category}
            </p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight text-background md:text-5xl">
              {project.title}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Stats bar. */}
      <section className="border-b border-primary/10 bg-white">
        <div className="mx-auto grid max-w-content grid-cols-2 gap-y-8 px-4 py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-xl font-bold text-primary">{stat.value}</p>
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
                <span className="mt-3 block h-1 w-12 rounded-full bg-accent" />
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{block.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Before/after slider — remodel and renovation projects only. */}
          {isRemodel && project.gallery.length >= 2 && (
            <Reveal className="mt-16">
              <h2 className="mb-6 font-display text-2xl font-bold text-primary">
                Before &amp; after
              </h2>
              <BeforeAfterSlider
                before={project.gallery[0]}
                after={project.gallery[1]}
              />
            </Reveal>
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
