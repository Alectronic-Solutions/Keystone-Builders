// FeaturedProjects: a few recent case studies to show proof of work.
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { projects } from "@/lib/projects";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <Section tone="white">
      <SectionHeading
        title="Recent work"
        intro="Every project is a promise kept. Here is a look at what that means in practice."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/projects" variant="outline">
          See all projects
        </Button>
      </div>
    </Section>
  );
}
