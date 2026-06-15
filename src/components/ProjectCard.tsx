// ProjectCard: project image with overlay text, all inside the clipping container
// so the scale transform on hover never bleeds through the text layer.
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-lg shadow-sm ring-1 ring-primary/5"
    >
      {/* Everything lives inside this one clipping div so stacking is clean. */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {/* Bottom-heavy gradient so text has solid contrast without killing the image. */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

        {/* Text sits above the gradient inside the same stacking context. */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {project.category}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-white/75">{project.location}</p>
        </div>
      </div>
    </Link>
  );
}
