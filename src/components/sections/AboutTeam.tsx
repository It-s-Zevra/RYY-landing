"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

type Member = {
  name?: string;
  role: string;
  education?: string;
  specialty?: string;
  bio?: string;
  image: string;
  linkedin?: string;
  /**
   * Cloudinary crop tuned per photo so every head reads at the same scale and
   * vertical position. The source photos differ in orientation (César's is
   * portrait, the others landscape) and the auto face box varies, so the zoom
   * (z) and vertical nudge (y) are dialed in per person to line up eyes/heads.
   */
  crop: string;
};

const faceCrop = (url: string, crop: string) =>
  url.replace("/image/upload/", `/image/upload/${crop}/`);

const team: Member[] = [
  {
    name: "César Rivas Calderón",
    role: "Socio Fundador",
    education: "Universidad de Chile · UAB España · UDD",
    specialty: "Litigación de alta complejidad · Salud ocupacional · Compliance",
    bio: "Abogado de la Universidad de Chile titulado con distinción máxima, Máster en Derecho de los Negocios (UAB, España) y Diplomado en Compliance y Gobiernos Corporativos (UDD). Especialista en litigación de alta complejidad y asesoría 360°, con trayectoria como Asociado Senior en GNP Canales y abogado en la Fiscalía de la Asociación Chilena de Seguridad ACHS. Actualmente lidera la firma y es docente en la Universidad de Santiago de Chile, combinando la excelencia académica con la gestión estratégica del riesgo laboral, especialista en materias de salud ocupacional y compliance.",
    image:
      "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1780606912/CesarCorpo-5_upgu1c.jpg",
    linkedin: "https://www.linkedin.com/in/carivasca/",
    crop: "c_thumb,g_face,ar_4:5,z_0.62,y_-185,w_900",
  },
  {
    name: "Josefa Yuraszeck Bravo",
    role: "Socia Fundadora",
    education: "Universidad de los Andes · Magíster UAI",
    specialty: "Consultoría corporativa · Relaciones Laborales · Ley Karin",
    bio: "Abogada de la Universidad de los Andes y Magíster en Derecho Laboral y Seguridad Social (UAI). Con trayectoria en firmas de élite como GNP Canales y Rodríguez Coronel, donde asesoró a grandes empresas en litigación compleja, consultoría corporativa, investigaciones críticas y relaciones sindicales. En Rivas Yuraszeck lidera el área de litigios, donde a través de su formación especializada en litigación laboral, se enfoca en proteger la estabilidad y continuidad del negocio. Además se especializa en investigaciones de Ley Karin y cuenta con certificación en perspectiva de género, abordando cada caso con el estándar técnico exigido.",
    image:
      "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1780606911/CesarCorpo-6_qrjpbb.jpg",
    linkedin: "https://www.linkedin.com/in/josefa-yuraszeck-758900127/",
    crop: "c_thumb,g_face,ar_4:5,z_0.62,w_900",
  },
  {
    name: "Alanys Barrera Saavedra",
    role: "Procuradora",
    education: "Universidad de Santiago de Chile",
    specialty: "Tramitación Judicial",
    bio: "Estudiante de quinto año de Derecho de la Universidad de Santiago de Chile. Integra el equipo jurídico de RY Legal, participando en la elaboración de escritos, investigación jurídica y tramitación de causas laborales. Su formación se ha orientado especialmente al Derecho del Trabajo, con interés en las relaciones laborales y la protección de derechos fundamentales.",
    image:
      "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1780855143/CesarCorpo-3_1_ugmdcp.jpg",
    crop: "c_thumb,g_face,ar_4:5,z_0.54,y_70,w_900",
  },
];

export function AboutTeam() {
  return (
    <section
      id="equipo"
      aria-labelledby="equipo-heading"
      data-section-theme="dark"
      className="relative overflow-hidden bg-cape text-porcelain noise"
    >
      {/* subtle gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(51,86,109,0.45),transparent_70%)]" />

      <div className="container-page relative z-10 pb-24 pt-32 md:pb-32 md:pt-44">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-mint">
            <span className="h-px w-8 bg-mint" />
            Quiénes somos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            id="equipo-heading"
            className="max-w-3xl font-serif text-display-lg font-medium text-balance"
          >
            Diez años no se{" "}
            <span className="italic text-mint">improvisan.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-porcelain/70">
            Conoce al equipo que estará al otro lado del teléfono cuando todo
            importa.
          </p>
        </Reveal>

        <StaggerGroup
          stagger={0.12}
          className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {team.map((m) => (
            <TeamCard key={m.name ?? m.role} {...m} />
          ))}
        </StaggerGroup>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <figure className="mx-auto mt-24 max-w-3xl border-t border-mint/15 pt-12 text-center">
            <blockquote className="font-serif text-display-md italic leading-tight text-porcelain text-balance">
              “Creemos que el derecho laboral debería sentirse menos como un
              trámite y más como tener a alguien firme en tu esquina”.
            </blockquote>
            <figcaption className="mt-6 font-mono text-eyebrow uppercase tracking-widest text-mint">
              — RY Legal · Socios
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function TeamCard({ name, role, education, specialty, bio, image, linkedin, crop }: Member) {
  const initials = (name ?? role)
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  const title = name ?? role;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-mint/10 bg-cape-700/40 backdrop-blur-sm transition-colors duration-500 hover:border-mint/25"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-mint/10 bg-cape-700">
        {/* Fallback shown beneath the photo */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(78,111,134,0.6),rgba(10,37,54,1))]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl font-medium text-mint/15">
            {initials}
          </span>
        </div>
        <Image
          src={faceCrop(image, crop)}
          alt={`${title} — ${role} de RY Legal`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cape via-cape/40 to-transparent opacity-90" />

        {linkedin && (
          <a
            href={linkedin}
            aria-label={`LinkedIn de ${title}`}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-pill border border-mint/30 bg-cape/40 text-mint backdrop-blur transition-all duration-300 hover:bg-mint hover:text-cape"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}

        {/* Role badge — only when there's a distinct name above */}
        {name && (
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 rounded-pill border border-mint/25 bg-cape/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mint backdrop-blur">
            {role}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <h3 className="font-serif text-2xl font-medium leading-tight text-porcelain md:text-3xl">
            {title}
          </h3>
          {education && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mint/70">
              {education}
            </p>
          )}
        </div>

        {specialty && (
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
        )}

        {bio && (
          <p className="text-pretty text-justify text-sm leading-relaxed text-porcelain/70 md:text-[15px]">
            {bio}
          </p>
        )}
      </div>
    </motion.article>
  );
}
