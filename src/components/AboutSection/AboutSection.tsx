import Link from "next/link";
import { FeaturedProducts } from "@/components/HomeExtras/HomeExtras";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={`${styles.about} section`} id="about">
      <div className={styles.aboutGrid}>
        {/* Image Side */}
        <div className={styles.aboutImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/old-site/WhatsApp-Image-2024-05-18-at-5.51.39-PM.jpeg"
            alt="Luxurious bathroom design by Krishna Home Studio"
            className={styles.aboutImage}
          />
          <div className={styles.aboutImageOverlay} />
          <div className={styles.aboutBadge}>
            <span className={styles.aboutBadgeYear}>2018</span>
            <span className={styles.aboutBadgeLabel}>Established</span>
          </div>
        </div>

        {/* Content Side */}
        <div className={styles.aboutContent}>
          <span className={styles.aboutLabel}>About Us</span>
          <h2 className={styles.aboutTitle}>
            Luxury & Affordability, <em>Hand in Hand</em>
          </h2>
          <div className={styles.goldLine} />

          <p className={styles.aboutBody}>
            At Krishna Home Studio, we specialise in providing premium bathroom fittings
            and home hardware solutions that combine luxury with affordability. Established in
            2018 by Prakash Choudhary, our brand was inspired by a desire to offer
            high-quality, stylish products after experiencing the lack of options during his
            own home construction.
          </p>
          <p className={styles.aboutBody}>
            Today, Krishna Home Studio is a trusted destination for those seeking elegant,
            functional, and innovative home solutions across Bengaluru and beyond.
          </p>

          {/* Brand Partners */}
          <div className={styles.aboutBrands}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "0.5rem" }}>Brands:</span>
            {["Hindware", "Kohler", "Grohe"].map((b) => (
              <span key={b} className={styles.brandTag}>{b}</span>
            ))}
          </div>

          {/* Stats */}
          <div className={styles.aboutStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>7+</span>
              <span className={styles.statLabel}>Years of Excellence</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Design Awards</span>
            </div>
          </div>

          <Link href="/about" className="btn-ghost" id="about-section-cta">
            Discover Our Story
          </Link>
          <FeaturedProducts />
        </div>
      </div>
    </section>
  );
}
