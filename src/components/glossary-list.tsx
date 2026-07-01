"use client";

import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import Link from "next/link";
import { areas, glossary, technologies } from "@/data/content";
import { t, type Locale } from "@/lib/i18n";

export function GlossaryList({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(() => new Fuse(glossary, { keys: ["term", `simple.${locale}`, `technical.${locale}`], threshold: .35 }), [locale]);
  const visible = query ? fuse.search(query).map((item) => item.item) : glossary;
  const labels = locale === "pt"
    ? { technical: "Em termos técnicos", example: "Exemplo", related: "Relacionado a" }
    : locale === "en"
      ? { technical: "In technical terms", example: "Example", related: "Related to" }
      : { technical: "En términos técnicos", example: "Ejemplo", related: "Relacionado con" };
  return <>
    <div className="filter-bar"><input className="glossary-search-input" aria-label={locale === "pt" ? "Pesquisar glossário" : locale === "en" ? "Search glossary" : "Buscar en el glosario"} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "pt" ? "Pesquisar um termo…" : locale === "en" ? "Search a term…" : "Buscar un término…"} /></div>
    <p className="result-count" aria-live="polite">{visible.length} {locale === "en" ? "terms" : locale === "es" ? "términos" : "termos"}</p>
    <div className="glossary-list">{visible.map((item) => {
      const relatedTechnologies = (item.technologyIds ?? []).map((id) => technologies.find((technology) => technology.id === id)).filter(Boolean);
      const relatedAreas = item.areaIds.map((id) => areas.find((area) => area.id === id)).filter(Boolean);
      return <article className="glossary-entry" id={item.id} key={item.id}><h2>{item.term}</h2><div><p className="glossary-simple"><strong>{t(item.simple, locale)}</strong></p><h3>{labels.technical}</h3><p>{t(item.technical, locale)}</p><p className="example"><strong>{labels.example}:</strong> {t(item.example, locale)}</p>{(relatedTechnologies.length > 0 || relatedAreas.length > 0) && <div className="glossary-relations"><strong>{labels.related}</strong><div className="tags">{relatedTechnologies.map((technology) => technology && <Link className="tag" href={`/${locale}/tecnologias/${technology.id}`} key={technology.id}>{technology.name}</Link>)}{relatedAreas.map((area) => area && <Link className="tag" href={`/${locale}/areas/${area.id}`} key={area.id}>{t(area.name, locale)}</Link>)}</div></div>}</div></article>;
    })}</div>
  </>;
}
