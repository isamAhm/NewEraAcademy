"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Eases each page's content in on first load and on every nav change.
 *
 * Keying on the pathname remounts the subtree on a soft navigation, which
 * restarts the CSS animation and also re-arms every Reveal on the new page.
 * The animation itself is pure CSS on server-rendered markup, so it still
 * plays (and still ends visible) if JS never runs.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
