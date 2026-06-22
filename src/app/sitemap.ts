import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedPosts, postDate } from "@/lib/blog";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const sections = ["#servicios", "#proceso", "#contacto"];

  const posts = await getPublishedPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => {
    const d = postDate(p) ?? p.lastEditedTime;
    return {
      url: `${site.url}/blog/${p.slug}`,
      lastModified: d ? new Date(d) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...sections.map((s) => ({
      url: `${site.url}/${s}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogEntries,
  ];
}
