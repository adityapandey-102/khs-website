import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { hardwareCategories } from "@/data/categories";
import { pageCopy } from "@/data/pageCopy";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import CertificationStrip from "@/components/CertificationStrip/CertificationStrip";

export const metadata: Metadata = {
  title: "Hardware Collection",
  description:
    "Explore architectural door handles, hinges, cabinet fittings, soft-close sliders, and smart biometric security systems at Krishna Home Studio.",
};

export default function HardwarePage() {
  const whatsappUrl =
    "https://wa.me/917892507179?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20architectural%20hardware%20collection.";
  const intro = pageCopy.hardware?.paragraphs[2];

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Hardware" }]} />
      <PageHero
        label="Collections"
        title="Architectural Hardware"
        image="/assets/khs/hardware/Krishna-Home-Studio-Hardware-2.png"
      />

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Precision Engineered
            </span>
            <h2 className="mb-6 text-3xl font-light text-primary-dark sm:text-4xl">
              Flawless Function, Timeless Elegance
            </h2>
            {intro && <p className="text-[0.95rem] leading-[1.85] text-gray-700">{intro}</p>}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hardwareCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden"
              id={`hardware-card-${cat.id}`}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative p-6">
                <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  Hardware
                </span>
                <h3 className="mb-1 text-lg font-medium text-white">{cat.label}</h3>
                <p className="text-xs leading-relaxed text-white/70">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mb-14">
            <CertificationStrip title="Brand Partners" />
          </div>

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 border border-border p-10 text-center">
            <h3 className="text-xl font-light text-primary-dark">Need Custom Fittings?</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              Bring your cabinet plans, wardrobe blueprints, or entry door dimensions. Our hardware consultants will
              assist you in sourcing the exact load capacities, soft-close mechanisms, or biometric locks to fit your
              needs.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-dark transition-colors hover:bg-gold-hover"
              id="btn-hardware-consult"
            >
              Consult with Hardware Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
