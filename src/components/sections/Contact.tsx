"use client";

import { Calendar, MessageSquare, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      data-section-theme="dark"
      className="relative overflow-hidden bg-cape text-porcelain noise"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_85%,rgba(218,246,239,0.08),transparent_70%)]" />

      <div className="container-page relative z-10 grid gap-16 py-24 md:grid-cols-12 md:gap-12 md:py-32">
        {/* Left column */}
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-mint">
              <span className="h-px w-8 bg-mint" />
              07 / Hablemos
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="contacto-heading"
              className="font-serif text-display-lg font-medium leading-[1.05] text-balance"
            >
              Cuéntanos tu caso.{" "}
              <span className="italic text-mint">
                Volvemos en menos de 24 horas hábiles.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 space-y-5">
              <ContactItem
                icon={<Phone className="h-4 w-4" />}
                label="Teléfono · WhatsApp"
                value={site.contact.phone}
                href={`tel:${site.contact.phoneIntl}`}
              />
              <ContactItem
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
              />
              <ContactItem
                icon={<MapPin className="h-4 w-4" />}
                label="Oficina"
                value={site.contact.address}
              />
              <ContactItem
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                value="@RYYabogados"
                href={site.contact.linkedin}
                external
              />
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-12 max-w-md text-xs text-porcelain/40">
              Tu información está protegida bajo la Ley 19.628 de Protección de
              Datos Personales y se trata con confidencialidad profesional.
            </p>
          </Reveal>
        </div>

        {/* Right column — form + calendar (disabled) */}
        <div className="md:col-span-7">
          <Reveal delay={0.05}>
            <div className="flex w-full gap-2 rounded-pill border border-mint/15 bg-cape-900/60 p-1.5 backdrop-blur md:w-fit">
              <span
                className="relative inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-mint px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cape md:flex-none md:px-5 md:py-2.5 md:tracking-widest"
              >
                <MessageSquare className="hidden h-3.5 w-3.5 md:inline-flex" />
                Escríbenos
              </span>
              <span
                aria-disabled="true"
                title="Agenda directa · Próximamente"
                className="relative inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-pill px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mint/40 md:flex-none md:px-5 md:py-2.5 md:tracking-widest"
              >
                <Calendar className="hidden h-3.5 w-3.5 md:inline-flex" />
                Agenda directa
                <span className="ml-1 rounded-pill border border-mint/25 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.18em] text-mint/60 md:text-[9px]">
                  Próximamente
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-lg border border-mint/10 bg-cape-900/50 p-6 backdrop-blur md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-pill border border-mint/20 text-mint">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-eyebrow uppercase tracking-widest text-mint/60">
          {label}
        </span>
        <span className="mt-1 font-serif text-lg text-porcelain">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="group flex items-start gap-4 transition-colors hover:text-mint"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-start gap-4">{content}</li>;
}
