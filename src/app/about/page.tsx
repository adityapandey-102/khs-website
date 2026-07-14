import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Krishna Home Studio's journey of delivering affordable luxury bathware and hardware solutions in Bengaluru since 2018.",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Page Hero Banner */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/old-site/WhatsApp-Image-2024-05-18-at-5.51.39-PM.jpeg"
          alt="Krishna Home Studio luxury showroom design"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Our Journey</span>
            <h1 className="page-hero__title">About Us</h1>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Established 2018</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>The Pursuit of Excellence</h2>
              <div className="gold-line" />
              <p className={styles.paragraph}>
                Founded in 2018 by Prakash Choudhary, Krishna Home Studio emerged from a real-world dilemma. During the construction of his own residence, Prakash experienced first-hand the challenges of sourcing high-quality, modern, and aesthetically pleasing bathroom fittings and door hardware that balanced luxury styling with reasonable pricing.
              </p>
              <p className={styles.paragraph}>
                Recognizing a massive gap in the retail sector for value-driven luxury solutions, he launched Krishna Home Studio. Today, we are proud to be one of Bengaluru&apos;s most trusted destinations for sanitaryware, bath fittings, cabinet organizers, spa setups, and architectural hardware.
              </p>
              <p className={styles.paragraph}>
                By working directly as authorized partners with global industry leaders like Hindware, Kohler, Grohe, H&auml;fele, Ebco, Blum, and Hettich, we bridge the gap between premium international standards and direct consumer access, delivering state-of-the-art designs without compromise.
              </p>
            </div>
            <div className={styles.storyImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/old-site/IMG-20230520-WA0126-1.jpg"
                alt="Luxury washbasin and gold faucet layout"
                className={styles.storyImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision Section */}
      <section className="section" style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)" }}>
        <div className="container">
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <h3 className="h3" style={{ color: "var(--color-gold)", marginBottom: "1rem" }}>Our Mission</h3>
              <p style={{ opacity: 0.8, fontWeight: 300, fontSize: "0.95rem" }}>
                To transform residential and commercial interiors by offering a curated selection of world-class bathware and hardware solutions that achieve the ultimate synergy of design, longevity, and affordable luxury.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <h3 className="h3" style={{ color: "var(--color-gold)", marginBottom: "1rem" }}>Our Vision</h3>
              <p style={{ opacity: 0.8, fontWeight: 300, fontSize: "0.95rem" }}>
                To set the benchmark in premium interior styling retail, offering unmatched consulting services, seamless post-purchase support, and customized product options for architectural projects.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <h3 className="h3" style={{ color: "var(--color-gold)", marginBottom: "1rem" }}>Founder&apos;s Vision</h3>
              <p style={{ opacity: 0.8, fontWeight: 300, fontSize: "0.95rem" }}>
                &quot;We don&apos;t just sell sanitaryware or hardware; we assist in building sanctuaries. Every bathroom faucet, cabinet pull, or smart door lock is a functional piece of art that forms the soul of a home.&quot;
              </p>
              <Link href="/about/founder" className="btn-ghost" style={{ borderColor: "var(--color-gold)", color: "var(--color-gold)", marginTop: "1.5rem" }} id="btn-read-founder-story">
                Founder&apos;s Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Experience */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">The KHS Difference</span>
            <h2 className="h2">A Personalized Retail Experience</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.experienceContent}>
            <p className={styles.centeredParagraph}>
              Visiting our showrooms in Rajajinagar is designed to be an immersive design consultation. Our product experts walk you through full-scale kitchen modules, live water-flow bath fittings, sliding soft-close systems, and high-security digital lock demonstrations, helping you visualize exactly how each piece enhances your living space.
            </p>
            <div className={styles.ctaRow} style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
              <Link href="/contact" className="btn-primary" id="about-visit-btn">Visit Our Showrooms</Link>
              <Link href="/bathware" className="btn-ghost" id="about-explore-btn">Browse Collections</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
