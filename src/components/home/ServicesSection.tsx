// ServicesSection: overview grid of what Keystone builds.
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { services } from "@/lib/services";

export default function ServicesSection() {
  return (
    <Section tone="linen">
      <SectionHeading
        title="What we build"
        intro="Residential and commercial construction handled end to end, so you have one team to call from start to finish."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.08} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/services" variant="outline">
          Explore all services
        </Button>
      </div>
    </Section>
  );
}
