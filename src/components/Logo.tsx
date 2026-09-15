import Link from "next/link";
import { ThreeFriendsMark } from "@/components/icons/SunburstMotif";
import { siteConfig } from "@/lib/site";

/**
 * Text-based logotype placeholder. NEA's real logo (three child silhouettes
 * + sunburst) only exists today as a watermarked stock mockup — see
 * PLACEHOLDERS.md. This stands in until final logo artwork is supplied.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-sm"
      aria-label={`${siteConfig.name} — home`}
    >
      <ThreeFriendsMark className="h-8 w-[3.25rem] shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-tight">
        <span
          className={`font-heading font-semibold tracking-tight text-brand-green ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          New Era Academy
        </span>
        {!compact && (
          <span className="text-xs font-medium text-ink-soft sm:text-sm">
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
