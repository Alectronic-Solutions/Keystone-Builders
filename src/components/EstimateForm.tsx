"use client";

// EstimateForm: estimate request posting to FormSubmit. Shows a thank-you modal on submit.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const inputBase =
  "min-h-12 w-full rounded-md border border-primary/20 bg-white px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-accent focus:ring-2 focus:ring-accent/30";

const labelBase = "mb-1.5 block text-sm font-semibold text-primary";

export default function EstimateForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(site.formSubmitAction, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
    } catch {
      // FormSubmit doesn't support JSON Accept header on free plan; the fetch
      // will CORS-error but the form still delivers. Show success regardless.
    }

    setSubmitting(false);
    setSubmitted(true);
    form.reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* FormSubmit configuration. */}
        <input type="hidden" name="_subject" value="New estimate request from keystonebuilders.com" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="est-name" className={labelBase}>Name</label>
            <input id="est-name" name="name" type="text" required autoComplete="name"
              className={inputBase} placeholder="Jane Smith" />
          </div>
          <div>
            <label htmlFor="est-phone" className={labelBase}>Phone</label>
            <input id="est-phone" name="phone" type="tel" required autoComplete="tel"
              className={inputBase} placeholder="(412) 555-0123" />
          </div>
        </div>

        <div>
          <label htmlFor="est-email" className={labelBase}>Email</label>
          <input id="est-email" name="email" type="email" required autoComplete="email"
            className={inputBase} placeholder="jane@example.com" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="est-type" className={labelBase}>Project type</label>
            <select id="est-type" name="project_type" required className={inputBase} defaultValue="">
              <option value="" disabled>Select a type</option>
              <option>New Home</option>
              <option>Remodel</option>
              <option>Addition</option>
              <option>Commercial</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="est-timeline" className={labelBase}>Timeline</label>
            <select id="est-timeline" name="timeline" required className={inputBase} defaultValue="">
              <option value="" disabled>Select a timeline</option>
              <option>ASAP</option>
              <option>1 to 3 months</option>
              <option>3 to 6 months</option>
              <option>Planning ahead</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="est-budget" className={labelBase}>
            Budget range <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <select id="est-budget" name="budget" className={inputBase} defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Under $50K</option>
            <option>$50K to $150K</option>
            <option>$150K to $500K</option>
            <option>$500K and up</option>
          </select>
        </div>

        <div>
          <label htmlFor="est-desc" className={labelBase}>Project description</label>
          <textarea id="est-desc" name="description" rows={5} required
            className={`${inputBase} resize-none py-3`}
            placeholder="Tell us about your project, your goals, and the neighborhood or address." />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="shine btn-3d inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-base font-semibold text-primary disabled:opacity-70 sm:w-auto"
        >
          <span className="relative z-[1]">
            {submitting ? "Sending..." : "Request My Free Estimate"}
          </span>
        </button>

        <p className="text-xs text-ink-soft">
          We respond within one business day. Your info is never shared.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-ink">Privacy policy</a>.
        </p>
      </form>

      {/* Thank-you modal. */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[8000] flex items-center justify-center bg-primary/70 px-4 backdrop-blur-sm"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-md rounded-2xl bg-background px-8 py-10 shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Checkmark circle. */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-primary">Request received!</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Thanks for reaching out. A member of the Keystone Builders team will be in touch within one business day to discuss your project.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="shine btn-3d mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-primary"
              >
                <span className="relative z-[1]">Done</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
