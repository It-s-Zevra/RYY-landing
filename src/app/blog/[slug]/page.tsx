import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MoveLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Prose } from "@/components/blog/Prose";
import { ShareBar } from "@/components/blog/ShareBar";
import { PostCard } from "@/components/blog/PostCard";
import {
  type BlogPost,
  cloudinaryTransform,
  excerpt,
  formatDate,
  getPostBySlug,
  getPublishedPosts,
  postDate,
  readingTime,
} from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;

const HERO_IMG = "c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      robots: { index: false, follow: true },
    };
  }

  const url = `${site.url}/blog/${post.slug}`;
  const description = excerpt(post.content, 200) || site.shortDescription;
  const image =
    cloudinaryTransform(post.bannerImage, "c_fill,g_auto,ar_1200:630,w_1200") ||
    site.ogImage;
  const published = postDate(post) ?? undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags?.length ? post.tags : undefined,
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      title: post.title,
      description,
      publishedTime: published,
      modifiedTime: post.lastEditedTime,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || (post.status && post.status !== "Published")) {
    notFound();
  }

  const all = await getPublishedPosts();
  const related = pickRelated(all, post, 3);

  const heroImg = cloudinaryTransform(post.bannerImage, HERO_IMG);
  const date = formatDate(postDate(post));
  const mins = readingTime(post.content);
  const url = `${site.url}/blog/${post.slug}`;

  return (
    <>
      <Navbar />
      <ArticleJsonLd post={post} url={url} />
      <main>
        {/* Hero — oscuro con banner */}
        <article>
          <header
            data-section-theme="dark"
            className="relative overflow-hidden bg-cape text-porcelain noise"
          >
            {heroImg && (
              <>
                <Image
                  src={heroImg}
                  alt=""
                  aria-hidden
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cape via-cape/85 to-cape/70" />
              </>
            )}
            <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(51,86,109,0.35),transparent_70%)]" />

            <div className="container-page relative z-10 pb-16 pt-32 md:pb-20 md:pt-44">
              <Link
                href="/blog"
                className="link-underline inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mint"
              >
                <MoveLeft className="h-3.5 w-3.5" />
                Volver a Insights
              </Link>

              {post.tags?.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-pill border border-mint/25 bg-cape/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mint backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mt-6 max-w-4xl font-serif text-display-lg font-medium leading-[1.07] text-balance">
                {post.title}
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-porcelain/70">
                {post.author && (
                  <>
                    <span className="text-mint">{post.author}</span>
                    <span className="h-3 w-px bg-mint/30" />
                  </>
                )}
                {date && (
                  <>
                    <span>{date}</span>
                    <span className="h-3 w-px bg-mint/30" />
                  </>
                )}
                <span>{mins} min de lectura</span>
              </div>
            </div>
          </header>

          {/* Cuerpo */}
          <section
            data-section-theme="light"
            className="relative bg-porcelain text-cape"
          >
            <div className="container-page py-16 md:py-24">
              <div className="mx-auto max-w-[720px]">
                <Prose content={post.content} />

                {/* Pie del artículo */}
                <footer className="mt-16 border-t border-obsidian/15 pt-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <ShareBar title={post.title} url={url} />
                    <Link
                      href="/blog"
                      className="link-underline inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cape"
                    >
                      <MoveLeft className="h-3.5 w-3.5" />
                      Todos los artículos
                    </Link>
                  </div>

                  {/* CTA */}
                  <div className="mt-10 rounded-lg border border-obsidian/15 bg-porcelain-warm/60 p-8 md:p-10">
                    <p className="eyebrow text-obsidian">¿Te surge una duda?</p>
                    <h2 className="mt-3 font-serif text-2xl font-medium text-cape text-balance md:text-3xl">
                      Conversemos tu caso con la cabeza fría.
                    </h2>
                    <p className="mt-3 max-w-xl text-pretty text-obsidian/75">
                      Agenda 30 minutos con el equipo de RY Legal. Sin
                      compromiso, sin letra chica.
                    </p>
                    <a
                      href={site.contact.booking}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-pill bg-cape px-6 py-3.5 font-mono text-eyebrow uppercase tracking-widest text-porcelain transition-colors hover:bg-cape-700"
                    >
                      Reunámonos · 30 min
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </footer>
              </div>
            </div>
          </section>
        </article>

        {/* Relacionados */}
        {related.length > 0 && (
          <section
            data-section-theme="light"
            className="relative border-t border-obsidian/10 bg-porcelain-warm/40 text-cape"
          >
            <div className="container-page py-16 md:py-24">
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-serif text-display-md font-medium text-balance">
                  Sigue leyendo
                </h2>
                <Link
                  href="/blog"
                  className="link-underline hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cape sm:inline-flex"
                >
                  Ver todo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

/** Relacionados: prioriza posts que comparten tags, completa con recientes. */
function pickRelated(all: BlogPost[], current: BlogPost, n: number): BlogPost[] {
  const others = all.filter((p) => p.id !== current.id && p.slug !== current.slug);
  const tags = new Set(current.tags ?? []);
  const scored = others
    .map((p) => ({
      post: p,
      shared: (p.tags ?? []).filter((t) => tags.has(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared);
  return scored.slice(0, n).map((s) => s.post);
}

function ArticleJsonLd({ post, url }: { post: BlogPost; url: string }) {
  const image =
    cloudinaryTransform(post.bannerImage, "c_fill,g_auto,ar_1200:630,w_1200") ||
    site.ogImage;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: excerpt(post.content, 200),
    image: [image],
    datePublished: postDate(post) ?? undefined,
    dateModified: post.lastEditedTime,
    inLanguage: site.locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags?.join(", "),
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: site.legalName },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: site.icon },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
