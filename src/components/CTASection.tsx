// CTASection: closing call to action with phone number prominent — the page's conversion moment.
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { site } from "@/lib/site";

export default function CTASection({
  title = "Ready to build something great?",
  intro = "Tell us about your project and we will get you a clear, written estimate. No pressure, no obligation.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-background">
      {/* Subtle texture: a large faint keystone shape in the background. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[480px] w-[480px] -translate-y-1/2 opacity-[0.04]"
        viewBox="0 0 32 32"
      >
        <path d="M9 4 H23 L28 28 H4 Z" fill="white" />
        <path d="M14 4 H18 L19.2 28 H12.8 Z" fill="white" />
      </svg>

      <div className="mx-auto max-w-content px-4 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold leading-tight text-background md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base text-background/75 md:text-lg">{intro}</p>

              {/* Social proof strip. */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-background/60">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Free written estimates
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Response within one business day
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {site.license}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 sm:items-center">
              <Button href="/contact" variant="accent">
                Get a Free Estimate
              </Button>
              <a
                href={site.phoneHref}
                className="group flex items-center gap-2 text-sm font-semibold text-background/80 transition-colors hover:text-background"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <span className="underline underline-offset-2 decoration-background/40 group-hover:decoration-background">
                  {site.phoneDisplay}
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
