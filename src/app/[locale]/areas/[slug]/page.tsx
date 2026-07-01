import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AreaIcon } from "@/components/icons";
import { AreaTechnologyExplorer } from "@/components/area-technology-explorer";
import { areas, projects, roadmaps, technologies } from "@/data/content";
import { isLocale, roleLabel, scaleLabel, t, type Locale } from "@/lib/i18n";
import { localizedAlternates } from "@/lib/metadata";
import { areaGuides } from "@/data/area-guides";

export function generateStaticParams() {
  return areas.flatMap((area) => ["pt", "en", "es"].map((locale) => ({ locale, slug: area.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const area = areas.find((item) => item.id === slug);
  return area ? {
    title: t(area.name, rawLocale),
    description: t(area.description, rawLocale),
    alternates: localizedAlternates(rawLocale, `areas/${area.id}`)
  } : {};
}

export default async function AreaDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const area = areas.find((item) => item.id === slug);
  if (!area) notFound();
  const guide = areaGuides[area.id];
  const explicitIds = new Set(area.technologies);
  const relatedTech = technologies.filter((item) => item.areaIds.includes(area.id) || explicitIds.has(item.id));
  const relatedProjects = projects.filter((item) => item.areaId === area.id);
  const roadmap = roadmaps.find((item) => item.areaId === area.id);
  const label = locale === "pt"
    ? { areas: "Áreas", fit: "Para quem esta área faz sentido", watch: "O que costuma ser subestimado", evidence: "Uma boa evidência de prática", what: "O que você realmente faz", base: "Base que vale construir", start: "Um primeiro projeto com sentido", roles: "Cargos comuns", tech: "Tecnologias da rotina", facts: "Visão rápida", difficult: "Dificuldade de entrada", remote: "Trabalho remoto", freelance: "Freelancer", math: "Matemática", related: "Áreas próximas", roadmap: "Seguir o roadmap" }
    : locale === "en"
      ? { areas: "Fields", fit: "Who this field may fit", watch: "What people tend to underestimate", evidence: "A useful piece of evidence", what: "What you actually do", base: "A foundation worth building", start: "A meaningful first project", roles: "Common roles", tech: "Everyday technologies", facts: "At a glance", difficult: "Entry difficulty", remote: "Remote work", freelance: "Freelancing", math: "Math", related: "Related fields", roadmap: "Follow the roadmap" }
      : { areas: "Áreas", fit: "Para quién puede encajar esta área", watch: "Lo que suele subestimarse", evidence: "Una buena evidencia de práctica", what: "Lo que realmente haces", base: "Una base que vale construir", start: "Un primer proyecto con sentido", roles: "Puestos comunes", tech: "Tecnologías cotidianas", facts: "Vista rápida", difficult: "Dificultad de entrada", remote: "Trabajo remoto", freelance: "Freelance", math: "Matemáticas", related: "Áreas cercanas", roadmap: "Seguir el roadmap" };

  return (
    <div className="page-shell">
      <header className="page-hero">
        <Breadcrumbs locale={locale} items={[{ label: label.areas, href: `/${locale}/areas` }, { label: t(area.name, locale) }]} />
        <span className="eyebrow">{t(area.eyebrow, locale)}</span>
        <h1>{t(area.name, locale)}</h1><p>{t(area.longDescription, locale)}</p>
      </header>
      <div className="detail-grid">
        <article className="prose">
          {guide && <section className="area-editorial-grid"><div><span className="section-kicker">{label.fit}</span><p>{t(guide.fits, locale)}</p></div><div><span className="section-kicker">{label.watch}</span><p>{t(guide.watchOut, locale)}</p></div><div><span className="section-kicker">{label.evidence}</span><p>{t(guide.evidence, locale)}</p></div></section>}
          <h2>{label.what}</h2>
          <ul>{area.routine.map((item) => <li key={t(item, locale)}><CheckCircle2 size={16} style={{ color: area.accent, marginRight: 8, verticalAlign: "-3px" }} />{t(item, locale)}</li>)}</ul>
          <h2>{label.base}</h2>
          <p>{locale === "pt" ? "Use estes eixos para avaliar cursos e projetos. Eles precisam aparecer na prática, não apenas como palavras no currículo." : locale === "en" ? "Use these areas to evaluate courses and projects. They should show up in your work, not only as résumé keywords." : "Usa estos ejes para evaluar cursos y proyectos. Deben aparecer en la práctica, no solo como palabras en el currículum."}</p>
          <div className="skill-list">{area.skills.map((item, index) => <div className="skill-item" key={t(item, locale)}><span>0{index + 1}</span><h3>{t(item, locale)}</h3></div>)}</div>
          <h2>{label.start}</h2><p>{t(area.firstProject, locale)}.</p>
          <h2>{label.roles}</h2><div className="tags">{area.roles.map((role) => <span className="tag" key={role}>{roleLabel(role, locale)}</span>)}</div>
          <AreaTechnologyExplorer technologies={relatedTech} locale={locale} />
          {relatedProjects.length > 0 && <><h2>{locale === "pt" ? "Projeto recomendado" : locale === "en" ? "Recommended project" : "Proyecto recomendado"}</h2>{relatedProjects.map((item) => <Link className="content-card" style={{ display: "block" }} href={`/${locale}/projetos/${item.id}`} key={item.id}><h3>{t(item.title, locale)}</h3><p>{t(item.recruiterSignal, locale)}</p></Link>)}</>}
        </article>
        <aside className="detail-sidebar">
          <div className="fact-card" style={{ "--accent": area.accent } as React.CSSProperties}><span className="icon-tile"><AreaIcon name={area.icon} size={25} /></span><h3 style={{ marginBottom: 0 }}>{t(area.name, locale)}</h3></div>
          <div className="fact-card"><strong>{label.facts}</strong><div className="fact-list"><div className="fact-row"><span>{label.difficult}</span><b>{area.difficulty}/5</b></div><div className="fact-row"><span>{label.remote}</span><b>{scaleLabel(area.remote, locale)}</b></div><div className="fact-row"><span>{label.freelance}</span><b>{scaleLabel(area.freelance, locale)}</b></div><div className="fact-row"><span>{label.math}</span><b>{scaleLabel(area.math, locale)}</b></div></div></div>
          {roadmap && <Link className="button" style={{ width: "100%" }} href={`/${locale}/roadmaps/${roadmap.id}`}>{label.roadmap}<ArrowRight size={16} /></Link>}
        </aside>
      </div>
    </div>
  );
}
