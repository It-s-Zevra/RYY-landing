"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

const team = [
  {
    name: "Josefa Yuraszeck",
    role: "Socia",
    bio: "Derecho laboral · 10+ años · Universidad de Chile",
    specialty: "Litigios complejos · Ley Karin",
    linkedin: "#",
  },
  {
    name: "Socio Rivas",
    role: "Socio",
    bio: "Derecho empresarial · 10+ años",
    specialty: "Compliance · Asesoría permanente",
    linkedin: "#",
  },
];

export function Team() {
  return (
    <section
      id="equipo"
      data-section-theme="dark"
      className="relative overflow-hidden bg-cape text-porcelain noise"
    >
      {/* subtle gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(51,86,109,0.45),transparent_70%)]" />

      <div className="container-page relative z-10 py-24 md:py-32">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-mint">
            <span className="h-px w-8 bg-mint" />
            03 / Quiénes somos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-serif text-display-lg font-medium text-balance">
            Diez años no se{" "}
            <span className="italic text-mint">improvisan.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-porcelain/70">
            Conoce a las personas que estarán al otro lado del teléfono cuando
            todo importa.
          </p>
        </Reveal>

        <StaggerGroup
          stagger={0.12}
          className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10"
        >
          {team.map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </StaggerGroup>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <figure className="mx-auto mt-24 max-w-3xl border-t border-mint/15 pt-12 text-center">
            <blockquote className="font-serif text-display-md italic leading-tight text-porcelain text-balance">
              “Creemos que el derecho laboral debería sentirse menos como un
              trámite y más como tener a alguien firme en tu esquina.”
            </blockquote>
            <figcaption className="mt-6 font-mono text-eyebrow uppercase tracking-widest text-mint">
              — Josefa Yuraszeck · Socia
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function TeamCard({
  name,
  role,
  bio,
  specialty,
  linkedin,
}: {
  name: string;
  role: string;
  bio: string;
  specialty: string;
  linkedin: string;
}) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-cape-700">
        {/* Placeholder photo gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(78,111,134,0.6),rgba(10,37,54,1))]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl font-medium text-mint/15">
            {name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cape via-cape/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

        <a
          href={linkedin}
          aria-label={`LinkedIn de ${name}`}
          className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-pill border border-mint/30 bg-cape/40 text-mint opacity-0 backdrop-blur transition-all duration-500 hover:bg-mint hover:text-cape group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Linkedin className="h-4 w-4" />
        </a>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-mono text-eyebrow uppercase tracking-widest text-mint">
            {role}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-medium md:text-3xl">
            {name}
          </h3>
          <motion.p
            initial={false}
            className="mt-3 max-h-0 overflow-hidden text-sm text-porcelain/70 transition-all duration-500 group-hover:max-h-32"
          >
            {specialty}
          </motion.p>
        </div>
      </div>
      <p className="mt-4 font-mono text-eyebrow uppercase tracking-widest text-porcelain/60">
        {bio}
      </p>
    </motion.article>
  );
}
