import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { hardwareCategories } from "@/data/categories";
import { categoryGalleries } from "@/data/categoryGalleries";
import { pageCopy } from "@/data/pageCopy";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import CertificationStrip from "@/components/CertificationStrip/CertificationStrip";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";

// The real /hardware page on the old site groups its copy into six themed
// paragraphs (architectural / kitchen / wardrobe / security / glass /
// curtains) rather than having separate sub-pages. This maps each local
// sub-category to the matching real paragraph instead of inventing new copy.
const HARDWARE_COPY_INDEX: Record<string, number> = {
  "door-handles": 4,
  "hinges-channels": 6,
  "cabinet-hardware": 8,
  "security-systems": 10,
  "glass-fittings": 12,
};

const categoryBrandMap: Record<string, string[]> = {
  "door-handles": ["Hafele", "Godrej"],
  "hinges-channels": ["Hafele"],
  "security-systems": ["Godrej"],
  "glass-fittings": ["Hafele"],
  "cabinet-hardware": ["Hafele"],
};

// Safe Essentials has its own dedicated real page at /safe-essentials —
// excluded here to avoid a duplicate, thinner route.
const routableCategories = hardwareCategories.filter((c) => c.id !== "safe-essentials");

export async function generateStaticParams() {
  return routableCategories.map((cat) => ({ slug: cat.id }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = routableCategories.find((c) => c.id === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.shortLabel} Collection`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = routableCategories.find((c) => c.id === slug);
  if (!category) notFound();

  const gallery = categoryGalleries.hardware ?? [];
  const paragraphIndex = HARDWARE_COPY_INDEX[category.id];
  const realParagraph = paragraphIndex !== undefined ? pageCopy.hardware?.paragraphs[paragraphIndex] : undefined;
  const partnerBrands = categoryBrandMap[category.id] ?? ["Hafele", "Godrej"];
  const whatsappUrl = `https://wa.me/917892507179?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(category.shortLabel)}%20collection.`;

  const faqs = [
    {
      question: `What brands are available in ${category.shortLabel}?`,
      answer: `We stock ${partnerBrands.join(", ")} within this collection, alongside our full portfolio of authorized hardware partners. Visit our Hardware Studio in Rajajinagar to see the current range.`,
    },
    {
      question: "Do you provide installation and after-sales support?",
      answer:
        "Yes — our hardware consultants assist from selection through installation and offer ongoing after-sales support.",
    },
    {
      question: "Can you source custom fittings for my project?",
      answer:
        "Bring your cabinet plans, wardrobe blueprints, or entry door dimensions and our team will help source the exact load capacities, soft-close mechanisms, or locks to fit your needs.",
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Hardware", href: "/hardware" },
          { label: category.shortLabel },
        ]}
      />
      <PageHero label="Architectural Hardware" title={category.label} image={category.image} />

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.95rem] leading-[1.85] text-gray-700">{category.description}</p>
          </div>

          {gallery.length > 0 && (
            <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {gallery.map((img) => (
                <div key={img.src} className="relative aspect-square overflow-hidden bg-offwhite">
                  <Image
                    src={img.src}
                    alt={img.alt || category.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}

          {realParagraph && (
            <div className="mx-auto mt-16 max-w-3xl">
              <p className="text-[0.95rem] leading-[1.85] text-gray-700">{realParagraph}</p>
            </div>
          )}

          <div className="mx-auto mt-16 max-w-2xl">
            <CertificationStrip brands={partnerBrands} />
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-6 text-center text-2xl font-light text-white">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="container flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div>
            <h3 className="mb-3 text-2xl font-light">Build with Precision</h3>
            <p className="max-w-lg text-sm leading-relaxed text-white/70">
              Visit our Hardware Studio to experience these precision-engineered products live. Our experts will
              help you select the perfect hardware for your project.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold-hover"
              id="btn-cat-whatsapp-hw"
            >
              Inquire on WhatsApp
            </a>
            <Link
              href="/contact"
              className="border border-white/40 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
              id="btn-cat-contact-hw"
            >
              Contact Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
