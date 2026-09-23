import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Maranatha",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F6FA",
    theme_color: "#101B45",
    lang: "es",
  };
}
