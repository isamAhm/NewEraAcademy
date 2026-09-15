import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-contrast shadow-sm transition-colors duration-150 hover:bg-cta-hover focus-visible:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60";

/**
 * The one consistent CTA color/shape used for every primary action across
 * the site (Schedule A Tour, form submits).
 */
export function CtaLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  );
}

export function CtaButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
