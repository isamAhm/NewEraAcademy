import { BusIcon, ShieldIcon, CurriculumIcon } from "@/components/icons/BadgeIcons";
import type { ComponentType } from "react";

type Badge = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  ring: string;
  iconColor: string;
};

const badges: Badge[] = [
  {
    label: "Transportation Included",
    Icon: BusIcon,
    ring: "bg-brand-teal-light",
    iconColor: "text-brand-teal",
  },
  {
    label: "Safety First Approach",
    Icon: ShieldIcon,
    ring: "bg-brand-purple-light",
    iconColor: "text-brand-purple",
  },
  {
    label: "Specialized Curriculum Options",
    Icon: CurriculumIcon,
    ring: "bg-brand-magenta-light",
    iconColor: "text-brand-magenta",
  },
];

/**
 * Three custom circular trust badges built from the brand palette + simple
 * line icons (no clip-art seals). `tone="onDark"` switches the labels to
 * white for use over the hero photo; the circles keep their brand colors.
 */
export function TrustBadges({
  className = "",
  tone = "onLight",
}: {
  className?: string;
  tone?: "onLight" | "onDark";
}) {
  const labelColor = tone === "onDark" ? "text-white" : "text-ink";
  return (
    <ul
      className={`flex flex-wrap items-start justify-center gap-x-8 gap-y-6 sm:justify-start ${className}`}
    >
      {badges.map(({ label, Icon, ring, iconColor }) => (
        <li key={label} className="flex w-24 flex-col items-center gap-2 text-center sm:w-28">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20 ${ring}`}
          >
            <Icon className={`h-8 w-8 sm:h-9 sm:w-9 ${iconColor}`} />
          </span>
          <span className={`text-xs font-semibold leading-snug sm:text-sm ${labelColor}`}>
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
