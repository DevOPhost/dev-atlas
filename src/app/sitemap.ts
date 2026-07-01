import type { MetadataRoute } from "next";
import { areas, projects, roadmaps, technologies } from "@/data/content";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/explorar",
    "/linguagens",
    "/carreira",
    "/areas",
    ...areas.map((item) => `/areas/${item.id}`),
    "/tecnologias",
    ...technologies.map((item) => `/tecnologias/${item.id}`),
    "/roadmaps",
    ...roadmaps.map((item) => `/roadmaps/${item.id}`),
    "/projetos",
    ...projects.map((item) => `/projetos/${item.id}`),
    "/glossario",
    "/comparar",
    "/quiz",
    "/sobre",
    "/acessibilidade"
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: new URL(`/${locale}${path}`, siteUrl).toString(),
      changeFrequency: "weekly" as const
    }))
  );
}
