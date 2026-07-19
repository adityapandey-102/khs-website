"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface JourneyMilestone {
  year: string;
  event: string;
}

interface JourneyTimelineProps {
  items: JourneyMilestone[];
  label?: string;
  title?: string;
}

function MilestoneCard({
  item,
  isPast,
  align,
}: {
  item: JourneyMilestone;
  isPast: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={`max-w-sm bg-white p-4 shadow-[0_2px_14px_rgba(19,23,43,0.07)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(19,23,43,0.12)] sm:p-5 ${
        align === "right" ? "border-r-2 pr-5 text-right" : "border-l-2 pl-5 text-left"
      } ${isPast ? "border-blue" : "border-primary-dark/10"}`}
    >
      <span
        className={`block text-xl font-light tracking-wide transition-colors duration-500 sm:text-2xl ${
          isPast ? "text-blue" : "text-gray-400"
        }`}
      >
        {item.year}
      </span>
      <p
        className={`mt-1.5 text-[0.83rem] leading-relaxed transition-colors duration-500 ${
          isPast ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {item.event}
      </p>
    </div>
  );
}

export default function JourneyTimeline({
  items,
  label = "Entrepreneurial Journey",
  title = "The Entrepreneurial Journey",
}: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  // Track which milestone is "current" via a thin trigger band at the
  // vertical center of the viewport, so the progress line fills in as the
  // reader scrolls rather than all at once.
  useEffect(() => {
    const els = markerRefs.current.filter((el): el is HTMLSpanElement => Boolean(el));
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  // Pin the blue progress line's bottom edge to the active marker's real
  // position, remeasured on layout changes (breakpoint, font swap) rather
  // than assumed from index alone — row heights vary with description length.
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const marker = markerRefs.current[activeIndex];
      if (!container || !marker) return;
      const containerRect = container.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();
      setLineHeight(markerRect.top + markerRect.height / 2 - containerRect.top);
    };
    measure();
    window.addEventListener("resize", measure);
    const settle = setTimeout(measure, 350);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(settle);
    };
  }, [activeIndex, items.length]);

  return (
    <section className="bg-offwhite py-14 sm:py-18 lg:py-20">
      <div className="container">
        <div className="mb-12 max-w-xl sm:mb-16">
          <span className="mb-3 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            {label}
          </span>
          <h2 className="text-2xl font-light tracking-[-0.01em] text-primary-dark sm:text-3xl">{title}</h2>
        </div>

        <div ref={containerRef} className="relative mx-auto max-w-4xl">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-primary-dark/10 sm:left-1/2 sm:-translate-x-1/2" aria-hidden="true" />
          <motion.div
            className="absolute left-2 top-2 w-px bg-blue sm:left-1/2 sm:-translate-x-1/2"
            animate={{ height: Math.max(0, lineHeight - 8) }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <div className="flex flex-col">
            {items.map((item, index) => {
              const isPast = index <= activeIndex;
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={`${item.year}-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative py-4 sm:py-6"
                >
                  <span
                    ref={(el) => {
                      markerRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`absolute left-0 top-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 bg-offwhite transition-colors duration-500 sm:left-1/2 sm:-translate-x-1/2 ${
                      isPast ? "border-blue" : "border-primary-dark/15"
                    }`}
                  >
                    {isPast && <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />}
                  </span>

                  {/* Mobile: same card treatment as desktop, single column */}
                  <div className="pl-8 sm:hidden">
                    <MilestoneCard item={item} isPast={isPast} align="left" />
                  </div>

                  {/* Desktop/tablet: alternating left/right of the center line */}
                  <div className="hidden sm:grid sm:grid-cols-[1fr_2rem_1fr] sm:items-start">
                    <div className={isLeft ? "flex justify-end pr-2" : ""}>
                      {isLeft && <MilestoneCard item={item} isPast={isPast} align="right" />}
                    </div>
                    <div aria-hidden="true" />
                    <div className={!isLeft ? "flex justify-start pl-2" : ""}>
                      {!isLeft && <MilestoneCard item={item} isPast={isPast} align="left" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
