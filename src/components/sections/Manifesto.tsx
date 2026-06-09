"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.19, 1, 0.22, 1] as const;

const pillars = [
  {
    label: "Foco",
    text: "Litigación compleja y asesoría preventiva especializada en derecho laboral.",
  },
  {
    label: "Estructura ágil",
    text: "Respondemos rápido, sin sacrificar rigor técnico ni profundidad.",
  },
  {
    label: "Visión de negocio",
    text: "Soluciones que funcionan en la realidad, no solo en el papel.",
  },
];

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      aria-labelledby="manifiesto-heading"
      data-section-theme="light"
      className="relative bg-porcelain text-cape"
    >
      <div className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Left rail */}
          <div className="md:col-span-5 lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3 text-obsidian">
                <span className="h-px w-8 bg-obsidian" />
                02 / Por qué RY Legal
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="manifiesto-heading"
                className="font-serif text-display-lg font-medium leading-[1.02] tracking-tight text-balance"
              >
                El mundo laboral no se detiene.{" "}
                <span className="italic text-obsidian/70">
                  Tampoco nosotros.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-pretty text-obsidian/75">
                Una decisión mal tomada hoy, puede costar caro mañana. Por eso no
                solo entregamos asesoría jurídica: nos involucramos con el
                negocio de nuestros clientes y los acompañamos con criterio,
                experiencia y compromiso real.
              </p>
            </Reveal>
          </div>

          {/* Right column — narrative + pillars */}
          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <p className="eyebrow mb-4 text-obsidian">
                → Nuestra forma de trabajar
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-pretty text-lg leading-relaxed text-cape md:text-xl">
                Creemos que el mejor resultado legal no siempre es el más
                evidente. Por eso{" "}
                <span className="italic">
                  cuestionamos, analizamos y construimos estrategias a la medida
                </span>{" "}
                de cada cliente.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-obsidian/80">
                Nuestro equipo combina solidez técnica con una visión práctica
                del negocio, porque sabemos que a nuestros clientes no les basta
                con tener la razón: necesitan soluciones que funcionen en la
                realidad.
              </p>
            </Reveal>

            {/* Pillars */}
            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg bg-obsidian/15 md:grid-cols-3">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 * i }}
                  className="flex min-w-0 flex-col gap-3 bg-porcelain p-6 md:p-7"
                >
                  <span className="font-mono text-eyebrow uppercase tracking-widest text-obsidian">
                    0{i + 1} · {p.label}
                  </span>
                  <span className="font-serif text-lg font-medium leading-snug text-cape [overflow-wrap:anywhere] md:text-xl">
                    {p.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
