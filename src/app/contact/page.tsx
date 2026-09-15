import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { contactInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit or call New Era Academy's Columbus location, or send us a message.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-heading text-3xl font-semibold text-brand-green sm:text-4xl">
        {contactInfo.locationName}
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Reveal from="left" className="flex flex-col gap-8">
          <section aria-labelledby="location-details-heading" className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5">
            <h2 id="location-details-heading" className="sr-only">
              Location details
            </h2>
            <dl className="flex flex-col gap-5">
              <div>
                <dt className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-green">
                  Address
                </dt>
                <dd className="mt-1 text-base text-ink">{contactInfo.addressFull}</dd>
              </div>
              <div>
                <dt className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-green">
                  Operating Hours
                </dt>
                <dd className="mt-1 flex flex-col gap-1 text-base text-ink">
                  {contactInfo.hours.map((h) => (
                    <span key={h.days}>
                      {h.days}: {h.time}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-green">
                  Phone
                </dt>
                <dd className="mt-1 text-base text-ink">
                  <a
                    href={contactInfo.phoneHref}
                    className="transition-colors duration-150 hover:text-brand-green-dark"
                  >
                    {contactInfo.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-green">
                  Email
                </dt>
                <dd className="mt-1 text-base text-ink">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="transition-colors duration-150 hover:text-brand-green-dark"
                  >
                    {contactInfo.email}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
            <iframe
              title={`Map showing New Era Academy at ${contactInfo.addressFull}`}
              src={contactInfo.mapEmbedSrc}
              className="h-72 w-full border-0 sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal from="right">
          <section
            aria-labelledby="contact-form-heading"
            className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
          >
            <h2
              id="contact-form-heading"
              className="font-heading text-2xl font-semibold text-brand-green sm:text-3xl"
            >
              Send Us A Message
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {
                "Prefer a quick note over scheduling a full tour? Reach out here and we'll respond as soon as we can."
              }
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
