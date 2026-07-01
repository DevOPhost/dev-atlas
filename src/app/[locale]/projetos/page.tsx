import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { areas, projects } from "@/data/content";
import { isLocale, levelLabel, t, type Locale } from "@/lib/i18n";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt" ? ["Projetos", "Portfólio bom mostra decisões, não quantidade.", "Escolha um problema pequeno, entregue bem e conte o que você decidiu. Cada proposta abaixo tem um sinal profissional claro."] : locale === "en" ? ["Projects", "A good portfolio shows decisions, not volume.", "Choose a small problem, deliver it well and explain your decisions. Each idea below has a clear professional signal."] : ["Proyectos", "Un buen portafolio muestra decisiones, no cantidad.", "Elige un problema pequeño, entrégalo bien y explica tus decisiones. Cada idea tiene una señal profesional clara."];
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><section className="catalog-grid catalog-page-section">{projects.map((item) => { const area = areas.find((candidate) => candidate.id === item.areaId); return <Link className="content-card" href={`/${locale}/projetos/${item.id}`} key={item.id}><div className="meta">{area ? t(area.name, locale) : item.areaId} · {levelLabel(item.level, locale)}</div><h2>{t(item.title, locale)}</h2><p>{t(item.recruiterSignal, locale)}</p><div className="tags">{item.stack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div></Link>; })}</section></div>;
}
