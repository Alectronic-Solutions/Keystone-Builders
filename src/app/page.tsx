// Home: the marketing landing page composed of focused sections.
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import StatStrip from "@/components/StatStrip";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ProcessSection from "@/components/home/ProcessSection";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "Licensed general contractor in Greater Pittsburgh. Custom homes, remodels, additions, and commercial construction from Keystone Builders.",
  alternates: {
    canonical: `${site.url}/`,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <WhyUs />
      <Testimonials tone="white" />
      <FaqSection />
      <CTASection />
    </>
  );
}
