import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import PageHero from "@/components/PageHero/PageHero";
import JourneyTimeline from "@/components/JourneyTimeline/JourneyTimeline";
import { pageCopy } from "@/data/pageCopy";

export const metadata: Metadata = {
  title: "About Founder — Prakash Choudhary",
  description: "Read about Prakash Choudhary's entrepreneurial journey and the vision that led to the founding of Krishna Home Studio.",
};

const founder = pageCopy["about-prakash-chaudhary"]?.paragraphs ?? [];

// Real timeline entries transcribed verbatim from the live site (year, then
// description pairs), reordered chronologically for readability only.
const timeline = [
  { year: "2012–2014", event: "BBA" },
  { year: "2014", event: "Selected for a business plan competition and entered the \"Entrepreneurship Factory\" venture of Basket Option to learn & practise entrepreneurship in real time." },
  { year: "2015", event: "Launched India's first board game on the Stock Market under gamifying education company \"Eduturks\", to solve the problem of practical education in the ecosystem." },
  { year: "2016", event: "Launched higher education company \"Addzup Global\", offering industry-required certification courses across specializations, catering to 150+ institutions." },
  { year: "2016–2018", event: "MBA (Weekend) from Jain University, Bangalore." },
  { year: "2017", event: "Launched sales force company \"Gear Up\", connecting & counselling students to competitive exam coaching centres." },
  { year: "2018", event: "Launched \"Entrepreneurship Garage\", a finishing school for startups aiming to build India's largest solution & result-driven enterprise for aspiring and early-stage startups." },
  { year: "2018", event: "Initiated South India's biggest collaborative educational event, \"The Education Growth Summit\"." },
  { year: "2019", event: "Initiated several collaborative events with reputed organisations, forums & government bodies." },
  { year: "2020", event: "Featured in CEO Magazine as a Top 10 Leadership & Entrepreneurship Institute in India." },
  { year: "2021 & 2022", event: "Partnered and enhanced the quality of Krishna Home Studio — a class-apart luxury bathroom products showroom at Rajajinagar, Bengaluru." },
  { year: "2023", event: "Featured in Silicon India Magazine, Brandz Magazine, Success Magazine, Design Reconnect Magazine and 150+ news websites. Awarded at India Design Awards 2023." },
  { year: "2024", event: "Launched a luxury hardware showroom." },
  { year: "2026", event: "Aiming to expand into one more brand-new showroom, and establish a complete home solution showroom in the town." },
];

export default function FounderPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Founder" }]} />
      <PageHero label="Leadership" title="Prakash Choudhary" image="/assets/khs/about/founder/IMG_20240513_135506-e1721041513878.jpg" />

      <section className="py-16 sm:py-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
          <div>
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/assets/khs/about/founder/IMG_20240513_135506-e1721041513878.jpg"
                alt="Prakash Choudhary, Co-founder & CEO"
                fill
                sizes="(max-width: 1024px) 90vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 border border-border p-5">
              <span className="block text-sm font-medium text-primary-dark">Prakash Choudhary</span>
              <span className="block text-xs uppercase tracking-[0.15em] text-gold">Co-founder &amp; CEO</span>
            </div>
          </div>

          <div>
            <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
              CEO &amp; Co-Founder
            </span>
            <h2 className="mb-6 text-3xl font-light leading-tight text-primary-dark sm:text-4xl">
              A Serial Entrepreneur, Building Krishna Home Studio
            </h2>

            <blockquote className="mb-8 border-l-2 border-gold pl-6 text-lg font-light italic leading-relaxed text-primary-dark">
              &ldquo;Practice multiple times before execution — let it be sports, studies, or the business.&rdquo;
            </blockquote>

            <div className="space-y-5 text-[0.95rem] leading-[1.85] text-gray-700">
              {founder.slice(1, 4).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
              id="btn-back-about"
            >
              About Krishna Home Studio
            </Link>
          </div>
        </div>
      </section>

      <JourneyTimeline items={timeline} />

      {founder[37] && (
        <section className="bg-offwhite pb-20 sm:pb-28">
          <div className="container">
            <p className="mx-auto max-w-2xl text-center text-[0.95rem] italic leading-[1.85] text-gray-700">
              {founder[37]}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
