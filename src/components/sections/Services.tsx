"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

const services = [
  {
    n: "01",
    title: "Asesoría laboral permanente",
    desc: "Acompañamiento mensual a tu área de RRHH. Respondemos rápido y por escrito.",
  },
  {
    n: "02",
    title: "Juicios y representación judicial",
    desc: "Defensa de empresas y trabajadores en los tribunales del trabajo a lo largo del país.",
  },
  {
    n: "03",
    title: "Investigaciones Ley Karin",
    desc: "Investigaciones internas con investigador externo objetivo, conforme al estándar legal.",
  },
  {
    n: "04",
    title: "Reglamento Interno de Orden e Higiene",
    desc: "Diseño y actualización del RIOHS adaptado a la realidad de tu operación.",
  },
  {
    n: "05",
    title: "Modelo de Prevención del Delito",
    desc: "Implementación de modelos bajo Ley 20.393, con su correspondiente certificación.",
  },
  {
    n: "06",
    title: "Modelo de Protección de Datos",
    desc: "Cumplimiento con la nueva Ley de Datos Personales y políticas internas.",
  },
];

export function Services() {
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
            02 / Servicios
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-serif text-display-lg font-medium text-balance">
            Lo que resolvemos para ti.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-obsidian/80">
            Asesoría laboral integral para empresas que no pueden permitirse un
            error legal. Una sola firma, todo el ciclo.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 border-y border-obsidian/15">
          {services.map((s) => (
            <ServiceRow key={s.n} {...s} />
          ))}
        </StaggerGroup>

        {/* Plan CTA card */}
        <Reveal delay={0.05}>
          <div className="mt-16 overflow-hidden rounded-lg bg-cape p-8 text-porcelain md:p-14">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="eyebrow text-mint">→ Plan empresarial</p>
                <p className="mt-4 font-serif text-display-md font-medium leading-tight text-balance">
                  Plan de 12 meses ·{" "}
                  <span className="italic text-mint">
                    Reglamento Interno gratis.
                  </span>
                </p>
                <p className="mt-4 max-w-xl text-porcelain/70">
                  Asesoría continua a fee mensual fijo. Sin sorpresas, sin
                  honorarios variables, sin sobrecargos por hora.
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
}: {
  n: string;
  title: string;
  desc: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative border-b border-obsidian/15 last:border-b-0"
    >
      <a
        href="#contacto"
        className="relative grid grid-cols-[auto_1fr_auto] items-center gap-6 px-2 py-7 md:gap-8 md:px-4 md:py-8"
      >
        {/* Hover background slide-in */}
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-0 origin-left bg-cape"
          initial={false}
          animate={{ scaleX: hover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        />

        <span className="relative z-10 font-mono text-eyebrow text-obsidian transition-colors group-hover:text-mint">
          {n}
        </span>

        <div className="relative z-10 flex flex-col gap-1.5">
          <span className="font-serif text-2xl font-medium leading-tight text-cape transition-colors group-hover:text-porcelain md:text-3xl">
            {title}
          </span>
          <motion.span
            initial={false}
            animate={{
              opacity: hover ? 1 : 0,
              y: hover ? 0 : -6,
              height: hover ? "auto" : 0,
            }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden text-sm text-mint/80"
          >
            {desc}
          </motion.span>
        </div>

        <motion.span
          aria-hidden
          initial={false}
          animate={{ x: hover ? 0 : -8, opacity: hover ? 1 : 0.4 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-pill border border-obsidian/30 text-cape transition-colors group-hover:border-mint group-hover:text-mint"
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.span>
      </a>
    </motion.div>
  );
}
