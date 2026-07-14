import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, ShieldCheck, Flame, Fingerprint } from "lucide-react";
import styles from "./safe-essentials.module.css";

export const metadata: Metadata = {
  title: "Safe Essentials",
  description:
    "Explore Krishna Home Studio's safe essentials collection, blending security technology, refined finishes, and premium home protection.",
};

const features = [
  { title: "Reinforced Steel", icon: ShieldCheck },
  { title: "Fire Protection", icon: Flame },
  { title: "Biometric Access", icon: Fingerprint },
  { title: "Premium Locking", icon: LockKeyhole },
];

export default function SafeEssentialsPage() {
  return (
    <div className={styles.page}>
      <section className="page-hero">
        <img
          src="/assets/old-site/dec23384735345.Y3JvcCwxMTUwLDkwMCwyNSww.jpg"
          alt="Safe essentials by Krishna Home Studio"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Hardware Collection</span>
            <h1 className="page-hero__title">Safe Essentials</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div>
              <span className="label" style={{ color: "var(--color-gold)" }}>Secure Your Peace of Mind</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", margin: "0.75rem 0 1.5rem" }}>
                Protection with Refined Elegance
              </h2>
              <div className="gold-line" />
              <p className={styles.copy}>
                Discover the perfect blend of security and sophistication with Krishna Home Studio&apos;s exquisite collection of safe essentials. Meticulously crafted to safeguard your most precious possessions, these masterpieces of protection seamlessly integrate cutting-edge security technology with elegant design.
              </p>
              <p className={styles.copy}>
                From sleek wall-mounted designs that blend into your decor to imposing freestanding models that command respect, each safe is a testament to uncompromising security and refined aesthetics.
              </p>
              <p className={styles.copy}>
                Whether you prefer a precision-engineered mechanical lock or the convenience of biometric access, Krishna Home Studio offers a curated selection to suit your security preferences and lifestyle needs.
              </p>
              <p className={styles.copy}>
                Each safe features advanced materials, reinforced steel construction, pry-resistant doors, alarm systems, and finishes ranging from brushed stainless steel to rich wood veneers.
              </p>
              <div className={styles.ctaRow}>
                <Link href="/contact" className="btn-primary">Visit Showroom</Link>
                <Link href="/hardware" className="btn-ghost">Back to Hardware</Link>
              </div>
            </div>
            <div className={styles.imageCard}>
              <img
                src="/assets/old-site/dec23384735345.Y3JvcCwxMTUwLDkwMCwyNSww.jpg"
                alt="Luxury safe essentials collection"
              />
            </div>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div className={styles.featureCard} key={feature.title}>
                  <Icon size={24} />
                  <span>{feature.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
