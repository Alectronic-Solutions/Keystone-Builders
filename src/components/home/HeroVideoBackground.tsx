"use client";

// HeroVideoBackground: crossfading looped video background for the Hero.
// A static poster sits underneath so the hero is never blank. It covers first
// paint, slow mobile connections, and phones that block autoplay (iOS Low
// Power Mode), where playback starts on the first tap instead. The video stays
// hidden until frames are actually playing, so iOS never shows its native
// play-button overlay. Reduced-motion users keep the poster only.
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { basePath } from "@/lib/site";

const VIDEO_SOURCES = [
  `${basePath}/videos/hero-construction-1.mp4`,
  `${basePath}/videos/hero-construction-2.mp4`,
  `${basePath}/videos/hero-construction-3.mp4`,
];

const POSTER = `${basePath}/images/hero-video-poster.jpg`;

// Matches the opacity transition on the video elements.
const FADE_MS = 1200;

const GESTURE_EVENTS = ["touchstart", "pointerdown", "keydown"] as const;

export default function HeroVideoBackground() {
  const reduce = useReducedMotion();
  // Always true on the server and first client render so hydration matches;
  // flipped off after mount for reduced-motion users.
  const [allowVideo, setAllowVideo] = useState(true);
  const [started, setStarted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<0 | 1>(0);
  const activeRef = useRef<0 | 1>(0);
  const nextVideoNumber = useRef(2);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);

  const getVideo = (idx: 0 | 1) => (idx === 0 ? videoA.current : videoB.current);

  useEffect(() => {
    if (reduce) {
      videoA.current?.pause();
      setAllowVideo(false);
      return;
    }

    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    // iOS only autoplays when muted is set as a property before play().
    for (const el of [a, b]) {
      el.muted = true;
      el.defaultMuted = true;
    }

    const playActive = () => {
      const el = getVideo(activeRef.current);
      if (el && el.paused) el.play().catch(() => {});
    };

    // The first video may already be running from the autoplay attribute
    // before React hydrated and attached onPlaying.
    if (!a.paused && a.currentTime > 0) setStarted(true);
    playActive();

    // Fallback for devices that refuse autoplay: any tap starts playback.
    const onGesture = () => playActive();
    GESTURE_EVENTS.forEach((evt) =>
      window.addEventListener(evt, onGesture, { passive: true })
    );
    const removeGestures = () =>
      GESTURE_EVENTS.forEach((evt) => window.removeEventListener(evt, onGesture));
    a.addEventListener("playing", removeGestures, { once: true });

    // Pause while the hero is off screen to save battery and data on phones.
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) playActive();
      else getVideo(activeRef.current)?.pause();
    });
    io.observe(a);

    // Mobile Safari pauses video when the tab is backgrounded and does not resume it.
    const onVisibility = () => {
      if (document.visibilityState === "visible" && onScreen) playActive();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      removeGestures();
      a.removeEventListener("playing", removeGestures);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const handleEnded = useCallback((elIdx: 0 | 1) => {
    const finished = getVideo(elIdx);
    const nextIdx: 0 | 1 = elIdx === 0 ? 1 : 0;
    const next = getVideo(nextIdx);
    if (!finished || !next) return;

    // Hold on the finished clip's last frame until the next one is really
    // playing, so a slow mobile connection never fades to an empty frame.
    const swap = () => {
      activeRef.current = nextIdx;
      setActiveIdx(nextIdx);
      // Once the finished element has faded out, queue the following clip into it.
      // Autoplay is cleared first, or the hidden element would start the clip early.
      window.setTimeout(() => {
        finished.autoplay = false;
        finished.src = VIDEO_SOURCES[nextVideoNumber.current];
        finished.load();
        nextVideoNumber.current = (nextVideoNumber.current + 1) % VIDEO_SOURCES.length;
      }, FADE_MS);
    };

    next.addEventListener("playing", swap, { once: true });
    next.currentTime = 0;
    next.play().catch(() => {
      // Could not start the next clip: loop the current one instead.
      next.removeEventListener("playing", swap);
      finished.currentTime = 0;
      finished.play().catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaying = useCallback(() => setStarted(true), []);

  // The first clip is buffering or playing, so start warming up the second.
  const warmNext = useCallback(() => {
    const b = videoB.current;
    if (b && b.preload !== "auto") {
      b.preload = "auto";
      b.load();
    }
  }, []);

  return (
    <>
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {allowVideo && (
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: started ? 1 : 0 }}
        >
          <video
            ref={videoA}
            src={VIDEO_SOURCES[0]}
            muted
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{ opacity: activeIdx === 0 ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            onPlaying={() => {
              handlePlaying();
              warmNext();
            }}
            onEnded={() => handleEnded(0)}
          />
          <video
            ref={videoB}
            src={VIDEO_SOURCES[1]}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{ opacity: activeIdx === 1 ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            onPlaying={handlePlaying}
            onEnded={() => handleEnded(1)}
          />
        </div>
      )}
    </>
  );
}
