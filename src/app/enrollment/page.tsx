import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Enrollment",
  description:
    "Start the enrollment process at New Era Academy and explore tuition discounts for veterans, foster families, siblings, and more.",
};

const discounts = [
  {
    label: "Veterans",
    detail:
      "10% off monthly tuition for veterans and active military families.",
    accent: "bg-brand-teal-light text-brand-teal",
  },
  {
    label: "Foster Children",
    detail: "15% discount.",
    accent: "bg-brand-magenta-light text-brand-magenta",
  },
  {
    label: "Multiple Children",
    detail: "10% off additional children enrolled.",
    accent: "bg-brand-purple-light text-brand-purple",
  },
  {
    label: "Early Enrollment",
    detail: "5% discount for early registration.",
    accent: "bg-brand-green-light text-brand-green",
  },
  {
    label: "Referral Program",
    detail: "Offer $50 off for each new family referred.",
    accent: "bg-brand-teal-light text-brand-teal",
  },
];

export default function EnrollmentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-semibold text-brand-green sm:text-4xl">
          Enrollment
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          Parents are encouraged to fill out the{" "}
          <Link
            href="/schedule-tour"
            className="font-semibold text-brand-green underline decoration-2 underline-offset-2 transition-colors duration-150 hover:text-brand-green-dark"
          >
            appointment request form
          </Link>{" "}
          and upload the completed form for the current school year when
          considering enrollment.
        </p>
      </section>

      <section aria-labelledby="discounts-heading" className="mt-16">
        <h2
          id="discounts-heading"
          className="text-center font-heading text-2xl font-semibold text-brand-green sm:text-3xl"
        >
          Take Advantage Of These Great Discounts!
        </h2>

        <Reveal from="left" className="mt-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {discounts.map((discount) => (
            <li
              key={discount.label}
              className="flex flex-col gap-3 rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5"
            >
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${discount.accent}`}
              >
                Discount
              </span>
              <h3 className="font-heading text-lg font-semibold text-ink">
                {discount.label}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {discount.detail}
              </p>
            </li>
          ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
