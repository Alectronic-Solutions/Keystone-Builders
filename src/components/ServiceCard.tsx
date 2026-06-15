// ServiceCard: tall image card linking to a service detail section.
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-primary/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/20"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {/* Gradient overlay so text is always readable. */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-primary">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {service.short}
        </p>
        <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent">
          See details
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
