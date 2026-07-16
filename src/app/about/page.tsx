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

      <section className="py-16 sm:py-24">
        <div className="container grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Established 2018
            </span>
            <h2 className="mb-6 text-3xl font-light leading-tight text-white sm:text-4xl">
              Elevating everyday spaces with exceptional design.
            </h2>
            <div className="space-y-5 text-[0.95rem] leading-[1.85] text-gray-700">
              {about.slice(1, 3).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.title} className="border border-border p-5">
                  <h3 className="mb-1.5 text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src="/assets/khs/about/download.jpg"
              alt="Krishna Home Studio interior design"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-20 text-white sm:py-28">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-6xl leading-none text-gold/40">&ldquo;</span>
          <h2 className="mt-2 text-2xl font-light leading-relaxed sm:text-3xl">
            {about[20] ??
              "At Krishna Home Studio, customer satisfaction is at the core of our business philosophy. We take pride in offering quality products at reasonable prices."}
          </h2>
          <div className="mx-auto mt-8 h-px w-10 bg-gold" />
          <span className="mt-6 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            Prakash Choudhary
          </span>
          <span className="block text-xs uppercase tracking-[0.15em] text-white/50">Co-founder &amp; CEO</span>
        </div>
      </section>

      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Looking Ahead
          </span>
          <p className="text-[0.95rem] leading-[1.85] text-gray-700">
            {about[21]}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white"
              id="about-visit-btn"
            >
              Visit Our Showrooms
            </Link>
            <Link
              href="/bathware"
              className="px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white underline decoration-gold underline-offset-4 hover:text-gold"
              id="about-explore-btn"
            >
              Browse Bathware
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
