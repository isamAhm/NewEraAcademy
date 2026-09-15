import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SunburstMotif } from "@/components/icons/SunburstMotif";
import { contactInfo, navItems, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-brand-green-light">
      <SunburstMotif className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 text-brand-green/15" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-soft">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-green-dark">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft transition-colors duration-150 hover:text-brand-green-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-green-dark">
              {contactInfo.locationName}
            </h2>
            <address className="mt-3 flex flex-col gap-2 text-sm not-italic text-ink-soft">
              <span>{contactInfo.addressFull}</span>
              <a
                href={contactInfo.phoneHref}
                className="transition-colors duration-150 hover:text-brand-green-dark"
              >
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="transition-colors duration-150 hover:text-brand-green-dark"
              >
                {contactInfo.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{contactInfo.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
