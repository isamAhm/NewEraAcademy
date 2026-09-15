import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

/**
 * New Era Academy logo featuring three colorful child silhouettes 
 * with sunburst design and green text branding.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-sm"
      aria-label={`${siteConfig.name} — home`}
    >
      <div className="relative h-12 w-12 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-14 sm:w-14">
        <Image
          src="/images/logo.png"
          alt="New Era Academy Logo"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 48px, 56px"
        />
      </div>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-heading font-semibold tracking-tight text-brand-blue ${compact ? "text-lg" : "text-xl sm:text-2xl"
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
