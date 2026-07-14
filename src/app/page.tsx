import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import AwardsSection from "@/components/AwardsSection/AwardsSection";
import NewsSection from "@/components/NewsSection/NewsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import {
  AwardsVideo,
  BrandCarousel,
  ClientelePreview,
  FeaturedProducts,
  TestimonialsSection,
} from "@/components/HomeExtras/HomeExtras";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCarousel />
      <AboutSection />
      <FeaturedProducts />
      <CategoryGrid title="Our Collections" label="Bathware" />
      <AwardsSection />
      <ClientelePreview />
      <NewsSection />
      <AwardsVideo />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
