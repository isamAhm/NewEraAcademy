import type { Metadata } from "next";
import { ScheduleTourForm } from "@/components/ScheduleTourForm";

export const metadata: Metadata = {
  title: "Schedule Tour",
  description:
    "Schedule a tour of New Era Academy in Columbus, Ohio and see our classrooms for yourself.",
};

export default function ScheduleTourPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold text-brand-green sm:text-4xl">
          Schedule A Tour!
        </h1>
        <p className="mt-4 text-base text-ink-soft sm:text-lg">
          We&rsquo;d love to show you around. Fill out the form below and
          we&rsquo;ll be in touch to confirm your visit.
        </p>
      </div>

      <div className="mt-10 rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <ScheduleTourForm />
      </div>
    </div>
  );
}
