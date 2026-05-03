import type { Metadata, Viewport } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Loader } from "@/components/providers/Loader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Asesoría laboral y empresarial en Chile`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Asesoría laboral y empresarial en Chile`,
    description: site.description,
    images: [{ url: site.logos.dark, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  icons: { icon: site.logos.dark },
};

export const viewport: Viewport = {
  themeColor: "#0A2536",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CL"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
