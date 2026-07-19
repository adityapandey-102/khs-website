"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { bathwareCategories } from "@/data/categories";

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const WhatsAppIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.031 2C6.49 2 2 6.48 2 12.02c0 1.91.53 3.69 1.45 5.24L2 22l4.9-1.4c1.47.8 3.14 1.25 4.93 1.25 5.54 0 10.03-4.49 10.03-10.03C21.861 6.49 17.37 2 12.031 2zm6.29 13.9c-.27.75-1.56 1.46-2.15 1.52-.52.05-1.2.27-3.48-.68-2.91-1.21-4.75-4.14-4.89-4.33-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.01-2.42.27-.3.59-.37.79-.37.2 0 .4 0 .58.01.2.01.46-.08.72.54.27.65.92 2.23 1 2.4.08.18.14.38.01.63-.12.25-.19.4-.38.63-.19.22-.4.5-.57.67-.19.19-.4.39-.17.78.23.39.99 1.64 2.12 2.65 1.46 1.3 2.68 1.7 3.07 1.9.39.19.62.16.85-.1.23-.27.99-1.15 1.25-1.54.26-.39.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.19.65.29.75.46.1.17.1.98-.17 1.73z" />
  </svg>
);

const featuredImage = bathwareCategories[0]?.image;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Transparent overlay only makes sense floating over the home hero;
  // every other page keeps a solid header from the start.
  const solid = !isHome || scrolled;
  // Separate from `solid`: once the user has actually scrolled (on any
  // page), the utility bar hides and the main bar shrinks a little tighter.
  // Keeping this independent of `isHome` means non-home pages — which are
  // always "solid" — still get the tightened bar once scrolled, not just
  // the home page.
  const compact = scrolled;

  // Publish the header's current height as a CSS variable — driven by the
  // exact same `compact` boolean that sizes the header itself, in the same
  // render, so a sticky sub-nav positioned with top-(--header-height) is
  // always in lockstep with the header, never a frame behind it. (The
  // uncompact 76px/112px per breakpoint is provided by a CSS fallback in
  // globals.css, since compact is the only state JS needs to express here.)
  useLayoutEffect(() => {
    if (compact) {
      document.documentElement.style.setProperty("--header-height", "4rem");
    } else {
      document.documentElement.style.removeProperty("--header-height");
    }
  }, [compact]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-1000">
        {/* Utility bar — collapses away once the user scrolls, on every
            page, so the fixed header doesn't keep eating vertical space
            while reading content further down the page. */}
        <div
          className={`hidden overflow-hidden bg-primary-dark text-white/70 transition-[max-height,opacity] duration-300 ease-out sm:block ${
            compact ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="container flex h-9 items-center justify-between text-[0.72rem] tracking-wide">
            <div className="flex items-center gap-5">
              <a href="tel:6362068331" className="flex items-center gap-1.5 transition-colors hover:text-blue">
                <Phone size={11} /> Bathware: +91 63620 68331
              </a>
              <a href="tel:7892507179" className="hidden items-center gap-1.5 transition-colors hover:text-blue lg:flex">
                <Phone size={11} /> Hardware: +91 78925 07179
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/916362068331"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-blue"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
              <Link href="/contact" className="transition-colors hover:text-blue">
                Store Locator
              </Link>
              <a
                href="https://www.instagram.com/khs_krishnahomestudio_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-blue"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Main header */}
        <header
          className={`transition-colors duration-300 ${
            solid ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)]" : "bg-transparent"
          }`}
          onMouseLeave={() => setOpenDesktopMenu(null)}
        >
          <div
            className={`container flex items-center justify-between gap-8 transition-[height] duration-300 ease-out ${
              compact ? "h-16" : "h-19"
            }`}
          >
            <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Krishna Home Studio - Home">
              <span
                className={`flex items-center justify-center bg-primary-dark px-2 transition-[height,width] duration-300 ${
                  compact ? "h-9 w-19" : "h-11 w-23"
                }`}
              >
                <Image src="/assets/brand/khs-logo.png" alt="Krishna Home Studio" width={112} height={50} className="h-7 w-auto object-contain" priority />
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className={`text-[0.95rem] font-semibold tracking-[0.01em] transition-colors ${solid ? "text-primary-dark" : "text-white"}`}>
                  Krishna Home Studio
                </span>
                <span className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">A Class Apart</span>
              </span>
            </Link>

            <nav className="hidden items-center lg:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <div key={item.href} className="relative" onMouseEnter={() => setOpenDesktopMenu(item.label)}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-[color,height] duration-300 ${
                      compact ? "h-16" : "h-19"
                    } ${pathname === item.href ? "text-blue" : solid ? "text-black hover:text-blue" : "text-white hover:text-blue"}`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${openDesktopMenu === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && openDesktopMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={`absolute left-0 z-1000 flex w-[min(90vw,760px)] overflow-hidden border border-white/10 bg-primary-dark shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${
                          compact ? "top-16" : "top-19"
                        }`}
                      >
                        {item.label === "Bathware" && featuredImage && (
                          <Link
                            href="/bathware"
                            className="group relative hidden w-70 shrink-0 overflow-hidden bg-primary-dark md:block"
                          >
                            <Image
                              src={featuredImage}
                              alt="Bathware Collection"
                              fill
                              sizes="280px"
                              className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                              <span className="text-lg font-light text-white">Bathware Collection</span>
                              <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.15em] text-gold">Explore Now →</span>
                            </div>
                          </Link>
                        )}
                        <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-1 p-6">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="border-l-2 border-transparent px-3 py-2 text-[0.82rem] text-white/70 transition-colors hover:border-blue hover:bg-white/5 hover:text-blue"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className={`border px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-colors ${
                  solid
                    ? "border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-primary-dark"
                }`}
              >
                Enquire Now
              </a>
            </div>

            <button
              className="group flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="flex w-6 flex-col items-end gap-1.25">
                <span className={`h-[1.5px] w-full rounded-full transition-colors duration-300 ${solid ? "bg-primary-dark" : "bg-white"}`} />
                <span className={`h-[1.5px] w-full rounded-full transition-colors duration-300 ${solid ? "bg-primary-dark" : "bg-white"}`} />
                <span
                  className={`h-[1.5px] w-2/3 rounded-full transition-all duration-300 ease-out group-hover:w-full ${
                    solid ? "bg-primary-dark" : "bg-white"
                  }`}
                />
              </span>
            </button>
          </div>
        </header>
      </div>

      {/* Spacer so page content isn't hidden under the fixed header, except
          on the home page where the hero intentionally sits behind it. */}
      {!isHome && <div className="h-19 sm:h-28" aria-hidden="true" />}

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-1100 bg-primary-dark/70"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.2, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-1100 w-[min(360px,90vw)] overflow-y-auto bg-primary-dark pb-8"
              role="dialog"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-sm uppercase tracking-[0.2em] text-gold">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} color="white" />
                </button>
              </div>
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-white/10">
                  {item.children ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between px-6 py-4 text-sm font-medium uppercase tracking-[0.08em] text-white/90"
                        onClick={() => setOpenMobileMenu(openMobileMenu === item.label ? null : item.label)}
                        aria-expanded={openMobileMenu === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openMobileMenu === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openMobileMenu === item.label && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-black/20"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-9 py-2.5 text-[0.82rem] text-white/60 transition-colors hover:text-blue"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-6 py-4 text-sm font-medium uppercase tracking-[0.08em] text-white/90 hover:text-blue"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 space-y-3 px-6 py-5">
                <a href="tel:6362068331" className="flex items-center gap-2 text-[0.85rem] text-white/70">
                  <Phone size={14} /> +91 63620 68331 (Bathware)
                </a>
                <a href="tel:7892507179" className="flex items-center gap-2 text-[0.85rem] text-white/70">
                  <Phone size={14} /> +91 78925 07179 (Hardware)
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
