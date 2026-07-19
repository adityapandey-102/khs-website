"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { brandLogos } from "@/data/migratedContent";

const PROMO_BRAND_NAMES = ["Jaquar", "Kohler", "Hindware", "Parryware", "Hafele"];
const promoBrands = brandLogos.filter((b) => PROMO_BRAND_NAMES.includes(b.name));

// Shows once, the first time the user scrolls down about half a screen height
// — i.e. shortly after leaving the hero. Deliberately simple: one state
// variable, one scroll listener that removes itself, nothing rendered at all
// until it's actually time to show (so there's no visibility/z-index/focus
// state to get wrong — if `open` is true, it's on screen; if not, it isn't).
export default function BrandPromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > window.innerHeight * 0.5) {
        setOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // covers landing already scrolled down (hash link, back/forward nav)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-900 flex items-center justify-center p-4">
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 animate-promo-fade bg-primary-dark/60"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-promo-heading"
        className="relative w-full max-w-80 animate-promo-in overflow-hidden bg-primary-dark p-6 text-center shadow-2xl sm:max-w-96 sm:p-8 lg:max-w-md lg:p-9"
      >
        <div className="absolute inset-x-0 top-0 h-0.75 bg-gold" aria-hidden="true" />

        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="absolute right-4 top-5 text-white/50 transition-colors hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="mx-auto flex h-11 w-24 items-center justify-center lg:h-12 lg:w-28">
          <Image
            src="/assets/brand/khs-logo.png"
            alt="Krishna Home Studio"
            width={112}
            height={50}
            className="h-9 w-auto object-contain lg:h-10"
          />
        </div>

        <span className="mt-4 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold lg:text-xs">
          Authorized Partner
        </span>
        <h3 id="brand-promo-heading" className="mt-1.5 text-lg font-light text-white lg:text-xl">
          Krishna Home Studio
        </h3>
        <p className="mx-auto mt-2 max-w-60 text-xs leading-relaxed text-white/60 lg:max-w-72 lg:text-[0.8rem]">
          Bringing together India&apos;s top bath &amp; hardware brands under one roof.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:gap-2.5">
          {promoBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-9 w-16 items-center justify-center bg-white p-1.5 lg:h-10 lg:w-18"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={72}
                height={28}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-64 text-xs leading-relaxed text-white/70 lg:max-w-72 lg:text-[0.8rem]">
          Looking for a product, or interested in partnering with us as a brand? Let&apos;s talk.
        </p>

        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-4 block bg-blue py-2.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-hover lg:py-3 lg:text-[0.72rem]"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
