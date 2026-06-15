"use client";

// BeforeAfterSlider: drag the divider to reveal before vs after images side by side.
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Props = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  initialPosition?: number; // 0-100, default 50
};

export default function BeforeAfterSlider({ before, after, initialPosition = 50 }: Props) {
  const [pct, setPct] = useState(initialPosition);
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPct(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setActive(true);
    updateFromClientX(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!active) return;
    updateFromClientX(e.clientX);
  };
  const onMouseUp = () => setActive(false);

  // Touch handlers — touchstart needed to begin tracking
  const onTouchStart = (e: React.TouchEvent) => {
    setActive(true);
    updateFromClientX(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // prevent scroll while dragging
    updateFromClientX(e.touches[0].clientX);
  };
  const onTouchEnd = () => setActive(false);

  if (reduce) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 80vw, 100vw"
        />
        <span className="absolute bottom-3 right-3 rounded bg-primary/80 px-2 py-0.5 text-xs font-semibold text-background">
          After
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Before and after comparison. Drag the divider to compare."
      className="relative aspect-[16/9] select-none overflow-hidden rounded-lg shadow-lg cursor-col-resize touch-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* After image — sits underneath, full width. */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        className="pointer-events-none object-cover"
        sizes="(min-width: 1024px) 80vw, 100vw"
      />

      {/* Before image — clipped to reveal only the left portion. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 80vw, 100vw"
        />
      </div>

      {/* Divider line + drag handle. */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/80"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-primary/10">
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
