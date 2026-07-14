"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Hero.module.css";

const slides = [
  {
    id: "bathware",
    label: "Premium Bathware",
    title: "Enhancing Everyday Luxury",
    description:
      "Premium bathware solutions for discerning homeowners — where world-class brands meet impeccable design.",
    primaryCta: { label: "Explore Bathware", href: "/bathware" },
    secondaryCta: { label: "Discover More", href: "/about" },
    image: "/assets/old-site/Untitled-design-19.png",
  },
  {
    id: "hardware",
    label: "Architectural Hardware",
    title: "Where Functionality Meets Timeless Elegance",
    description:
      "Transforming living spaces through innovative hardware — from sophisticated door handles to modern security systems.",
    primaryCta: { label: "Explore Hardware", href: "/hardware" },
    secondaryCta: { label: "Our Story", href: "/about" },
    image: "/assets/old-site/Krishna-Home-Studio-Hardware-1-1024x576.png",
  },
  {
    id: "spa",
    label: "Spa & Wellness",
    title: "Your Home, Your Sanctuary",
    description:
      "Whirlpool bathtubs, steam generators and aromatherapy systems — because luxury begins at home.",
    primaryCta: { label: "Explore Spa & Wellness", href: "/bathware/spa-wellness" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: "/assets/old-site/massage-therapy-1731456_1280-1024x768.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 1200);
    },
    [isAnimating, current]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.hero} aria-label="Hero banner">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === current ? styles.active : ""}`}
          aria-hidden={index !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.slideImage}
            src={slide.image}
            alt={slide.title}
          />
          <div className={styles.slideOverlay} />
          <div className={styles.slideOverlayBottom} />

          <div className={`container ${styles.slideContent}`}>
            <span className={styles.slideLabel}>{slide.label}</span>
            <h1 className={styles.slideTitle}>{slide.title}</h1>
            <div className={styles.slideLine} />
            <p className={styles.slideDesc}>{slide.description}</p>
            <div className={styles.slideCtas}>
              <Link href={slide.primaryCta.href} className="btn-primary" id={`hero-cta-primary-${slide.id}`}>
                {slide.primaryCta.label}
              </Link>
              <Link href={slide.secondaryCta.href} className="btn-outline" id={`hero-cta-secondary-${slide.id}`}>
                {slide.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow Navigation */}
      <button
        className={`${styles.arrowBtn} ${styles.arrowLeft}`}
        onClick={prev}
        aria-label="Previous slide"
        id="hero-prev"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        className={`${styles.arrowBtn} ${styles.arrowRight}`}
        onClick={next}
        aria-label="Next slide"
        id="hero-next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Navigation */}
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.label}`}
            aria-selected={index === current}
            role="tab"
            id={`hero-dot-${index}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
