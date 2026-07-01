"use client";

import { ArrowUpRight, Check, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Technology } from "@/lib/content-types";
import { levelLabel, t, technologyTypeLabel, type Locale } from "@/lib/i18n";
import { TechnologyLogo } from "./technology-logo";
import { trapFocus } from "@/lib/focus";

export function AreaTechnologyExplorer({
  technologies,
  locale
}: {
  technologies: Technology[];
  locale: Locale;
}) {
  const [selected, setSelected] = useState<Technology | null>(null);
  const [filter, setFilter] = useState("todas");
  const [query, setQuery] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const labels = locale === "pt"
    ? { title: "Tecnologias desta área", intro: "Clique em qualquer tecnologia para ver onde ela entra, quando usar e o que estudar como alternativa.", search: "Filtrar tecnologias", all: "Todas", use: "Quando faz sentido", avoid: "Quando evitar", alternatives: "Alternativas", page: "Abrir guia completo", close: "Fechar ficha", items: "tecnologias" }
    : locale === "en"
      ? { title: "Technologies in this field", intro: "Select any technology to see where it fits, when to use it and what alternatives to study.", search: "Filter technologies", all: "All", use: "When it fits", avoid: "When to avoid", alternatives: "Alternatives", page: "Open full guide", close: "Close details", items: "technologies" }
      : { title: "Tecnologías de esta área", intro: "Selecciona una tecnología para saber dónde encaja, cuándo usarla y qué alternativas estudiar.", search: "Filtrar tecnologías", all: "Todas", use: "Cuándo conviene", avoid: "Cuándo evitar", alternatives: "Alternativas", page: "Abrir guía completa", close: "Cerrar ficha", items: "tecnologías" };
  const types = useMemo(() => [...new Set(technologies.map((item) => item.type))], [technologies]);
  const visible = technologies.filter((item) =>
    (filter === "todas" || item.type === filter)
    && (!query || `${item.name} ${t(item.description, locale)}`.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const openTechnology = (technology: Technology, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelected(technology);
  };
  const closeSheet = () => {
    setSelected(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <section className="area-tech-section" aria-labelledby="area-tech-title">
      <div className="area-tech-heading">
        <div><span className="eyebrow">{technologies.length} {labels.items}</span><h2 id="area-tech-title">{labels.title}</h2><p>{labels.intro}</p></div>
        <label className="area-tech-search"><Search size={16} /><span className="sr-only">{labels.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} /></label>
      </div>
      <div className="area-tech-filters" aria-label={locale === "pt" ? "Tipos de tecnologia" : locale === "en" ? "Technology types" : "Tipos de tecnología"}>
        <button className={filter === "todas" ? "active" : ""} onClick={() => setFilter("todas")}>{labels.all}</button>
        {types.map((type) => <button className={filter === type ? "active" : ""} onClick={() => setFilter(type)} key={type}>{technologyTypeLabel(type, locale)}</button>)}
      </div>
      <div className="area-tech-grid">
        {visible.map((technology) => (
          <button className="area-tech-item" onClick={(event) => openTechnology(technology, event.currentTarget)} type="button" key={technology.id}>
            <span className="area-tech-logo"><TechnologyLogo id={technology.id} size={34} /></span>
            <span><strong>{technology.name}</strong><small>{technologyTypeLabel(technology.type, locale)}</small></span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      {selected && (
        <div className="tech-sheet-backdrop" role="presentation" onMouseDown={closeSheet}>
          <aside ref={sheetRef} className="tech-sheet" role="dialog" aria-modal="true" aria-labelledby="tech-sheet-title" onKeyDown={(event) => trapFocus(event, sheetRef.current)} onMouseDown={(event) => event.stopPropagation()}>
            <div className="tech-sheet-top">
              <span className="technology-icon-large"><TechnologyLogo id={selected.id} size={48} /></span>
              <button ref={closeRef} className="icon-button" type="button" onClick={closeSheet} aria-label={labels.close}><X size={19} /></button>
            </div>
            <span className="technology-kind">{technologyTypeLabel(selected.type, locale)} · {levelLabel(selected.level, locale)}</span>
            <h2 id="tech-sheet-title">{selected.name}</h2>
            <p className="tech-sheet-lead">{t(selected.description, locale)}</p>
            <div className="tech-sheet-section"><h3><Check size={16} />{labels.use}</h3><p>{t(selected.useWhen, locale)}</p></div>
            <div className="tech-sheet-section caution"><h3>{labels.avoid}</h3><p>{t(selected.avoidWhen, locale)}</p></div>
            {selected.alternatives.length > 0 && <div className="tech-sheet-section"><h3>{labels.alternatives}</h3><div className="tags">{selected.alternatives.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>}
            <Link className="button" href={`/${locale}/tecnologias/${selected.id}`}>{labels.page}<ArrowUpRight size={16} /></Link>
          </aside>
        </div>
      )}
    </section>
  );
}
