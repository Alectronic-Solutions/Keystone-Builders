"use client";

// ScrollProgress: a slim top-of-viewport bar showing page read progress.
import { useScroll, useSpring, motion, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Same element either way so hydration matches; reduced motion just skips the spring.
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[9998] h-[2px] origin-left bg-accent"
    />
  );
}
