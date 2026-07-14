import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={`${styles.about} section`} id="about">
      <div className={styles.aboutGrid}>
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

        <div className={styles.aboutContent}>
          <div className={styles.contentShell}>
            <span className={styles.aboutLabel}>About Us</span>
            <h2 className={styles.aboutTitle}>
              Crafted spaces where <em>luxury feels effortless</em>
            </h2>
            <div className={styles.goldLine} />

            <p className={styles.aboutBody}>
              Krishna Home Studio began with a simple idea: premium interiors should feel
              attainable, beautifully curated, and deeply personal. What started as a response to
              a home construction need became a trusted destination for thoughtfully designed
              bathware, hardware, and lifestyle solutions across Bengaluru.
            </p>
            <p className={styles.aboutBody}>
              Today, we blend international design sensibility with practical guidance, helping
              homeowners, architects, and designers discover products that elevate everyday
              rituals without compromising on comfort or value.
            </p>

            <div className={styles.aboutBrands}>
              <span className={styles.brandLabel}>Trusted brands:</span>
              {['Hindware', 'Kohler', 'Grohe', 'Häfele'].map((brand) => (
                <span key={brand} className={styles.brandTag}>{brand}</span>
              ))}
            </div>

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

            <div className={styles.ctaRow}>
              <Link href="/about" className="btn-primary" id="about-section-cta">
                Discover Our Story
              </Link>
              <Link href="/media" className={styles.mediaLink}>
                Media & Recognition <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureCardLabel}>Featured in</span>
            <h3>Press features, awards, and design-led projects</h3>
            <p>
              From national media features to industry recognition, our work continues to inspire
              homeowners and design professionals alike.
            </p>
            <Link href="/media">Explore the story</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
