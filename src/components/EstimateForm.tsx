"use client";

// EstimateForm: estimate request form. Demo site, so submit opens the thank-you modal instead of sending.
import { useState } from "react";
import Link from "next/link";
import DemoSubmitModal, { fakeSubmit, type DemoSubmission } from "@/components/DemoSubmitModal";

const inputBase =
  "min-h-12 w-full rounded-md border border-primary/20 bg-white px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-accent focus:ring-2 focus:ring-accent/30";

const labelBase = "mb-1.5 block text-sm font-semibold text-primary";

function Required() {
  return (
    <>
      <span aria-hidden="true" className="text-rust">{" "}*</span>
      <span className="sr-only"> required</span>
    </>
  );
}

export default function EstimateForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<DemoSubmission | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const name = await fakeSubmit(e.currentTarget);
    setSubmitting(false);
    setSubmission({
      name,
      message:
        "On the live site, your estimate request would go straight to our team, and a project manager would call within one business day to schedule your free site visit.",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <p className="text-sm text-ink-soft">
          <span aria-hidden="true" className="text-rust">*</span> Required
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="est-name" className={labelBase}>Name<Required /></label>
            <input id="est-name" name="name" type="text" required autoComplete="name"
              className={inputBase} placeholder="Jane Smith" />
          </div>
          <div>
            <label htmlFor="est-phone" className={labelBase}>Phone<Required /></label>
            <input id="est-phone" name="phone" type="tel" required autoComplete="tel"
              className={inputBase} placeholder="(412) 555-0123" />
          </div>
        </div>

        <div>
          <label htmlFor="est-email" className={labelBase}>Email<Required /></label>
          <input id="est-email" name="email" type="email" required autoComplete="email"
            className={inputBase} placeholder="jane@example.com" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="est-type" className={labelBase}>Project type<Required /></label>
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
            <label htmlFor="est-timeline" className={labelBase}>Timeline<Required /></label>
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
          <label htmlFor="est-desc" className={labelBase}>Project description<Required /></label>
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

        <p className="text-sm text-ink-soft">
          We respond within one business day. Your info is never shared.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">Privacy policy</Link>.
        </p>
      </form>

      <DemoSubmitModal submission={submission} onClose={() => setSubmission(null)} />
    </>
  );
}
