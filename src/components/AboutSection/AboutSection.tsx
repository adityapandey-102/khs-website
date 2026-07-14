import Link from "next/link";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.parallaxContainer}>
        <div className={styles.parallaxBg} />
        <div className={styles.parallaxOverlay} />
        
        <div className={styles.contentWrap}>
          <span className={styles.aboutLabel}>Our Heritage</span>
          <h2 className={styles.aboutTitle}>
            Elevating everyday spaces with exceptional design.
          </h2>
          <div className="gold-line-center" />
          
          <p className={styles.aboutBody}>
            At Krishna Home Studio, we specialize in providing premium bathroom fittings and home hardware solutions that combine luxury with affordability. Established in 2018, our brand was inspired by a desire to offer high-quality, stylish products after experiencing a lack of sophisticated options in the market.
          </p>
          <p className={styles.aboutBody}>
            Today, we are a trusted destination in Bengaluru for those seeking elegant, functional, and innovative home solutions, partnering with world-class manufacturers like Kohler, Grohe, Hindware, and Häfele to turn your vision into reality.
          </p>

          <div className={styles.founderInfo}>
            <span className={styles.founderName}>Prakash Choudhary</span>
            <span className={styles.founderTitle}>Founder, Krishna Home Studio</span>
          </div>

          <div className={styles.ctaRow}>
            <Link href="/about" className="btn-primary" id="about-section-cta">
              Discover Our Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
