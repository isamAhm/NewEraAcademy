import type { CSSProperties } from "react";

type IconProps = {
  className?: string;
  style?: CSSProperties;
};

/**
 * Small four-point sparkle glyph used for the hero's decorative accents.
 * Plain inline SVG, matching the other icons in this folder.
 */
export function SparkleIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2L13.8 9.2L21 11L13.8 12.8L12 20L10.2 12.8L3 11L10.2 9.2Z" />
    </svg>
  );
}

/**
 * Oversized, soft-edged version of the same four-point star, used as the
 * recurring low-opacity background motif behind key photos.
 */
export function StarBlob({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M100 0C112 58 142 88 200 100C142 112 112 142 100 200C88 142 58 112 0 100C58 88 88 58 100 0Z" />
    </svg>
  );
}
