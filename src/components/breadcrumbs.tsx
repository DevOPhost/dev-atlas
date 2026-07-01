import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label={locale === "pt" ? "Caminho da página" : locale === "en" ? "Breadcrumb" : "Ruta de la página"}>
      <Link href={`/${locale}`}>DevAtlas</Link>
      {items.map((item) => item.href
        ? <span key={item.label}><Link href={item.href}>{item.label}</Link></span>
        : <span key={item.label} aria-current="page">{item.label}</span>)}
    </nav>
  );
}
