"use client";

import { motion } from "framer-motion";
import { Trophy, Newspaper, Gem, ShieldCheck, Settings, Headphones } from "lucide-react";
import { awards } from "@/data/awards";

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={22} strokeWidth={1.25} />,
  Newspaper: <Newspaper size={22} strokeWidth={1.25} />,
  Gem: <Gem size={22} strokeWidth={1.25} />,
  ShieldCheck: <ShieldCheck size={22} strokeWidth={1.25} />,
  Settings: <Settings size={22} strokeWidth={1.25} />,
  HeadphonesIcon: <Headphones size={22} strokeWidth={1.25} />,
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function AwardsSection() {
  return (
    <section className="relative overflow-hidden bg-offwhite py-12 sm:py-14 lg:py-16" id="awards">
      {/* Depth, not decoration — a barely-visible glow rather than a
          coloured accent, so the light section stays free of the gold
          that's reserved for genuinely dark backgrounds elsewhere. */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-100 w-100 rounded-full bg-primary-dark/5 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 sm:mb-10"
        >
          <span className="flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.34em] text-primary-dark/50">
            <span className="h-px w-8 bg-primary-dark/25" aria-hidden="true" />
            Why Choose Us
          </span>
          <h2 className="text-2xl font-light tracking-[-0.01em] text-primary-dark sm:text-3xl">
            Craftsmanship, Trust &amp; <span className="text-gray-400">Excellence.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 border-b border-primary-dark/10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: easeOut, delay: (index % 3) * 0.06 }}
              className="group relative border-t border-primary-dark/10 py-6"
              id={`award-${award.id}`}
            >
              {/* base rule is always visible; this one draws in on hover */}
              <span
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary-dark/45 transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="mb-3 flex items-center gap-3">
                <span
                  className="text-primary-dark transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  {iconMap[award.icon]}
                </span>
                <span className="text-[0.68rem] font-medium tracking-[0.2em] text-primary-dark/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mb-2 text-[1.05rem] font-normal text-primary-dark transition-[letter-spacing] duration-500 group-hover:tracking-[0.01em]">
                {award.title}
              </h3>
              <p className="max-w-xs text-[0.83rem] leading-relaxed text-gray-500">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
