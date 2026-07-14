"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

const slides = [
  {
    id: "cinematic-1",
    tagline: "Born in Ice. Redefined by Design.",
    cta: "Explore Bathware",
    href: "/bathware",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=100&w=2000",
  },
  {
    id: "cinematic-2",
    tagline: "Quiet Luxury. Absolute Precision.",
    cta: "Discover Hardware",
    href: "/hardware",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=100&w=2000",
  },
  {
    id: "cinematic-3",
    tagline: "Sanctuaries Crafted for the Senses.",
    cta: "Experience Wellness",
    href: "/bathware/spa-wellness",
    image: "https://images.unsplash.com/photo-1555543666-41f237bf3ff7?auto=format&fit=crop&q=100&w=2000",
  },
  {
    id: "cinematic-4",
    tagline: "The Art of Architectural Detail.",
    cta: "View Collections",
    href: "/hardware",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=100&w=2000",
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000); // 7s for slow cinematic feel
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.hero} aria-label="Cinematic Showcase">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === current ? styles.active : ""}`}
          aria-hidden={index !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt="Luxury Showcase"
            className={styles.slideImage}
          />
          <div className={styles.overlay} />
          
          <div className={styles.contentWrap}>
            <h1 className={styles.headline}>{slide.tagline}</h1>
            <Link href={slide.href} className={styles.ctaButton}>
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Minimal Slider Dots */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
