import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { newsItems } from "@/data/news";
import styles from "./media.module.css";

export const metadata: Metadata = {
  title: "Media & Press Coverage",
  description: "Explore the latest news, awards, and press features highlighting Krishna Home Studio's excellence in luxury interior solutions.",
};

export default function MediaPage() {
  return (
    <div className={styles.mediaPage}>
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/old-site/Krishna-Home-Studio-Hardware-5.png"
          alt="Press and media coverage"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">News & Updates</span>
            <h1 className="page-hero__title">Media Coverage</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">In The Press</span>
            <h2 className="h2">Featured Articles & Recognition</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.summaryCard}>
            <p>
              Krishna Home Studio has consistently been recognised for combining premium design,
              trusted product curation, and a deeply personalised retail experience.
            </p>
          </div>

          <div className={styles.editorialGrid}>
            <div className={styles.editorialCard}>
              <span className={styles.focusLabel}>Editorial Focus</span>
              <h3>Bringing luxury products closer to everyday living</h3>
              <p>
                From the first consultation to final installation, the studio translates high-end design into practical, beautifully executed spaces.
              </p>
            </div>
            <div className={styles.editorialCard}>
              <span className={styles.focusLabel}>Brand Story</span>
              <h3>Trusted by homeowners, designers, and developers</h3>
              <p>
                Our product curation spans sanitaryware, bathroom accessories, architectural hardware, soft-close systems, and smart security solutions.
              </p>
            </div>
          </div>

          <div className={styles.grid}>
            {newsItems.map((item) => (
              <div key={item.id} className={styles.card} id={`media-card-${item.id}`}>
                {item.logo && (
                  <div className={styles.iconWrap}>
                    <img src={item.logo} alt={`${item.publication} logo`} loading="lazy" />
                  </div>
                )}
                <h3 className={styles.publicationName}>{item.publication}</h3>
                <p className={styles.publicationDesc}>{item.highlight}</p>
                <div className={styles.separator} />
                <p className={styles.excerpt}>{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMore}
                >
                  Read Full Article <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-white)" }}>
        <div className="container">
          <div className={styles.focusGrid}>
            <div className={styles.focusCard}>
              <span className={styles.focusLabel}>Awards</span>
              <h3>India Design Awards recognition</h3>
              <p>
                The studio’s standing in the design ecosystem was reinforced by recognition that
                celebrated its refined product storytelling and retail execution.
              </p>
            </div>
            <div className={styles.focusCard}>
              <span className={styles.focusLabel}>Brand Presence</span>
              <h3>Premium collections across bathware, hardware and lifestyle accessories</h3>
              <p>
                From contemporary basins and faucets to architectural hardware, the collection is
                designed to suit both private homes and premium projects.
              </p>
            </div>
            <div className={styles.focusCard}>
              <span className={styles.focusLabel}>Client Experience</span>
              <h3>Personal consultation and end-to-end support</h3>
              <p>
                Every project is guided with care, whether the client is sourcing a single fixture
                or planning a full interior transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
