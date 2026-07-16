import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Instagram = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Facebook = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/70">
      <div className="container grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/brand/khs-logo.png" alt="Krishna Home Studio Logo" width={100} height={44} className="h-10 w-auto object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-white">Krishna Home Studio</span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">Premium Bathware &amp; Hardware</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            Bengaluru&apos;s trusted showroom for premium bathroom fittings, sanitaryware, designer vanities, and
            high-end architectural hardware. Sourcing luxury and durability since 2018.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/khs_krishnahomestudio_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              id="footer-social-instagram"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://krishnahomestudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              id="footer-social-facebook"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white">Quick Links</h3>
          <div className="flex flex-col gap-3 text-sm text-white/55">
            <Link href="/" id="footer-link-home" className="hover:text-gold">Home</Link>
            <Link href="/about" id="footer-link-about" className="hover:text-gold">About Us</Link>
            <Link href="/bathware" id="footer-link-bathware" className="hover:text-gold">Bathware Collection</Link>
            <Link href="/hardware" id="footer-link-hardware" className="hover:text-gold">Hardware Collection</Link>
            <Link href="/clientele" id="footer-link-clientele" className="hover:text-gold">Clientele</Link>
            <Link href="/media" id="footer-link-media" className="hover:text-gold">Media Coverage</Link>
            <Link href="/contact" id="footer-link-contact" className="hover:text-gold">Contact Us</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white">Bathware</h3>
          <div className="flex flex-col gap-3 text-sm text-white/55">
            <Link href="/bathware/shower-faucets" id="footer-cat-shower" className="hover:text-gold">Shower &amp; Faucets</Link>
            <Link href="/bathware/countertop-basin" id="footer-cat-countertop" className="hover:text-gold">Countertop Basin</Link>
            <Link href="/bathware/standalone-basin" id="footer-cat-standalone" className="hover:text-gold">Standalone Basin</Link>
            <Link href="/bathware/vanity-mirrors" id="footer-cat-vanity" className="hover:text-gold">Vanities &amp; Mirrors</Link>
            <Link href="/bathware/spa-wellness" id="footer-cat-spa" className="hover:text-gold">Spa &amp; Wellness</Link>
            <Link href="/hardware" id="footer-cat-hardware" className="hover:text-gold">Architectural Hardware</Link>
            <Link href="/safe-essentials" id="footer-cat-safe" className="hover:text-gold">Safe Essentials</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white">Our Showrooms</h3>
          <div className="space-y-5 text-sm text-white/55">
            <div>
              <span className="mb-1.5 block font-medium text-white/80">Bathware Studio</span>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold" />
                <a href="tel:6362068331" id="footer-phone-bathware" className="hover:text-gold">+91 63620 68331</a>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block font-medium text-white/80">Hardware Studio</span>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold" />
                <a href="tel:7892507179" id="footer-phone-hardware" className="hover:text-gold">+91 78925 07179</a>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block font-medium text-white/80">Jaquar Authorised Dealer</span>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>285/2, Bagalur to Yelahanka Main Road, near Bagalur Vegetable Market, Bengaluru 562149</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold" />
                <a href="tel:8147393477" className="hover:text-gold">+91 81473 93477</a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} className="shrink-0 text-gold" />
              <a href="mailto:support@krishnahomestudio.com" id="footer-email" className="hover:text-gold">
                support@krishnahomestudio.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Krishna Home Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" id="footer-privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" id="footer-terms" className="hover:text-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
