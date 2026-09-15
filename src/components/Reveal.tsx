"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  from?: "left" | "right";
  className?: string;
  children: ReactNode;
};

/**
 * Slides a content block into place whenever it scrolls into view
 * (IntersectionObserver, no animation library). See the .reveal rules in
 * globals.css.
 *
 * Replays every time: the block re-arms once it is fully out of frame, so
 * scrolling back to it animates it again. Hysteresis (shown at 15% visible,
 * re-hidden only at 0%) keeps a block from fading out while still readable.
 *
 * The hidden state is applied by this component *after* it mounts, never in
 * the server markup, so if the bundle fails to load the content simply stays
 * visible. Blocks already on screen at mount are shown without animating —
 * the page-level transition covers the entrance there.
 */
export function Reveal({ from = "left", className = "", children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"initial" | "armed" | "shown">("initial");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setState(
      node.getBoundingClientRect().top < window.innerHeight * 0.9 ? "shown" : "armed"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry.intersectionRatio >= 0.15) {
          setState("shown");
        } else if (entry.intersectionRatio === 0) {
          setState("armed");
        }
      },
      { threshold: [0, 0.15] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const motionClasses =
    state === "initial"
      ? ""
      : `reveal reveal-${from}${state === "shown" ? " is-visible" : ""}`;

  return (
    <div ref={ref} className={`${motionClasses} ${className}`.trim()}>
      {children}
    </div>
  );
}
