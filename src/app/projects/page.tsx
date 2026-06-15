// Projects page: the full portfolio grid of case studies.
import type { Metadata } from "next";
import { basePath } from "@/lib/site";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Custom homes, remodels, additions, and commercial projects built by Keystone Builders across Greater Pittsburgh.",
};

export default function ProjectsPage() {
  return (
    <>
      <ParallaxPageHeader
        eyebrow="Our Work"
        title="Projects across Greater Pittsburgh"
        intro="A selection of recent homes, remodels, and commercial builds. Each one delivered on the scope and schedule we committed to."
        image={`${basePath}/images/home-exterior-glass.jpg`}
        imageAlt="Modern custom home completed by Keystone Builders in Pittsburgh"
      />

      <div className="bg-background">
        <div className="mx-auto max-w-content px-4 py-16 md:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
