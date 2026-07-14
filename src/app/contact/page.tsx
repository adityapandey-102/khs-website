"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  const bathwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Bathware+Rajajinagar+Bengaluru";
  const hardwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Hardware+Rajajinagar+Bengaluru";

  return (
    <div className={styles.contactPage}>
      {/* Page Hero */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/old-site/WhatsApp-Image-2024-05-18-at-5.51.39-PM.jpeg"
          alt="Contact Krishna Home Studio"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Get In Touch</span>
            <h1 className="page-hero__title">Contact Us</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Form */}
            <div className={styles.formCol}>
              <div className="section-title-wrap" style={{ textAlign: "left", marginBottom: "2rem" }}>
                <span className="label">Send a Message</span>
                <h2 className="h2" style={{ color: "var(--color-charcoal)" }}>How can we help?</h2>
                <div className="gold-line" style={{ margin: "1.25rem 0" }} />
              </div>

              {formStatus === "success" ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3 className="h3">Thank You!</h3>
                  <p>Your message has been received. Our team will get back to you shortly.</p>
                  <button onClick={() => setFormStatus("idle")} className="btn-outline" style={{ color: "var(--color-charcoal)", borderColor: "var(--color-charcoal)", marginTop: "1rem" }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" required placeholder="John" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" id="lastName" required placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" required placeholder="john@example.com" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="interest">I am interested in...</label>
                    <select id="interest" defaultValue="">
                      <option value="" disabled>Select an option</option>
                      <option value="bathware">Bathware & Sanitaryware</option>
                      <option value="hardware">Architectural Hardware</option>
                      <option value="project">Large Scale Project Setup</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows={5} required placeholder="Tell us about your project..."></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-primary ${styles.submitBtn}`}
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"} <Send size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Store Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Bathware Studio</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <MapPin size={18} className={styles.icon} />
                    <span>#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone size={18} className={styles.icon} />
                    <a href="tel:6362068331">+91 63620 68331</a>
                  </div>
                  <div className={styles.infoItem}>
                    <Mail size={18} className={styles.icon} />
                    <a href="mailto:support@krishnahomestudio.com">support@krishnahomestudio.com</a>
                  </div>
                  <div className={styles.infoItem}>
                    <Clock size={18} className={styles.icon} />
                    <span>Mon - Sun: 10:00 AM - 8:30 PM</span>
                  </div>
                </div>
                <a href={bathwareMapUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                  Open in Google Maps <ArrowRight size={14} />
                </a>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Hardware Studio</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <MapPin size={18} className={styles.icon} />
                    <span>#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone size={18} className={styles.icon} />
                    <a href="tel:7892507179">+91 78925 07179</a>
                  </div>
                  <div className={styles.infoItem}>
                    <Mail size={18} className={styles.icon} />
                    <a href="mailto:Hardware@krishnahomestudio.com">Hardware@krishnahomestudio.com</a>
                  </div>
                  <div className={styles.infoItem}>
                    <Clock size={18} className={styles.icon} />
                    <span>Mon - Sun: 10:00 AM - 8:30 PM</span>
                  </div>
                </div>
                <a href={hardwareMapUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                  Open in Google Maps <ArrowRight size={14} />
                </a>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Jaquar Authorised Dealer</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <MapPin size={18} className={styles.icon} />
                    <span>285/2, Bagalur to Yelahanka Main Road, near Bagalur Vegetable Market, Bengaluru, Karnataka 562149</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone size={18} className={styles.icon} />
                    <a href="tel:8147393477">+91 81473 93477</a>
                  </div>
                  <div className={styles.infoItem}>
                    <Mail size={18} className={styles.icon} />
                    <a href="mailto:support@krishnahomestudio.com">support@krishnahomestudio.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ArrowRight component fallback inside the same file to avoid extra imports if omitted
const ArrowRight = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);
