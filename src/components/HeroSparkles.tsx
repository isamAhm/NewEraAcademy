"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SparkleIcon } from "@/components/icons/SparkleIcon";

const SPARKLES = [
  {
    position: "left-[6%] top-[10%] sm:left-[8%]",
    size: "h-6 w-6 sm:h-8 sm:w-8",
    color: "text-brand-teal",
    delay: "0s",
  },
  {
    position: "left-[48%] top-[6%] sm:left-[44%]",
    size: "h-5 w-5 sm:h-6 sm:w-6",
    color: "text-brand-magenta",
    delay: "0.9s",
  },
  {
    position: "left-[3%] bottom-[8%] sm:left-[5%]",
    size: "h-5 w-5 sm:h-7 sm:w-7",
    color: "text-brand-purple",
    delay: "1.7s",
  },
];

/**
 * Purely decorative star/sparkle accents for the hero banner: near the
 * headline and around the trust badges. Fade in and start a gentle
 * twinkle loop once the hero scrolls into view (IntersectionObserver, no
 * animation library), and sit static when the browser is told to reduce
 * motion — see the .hero-sparkle rules in globals.css.
 */
export function HeroSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {SPARKLES.map((sparkle, index) => (
        <SparkleIcon
          key={index}
          className={`hero-sparkle absolute drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] ${sparkle.position} ${sparkle.size} ${sparkle.color} ${isVisible ? "is-visible" : ""
            }`}
          style={{ "--sparkle-delay": sparkle.delay } as CSSProperties}
        />
      ))}
    </div>
  );
}
