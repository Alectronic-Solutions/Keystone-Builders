"use client";

// CareersForm: job application form. Demo site, so submit opens the thank-you modal instead of sending.
import { useState } from "react";
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

export default function CareersForm({ positions }: { positions: string[] }) {
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
        "On the live site, your application would go to our hiring team, and we would reach out within a week if your experience is a fit.",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-sm text-ink-soft">
          <span aria-hidden="true" className="text-rust">*</span> Required
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="job-name" className={labelBase}>Full name<Required /></label>
            <input id="job-name" name="name" type="text" required autoComplete="name" className={inputBase} placeholder="Jane Smith" />
          </div>
          <div>
            <label htmlFor="job-phone" className={labelBase}>Phone<Required /></label>
            <input id="job-phone" name="phone" type="tel" required autoComplete="tel" className={inputBase} placeholder="(412) 555-0123" />
          </div>
        </div>

        <div>
          <label htmlFor="job-email" className={labelBase}>Email<Required /></label>
          <input id="job-email" name="email" type="email" required autoComplete="email" className={inputBase} placeholder="jane@example.com" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="job-position" className={labelBase}>Position<Required /></label>
            <select id="job-position" name="position" required className={inputBase} defaultValue="">
              <option value="" disabled>Select a position</option>
              {positions.map((p) => (
                <option key={p}>{p}</option>
              ))}
              <option>General application</option>
            </select>
          </div>
          <div>
            <label htmlFor="job-years" className={labelBase}>Years in the trades<Required /></label>
            <select id="job-years" name="experience" required className={inputBase} defaultValue="">
              <option value="" disabled>Select a range</option>
              <option>Less than 2 years</option>
              <option>2 to 5 years</option>
              <option>5 to 10 years</option>
              <option>10+ years</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="job-about" className={labelBase}>
            Tell us about your experience <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <textarea id="job-about" name="about" rows={4} className={`${inputBase} resize-none py-3`}
            placeholder="Recent projects, certifications, and the kind of work you enjoy most." />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="shine btn-3d inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-primary disabled:opacity-70 sm:w-auto"
        >
          <span className="relative z-[1]">{submitting ? "Sending..." : "Submit application"}</span>
        </button>
      </form>

      <DemoSubmitModal submission={submission} onClose={() => setSubmission(null)} />
    </>
  );
}
