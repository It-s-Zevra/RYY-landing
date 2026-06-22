import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { getPublishedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;

const TITLE = "Insights";
const DESCRIPTION =
  "Análisis, criterios y novedades en derecho laboral, Ley Karin, compliance y asesoría empresarial en Chile — por el equipo de RY Legal (Rivas & Yuraszeck Abogados).";
const URL = `${site.url}/blog`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    siteName: site.name,
    title: `${TITLE} · ${site.name}`,
    description: DESCRIPTION,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.legalName} — Insights`,
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

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — oscuro, mismo lenguaje que las secciones dark */}
        <section
          data-section-theme="dark"
          className="relative overflow-hidden bg-cape text-porcelain noise"
        >
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(51,86,109,0.45),transparent_70%)]" />
          <div className="container-page relative z-10 pb-16 pt-32 md:pb-20 md:pt-44">
            <p className="eyebrow mb-4 flex items-center gap-3 text-mint">
              <span className="h-px w-8 bg-mint" />
              Insights y prensa
            </p>
            <h1 className="max-w-4xl font-serif text-display-xl font-medium leading-[1.05] text-balance">
              Lo que estamos <span className="italic text-mint">pensando.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-porcelain/70">
              Criterios prácticos sobre derecho laboral, Ley Karin, compliance y
              gestión del riesgo. Sin solemnidad innecesaria — lo que necesitas
              saber para decidir con la cabeza fría.
            </p>
          </div>
        </section>

        {/* Listado / explorador */}
        <section
          data-section-theme="light"
          className="relative bg-porcelain text-cape"
        >
          {posts.length > 0 ? (
            <BlogExplorer posts={posts} />
          ) : (
            <EmptyBlog />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function EmptyBlog() {
  return (
    <div className="container-page py-24 md:py-32">
      <div className="mx-auto max-w-xl rounded-lg border border-dashed border-obsidian/25 px-8 py-16 text-center">
        <p className="eyebrow mb-4 text-obsidian">Próximamente</p>
        <h2 className="font-serif text-display-md font-medium text-cape text-balance">
          Estamos preparando los primeros artículos.
        </h2>
        <p className="mt-4 text-pretty text-obsidian/70">
          Muy pronto publicaremos análisis y novedades. Mientras tanto,
          síguenos en LinkedIn o agenda una conversación con el equipo.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={site.contact.booking}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-pill bg-cape px-6 py-3 font-mono text-eyebrow uppercase tracking-widest text-porcelain transition-colors hover:bg-cape-700"
          >
            Agenda una reunión
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={site.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-pill border border-obsidian/30 px-6 py-3 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-cape hover:text-porcelain"
          >
            Síguenos en LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
