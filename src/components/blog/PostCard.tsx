import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  type BlogPost,
  cloudinaryTransform,
  excerpt,
  formatDate,
  postDate,
  readingTime,
} from "@/lib/blog";

const CARD_IMG = "c_fill,g_auto,ar_16:10,w_720,q_auto,f_auto";

export function PostCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const img = cloudinaryTransform(post.bannerImage, CARD_IMG);
  const date = formatDate(postDate(post));
  const mins = readingTime(post.content);
  const primaryTag = post.tags?.[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-obsidian/15 bg-porcelain-warm/50 transition-all duration-500 hover:-translate-y-1 hover:border-obsidian/40 hover:shadow-[0_20px_50px_-24px_rgba(6,24,42,0.4)]">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col focus-visible:ring-focus"
        aria-label={post.title}
      >
        {/* Banner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-cape-700">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(78,111,134,0.5),rgba(10,37,54,1))]" />
          {img ? (
            <Image
              src={img}
              alt={post.title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-5xl font-medium text-mint/20">
                RY
              </span>
            </div>
          )}
          {primaryTag && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-pill border border-mint/25 bg-cape/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mint backdrop-blur">
              {primaryTag}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-obsidian">
            {date && <span>{date}</span>}
            {date && <span className="h-3 w-px bg-obsidian/30" />}
            <span>{mins} min de lectura</span>
          </div>

          <h3 className="mt-4 font-serif text-xl font-medium leading-snug text-cape text-balance md:text-2xl">
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-obsidian/80">
            {excerpt(post.content, 150)}
          </p>

          <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-eyebrow uppercase tracking-widest text-cape">
            Leer artículo
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
