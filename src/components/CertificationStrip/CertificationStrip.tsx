import Image from "next/image";
import { brandLogos } from "@/data/migratedContent";

interface CertificationStripProps {
  title?: string;
  brands?: string[];
}

export default function CertificationStrip({ title = "Authorized Partners", brands }: CertificationStripProps) {
  const logos = brands
    ? brandLogos.filter((brand) => brands.includes(brand.name))
    : brandLogos;

  if (logos.length === 0) return null;

  return (
    <div className="border-t border-border pt-10">
      <span className="mb-6 block text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-400">
        {title}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((brand) => (
          <div key={brand.name} className="flex h-12 w-26 items-center justify-center bg-white p-2 grayscale transition-all hover:grayscale-0">
            <Image src={brand.image} alt={brand.name} width={96} height={40} className="max-h-8 w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
