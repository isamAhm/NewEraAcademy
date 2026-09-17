import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ParallaxShape } from "@/components/ParallaxShape";

export const metadata: Metadata = {
  title: "Home",
  description:
    "New Era Academy is dedicated to nurturing young minds and fostering lifelong learning in Columbus, Ohio — serving children ages 6 weeks to 13 years.",
};

const missionPoints = [
  {
    label: "Safety and Comfort",
    description: "Ensuring children are secure, supervised, and feel at home.",
    accent: "bg-brand-teal",
  },
  {
    label: "Nurturing Environment",
    description: "Offering love, patience, and positive reinforcement.",
    accent: "bg-brand-magenta",
  },
  {
    label: "Early Learning",
    description:
      "Encouraging curiosity and early developmental milestones through play.",
    accent: "bg-brand-purple",
  },
  {
    label: "Family Partnership",
    description:
      "Supporting working parents and building a strong community connection.",
    accent: "bg-brand-green",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-10 sm:px-6 sm:pb-14">
      {/* Hero banner: lead headline, intro, sub-headline, CTA and trust badges
          all overlaid on one full-bleed photo, starting directly below the nav.
          PLACEHOLDER PHOTO (Unsplash, free license) — must be swapped for a real
          New Era Academy campus photo before launch. */}
      <Hero
        title="Early Child Education for Continuous Success"
        intro="New Era Academy is dedicated to nurturing young minds and fostering lifelong learning. At our academy, we believe that every child has the potential to shine, and we strive to create a secure, stimulating environment that encourages exploration and growth."
        imageSrc="/images/placeholders/hero-home-banner-children-playing.jpeg"
        imageAlt="Placeholder photo — young children playing with toys on the floor of a bright early-learning room while caregivers sit with them. Replace with a real New Era Academy campus photo before launch."
      />

      {/* Mission statement */}
      <section aria-labelledby="mission-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <Reveal from="left">
            <h2
              id="mission-heading"
              className="font-heading text-2xl font-semibold text-brand-green sm:text-3xl"
            >
              Our Mission Statement
            </h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {missionPoints.map((point) => (
                <div
                  key={point.label}
                  className="relative rounded-2xl bg-white/70 p-5 pl-6 shadow-sm ring-1 ring-black/5"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-5 h-[calc(100%-2.5rem)] w-1.5 rounded-full ${point.accent}`}
                  />
                  <dt className="font-heading text-base font-semibold text-ink">
                    {point.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {point.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal from="right" className="relative mx-auto w-full max-w-sm lg:mx-0">
            <ParallaxShape
              className="-left-24 -top-16 h-[24rem] w-[24rem] sm:-left-28 sm:h-[28rem] sm:w-[28rem]"
              colorClass="text-brand-teal/15"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[55%_45%_45%_55%/45%_55%_45%_55%] bg-brand-teal-light sm:-inset-6"
            />
            <div className="relative aspect-square overflow-hidden rounded-[55%_45%_45%_55%/45%_55%_45%_55%] shadow-lg">
              <Image
                src="/images/placeholders/home-mission-toddler-camera.jpeg"
                alt="Placeholder photo — a toddler playing with a toy camera in a bright, colorful playroom. Replace with a real New Era Academy classroom photo."
                fill
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
