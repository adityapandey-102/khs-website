import type { Metadata } from "next";
import { hardwareCategories } from "@/data/categories";
import styles from "./hardware.module.css";

export const metadata: Metadata = {
  title: "Hardware Collection",
  description: "Explore architectural door handles, hinges, cabinet fittings, soft-close sliders, and smart biometric security systems at Krishna Home Studio.",
};

const brandPartners = ["Häfele", "Ebco", "Blum", "Hettich"];

export default function HardwarePage() {
  const whatsappUrl = "https://wa.me/917892507179?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20architectural%20hardware%20collection.";

  return (
    <div className={styles.hardwarePage}>
      {/* Page Hero */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/old-site/Krishna-Home-Studio-Hardware-1-1024x576.png"
          alt="Premium architectural hardware and fittings"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Collections</span>
            <h1 className="page-hero__title">Architectural Hardware</h1>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className="section">
        <div className="container">
          <div className={styles.introGrid}>
            <div>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Precision Engineered</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>Flawless Function, Timeless Elegance</h2>
              <div className="gold-line" />
            </div>
            <div>
              <p className={styles.introDesc}>
                Our hardware division provides advanced fittings and architectural solutions that are vital to modern interiors. From biometric smart locks that secure your home, to soft-close runners and hinges that make kitchen cabinets glide silently, we supply premium quality hardware sourced from global industry leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Categories Showcase */}
      <section className="section" style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)", paddingTop: "0" }}>
        <div className="container" style={{ marginTop: "-2rem" }}>
          <div className={styles.grid}>
            {hardwareCategories.map((cat) => (
              <div key={cat.id} className={styles.card} id={`hardware-card-${cat.id}`}>
                <div className={styles.cardImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Hardware</span>
                  <h3 className={styles.cardTitle}>{cat.label}</h3>
                  <p className={styles.cardDesc}>{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands & Consultations */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">Brand Partners</span>
            <h2 className="h2">Authorized Hardware Retailer</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.brandsWrapper}>
            <div className={styles.brandsGrid}>
              {brandPartners.map((brand) => (
                <div key={brand} className={styles.brandBox}>
                  <span className={styles.brandName}>{brand}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.consultationBox}>
              <h3 className="h3" style={{ color: "var(--color-charcoal)", marginBottom: "1rem" }}>Need Custom Fittings?</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontWeight: 300 }}>
                Bring your cabinet plans, wardrobe blueprints, or entry door dimensions. Our hardware consultants will assist you in sourcing the exact load capacities, soft-close mechanisms, or biometric locks to fit your needs.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" id="btn-hardware-consult">
                Consult with Hardware Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
