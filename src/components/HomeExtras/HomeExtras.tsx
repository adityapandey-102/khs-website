import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Quote, Star } from "lucide-react";
import { brandLogos, featuredProducts, testimonials } from "@/data/migratedContent";

export function BrandCarousel() {
  return (
    <section className="overflow-hidden border-y border-border bg-surface py-10" aria-label="Brand partners">
      <div className="flex w-max animate-marquee gap-6">
        {[...brandLogos, ...brandLogos].map((brand, index) => (
          <div
            className="flex h-16 w-37.5 shrink-0 items-center justify-center bg-white p-3 grayscale transition-all hover:grayscale-0"
            key={`${brand.name}-${index}`}
          >
            <Image src={brand.image} alt={brand.name} width={130} height={50} className="max-h-10 w-auto object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <div className="py-20 sm:py-28">
      <div className="container">
        <span className="mb-3 block text-center text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
          Featured Products
        </span>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link href={product.href} className="group relative aspect-3/4 overflow-hidden" key={product.title}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white">{product.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientelePreview() {
  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Our Partners
            </span>
            <h2 className="max-w-xl text-3xl font-light text-primary-dark sm:text-4xl">
              Trusted by Homeowners, Designers and Project Teams
            </h2>
          </div>
          <Link href="/clientele" className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-gold">
            View Clientele <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {brandLogos.map((brand) => (
            <div className="flex h-16 items-center justify-center bg-white p-3" key={brand.name}>
              <Image src={brand.image} alt={brand.name} width={110} height={45} className="max-h-10 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsVideo() {
  return (
    <section className="bg-primary-dark py-20 text-white sm:py-28">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Awards &amp; Success
          </span>
          <h2 className="text-3xl font-light sm:text-4xl">India Design Awards Recognition</h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-[1.8] text-white/70">
            Krishna Home Studio was featured among the India Design Awards 2023 awardees, recognizing its premium
            interior solution experience and bathware expertise.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden">
          <video
            src="/assets/khs/unassociated/KHS-Video.mp4"
            controls
            preload="metadata"
            poster="/assets/khs/hardware/Krishna-Home-Studio-Hardware-2.png"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-primary-dark">
            <Play size={14} /> Play Video
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="mb-14 text-center">
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Customer Reviews
          </span>
          <h2 className="text-3xl font-light text-primary-dark sm:text-4xl">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review) => (
            <article className="relative border border-border bg-surface p-8" key={review.name}>
              <Quote size={28} className="mb-4 text-gold/40" />
              <div className="mb-3 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={13} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-700">{review.text}</p>
              <strong className="mt-4 block text-sm font-medium text-primary-dark">{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
