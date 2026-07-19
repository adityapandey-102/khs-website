import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredBrands } from "@/data/migratedContent";
import { getBrandBySlug, getBrandProducts } from "@/data/brandProducts";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";

export async function generateStaticParams() {
  return featuredBrands.map((brand) => ({ brand: brand.slug }));
}

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };
  return {
    title: `${brand.brand} at Krishna Home Studio`,
    description: `Browse Krishna Home Studio's ${brand.category} collection featuring ${brand.brand}.`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const products = getBrandProducts(brand);
  const whatsappUrl = `https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(brand.brand)}%20range.`;

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Brands" }, { label: brand.brand }]} />
      <PageHero label="Authorized Partner" title={`${brand.brand} at Krishna Home Studio`} image={brand.image} />

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto mb-12 flex max-w-xl flex-col items-center gap-5 text-center">
            <div className="relative h-16 w-40 bg-white p-3 shadow-md ring-1 ring-black/5">
              <Image src={brand.logo} alt={brand.brand} fill sizes="160px" className="object-contain" />
            </div>
            <p className="text-[0.95rem] leading-[1.85] text-gray-700">
              Explore our {brand.category} collection featuring {brand.brand} — part of Krishna Home Studio&apos;s
              authorized brand portfolio. Every piece shown here is available to view in person at our Rajajinagar
              showroom.
            </p>
            <Link
              href={brand.categoryHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-blue"
            >
              View Full {brand.category} Collection <ArrowRight size={14} />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  href={`/brands/${brand.slug}/${product.slug}`}
                  key={product.slug}
                  className="group relative aspect-square overflow-hidden bg-offwhite"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Details
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400">
              Our {brand.brand} catalog is being updated — reach out and our team will share the latest range.
            </p>
          )}
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="container flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div>
            <h3 className="mb-3 text-2xl font-light">Want to See {brand.brand} in Person?</h3>
            <p className="max-w-lg text-sm leading-relaxed text-white/70">
              Visit our Rajajinagar showroom or reach out for a personalized consultation and quote.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-hover"
              id="btn-brand-whatsapp"
            >
              Inquire on WhatsApp
            </a>
            <Link
              href="/contact"
              className="border border-white/40 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-blue hover:text-blue"
              id="btn-brand-contact"
            >
              Contact Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
