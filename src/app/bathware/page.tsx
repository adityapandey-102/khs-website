import type { Metadata } from "next";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";

export const metadata: Metadata = {
  title: "Bathware Collection",
  description: "Browse our premium bathware collections in Bengaluru, including shower systems, sanitaryware, vanity cabinets, and spa solutions.",
};

export default function BathwareHubPage() {
  return (
    <div>
      {/* Page Hero Banner */}
      <section className="page-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80&auto=format&fit=crop"
          alt="Premium luxury bathware showcase"
          className="page-hero__bg"
        />
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__label">Collections</span>
            <h1 className="page-hero__title">Bathware Studio</h1>
          </div>
        </div>
      </section>

      {/* Grid of all categories */}
      <CategoryGrid
        title="Explore Our Bathware Collections"
        label="Full Catalogue"
        showAll={true}
      />
    </div>
  );
}
