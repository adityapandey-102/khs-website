"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    id: "bathware",
    label: "Bathware Collection",
    tagline: "Premium Bathware, Everyday Luxury.",
    cta: "Explore Bathware",
    href: "/bathware",
    image: "/assets/khs/home/pexels-max-vakhtbovycn-6207947-scaled.jpg",
  },
  {
    id: "hardware",
    label: "Architectural Hardware",
    tagline: "Precision Hardware. Built to Last.",
    cta: "Discover Hardware",
    href: "/hardware",
    image: "/assets/khs/home/Krishna-Home-Studio-Hardware-1.png",
  },
  {
    id: "spa-wellness",
    label: "Spa & Wellness",
    tagline: "Your Home, Your Retreat.",
    cta: "Experience Wellness",
    href: "/bathware/spa-wellness",
    image: "/assets/khs/home/massage-therapy-1731456_1280.jpg",
  },
  {
    id: "countertop-basin",
    label: "Designer Countertop Basin",
    tagline: "Sculptural Basins, Signature Style.",
    cta: "View Collection",
    href: "/bathware/countertop-basin",
    image: "/assets/khs/bathware/countertop-basin/bathroom-4032529_1280.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-160 w-full overflow-hidden bg-primary-dark" aria-label="Showcase">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark/85 via-primary-dark/20 to-primary-dark/40" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 flex h-full items-end pb-24 sm:pb-28">
        <motion.div
          key={`${slide.id}-content`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
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
            className="mt-8 inline-flex items-center gap-3 border border-white px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-primary-dark"
          >
            {slide.cta}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5 sm:left-auto sm:right-10 sm:translate-x-0">
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
