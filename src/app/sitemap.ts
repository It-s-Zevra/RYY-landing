import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sections = ["#equipo", "#servicios", "#proceso", "#insights", "#contacto"];

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...sections.map((s) => ({
      url: `${site.url}/${s}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
