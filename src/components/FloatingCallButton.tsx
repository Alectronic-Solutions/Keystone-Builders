"use client";

// FloatingCallButton: a compact icon-only call pill pinned on mobile after scrolling.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

export default function FloatingCallButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.phoneHref}
          aria-label={`Call ${site.name} at ${site.phoneDisplay}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-lg ring-1 ring-accent/30 md:hidden"
          style={{
            boxShadow: "0 4px 20px -4px rgba(201,169,110,0.55), 0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
