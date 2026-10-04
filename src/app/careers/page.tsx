// Careers: why to work at Keystone, open positions, and an application form.
import type { Metadata } from "next";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CareersForm from "@/components/CareersForm";
import CTASection from "@/components/CTASection";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Keystone Builders. We hire carpenters, project managers, and apprentices across Greater Pittsburgh, with year-round work and real benefits.",
  alternates: { canonical: `${site.url}/careers/` },
};

const benefits = [
  { title: "Year-round work", body: "A steady mix of new homes, remodels, and commercial jobs keeps crews busy through the winter." },
  { title: "Health and retirement", body: "Medical and dental coverage plus a 401(k) with a company match after 90 days." },
  { title: "Paid training", body: "Paid time for certifications, plus mentorship from carpenters with decades on the tools." },
  { title: "Company tools and trucks", body: "Quality tools and a company vehicle for leads and project managers." },
];

const positions = [
  {
    title: "Lead Carpenter",
    type: "Full time",
    location: "Greater Pittsburgh job sites",
    body: "Run a small crew on residential remodels and additions. You read plans, lay out work, and hold the quality bar from framing through trim.",
    needs: ["7+ years of residential carpentry", "Experience leading a crew", "Valid driver's license"],
  },
  {
    title: "Project Manager",
    type: "Full time",
    location: "Office and field",
    body: "Own client projects from contract to closeout: schedules, budgets, trade coordination, and the weekly client update.",
    needs: ["5+ years managing residential or light commercial construction", "Comfortable with scheduling and budgeting software", "Clear, calm communicator"],
  },
  {
    title: "Carpenter Apprentice",
    type: "Full time",
    location: "Greater Pittsburgh job sites",
    body: "Learn the trade alongside our lead carpenters. We teach framing, finish work, and job site safety from day one.",
    needs: ["Reliable transportation", "Basic hand tools", "A strong work ethic and willingness to learn"],
  },
];

export default function CareersPage() {
  return (
    <>
      <ParallaxPageHeader
        title="Build your career with Keystone"
        intro="We are a builder that keeps its crews. If you take pride in your work and want to do it alongside people who do too, we would like to meet you."
        image={`${basePath}/images/crew-working.jpg`}
        imageAlt="Keystone Builders crew at work on a job site"
      />

      <Section tone="linen">
        <SectionHeading title="Why people stay" intro="Many of our carpenters have been with us for over a decade." />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.06} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
              <h3 className="font-display text-lg font-bold text-primary">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{b.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <SectionHeading title="Open positions" />
        <ul className="mt-10 space-y-5">
          {positions.map((p) => (
            <Reveal as="li" key={p.title}>
              <article className="rounded-2xl bg-background p-6 ring-1 ring-primary/10 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-2xl font-bold text-primary">{p.title}</h3>
                  <p className="text-sm font-semibold text-ink-soft">
                    {p.type} &middot; {p.location}
                  </p>
                </div>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{p.body}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {p.needs.map((n) => (
                    <li key={n} className="flex gap-2.5 text-base text-ink">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {n}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="linen" id="apply">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeading
              title="Apply now"
              intro="Send a few details and we will be in touch. No resume? No problem. Tell us about the work you have done."
            />
          </div>
          <Reveal className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-8">
            <CareersForm positions={positions.map((p) => p.title)} />
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
