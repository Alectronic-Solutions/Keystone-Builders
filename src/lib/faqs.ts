import { site } from "@/lib/site";

// Frequently asked questions. The homepage shows a short selection; /faq shows every group.

export type Faq = { q: string; a: string };

export const faqGroups: { title: string; faqs: Faq[] }[] = [
  {
    title: "Getting started",
    faqs: [
      {
        q: "How do I get started?",
        a: `Fill out our online estimate form or call us directly at ${site.phoneDisplay}. We schedule a free site visit within a few business days, then follow up with a written proposal within a week.`,
      },
      {
        q: "Which areas do you serve?",
        a: "We build throughout Allegheny, Butler, Westmoreland, and Washington counties. If you are near the edge of that area, call us and we will let you know.",
      },
      {
        q: "Are you licensed and insured?",
        a: `Yes. We hold a Pennsylvania Home Improvement Contractor license (${site.license}), carry general liability coverage, and maintain workers compensation insurance on every crew member who steps onto your property.`,
      },
      {
        q: "Is there a minimum project size?",
        a: "Our residential projects typically start around $40,000, which covers most full bathroom renovations. Smaller repairs are usually better served by a handyman, and we are happy to recommend one.",
      },
    ],
  },
  {
    title: "Pricing and payments",
    faqs: [
      {
        q: "How do you price a project?",
        a: "Every estimate starts with a site visit and a conversation about your goals, timeline, and budget. We provide a written, itemized bid so you can see exactly where your money goes. There are no hidden fees or allowance traps.",
      },
      {
        q: "How are payments scheduled?",
        a: "Payments follow construction milestones written into your contract, such as demolition, rough-in, and drywall. You never pay far ahead of the work that is complete.",
      },
      {
        q: "What happens if the scope changes?",
        a: "Any change is priced in writing and signed by you before the work happens. You will always know the running total of your project.",
      },
      {
        q: "Do you offer financing?",
        a: "We work with third-party lenders that offer home improvement loans and lines of credit. See our financing page for the options our clients use most.",
      },
    ],
  },
  {
    title: "During construction",
    faqs: [
      {
        q: "How long does a typical project take?",
        a: "Timelines vary by scope. A bathroom renovation typically runs 6 to 10 weeks; a kitchen remodel 10 to 16 weeks; a new home build 9 to 14 months. We set a schedule before breaking ground and update you weekly throughout.",
      },
      {
        q: "Do I need to move out during a remodel?",
        a: "For smaller projects like a single bathroom or kitchen, most homeowners stay in place. For larger renovations affecting multiple areas, we discuss staging and temporary living arrangements upfront so you can plan accordingly.",
      },
      {
        q: "Who will I talk to during the project?",
        a: "One dedicated project manager runs your job from start to finish and sends a written update every week. You will have their cell number.",
      },
      {
        q: "Who pulls the permits?",
        a: "We do. Our office handles permit applications, inspections, and final sign-off with your township or the City of Pittsburgh.",
      },
    ],
  },
  {
    title: "After the build",
    faqs: [
      {
        q: "What is your warranty?",
        a: "We back all work with a two-year workmanship warranty. If something is not right, call us and we come back to fix it. Manufacturer warranties on materials are passed through to you in writing at project close.",
      },
      {
        q: "What if something goes wrong after the warranty ends?",
        a: "Call us anyway. We maintain the homes we build, and past clients get priority scheduling for service and future projects.",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((g) => g.faqs);
const pick = (q: string) => allFaqs.find((f) => f.q === q)!;

// The six questions shown in the homepage FAQ section.
export const homeFaqs: Faq[] = [
  pick("How do you price a project?"),
  pick("How long does a typical project take?"),
  pick("Are you licensed and insured?"),
  pick("Do I need to move out during a remodel?"),
  pick("What is your warranty?"),
  pick("How do I get started?"),
];

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export { allFaqs };
