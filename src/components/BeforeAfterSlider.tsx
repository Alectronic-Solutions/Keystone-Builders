"use client";

// BeforeAfterSlider: drag the divider to reveal before vs after images side by side.
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useInView, useReducedMotion, animate } from "framer-motion";

type Props = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  initialPosition?: number; // 0-100, default 50
};

export default function BeforeAfterSlider({ before, after, initialPosition = 50 }: Props) {
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.4 });

  // One-shot reveal: sweep the divider from closed to its resting position the
  // first time the slider enters view, then hand control to the user.
  useEffect(() => {
    if (reduce) {
      setPct(initialPosition);
      return;
    }
    if (!inView) return;
    const controls = animate(0, initialPosition, {
      duration: 1.2,
      ease: "easeInOut",
      onUpdate: setPct,
    });
    return () => controls.stop();
  }, [inView, reduce, initialPosition]);

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPct(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft") { e.preventDefault(); setPct((p) => clamp(p - step)); }
    else if (e.key === "ArrowRight") { e.preventDefault(); setPct((p) => clamp(p + step)); }
    else if (e.key === "Home") { e.preventDefault(); setPct(0); }
    else if (e.key === "End") { e.preventDefault(); setPct(100); }
  };

  // Pointer events cover mouse, pen, and touch. touch-pan-y on the container
  // lets a vertical swipe scroll the page on phones while a horizontal drag
  // moves the divider; the browser fires pointercancel when it takes over a scroll.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setActive(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    // A touch might be the start of a page scroll, so only jump on mouse or pen.
    if (e.pointerType !== "touch") updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!active) return;
    updateFromClientX(e.clientX);
  };
  const onPointerEnd = () => setActive(false);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/2] cursor-col-resize touch-pan-y select-none overflow-hidden rounded-lg shadow-lg"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      {/* After image, sits underneath, full width. */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        className="pointer-events-none object-cover"
        sizes="(min-width: 1200px) 1100px, 100vw"
      />

      {/* Before image, clipped to reveal only the left portion. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1200px) 1100px, 100vw"
        />
      </div>

      {/* Divider line + drag handle. The handle is the one focusable, keyboard-operable control. */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/80"
        style={{ left: `${pct}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison position"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={onHandleKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
          <span className="sr-only">Use left and right arrow keys to compare before and after.</span>
        </div>
      </div>

      {/* Corner labels. */}
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded bg-primary/75 px-2 py-0.5 text-xs font-semibold text-background">
        Before
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded bg-primary/75 px-2 py-0.5 text-xs font-semibold text-background">
        After
      </span>
    </div>
  );
}
