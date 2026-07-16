import Image from "next/image";
import Link from "next/link";
import { bathwareCategories } from "@/data/categories";

interface CategoryGridProps {
  title?: string;
  label?: string;
  showAll?: boolean;
  sectionClassName?: string;
}

export default function CategoryGrid({
  title = "Our Collections",
  label = "Bathware",
  showAll = false,
  sectionClassName = "py-20 sm:py-28",
}: CategoryGridProps) {
  const displayCategories = showAll ? bathwareCategories : bathwareCategories.slice(0, 8);

  return (
    <section className={sectionClassName} id="categories">
      <div className="container">
        <div className="mb-14 text-center">
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            {label}
          </span>
          <h2 className="text-3xl font-light text-white sm:text-4xl">{title}</h2>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative aspect-square overflow-hidden bg-surface"
              aria-label={`Explore ${cat.label}`}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/70 via-primary-dark/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-sm font-medium text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] sm:text-base">
                  {cat.shortLabel}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {!showAll && (
          <div className="mt-14 text-center">
            <Link
              href="/bathware"
              className="inline-flex items-center gap-3 border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
