import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TrustStrip from "@/components/TrustStrip";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import ScrollProgress from "@/components/ScrollProgress";
import { site, basePath } from "@/lib/site";

// Display face for headings; body face for all UI text (per CLAUDE.md).
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | General Contractor in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    title: `${site.name} | General Contractor in ${site.city}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/hero-construction-site.jpg",
        width: 1600,
        height: 900,
        alt: `${site.name} custom home under construction`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | General Contractor in ${site.city}`,
    description: site.description,
    images: ["/images/hero-construction-site.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C2B3A",
};

// LocalBusiness markup so search engines understand the contractor profile.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  priceRange: "$$$",
  foundingDate: String(site.foundedYear),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: site.city,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href={`${basePath}/favicon.svg`} type="image/svg+xml" />
        <link rel="shortcut icon" href={`${basePath}/favicon.svg`} />
        <link rel="apple-touch-icon" href={`${basePath}/favicon.svg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Skip link: hidden until focused via keyboard, then slides in. */}
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[9999] -translate-y-24 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-primary shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <TrustStrip />
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
