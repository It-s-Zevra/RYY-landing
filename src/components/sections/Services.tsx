"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.19, 1, 0.22, 1] as const;

const services = [
  {
    n: "01",
    title: "Asesoría Laboral",
    desc: "Apoyamos a las organizaciones en todo el espectro laboral: desde relaciones laborales y seguridad social, despidos complejos, investigaciones internas, salud ocupacional y asuntos migratorios.",
  },
  {
    n: "02",
    title: "Litigios",
    desc: "Representación de empresas y ejecutivos de alto nivel en los tribunales del trabajo a lo largo del país. Estrategia clara, comunicación constante y honorarios pactados desde el inicio para evitar sorpresas. Los acompañamos en cada etapa del proceso con asesoría especializada y discreta.",
  },
  {
    n: "03",
    title: "Compliance Laboral",
    desc: "El compliance laboral es el conjunto de políticas, protocolos y prácticas que permiten a una empresa operar dentro del marco legal vigente en materia laboral. Contar con esta documentación ordenada y actualizada no es solo una buena práctica: es lo que permite defenderse con solidez ante tribunales y fiscalizaciones, demostrando que la organización actuó con diligencia y cumplió su deber de cuidado. Esto incluye instrumentos como el Reglamento Interno de Orden, Higiene y Seguridad, el Protocolo de la Ley Karin, el Modelo de Prevención de Delitos y el Modelo de Protección de Datos Personales, entre otros.",
  },
  {
    n: "04",
    title: "Migraciones",
    desc: "Acompañamos a empresas y colaboradores en su gestión migratoria y en desplazamientos temporales en Chile, incluyendo la tramitación de visas, residencias y permisos de trabajo, así como la elección del régimen previsional más conveniente.",
  },
  {
    n: "05",
    title: "Negociación Colectiva",
    desc: "Acompañamos a las empresas en todas las etapas de su relación con las organizaciones sindicales, entregando apoyo jurídico y estratégico integral. Nuestros servicios comprenden la orientación experta en procesos de negociación colectiva, tanto reglada como no reglada; la representación y asistencia en mediaciones y comparendos ante organismos administrativos; el acompañamiento completo en los procesos de calificación de servicios mínimos; la redacción y revisión de los instrumentos y documentos propios de la vinculación empresa-sindicato.",
  },
  {
    n: "06",
    title: "Capacitaciones",
    desc: "Capacitamos a tu equipo para enfrentar con confianza los desafíos del mundo laboral y empresarial, incluyendo materias como Responsabilidad Legal, Compliance, Derechos Fundamentales y Ley Karin.",
  },
];

export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id="servicios"
      data-section-theme="light"
      className="relative bg-porcelain text-cape"
    >
      <div className="container-page py-24 md:py-32">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-obsidian">
            <span className="h-px w-8 bg-obsidian" />
            03 / Servicios
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-serif text-display-lg font-medium text-balance">
            Lo que resolvemos para ti.
          </h2>
        </Reveal>
        <StaggerGroup className="mt-12 border-y border-obsidian/15 md:mt-16">
          {services.map((s) => (
            <ServiceRow
              key={s.n}
              {...s}
              expanded={open === s.n}
              onToggle={() => setOpen((cur) => (cur === s.n ? null : s.n))}
            />
          ))}
        </StaggerGroup>

        {/* Plan CTA card */}
        <Reveal delay={0.05}>
          <div className="mt-16 overflow-hidden rounded-lg bg-cape p-8 text-porcelain md:p-14">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="eyebrow text-mint">→ Plan empresarial</p>
                <p className="mt-4 font-serif text-display-md font-medium leading-tight text-balance">
                  Asesoría mensual continua ·{" "}
                  <span className="italic text-mint">tarifa fija.</span>
                </p>
                <p className="mt-4 max-w-xl text-porcelain/70">
                  Las empresas que optan por una asesoría anual reciben, sin
                  costo adicional, la elaboración o actualización de su
                  Reglamento Interno de Orden, Higiene y Seguridad.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-pill bg-mint px-6 py-3.5 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-mint-dark"
                >
                  Conversemos del plan
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <span className="font-mono text-eyebrow text-mint/60">
                  Respuesta en 24 horas hábiles
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceRow({
  n,
  title,
  desc,
  expanded,
  onToggle,
}: {
  n: string;
  title: string;
  desc: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative border-b border-obsidian/15 last:border-b-0"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-2 py-6 text-left md:gap-8 md:px-4 md:py-8"
      >
        {/* Hover/expanded background slide-in */}
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-0 origin-left bg-cape"
          initial={false}
          animate={{ scaleX: expanded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        <span
          className={cn(
            "relative z-10 font-mono text-eyebrow transition-colors",
            expanded ? "text-mint" : "text-obsidian",
          )}
        >
          {n}
        </span>

        <span
          className={cn(
            "relative z-10 font-serif text-2xl font-medium leading-tight transition-colors md:text-3xl",
            expanded ? "text-porcelain" : "text-cape",
          )}
        >
          {title}
        </span>

        <motion.span
          aria-hidden
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={cn(
            "relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-pill border transition-colors md:h-10 md:w-10",
            expanded
              ? "border-mint text-mint"
              : "border-obsidian/30 text-cape group-hover:border-cape",
          )}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative z-10 overflow-hidden bg-cape text-porcelain"
          >
            <div className="px-2 pb-8 md:px-4 md:pb-10">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                className="mb-6 block h-px origin-left bg-mint/15 md:mb-8"
              />
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                  className="max-w-2xl text-pretty text-[15px] leading-relaxed text-porcelain/75 md:text-base"
                >
                  {desc}
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                  href="#contacto"
                  className="group/cta inline-flex items-center gap-1.5 self-start rounded-pill bg-mint px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-cape transition-colors hover:bg-mint-dark md:self-auto"
                >
                  Conversemos
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
