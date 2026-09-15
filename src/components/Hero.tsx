import Image from "next/image";
import { CtaLink } from "@/components/CtaButton";
import { TrustBadges } from "@/components/TrustBadges";
import { HeroSparkles } from "@/components/HeroSparkles";
import { WavyBottom } from "@/components/WavyBottom";

type HeroProps = {
  as?: "h1" | "h2";
  title?: string;
  intro?: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

/**
 * Full-bleed photo banner with everything overlaid on a dark scrim: an
 * optional lead headline + intro (the Home page's opening copy), the
 * "A Specially Curated Educational Journey" sub-headline, the Schedule A
 * Tour CTA, and the trust badges near the bottom.
 *
 * The section breaks out of its parent's max-width with a 100vw margin
 * trick; `body { overflow-x: clip }` in globals.css absorbs the scrollbar
 * overhang that creates (clip, not hidden, so the sticky header still works).
 */
export function Hero({
  as = "h2",
  title,
  intro,
  imageSrc,
  imageAlt,
  className = "",
}: HeroProps) {
  const SubHeading = title ? "h2" : as;
  return (
    <section
      className={`relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-[50%_45%]"
        priority
      />

      {/* Scrim: darker on the left so the white copy stays readable, plus a
          bottom fade to keep the badge row legible over busy photos. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
      />

      {/* Wavy bottom design */}
      <WavyBottom
        color="#ffffff"
        className="z-20"
      />

      <HeroSparkles />

      <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[460px] sm:px-6 lg:min-h-[500px]">
        <div className="max-w-2xl">
          {title && (
            <h1 className="font-heading text-3xl font-semibold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          )}
          {intro && (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {intro}
            </p>
          )}

          {/* <SubHeading
            className={`font-heading font-semibold leading-tight text-white drop-shadow-sm ${
              title
                ? "mt-8 text-2xl sm:text-3xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            A Specially Curated Educational Journey
          </SubHeading>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Come see our classrooms, meet our teachers, and feel the warmth
            of the New Era Academy community for yourself.
          </p>
          <div className="mt-8">
            <CtaLink href="/schedule-tour">Schedule A Tour</CtaLink>
          </div> */}
        </div>

        <TrustBadges tone="onDark" className="mt-14" />
      </div>
    </section>
  );
}
