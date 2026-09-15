/**
 * Simplified sunburst — a nod to the sunburst behind NEA's logo mockup.
 * Purely decorative, reused subtly as a background accent (hero, section
 * dividers, footer) rather than a literal copy of the stock artwork.
 */
export function SunburstMotif({ className }: { className?: string }) {
  const rays = Array.from({ length: 16 });
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        {rays.map((_, i) => {
          const angle = (i / rays.length) * Math.PI * 2;
          const inner = 62;
          const outer = i % 2 === 0 ? 96 : 84;
          const x1 = 100 + Math.cos(angle) * inner;
          const y1 = 100 + Math.sin(angle) * inner;
          const x2 = 100 + Math.cos(angle) * outer;
          const y2 = 100 + Math.sin(angle) * outer;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <circle cx="100" cy="100" r="52" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

/**
 * A simplified, abstracted version of the three child silhouettes from
 * NEA's logo mockup (teal, magenta, warm purple) — used small as a brand
 * mark next to the logotype and in the footer. Deliberately geometric
 * (not a literal figure illustration) so it reads as a mark, not clip art.
 */
export function ThreeFriendsMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <circle cx="16" cy="14" r="7" className="fill-brand-teal" />
        <path
          d="M4 40C4 29 9.4 24 16 24C22.6 24 28 29 28 40"
          className="fill-brand-teal"
        />
      </g>
      <g>
        <circle cx="32" cy="10" r="8.5" className="fill-brand-purple" />
        <path
          d="M17.5 40C17.5 26.7 23.9 20.5 32 20.5C40.1 20.5 46.5 26.7 46.5 40"
          className="fill-brand-purple"
        />
      </g>
      <g>
        <circle cx="48" cy="14" r="7" className="fill-brand-magenta" />
        <path
          d="M36 40C36 29 41.4 24 48 24C54.6 24 60 29 60 40"
          className="fill-brand-magenta"
        />
      </g>
    </svg>
  );
}
