import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const bathwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Bathware+Rajajinagar+Bengaluru";
  const hardwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Hardware+Rajajinagar+Bengaluru";

  return (
    <section className={styles.section} id="contact-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="label">Visit Us</span>
          <h2 className="h2" style={{ color: "var(--color-white)" }}>Our Showrooms</h2>
          <div className="gold-line-center" />
        </div>

        <div className={styles.grid}>
          {/* Bathware Card */}
          <div className={styles.card} id="showroom-bathware">
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Bathware Collection</span>
              <h3 className={styles.cardTitle}>Bathware Studio</h3>
            </div>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <MapPin size={18} className={styles.icon} />
                <span>#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className={styles.detailItem}>
                <Phone size={18} className={styles.icon} />
                <a href="tel:6362068331" id="contact-phone-bathware">+91 63620 68331</a>
              </div>
              <div className={styles.detailItem}>
                <Mail size={18} className={styles.icon} />
                <a href="mailto:support@krishnahomestudio.com" id="contact-email-bathware">support@krishnahomestudio.com</a>
              </div>
            </div>
            <a
              href={bathwareMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              id="btn-directions-bathware"
            >
              Get Directions <ExternalLink size={14} />
            </a>
          </div>

          {/* Hardware Card */}
          <div className={styles.card} id="showroom-hardware">
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Hardware Collection</span>
              <h3 className={styles.cardTitle}>Hardware Studio</h3>
            </div>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <MapPin size={18} className={styles.icon} />
                <span>#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className={styles.detailItem}>
                <Phone size={18} className={styles.icon} />
                <a href="tel:7892507179" id="contact-phone-hardware">+91 78925 07179</a>
              </div>
              <div className={styles.detailItem}>
                <Mail size={18} className={styles.icon} />
                <a href="mailto:Hardware@krishnahomestudio.com" id="contact-email-hardware">Hardware@krishnahomestudio.com</a>
              </div>
            </div>
            <a
              href={hardwareMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              id="btn-directions-hardware"
            >
              Get Directions <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* CTA Box */}
        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>Have a Project in Mind?</h3>
          <p className={styles.ctaDesc}>
            Let our experts help you select the perfect fittings, sanitaryware, or hardware for your home. Reach out to set up a private consultation.
          </p>
          <Link href="/contact" className="btn-primary" id="btn-cta-contact">
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
