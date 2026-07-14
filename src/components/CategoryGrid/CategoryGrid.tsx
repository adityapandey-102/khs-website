import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bathwareCategories } from "@/data/categories";
import styles from "./CategoryGrid.module.css";

const categoryImages: Record<string, string> = {
  "shower-faucets": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80&auto=format&fit=crop",
  "washbasins-waterclosets-urinals": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80&auto=format&fit=crop",
  "countertop-basin": "https://images.unsplash.com/photo-1620626011761-996317702519?w=600&q=80&auto=format&fit=crop",
  "standalone-basin": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80&auto=format&fit=crop",
  "vanity-mirrors": "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80&auto=format&fit=crop",
  "kitchen-sinks-faucets": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  "shower-enclosures": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80&auto=format&fit=crop",
  "booster-heat-pumps": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "water-softeners-heaters": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop",
  "bath-accessories": "https://images.unsplash.com/photo-1563170351-be54ff3ac29c?w=600&q=80&auto=format&fit=crop",
  "spa-wellness": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80&auto=format&fit=crop",
};

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
        {displayCategories.map((cat) => {
          const imgSrc =
            categoryImages[cat.id] || cat.image;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={styles.card}
              id={`category-card-${cat.id}`}
              aria-label={`Explore ${cat.label}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
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
          );
        })}
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
