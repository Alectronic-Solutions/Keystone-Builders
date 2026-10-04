"use client";

// DemoSubmitModal: the thank-you card every form opens on submit. This is a
// demo site, so nothing is sent; the card says so plainly while still showing
// the confirmation experience a real visitor would get.
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

export type DemoSubmission = {
  // First name from the form, used to personalize the heading when present.
  name?: string;
  // What would happen next on a live site, in one sentence.
  message: string;
};

export default function DemoSubmitModal({
  submission,
  onClose,
}: {
  submission: DemoSubmission | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = submission !== null;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Keep focus on the single action while the dialog is open.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const firstName = submission?.name?.trim().split(/\s+/)[0];

  return (
    <AnimatePresence>
      {submission && (
        <motion.div
          key="demo-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[8000] flex items-end justify-center bg-primary/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            aria-describedby="demo-modal-body"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold rule across the top of the card. */}
            <span aria-hidden="true" className="block h-1 w-full bg-accent" />

            <div className="px-6 pb-7 pt-8 sm:px-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent-ink" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h2 id="demo-modal-title" className="mt-5 font-display text-2xl font-bold text-primary">
                {firstName ? `Thank you, ${firstName}!` : "Thank you!"}
              </h2>
              <p id="demo-modal-body" className="mt-3 text-base leading-relaxed text-ink-soft">
                {submission.message}
              </p>

              {/* Demo notice: nothing was actually sent. */}
              <div className="mt-6 rounded-xl border border-accent/40 bg-white px-4 py-4 text-left">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent-ink" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  This is a demo website
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {site.name} is a sample contractor site built by Alectronic Solutions.
                  Your message was not sent and nothing you typed was stored.
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="shine btn-3d mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-primary"
              >
                <span className="relative z-[1]">Got it</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Shared submit handler: validates natively, shows a brief sending state for
// realism, clears the form, and returns the visitor's name for the modal.
export async function fakeSubmit(form: HTMLFormElement): Promise<string | undefined> {
  const name = (new FormData(form).get("name") as string | null) ?? undefined;
  await new Promise((resolve) => setTimeout(resolve, 700));
  form.reset();
  return name;
}
