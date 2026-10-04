// FAQ: every common question, grouped by project stage, with FAQPage schema.
import type { Metadata } from "next";
import Link from "next/link";
import ParallaxPageHeader from "@/components/ParallaxPageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import CTASection from "@/components/CTASection";
import { faqGroups, allFaqs, faqSchema } from "@/lib/faqs";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about pricing, payments, timelines, permits, and warranty from Keystone Builders, a licensed general contractor in Greater Pittsburgh.",
  alternates: { canonical: `${site.url}/faq/` },
};

const anchor = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, "-");

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }}
      />

      <ParallaxPageHeader
        title="Questions we hear most"
        intro="Straight answers about pricing, scheduling, permits, and what happens after the build. Do not see yours? Give us a call."
        image={`${basePath}/images/kitchen-light-dining.jpg`}
        imageAlt="Bright dining area off a remodeled kitchen"
      />

      <Section tone="linen">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Topic jump links; sticky on desktop. */}
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Topics</p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${anchor(g.title)}`}
                    className="inline-flex min-h-11 items-center rounded-md bg-white px-3 text-base font-medium text-primary ring-1 ring-primary/10 transition-colors hover:bg-primary hover:text-background lg:bg-transparent lg:px-0 lg:ring-0 lg:hover:bg-transparent lg:hover:text-accent-ink"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {faqGroups.map((group) => (
              <section key={group.title} id={anchor(group.title)} className="scroll-mt-28">
                <Reveal>
                  <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">{group.title}</h2>
                  <span className="mt-3 block h-1 w-12 rounded-full bg-accent" />
                </Reveal>
                <div className="mt-6">
                  <FaqList faqs={group.faqs} />
                </div>
              </section>
            ))}

            <Reveal>
              <p className="text-base text-ink-soft">
                Still have a question?{" "}
                <a href={site.phoneHref} className="font-semibold text-accent-ink underline underline-offset-2 hover:text-primary">
                  Call {site.phoneDisplay}
                </a>{" "}
                or{" "}
                <Link href="/contact" className="font-semibold text-accent-ink underline underline-offset-2 hover:text-primary">
                  send us a note
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
