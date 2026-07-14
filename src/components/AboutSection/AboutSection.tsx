"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(`.${styles.revealOnScroll}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.heritageSection} aria-label="Our Heritage">
      <div className="container">
        <div className={styles.storyGrid}>
          
          {/* Left: Layered Imagery */}
          <div className={styles.imageCol}>
            <div className={`${styles.imageWrapPrimary} ${styles.revealOnScroll}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Architectural Space"
                className={styles.image}
              />
            </div>
            <div className={`${styles.imageWrapSecondary} ${styles.revealOnScroll}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1552596489-cf2b369dbfbc?auto=format&fit=crop&q=80&w=800"
                alt="Premium Hardware Detail"
                className={styles.image}
              />
            </div>
          </div>

          {/* Right: Storytelling Content */}
          <div className={styles.contentCol}>
            <div className={styles.timelineNode}>
              <span className={styles.timelineYear}>2018</span>
              <div className={styles.timelineLine} />
            </div>

            <span className={`label ${styles.revealOnScroll}`}>Our Heritage</span>
            
            <h2 className={`h2 ${styles.title} ${styles.revealOnScroll}`}>
              Sanctuaries Crafted <br />
              <span className={styles.titleItalic}>for the Senses</span>
            </h2>
            
            <div className={`gold-line ${styles.revealOnScroll}`} />

            <div className={`${styles.bodyContent} ${styles.revealOnScroll}`}>
              <p className="body-lg">
                Founded in Bengaluru by Prakash Choudhary, Krishna Home Studio was born from a singular vision: to curate the world’s finest architectural hardware and bathware for discerning spaces.
              </p>
              <p className="body-lg">
                We believe true luxury is quiet. It is found in the weight of a meticulously engineered door handle, the precise flow of a digital shower, and the seamless integration of form and function.
              </p>
            </div>

            <div className={`${styles.ctaWrap} ${styles.revealOnScroll}`}>
              <Link href="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </div>

            <div className={`${styles.metaCard} ${styles.revealOnScroll}`}>
              <span className={styles.metaCardLabel}>Featured in the press</span>
              <p>
                Award-winning storytelling, client trust, and a deeply curated retail experience brought to life across luxury interiors.
              </p>
              <Link href="/media" className={styles.metaCardLink}>
                View Media & Recognition
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
