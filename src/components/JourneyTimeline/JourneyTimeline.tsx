"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export interface JourneyMilestone {
  year: string;
  event: string;
}

interface JourneyTimelineProps {
  items: JourneyMilestone[];
  label?: string;
  title?: string;
}

type NodeState = "completed" | "current" | "upcoming";

interface Point {
  x: number;
  y: number;
}

// Builds a gently winding road through the *actual measured* node centers.
// Every node sits in the same centered grid column, so points share an
// x-coordinate — the road still winds by bowing out to x ± amplitude at the
// midpoint of each segment, then returning exactly to center at every node,
// so it always passes through the true waypoint position regardless of how
// tall any given card's text makes that row, on any screen size.
function buildRoadPath(points: Point[], amplitude: number) {
  if (points.length < 2) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midY = (p0.y + p1.y) / 2;
    const lean = i % 2 === 0 ? p0.x - amplitude : p0.x + amplitude;
    d += ` C${p0.x},${p0.y + (midY - p0.y) * 0.55} ${lean},${midY - (midY - p0.y) * 0.45} ${lean},${midY}`;
    d += ` C${lean},${midY + (p1.y - midY) * 0.45} ${p1.x},${p1.y - (p1.y - midY) * 0.55} ${p1.x},${p1.y}`;
  }
  return d;
}

function MilestoneCard({
  item,
  isLeft,
  isLast,
  state,
}: {
  item: JourneyMilestone;
  isLeft: boolean;
  isLast: boolean;
  state: NodeState;
}) {
  const cut = isLeft
    ? "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)"
    : "polygon(22px 0, 100% 0, 100% 100%, 0 100%, 0 22px)";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -28 : 28, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full max-w-[19rem] sm:max-w-xs"
    >
      <div
        className={`absolute inset-0 bg-linear-to-br transition-colors duration-500 ${
          state === "upcoming" ? "from-border to-border" : isLast ? "from-gold to-gold" : "from-gold to-gold/30"
        }`}
        style={{ clipPath: cut }}
        aria-hidden="true"
      />
      <div
        className={`relative m-[1.5px] bg-white p-5 shadow-[0_2px_18px_rgba(19,23,43,0.06)] transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_rgba(19,23,43,0.14)] sm:p-6 ${
          isLast ? "shadow-[0_6px_32px_rgba(50,86,198,0.14)]" : ""
        } ${isLeft ? "text-right" : "text-left"}`}
        style={{ clipPath: cut }}
      >
        {isLast && (
          <span
            className={`mb-2.5 inline-flex items-center gap-1.5 border border-gold/40 bg-gold/5 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold ${
              isLeft ? "ml-auto" : ""
            }`}
          >
            Future Vision
          </span>
        )}
        <span className={`text-2xl font-light transition-colors duration-500 sm:text-[1.75rem] ${state === "upcoming" ? "text-gray-400" : "text-gold"} ${isLast ? "sm:text-3xl" : ""}`}>
          {item.year}
        </span>
        <div className={`mt-1.5 h-px w-7 transition-colors duration-500 ${state === "upcoming" ? "bg-border" : "bg-gold/40"} ${isLeft ? "ml-auto" : ""}`} aria-hidden="true" />
        <p className={`mt-2.5 text-[0.83rem] leading-relaxed transition-colors duration-500 ${state === "upcoming" ? "text-gray-400" : "text-gray-700"}`}>
          {item.event}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-8 h-px w-4 bg-linear-to-r sm:w-6 ${
          state === "upcoming" ? "from-border to-border/0" : "from-gold/70 to-gold/0"
        } ${isLeft ? "right-0 translate-x-full" : "left-0 -translate-x-full rotate-180"}`}
      />
    </motion.div>
  );
}

function RoadNode({
  index,
  state,
  setRef,
}: {
  index: number;
  state: NodeState;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const isCurrent = state === "current";
  const isCompleted = state === "completed";

  return (
    <motion.div
      ref={setRef}
      data-index={index}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, delay: 0.05, ease: "backOut" }}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center"
    >
      {isCurrent && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-gold"
          animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.span
        animate={isCurrent ? { scale: [1, 1.07, 1] } : { scale: 1 }}
        transition={isCurrent ? { duration: 1.7, repeat: Infinity, ease: "easeInOut" } : { duration: 0.35 }}
        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-500 sm:h-9 sm:w-9 ${
          isCompleted
            ? "border-gold bg-gold text-white shadow-[0_2px_10px_rgba(50,86,198,0.25)]"
            : isCurrent
              ? "border-gold bg-white text-gold shadow-[0_0_0_5px_rgba(50,86,198,0.1),0_4px_14px_rgba(50,86,198,0.25)]"
              : "border-border bg-white text-gray-400"
        }`}
      >
        <MapPin size={14} strokeWidth={2.25} fill={isCompleted ? "currentColor" : "none"} />
      </motion.span>
    </motion.div>
  );
}

