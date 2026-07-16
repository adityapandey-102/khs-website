import { Trophy, Newspaper, Gem, ShieldCheck, Settings, Headphones } from "lucide-react";
import { awards } from "@/data/awards";

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={26} strokeWidth={1.5} />,
  Newspaper: <Newspaper size={26} strokeWidth={1.5} />,
  Gem: <Gem size={26} strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck size={26} strokeWidth={1.5} />,
  Settings: <Settings size={26} strokeWidth={1.5} />,
  HeadphonesIcon: <Headphones size={26} strokeWidth={1.5} />,
};

export default function AwardsSection() {
  return (
    <section className="bg-offwhite py-20 sm:py-28" id="awards">
      <div className="container">
        <div className="mb-14 text-center">
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-light text-white sm:text-4xl">Excellence, By Every Measure</h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award) => (
            <div key={award.id} className="group bg-surface p-8 transition-colors hover:bg-primary-dark sm:p-10" id={`award-${award.id}`}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-gold text-gold transition-colors group-hover:border-white group-hover:text-white" aria-hidden="true">
                {iconMap[award.icon]}
              </div>
              <h3 className="mb-2 text-base font-medium text-white transition-colors group-hover:text-white">
                {award.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 transition-colors group-hover:text-white/70">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
