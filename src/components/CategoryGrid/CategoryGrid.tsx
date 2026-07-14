import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bathwareCategories } from "@/data/categories";
import styles from "./CategoryGrid.module.css";

interface CategoryGridProps {
  title?: string;
  label?: string;
  showAll?: boolean;
}

export default function CategoryGrid({
  title = "Our Collections",
  label = "Bathware",
  showAll = false,
}: CategoryGridProps) {
  const displayCategories = showAll
    ? bathwareCategories
    : bathwareCategories.slice(0, 8);

  return (
    <section className={styles.section} id="categories">
      <div className="container">
        <div className={styles.sectionTitleWrap}>
          <span className={styles.sectionLabel}>{label}</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <div className={styles.goldLine} />
        </div>
      </div>

      <div className={styles.grid}>
        {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={styles.card}
              id={`category-card-${cat.id}`}
              aria-label={`Explore ${cat.label}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.label}
                className={styles.cardImage}
                loading="lazy"
              />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Explore</span>
                <h3 className={styles.cardTitle}>{cat.shortLabel}</h3>
                <span className={styles.cardArrow}>
                  View Collection <ArrowRight size={13} />
                </span>
              </div>
            </Link>
        ))}
      </div>

      {!showAll && (
        <div className={`container ${styles.viewAll}`}>
          <Link href="/bathware" className="btn-outline" id="category-view-all">
            View All Categories
          </Link>
        </div>
      )}
    </section>
  );
}
