import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer
      data-section-theme="dark"
      className="relative overflow-hidden bg-cape text-porcelain"
    >
      <div className="container-page py-16 pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <Image
              src={site.logos.light}
              alt={site.legalName}
              width={520}
              height={300}
              sizes="180px"
              className="h-12 w-auto object-contain"
            />
            <p className="mt-6 max-w-sm text-sm text-porcelain/60">
              Estudio jurídico chileno especializado en derecho laboral,
              compliance y asesoría empresarial.
            </p>
            <Link
              href="#contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-pill border border-mint/30 px-5 py-2.5 font-mono text-eyebrow uppercase tracking-widest text-mint transition-colors hover:bg-mint hover:text-cape"
            >
              Agenda una reunión
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <p className="eyebrow text-mint/60">Servicios</p>
            <ul className="mt-4 space-y-2 text-sm text-porcelain/80">
              <li>Asesoría Laboral</li>
              <li>Litigios</li>
              <li>Compliance Laboral</li>
              <li>Migraciones</li>
              <li>Negociación Colectiva</li>
              <li>Capacitaciones</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-mint/60">Firma</p>
            <ul className="mt-4 space-y-2 text-sm text-porcelain/80">
              <li>
                <Link href="#equipo" className="link-underline">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="#proceso" className="link-underline">
                  Proceso
                </Link>
              </li>
              <li>
                <Link href="#insights" className="link-underline">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-mint/60">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-porcelain/80">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phoneIntl}`}
                  className="link-underline"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsapp}
                  className="link-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp directo
                </a>
              </li>
              <li>{site.contact.address}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-obsidian/30">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-6 text-xs text-porcelain/50 md:flex-row md:items-center md:gap-6">
          <p>© 2026 {site.legalName}. Todos los derechos reservados.</p>
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-5">
            <p className="font-mono uppercase tracking-widest">
              <span className="text-mint/60">Antes</span> Rivas Legal ·{" "}
              <span className="text-mint/60">Ahora</span> RYY Abogados
            </p>
            <span aria-hidden className="hidden h-3 w-px bg-mint/15 md:block" />
            <a
              href="https://zevraz.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-porcelain/40 transition-colors hover:text-mint"
            >
              <span>Hecho con</span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1774782823/logosolo_vjar0o.png"
                  alt=""
                  width={28}
                  height={28}
                  sizes="14px"
                  className="h-3.5 w-3.5 object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100 invert"
                />
                <span className="font-semibold tracking-[0.28em] text-porcelain/70 transition-colors group-hover:text-mint">
                  Zevra
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
