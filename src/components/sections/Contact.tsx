"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MessageSquare, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tab = "form" | "calendar";

export function Contact() {
  const [tab, setTab] = useState<Tab>("form");

  return (
    <section
      id="contacto"
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
              06 / Hablemos
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-display-lg font-medium leading-[1.05] text-balance">
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

        {/* Right column — tabs + form / calendar */}
        <div className="md:col-span-7">
          <Reveal delay={0.05}>
            <div className="flex gap-2 rounded-pill border border-mint/15 bg-cape-900/60 p-1.5 backdrop-blur w-full md:w-fit">
              <TabButton
                active={tab === "form"}
                onClick={() => setTab("form")}
                icon={<MessageSquare className="h-3.5 w-3.5" />}
                label="Escríbenos"
              />
              <TabButton
                active={tab === "calendar"}
                onClick={() => setTab("calendar")}
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="Agenda directa"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-lg border border-mint/10 bg-cape-900/50 p-6 backdrop-blur md:p-8">
              {tab === "form" ? (
                <ContactForm />
              ) : (
                <CalendarPlaceholder />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-pill px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors md:flex-none md:px-5 md:py-2.5 md:tracking-widest",
        active ? "text-cape" : "text-mint/70 hover:text-mint",
      )}
    >
      {active && (
        <motion.span
          layoutId="contact-tab"
          className="absolute inset-0 rounded-pill bg-mint"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
        <span className="hidden md:inline-flex">{icon}</span>
        {label}
      </span>
    </button>
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

function CalendarPlaceholder() {
  return (
    <div className="flex flex-col items-start gap-5 py-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-pill border border-mint/30 text-mint">
        <Calendar className="h-5 w-5" />
      </span>
      <div>
        <p className="eyebrow text-mint">Agenda · 30 min sin costo</p>
        <h3 className="mt-3 font-serif text-2xl font-medium text-porcelain">
          Próximamente · Cal.com embebido aquí.
        </h3>
        <p className="mt-3 max-w-md text-sm text-porcelain/60">
          Cuando me pases la URL pública de Cal.com (o Calendly) la conecto en
          este bloque para que el cliente reserve directamente. Mientras tanto,
          puedes usar el formulario de la otra pestaña o escribirnos por
          WhatsApp.
        </p>
        <a
          href={site.contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-pill bg-mint px-5 py-3 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-mint-dark"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  );
}
