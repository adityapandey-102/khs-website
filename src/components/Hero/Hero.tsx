"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// Each slide plays for its own video's real duration before advancing —
// not a fixed interval — so no clip gets cut off early or lingers too long.
const slides = [
  {
    id: "ice-blue",
    label: "Jaquar Ice Blue Collection",
    tagline: "Cool Elegance for Modern Bathrooms.",
    cta: "Explore Bathware",
    href: "/bathware",
    // Sources are ordered smallest-file-first per format (not just "webm first") —
    // VP9 doesn't always beat H.264 on this footage, so we measured each pair and
    // let the browser grab whichever it hits first that it can play.
    video: {
      mobile: [
        { src: "/assets/khs/hero-video/ice-blue-mobile.mp4", type: "video/mp4" },
        { src: "/assets/khs/hero-video/ice-blue-mobile.webm", type: "video/webm" },
      ],
      desktop: [
        { src: "/assets/khs/hero-video/ice-blue-desktop.webm", type: "video/webm" },
        { src: "/assets/khs/hero-video/ice-blue-desktop.mp4", type: "video/mp4" },
      ],
    },
    poster: "/assets/khs/home/pexels-max-vakhtbovycn-6207947-scaled.jpg",
    duration: 30000,
  },
  {
    id: "florentine",
    label: "Jaquar Florentine Prime",
    tagline: "Precision Hand Showers, Timeless Design.",
    cta: "Discover Showers",
    href: "/bathware/shower-faucets",
    video: {
      mobile: [
        { src: "/assets/khs/hero-video/florentine-mobile.mp4", type: "video/mp4" },
        { src: "/assets/khs/hero-video/florentine-mobile.webm", type: "video/webm" },
      ],
      desktop: [
        { src: "/assets/khs/hero-video/florentine-desktop.webm", type: "video/webm" },
        { src: "/assets/khs/hero-video/florentine-desktop.mp4", type: "video/mp4" },
      ],
    },
    poster: "/assets/khs/bathware/countertop-basin/bathroom-4032529_1280.jpg",
    duration: 28000,
  },
  {
    id: "flexi",
    label: "Jaquar Flexi Nozzle Technology",
    tagline: "Adaptive Spray, Everyday Comfort.",
    cta: "View Collection",
    href: "/bathware/shower-faucets",
    video: {
      mobile: [
        { src: "/assets/khs/hero-video/flexi-mobile.mp4", type: "video/mp4" },
        { src: "/assets/khs/hero-video/flexi-mobile.webm", type: "video/webm" },
      ],
      desktop: [
        { src: "/assets/khs/hero-video/flexi-desktop.mp4", type: "video/mp4" },
        { src: "/assets/khs/hero-video/flexi-desktop.webm", type: "video/webm" },
      ],
    },
    poster: "/assets/khs/bathware/shower-faucets/pexels-vika-glitter-3315291-scaled.jpg",
    duration: 12000,
  },
  {
    id: "rotor",
    label: "Jaquar Rotor Series",
    tagline: "Effortless Control, Refined Flow.",
    cta: "Explore Bathware",
    href: "/bathware",
    video: {
      mobile: [
        { src: "/assets/khs/hero-video/rotor-mobile.mp4", type: "video/mp4" },
        { src: "/assets/khs/hero-video/rotor-mobile.webm", type: "video/webm" },
      ],
      desktop: [
        { src: "/assets/khs/hero-video/rotor-desktop.mp4", type: "video/mp4" },
        { src: "/assets/khs/hero-video/rotor-desktop.webm", type: "video/webm" },
      ],
    },
    poster: "/assets/khs/home/Krishna-Home-Studio-Hardware-1.png",
    duration: 12000,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  // "Armed" videos have a real <source> and are fetching/buffering. Nothing
  // is armed on the very first render — the poster photo is the true LCP
  // element and paints first, exactly like Jaquar's hero: photo, then video
  // fades in once it can actually play. This keeps the main thread free for
  // hydration instead of competing with a video fetch/decode from frame one.
  const [armed, setArmed] = useState<Set<number>>(() => new Set());
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const [errored, setErrored] = useState<Set<number>>(() => new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Arm the active slide only after the browser has actually painted (two
  // rAFs guarantee a committed frame), so the poster is always what shows
  // first rather than the video fetch racing hydration.
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setArmed((prev) => (prev.has(current) ? prev : new Set(prev).add(current)));
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [current]);

  // Once the active slide's video can actually play, start buffering the
  // next one so the following transition doesn't begin a cold fetch — but
  // only then, so we never pull two videos' worth of data at once. Adjusted
  // directly during render (comparing against the previous render's value)
  // rather than in an effect, per React's guidance for derived state.
  const [lastArmedFor, setLastArmedFor] = useState<number | null>(null);
  if (ready.has(current) && lastArmedFor !== current) {
    setLastArmedFor(current);
    const nextIndex = (current + 1) % slides.length;
    if (!armed.has(nextIndex)) {
      setArmed((prev) => new Set(prev).add(nextIndex));
    }
  }

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // A single re-scheduled timeout (not setInterval) so each slide waits out
  // its own real video duration before advancing. The countdown only starts
  // once the video is actually playable — no matter how long that takes —
  // so a slow connection just makes the poster show longer instead of the
  // slide getting force-advanced past a video that never got to play. The
  // only thing that skips a slide early is a genuine load failure (onError).
  const isCurrentReady = ready.has(current);
  const isCurrentErrored = errored.has(current);
  useEffect(() => {
    if (!isCurrentReady && !isCurrentErrored) return;
    const timer = setTimeout(next, isCurrentReady ? slides[current].duration : 0);
    return () => clearTimeout(timer);
  }, [current, next, isCurrentReady, isCurrentErrored]);

  // Play only the active video; pause the rest so they don't compete for
  // bandwidth/decoding and restart cleanly each time a slide comes back around.
  useEffect(() => {
    videoRefs.current.forEach((el, index) => {
      if (!el) return;
      if (index === current) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-140 w-full overflow-hidden bg-primary-dark" aria-label="Showcase">
      {slides.map((s, index) => {
        const isActive = index === current;
        const isArmed = armed.has(index);
        const isReady = ready.has(index);
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Real photo, shown until this slide's video is actually playable. */}
            <Image
              src={s.poster}
              alt={s.label}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-700 ${
                isReady ? "opacity-0" : "opacity-100"
              }`}
            />
            {isArmed && (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                muted
                loop
                playsInline
                preload={isActive ? "auto" : "metadata"}
                poster={s.poster}
                aria-hidden="true"
                onCanPlay={() => setReady((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))}
                onError={() => setErrored((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))}
                className={`h-full w-full object-cover transition-opacity duration-700 ${
                  isReady ? "opacity-100" : "opacity-0"
                }`}
              >
                {s.video.mobile.map((source) => (
                  <source key={source.src} src={source.src} type={source.type} media="(max-width: 767px)" />
                ))}
                {s.video.desktop.map((source) => (
                  <source key={source.src} src={source.src} type={source.type} />
                ))}
              </video>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-primary-dark/85 via-primary-dark/20 to-primary-dark/40" />
          </div>
        );
      })}

      <div className="container relative z-20 flex h-full items-end pb-24 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slide.id}-content`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
              {slide.label}
            </span>
            <h1 className="text-4xl font-light leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {slide.tagline}
            </h1>
            <Link
              href={slide.href}
              className="mt-8 inline-flex items-center gap-3 border border-white px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-surface hover:text-primary-dark"
            >
              {slide.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 sm:left-auto sm:right-10 sm:translate-x-0">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
