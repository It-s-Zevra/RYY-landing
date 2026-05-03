"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnóstico inicial",
    desc: "Reunión 30 min sin costo. Entendemos tu caso a fondo.",
  },
  {
    n: "02",
    title: "Propuesta clara",
    desc: "Plan, plazos y honorarios en 48 h. Sin letras chicas.",
  },
  {
    n: "03",
    title: "Ejecución acompañada",
    desc: "Equipo asignado, canal directo, reportes mensuales.",
  },
  {
    n: "04",
    title: "Resultados medibles",
    desc: "KPIs claros. Sabes exactamente dónde está tu caso.",
  },
];

export function Process() {
  return (
    <section
      id="proceso"
      data-section-theme="light"
      className="relative bg-mint text-cape"
    >
      <div className="container-page py-24 md:py-32">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-cape">
            <span className="h-px w-8 bg-cape" />
            04 / Cómo trabajamos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-serif text-display-lg font-medium text-balance">
            Un proceso pensado para no hacerte perder tiempo.
          </h2>
        </Reveal>

        <StaggerGroup
          stagger={0.12}
          className="mt-20 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-4"
        >
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="relative flex list-none flex-col"
            >
              {/* Decorative serif number — no circle */}
              <span
                aria-hidden
                className="font-serif text-[5rem] font-medium leading-none text-cape/20 md:text-[5.5rem]"
              >
                {s.n}
              </span>

              {/* Hairline between number and title */}
              <span className="mt-4 h-px w-12 bg-cape/35" />

              <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-balance md:text-[1.6rem]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-pretty text-sm leading-relaxed text-cape/75">
                {s.desc}
              </p>

              {/* Step indicator badge — bottom of card */}
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cape/55">
                <span className="h-1 w-1 rounded-full bg-cape" />
                Paso {i + 1} de {steps.length}
              </span>
            </motion.li>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
