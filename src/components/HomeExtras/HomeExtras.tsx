import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { brandLogos, featuredBrands, testimonials } from "@/data/migratedContent";
import { ClickToPlayVideo } from "./ClickToPlayVideo";

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

export function FeaturedBrands() {
  return (
    <div className="py-20 sm:py-28">
      <div className="container">
        <span className="mb-3 block text-center text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
          Featured Brands
        </span>
        <h2 className="mx-auto max-w-xl text-center text-3xl font-light text-primary-dark sm:text-4xl">
          The World&apos;s Top Bath &amp; Hardware Brands
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredBrands.map((item) => (
            <Link
              href={item.href}
              className="group relative aspect-3/4 overflow-hidden bg-primary-dark"
              key={item.brand}
            >
              <Image
                src={item.image}
                alt={`${item.category} by ${item.brand}`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className={`object-cover ${item.imagePosition ?? ""} transition-transform duration-700 ease-out group-hover:scale-110`}
              />
              {/* Darken the photo so it reads purely as texture — the brand is the subject here */}
              <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 to-black/75 transition-colors duration-500 group-hover:from-black/65 group-hover:to-black/80" />

              <div className="absolute inset-x-0 top-0 flex justify-center p-4 sm:p-5">
                <div className="relative h-16 w-28 bg-white p-2 shadow-lg ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:h-18 sm:w-32 sm:p-2.5">
                  <Image
                    src={item.logo}
                    alt={item.brand}
                    fill
                    sizes="130px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  Featured Brand
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="text-base font-medium text-white sm:text-lg">{item.brand}</strong>
                  <span className="truncate text-[0.7rem] text-white/70">{item.category}</span>
                </div>
              </div>
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
          <ClickToPlayVideo
            src="/assets/khs/unassociated/KHS-Video.mp4"
            poster="/assets/khs/hardware/Krishna-Home-Studio-Hardware-2.png"
            alt="India Design Awards Recognition video"
          />
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
