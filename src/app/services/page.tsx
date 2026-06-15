// Services page: detailed breakdown of each service, deep-linkable by slug.
import type { Metadata } from "next";
import Image from "next/image";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "New home construction, remodeling, additions, and commercial construction across Greater Pittsburgh.",
};

export default function ServicesPage() {
  return (
    <>
      <ParallaxPageHeader
        eyebrow="Our Services"
        title="One team for the whole build"
        intro="From a single bathroom to a ground-up commercial space, we handle design, permitting, and construction under one roof."
        image="/images/framing-two-story.jpg"
        imageAlt="Keystone Builders crew framing a two-story custom home"
      />

      <div className="bg-background">
        <div className="mx-auto max-w-content px-4 py-16 md:py-24">
          <div className="space-y-20 md:space-y-28">
            {services.map((service, i) => (
              <div
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2"
              >
                <Reveal
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg ${
                    i % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                    {service.title}
                  </h2>
                  <span className="mt-5 block h-1 w-16 rounded-full bg-accent" />
                  <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-ink">
                        <span
                          aria-hidden="true"
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary"
                        >
                          &#10003;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href="/contact" variant="primary">
                      Get a free estimate
                    </Button>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
