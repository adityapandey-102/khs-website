"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import { brandLogos } from "@/data/migratedContent";

const inputClass =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-primary-dark placeholder:text-gray-400 focus:border-gold focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-gray-400";

const NAV_ITEMS = [
  { href: "#connect", label: "Quick Connect" },
  { href: "#message", label: "Send a Message" },
  { href: "#showrooms", label: "Visit a Showroom" },
];

const stores = [
  {
    id: "bathware",
    tag: "Bathware Collection",
    name: "Bathware Studio",
    address: "#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010",
    phoneDisplay: "+91 63620 68331",
    phoneHref: "tel:6362068331",
    email: "support@krishnahomestudio.com",
    hours: "Mon – Sun: 10:00 AM – 8:30 PM",
    mapUrl: "https://maps.google.com/?q=Krishna+Home+Studio+Bathware+Rajajinagar+Bengaluru",
    embedUrl: "https://www.google.com/maps?q=Krishna+Home+Studio+Bathware+Rajajinagar+Bengaluru&output=embed",
    featured: true,
  },
  {
    id: "hardware",
    tag: "Hardware Collection",
    name: "Hardware Studio",
    address: "#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010",
    phoneDisplay: "+91 78925 07179",
    phoneHref: "tel:7892507179",
    email: "Hardware@krishnahomestudio.com",
    hours: "Mon – Sun: 10:00 AM – 8:30 PM",
    mapUrl: "https://maps.google.com/?q=Krishna+Home+Studio+Hardware+Rajajinagar+Bengaluru",
  },
  {
    id: "jaquar",
    tag: "Authorised Dealer",
    name: "Jaquar Studio",
    address: "285/2, Bagalur to Yelahanka Main Road, near Bagalur Vegetable Market, Bengaluru, Karnataka 562149",
    phoneDisplay: "+91 81473 93477",
    phoneHref: "tel:8147393477",
    email: "support@krishnahomestudio.com",
    mapUrl: "https://maps.google.com/?q=285%2F2+Bagalur+to+Yelahanka+Main+Road+Bengaluru",
  },
];

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        label="We'd Love to Hear From You"
        title="Let's Bring Your Space to Life"
        image="/assets/khs/bathware/standalone-basin/IMG-20230520-WA0094.jpg"
      />

      {/* Quick-jump nav — sticky under the header so any option is one click away */}
      <nav
        aria-label="Contact page sections"
        className="sticky top-19 z-40 border-b border-border bg-white/95 backdrop-blur-sm sm:top-28"
      >
        <div className="container flex flex-wrap items-center justify-center gap-2 py-3 sm:justify-between sm:gap-4 sm:py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary-dark transition-colors hover:bg-offwhite hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </div>
          <span className="hidden text-[0.68rem] uppercase tracking-[0.15em] text-gray-400 sm:block">
            {brandLogos.length}+ Authorized Brands &middot; Open 7 Days &middot; Rajajinagar, Bengaluru
          </span>
        </div>
      </nav>

      {/* Quick Connect — the two instant channels, up front */}
      <section id="connect" className="scroll-mt-32 bg-primary-dark py-16 text-white sm:scroll-mt-44 sm:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Quick Connect
            </span>
            <h2 className="text-3xl font-light sm:text-4xl">Two Taps Away From an Answer</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              Prefer talking things through? Call or WhatsApp our team directly — no forms, no waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-white/10 bg-white/5 p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center bg-gold/15">
                <Phone size={20} className="text-gold" />
              </div>
              <h3 className="mb-2 text-xl font-light">Call Us</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                Speak directly with a bathware or hardware specialist about your project.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:6362068331"
                  className="flex items-center justify-between border border-white/20 px-5 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  Bathware: +91 63620 68331 <ArrowRight size={14} />
                </a>
                <a
                  href="tel:7892507179"
                  className="flex items-center justify-between border border-white/20 px-5 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  Hardware: +91 78925 07179 <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center bg-gold/15">
                <MessageCircle size={20} className="text-gold" />
              </div>
              <h3 className="mb-2 text-xl font-light">WhatsApp Us</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                Send photos of your space or a product you love — we&apos;ll reply with options and pricing.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20bathware%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gold px-5 py-3 text-sm font-medium text-primary-dark transition-colors hover:bg-gold-hover"
                >
                  Chat: Bathware Team <ArrowRight size={14} />
                </a>
                <a
                  href="https://wa.me/917892507179?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20hardware%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/20 px-5 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  Chat: Hardware Team <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Send a Message */}
      <section id="message" className="scroll-mt-32 py-16 sm:scroll-mt-44 sm:py-24">
        <div className="container grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Send a Message
            </span>
            <h2 className="mb-3 text-3xl font-light text-primary-dark">How Can We Help?</h2>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-700">
              Share a few details about your project and our team will personally follow up with the right
              recommendations.
            </p>

            {formStatus === "success" ? (
              <div className="border border-border p-10 text-center">
                <CheckCircle2 size={44} className="mx-auto mb-4 text-gold" />
                <h3 className="mb-2 text-xl font-light text-primary-dark">Thank You!</h3>
                <p className="text-sm text-gray-700">Your message has been received. Our team will get back to you shortly.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-6 border border-primary-dark px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-primary-dark hover:bg-primary-dark hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="firstName">First Name</label>
                    <input className={inputClass} type="text" id="firstName" required placeholder="John" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="lastName">Last Name</label>
                    <input className={inputClass} type="text" id="lastName" required placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="email">Email Address</label>
                    <input className={inputClass} type="email" id="email" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="phone">Phone Number</label>
                    <input className={inputClass} type="tel" id="phone" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="interest">I am interested in...</label>
                  <select className={inputClass} id="interest" defaultValue="">
                    <option value="" disabled>Select an option</option>
                    <option value="bathware">Bathware &amp; Sanitaryware</option>
                    <option value="hardware">Architectural Hardware</option>
                    <option value="project">Large Scale Project Setup</option>
                    <option value="partnership">Brand Partnership</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="message">Your Message</label>
                  <textarea className={inputClass} id="message" rows={5} required placeholder="Tell us about your project..." />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="inline-flex items-center gap-3 bg-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-primary-dark disabled:opacity-60"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"} <Send size={14} />
                </button>
              </form>
            )}
          </div>

          <div className="border border-border bg-offwhite p-8">
            <h3 className="mb-5 text-lg font-medium text-primary-dark">Prefer to Reach Us Directly?</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <a href="tel:6362068331" className="flex items-center gap-3 hover:text-gold">
                <Phone size={17} className="shrink-0 text-gold" /> +91 63620 68331 (Bathware)
              </a>
              <a href="tel:7892507179" className="flex items-center gap-3 hover:text-gold">
                <Phone size={17} className="shrink-0 text-gold" /> +91 78925 07179 (Hardware)
              </a>
              <a href="mailto:support@krishnahomestudio.com" className="flex items-center gap-3 hover:text-gold">
                <Mail size={17} className="shrink-0 text-gold" /> support@krishnahomestudio.com
              </a>
              <div className="flex items-center gap-3">
                <Clock size={17} className="shrink-0 text-gold" /> Mon – Sun: 10:00 AM – 8:30 PM
              </div>
            </div>
            <a
              href="#showrooms"
              className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
            >
              Or Visit a Showroom <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Visit a Showroom */}
      <section id="showrooms" className="scroll-mt-32 bg-offwhite py-16 sm:scroll-mt-44 sm:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Visit a Showroom
            </span>
            <h2 className="text-3xl font-light text-primary-dark sm:text-4xl">See It, Touch It, Choose It</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-700">
              Three studios in Rajajinagar, Bengaluru — walk in daily or schedule a private consultation with our
              design team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="overflow-hidden border border-border bg-white shadow-sm">
              <iframe
                title="Krishna Home Studio — Bathware Studio location"
                src={stores[0].embedUrl}
                className="h-64 w-full sm:h-full sm:min-h-[22rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {stores.map((store) => (
                <div key={store.id} className="border border-border bg-white p-7">
                  <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
                    {store.tag}
                  </span>
                  <h3 className="mb-4 text-lg font-medium text-primary-dark">{store.name}</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                      <span>{store.address}</span>
                    </div>
                    <a href={store.phoneHref} className="flex items-center gap-3 hover:text-gold">
                      <Phone size={16} className="shrink-0 text-gold" /> {store.phoneDisplay}
                    </a>
                    <a href={`mailto:${store.email}`} className="flex items-center gap-3 hover:text-gold">
                      <Mail size={16} className="shrink-0 text-gold" /> {store.email}
                    </a>
                    {store.hours && (
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="shrink-0 text-gold" /> {store.hours}
                      </div>
                    )}
                  </div>
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
                  >
                    Get Directions <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
