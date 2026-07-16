import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { bathwareCategories } from "@/data/categories";
import { categoryGalleries } from "@/data/categoryGalleries";
import { pageCopy } from "@/data/pageCopy";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import CertificationStrip from "@/components/CertificationStrip/CertificationStrip";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";

// Local category id -> live-site page slug (most match; this one was renamed).
const PAGE_COPY_SLUG: Record<string, string> = {
  "water-softeners-heaters": "pressure-pump-water-heater",
};

const categoryBrandMap: Record<string, string[]> = {
  "shower-faucets": ["Artize", "Grohe", "Kohler", "Hindware"],
  "washbasins-waterclosets-urinals": ["Parryware", "Roca", "Hindware", "Toto"],
  "countertop-basin": ["Roca", "Toto", "Kohler", "Grohe"],
  "standalone-basin": ["Kohler", "Roca", "Hindware"],
  "vanity-mirrors": ["Hafele", "Grohe"],
  "kitchen-sinks-faucets": ["Franke", "Hindware", "Grohe", "Roca"],
  "shower-enclosures": ["Grohe", "Kohler", "Hindware"],
  "booster-heat-pumps": ["Grundfos", "AO Smith", "Hindware", "Toto"],
  "water-softeners-heaters": ["AO Smith", "Roca", "Hindware"],
  "bath-accessories": ["Hindware", "Roca", "Kohler"],
  "spa-wellness": ["Artize", "Kohler", "Toto", "Grohe"],
};

export async function generateStaticParams() {
  return bathwareCategories.map((cat) => ({ slug: cat.id }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = bathwareCategories.find((c) => c.id === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.shortLabel} Collection`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = bathwareCategories.find((c) => c.id === slug);
  if (!category) notFound();

  const gallery = categoryGalleries[category.id] ?? [];
  const copy = pageCopy[PAGE_COPY_SLUG[category.id] ?? category.id];
  // Paragraph 0 is always the scraped on-page heading (duplicates the H1 above), so skip it.
  const introParagraphs = (copy?.paragraphs ?? []).slice(1, 5);
  const partnerBrands = categoryBrandMap[category.id] ?? ["Jaquar", "Kohler", "Hindware", "Roca"];
  const whatsappUrl = `https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(category.shortLabel)}%20collection.`;

  const faqs = [
    {
      question: `What brands are available in ${category.shortLabel}?`,
      answer: `We stock ${partnerBrands.join(", ")} within this collection, alongside our full portfolio of authorized partner brands. Visit our Rajajinagar showroom to see the current range in person.`,
    },
    {
      question: "Do you provide installation and after-sales support?",
      answer:
        "Yes — our team assists from selection through installation and offers ongoing after-sales support, one of the reasons customers keep returning to Krishna Home Studio.",
    },
    {
      question: "Can I visit the showroom before making a decision?",
      answer:
        "Absolutely. Our Bathware Studio in Rajajinagar, Bengaluru is open daily from 10:00 AM to 8:30 PM — walk in or call ahead to schedule a private consultation.",
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Bathware", href: "/bathware" },
          { label: category.shortLabel },
        ]}
      />
      <PageHero label="Bathware Collection" title={category.label} image={category.image} />

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.95rem] leading-[1.85] text-gray-700">{category.description}</p>
          </div>

          {gallery.length > 0 && (
            <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.slice(0, 12).map((img) => (
                <div key={img.src} className="relative aspect-square overflow-hidden bg-offwhite">
                  <Image
                    src={img.src}
                    alt={img.alt || category.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}

          {introParagraphs.length > 0 && (
            <div className="mx-auto mt-16 max-w-3xl space-y-5 text-[0.95rem] leading-[1.85] text-gray-700">
              {introParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="mx-auto mt-16 max-w-2xl">
            <CertificationStrip brands={partnerBrands} />
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-6 text-center text-2xl font-light text-primary-dark">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="container flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div>
            <h3 className="mb-3 text-2xl font-light">Design Your Dream Space</h3>
            <p className="max-w-lg text-sm leading-relaxed text-white/70">
              Visit our Rajajinagar showroom to view these products live, consult with our bath planners, and receive
              a customized quote for your construction or remodeling project.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-dark transition-colors hover:bg-gold-hover"
              id="btn-cat-whatsapp"
            >
              Inquire on WhatsApp
            </a>
            <Link
              href="/contact"
              className="border border-white/40 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
              id="btn-cat-contact"
            >
              Contact Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
