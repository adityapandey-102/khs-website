import type { Metadata } from "next";
import Link from "next/link";
import { Building2, MapPin, Quote, Star } from "lucide-react";
import { clienteleLogos, testimonials } from "@/data/migratedContent";
import styles from "./clientele.module.css";

export const metadata: Metadata = {
  title: "Our Clientele",
  description:
    "Read reviews from Krishna Home Studio customers and browse clientele logos migrated from the original website.",
};

const completedProjects = [
  {
    id: 1,
    title: "Bathware Studio Experience",
    type: "Premium Residential Selection",
    location: "Rajajinagar, Bengaluru",
    image: "/assets/old-site/WhatsApp-Image-2024-05-18-at-5.51.39-PM.jpeg",
  },
  {
    id: 2,
    title: "Luxury Bath Concepts",
    type: "Showers, Basins and Vanities",
    location: "Bengaluru",
    image: "/assets/old-site/Untitled-design-19.png",
  },
  {
    id: 3,
    title: "Hardware Studio",
    type: "Architectural Hardware",
    location: "Rajajinagar, Bengaluru",
    image: "/assets/old-site/Krishna-Home-Studio-Hardware-1-1024x576.png",
  },
];

export default function ClientelePage() {
  return (
    <div className={styles.clientelePage}>
      <section className="page-hero">
        <img
          src="/assets/old-site/Krishna-Home-Studio-Hardware-5.png"
          alt="Krishna Home Studio clientele and awards"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Trusted Partnerships</span>
            <h1 className="page-hero__title">Our Clientele</h1>
          </div>
        </div>
      </section>

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
              <span className={styles.statLabel}>Luxury Apartment Complexes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="label">Clientele</span>
            <h2 className="h2">Brands, Projects and Customers We Serve</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.logoGrid}>
            {clienteleLogos.map((logo, index) => (
              <div className={styles.logoCard} key={logo}>
                <img src={logo} alt={`Clientele logo ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((review) => (
              <div key={review.name} className={styles.testimonialCard} id={`testimonial-${review.name.toLowerCase().replaceAll(" ", "-")}`}>
                <div className={styles.ratingRow}>
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <Quote className={styles.quoteIcon} size={28} />
                <p className={styles.testimonialText}>{review.text}</p>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)" }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="label" style={{ color: "var(--color-gold)" }}>Design Portfolio</span>
            <h2 className="h2" style={{ color: "var(--color-white)" }}>Featured Work</h2>
            <div className="gold-line-center" />
          </div>

          <div className={styles.projectsGrid}>
            {completedProjects.map((project) => (
              <div key={project.id} className={styles.projectCard} id={`project-${project.id}`}>
                <div className={styles.projectImageWrap}>
                  <img src={project.image} alt={project.title} className={styles.projectImage} />
                  <div className={styles.projectOverlay} />
                </div>
                <div className={styles.projectContent}>
                  <div className={styles.projectTypeWrap}>
                    <Building2 size={13} style={{ color: "var(--color-gold)" }} />
                    <span className={styles.projectType}>{project.type}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.projectLocWrap}>
                    <MapPin size={13} />
                    <span className={styles.projectLoc}>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2 className="h2" style={{ color: "var(--color-charcoal)", marginBottom: "1.5rem" }}>Partner with Krishna Home Studio</h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: "1.8", fontWeight: 300 }}>
            Are you an architect, builder, or independent interior designer looking for reliable procurement partners in sanitaryware, bathroom accessories, modular kitchen fittings, or electronic locking systems?
          </p>
          <Link href="/contact" className="btn-primary" id="btn-client-partner">
            Request Business Partnership
          </Link>
        </div>
      </section>
    </div>
  );
}
