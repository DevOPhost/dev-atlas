"use client";

import { useMemo, useState } from "react";
import { areas } from "@/data/content";
import type { Locale } from "@/lib/i18n";
import { AreaCard } from "./area-card";

export function AreaCatalog({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState("todas");
  const categories = useMemo(() => ["todas", ...new Set(areas.map((item) => item.category))], []);
  const visible = category === "todas" ? areas : areas.filter((item) => item.category === category);
  const names: Record<string, string> = locale === "en"
    ? { todas: "All", desenvolvimento: "Development", dados: "Data", infraestrutura: "Infrastructure", seguranca: "Security", design: "Design", suporte: "Support" }
    : locale === "es"
      ? { todas: "Todas", desenvolvimento: "Desarrollo", dados: "Datos", infraestrutura: "Infraestructura", seguranca: "Seguridad", design: "Diseño", suporte: "Soporte" }
      : { todas: "Todas", desenvolvimento: "Desenvolvimento", dados: "Dados", infraestrutura: "Infraestrutura", seguranca: "Segurança", design: "Design", suporte: "Suporte" };

  return (
    <>
      <div
        className="filter-bar"
        aria-label={locale === "pt" ? "Filtrar por categoria" : locale === "en" ? "Filter by category" : "Filtrar por categoría"}
      >
        {categories.map((item) => <button type="button" className={category === item ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item)} key={item}>{names[item] ?? item}</button>)}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} resultados</p>
      <div className="area-grid">{visible.map((area) => <AreaCard key={area.id} area={area} locale={locale} />)}</div>
    </>
  );
}
