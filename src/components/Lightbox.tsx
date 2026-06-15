"use client";

// Lightbox: full-screen image viewer with prev/next navigation and keyboard support.
import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const isOpen = index !== null;
  const image = index !== null ? images[index] : null;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-primary/95 px-4"
          onClick={onClose}
        >
          {/* Image container — click inside stops propagation so the image doesn't close. */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="relative max-h-[88vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-background/70">{image.alt}</p>

            {/* Prev / Next. */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => { e.stopPropagation(); onPrev(); }}
                  className="absolute left-0 top-1/2 -translate-x-14 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-accent hover:text-primary max-lg:hidden"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  className="absolute right-0 top-1/2 translate-x-14 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-accent hover:text-primary max-lg:hidden"
                >
                  <ChevronRight />
                </button>
                {/* Mobile swipe buttons below image. */}
                <div className="mt-5 flex items-center justify-center gap-4 lg:hidden">
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-background/10 text-background"
                  >
                    <ChevronLeft />
                  </button>
                  <span className="text-sm text-background/60">
                    {(index ?? 0) + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-background/10 text-background"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Close button. */}
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-accent hover:text-primary"
          >
            <CloseIcon />
          </button>

          {/* Counter (desktop). */}
          {images.length > 1 && (
            <span className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-sm text-background/60 lg:block">
              {(index ?? 0) + 1} / {images.length}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
