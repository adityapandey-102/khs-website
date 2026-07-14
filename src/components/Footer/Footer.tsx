"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand Info */}
        <div className={styles.col}>
          <Link href="/" className={styles.brandLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://krishnahomestudio.com/wp-content/uploads/2024/04/cropped-khs-logo.webp"
              alt="Krishna Home Studio Logo"
              className={styles.logoImg}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTextMain}>Krishna Home Studio</span>
              <span className={styles.logoTextSub}>Premium Bathware & Hardware</span>
            </div>
          </Link>
          <p className={styles.brandDesc}>
            Bengaluru's trusted showroom for premium bathroom fittings, sanitaryware, designer vanities, and high-end architectural hardware. Sourcing luxury and durability since 2018.
          </p>
          <div className={styles.socialRow}>
            <a
              href="https://www.instagram.com/khs_krishnahomestudio_"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
              id="footer-social-instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://krishnahomestudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Facebook"
              id="footer-social-facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Quick Links</h3>
          <div className={styles.linkList}>
            <Link href="/" id="footer-link-home">Home</Link>
            <Link href="/about" id="footer-link-about">About Us</Link>
            <Link href="/bathware" id="footer-link-bathware">Bathware Collection</Link>
            <Link href="/hardware" id="footer-link-hardware">Hardware Collection</Link>
            <Link href="/clientele" id="footer-link-clientele">Clientele</Link>
            <Link href="/media" id="footer-link-media">Media Coverage</Link>
            <Link href="/contact" id="footer-link-contact">Contact Us</Link>
          </div>
        </div>

        {/* Categories */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Bathware</h3>
          <div className={styles.linkList}>
            <Link href="/bathware/shower-faucets" id="footer-cat-shower">Shower & Faucets</Link>
            <Link href="/bathware/countertop-basin" id="footer-cat-countertop">Countertop Basin</Link>
            <Link href="/bathware/standalone-basin" id="footer-cat-standalone">Standalone Basin</Link>
            <Link href="/bathware/vanity-mirrors" id="footer-cat-vanity">Vanities & Mirrors</Link>
            <Link href="/bathware/spa-wellness" id="footer-cat-spa">Spa & Wellness</Link>
            <Link href="/hardware" id="footer-cat-hardware">Architectural Hardware</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Our Showrooms</h3>
          <div className={styles.contactInfo}>
            {/* Bathware */}
            <div className={styles.contactBlock}>
              <span className={styles.showroomName}>Bathware Studio</span>
              <div className={styles.contactDetail}>
                <MapPin size={14} className={styles.contactIcon} />
                <span>#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className={styles.contactDetail}>
                <Phone size={14} className={styles.contactIcon} />
                <a href="tel:6362068331" id="footer-phone-bathware">+91 63620 68331</a>
              </div>
            </div>

            {/* Hardware */}
            <div className={styles.contactBlock}>
              <span className={styles.showroomName}>Hardware Studio</span>
              <div className={styles.contactDetail}>
                <MapPin size={14} className={styles.contactIcon} />
                <span>#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className={styles.contactDetail}>
                <Phone size={14} className={styles.contactIcon} />
                <a href="tel:7892507179" id="footer-phone-hardware">+91 78925 07179</a>
              </div>
            </div>

            {/* General */}
            <div className={styles.contactBlock}>
              <div className={styles.contactDetail}>
                <Mail size={14} className={styles.contactIcon} />
                <a href="mailto:support@krishnahomestudio.com" id="footer-email">support@krishnahomestudio.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarInner}`}>
          <p>© 2026 Krishna Home Studio. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" id="footer-privacy">Privacy Policy</Link>
            <Link href="/terms" id="footer-terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
