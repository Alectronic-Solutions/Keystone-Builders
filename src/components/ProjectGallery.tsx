"use client";

// ProjectGallery: clickable image grid that opens a full-screen lightbox.
import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";

type GalleryImage = { src: string; alt: string };

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={(i % 3) * 0.08}>
            {/* overflow-hidden on the inner card, not the Reveal wrapper, so the hover label doesn't get clipped */}
            <button
              type="button"
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg shadow-sm focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={`View ${img.alt} full screen`}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {/* Caption slides up on hover. */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-primary/85 to-transparent px-4 pb-4 pt-8 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-semibold text-background">{img.alt}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
