"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { pageCopy } from "@/data/pageCopy";

const intro = pageCopy.about?.paragraphs.slice(1, 3) ?? [];

export default function AboutSection() {
  return (
    <section className="pt-10 pb-20 sm:pt-14 sm:pb-28" aria-label="Our Story">
      <div className="container grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-4/5 w-full"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/khs/bathware/countertop-basin/IMG-20230520-WA0072.jpg"
              alt="Krishna Home Studio showroom"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 h-2/5 w-2/5 overflow-hidden border-4 border-white shadow-xl sm:-bottom-8 sm:-right-8 sm:h-1/2 sm:w-1/2">
            <Image
              src="/assets/khs/bathware/standalone-basin/IMG-20230520-WA0005.jpg"
              alt="Krishna Home Studio product detail"
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Our Heritage
          </span>
          <h2 className="text-3xl font-light leading-tight text-white sm:text-4xl">
            Sanctuaries Crafted for the Senses
          </h2>
          <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.8] text-gray-700">
            {intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-3 border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white"
          >
            Discover Our Story
          </Link>

          <div className="mt-10 border-t border-border pt-6">
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Featured in the press
            </span>
            <p className="mt-2 text-sm text-gray-700">
              Award-winning recognition, client trust, and a deeply curated retail experience across luxury interiors.
            </p>
            <Link href="/media" className="mt-2 inline-block text-sm font-medium text-gold hover:underline">
              View Media &amp; Recognition
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
