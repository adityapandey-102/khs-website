import Link from "next/link";
import { ArrowRight, Play, Quote, Star } from "lucide-react";
import { brandLogos, clienteleLogos, featuredProducts, testimonials } from "@/data/migratedContent";
import styles from "./HomeExtras.module.css";

export function BrandCarousel() {
  return (
    <section className={styles.brandStrip} aria-label="Brand partners">
      <div className={styles.marquee}>
        {[...brandLogos, ...brandLogos].map((brand, index) => (
          <div className={styles.brandLogo} key={`${brand.name}-${index}`}>
            <img src={brand.image} alt={brand.name} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <div className={styles.featuredProducts}>
      <span className={styles.miniLabel}>Featured Products</span>
      <div className={styles.featuredGrid}>
        {featuredProducts.map((product) => (
          <Link href={product.href} className={styles.featuredCard} key={product.title}>
            <img src={product.image} alt={product.title} loading="lazy" />
            <span>{product.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ClientelePreview() {
  return (
    <section className={`${styles.clienteleSection} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionLabel}>Clientele</span>
            <h2 className={styles.sectionTitle}>Trusted by Homeowners, Designers and Project Teams</h2>
            <div className={styles.goldLine} />
          </div>
          <Link href="/clientele" className="btn-ghost">
            View Clientele <ArrowRight size={14} />
          </Link>
        </div>
        <div className={styles.clientLogoGrid}>
          {clienteleLogos.map((logo, index) => (
            <div className={styles.clientLogoCard} key={logo}>
              <img src={logo} alt={`Clientele logo ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsVideo() {
  return (
    <section className={styles.videoSection}>
      <div className="container">
        <div className={styles.videoGrid}>
          <div>
            <span className={styles.sectionLabel}>Awards & Success</span>
            <h2 className={styles.sectionTitle}>India Design Awards Recognition</h2>
            <div className={styles.goldLine} />
            <p className={styles.videoCopy}>
              Krishna Home Studio was featured among the India Design Awards 2023 awardees, recognizing its premium interior solution experience and bathware expertise.
            </p>
          </div>
          <div className={styles.videoFrame}>
            <video src="/assets/old-site/KHS-Video.mp4" controls preload="metadata" poster="/assets/old-site/Krishna-Home-Studio-Hardware-5.png" />
            <div className={styles.playBadge} aria-hidden="true">
              <Play size={16} />
              Play Video
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className={`${styles.testimonialSection} section`}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="label">Customer Reviews</span>
          <h2 className="h2">Customers Reviews</h2>
          <div className="gold-line-center" />
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((review) => (
            <article className={styles.testimonialCard} key={review.name}>
              <div className={styles.starRow}>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={13} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <Quote size={24} className={styles.quoteIcon} />
              <p>{review.text}</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
