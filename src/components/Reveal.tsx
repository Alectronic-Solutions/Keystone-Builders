"use client";

// Reveal: scroll-triggered fade-up wrapper. One reusable home for the
// animation rules in CLAUDE.md (whileInView, once, fade-up, no loops).
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  // With reduced motion, render in place with no transform or fade.
  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
