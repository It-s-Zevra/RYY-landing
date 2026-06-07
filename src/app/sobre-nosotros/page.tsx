import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { site } from "@/lib/site";

const TITLE = "Quiénes somos";
const DESCRIPTION =
  "Conoce al equipo de RY Legal (Rivas & Yuraszeck Abogados): socios fundadores con más de 10 años de experiencia en derecho laboral para empresas en Chile.";
const URL = `${site.url}/sobre-nosotros`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: "profile",
    url: URL,
    siteName: site.name,
    title: `${TITLE} · ${site.name}`,
    description: DESCRIPTION,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.legalName} — Equipo`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ${site.name}`,
    description: DESCRIPTION,
    images: [site.ogImage],
  },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutTeam />
      </main>
      <Footer />
    </>
  );
}
