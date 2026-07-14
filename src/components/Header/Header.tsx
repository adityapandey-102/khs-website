"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, X } from "lucide-react";

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
import { navItems } from "@/data/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Utility Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <a href="tel:6362068331" className={styles.topBarPhone}>
              <Phone size={11} />
              Bathware: +91 63620 68331
            </a>
            <a href="tel:7892507179" className={styles.topBarPhone}>
              <Phone size={11} />
              Hardware: +91 78925 07179
            </a>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.topBarSocial}>
              <a
                href="https://www.instagram.com/khs_krishnahomestudio_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://krishnahomestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Krishna Home Studio - Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand/khs-logo.png"
              alt="Krishna Home Studio Logo"
              className={styles.logoImg}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTextMain}>Krishna Home Studio</span>
              <span className={styles.logoTextSub}>Premium Bathware & Hardware</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <div key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    pathname === item.href ? styles.active : ""
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown size={13} className={styles.navChevron} />
                  )}
                </Link>
                {item.children && (
                  <div className={styles.dropdown}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.dropdownItem}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            id="mobile-menu-toggle"
            className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.open : ""}`}>
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
        />
        <div className={styles.mobilePanel} role="dialog" aria-label="Navigation menu">
          <button
            className={styles.hamburger}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} color="white" />
          </button>
          {navItems.map((item) => (
            <div key={item.href} className={styles.mobileNavItem}>
              {item.children ? (
                <>
                  <button
                    className={styles.mobileNavLink}
                    onClick={() =>
                      setOpenMobileMenu(
                        openMobileMenu === item.label ? null : item.label
                      )
                    }
                    style={{ width: "100%", background: "none" }}
                    aria-expanded={openMobileMenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      style={{
                        transform:
                          openMobileMenu === item.label
                            ? "rotate(180deg)"
                            : "rotate(0)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </button>
                  <div
                    className={`${styles.mobileSubMenu} ${
                      openMobileMenu === item.label ? styles.open : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.mobileSubItem}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          {/* Mobile Contacts */}
          <div style={{ padding: "1.5rem 1.75rem", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "1rem" }}>
            <a href="tel:6362068331" style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              <Phone size={14} /> +91 63620 68331 (Bathware)
            </a>
            <a href="tel:7892507179" style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              <Phone size={14} /> +91 78925 07179 (Hardware)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
