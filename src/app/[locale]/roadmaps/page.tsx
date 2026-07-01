import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { roadmaps } from "@/data/content";
import { isLocale, levelLabel, t, type Locale } from "@/lib/i18n";

export default async function RoadmapsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt" ? ["Roadmaps", "Uma sequência para estudar sem andar em círculos.", "Não são calendários rígidos. São decisões sobre ordem, prática e o que precisa estar sólido antes da próxima etapa."] : locale === "en" ? ["Roadmaps", "A sequence for learning without going in circles.", "Not rigid calendars: decisions about order, practice and what should be solid before moving on."] : ["Roadmaps", "Una secuencia para estudiar sin dar vueltas.", "No son calendarios rígidos: son decisiones de orden, práctica y criterios para avanzar."];
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><section className="catalog-grid catalog-page-section">{roadmaps.map((item) => <Link className="content-card" href={`/${locale}/roadmaps/${item.id}`} key={item.id}><div className="meta">{levelLabel(item.level, locale)} · {item.steps.length} {locale === "en" ? "stages" : "etapas"}</div><h2>{t(item.title, locale)}</h2><p>{t(item.description, locale)}</p><div className="tags"><span className="tag">{locale === "pt" ? "Avance por domínio" : locale === "en" ? "Progress by mastery" : "Avanza por dominio"}</span><span className="tag">{item.projectIds.length} {locale === "en" ? "projects" : locale === "es" ? "proyectos" : "projetos"}</span></div></Link>)}</section></div>;
}
