import type { Metadata } from "next";
import { CareerForm } from "@/components/CareerForm";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Interested in working at New Era Academy in Columbus, Ohio? Apply today.",
};

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold text-brand-green sm:text-4xl">
          Interested In Working With Us? We Would Love To Have You Join Our
          Team.
        </h1>
        <p className="mt-4 text-base text-ink-soft sm:text-lg">
          Please fill out the form below and we will be in touch.
        </p>
      </div>

      <div className="mt-10 rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <CareerForm />
      </div>
    </div>
  );
}
