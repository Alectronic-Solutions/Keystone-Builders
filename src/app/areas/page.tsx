// Areas We Serve: Pittsburgh suburb list for local SEO with a map embed.
import type { Metadata } from "next";
import Link from "next/link";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Keystone Builders serves homeowners and businesses across Greater Pittsburgh — Allegheny, Butler, Westmoreland, and Washington counties.",
};

const counties = [
  {
    name: "Allegheny County",
    communities: [
      "Pittsburgh",
      "Shadyside",
      "Squirrel Hill",
      "Mount Lebanon",
      "Fox Chapel",
      "Sewickley",
      "Upper St. Clair",
      "Bethel Park",
      "Peters Township",
      "North Hills",
      "Cranberry Township",
      "McCandless",
      "Gibsonia",
      "Wexford",
      "Ross Township",
    ],
  },
  {
    name: "Butler County",
    communities: [
      "Cranberry Township",
      "Mars",
      "Wexford",
      "Valencia",
      "Zelienople",
      "Butler",
      "Saxonburg",
      "Adams Township",
    ],
  },
  {
    name: "Westmoreland County",
    communities: [
      "Murrysville",
      "Penn Township",
      "Harrison City",
      "Greensburg",
      "Latrobe",
      "Irwin",
      "North Huntingdon",
    ],
  },
  {
    name: "Washington County",
    communities: [
      "Peters Township",
      "Canonsburg",
      "McMurray",
      "Cecil Township",
      "South Fayette",
      "Bridgeville",
      "Washington",
    ],
  },
];

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    stat: "4 counties",
    label: "Service coverage across southwestern Pennsylvania",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    stat: `Since ${site.foundedYear}`,
    label: `Serving Pittsburgh-area families for over ${new Date().getFullYear() - site.foundedYear} years`,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    stat: site.projectsCompleted,
    label: "Projects completed across the region",
  },
];

export default function AreasPage() {
  return (
    <>
      <ParallaxPageHeader
        eyebrow="Service Area"
        title="Serving Greater Pittsburgh"
        intro="Keystone Builders works across four counties in southwestern Pennsylvania. If you are in or near the communities listed below, we can come to you."
        image="/images/home-exterior-modern.jpg"
        imageAlt="Finished custom home in the Greater Pittsburgh area"
      />

      {/* Coverage highlights. */}
      <section className="bg-white border-b border-primary/10">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-10 md:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.stat} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                {h.icon}
              </span>
              <div>
                <p className="font-display text-xl font-bold text-primary">{h.stat}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{h.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* County grids. */}
      <Section tone="linen">
        <SectionHeading
          title="Communities we build in"
          intro="We are licensed to work throughout Allegheny, Butler, Westmoreland, and Washington counties. Don't see your town? Give us a call."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {counties.map((county, ci) => (
            <Reveal key={county.name} delay={ci * 0.07}>
              <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary">
                  {county.name}
                </h2>
                <span className="mt-2 block h-0.5 w-8 rounded-full bg-accent" />
                <ul className="mt-4 space-y-2">
                  {county.communities.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-ink-soft">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Map embed. */}
      <Section tone="white">
        <SectionHeading
          title="Our home base"
          intro="Based in Pittsburgh, PA. We travel to job sites throughout the metro and surrounding counties."
        />
        <Reveal className="mt-10 overflow-hidden rounded-xl shadow-md ring-1 ring-primary/10">
          <iframe
            title="Keystone Builders service area — Pittsburgh, PA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193785.17878707437!2d-80.19026689999999!3d40.44062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f16f48068503%3A0x8df915a15aa21b34!2sPittsburgh%2C%20PA!5e0!3m2!1sen!2sus!4v1720000000000!5m2!1sen!2sus"
            width="100%"
            height="440"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-sm text-ink-soft">
            Not sure if we cover your area?{" "}
            <Link href="/contact" className="font-semibold text-accent underline underline-offset-2 hover:text-primary">
              Reach out
            </Link>{" "}
            and we will let you know within one business day.
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
