import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { newsItems } from "@/data/news";

export default function NewsSection() {
  return (
    <section className="py-20 sm:py-28" id="news">
      <div className="container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              Media &amp; Awards
            </span>
            <h2 className="text-3xl font-light text-primary-dark sm:text-4xl">In The Press</h2>
          </div>
          <Link
            href="/media"
            className="inline-flex items-center gap-3 border border-primary-dark px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
            id="news-view-all"
          >
            View All Coverage
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col bg-surface p-7" id={`news-card-${item.id}`}>
              {item.logo ? (
                <div className="mb-5 flex h-12 w-fit items-center bg-white px-3 py-2">
                  <Image src={item.logo} alt={`${item.publication} logo`} width={120} height={48} className="max-h-8 w-auto object-contain" />
                </div>
              ) : (
                <Newspaper size={22} className="mb-5 text-gold" strokeWidth={1.5} />
              )}
              <h3 className="mb-2 text-base font-medium text-primary-dark">{item.publication}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700">{item.description}</p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-widest text-gold hover:underline"
                  id={`news-link-${item.id}`}
                >
                  Open Article <ArrowRight size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