export default function JourneyTimeline({
  items,
  label = "Entrepreneurial Journey",
  title = "The Entrepreneurial Journey",
}: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<(HTMLDivElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const nextPoints = nodeEls.current.map((el): Point => {
      if (!el) return { x: containerRect.width / 2, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
      };
    });
    setPoints(nextPoints);
    setSize({ width: containerRect.width, height: containerRect.height });
  }, []);

  // Measure real DOM positions after layout (and keep them in sync across
  // breakpoints/content reflow) instead of assuming a normalized coordinate
  // space — this is what guarantees the road always intersects every
  // waypoint's true center, on any screen size. ResizeObserver is used
  // instead of a scroll/resize polling loop, keeping this cheap.
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    const settle = setTimeout(measure, 350); // catches web-font swap reflow
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(settle);
    };
  }, [measure, items.length]);

  // Track which milestone is "current" via a thin trigger band at the
  // vertical center of the viewport — a native IntersectionObserver instead
  // of a scroll listener, so this runs off the main thread's scroll handler.
  useLayoutEffect(() => {
    const els = nodeEls.current.filter((el): el is HTMLDivElement => Boolean(el));
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
  }, [points.length]);

  const amplitude = Math.min(28, Math.max(14, size.width * 0.035));
  const roadD = buildRoadPath(points, amplitude);
  const first = points[0];
  const last = points[points.length - 1];
  const activePoint = points[activeIndex];
  const totalSpan = first && last ? last.y - first.y : 0;
  const progress =
    first && activePoint && totalSpan > 0 ? Math.min(1, Math.max(0, (activePoint.y - first.y) / totalSpan)) : 0;

  return (
    <section className="relative overflow-hidden bg-offwhite py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-dark) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center sm:mb-20"
        >
          <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-gold">
            {label}
          </span>
          <h2 className="text-3xl font-light text-primary-dark sm:text-4xl">{title}</h2>
          <div className="mx-auto mt-5 h-px w-14 bg-gold/50" />
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          {points.length > 1 && (
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${size.width} ${size.height}`}
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={roadD}
                stroke="var(--color-primary-dark)"
                strokeOpacity={0.07}
                strokeWidth={18}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={roadD}
                stroke="var(--color-border)"
                strokeWidth={10}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={roadD}
                stroke="var(--color-gold)"
                strokeWidth={4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: progress }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          )}

          {/* soft light travelling with the current milestone */}
          {activePoint && (
            <motion.div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/45 blur-lg"
              style={{ width: 30, height: 30 }}
              initial={false}
              animate={{ left: activePoint.x, top: activePoint.y }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          <div className="relative flex flex-col">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isLast = index === items.length - 1;
              const state: NodeState = index < activeIndex ? "completed" : index === activeIndex ? "current" : "upcoming";
              return (
                <div
                  key={`${item.year}-${index}`}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-6 sm:gap-5 sm:py-8 md:gap-8 md:py-10"
                >
                  <div className="flex justify-end">{isLeft && <MilestoneCard item={item} isLeft isLast={isLast} state={state} />}</div>
                  <RoadNode
                    index={index}
                    state={state}
                    setRef={(el) => {
                      nodeEls.current[index] = el;
                    }}
                  />
                  <div className="flex justify-start">{!isLeft && <MilestoneCard item={item} isLeft={false} isLast={isLast} state={state} />}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
