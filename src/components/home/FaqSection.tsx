"use client";

// FaqSection: common contractor questions answered — also generates FAQPage schema.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "How do you price a project?",
    a: "Every estimate starts with a site visit and a conversation about your goals, timeline, and budget. We provide a written, itemized bid so you can see exactly where your money goes. There are no hidden fees or allowance traps.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. A bathroom renovation typically runs 6 to 10 weeks; a kitchen remodel 10 to 16 weeks; a new home build 9 to 14 months. We set a schedule before breaking ground and update you weekly throughout.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We hold a Pennsylvania Home Improvement Contractor license (PA HIC #PA088416), carry general liability coverage, and maintain workers compensation insurance on every crew member who steps onto your property.",
  },
  {
    q: "Do I need to move out during a remodel?",
    a: "For smaller projects like a single bathroom or kitchen, most homeowners stay in place. For larger renovations affecting multiple areas, we discuss staging and temporary living arrangements upfront so you can plan accordingly.",
  },
  {
    q: "What is your warranty?",
    a: "We back all work with a two-year workmanship warranty. If something is not right, call us and we come back to fix it. Manufacturer warranties on materials are passed through to you in writing at project close.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the estimate form on this page or call us directly at (412) 555-0142. We schedule a free site visit within a few business days, then follow up with a written proposal within a week.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section tone="linen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="Common questions"
          intro="Straight answers to what homeowners ask us most before they reach out."
          align="center"
        />

        <div className="mt-12 divide-y divide-primary/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-primary md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-base leading-relaxed text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
