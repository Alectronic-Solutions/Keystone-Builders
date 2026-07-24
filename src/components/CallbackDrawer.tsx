"use client";

// CallbackDrawer: slide-in panel for quick callback requests, triggered from the navbar.
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

const inputBase =
  "min-h-11 w-full rounded-md border border-primary/20 bg-white px-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-accent focus:ring-2 focus:ring-accent/30";

const labelBase = "mb-1 block text-sm font-semibold uppercase tracking-wide text-primary";

export default function CallbackDrawer({ open, onClose }: DrawerProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  // Reset form state after drawer finishes closing.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setDone(false); setSubmitting(false); setError(false); }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(site.formSubmitAction, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("FormSubmit request failed");
      setDone(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        // Keyed fragment so AnimatePresence tracks a single child.
        <motion.div key="drawer-root" className="contents">
          {/* Backdrop. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[5000] bg-primary/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Drawer panel. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request a callback"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-[5001] flex w-full max-w-sm flex-col bg-background shadow-2xl"
          >
            {/* Header. */}
            <div className="flex items-center justify-between border-b border-primary/10 px-6 py-5">
              <div>
                <p className="font-display text-lg font-bold text-primary">Request a callback</p>
                <p className="mt-0.5 text-sm text-ink-soft">We call back within one business day.</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body. */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-5 py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-xl font-bold text-primary">You are on the list!</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        A Keystone Builders team member will call you back within one business day.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-2 text-sm font-semibold text-accent-ink underline underline-offset-2"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <input type="hidden" name="_subject" value="Callback request from keystonebuilders.com" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                    <p className="text-sm text-ink-soft">
                      <span aria-hidden="true" className="text-rust">*</span> Required
                    </p>

                    <div>
                      <label htmlFor="cb-name" className={labelBase}>
                        Your name
                        <span aria-hidden="true" className="text-rust"> *</span>
                        <span className="sr-only"> required</span>
                      </label>
                      <input id="cb-name" name="name" type="text" required autoComplete="name"
                        className={inputBase} placeholder="Jane Smith" />
                    </div>

                    <div>
                      <label htmlFor="cb-phone" className={labelBase}>
                        Best phone number
                        <span aria-hidden="true" className="text-rust"> *</span>
                        <span className="sr-only"> required</span>
                      </label>
                      <input id="cb-phone" name="phone" type="tel" required autoComplete="tel"
                        className={inputBase} placeholder="(412) 555-0123" />
                    </div>

                    <div>
                      <label htmlFor="cb-time" className={labelBase}>Best time to call</label>
                      <select id="cb-time" name="best_time" className={inputBase} defaultValue="">
                        <option value="">No preference</option>
                        <option>Morning (8am to noon)</option>
                        <option>Afternoon (noon to 5pm)</option>
                        <option>Evening (after 5pm)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="cb-note" className={labelBase}>
                        Project note{" "}
                        <span className="font-normal normal-case text-ink-soft">(optional)</span>
                      </label>
                      <input id="cb-note" name="note" type="text"
                        className={inputBase} placeholder="Kitchen remodel, roughly 2,000 sq ft" />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="shine btn-3d mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent text-base font-semibold text-primary disabled:opacity-70"
                    >
                      <span className="relative z-[1]">
                        {submitting ? "Sending..." : "Request callback"}
                      </span>
                    </button>

                    {error && (
                      <p role="alert" aria-live="assertive" className="text-sm font-semibold text-rust">
                        Something went wrong. Please try again, or call us directly.
                      </p>
                    )}

                    <p className="text-center text-sm text-ink-soft">
                      Or call us now:{" "}
                      <a href={site.phoneHref} className="font-semibold text-accent-ink">
                        {site.phoneDisplay}
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
