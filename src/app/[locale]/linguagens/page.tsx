import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TechnologyCatalog } from "@/components/technology-catalog";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function LanguagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt"
    ? ["Linguagens de programação", "Escolha pela área e pelo problema — não por um ranking.", "Uma linguagem é uma ferramenta de trabalho. Veja onde ela aparece, o ecossistema ao redor e o tipo de projeto que ajuda a construir."]
    : locale === "en"
      ? ["Programming languages", "Choose by field and problem—not by ranking.", "A language is a working tool. See where it appears, its ecosystem and the kind of project it helps build."]
      : ["Lenguajes de programación", "Elige por área y problema, no por un ranking.", "Un lenguaje es una herramienta de trabajo. Mira dónde aparece, su ecosistema y qué proyectos ayuda a construir."];
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><section className="catalog-page-section compact"><TechnologyCatalog locale={locale} initialType="linguagem" /></section></div>;
}
