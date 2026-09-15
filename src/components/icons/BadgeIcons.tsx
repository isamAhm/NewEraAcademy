/**
 * Small, simple line icons for the trust badges. Kept as plain inline SVG
 * (no icon library) — a handful of paths is all we need, and it avoids an
 * extra dependency for three icons.
 */

type IconProps = {
  className?: string;
};

export function BusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="6"
        y="12"
        width="36"
        height="20"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M6 22H42" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 12V22" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 12V22" stroke="currentColor" strokeWidth="2.5" />
      <path d="M34 12V22" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="15" cy="34" r="3.2" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="33" cy="34" r="3.2" stroke="currentColor" strokeWidth="2.5" />
      <path d="M9 32H12.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M35.6 32H39" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 6L38 11.5V22C38 31.5 32.2 38.4 24 42C15.8 38.4 10 31.5 10 22V11.5L24 6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 23L22 28L31 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CurriculumIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 15 C 20 11, 12 10, 7 11 L 7 33 C 12 32, 20 33, 24 37"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 15 C 28 11, 36 10, 41 11 L 41 33 C 36 32, 28 33, 24 37"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 15V37" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
