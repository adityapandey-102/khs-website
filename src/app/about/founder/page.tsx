import type { Metadata } from "next";
import Link from "next/link";
import styles from "./founder.module.css";

export const metadata: Metadata = {
  title: "About Founder — Prakash Choudhary",
  description: "Read about Prakash Choudhary's entrepreneurial journey and the vision that led to the founding of Krishna Home Studio.",
};

export default function FounderPage() {
  return (
    <div className={styles.founderPage}>
      {/* Page Hero Banner */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1920&q=80&auto=format&fit=crop"
          alt="Executive vision page banner"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Leadership</span>
            <h1 className="page-hero__title">Prakash Choudhary</h1>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section">
        <div className="container">
          <div className={styles.profileGrid}>
            {/* Image Wrap */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop"
                  alt="Prakash Choudhary CEO & Co-founder"
                  className={styles.founderImg}
                />
              </div>
              <div className={styles.metaBox}>
                <span className={styles.metaTitle}>Prakash Choudhary</span>
                <span className={styles.metaRole}>Co-founder & CEO</span>
              </div>
            </div>

            {/* Content Wrap */}
            <div className={styles.contentColumn}>
              <span className="label" style={{ color: "var(--color-gold)" }}>CEO & Co-Founder Statement</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", margin: "0.5rem 0 1.5rem" }}>Building Dreams, Not Just Structures</h2>
              <div className="gold-line" />
              
              <blockquote className={styles.quote}>
                "The space we reside in dictates the quality of our thought processes, relaxation, and focus. Sourcing hardware and sanitaryware should be a delightful design journey, not a compromise."
              </blockquote>

              <p className={styles.bioText}>
                Prakash Choudhary is a serial entrepreneur, educator, and value-driven leader who embarked on his entrepreneurial journey at the early age of 21. Backed by a BBA and a Weekend MBA from Jain University, Bengaluru, he has dedicated over a decade to building and scaling organizations in education, mentoring, and luxury retail.
              </p>
              
              <h3 className={styles.subTitle}>An Entrepreneurial Journey</h3>
              <p className={styles.bioText}>
                Before building Krishna Home Studio into a landmark retail destination, Prakash co-founded several impactful ventures:
              </p>
              <ul className={styles.venturesList}>
                <li>
                  <strong>Eduturks (2015):</strong> An educational platform that leveraged interactive board games to introduce students and adults to complex financial markets.
                </li>
                <li>
                  <strong>Addzup Global (2016):</strong> A technical training firm providing professional certifications to bridging the employability gap for fresh graduates.
                </li>
                <li>
                  <strong>Entrepreneurship Garage (2018):</strong> A specialized accelerator program mentoring and funding early-stage startup ventures in South India.
                </li>
              </ul>

              <h3 className={styles.subTitle}>Recognition & Media</h3>
              <p className={styles.bioText}>
                Under his leadership, Krishna Home Studio was honored as one of the <strong>Top 10 Leadership & Entrepreneurship Institutes in India</strong> by CEO Magazine in 2020. His forward-thinking retail philosophy was praised for merging technological advancements (like water-saving cisterns and smart lock automation) with premium aesthetic consultations.
              </p>

              <Link href="/about" className="btn-ghost" style={{ marginTop: "2rem" }} id="btn-back-about">
                About Krishna Home Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
