import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import CertificationStrip from "@/components/CertificationStrip/CertificationStrip";

export const metadata: Metadata = {
  title: "Bathware Collection",
  description:
    "Browse our premium bathware collections in Bengaluru, including shower systems, sanitaryware, vanity cabinets, and spa solutions.",
};

export default function BathwareHubPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Bathware" }]} />
      <PageHero
        label="Collections"
        title="Bathware Studio"
        image="/assets/khs/about/Untitled-design-17.png"
      />
      <CategoryGrid
        title="Explore Our Bathware Collections"
        label="Full Catalogue"
        description="Eleven curated categories spanning showers, sanitaryware, vanities and wellness — every piece selected for lasting craft."
        showAll
      />
      <div className="pb-20">
        <div className="container">
          <CertificationStrip />
        </div>
      </div>
    </div>
  );
}
