import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import { bathwareCategories } from "@/data/categories";
import styles from "./category.module.css";

// Generate Static Params for all 11 categories
export async function generateStaticParams() {
  return bathwareCategories.map((cat) => ({
    slug: cat.id,
  }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// Generate dynamic metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = bathwareCategories.find((c) => c.id === resolvedParams.slug);
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }
  return {
    title: `${category.shortLabel} Collection`,
    description: category.description,
  };
}

// Sub-items highlights for each category to show design depth
const categoryHighlights: Record<string, string[]> = {
  "shower-faucets": [
    "Concealed Thermostatic Multi-outlet Diverters",
    "Rainfall & Cascade Ceiling Showers",
    "Premium Brass Wall Mixer Units",
    "Hand Showers with Adjustable Jets",
    "Matt Black, Rose Gold & Chrome Finish Extensions"
  ],
  "washbasins-waterclosets-urinals": [
    "Rimless Smart Water Closets",
    "Concealed Flushing Cisterns & Actuator Plates",
    "Wall-Hung & One-Piece Toilets",
    "Pedestal Sanitary Washbasins",
    "Sensor-operated Urinals & Accessories"
  ],
  "countertop-basin": [
    "Ultra-thin Rim Ceramic Basins",
    "Artistic Hand-painted Countertop Bowls",
    "Solid Stone-Resin Matt Basins",
    "Italian Marble Finish Basins",
    "Oval, Rectangular & Circular Sculptural Designs"
  ],
  "standalone-basin": [
    "Freestanding Monolith Sanitary Basins",
    "Pedestal Integrated Statement Washbasins",
    "Solid Surface Modern Freestanding Columns",
    "Architectural Concrete Finish Basins",
    "Minimalistic Space-Saving Standalone Basins"
  ],
  "vanity-mirrors": [
    "Waterproof Plywood Vanity Cabinets",
    "LED Backlit Smart Mirrors with Anti-fog Features",
    "Quartz Countertop Vanities with Integrated Bowls",
    "Wall-hung Soft-Close Modular Cabinets",
    "Premium Gold and Metal Framed Mirrors"
  ],
  "kitchen-sinks-faucets": [
    "Handmade Double-Bowl Stainless Steel Sinks",
    "Quartz / Granite Composite Silent Sinks",
    "Pull-out Spring Kitchen Faucets",
    "360-degree Rotatable Swivel Spouts",
    "Smart Sensor Touchless Kitchen Taps"
  ],
  "shower-enclosures": [
    "8mm & 10mm Toughened Safety Glass",
    "Sliding & Hinged Door Frameless Enclosures",
    "Rust-proof Stainless Steel Channel Profiles",
    "Water-repellent Nano-coated Glass Panels",
    "Custom Corner & Inline Layouts"
  ],
  "booster-heat-pumps": [
    "Variable Frequency Drive (VFD) Pressure Pumps",
    "Whisper-Quiet Domestic Booster Pumps",
    "Energy-Efficient Heat Pump Water Heaters",
    "Multi-bath High Flow Rate Pressure Systems",
    "Automatic Dry-Run Protection Pumps"
  ],
  "water-softeners-heaters": [
    "Fully Automatic Water Softening Plants",
    "Instant Digital Electric Water Heaters",
    "Corrosion-resistant Glass Lined Storage Heaters",
    "Point-of-use Undersink Purifiers",
    "Central Whole-house Hardwater Softeners"
  ],
  "bath-accessories": [
    "Premium Stainless Steel Towel Racks & Rails",
    "Solid Brass Robe Hooks & Soap Dispensers",
    "Designer Toilet Paper Roll Holders",
    "Corner Shower Caddies & Glass Shelves",
    "Grab Bars and Safety Rails in Multiple Finishes"
  ],
  "spa-wellness": [
    "Hydro-Massage Whirlpool Bathtubs",
    "Digital Steam Bath Generators",
    "Infrared and Finnish Wood Saunas",
    "Chromotherapy LED Overhead Rain Showers",
    "Multi-jet Jacuzzis & Relaxation Lounge Sets"
  ]
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = bathwareCategories.find((c) => c.id === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const highlights = categoryHighlights[category.id] || [
    "Premium materials and craftsmanship",
    "Sourced from world-class manufacturer partners",
    "Available in multiple colors and finishes",
    "Manufacturer-backed warranty support",
    "Expert installation guidance provided"
  ];

  const whatsappUrl = `https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(category.shortLabel)}%20collection.`;

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
            <span className="page-hero__label">Bathware Collection</span>
            <h1 className="page-hero__title">{category.shortLabel}</h1>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section">
        <div className="container">
          <Link href="/bathware" className={styles.backBtn} id="btn-back-catalog">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>

          <div className={styles.grid}>
            {/* Left Content */}
            <div className={styles.infoCol}>
              <span className="label" style={{ color: "var(--color-gold)", marginBottom: "0.5rem", display: "block" }}>Luxury Bathware</span>
              <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>{category.label}</h2>
              <div className="gold-line" />
              <p className={styles.desc}>{category.description}</p>
              
              <div className={styles.partnerInfo}>
                <h4 className="h4" style={{ color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>Authorized Partners:</h4>
                <div className={styles.tags}>
                  <span className={styles.tag}>Kohler</span>
                  <span className={styles.tag}>Grohe</span>
                  <span className={styles.tag}>Hindware</span>
                  <span className={styles.tag}>Jaquar</span>
                </div>
              </div>
            </div>

            {/* Right Bullet List */}
            <div className={styles.featuresCol}>
              <div className={styles.featuresCard}>
                <h3 className="h3" style={{ fontSize: "1.25rem", color: "var(--color-charcoal)", marginBottom: "1.5rem", fontFamily: "var(--font-sans)", fontWeight: "600" }}>
                  Product Highlights
                </h3>
                <ul className={styles.highlightsList}>
                  {highlights.map((highlight, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.checkWrap}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section" style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)" }}>
        <div className="container">
          <div className={styles.ctaGrid}>
            <div className={styles.ctaTextWrap}>
              <h3 className="h3" style={{ color: "var(--color-white)", marginBottom: "1rem" }}>Interested in this Collection?</h3>
              <p style={{ opacity: 0.8, fontWeight: 300, maxWidth: "600px", lineHeight: "1.7" }}>
                Visit our Rajajinagar showroom to view these products live, consult with our bath planners, and receive a customized quote for your construction or remodeling project.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" id="btn-cat-whatsapp">
                Inquire on WhatsApp
              </a>
              <Link href="/contact" className="btn-outline" id="btn-cat-contact">
                Contact Store
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
