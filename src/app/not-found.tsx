import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MoveLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o fue movida. Vuelve al inicio de RY Legal o escríbenos.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section
          data-section-theme="dark"
          className="relative flex min-h-screen items-center overflow-hidden bg-cape text-porcelain noise"
        >
          {/* subtle gradient backdrop, same language as the dark sections */}
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(51,86,109,0.45),transparent_70%)]" />

          <div className="container-page relative z-10 py-32 md:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-6 flex items-center justify-center gap-3 text-mint">
                <span className="h-px w-8 bg-mint" />
                Error 404
                <span className="h-px w-8 bg-mint" />
              </p>

              <p className="font-serif text-[clamp(5rem,18vw,11rem)] font-medium leading-none tracking-tight text-mint/15">
                404
              </p>

              <h1 className="mt-2 font-serif text-display-lg font-medium leading-[1.05] text-balance">
                Esta página{" "}
                <span className="italic text-mint">no existe.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-md text-pretty text-porcelain/70">
                El enlace puede estar roto o la página fue movida. Volvamos a
                terreno firme.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-pill bg-mint px-6 py-3.5 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-mint-dark"
                >
                  <MoveLeft className="h-3.5 w-3.5" />
                  Volver al inicio
                </Link>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 rounded-pill border border-mint/30 px-6 py-3.5 font-mono text-eyebrow uppercase tracking-widest text-mint transition-colors hover:bg-mint hover:text-cape"
                >
                  Hablemos
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Quick links to the main destinations */}
              <nav className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-mint/15 pt-8 text-sm text-porcelain/70">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="link-underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
