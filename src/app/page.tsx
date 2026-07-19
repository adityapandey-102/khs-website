import Hero from "@/components/Hero/Hero";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import AboutSection from "@/components/AboutSection/AboutSection";
import AwardsSection from "@/components/AwardsSection/AwardsSection";
import ClienteleCarousel from "@/components/ClienteleCarousel/ClienteleCarousel";
import ContactSection from "@/components/ContactSection/ContactSection";
import NewsSection from "@/components/NewsSection/NewsSection";
import {
  BrandCarousel,
  FeaturedBrands,
  ClientelePreview,
  AwardsVideo,
} from "@/components/HomeExtras/HomeExtras";
import BrandPromoPopup from "@/components/BrandPromoPopup/BrandPromoPopup";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid
        label="Curated Selection"
        title="Our Signature Collections"
        description="A refined edit of our most-loved bathware categories, each chosen for lasting quality and everyday luxury."
        sectionClassName="py-20 sm:py-8"
      />
      <BrandCarousel />
      <BrandPromoPopup />
      {/* <AboutSection /> */}
      <FeaturedBrands />
      <AwardsSection />
      <AwardsVideo />
      <ClienteleCarousel />
      {/* <ClientelePreview /> */}
      {/* <NewsSection /> */}
      {/* <ContactSection /> */}
    </>
  );
}
