"use client";

// FaqList: accessible accordion of questions and answers, one open at a time.
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { Faq } from "@/lib/faqs";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-primary/10 border-y border-primary/10">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <Reveal key={faq.q} delay={Math.min(i, 6) * 0.05}>
            <h3 className="font-sans">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-12 w-full items-start justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-semibold text-primary md:text-lg">
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-base leading-relaxed text-ink-soft">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}
