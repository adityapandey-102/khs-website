import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Quote, Star } from "lucide-react";
import { brandLogos, testimonials } from "@/data/migratedContent";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Our Clientele",
  description:
    "Read reviews from Krishna Home Studio customers and browse our authorized brand partners.",
};

const completedProjects = [
  {
    id: 1,
    title: "Bathware Studio Experience",
    type: "Premium Residential Selection",
    location: "Rajajinagar, Bengaluru",
    image: "/assets/khs/bathware/countertop-basin/IMG-20230520-WA0057.jpg",
  },
  {
    id: 2,
    title: "Luxury Bath Concepts",
    type: "Showers, Basins and Vanities",
    location: "Bengaluru",
    image: "/assets/khs/about/Untitled-design-17.png",
  },
  {
    id: 3,
    title: "Hardware Studio",
    type: "Architectural Hardware",
    location: "Rajajinagar, Bengaluru",
    image: "/assets/khs/hardware/Krishna-Home-Studio-Hardware-2.png",
  },
];

export default function ClientelePage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Clientele" }]} />
      <PageHero label="Trusted Partnerships" title="Our Clientele" image="/assets/khs/hardware/Krishna-Home-Studio-Hardware-2.png" />

      <section className="border-b border-border py-12">
        <div className="container grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div>
            <span className="block text-4xl font-light text-primary-dark">500+</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.15em] text-gray-400">Happy Homeowners</span>
          </div>
          <div>
            <span className="block text-4xl font-light text-primary-dark">40+</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.15em] text-gray-400">Architects &amp; Designers</span>
          </div>
          <div>
            <span className="block text-4xl font-light text-primary-dark">15+</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.15em] text-gray-400">Luxury Apartment Complexes</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Our Partners
            </span>
            <h2 className="text-3xl font-light text-primary-dark sm:text-4xl">Authorized Brands We Carry</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            {brandLogos.map((brand) => (
              <div className="flex h-16 items-center justify-center bg-white p-3" key={brand.name}>
                <Image src={brand.image} alt={brand.name} width={110} height={45} className="max-h-10 w-auto object-contain" />
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((review) => (
              <div key={review.name} className="border border-border p-8" id={`testimonial-${review.name.toLowerCase().replaceAll(" ", "-")}`}>
                <div className="mb-3 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <Quote size={28} className="mb-3 text-gold/40" />
                <p className="text-sm leading-relaxed text-gray-700">{review.text}</p>
                <span className="mt-4 block text-sm font-medium text-primary-dark">{review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-20 text-white sm:py-28">
        <div className="container">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Design Portfolio
            </span>
            <h2 className="text-3xl font-light sm:text-4xl">Featured Work</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {completedProjects.map((project) => (
              <div key={project.id} className="group relative aspect-4/5 overflow-hidden" id={`project-${project.id}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-1.5 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em] text-gold">
                    <Building2 size={13} /> {project.type}
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-white">{project.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <MapPin size={13} /> {project.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="mb-5 text-3xl font-light text-primary-dark sm:text-4xl">Partner with Krishna Home Studio</h2>
          <p className="mb-8 text-[0.95rem] leading-[1.85] text-gray-700">
            Are you an architect, builder, or independent interior designer looking for reliable procurement partners
            in sanitaryware, bathroom accessories, modular kitchen fittings, or electronic locking systems?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
            id="btn-client-partner"
          >
            Request Business Partnership
          </Link>
        </div>
      </section>
    </div>
  );
}
