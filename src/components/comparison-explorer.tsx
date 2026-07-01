"use client";

import Link from "next/link";
import { useState } from "react";
import type { Area } from "@/lib/content-types";
import { roleLabel, t, type Locale } from "@/lib/i18n";
import { AreaIcon } from "./icons";

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <span className="comparison-meter" aria-label={`${label}: ${value}/5`}>
      <i style={{ "--meter-value": `${value * 20}%` } as React.CSSProperties} />
      <small>{value}/5</small>
    </span>
  );
}

export function ComparisonExplorer({ areas, locale }: { areas: Area[]; locale: Locale }) {
  const [selected, setSelected] = useState(areas.slice(0, 3).map((area) => area.id));
  const labels = locale === "pt"
    ? { choose: "Escolha de duas a quatro áreas", hint: "A comparação muda na hora. Os indicadores são editoriais e servem para orientar perguntas, não para prometer uma carreira.", entry: "Entrada", remote: "Trabalho remoto", freelance: "Freelancer", math: "Matemática", roles: "Cargos frequentes", open: "Abrir área" }
    : locale === "en"
      ? { choose: "Choose two to four fields", hint: "The comparison updates instantly. Indicators are editorial guidance, not career promises.", entry: "Entry", remote: "Remote work", freelance: "Freelancing", math: "Math", roles: "Common roles", open: "Open field" }
      : { choose: "Elige de dos a cuatro áreas", hint: "La comparación cambia al instante. Los indicadores orientan preguntas; no prometen una carrera.", entry: "Entrada", remote: "Trabajo remoto", freelance: "Freelance", math: "Matemáticas", roles: "Puestos frecuentes", open: "Abrir área" };
  const scale = { baixo: 1, baixa: 1, medio: 3, media: 3, alto: 5, alta: 5 } as Record<string, number>;
  const visible = selected.map((id) => areas.find((area) => area.id === id)).filter((area): area is Area => Boolean(area));

  const toggle = (id: string) => {
    setSelected((current) => {
      if (current.includes(id)) return current.length > 2 ? current.filter((item) => item !== id) : current;
      return current.length < 4 ? [...current, id] : [...current.slice(1), id];
    });
  };

  return (
    <section className="comparison-explorer">
      <div className="comparison-picker">
        <div><strong>{labels.choose}</strong><p>{labels.hint}</p></div>
        <div className="comparison-chips">
          {areas.map((area) => (
            <button
              type="button"
              aria-pressed={selected.includes(area.id)}
              className={selected.includes(area.id) ? "is-selected" : ""}
              onClick={() => toggle(area.id)}
              key={area.id}
            >
              <span style={{ background: area.accent }} />
              {t(area.name, locale)}
            </button>
          ))}
        </div>
      </div>
      <div className="comparison-cards">
        {visible.map((area) => (
          <article className="comparison-card" style={{ "--area-accent": area.accent } as React.CSSProperties} key={area.id}>
            <span className="comparison-card-icon"><AreaIcon name={area.icon} /></span>
            <h2>{t(area.name, locale)}</h2>
            <p>{t(area.description, locale)}</p>
            <div className="comparison-facts">
              <div><span>{labels.entry}</span><Meter value={area.difficulty} label={labels.entry} /></div>
              <div><span>{labels.remote}</span><Meter value={scale[area.remote]} label={labels.remote} /></div>
              <div><span>{labels.freelance}</span><Meter value={scale[area.freelance]} label={labels.freelance} /></div>
              <div><span>{labels.math}</span><Meter value={scale[area.math]} label={labels.math} /></div>
            </div>
            <div className="tags">{area.roles.slice(0, 2).map((role) => <span className="tag" key={role}>{roleLabel(role, locale)}</span>)}</div>
            <Link href={`/${locale}/areas/${area.id}`}>{labels.open} <span aria-hidden="true">↗</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
