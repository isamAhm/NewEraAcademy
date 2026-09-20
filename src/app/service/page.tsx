import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ParallaxShape } from "@/components/ParallaxShape";

export const metadata: Metadata = {
  title: "Service",
  description:
    "New Era Academy provides a warm, nurturing environment for children ages 6 weeks to 12 years across the Columbus, Ohio area.",
};

export default function ServicePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-10 sm:px-6 sm:pb-14">
      <Hero className="text-justify"
        title="Serving The Columbus Area"
        intro="At New Era Academy, care is at the heart of everything we do. We provide a warm, nurturing environment for children ages 6 weeks to 12 years, a place where every child feels seen, valued, and celebrated. Our focus is on building a loving, inclusive community that embraces diversity and honors each child's unique background, personality, and potential."
        imageSrc="/images/hero-service-caregiver-child-coloring.JPG"
        imageAlt="Placeholder photo — a caregiver and a toddler colouring together at a small table. Replace with a real New Era Academy campus photo before launch."
      />

      <section>
        <Reveal
          from="left"
          className="flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          <p className="text-justify">
            {
              "We believe meaningful growth begins with connection. That's why we prioritize individualized attention, emotional support, and intentional guidance to help children build confidence, character, and a strong sense of belonging. In our welcoming spaces, children are encouraged to explore, express themselves freely, and grow at their own pace."
            }
          </p>
          <p className="text-justify">
            Partnership with families is essential to us. We maintain open,
            consistent communication with parents to ensure every
            child&rsquo;s needs are understood and supported. Together, we
            create a circle of care that empowers children to thrive
            academically, socially, and emotionally.
          </p>
          <p className="font-heading text-lg font-semibold text-brand-green sm:text-xl text-justify">
            New Era Academy — where children are nurtured, families are
            valued, and growth is inspired every day.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="curriculum-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal from="left">
            <h2
              id="curriculum-heading"
              className="font-heading text-2xl font-semibold text-brand-green sm:text-3xl"
            >
              Education Curriculum 📚
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg text-justify">
              Our curriculum is thoughtfully designed to engage students in a
              variety of subjects, promoting critical thinking and
              creativity. We incorporate hands-on activities and innovative
              teaching methods that allow children to discover their
              interests and strengths. This holistic approach not only
              enhances academic performance but also builds confidence and a
              love for learning that extends beyond the classroom.
            </p>
          </Reveal>
          <Reveal from="right" className="relative">
            <ParallaxShape
              className="-right-20 -top-20 h-[22rem] w-[22rem] sm:-right-24 sm:h-[26rem] sm:w-[26rem]"
              colorClass="text-brand-magenta/15"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/service-curriculum-blocks.JPG"
                alt="Placeholder photo — a child's hands stacking colorful building blocks. Replace with a real New Era Academy classroom activity photo."
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="empowering-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal from="left" className="relative order-2 lg:order-1">
            <ParallaxShape
              className="-left-20 -bottom-20 h-[22rem] w-[22rem] sm:-left-24 sm:h-[26rem] sm:w-[26rem]"
              colorClass="text-brand-purple/15"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/service-empowering-art.jpeg"
                alt="Placeholder photo — a child's hand painting a colorful picture. Replace with a real New Era Academy art activity photo."
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal from="right" className="order-1 lg:order-2">
            <h2
              id="empowering-heading"
              className="font-heading text-2xl font-semibold text-brand-green sm:text-3xl"
            >
              Empowering Children ❤️‍🔥
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg text-justify">
              {
                "Our trained staff ensures that every child feels safe and valued, fostering a sense of belonging that is essential for personal development. We provide individualized support tailored to each student's unique needs, helping them overcome challenges and celebrate their successes. We offer a range of programs—from art and music to sports and technology—empowering students to explore diverse interests and develop well-rounded skills. These activities not only provide fun and engagement but also encourage teamwork, discipline, and resilience."
              }
            </p>
          </Reveal>
        </div>
      </section>
      <section aria-labelledby="curriculum-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal from="left">
            <h2
              id="curriculum-heading"
              className="font-heading text-2xl font-semibold text-brand-green sm:text-3xl"
            >
              PROVIDING TRANSPORTATION 🚌
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg text-justify">
              New Era Academy provides transportation including picking up or dropping off children between home and the center as well as providing rides for planned field trips using vans or mini-buses.
            </p>
          </Reveal>
          <Reveal from="right" className="relative">
            <ParallaxShape
              className="-right-20 -top-20 h-[22rem] w-[22rem] sm:-right-24 sm:h-[26rem] sm:w-[26rem]"
              colorClass="text-brand-magenta/15"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/IMG_0156.JPG"
                alt="Placeholder photo — a child's hands stacking colorful building blocks. Replace with a real New Era Academy classroom activity photo."
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
