"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import {
  type BlogPost,
  cloudinaryTransform,
  excerpt,
  formatDate,
  postDate,
  readingTime,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

const EASE = [0.19, 1, 0.22, 1] as const;
const FEATURED_IMG = "c_fill,g_auto,ar_4:3,w_1100,q_auto,f_auto";

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const prefersReduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) {
      for (const t of p.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = !activeTag || (p.tags ?? []).includes(activeTag);
      if (!matchesTag) return false;
      if (!q) return true;
      const haystack = `${p.title} ${p.author} ${p.content} ${(
        p.tags ?? []
      ).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeTag]);

  const isFiltering = query.trim() !== "" || activeTag !== null;
  const featured = !isFiltering ? filtered[0] : null;
  const grid = featured ? filtered.slice(1) : filtered;

  return (
    <div className="container-page py-16 md:py-20">
      {/* Controles: búsqueda + tags */}
      <div className="flex flex-col gap-6">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian/50"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos…"
            aria-label="Buscar artículos"
            className="w-full rounded-pill border border-obsidian/20 bg-porcelain-warm/60 py-3.5 pl-11 pr-11 text-sm text-cape placeholder:text-obsidian/50 outline-none transition-colors focus:border-obsidian/50 focus:bg-porcelain"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-pill text-obsidian/60 transition-colors hover:bg-cape/5 hover:text-cape"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-pill border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                activeTag === null
                  ? "border-cape bg-cape text-porcelain"
                  : "border-obsidian/25 text-obsidian hover:border-obsidian/50 hover:text-cape",
              )}
            >
              Todos
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((cur) => (cur === tag ? null : tag))}
                className={cn(
                  "rounded-pill border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  activeTag === tag
                    ? "border-cape bg-cape text-porcelain"
                    : "border-obsidian/25 text-obsidian hover:border-obsidian/50 hover:text-cape",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="mt-12">
        {filtered.length === 0 ? (
          <EmptyState
            onReset={() => {
              setQuery("");
              setActiveTag(null);
            }}
          />
        ) : (
          <>
            {featured && <FeaturedCard post={featured} />}

            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${activeTag ?? "all"}-${query}`}
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cn(
                  "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                  featured && "mt-6",
                )}
              >
                {grid.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const img = cloudinaryTransform(post.bannerImage, FEATURED_IMG);
  const date = formatDate(postDate(post));
  const mins = readingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={post.title}
      className="group mb-2 grid overflow-hidden rounded-lg border border-obsidian/15 bg-porcelain-warm/50 transition-all duration-500 hover:border-obsidian/40 hover:shadow-[0_24px_60px_-28px_rgba(6,24,42,0.45)] focus-visible:ring-focus md:grid-cols-2"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cape-700 md:aspect-auto md:min-h-[340px]">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(78,111,134,0.5),rgba(10,37,54,1))]" />
        {img ? (
          <Image
            src={img}
            alt={post.title}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            priority
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-6xl font-medium text-mint/20">RY</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="eyebrow flex items-center gap-3 text-obsidian">
          <span className="h-px w-8 bg-obsidian" />
          Destacado
        </p>
        <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-cape text-balance md:text-display-md">
          {post.title}
        </h3>
        <p className="mt-4 max-w-prose text-pretty leading-relaxed text-obsidian/80">
          {excerpt(post.content, 200)}
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-obsidian">
          {post.author && <span>{post.author}</span>}
          {post.author && date && <span className="h-3 w-px bg-obsidian/30" />}
          {date && <span>{date}</span>}
          <span className="h-3 w-px bg-obsidian/30" />
          <span>{mins} min</span>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 self-start rounded-pill bg-cape px-6 py-3 font-mono text-eyebrow uppercase tracking-widest text-porcelain transition-colors group-hover:bg-cape-700">
          Leer artículo
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-dashed border-obsidian/25 px-8 py-16 text-center">
      <p className="font-serif text-2xl font-medium text-cape">
        Sin resultados
      </p>
      <p className="mt-3 text-pretty text-sm text-obsidian/70">
        No encontramos artículos que coincidan con tu búsqueda. Prueba con otro
        término o revisa todas las categorías.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-pill border border-obsidian/30 px-5 py-2.5 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-cape hover:text-porcelain"
      >
        Ver todos
      </button>
    </div>
  );
}
