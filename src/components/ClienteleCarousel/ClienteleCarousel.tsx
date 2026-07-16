"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/migratedContent";

export default function ClienteleCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section className="bg-primary-dark py-20 text-white sm:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            Social Proof
          </span>
          <h2 className="text-3xl font-light sm:text-4xl">Trusted by Visionaries</h2>
        </div>

        <div className="relative mx-auto flex max-w-2xl items-center gap-4 sm:gap-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden shrink-0 rounded-full border border-white/20 p-2.5 transition-colors hover:border-gold hover:text-gold sm:block"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <div className="min-h-55 flex-1 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <Quote size={36} className="mx-auto mb-5 text-gold/50" />
                <p className="text-lg font-light leading-relaxed text-white/90 sm:text-xl">&ldquo;{testimonial.text}&rdquo;</p>
                <span className="mt-6 block text-sm font-medium uppercase tracking-widest text-gold">
                  {testimonial.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden shrink-0 rounded-full border border-white/20 p-2.5 transition-colors hover:border-gold hover:text-gold sm:block"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-2.5">
          {testimonials.map((t, index) => (
            <button
              key={t.name}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-gold" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
