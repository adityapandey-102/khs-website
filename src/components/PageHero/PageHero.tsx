import Image from "next/image";

interface PageHeroProps {
  label: string;
  title: string;
  image: string;
}

export default function PageHero({ label, title, image }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[22rem] items-center overflow-hidden bg-primary-dark sm:min-h-[26rem]">
      <Image src={image} alt={title} fill sizes="100vw" className="object-cover opacity-50" priority />
      <div className="absolute inset-0 bg-linear-to-r from-primary-dark/90 via-primary-dark/50 to-primary-dark/70" />
      <div className="container relative z-10 py-8">
        <span className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
          {label}
        </span>
        <h1 className="max-w-2xl text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
