"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import {
  type BlogPost,
  cloudinaryTransform,
  excerpt,
  formatDate,
  postDate,
  readingTime,
} from "@/lib/blog";

/** Tarjetas de respaldo cuando aún no hay posts publicados o la API no responde. */
const placeholders = [
  {
    category: "Ley Karin · 2026",
    title: "Cómo prepararse para una investigación interna sin perder cultura.",
  },
  {
    category: "Compliance · 2026",
    title: "Modelo de Prevención del Delito: el checklist mínimo del directorio.",
  },
  {
    category: "Datos personales · 2026",
    title: "Nueva Ley de Datos Personales: lo que cambia para tu RRHH.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const CARD_IMG = "c_fill,g_auto,ar_16:10,w_640,q_auto,f_auto";

export function Insights({ posts = [] }: { posts?: BlogPost[] }) {
  const hasPosts = posts.length > 0;

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      data-section-theme="light"
      className="bg-porcelain text-cape"
    >
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3 text-obsidian">
                <span className="h-px w-8 bg-obsidian" />
                05 / Insights y prensa
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="insights-heading"
                className="max-w-3xl font-serif text-display-lg font-medium text-balance"
              >
                Lo que estamos pensando.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/blog"
              className="link-underline inline-flex items-center gap-2 self-start font-mono text-eyebrow uppercase tracking-widest text-cape md:self-end"
            >
              Ver todo el blog
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {hasPosts ? (
          <StaggerGroup stagger={0.1} className="mt-16 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostTile key={post.id} post={post} />
            ))}
          </StaggerGroup>
        ) : (
          <StaggerGroup stagger={0.1} className="mt-16 grid gap-6 md:grid-cols-3">
            {placeholders.map((p) => (
              <motion.article
                key={p.title}
                variants={cardVariants}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="group flex flex-col rounded-lg border border-obsidian/15 bg-porcelain-warm/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-obsidian/40 hover:bg-mint"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-eyebrow uppercase tracking-widest text-obsidian">
                    {p.category}
                  </p>
                  <span className="font-mono text-eyebrow text-obsidian/50">
                    Próximamente
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
        )}
      </div>
    </section>
  );
}

function PostTile({ post }: { post: BlogPost }) {
  const img = cloudinaryTransform(post.bannerImage, CARD_IMG);
  const date = formatDate(postDate(post));
  const mins = readingTime(post.content);
  const primaryTag = post.tags?.[0];

  return (
    <motion.article
      variants={cardVariants}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="group flex flex-col overflow-hidden rounded-lg border border-obsidian/15 bg-porcelain-warm/60 transition-all duration-500 hover:-translate-y-1 hover:border-obsidian/40 hover:shadow-[0_20px_50px_-24px_rgba(6,24,42,0.4)]"
    >
      <Link href={`/blog/${post.slug}`} aria-label={post.title} className="flex flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-cape-700">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(78,111,134,0.5),rgba(10,37,54,1))]" />
          {img ? (
            <Image
              src={img}
              alt={post.title}
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-4xl font-medium text-mint/20">RY</span>
            </div>
          )}
          {primaryTag && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-pill border border-mint/25 bg-cape/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mint backdrop-blur">
              {primaryTag}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-obsidian">
            {date && <span>{date}</span>}
            {date && <span className="h-3 w-px bg-obsidian/30" />}
            <span>{mins} min</span>
          </div>
          <h3 className="mt-4 font-serif text-xl font-medium leading-snug text-balance">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-pretty text-sm leading-relaxed text-obsidian/75">
            {excerpt(post.content, 120)}
          </p>
          <span className="mt-auto flex items-center gap-2 pt-8 font-mono text-eyebrow uppercase tracking-widest text-cape">
            Leer artículo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
