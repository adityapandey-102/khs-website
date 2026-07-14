import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us | Krishna Home Studio",
  description: "Learn about Krishna Home Studio's journey of delivering affordable luxury bathware and hardware solutions in Bengaluru since 2018.",
};

const philosophyPoints = [
  "Curating world-class brands for discerning clients",
  "Providing expert guidance rooted in function and style",
  "Offering transparent, value-led pricing on premium goods",
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <section className="page-hero">
        <Image
          src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=2000"
          alt="Krishna Home Studio luxury showroom design"
          className="page-hero__bg"
          fill
          priority
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Our Journey</span>
            <h1 className="page-hero__title">Our Story</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Established 2018</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>Elevating everyday spaces with exceptional design.</h2>
              <div className="gold-line" />
              <p className={styles.paragraph}>
                At Krishna Home Studio, we specialize in providing premium bathroom fittings and home hardware solutions that combine luxury with affordability. Established in 2018 by Prakash Choudhary, our brand was inspired by a desire to offer high-quality, stylish products after experiencing the lack of options during his own home construction.
              </p>
              <p className={styles.paragraph}>
                Today, Krishna Home Studio is a trusted destination for those seeking elegant, functional, and innovative home solutions. We source our products from top international brands like Hindware, Kohler, and Grohe, ensuring a diverse selection that caters to every style and need.
              </p>
              <p className={styles.paragraph}>
                Our offerings range from high-end bathware—such as washbasins, showers, and vanities—to architectural hardware that includes everything from sophisticated door handles to modern security systems. Whether you&apos;re looking to revamp your bathroom or upgrade your home&apos;s hardware, we provide the expertise and products to turn your vision into reality.
              </p>
              
              <div className={styles.highlightsGrid}>
                <div className={styles.highlightCard}>
                  <h3>Design-led Curation</h3>
                  <p>Every product is selected for beauty, function, and lasting performance.</p>
                </div>
                <div className={styles.highlightCard}>
                  <h3>Trusted Partnerships</h3>
                  <p>We work closely with world-class brands to bring premium options closer to the customer.</p>
                </div>
                <div className={styles.highlightCard}>
                  <h3>Project-ready Guidance</h3>
                  <p>Our team supports everything from first-time homeowners to complete fit-out projects.</p>
                </div>
              </div>
            </div>
            <div className={styles.storyImageWrap}>
              <Image
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury washbasin and gold faucet layout"
                className={styles.storyImage}
                width={1000}
                height={1200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pristine Full-Width Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteMark}>&ldquo;</div>
          <h2 className={styles.quoteText}>
            At Krishna Home Studio, customer satisfaction is our top priority. We pride ourselves on offering high-quality products at reasonable prices, helping you create spaces that are both stylish and functional.
          </h2>
          <div className="gold-line-center" style={{ margin: "2rem auto" }} />
          <span className={styles.quoteAuthor}>Prakash Choudhary</span>
          <span className={styles.quoteTitle}>Founder</span>
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
              <h3 className="h3" style={{ color: "var(--color-gold)", marginBottom: "1rem" }}>Our Philosophy</h3>
              <ul className={styles.philosophyList}>
                {philosophyPoints.map((point) => (
                  <li key={point} className={styles.philosophyItem}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-off-white)" }}>
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
              <Link href="/bathware" className="btn-ghost" id="about-explore-btn">Browse Bathware</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
