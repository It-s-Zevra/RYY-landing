import type { Metadata, Viewport } from "next";
import { fraunces, geistSans, geistMono } from "@/lib/fonts";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Loader } from "@/components/providers/Loader";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const TITLE = `${site.name} · Abogados Laborales en Chile · ${site.legalName}`;
const TITLE_TEMPLATE = `%s · ${site.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: TITLE_TEMPLATE,
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  keywords: [...site.keywords],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Servicios legales",
  classification: "Estudio jurídico · Derecho laboral empresarial",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: site.url,
    languages: {
      "es-CL": site.url,
      es: site.url,
      "x-default": site.url,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    alternateLocale: ["es_ES", "es_MX", "es_AR"],
    url: site.url,
    siteName: site.name,
    title: TITLE,
    description: site.description,
    countryName: "Chile",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.legalName} — Asesoría laboral y empresarial en Chile`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: site.icon, type: "image/png" },
      { url: site.icon, sizes: "32x32", type: "image/png" },
      { url: site.icon, sizes: "16x16", type: "image/png" },
    ],
    shortcut: site.icon,
    apple: [{ url: site.icon, sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "CL-RM",
    "geo.placename": "Santiago",
    "geo.position": "-33.4489;-70.6693",
    ICBM: "-33.4489, -70.6693",
    "format-detection": "telephone=yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A2536" },
    { media: "(prefers-color-scheme: dark)", color: "#0A2536" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CL"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preload" as="image" href={site.hero.bg} fetchPriority="high" />
        <JsonLd />
      </head>
      <body>
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
