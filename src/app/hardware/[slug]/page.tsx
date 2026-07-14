import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { hardwareCategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import styles from "./category.module.css";

// Generate Static Params
export async function generateStaticParams() {
  return hardwareCategories.map((cat) => ({
    slug: cat.id,
  }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// Generate dynamic metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = hardwareCategories.find((c) => c.id === resolvedParams.slug);
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }
  return {
    title: `${category.shortLabel} Collection | Krishna Home Studio`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = hardwareCategories.find((c) => c.id === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  // Fetch products for this category
  const products = getProductsByCategory(category.id);

  const categoryBrandMap: Record<string, string[]> = {
    "door-fittings": ["Häfele", "Yale", "Dorsët", "Godrej"],
    "smart-locks": ["Yale", "Godrej", "Häfele"],
    "kitchen-systems": ["Blum", "Hettich", "Häfele"],
    "wardrobe-accessories": ["Hettich", "Blum", "Häfele"],
    "glass-hardware": ["Ozone", "Häfele", "Dorma"],
    "sliding-systems": ["Hettich", "Blum", "Häfele"],
  };

  const partnerBrands = categoryBrandMap[category.id] || ["Häfele", "Blum", "Yale", "Hettich"];
  const whatsappUrl = `https://wa.me/917892507179?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(category.shortLabel)}%20collection.`;

  return (
    <div className={styles.categoryPage}>
      {/* Page Hero */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.label}
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Architectural Hardware</span>
            <h1 className="page-hero__title">{category.shortLabel}</h1>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="section">
        <div className="container">
          <Link href="/hardware" className={styles.backBtn} id="btn-back-catalog-hw">
            <ArrowLeft size={14} /> Back to Hardware
          </Link>

          <div className={styles.categoryIntro}>
            <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Curated Selection</span>
            <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>{category.label}</h2>
            <div className="gold-line-center" />
            <p className={styles.desc}>{category.description}</p>
          </div>

          {products.length > 0 ? (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImageWrap}>
                    <span className={styles.productBrand}>{product.brand}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDesc}>{product.shortDescription}</p>
                    
                    <div className={styles.productMeta}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Features:</span>
                        <span className={styles.metaValue}>{product.features.slice(0, 2).join(", ")}</span>
                      </div>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Finishes:</span>
                        <span className={styles.metaValue}>{product.finishes.join(", ")}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/917892507179?text=Hi%20Krishna%20Home%20Studio%2C%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Request Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
              <p>We are currently updating our online catalog for this collection.</p>
              <p>Please contact our store to view the latest products from {partnerBrands.join(", ")}.</p>
            </div>
          )}

          <div className={styles.partnerInfo}>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 500 }}>AUTHORIZED PARTNERS:</span>
            <div className={styles.tags}>
              {partnerBrands.map((brand) => (
                <span key={brand} className={styles.tag}>{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section" style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)" }}>
        <div className="container">
          <div className={styles.ctaGrid}>
            <div className={styles.ctaTextWrap}>
              <h3 className="h3" style={{ color: "var(--color-white)", marginBottom: "1rem" }}>Build with Precision</h3>
              <p style={{ opacity: 0.8, fontWeight: 300, maxWidth: "600px", lineHeight: "1.7" }}>
                Visit our Whitefield Hardware Studio to experience these precision-engineered products live. Our experts will help you select the perfect hardware for your project.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" id="btn-cat-whatsapp-hw">
                Inquire on WhatsApp
              </a>
              <Link href="/contact" className="btn-outline" id="btn-cat-contact-hw">
                Contact Store
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
