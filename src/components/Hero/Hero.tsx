"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MOBILE_BREAKPOINT = 767;

// Three real tiers, not five — the source footage tops out at 1280x542
// (confirmed against the original masters), so "tablet" and "large/retina
// desktop" would just be upscaled duplicates of "desktop" with no real
// quality gain. See docs/hero-video-delivery-architecture.md for the full
// reasoning.
type VideoTier = "mobileStandard" | "mobileRetina" | "desktop";

type Slide = {
  id: string;
  label: string;
  tagline: string;
  cta: string;
  href: string;
  poster: string;
  video: Record<VideoTier, string>;
  duration: number;
};

// Each slide plays for its own video's real duration before advancing —
// not a fixed interval — so no clip gets cut off early or lingers too long.
const slides: Slide[] = [
  {
    id: "ice-blue",
    label: "Jaquar Ice Blue Collection",
    tagline: "Cool Elegance for Modern Bathrooms.",
    cta: "Explore Bathware",
    href: "/bathware",
    poster: "/assets/khs/home/pexels-max-vakhtbovycn-6207947-scaled.jpg",
    video: {
      mobileStandard: "/assets/khs/hero-video/ice-blue-mobile-standard.mp4",
      mobileRetina: "/assets/khs/hero-video/ice-blue-mobile-retina.mp4",
      desktop: "/assets/khs/hero-video/ice-blue-desktop.mp4",
    },
    duration: 30000,
  },
  {
    id: "florentine",
    label: "Jaquar Florentine Prime",
    tagline: "Precision Hand Showers, Timeless Design.",
    cta: "Discover Showers",
    href: "/bathware/shower-faucets",
    poster: "/assets/khs/bathware/countertop-basin/bathroom-4032529_1280.jpg",
    video: {
      mobileStandard: "/assets/khs/hero-video/florentine-mobile-standard.mp4",
      mobileRetina: "/assets/khs/hero-video/florentine-mobile-retina.mp4",
      desktop: "/assets/khs/hero-video/florentine-desktop.mp4",
    },
    duration: 28000,
  },
  {
    id: "flexi",
    label: "Jaquar Flexi Nozzle Technology",
    tagline: "Adaptive Spray, Everyday Comfort.",
    cta: "View Collection",
    href: "/bathware/shower-faucets",
    poster: "/assets/khs/bathware/shower-faucets/pexels-vika-glitter-3315291-scaled.jpg",
    video: {
      mobileStandard: "/assets/khs/hero-video/flexi-mobile-standard.mp4",
      mobileRetina: "/assets/khs/hero-video/flexi-mobile-retina.mp4",
      desktop: "/assets/khs/hero-video/flexi-desktop.mp4",
    },
    duration: 12000,
  },
  {
    id: "rotor",
    label: "Jaquar Rotor Series",
    tagline: "Effortless Control, Refined Flow.",
    cta: "Explore Bathware",
    href: "/bathware",
    poster: "/assets/khs/home/Krishna-Home-Studio-Hardware-1.png",
    video: {
      mobileStandard: "/assets/khs/hero-video/rotor-mobile-standard.mp4",
      mobileRetina: "/assets/khs/hero-video/rotor-mobile-retina.mp4",
      desktop: "/assets/khs/hero-video/rotor-desktop.mp4",
    },
    duration: 12000,
  },
];

function resolveVideoSrc(slide: Slide, tier: VideoTier) {
  return slide.video[tier];
}

// React (not the browser) decides which tier to load — from viewport width,
// device pixel ratio (splits the mobile bucket into standard vs. retina),
// and, where the Network Information API is available (not in Safari — a
// progressive enhancement, not a dependency), a data-saver/slow-connection
// override that forces the smallest tier regardless of screen size.
// useSyncExternalStore is the correct primitive here: the server has no
// viewport, so getServerSnapshot assumes desktop, and React reconciles to
// the real tier immediately after hydration.
function resolveTier(width: number, dpr: number, saveData: boolean, slowConnection: boolean): VideoTier {
  if (saveData || slowConnection) {
    return "mobileStandard";
  }
  if (width <= MOBILE_BREAKPOINT) {
    return dpr > 2 ? "mobileRetina" : "mobileStandard";
  }
  return "desktop";
}

type NetworkInformationLike = { effectiveType?: string; saveData?: boolean; addEventListener?: (type: "change", cb: () => void) => void; removeEventListener?: (type: "change", cb: () => void) => void };
function getConnection(): NetworkInformationLike | undefined {
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
}

function subscribeToTier(callback: () => void) {
  window.addEventListener("resize", callback);
  const connection = getConnection();
  connection?.addEventListener?.("change", callback);
  return () => {
    window.removeEventListener("resize", callback);
    connection?.removeEventListener?.("change", callback);
  };
}
function getTierSnapshot(): VideoTier {
  const connection = getConnection();
  const slowConnection = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
  return resolveTier(window.innerWidth, window.devicePixelRatio || 1, connection?.saveData ?? false, slowConnection);
}
function getTierServerSnapshot(): VideoTier {
  return "desktop";
}

