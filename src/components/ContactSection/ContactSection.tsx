import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function ContactSection() {
  const bathwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Bathware+Rajajinagar+Bengaluru";
  const hardwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Hardware+Rajajinagar+Bengaluru";

  return (
    <section className="bg-primary-dark py-20 text-white sm:py-28" id="contact-section">
      <div className="container">
        <div className="mb-14 text-center">
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Visit Us
          </span>
          <h2 className="text-3xl font-light sm:text-4xl">Our Showrooms</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-white/10 bg-white/5 p-8" id="showroom-bathware">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Bathware Collection
            </span>
            <h3 className="mb-5 text-xl font-light">Bathware Studio</h3>
            <div className="mb-6 space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-gold" />
                <a href="tel:6362068331" id="contact-phone-bathware" className="hover:text-blue">+91 63620 68331</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-gold" />
                <a href="mailto:support@krishnahomestudio.com" id="contact-email-bathware" className="hover:text-blue">
                  support@krishnahomestudio.com
                </a>
              </div>
            </div>
            <a
              href={bathwareMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/30 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:border-blue hover:text-blue"
              id="btn-directions-bathware"
            >
              Get Directions <ExternalLink size={14} />
            </a>
          </div>

          <div className="border border-white/10 bg-white/5 p-8" id="showroom-hardware">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Hardware Collection
            </span>
            <h3 className="mb-5 text-xl font-light">Hardware Studio</h3>
            <div className="mb-6 space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-gold" />
                <a href="tel:7892507179" id="contact-phone-hardware" className="hover:text-blue">+91 78925 07179</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-gold" />
                <a href="mailto:Hardware@krishnahomestudio.com" id="contact-email-hardware" className="hover:text-blue">
                  Hardware@krishnahomestudio.com
                </a>
              </div>
            </div>
            <a
              href={hardwareMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/30 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:border-blue hover:text-blue"
              id="btn-directions-hardware"
            >
              Get Directions <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-14 text-center">
          <h3 className="text-2xl font-light">Have a Project in Mind?</h3>
          <p className="max-w-xl text-sm leading-relaxed text-white/70">
            Let our experts help you select the perfect fittings, sanitaryware, or hardware for your home. Reach out
            to set up a private consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-blue px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-blue-hover"
            id="btn-cta-contact"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
