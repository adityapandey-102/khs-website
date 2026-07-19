"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { bathwareCategories } from "@/data/categories";

const AUTO_ADVANCE_MS = 4800;

interface CategoryGridProps {
  title?: string;
  label?: string;
  description?: string;
  showAll?: boolean;
  showHeading?: boolean;
  sectionClassName?: string;
}

export default function CategoryGrid({
  title = "Our Collections",
  label = "Bathware",
  description,
  showAll = false,
  showHeading = true,
  sectionClassName = "py-20 sm:py-28",
}: CategoryGridProps) {
  const displayCategories = showAll ? bathwareCategories : bathwareCategories.slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dragRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startScroll: 0,
    dragging: false,
    moved: false,
    pendingLeft: null as number | null,
  });
  const rafRef = useRef<number | null>(null);
  const dragRafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const isHoveringRef = useRef(false);
  const lastInteractionRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const markInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  // The "active" catalogue is whichever card's center is closest to the
  // rail's center — recomputed on scroll (native touch swipe, drag, or the
  // dot/arrow controls all funnel through this) so the emphasis always
  // matches what's actually centered in view. At the very ends of the rail,
  // the edge padding isn't always exactly enough for the first/last card to
  // reach true geometric center — which silently made the last card
  // unreachable as "active" (nothing could ever be closer), so the auto-loop
  // could never detect it had reached the end and would never wrap. Scroll
  // position at the hard boundary is unambiguous, so it wins outright there.
  const updateActiveFromScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    if (maxScrollLeft > 0 && rail.scrollLeft >= maxScrollLeft - 1) {
      setActiveIndex(cardRefs.current.length - 1);
      return;
    }
    if (rail.scrollLeft <= 1) {
      setActiveIndex(0);
      return;
    }

    const railRect = rail.getBoundingClientRect();
    const center = railRect.left + railRect.width / 2;
    let closest = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(cardRect.left + cardRect.width / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });
    setActiveIndex(closest);
  }, []);

  const handleRailScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateActiveFromScroll();
    });
  }, [updateActiveFromScroll]);

  useEffect(() => {
    updateActiveFromScroll();
  }, [displayCategories.length, updateActiveFromScroll]);

  const scrollToIndex = useCallback((index: number) => {
    const rail = railRef.current;
    const card = cardRefs.current[index];
    if (!rail || !card) return;
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = cardRect.left + cardRect.width / 2 - (railRect.left + railRect.width / 2);
    rail.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  // Auto-loop: quietly advances one card at a time and wraps back to the
  // start, like a premium product carousel. It backs off the moment the
  // user touches the rail (drag, tap, or a dot/arrow click) and only
  // resumes after a quiet period, so it never fights an in-progress
  // interaction or yanks a card away mid-read. Respects reduced-motion.
  useEffect(() => {
    if (displayCategories.length < 2) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (isHoveringRef.current) return;
      if (Date.now() - lastInteractionRef.current < AUTO_ADVANCE_MS) return;
      scrollToIndex((activeIndexRef.current + 1) % displayCategories.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [displayCategories.length, scrollToIndex]);

  // Desktop drag-to-scroll — touch keeps its native, momentum-friendly
  // overflow-x scroll rather than being fought over by pointer handlers.
  // Pointer capture is only claimed once real drag movement is detected
  // (not on every mousedown): capturing immediately would redirect the
  // resulting click away from the card's <Link> on a plain click, which is
  // exactly what broke navigation — a click that never dragged must reach
  // the link untouched.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    markInteraction();
    if (e.pointerType === "touch") return;
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: rail.scrollLeft,
      dragging: false,
      moved: false,
      pendingLeft: null,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const state = dragRef.current;
    if (!rail || state.pointerId !== e.pointerId) return;
    const delta = e.clientX - state.startX;
    if (!state.dragging && Math.abs(delta) > 4) {
      state.dragging = true;
      state.moved = true;
      rail.setPointerCapture(e.pointerId);
      // Scroll-snap fights a direct scrollLeft drag — the browser tries to
      // settle to the nearest snap point mid-gesture, which is what made
      // hand-dragging feel stuttery. Suspend it only while actively
      // dragging; releasing restores the CSS-defined snap behavior.
      rail.style.scrollSnapType = "none";
    }
    if (state.dragging) {
      state.pendingLeft = state.startScroll - delta;
      if (dragRafRef.current === null) {
        dragRafRef.current = requestAnimationFrame(() => {
          dragRafRef.current = null;
          const currentRail = railRef.current;
          if (currentRail && dragRef.current.pendingLeft !== null) {
            currentRail.scrollLeft = dragRef.current.pendingLeft;
          }
        });
      }
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const state = dragRef.current;
    if (state.pointerId === e.pointerId) {
      if (state.dragging && rail) {
        rail.releasePointerCapture(e.pointerId);
        rail.style.scrollSnapType = "";
      }
      state.pointerId = null;
      state.dragging = false;
    }
  };

  const onCardClick = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      dragRef.current.moved = false;
    }
  };

  const viewAllCta = !showAll && (
    <Link
      href="/bathware"
      className="group inline-flex items-center gap-4 border border-primary-dark px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-primary-dark transition-all duration-300 hover:bg-primary-dark hover:text-white"
    >
      View All Categories
      <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );

  return (
    <section className={`overflow-hidden bg-white text-primary-dark ${sectionClassName}`} id="categories">
      <div
        className={`container grid gap-10 ${
          showHeading ? "lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-center lg:gap-16" : ""
        }`}
      >
        {showHeading && (
          <div>
            <span className="mb-4 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {label}
            </span>
            <h2 className="text-3xl font-light tracking-[-0.01em] sm:text-4xl">{title}</h2>
            {description && <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-700">{description}</p>}
            {viewAllCta && <div className="mt-9">{viewAllCta}</div>}
          </div>
        )}

        <div className="relative min-w-0">
          <div
            ref={railRef}
            onScroll={handleRailScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onTouchStart={markInteraction}
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
            aria-label="Bathware catalogue carousel"
            className="scrollbar-hide -mx-[clamp(1.25rem,5vw,5rem)] flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1.25rem,5vw,5rem)] py-6 select-none active:cursor-grabbing lg:mx-0 lg:px-0"
          >
            {displayCategories.map((cat, index) => (
              <Link
                key={cat.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                href={cat.href}
                draggable={false}
                onClick={onCardClick}
                aria-label={`Explore ${cat.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`group relative aspect-210/297 w-[72vw] shrink-0 snap-center overflow-hidden --bg-primary-dark --shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] sm:w-76 lg:w-84 ${
                  index === activeIndex ? "scale-105 shadow-[0_30px_70px_rgba(0,0,0,0.5)]" : "scale-100"
                }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 1024px) 72vw, 336px"
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/15 to-transparent transition-opacity duration-300 group-hover:from-primary-dark/98" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-3 block h-px w-8 bg-gold/60" aria-hidden="true" />
                  <h3 className="text-base font-light leading-snug text-white sm:text-lg">{cat.shortLabel}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-white/60 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue group-hover:opacity-100">
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-10 flex items-center justify-center gap-6 sm:mt-12">
        <button
          type="button"
          onClick={() => {
            markInteraction();
            scrollToIndex((activeIndex - 1 + displayCategories.length) % displayCategories.length);
          }}
          aria-label="Previous catalogue"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-primary-dark shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue hover:text-blue hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:flex"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2">
          {displayCategories.map((cat, index) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                markInteraction();
                scrollToIndex(index);
              }}
              aria-label={`Go to ${cat.shortLabel}`}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-primary-dark/15" : "w-1.5 bg-primary-dark/15 hover:bg-primary-dark/30"
              }`}
            >
              {index === activeIndex && (
                <motion.span
                  key={activeIndex}
                  className="absolute inset-y-0 left-0 rounded-full bg-blue"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            markInteraction();
            scrollToIndex((activeIndex + 1) % displayCategories.length);
          }}
          aria-label="Next catalogue"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-primary-dark shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue hover:text-blue hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:flex"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      {!showHeading && viewAllCta && <div className="container mt-10 text-center">{viewAllCta}</div>}
    </section>
  );
}
