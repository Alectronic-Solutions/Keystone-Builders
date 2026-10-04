"use client";

// MotionProvider: site-wide Framer Motion config. With reducedMotion="user",
// visitors who ask for less motion get instant transforms but keep the fades,
// and every component renders the same markup on server and client.
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
