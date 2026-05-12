"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

const insights = [
  {
    category: "Ley Karin · 2026",
    title: "Cómo prepararse para una investigación interna sin perder cultura.",
    date: "Próximamente",
  },
  {
    category: "Compliance · 2026",
    title: "Modelo de Prevención del Delito: el checklist mínimo del directorio.",
    date: "Próximamente",
  },
  {
    category: "Datos personales · 2026",
    title: "Nueva Ley de Datos Personales: lo que cambia para tu RRHH.",
    date: "Próximamente",
  },
];

export function Insights() {
  return (
    <section
      id="insights"
      data-section-theme="light"
      className="bg-porcelain text-cape"
    >
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3 text-obsidian">
                <span className="h-px w-8 bg-obsidian" />
                06 / Insights y prensa
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-3xl font-serif text-display-lg font-medium text-balance">
                Lo que estamos pensando.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="#"
              className="link-underline inline-flex items-center gap-2 self-start font-mono text-eyebrow uppercase tracking-widest text-cape md:self-end"
            >
              Síguenos en LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <StaggerGroup
          stagger={0.1}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {insights.map((p) => (
            <motion.article
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="group flex flex-col rounded-lg border border-obsidian/15 bg-porcelain-warm/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-obsidian/40 hover:bg-mint"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-eyebrow uppercase tracking-widest text-obsidian">
                  {p.category}
                </p>
                <span className="font-mono text-eyebrow text-obsidian/50">
                  {p.date}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium leading-snug text-balance">
                {p.title}
              </h3>
              <span className="mt-auto flex items-center gap-2 pt-10 font-mono text-eyebrow uppercase tracking-widest text-obsidian">
                Pronto
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
