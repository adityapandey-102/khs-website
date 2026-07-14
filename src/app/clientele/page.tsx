import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, Building2, Home as HomeIcon, MapPin } from "lucide-react";
import styles from "./clientele.module.css";

export const metadata: Metadata = {
  title: "Our Clientele",
  description: "Read reviews from our satisfied clients and discover the prestigious residential and commercial projects completed by Krishna Home Studio in Bengaluru.",
};

const testimonials = [
  {
    id: 1,
    name: "Vikram Reddy",
    role: "Architect & Interior Designer",
    text: "Krishna Home Studio is my absolute go-to for all luxury residential projects. Sourcing premium sanitaryware from Kohler and Grohe at competitive rates, backed by Prakash's professional consultations, makes execution stress-free.",
    rating: 5,
  },
  {
    id: 2,
    name: "Meera Krishnan",
    role: "Homeowner, Indiranagar",
    text: "Elevating our master bathrooms was a smooth journey. Sourcing soft-close vanities, designer standalone basins, and custom ceiling rain showers under one roof saved us weeks. The after-sales installation coordination was exemplary.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sanjay Shah",
    role: "Developer, Sovereign Builders",
    text: "We sourced complete smart door locking systems and kitchen modular channels from Ebco and Häfele for our 24-apartment luxury project in Rajajinagar. The load-capacity verification and fast delivery were outstanding.",
    rating: 5,
  },
];

const completedProjects = [
  {
    id: 1,
    title: "The Oasis Villa",
    type: "Premium Residential Villa",
    location: "Sadashivanagar, Bengaluru",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Concorde Heights",
    type: "Luxury Master Suite Baths",
    location: "Lavelle Road, Bengaluru",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Rajajinagar Penthouse",
    type: "Smart Hardware Integration",
    location: "Rajajinagar, Bengaluru",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  },
];

export default function ClientelePage() {
  return (
    <div className={styles.clientelePage}>
      {/* Page Hero */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80&auto=format&fit=crop"
          alt="Luxury residential living space showcase"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Trusted Partnerships</span>
            <h1 className="page-hero__title">Our Clientele</h1>
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="section" style={{ paddingBottom: "0" }}>
        <div className="container">
          <div className={styles.statsBar}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Happy Homeowners</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>40+</span>
              <span className={styles.statLabel}>Architects & Designers</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>15+</span>
              <span className={styles.statLabel}>Luxury Apartments Complexes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">Endorsements</span>
            <h2 className="h2">What Our Clients Say</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.testimonialCard} id={`testimonial-${t.id}`}>
                <div className={styles.ratingRow}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <Quote className={styles.quoteIcon} size={28} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>{t.name}</span>
                  <span className={styles.reviewerRole}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="section" style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)" }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="label" style={{ color: "var(--color-gold)" }}>Design Portfolio</span>
            <h2 className="h2" style={{ color: "var(--color-white)" }}>Featured Projects</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.projectsGrid}>
            {completedProjects.map((p) => (
              <div key={p.id} className={styles.projectCard} id={`project-${p.id}`}>
                <div className={styles.projectImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className={styles.projectImage}
                  />
                  <div className={styles.projectOverlay} />
                </div>
                <div className={styles.projectContent}>
                  <div className={styles.projectTypeWrap}>
                    <Building2 size={13} style={{ color: "var(--color-gold)" }} />
                    <span className={styles.projectType}>{p.type}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <div className={styles.projectLocWrap}>
                    <MapPin size={13} />
                    <span className={styles.projectLoc}>{p.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>Partner with Krishna Home Studio</h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: "1.8", fontWeight: 300 }}>
            Are you an architect, builder, or independent interior designer looking for reliable procurement partners in sanitaryware, bathroom accessories, modular kitchen fittings, or electronic locking systems? We offer special architectural catalogs, volume discounts, and committed logistical coordination.
          </p>
          <Link href="/contact" className="btn-primary" id="btn-client-partner">
            Request Business Partnership
          </Link>
        </div>
      </section>
    </div>
  );
}
