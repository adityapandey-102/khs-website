"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";

const inputClass =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-primary-dark placeholder:text-gray-400 focus:border-gold focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-gray-400";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  const bathwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Bathware+Rajajinagar+Bengaluru";
  const hardwareMapUrl = "https://maps.google.com/?q=Krishna+Home+Studio+Hardware+Rajajinagar+Bengaluru";

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero label="Get In Touch" title="Contact Us" image="/assets/khs/bathware/standalone-basin/IMG-20230520-WA0094.jpg" />

      <section className="py-16 sm:py-24">
        <div className="container grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Send a Message
            </span>
            <h2 className="mb-8 text-3xl font-light text-primary-dark">How can we help?</h2>

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

          <div className="space-y-6">
            <div className="border border-border p-7">
              <h3 className="mb-5 text-lg font-medium text-primary-dark">Bathware Studio</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
                  <span>#690, 36th Cross, 11th B Main Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-gold" />
                  <a href="tel:6362068331" className="hover:text-gold">+91 63620 68331</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-gold" />
                  <a href="mailto:support@krishnahomestudio.com" className="hover:text-gold">support@krishnahomestudio.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={17} className="shrink-0 text-gold" />
                  <span>Mon – Sun: 10:00 AM – 8:30 PM</span>
                </div>
              </div>
              <a
                href={bathwareMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
              >
                Open in Google Maps <ArrowRight size={14} />
              </a>
            </div>

            <div className="border border-border p-7">
              <h3 className="mb-5 text-lg font-medium text-primary-dark">Hardware Studio</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
                  <span>#461, 36th Cross Road, 2nd Block, Rajajinagar, Bengaluru 560010</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-gold" />
                  <a href="tel:7892507179" className="hover:text-gold">+91 78925 07179</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-gold" />
                  <a href="mailto:Hardware@krishnahomestudio.com" className="hover:text-gold">Hardware@krishnahomestudio.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={17} className="shrink-0 text-gold" />
                  <span>Mon – Sun: 10:00 AM – 8:30 PM</span>
                </div>
              </div>
              <a
                href={hardwareMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
              >
                Open in Google Maps <ArrowRight size={14} />
              </a>
            </div>

            <div className="border border-border p-7">
              <h3 className="mb-5 text-lg font-medium text-primary-dark">Jaquar Authorised Dealer</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
                  <span>285/2, Bagalur to Yelahanka Main Road, near Bagalur Vegetable Market, Bengaluru, Karnataka 562149</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-gold" />
                  <a href="tel:8147393477" className="hover:text-gold">+91 81473 93477</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-gold" />
                  <a href="mailto:support@krishnahomestudio.com" className="hover:text-gold">support@krishnahomestudio.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
