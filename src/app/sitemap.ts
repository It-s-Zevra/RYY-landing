import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sections = ["#servicios", "#proceso", "#insights", "#contacto"];

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
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
  ];
}
