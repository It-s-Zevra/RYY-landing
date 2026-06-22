import { site } from "@/lib/site";

/**
 * Cliente del blog de RY Legal.
 *
 * Backend: Express 5 + Notion (base de datos) + Cloudinary (imágenes).
 * Ver API_FRONTEND.md para el contrato completo.
 *
 * La URL base se configura con la variable de entorno `BLOG_API_URL`
 * (ej. la URL de Railway en producción). En local cae a localhost:3000.
 * Todas las lecturas se hacen del lado del servidor con ISR.
 */

const BASE = (process.env.BLOG_API_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const API = `${BASE}/api/v1`;

/** Revalidación por defecto (segundos) para el caché de Next. */
const REVALIDATE = 300;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  bannerImage: string | null;
  publicationDate: string | null;
  status: string | null;
  tags: string[];
  content: string;
  createdTime: string;
  lastEditedTime: string;
  url: string;
};

type ListResponse = {
  status: "success" | "error";
  data?: BlogPost[];
  nextCursor?: string | null;
  hasMore?: boolean;
};

type SingleResponse = {
  status: "success" | "error";
  data?: BlogPost;
};

export type ListParams = {
  status?: string;
  tag?: string;
  author?: string;
  q?: string;
  pageSize?: number;
  cursor?: string;
  sort?:
    | "date_desc"
    | "date_asc"
    | "created_desc"
    | "created_asc"
    | "title_asc";
};

/** Fetch seguro: nunca lanza, devuelve null ante cualquier fallo de red/API. */
async function safeJson<T>(
  path: string,
  revalidate = REVALIDATE,
): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function buildQuery(params: ListParams = {}): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    qs.set(key, String(value));
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}

/** Lista una página de posts. */
export async function listPosts(params: ListParams = {}): Promise<{
  posts: BlogPost[];
  nextCursor: string | null;
  hasMore: boolean;
}> {
  const json = await safeJson<ListResponse>(`/posts${buildQuery(params)}`);
  if (!json || json.status !== "success" || !Array.isArray(json.data)) {
    return { posts: [], nextCursor: null, hasMore: false };
  }
  return {
    posts: json.data,
    nextCursor: json.nextCursor ?? null,
    hasMore: Boolean(json.hasMore),
  };
}

/**
 * Trae todos los posts publicados (recorre el cursor).
 * Pensado para la grilla del blog, que filtra/busca del lado del cliente.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const all: BlogPost[] = [];
  let cursor: string | undefined;
  // Límite de seguridad para no iterar de más.
  for (let i = 0; i < 20; i++) {
    const { posts, nextCursor, hasMore } = await listPosts({
      status: "Published",
      pageSize: 50,
      sort: "date_desc",
      cursor,
    });
    all.push(...posts);
    if (!hasMore || !nextCursor) break;
    cursor = nextCursor;
  }
  return all;
}

/** Los N posts publicados más recientes (para la home). */
export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  const { posts } = await listPosts({
    status: "Published",
    pageSize: limit,
    sort: "date_desc",
  });
  return posts;
}

/** Un post por su slug. Devuelve null si no existe. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const json = await safeJson<SingleResponse>(
    `/posts/slug/${encodeURIComponent(slug)}`,
  );
  if (!json || json.status !== "success" || !json.data) return null;
  return json.data;
}

/* ── Helpers de presentación ──────────────────────────────────────────── */

/** Fecha efectiva del post (publicación o creación como respaldo). */
export function postDate(post: BlogPost): string | null {
  return post.publicationDate || post.createdTime || null;
}

const dateFmt = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "20 de junio de 2026" — devuelve "" si no hay fecha válida. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return dateFmt.format(d);
}

/** Tiempo de lectura estimado en minutos (≈ 200 palabras/min). */
export function readingTime(content: string): number {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Extracto corto a partir del contenido, sin cortar palabras a la mitad. */
export function excerpt(content: string, max = 160): string {
  const clean = (content || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 40 ? lastSpace : max)}…`;
}

/** Transforma una URL de Cloudinary para servir una versión optimizada. */
export function cloudinaryTransform(
  url: string | null,
  transform: string,
): string | null {
  if (!url) return null;
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

export const blogMeta = {
  /** Imagen de respaldo para posts sin banner / OG. */
  fallbackOg: site.ogImage,
};
