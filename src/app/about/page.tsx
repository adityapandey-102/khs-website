import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Krishna Home Studio's journey of delivering affordable luxury bathware and hardware solutions in Bengaluru since 2018.",
};

const philosophyPoints = [
  "Luxury that feels welcoming, not intimidating",
  "Design guidance rooted in everyday function",
  "Premium quality with transparent, value-led pricing",
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
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

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Established 2018</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>The pursuit of excellence, grounded in real homes</h2>
              <div className="gold-line" />
              <p className={styles.paragraph}>
                Founded in 2018 by Prakash Choudhary, Krishna Home Studio grew out of a personal need. During his own home construction, he discovered how difficult it was to find beautiful sanitaryware, fittings, and hardware that balanced premium aesthetics with practicality and value.
              </p>
              <p className={styles.paragraph}>
                That experience shaped the brand&apos;s philosophy. Today, the studio serves homeowners, architects, interior designers, and renovation projects with a refined mix of internationally respected brands and locally informed guidance. We are known for translating aspirational design into lived-in comfort.
              </p>
              <p className={styles.paragraph}>
                From hygienic bath fittings and designer basins to smart architectural hardware and storage solutions, our curation reflects a commitment to craftsmanship, durability, and timeless style without excess.
              </p>
              <div className={styles.highlightsGrid}>
                <div className={styles.highlightCard}>
                  <h3>Design-led curation</h3>
                  <p>Every product is selected for beauty, function, and lasting performance.</p>
                </div>
                <div className={styles.highlightCard}>
                  <h3>Trusted partnerships</h3>
                  <p>We work closely with world-class brands to bring premium options closer to the customer.</p>
                </div>
                <div className={styles.highlightCard}>
                  <h3>Project-ready guidance</h3>
                  <p>Our team supports everything from first-time homeowners to complete fit-out projects.</p>
                </div>
              </div>
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
                “We don&apos;t just sell sanitaryware or hardware; we assist in building sanctuaries. Every bathroom faucet, cabinet pull, or smart door lock is a functional piece of art that forms the soul of a home.”
              </p>
              <Link href="/about/founder" className="btn-ghost" style={{ borderColor: "var(--color-gold)", color: "var(--color-gold)", marginTop: "1.5rem" }} id="btn-read-founder-story">
                Founder&apos;s Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Our Philosophy</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>A calm, considered approach to luxury</h2>
              <div className="gold-line" />
              <p className={styles.paragraph}>
                We believe the best interiors feel effortless. That means every choice should be thoughtful, practical, and elevated in equal measure. Our role is to guide clients through premium options without overwhelming them.
              </p>
              <div className={styles.bulletList}>
                {philosophyPoints.map((point) => (
                  <div key={point} className={styles.bulletItem}>{point}</div>
                ))}
              </div>
            </div>
            <div className={styles.storyImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/old-site/Krishna-Home-Studio-Hardware-5.png"
                alt="Premium hardware and accessories selection"
                className={styles.storyImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-white)" }}>
        <div className="container">
          <div className={styles.timelineSection}>
            <div className={styles.timelineIntro}>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>A Design Heritage</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1rem" }}>Crafted for homes, refined for projects</h2>
              <p className={styles.paragraph}>
                Our journey is rooted in listening carefully to how people live. That remains central to every consultation, whether we are guiding a first-time homeowner or assisting an architect with a multi-room specification.
              </p>
            </div>

            <div className={styles.timelineGrid}>
              <div className={styles.timelineCard}>
                <h3>2018</h3>
                <p>Founded with a clear ambition: make premium sanitaryware and architectural hardware accessible without compromise.</p>
              </div>
              <div className={styles.timelineCard}>
                <h3>Curated Partnerships</h3>
                <p>Built long-standing relationships with global brands that share our standards for innovation, finish quality, and longevity.</p>
              </div>
              <div className={styles.timelineCard}>
                <h3>Showroom Experience</h3>
                <p>Created a tactile retail environment where clients can compare finishes, test functionality, and make confident decisions.</p>
              </div>
              <div className={styles.timelineCard}>
                <h3>Project Support</h3>
                <p>Extended services to interior designers, builders, and developers looking for tailored product guidance and dependable execution.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">The KHS Difference</span>
            <h2 className="h2">A personalized retail experience</h2>
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
