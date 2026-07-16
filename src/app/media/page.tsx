import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Newspaper } from "lucide-react";
import { newsItems } from "@/data/news";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Media & Press Coverage",
  description: "Explore the latest news, awards, and press features highlighting Krishna Home Studio's excellence in luxury interior solutions.",
};

const mediaGallery = [
  { src: "/assets/khs/media-press/0002-scaled.jpg", alt: "SiliconIndia StartupCity magazine feature, page 1" },
  { src: "/assets/khs/media-press/0003-scaled.jpg", alt: "SiliconIndia StartupCity magazine feature, page 2" },
  { src: "/assets/khs/media-press/0004-scaled.jpg", alt: "SiliconIndia StartupCity 10 Best Interior Design Startups 2023 award graphic" },
  { src: "/assets/khs/media-press/570751interior-design-startups-certificate570751-1-scaled.jpg", alt: "SiliconIndia StartupCity 10 Best Interior Design Startups 2023 certificate" },
];

export default function MediaPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Media" }]} />
      <PageHero label="News & Updates" title="Media Coverage" image="/assets/khs/hardware/Krishna-Home-Studio-Hardware-2.png" />

      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              In The Press
            </span>
            <h2 className="text-3xl font-light text-white sm:text-4xl">Featured Articles &amp; Recognition</h2>
          </div>

          <p className="mx-auto mb-16 max-w-2xl text-center text-[0.95rem] leading-[1.85] text-gray-700">
            Krishna Home Studio has consistently been recognised for combining premium design, trusted product
            curation, and a deeply personalised retail experience.
          </p>

          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {newsItems.map((item) => (
              <div key={item.id} className="flex flex-col bg-surface p-7" id={`media-card-${item.id}`}>
                {item.logo ? (
                  <div className="mb-5 flex h-12 w-fit items-center bg-white px-3 py-2">
                    <Image src={item.logo} alt={`${item.publication} logo`} width={120} height={48} className="max-h-8 w-auto object-contain" />
                  </div>
                ) : (
                  <Newspaper size={22} className="mb-5 text-gold" strokeWidth={1.5} />
                )}
                <h3 className="mb-1 text-base font-medium text-white">{item.publication}</h3>
                {item.highlight && <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gold">{item.highlight}</p>}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700">{item.description}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
                  >
                    Open Article <ArrowRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Media Gallery
            </span>
            <h2 className="text-3xl font-light text-white sm:text-4xl">The Feature, In Print</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {mediaGallery.map((img) => (
              <a
                key={img.src}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-3/4 overflow-hidden bg-surface"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Awards</span>
            <h3 className="mb-2 text-base font-medium text-white">India Design Awards recognition</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              The studio&apos;s standing in the design ecosystem was reinforced by recognition that celebrated its
              refined product storytelling and retail execution.
            </p>
          </div>
          <div>
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Brand Presence</span>
            <h3 className="mb-2 text-base font-medium text-white">Premium collections across bathware and hardware</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              From contemporary basins and faucets to architectural hardware, the collection is designed to suit both
              private homes and premium projects.
            </p>
          </div>
          <div>
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Client Experience</span>
            <h3 className="mb-2 text-base font-medium text-white">Personal consultation and end-to-end support</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              Every project is guided with care, whether the client is sourcing a single fixture or planning a full
              interior transformation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
