import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: '/images/mainlogo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/mainlogo.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/images/mainlogo.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/images/mainlogo.png',
        width: 1200,
        height: 630,
        alt: 'New Era Academy Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/images/mainlogo.png'],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fredoka.variable} ${nunito.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cta focus:px-5 focus:py-2.5 focus:text-cta-contrast"
        >
          Skip to main content
        </a>
        <SiteHeader />

        {/* School name banner - similar to Lucky Academy */}
        <div className="bg-gradient-to-r from-[#E5DCEA] via-[#D0FAE4] to-brand-purple py-3">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center font-heading text-lg font-semibold tracking-widest text-brand-blue uppercase">
              New Era Academy
            </p>
          </div>
        </div>

        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
