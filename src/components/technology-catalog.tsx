"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";
import { technologies } from "@/data/content";
import { levelLabel, t, technologyTypeLabel, type Locale } from "@/lib/i18n";
import { TechnologyLogo } from "./technology-logo";

export function TechnologyCatalog({ locale, initialType = "todas" }: { locale: Locale; initialType?: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(initialType);
  const fuse = useMemo(() => new Fuse(technologies, { keys: ["name", `description.${locale}`], threshold: .35 }), [locale]);
  const source = query ? fuse.search(query).map((result) => result.item) : technologies;
  const filters = useMemo(() => [
    { id: "todas", label: { pt: "Tudo", en: "All", es: "Todo" }, match: () => true },
    { id: "fundamentos", label: { pt: "Fundamentos", en: "Foundations", es: "Fundamentos" }, match: (item: (typeof technologies)[number]) => item.domains.includes("fundamentos") },
    { id: "linguagem", label: { pt: "Linguagens", en: "Languages", es: "Lenguajes" }, match: (item: (typeof technologies)[number]) => item.type === "linguagem" },
    { id: "frontend", label: { pt: "Front-end", en: "Front-end", es: "Front-end" }, match: (item: (typeof technologies)[number]) => item.domains.includes("frontend") },
    { id: "backend", label: { pt: "Back-end", en: "Back-end", es: "Back-end" }, match: (item: (typeof technologies)[number]) => item.domains.includes("backend") },
    { id: "dados-ia", label: { pt: "Dados e IA", en: "Data and AI", es: "Datos e IA" }, match: (item: (typeof technologies)[number]) => item.domains.includes("dados") || item.domains.includes("ia") },
    { id: "mobile", label: { pt: "Mobile", en: "Mobile", es: "Mobile" }, match: (item: (typeof technologies)[number]) => item.domains.includes("mobile") },
    { id: "infra", label: { pt: "Cloud e DevOps", en: "Cloud and DevOps", es: "Cloud y DevOps" }, match: (item: (typeof technologies)[number]) => item.domains.includes("cloud") || item.domains.includes("devops") },
    { id: "seguranca", label: { pt: "Segurança", en: "Security", es: "Seguridad" }, match: (item: (typeof technologies)[number]) => item.domains.includes("seguranca") },
    { id: "ux-ui", label: { pt: "UX/UI", en: "UX/UI", es: "UX/UI" }, match: (item: (typeof technologies)[number]) => item.domains.includes("ux-ui") }
  ], []);
  const activeFilter = filters.find((item) => item.id === filter) ?? filters[0];
  const visible = source.filter(activeFilter.match);

  return (
    <>
      <div className="filter-bar">
        <input className="catalog-search-input" aria-label={locale === "pt" ? "Buscar tecnologias" : locale === "en" ? "Search technologies" : "Buscar tecnologías"} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "pt" ? "Filtrar tecnologias…" : locale === "en" ? "Filter technologies…" : "Filtrar tecnologías…"} />
        {filters.map((item) => <button className={filter === item.id ? "filter-chip active" : "filter-chip"} type="button" onClick={() => setFilter(item.id)} key={item.id}>{item.label[locale]}</button>)}
      </div>
      <div className="technology-grid">{visible.map((item) => <Link className="technology-card" href={`/${locale}/tecnologias/${item.id}`} key={item.id}><span className="technology-icon-wrap"><TechnologyLogo id={item.id} size={31} /></span><div className="technology-card-copy"><span className="technology-kind">{technologyTypeLabel(item.type, locale)} · {levelLabel(item.level, locale)}</span><h2>{item.name}</h2><p>{t(item.description, locale)}</p></div><span className="technology-arrow" aria-hidden="true">↗</span></Link>)}</div>
      {!visible.length && <p className="empty-state">{locale === "pt" ? "Nenhuma tecnologia encontrada." : locale === "en" ? "No technology found." : "No se encontró ninguna tecnología."}</p>}
    </>
  );
}
