import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, ShieldCheck, Flame, Fingerprint } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import { pageCopy } from "@/data/pageCopy";

export const metadata: Metadata = {
  title: "Safe Essentials",
  description:
    "Explore Krishna Home Studio's safe essentials collection, blending security technology, refined finishes, and premium home protection.",
};

const copy = pageCopy["safe-essentials"]?.paragraphs ?? [];

const features = [
  { title: "Reinforced Steel", icon: ShieldCheck },
  { title: "Fire Protection", icon: Flame },
  { title: "Biometric Access", icon: Fingerprint },
  { title: "Premium Locking", icon: LockKeyhole },
];

export default function SafeEssentialsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Hardware", href: "/hardware" }, { label: "Safe Essentials" }]} />
      <PageHero label="Hardware Collection" title="Safe Essentials" image="/assets/khs/home/dec23384735345.Y3JvcCwxMTUwLDkwMCwyNSww.jpg" />

      <section className="py-16 sm:py-24">
        <div className="container grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Secure Your Peace of Mind
            </span>
            <h2 className="mb-6 text-3xl font-light leading-tight text-white sm:text-4xl">
              Protection with Refined Elegance
            </h2>
            <div className="space-y-5 text-[0.95rem] leading-[1.85] text-gray-700">
              {copy.slice(1, 5).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white"
              >
                Visit Showroom
              </Link>
              <Link
                href="/hardware"
                className="px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white underline decoration-gold underline-offset-4 hover:text-gold"
              >
                Back to Hardware
              </Link>
            </div>
          </div>

          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src="/assets/khs/home/dec23384735345.Y3JvcCwxMTUwLDkwMCwyNSww.jpg"
              alt="Luxury safe essentials collection"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col items-center gap-3 border border-border p-6 text-center">
                <Icon size={24} className="text-gold" strokeWidth={1.5} />
                <span className="text-sm font-medium text-white">{feature.title}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
