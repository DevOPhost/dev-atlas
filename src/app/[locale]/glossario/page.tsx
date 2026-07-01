import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GlossaryList } from "@/components/glossary-list";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt" ? ["Glossário", "Traduzindo o dialeto da tecnologia.", "Uma definição curta para se localizar e outra técnica para quando você precisar conversar com precisão."] : locale === "en" ? ["Glossary", "Translating the dialect of technology.", "A short definition to get oriented and a technical one for precise conversations."] : ["Glosario", "Traduciendo el dialecto de la tecnología.", "Una definición breve para ubicarte y otra técnica para conversar con precisión."];
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><GlossaryList locale={locale} /></div>;
}
