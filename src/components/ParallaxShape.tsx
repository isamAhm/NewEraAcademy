"use client";

import { useEffect, useRef } from "react";
import { StarBlob } from "@/components/icons/SparkleIcon";

type ParallaxShapeProps = {
  /** Positioning + size utilities for the shape's wrapper. */
  className?: string;
  /** Accent color utility, e.g. "text-brand-teal/15". */
  colorClass: string;
  /** Total vertical drift across a full pass through the viewport, in px. */
  distance?: number;
};

/**
 * The recurring background star motif, drifting vertically against the
 * scroll (rAF-throttled passive scroll listener, no animation library).
 *
 * Kept cheap: the scroll handler only measures while the shape is actually
 * near the viewport, does one rect read per frame, and writes nothing but a
 * compositor-friendly transform. Under prefers-reduced-motion no listener is
 * attached at all and the shape simply sits still.
 */
export function ParallaxShape({
  className = "",
  colorClass,
  distance = 70,
}: ParallaxShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let nearViewport = false;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / span, 0), 1);
      node.style.transform = `translate3d(0, ${((0.5 - progress) * distance).toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (nearViewport && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        nearViewport = entries.some((entry) => entry.isIntersecting);
        if (nearViewport) onScroll();
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
    >
      <StarBlob className={`h-full w-full ${colorClass}`} />
    </div>
  );
}
