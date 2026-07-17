import { categoryGalleries } from "./categoryGalleries";
import { featuredBrands } from "./migratedContent";

export type FeaturedBrand = (typeof featuredBrands)[number];

export interface BrandProduct {
  slug: string;
  title: string;
  image: string;
}

export function getBrandBySlug(slug: string): FeaturedBrand | undefined {
  return featuredBrands.find((b) => b.slug === slug);
}

// Real product-per-brand data doesn't exist yet — this derives a placeholder
// catalog from the category's real photography so the page structure is
// ready to swap in verified SKUs, specs and images later.
export function getBrandProducts(brand: FeaturedBrand): BrandProduct[] {
  const images = categoryGalleries[brand.galleryKey] ?? [];
  return images.map((img, index) => ({
    slug: `style-${index + 1}`,
    title: `${brand.category} — Style ${index + 1}`,
    image: img.src,
  }));
}
