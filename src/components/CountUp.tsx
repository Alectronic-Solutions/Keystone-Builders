"use client";

// CountUp: animates a leading number from zero when it scrolls into view.
// Preserves any non-numeric suffix ("+", "%", " year", etc.).
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.6,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  // Stable parsed values, not recomputed on every render.
  const parsed = useMemo(() => {
    const m = value.match(/^(\d+)(.*)$/);
    if (!m) return null;
    return { target: parseInt(m[1], 10), suffix: m[2] };
  }, [value]);

  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (!parsed || !inView) return;
    if (reduce) {
      setDisplay(parsed.target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const { target } = parsed;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // Cubic ease-out: decelerates into the final value.
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  // Intentionally omitting `parsed` and `duration` from deps: they are
  // stable after mount and including them would restart the animation.

  if (!parsed) {
    // Non-numeric value: just render it as-is.
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {parsed.suffix}
    </span>
  );
}
