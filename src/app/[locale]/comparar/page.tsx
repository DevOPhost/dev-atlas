import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { areas } from "@/data/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { ComparisonExplorer } from "@/components/comparison-explorer";

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt"
    ? { label: "Comparador", title: "Olhe para o trabalho, não só para o salário.", intro: "Esta matriz é direcional: equipes e empresas mudam bastante. Use-a para levantar perguntas melhores, não para eliminar caminhos." }
    : locale === "en"
      ? { label: "Comparison", title: "Look at the work, not just the salary.", intro: "This matrix is directional: teams and companies vary widely. Use it to ask better questions, not eliminate paths." }
      : { label: "Comparador", title: "Mira el trabajo, no solo el salario.", intro: "Esta matriz es orientativa: equipos y empresas varían mucho. Úsala para hacer mejores preguntas, no para eliminar caminos." };
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c.label }]} /><span className="eyebrow">{c.label}</span><h1>{c.title}</h1><p>{c.intro}</p></header><ComparisonExplorer areas={areas} locale={locale} /></div>;
}
