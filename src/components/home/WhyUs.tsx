// WhyUs: differentiators with a trust badge strip and crew photo.
import Image from "next/image";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const reasons = [
  {
    title: "Fixed, written estimates",
    body: "A detailed scope and price before a single nail is driven. No surprise change orders, ever.",
  },
  {
    title: "One project manager, start to finish",
    body: "Your dedicated PM runs the build and sends a written update every week without you having to ask.",
  },
  {
    title: "In-house craftsmen, not a sub chain",
    body: "Our own carpenters and finishers do the work. Quality does not get diluted across four layers of subs.",
  },
  {
    title: "Two-year workmanship warranty",
    body: "We stand behind our work in writing. If something is not right, we come back and fix it.",
  },
];

const badges = [
  { label: "PA Licensed", detail: "HIC #PA088416" },
  { label: "Fully Insured", detail: "GL + Workers Comp" },
  { label: "Since 2009", detail: "15+ years building" },
  { label: "98% On Time", detail: "Proven track record" },
];

export default function WhyUs() {
  return (
    <Section tone="linen">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Photo side. */}
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/crew-engineers.jpg"
              alt="Two Keystone Builders project leads reviewing plans on site"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* Floating trust badge. */}
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-primary/90 px-5 py-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Our commitment
              </p>
              <p className="mt-1 text-sm font-medium text-background/90">
                Every project gets a dedicated manager, a written schedule, and weekly updates.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Content side. */}
        <div>
          <SectionHeading
            title="Why homeowners choose Keystone"
            intro="Big projects go sideways when no one is accountable. We built our entire process to remove that risk."
          />

          <ul className="mt-10 space-y-7">
            {reasons.map((reason, i) => (
              <Reveal as="li" key={reason.title} delay={i * 0.06} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary"
                >
                  &#10003;
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-primary">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Trust badges. */}
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="rounded-lg border border-primary/10 bg-white px-3 py-3 text-center shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">
                    {b.label}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">{b.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
