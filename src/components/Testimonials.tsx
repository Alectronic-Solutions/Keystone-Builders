"use client";

// Testimonials: one review at a time, crossfading every 5 s.
// Pauses on hover and respects prefers-reduced-motion.
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/lib/testimonials";

function initials(name: string) {
  return name
    .replace(/^The\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const INTERVAL = 5000;

export default function Testimonials({ tone = "white" }: { tone?: "white" | "linen" }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduce, advance]);

  const t = testimonials[active];

  return (
    <Section tone={tone}>
      <SectionHeading
        title="What our clients say"
        intro="The same crews, the same standards, project after project across Greater Pittsburgh."
        align="center"
      />

      <div
        className="relative mx-auto mt-12 max-w-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Card with crossfade. Min-height prevents layout shift between quotes. */}
        <div className="relative min-h-[340px] sm:min-h-[280px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col rounded-2xl bg-background px-8 py-8 shadow-sm ring-1 ring-primary/8"
            >
              <p
                className="font-display text-4xl leading-none text-accent"
                aria-hidden="true"
              >
                &ldquo;
              </p>
              <blockquote className="mt-1 flex-1 text-base leading-relaxed text-ink md:text-lg">
                {t.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="font-semibold text-primary">{t.name}</p>
                  <p className="text-sm text-ink-soft">
                    {t.project} &middot; {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation. */}
        <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`View testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className="group relative h-2 overflow-hidden rounded-full bg-primary/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent"
              style={{ width: i === active ? "2rem" : "0.5rem" }}
            >
              {/* Fill bar animates across the active dot to show auto-advance progress. */}
              {i === active && !reduce && (
                <motion.span
                  key={active}
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                />
              )}
              {i === active && (
                <span className="absolute inset-0 rounded-full bg-accent" style={{ opacity: reduce ? 1 : 0 }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
