"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./ClienteleCarousel.module.css";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The attention to detail and curated selection at Krishna Home Studio made our architectural project effortless. The perfect balance of luxury and utility.",
    author: "Arjun Reddy",
    title: "Lead Architect, AR Designs"
  },
  {
    id: 2,
    quote: "Finding high-end architectural hardware used to be a challenge. KHS provided us with world-class options and exceptional consultation.",
    author: "Priya Sharma",
    title: "Homeowner, Whitefield"
  },
  {
    id: 3,
    quote: "A truly cinematic showroom experience. Their understanding of quiet luxury translates perfectly into the spaces they help build.",
    author: "Vikram Mehta",
    title: "Interior Designer"
  }
];

export default function ClienteleCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, current]
  );

  const next = useCallback(
    () => goTo((current + 1) % testimonials.length),
    [current, goTo]
  );

  const prev = useCallback(
    () => goTo((current - 1 + testimonials.length) % testimonials.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={`section ${styles.carouselSection}`}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="label">Social Proof</span>
          <h2 className="h2">Trusted by Visionaries</h2>
          <div className="gold-line-center" />
        </div>

        <div className={styles.carouselWrap}>
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft size={24} strokeWidth={1} />
          </button>

          <div className={styles.slidesContainer}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`${styles.slide} ${index === current ? styles.active : ""}`}
                aria-hidden={index !== current}
              >
                <Quote size={40} className={styles.quoteIcon} />
                <p className={styles.quoteText}>&ldquo;{testimonial.quote}&rdquo;</p>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.author}</span>
                  <span className={styles.authorTitle}>{testimonial.title}</span>
                </div>
              </div>
            ))}
          </div>

          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next} aria-label="Next testimonial">
            <ChevronRight size={24} strokeWidth={1} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