// The active slide's video. Mounted fresh (via `key`) every time the source
// changes, so its "has a real frame been presented" state never needs manual
// resetting — a new mount is a new, correct starting state by construction.
function HeroVideo({
  src,
  poster,
  onFirstFrame,
  onError,
}: {
  src: string;
  poster: string;
  onFirstFrame: () => void;
  onError: () => void;
}) {
  // requestVideoFrameCallback confirms a frame was actually decoded AND
  // composited — stronger than canplay, which only promises enough data to
  // begin playback. Falls back to loadeddata + one animation frame on
  // browsers without it (older Firefox).
  const handleRef = useCallback(
    (el: HTMLVideoElement | null) => {
      if (!el) return;
      if (typeof el.requestVideoFrameCallback === "function") {
        el.requestVideoFrameCallback(() => onFirstFrame());
      } else {
        el.addEventListener("loadeddata", () => requestAnimationFrame(onFirstFrame), { once: true });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <video
      ref={handleRef}
      src={src}
      poster={poster}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      aria-hidden="true"
      onError={onError}
      className="h-full w-full object-cover"
    />
  );
}

// Silent metadata-only warm-up for the next slide's video — never played,
// never visible. Gives the next transition a head start without paying for
// the full file until it's actually needed.
function HeroPreloadVideo({ src }: { src: string }) {
  return <video src={src} muted playsInline preload="metadata" aria-hidden="true" className="hidden" />;
}

export default function Hero() {
  const tier = useSyncExternalStore(subscribeToTier, getTierSnapshot, getTierServerSnapshot);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  // Which src last reported a first frame. "Loaded" is derived by comparing
  // this to the active src, rather than a boolean reset via effect — the
  // React-recommended way to express "this resets whenever the input
  // changes" without a synchronous setState-in-effect.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const current = slides[currentIndex];
  const upcoming = slides[(currentIndex + 1) % slides.length];
  const currentSrc = resolveVideoSrc(current, tier);
  const nextSrc = resolveVideoSrc(upcoming, tier);
  const videoLoaded = loadedSrc === currentSrc;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((prevIndex) => {
      setPreviousIndex(prevIndex);
      return index;
    });
  }, []);

  // Auto-advance only once the active slide has actually started playing —
  // a slow connection just holds the poster longer, it never skips a slide
  // before it got the chance to show.
  useEffect(() => {
    if (!videoLoaded) return;
    const timer = setTimeout(() => {
      goToSlide((currentIndex + 1) % slides.length);
    }, current.duration);
    return () => clearTimeout(timer);
  }, [videoLoaded, currentIndex, current.duration, goToSlide]);

  // Drop the outgoing slide once the incoming one has visibly taken over —
  // 700ms matches the crossfade duration below.
  useEffect(() => {
    if (!videoLoaded || previousIndex === null) return;
    const timer = setTimeout(() => setPreviousIndex(null), 700);
    return () => clearTimeout(timer);
  }, [videoLoaded, previousIndex]);

  return (
    <section className="relative h-[85vh] min-h-140 w-full overflow-hidden bg-primary-dark" aria-label="Showcase">
      {/* Outgoing slide: stays fully visible until the incoming slide's video
          is confirmed on-screen, then fades away and unmounts. */}
      {previousIndex !== null && (
        <div
          key={`prev-${slides[previousIndex].id}`}
          className={`absolute inset-0 z-10 transition-opacity duration-700 ease-in-out ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden
        >
          <video
            src={resolveVideoSrc(slides[previousIndex], tier)}
            muted
            loop
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark/85 via-primary-dark/20 to-primary-dark/40" />
        </div>
      )}

      {/* Active slide */}
      <div className="absolute inset-0 z-0">
        <Image
          src={current.poster}
          alt={current.label}
          fill
          priority={currentIndex === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        />
        <div className={`absolute inset-0 transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}>
          <HeroVideo
            key={currentSrc}
            src={currentSrc}
            poster={current.poster}
            onFirstFrame={() => setLoadedSrc(currentSrc)}
            onError={() => goToSlide((currentIndex + 1) % slides.length)}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/85 via-primary-dark/20 to-primary-dark/40" />
      </div>

      <HeroPreloadVideo key={nextSrc} src={nextSrc} />

      <div className="container relative z-20 flex h-full items-end pb-24 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-content`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="mb-5 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {current.label}
            </span>
            <h1 className="text-[2.75rem] font-light leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.5rem]">
              {current.tagline}
            </h1>
            <Link
              href={current.href}
              className="group mt-10 inline-flex items-center gap-4 border border-white/70 px-9 py-4 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-primary-dark"
            >
              {current.cta}
              <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 sm:left-auto sm:right-10 sm:translate-x-0">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
