import type { Metadata } from "next";
import { ArrowRight, Newspaper } from "lucide-react";
import { newsItems } from "@/data/news";
import styles from "./media.module.css";

export const metadata: Metadata = {
  title: "Media & Press Coverage",
  description: "Explore the latest news, awards, and press features highlighting Krishna Home Studio's excellence in luxury interior solutions.",
};

export default function MediaPage() {
  return (
    <div className={styles.mediaPage}>
      {/* Page Hero */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop"
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

      {/* Press Coverage Grid */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">In The Press</span>
            <h2 className="h2">Featured Articles & Recognition</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.grid}>
            {newsItems.map((item) => (
              <div key={item.id} className={styles.card} id={`media-card-${item.id}`}>
                <div className={styles.iconWrap}>
                  <Newspaper size={24} />
                </div>
                <h3 className={styles.publicationName}>{item.publication}</h3>
                <p className={styles.publicationDesc}>
                  {item.id === "the-print" && "India's digital platform"}
                  {item.id === "daily-hunt" && "One-click trending updates"}
                  {item.id === "business-standard" && "Leading business daily"}
                  {item.id === "ani-news" && "Leading multimedia agency"}
                </p>
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
    </div>
  );
}
