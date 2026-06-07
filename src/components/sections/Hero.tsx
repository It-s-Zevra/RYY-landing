"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { MaskReveal } from "@/components/ui/Reveal";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { site } from "@/lib/site";

const ROTATING_WORDS = ["legal.", "estratégico.", "decisivo.", "ágil."] as const;

const EASE = [0.19, 1, 0.22, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-heading"
      data-section-theme="dark"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-cape text-porcelain"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <Image
          src={site.hero.bg}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay system — readable on any background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cape/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-cape via-cape/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-cape via-cape/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_85%_25%,rgba(218,246,239,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* SEO summary — invisible, keyword-rich context for crawlers and screen readers */}
      <p className="sr-only">
        RY Legal (Rivas &amp; Yuraszeck Abogados) es un estudio jurídico
        chileno con más de diez años de experiencia, especializado en derecho
        laboral para empresas en Santiago de Chile. Asesoría laboral, litigios
        en tribunales del trabajo, compliance laboral, Ley Karin, negociación
        colectiva, migraciones, salud ocupacional y protección de datos
        personales.
      </p>

      {/* Content */}
      <motion.div
        style={{ opacity: fade }}
        className="container-page relative z-10 pb-28 pt-20 md:pb-40 md:pt-20"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="eyebrow mb-5 flex items-center gap-3 whitespace-nowrap text-mint md:mb-6"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="h-px w-6 origin-left bg-mint md:w-10"
          />
          <span className="hidden sm:inline">Estudio jurídico · Santiago de Chile</span>
          <span className="sm:hidden">Estudio jurídico · Chile</span>
        </motion.p>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="max-w-[14ch] font-serif text-[clamp(2.4rem,5.6vw,4.8rem)] font-medium leading-[0.98] tracking-tight text-balance text-porcelain"
        >
          <span className="block">
            <MaskReveal delay={0.15} eager>Tu aliado</MaskReveal>
          </span>
          <span className="block">
            <RotatingWord
              words={ROTATING_WORDS}
              widest="estratégico."
              delay={0.2}
            />
          </span>
          <span className="mt-2 block text-porcelain/55">
            <MaskReveal delay={0.5} eager>En cada</MaskReveal>
          </span>
          <span className="block">
            <MaskReveal delay={0.65} eager>
              <span className="relative inline-block italic text-mint">
                decisión.
                <motion.svg
                  aria-hidden
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8 C 60 2, 150 12, 298 4"
                    stroke="#DAF6EF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: EASE, delay: 1.6 }}
                  />
                </motion.svg>
              </span>
            </MaskReveal>
          </span>
        </h1>

        {/* Differentiator subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 1.2 }}
          className="mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-porcelain/70 md:text-base"
        >
          Estudio jurídico especializado en{" "}
          <span className="text-porcelain">derecho laboral para empresas</span>.
          Estándares de excelencia, criterio y compromiso real en cada decisión.
        </motion.p>

        {/* CTA cluster — compact & minimal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 1.35 }}
          className="mt-7 flex flex-col gap-3 md:mt-8"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
            {/* Primary — prominent pill with shimmer */}
            <a
              href="#contacto"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-mint px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cape shadow-[0_8px_28px_-8px_rgba(218,246,239,0.4)] transition-all duration-300 ease-out-expo hover:shadow-[0_12px_36px_-8px_rgba(218,246,239,0.7),0_0_0_1px_rgba(218,246,239,0.18)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-full"
              />
              <span className="relative">Reunámonos</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <span aria-hidden className="hidden h-3 w-px bg-mint/15 sm:block" />

            {/* Secondary — phone */}
            <a
              href={`tel:${site.contact.phoneIntl}`}
              className="group inline-flex items-center gap-2 text-porcelain/70 transition-colors hover:text-mint"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="link-underline font-mono text-[11px] tracking-[0.04em] tabular-nums">
                {site.contact.phone}
              </span>
            </a>
          </div>

          {/* Microcopy */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-porcelain/40">
            <ShieldCheck className="h-2.5 w-2.5 text-mint/60" />
            <span>30 min · Sin costo</span>
            <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-porcelain/25" />
            <span>Respuesta en 24 h</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom strip with stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.9 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-mint/15 bg-cape-900/70 backdrop-blur-md"
      >
        <div className="container-page flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:py-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Stat label="Años" value="+10" />
            <span aria-hidden className="hidden h-8 w-px bg-mint/15 md:block" />
            <Stat label="Casos" value="+500" />
            <span aria-hidden className="hidden h-8 w-px bg-mint/15 md:block" />
            <Stat label="Empresas" value="+50" />
          </div>
          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-porcelain/55 md:flex">
            <span className="h-px w-8 bg-mint/40" />
            Asesoría laboral · Litigios · Compliance · Migraciones · Negociación colectiva
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#servicios"
        aria-label="Bajar a servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-28 right-6 hidden flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-mint/60 transition-colors hover:text-mint md:flex"
      >
        <span>Scroll</span>
        <span className="relative h-12 w-px bg-mint/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-mint"
            animate={{ y: [0, 36, 36], opacity: [1, 1, 0] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.7, 1],
            }}
          />
        </span>
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="group flex items-baseline gap-2 md:gap-3">
      <span className="font-serif text-2xl font-medium text-mint transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 md:text-3xl">
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-porcelain/55 transition-colors duration-300 group-hover:text-porcelain/85">
        {label}
      </span>
    </div>
  );
}
