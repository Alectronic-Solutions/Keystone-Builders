// Contact page: estimate request form, contact details, and a Pittsburgh service area map.
import type { Metadata } from "next";
import Link from "next/link";
import { basePath } from "@/lib/site";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import EstimateForm from "@/components/EstimateForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free estimate from Keystone Builders, serving Greater Pittsburgh.",
};

const contactDetails = [
  {
    label: "Phone",
    value: (
      <a href={site.phoneHref} className="text-ink-soft transition-colors hover:text-accent">
        {site.phoneDisplay}
      </a>
    ),
  },
  {
    label: "Email",
    value: (
      <a href={`mailto:${site.email}`} className="text-ink-soft transition-colors hover:text-accent">
        {site.email}
      </a>
    ),
  },
  {
    label: "Service area",
    value: (
      <span className="text-ink-soft">
        {site.serviceArea} and Allegheny County.{" "}
        <Link href="/areas" className="font-semibold text-accent underline underline-offset-2 hover:text-primary">
          See all areas
        </Link>
      </span>
    ),
  },
  {
    label: "License",
    value: <span className="text-ink-soft">{site.license}</span>,
  },
];

export default function ContactPage() {
  return (
    <>
      <ParallaxPageHeader
        eyebrow="Get Started"
        title="Request your free estimate"
        intro="Tell us about your project and we will follow up to schedule a site visit. Most estimates go out within a few business days."
        image={`${basePath}/images/foundation-crew.jpg`}
        imageAlt="Keystone Builders crew setting foundations on a Pittsburgh job site"
      />

      <div className="bg-background">
        <div className="mx-auto max-w-content px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            {/* Form. */}
            <Reveal className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-primary/5 md:p-8">
              <h2 className="font-display text-2xl font-bold text-primary">Project details</h2>
              <p className="mt-2 text-sm text-ink-soft">
                The more you share, the more accurate your estimate will be.
              </p>
              <div className="mt-6">
                <EstimateForm />
              </div>
            </Reveal>

            {/* Sidebar. */}
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary">Talk to a builder</h2>
                  <span className="mt-3 block h-1 w-12 rounded-full bg-accent" />
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    Prefer to talk it through? Give us a call and we will point you in the right direction.
                  </p>
                </div>

                <ul className="space-y-5 text-sm">
                  {contactDetails.map(({ label, value }) => (
                    <li key={label}>
                      <p className="font-semibold text-primary">{label}</p>
                      {value}
                    </li>
                  ))}
                </ul>

                {/* License badge. */}
                <div className="rounded-lg bg-primary p-6 text-background">
                  <p className="font-display text-lg font-bold">Licensed and fully insured</p>
                  <p className="mt-2 text-sm text-background/80">
                    General Liability and Workers Comp coverage on every job, so you are protected from the first day to the last.
                  </p>
                </div>

                {/* Map. */}
                <div>
                  <p className="mb-3 text-sm font-semibold text-primary">Our service area</p>
                  <div className="overflow-hidden rounded-lg ring-1 ring-primary/10 shadow-sm">
                    <iframe
                      title="Keystone Builders Pittsburgh service area map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193785.17878707437!2d-80.19026689999999!3d40.44062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f16f48068503%3A0x8df915a15aa21b34!2sPittsburgh%2C%20PA!5e0!3m2!1sen!2sus!4v1720000000000!5m2!1sen!2sus"
                      width="100%"
                      height="220"
                      style={{ border: 0, display: "block" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="mt-2 text-xs text-ink-soft">
                    Serving Allegheny, Butler, Westmoreland &amp; Washington counties.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
