import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TechnologyCatalog } from "@/components/technology-catalog";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function TechnologiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt" ? ["Tecnologias", "Um catálogo com contexto, não uma lista de logos.", "Veja onde cada tecnologia entra, quando faz sentido e quais alternativas resolvem problemas parecidos."] : locale === "en" ? ["Technologies", "A catalog with context, not a logo wall.", "See where each technology fits, when it makes sense and which alternatives solve similar problems."] : ["Tecnologías", "Un catálogo con contexto, no una pared de logos.", "Descubre dónde entra cada tecnología, cuándo conviene y qué alternativas resuelven problemas similares."];
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><section className="catalog-page-section compact"><TechnologyCatalog locale={locale} /></section></div>;
}
