import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { projects, roadmaps, technologies } from "@/data/content";
import { isLocale, levelLabel, t, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/metadata";
import { RoadmapProgress } from "@/components/roadmap-progress";

export function generateStaticParams() {
  return roadmaps.flatMap((item) => ["pt", "en", "es"].map((locale) => ({ locale, slug: item.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const roadmap = roadmaps.find((item) => item.id === slug);
  return roadmap ? {
    title: t(roadmap.title, locale),
    description: t(roadmap.description, locale),
    alternates: localizedAlternates(locale, `roadmaps/${roadmap.id}`)
  } : {};
}

export default async function RoadmapDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const roadmap = roadmaps.find((item) => item.id === slug);
  if (!roadmap) notFound();
  const relatedProjects = roadmap.projectIds.map((id) => projects.find((item) => item.id === id)).filter(Boolean);
  const relatedTechnologies = (roadmap.technologyIds ?? []).map((id) => technologies.find((item) => item.id === id)).filter(Boolean);
  const labels = locale === "pt"
    ? { roadmaps: "Roadmaps", projects: "Projetos para consolidar", pace: "Como avançar", level: "Nível", prerequisites: "Pré-requisitos", direction: "Esta trilha faz sentido para você?", technologies: "Tecnologias e fundamentos" }
    : locale === "en"
      ? { roadmaps: "Roadmaps", projects: "Projects to consolidate", pace: "How to move forward", level: "Level", prerequisites: "Prerequisites", direction: "Does this path fit you?", technologies: "Technologies and foundations" }
      : { roadmaps: "Roadmaps", projects: "Proyectos para consolidar", pace: "Cómo avanzar", level: "Nivel", prerequisites: "Requisitos", direction: "¿Esta ruta encaja contigo?", technologies: "Tecnologías y fundamentos" };
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: labels.roadmaps, href: `/${locale}/roadmaps` }, { label: t(roadmap.title, locale) }]} /><span className="eyebrow">{levelLabel(roadmap.level, locale)}</span><h1>{t(roadmap.title, locale)}</h1><p>{t(roadmap.description, locale)}</p></header><div className="detail-grid"><article>{roadmap.direction && <section className="roadmap-direction"><h2>{labels.direction}</h2><p>{t(roadmap.direction, locale)}</p></section>}<RoadmapProgress roadmapId={roadmap.id} steps={roadmap.steps} locale={locale} />{relatedProjects.length > 0 && <><h2>{labels.projects}</h2><div className="catalog-grid">{relatedProjects.map((item) => item && <Link className="content-card" href={`/${locale}/projetos/${item.id}`} key={item.id}><h3>{t(item.title, locale)}</h3><p>{t(item.recruiterSignal, locale)}</p></Link>)}</div></>}</article><aside className="detail-sidebar">{roadmap.prerequisites?.length && <div className="fact-card"><strong>{labels.prerequisites}</strong><ul>{roadmap.prerequisites.map((item) => <li key={t(item, locale)}>{t(item, locale)}</li>)}</ul></div>}{roadmap.pace && <div className="fact-card"><strong>{labels.pace}</strong><span>{t(roadmap.pace, locale)}</span></div>}<div className="fact-card"><strong>{labels.level}</strong><span className="tag">{levelLabel(roadmap.level, locale)}</span></div>{relatedTechnologies.length > 0 && <div className="fact-card"><strong>{labels.technologies}</strong><div className="tags">{relatedTechnologies.map((item) => item && <Link className="tag" href={`/${locale}/tecnologias/${item.id}`} key={item.id}>{item.name}</Link>)}</div></div>}</aside></div></div>;
}
