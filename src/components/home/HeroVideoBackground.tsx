"use client";

// HeroVideoBackground: crossfading looped video background for the Hero,
// muted/inline/autoplay, falls back to a static poster when reduced motion
// is requested.
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { basePath } from "@/lib/site";

const VIDEO_SOURCES = [
  `${basePath}/videos/hero-construction-1.mp4`,
  `${basePath}/videos/hero-construction-2.mp4`,
  `${basePath}/videos/hero-construction-3.mp4`,
];

export default function HeroVideoBackground() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<0 | 1>(0);
  const nextVideoNumber = useRef(2);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const handleEnded = useCallback((elIdx: 0 | 1) => {
    // The hidden element already holds the source that plays next — just start it.
    const hiddenIdx = elIdx === 0 ? 1 : 0;
    const hiddenEl = videoRefs[hiddenIdx].current;
    if (hiddenEl) {
      hiddenEl.currentTime = 0;
      hiddenEl.play().catch(() => {});
    }
    setActiveIdx(hiddenIdx);

    // Once the just-finished element is safely hidden, queue the next source into it
    // for its future turn.
    const finishedEl = videoRefs[elIdx].current;
    if (finishedEl) {
      finishedEl.src = VIDEO_SOURCES[nextVideoNumber.current];
      finishedEl.load();
      nextVideoNumber.current = (nextVideoNumber.current + 1) % VIDEO_SOURCES.length;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduce) {
    return (
      <Image
        src={`${basePath}/images/hero-construction-site.jpg`}
        alt="A custom two-story home under construction in the Pittsburgh area"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  return (
    <>
      <motion.video
        ref={videoRefs[0]}
        src={VIDEO_SOURCES[0]}
        poster={`${basePath}/images/hero-construction-site.jpg`}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ opacity: activeIdx === 0 ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onEnded={() => handleEnded(0)}
      />
      <motion.video
        ref={videoRefs[1]}
        src={VIDEO_SOURCES[1]}
        poster={`${basePath}/images/hero-construction-site.jpg`}
        muted
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ opacity: activeIdx === 1 ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onEnded={() => handleEnded(1)}
      />
    </>
  );
}
