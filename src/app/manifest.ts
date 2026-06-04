import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0A2536",
    theme_color: "#0A2536",
    lang: site.locale,
    orientation: "portrait-primary",
    icons: [
      {
        src: site.icon,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: site.icon,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: site.icon,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "legal", "professional services"],
  };
}
