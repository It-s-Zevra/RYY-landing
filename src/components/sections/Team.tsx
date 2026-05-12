"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

const team = [
  {
    name: "César Rivas Calderón",
    role: "Socio Fundador",
    education: "Universidad de Chile · UAB España · UDD",
    specialty: "Litigación de alta complejidad · Salud ocupacional",
    bio: "Abogado de la Universidad de Chile titulado con distinción máxima, Máster en Derecho de los Negocios (UAB, España) y Diplomado en Compliance y Gobiernos Corporativos (UDD). Especialista en litigación de alta complejidad y asesoría 360°, con trayectoria previa como Asociado Senior en GNP Canales y abogado en la Fiscalía de la Asociación Chilena de Seguridad ACHS. Actualmente lidera la firma y es docente en la Universidad de Santiago de Chile, combinando la excelencia académica con la gestión estratégica del riesgo laboral, especialista en materias de salud ocupacional, accidentes del trabajo y enfermedades profesionales.",
    linkedin: "#",
  },
  {
    name: "Josefa Yuraszeck Bravo",
    role: "Socia Fundadora",
    education: "Universidad de los Andes · Magíster UAI",
    specialty: "Consultoría corporativa · Relaciones sindicales",
    bio: "Abogada de la Universidad de los Andes y Magíster en Derecho Laboral y Seguridad Social (UAI). Especialista en consultoría corporativa, investigaciones críticas y relaciones sindicales. Cuenta con amplia experiencia asesorando a grandes empresas como Cencosud, SMU y Gasco en firmas de élite como GNP Canales y Rodríguez Coronel. En Rivas & Yuraszeck, lidera el área de litigios enfocándose en la estabilidad y continuidad del negocio, otorgando un servicio de representación del más alto nivel.",
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
            04 / Quiénes somos
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
            Conoce a los socios que estarán al otro lado del teléfono cuando
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
              — Rivas & Yuraszeck · Socios
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
  education,
  specialty,
  bio,
  linkedin,
}: {
  name: string;
  role: string;
  education: string;
  specialty: string;
  bio: string;
  linkedin: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-mint/10 bg-cape-700/40 backdrop-blur-sm transition-colors duration-500 hover:border-mint/25"
    >
      {/* Photo / placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-mint/10 bg-cape-700">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(78,111,134,0.6),rgba(10,37,54,1))]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl font-medium text-mint/15">
            {initials}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-cape via-cape/40 to-transparent opacity-90" />

        <a
          href={linkedin}
          aria-label={`LinkedIn de ${name}`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-pill border border-mint/30 bg-cape/40 text-mint backdrop-blur transition-all duration-300 hover:bg-mint hover:text-cape"
        >
          <Linkedin className="h-4 w-4" />
        </a>

        {/* Role badge */}
        <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 rounded-pill border border-mint/25 bg-cape/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mint backdrop-blur">
          {role}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <h3 className="font-serif text-2xl font-medium leading-tight text-porcelain md:text-3xl">
            {name}
          </h3>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mint/70">
            {education}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {specialty.split(" · ").map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-pill border border-mint/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-porcelain/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-pretty text-sm leading-relaxed text-porcelain/70 md:text-[15px]">
          {bio}
        </p>
      </div>
    </motion.article>
  );
}
