import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import { pageCopy } from "@/data/pageCopy";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Krishna Home Studio's journey of delivering affordable luxury bathware and hardware solutions in Bengaluru since 2018.",
};

const about = pageCopy.about?.paragraphs ?? [];
const highlights = [
  { title: "Comprehensive Range", body: "From faucets to wellness products, high-end showers to steam cubicles, and from vanities to water heaters." },
  { title: "Premium Brands", body: "We proudly feature top brands like Hindware, Kohler, and Grohe, ensuring you get nothing but the best." },
  { title: "Innovative Solutions", body: "Fancy and stylish sensor touch mirrors, eco-friendly fixtures, and water-saving solutions." },
  { title: "Expert Guidance", body: "Our team of experts is always ready to help you choose the perfect fixtures for your space." },
];

export default function AboutPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero label="Our Journey" title="Our Story" image="/assets/khs/about/bathroom.jpg" />

      <section className="py-12 sm:py-16">
        <div className="container grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <span className="mb-3 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              Established 2018
            </span>
            <h2 className="mb-5 text-2xl font-light leading-tight text-primary-dark sm:text-3xl lg:text-[2.15rem]">
              Elevating everyday spaces with exceptional design.
            </h2>
            <div className="space-y-4 text-[0.9rem] leading-[1.8] text-gray-700">
              {about.slice(1, 3).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-primary-dark/10 pt-8 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div key={item.title}>
                  <span className="mb-1.5 block text-[0.66rem] font-medium tracking-[0.2em] text-primary-dark/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-1.5 text-sm font-medium text-primary-dark">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden lg:mt-1">
            <Image
              src="/assets/khs/about/download.jpg"
              alt="Krishna Home Studio interior design"
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="container mx-auto max-w-2xl text-center">
          <span className="text-5xl leading-none text-gold/40">&ldquo;</span>
          <h2 className="mt-2 text-xl font-light leading-relaxed sm:text-2xl">
            {about[20] ??
              "At Krishna Home Studio, customer satisfaction is at the core of our business philosophy. We take pride in offering quality products at reasonable prices."}
          </h2>
          <div className="mx-auto mt-6 h-px w-10 bg-gold" />
          <span className="mt-5 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            Prakash Choudhary
          </span>
          <span className="block text-xs uppercase tracking-[0.15em] text-white/50">Co-founder &amp; CEO</span>

          <div className="mx-auto mt-10 max-w-lg border-t border-white/10 pt-10">
            <span className="mb-3 flex items-center justify-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              Looking Ahead
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-white/70">{about[21]}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="border border-white/70 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-primary-dark"
                id="about-visit-btn"
              >
                Visit Our Showrooms
              </Link>
              <Link
                href="/bathware"
                className="px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80 underline decoration-gold underline-offset-4 hover:text-blue"
                id="about-explore-btn"
              >
                Browse Bathware
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
