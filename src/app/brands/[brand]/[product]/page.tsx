import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { featuredBrands } from "@/data/migratedContent";
import { getBrandBySlug, getBrandProducts } from "@/data/brandProducts";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

export async function generateStaticParams() {
  return featuredBrands.flatMap((brand) =>
    getBrandProducts(brand).map((product) => ({ brand: brand.slug, product: product.slug }))
  );
}

interface ProductPageProps {
  params: Promise<{ brand: string; product: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { brand: brandSlug, product: productSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  const product = brand && getBrandProducts(brand).find((p) => p.slug === productSlug);
  if (!brand || !product) return { title: "Product Not Found" };
  return { title: `${product.title} | ${brand.brand} | Krishna Home Studio` };
}

// Real specs aren't tracked per-product yet — these rows are a template for
// the store to fill in; "Ask in-store" is an honest placeholder, not a fabricated spec.
const SPEC_ROWS = ["Model No.", "Finish", "Dimensions", "Material", "Warranty"];

export default async function ProductPage({ params }: ProductPageProps) {
  const { brand: brandSlug, product: productSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  if (!brand) notFound();
  const product = getBrandProducts(brand).find((p) => p.slug === productSlug);
  if (!product) notFound();

  const whatsappUrl = `https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
    product.title
  )}%20from%20${encodeURIComponent(brand.brand)}.`;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Brands" },
          { label: brand.brand, href: `/brands/${brand.slug}` },
          { label: product.title },
        ]}
      />

      <section className="py-12 sm:py-20">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden bg-offwhite">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <div className="relative mb-5 h-12 w-32">
              <Image src={brand.logo} alt={brand.brand} fill sizes="130px" className="object-contain" />
            </div>
            <h1 className="text-2xl font-light text-primary-dark sm:text-3xl">{product.title}</h1>
            <p className="mt-2 text-sm text-gray-400">
              {brand.category} · {brand.brand}
            </p>

            <div className="mt-8 border-t border-border">
              {SPEC_ROWS.map((label) => (
                <div key={label} className="flex items-center justify-between border-b border-border py-3 text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-gray-700">Ask in-store</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400">
              Sample layout — full specifications for this piece are confirmed at our showroom or on request.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue px-7 py-3.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-hover"
                id="btn-product-whatsapp"
              >
                Inquire on WhatsApp
              </a>
              <Link
                href="/contact"
                className="border border-border px-7 py-3.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-dark transition-colors hover:border-blue hover:text-blue"
                id="btn-product-contact"
              >
                Contact Store
              </Link>
            </div>

            <Link href={`/brands/${brand.slug}`} className="mt-6 inline-block text-xs text-gray-400 hover:text-blue">
              ← Back to {brand.brand} collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
