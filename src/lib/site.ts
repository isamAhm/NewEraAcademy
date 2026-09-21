/**
 * Central site constants — nav structure, contact details, and shared copy
 * fragments. Keeping these in one place means the address/phone/hours only
 * need updating in one spot if NEA's details change.
 */

export const siteConfig = {
  name: "New Era Academy",
  shortName: "NEA",
  tagline: "Center for Learning and Growth",
  description:
    "New Era Academy is dedicated to nurturing young minds and fostering lifelong learning, serving children ages 6 weeks to 12 years in Columbus, Ohio.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.neweraacademy.org",
};

export const contactInfo = {
  locationName: "Columbus Location",
  address: {
    line1: "2169 Cleveland Ave",
    city: "Columbus",
    state: "Ohio",
    zip: "43211",
  },
  addressFull: "2169 Cleveland Ave, Columbus, Ohio 43211",
  phone: "(614) 826-3983",
  phoneHref: "tel:+16148263983",
  email: "isam.ahmedh8@gmail.com",
  hours: [
    { days: "Monday to Friday", time: "8:00 AM – 10:00 PM" },
    { days: "Saturday to Sunday", time: "8:00 AM – 6:00 PM" },
  ],
  mapEmbedSrc:
    "https://www.google.com/maps?q=2169+Cleveland+Ave,+Columbus,+Ohio+43211&output=embed",
};

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "Enrollment", href: "/enrollment" },
  { label: "Contact Us", href: "/contact" },
  { label: "Schedule Tour", href: "/schedule-tour" },
  { label: "Career", href: "/career" },
];
