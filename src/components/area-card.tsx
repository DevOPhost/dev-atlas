import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Area } from "@/lib/content-types";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { AreaIcon } from "./icons";

export function Difficulty({ value, locale }: { value: number; locale: Locale }) {
  const label = locale === "pt" ? "Dificuldade" : locale === "en" ? "Difficulty" : "Dificultad";
  return (
    <span className="difficulty" aria-label={`${label}: ${value}/5`}>
      {[1, 2, 3, 4, 5].map((item) => <i key={item} className={item <= value ? "on" : ""} />)}
    </span>
  );
}

export function AreaCard({ area, locale }: { area: Area; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Link className="area-card" href={`/${locale}/areas/${area.id}`} style={{ "--accent": area.accent } as React.CSSProperties}>
      <div className="card-top">
        <span className="icon-tile"><AreaIcon name={area.icon} /></span>
        <Difficulty value={area.difficulty} locale={locale} />
      </div>
      <h3>{t(area.name, locale)}</h3>
      <p>{t(area.description, locale)}</p>
      <span className="card-link">{dict.common.readMore}<ArrowUpRight size={15} /></span>
    </Link>
  );
}
