import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { newsItems } from "@/data/news";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Media & Press Coverage",
  description: "Explore the latest news, awards, and press features highlighting Krishna Home Studio's excellence in luxury interior solutions.",
};

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
            <h2 className="text-3xl font-light text-primary-dark sm:text-4xl">Featured Articles &amp; Recognition</h2>
          </div>

          <p className="mx-auto mb-16 max-w-2xl text-center text-[0.95rem] leading-[1.85] text-gray-700">
            Krishna Home Studio has consistently been recognised for combining premium design, trusted product
            curation, and a deeply personalised retail experience.
          </p>

          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {newsItems.map((item) => (
              <div key={item.id} className="flex flex-col bg-white p-7" id={`media-card-${item.id}`}>
                {item.logo && (
                  <div className="mb-5 flex h-12 w-fit items-center">
                    <Image src={item.logo} alt={`${item.publication} logo`} width={120} height={48} className="max-h-12 w-auto object-contain" />
                  </div>
                )}
                <h3 className="mb-1 text-base font-medium text-primary-dark">{item.publication}</h3>
                {item.highlight && <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gold">{item.highlight}</p>}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
                >
                  Read Full Article <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Awards</span>
            <h3 className="mb-2 text-base font-medium text-primary-dark">India Design Awards recognition</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              The studio&apos;s standing in the design ecosystem was reinforced by recognition that celebrated its
              refined product storytelling and retail execution.
            </p>
          </div>
          <div>
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Brand Presence</span>
            <h3 className="mb-2 text-base font-medium text-primary-dark">Premium collections across bathware and hardware</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              From contemporary basins and faucets to architectural hardware, the collection is designed to suit both
              private homes and premium projects.
            </p>
          </div>
          <div>
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Client Experience</span>
            <h3 className="mb-2 text-base font-medium text-primary-dark">Personal consultation and end-to-end support</h3>
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
