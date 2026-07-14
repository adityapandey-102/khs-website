import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsItems } from "@/data/news";
import styles from "./NewsSection.module.css";

export default function NewsSection() {
  return (
    <section className={styles.section} id="news">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className={styles.sectionLabel}>Media & Awards</span>
            <h2 className={styles.sectionTitle}>In The Press</h2>
            <div className={styles.goldLine} />
          </div>
          <Link href="/media" className="btn-outline" id="news-view-all">
            View All Coverage
          </Link>
        </div>

        <div className={styles.grid}>
          {newsItems.map((item) => (
            <div key={item.id} className={styles.card} id={`news-card-${item.id}`}>
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
                id={`news-link-${item.id}`}
              >
                Open Article <ArrowRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
