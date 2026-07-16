import Hero from "@/components/Hero/Hero";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import AboutSection from "@/components/AboutSection/AboutSection";
import AwardsSection from "@/components/AwardsSection/AwardsSection";
import ClienteleCarousel from "@/components/ClienteleCarousel/ClienteleCarousel";
import ContactSection from "@/components/ContactSection/ContactSection";
import NewsSection from "@/components/NewsSection/NewsSection";
import {
  BrandCarousel,
  FeaturedProducts,
  ClientelePreview,
  AwardsVideo,
} from "@/components/HomeExtras/HomeExtras";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid showHeading={false} sectionClassName="pt-8 pb-16 sm:pt-10 sm:pb-24" />
      <BrandCarousel />
      {/* <AboutSection /> */}
      <FeaturedProducts />
      <AwardsSection />
      <AwardsVideo />
      <ClienteleCarousel />
      {/* <ClientelePreview /> */}
      {/* <NewsSection /> */}
      {/* <ContactSection /> */}
    </>
  );
}
