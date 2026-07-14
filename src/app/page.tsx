import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import AwardsSection from "@/components/AwardsSection/AwardsSection";
import NewsSection from "@/components/NewsSection/NewsSection";
import ContactSection from "@/components/ContactSection/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CategoryGrid title="Our Collections" label="Bathware" />
      <AwardsSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}
