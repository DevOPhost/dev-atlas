import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { collections } from "@/data/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt" ? ["Explorar", "Todo o atlas em uma página.", "Escolha pelo tipo de conteúdo. A busca no topo atravessa todas estas coleções."] : locale === "en" ? ["Explore", "The entire atlas on one page.", "Choose by content type. Global search spans all these collections."] : ["Explorar", "Todo el atlas en una página.", "Elige por tipo de contenido. La búsqueda global recorre todas estas colecciones."];
  const routes: Record<string, string> = { areas: "areas", technologies: "tecnologias", languages: "linguagens", frameworks: "tecnologias", tools: "tecnologias", databases: "tecnologias", cloudServices: "tecnologias", careerPaths: "carreira", roadmaps: "roadmaps", projects: "projetos", certifications: "carreira", glossary: "glossario", comparisons: "comparar", learningTracks: "roadmaps" };
  const names: Record<string, Record<Locale, string>> = {
    areas: { pt: "Áreas", en: "Fields", es: "Áreas" },
    technologies: { pt: "Tecnologias", en: "Technologies", es: "Tecnologías" },
    languages: { pt: "Linguagens", en: "Languages", es: "Lenguajes" },
    frameworks: { pt: "Frameworks e bibliotecas", en: "Frameworks and libraries", es: "Frameworks y bibliotecas" },
    tools: { pt: "Ferramentas", en: "Tools", es: "Herramientas" },
    databases: { pt: "Bancos de dados", en: "Databases", es: "Bases de datos" },
    cloudServices: { pt: "Cloud", en: "Cloud", es: "Cloud" },
    careerPaths: { pt: "Caminhos de carreira", en: "Career paths", es: "Rutas de carrera" },
    roadmaps: { pt: "Roadmaps", en: "Roadmaps", es: "Roadmaps" },
    projects: { pt: "Projetos", en: "Projects", es: "Proyectos" },
    certifications: { pt: "Certificações", en: "Certifications", es: "Certificaciones" },
    glossary: { pt: "Glossário", en: "Glossary", es: "Glosario" },
    comparisons: { pt: "Comparações", en: "Comparisons", es: "Comparaciones" },
    learningTracks: { pt: "Trilhas de aprendizagem", en: "Learning paths", es: "Rutas de aprendizaje" }
  };
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><section className="catalog-grid catalog-page-section">{Object.entries(collections).map(([name, items]) => <Link className="content-card" href={`/${locale}/${routes[name] ?? "sobre"}#${name}`} key={name}><div className="meta">{locale === "pt" ? "coleção" : locale === "en" ? "collection" : "colección"}</div><h2>{names[name]?.[locale] ?? name}</h2><p>{items.length} {locale === "en" ? "structured records" : locale === "es" ? "registros estructurados" : "registros estruturados"}</p></Link>)}</section></div>;
}
