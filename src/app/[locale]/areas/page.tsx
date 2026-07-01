import { notFound } from "next/navigation";
import { AreaCatalog } from "@/components/area-catalog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function AreasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt"
    ? ["Áreas de atuação", "Dez territórios, rotinas bem diferentes.", "Compare o trabalho cotidiano, a base técnica e o tipo de problema de cada área. Escolha com contexto, não pelo hype."]
    : locale === "en"
      ? ["Technology fields", "Ten territories, very different routines.", "Compare daily work, technical foundations and problem types. Choose with context, not hype."]
      : ["Áreas de tecnología", "Diez territorios, rutinas muy diferentes.", "Compara el trabajo diario, las bases técnicas y el tipo de problema. Elige con contexto, no por moda."];
  return (
    <div className="page-shell">
      <header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header>
      <section className="catalog-page-section compact"><AreaCatalog locale={locale} /></section>
    </div>
  );
}
