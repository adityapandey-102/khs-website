import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import ClienteleCarousel from "@/components/ClienteleCarousel/ClienteleCarousel";
import ContactSection from "@/components/ContactSection/ContactSection";
import { BrandCarousel } from "@/components/HomeExtras/HomeExtras";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryGrid title="Explore Collections" label="Curated Excellence" />
      <AboutSection />
      <ClienteleCarousel />
      <BrandCarousel />
      <ContactSection />
    </main>
  );
}
