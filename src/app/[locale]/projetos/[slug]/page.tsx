import type { Metadata } from "next";
import { CheckCircle2, CircleAlert, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { areas, projects } from "@/data/content";
import { isLocale, levelLabel, t, type Locale } from "@/lib/i18n";
import { localizedAlternates } from "@/lib/metadata";
import type { Localized } from "@/lib/i18n";

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ["pt", "en", "es"].map((locale) => ({ locale, slug: project.id }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = projects.find((item) => item.id === slug);
  return project
    ? {
        title: t(project.title, locale),
        description: t(project.description, locale),
        alternates: localizedAlternates(locale, `projetos/${project.id}`)
      }
    : {};
}

const copy = {
  pt: {
    projects: "Projetos",
    objective: "Objetivo",
    problem: "Problema que o projeto enfrenta",
    build: "O que construir",
    avoid: "O que evitar",
    differentials: "Diferenciais que fazem sentido",
    proof: "Como demonstrar profissionalismo",
    portfolio: "Por que vale para o portfólio",
    presentation: "Como apresentar",
    stack: "Stack sugerida",
    scope: "Escopo de referência",
    level: "Nível",
    flexible: "Ajuste o escopo à sua disponibilidade. Qualidade e clareza importam mais que velocidade."
  },
  en: {
    projects: "Projects",
    objective: "Goal",
    problem: "The problem this project addresses",
    build: "What to build",
    avoid: "What to avoid",
    differentials: "Meaningful differentiators",
    proof: "How to show professional judgment",
    portfolio: "Why it belongs in a portfolio",
    presentation: "How to present it",
    stack: "Suggested stack",
    scope: "Reference scope",
    level: "Level",
    flexible: "Adjust scope to your availability. Quality and clarity matter more than speed."
  },
  es: {
    projects: "Proyectos",
    objective: "Objetivo",
    problem: "Problema que enfrenta el proyecto",
    build: "Qué construir",
    avoid: "Qué evitar",
    differentials: "Diferenciales con sentido",
    proof: "Cómo demostrar criterio profesional",
    portfolio: "Por qué vale para el portafolio",
    presentation: "Cómo presentarlo",
    stack: "Stack sugerida",
    scope: "Alcance de referencia",
    level: "Nivel",
    flexible: "Ajusta el alcance a tu disponibilidad. Calidad y claridad importan más que velocidad."
  }
} as const;

function EditorialList({
  items,
  locale,
  icon = "check"
}: {
  items?: Localized[];
  locale: Locale;
  icon?: "check" | "alert" | "spark";
}) {
  if (!items?.length) return null;
  const Icon = icon === "alert" ? CircleAlert : icon === "spark" ? Sparkles : CheckCircle2;
  return (
    <ul className="project-editorial-list">
      {items.map((item) => (
        <li key={t(item, locale)}>
          <Icon size={17} aria-hidden="true" />
          <span>{t(item, locale)}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectDetail({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();
  const area = areas.find((item) => item.id === project.areaId);
  const labels = copy[locale];

  return (
    <div className="page-shell">
      <header className="page-hero">
        <Breadcrumbs locale={locale} items={[
          { label: labels.projects, href: `/${locale}/projetos` },
          { label: t(project.title, locale) }
        ]} />
        <span className="eyebrow">{area ? t(area.name, locale) : project.areaId}</span>
        <h1>{t(project.title, locale)}</h1>
        <p>{t(project.objective ?? project.description, locale)}</p>
      </header>

      <div className="detail-grid project-detail">
        <article className="prose">
          {project.problem && <section><h2>{labels.problem}</h2><p className="guide-lead">{t(project.problem, locale)}</p></section>}
          <section>
            <h2>{labels.build}</h2>
            <EditorialList items={project.deliverables ?? project.features} locale={locale} />
          </section>
          {project.avoid?.length && <section className="project-caution"><h2>{labels.avoid}</h2><EditorialList items={project.avoid} locale={locale} icon="alert" /></section>}
          {project.differentials?.length && <section><h2>{labels.differentials}</h2><EditorialList items={project.differentials} locale={locale} icon="spark" /></section>}
          {project.professionalProof?.length && <section><h2>{labels.proof}</h2><EditorialList items={project.professionalProof} locale={locale} /></section>}
          <section>
            <h2>{labels.portfolio}</h2>
            <p>{t(project.recruiterSignal, locale)}</p>
            <h3>{labels.presentation}</h3>
            <p>{locale === "pt"
              ? "No README, explique contexto, recorte, decisões, execução, testes, limitações e próximos passos. Mostre uma demonstração curta e conte o que mudou depois de validar o projeto. Em entrevista, comece pelo problema e pela decisão mais difícil — a stack vem depois."
              : locale === "en"
                ? "In the README, explain context, scope, decisions, setup, tests, limitations and next steps. Show a short demo and describe what changed after validation. In an interview, start with the problem and the hardest decision—the stack comes later."
                : "En el README, explica contexto, alcance, decisiones, ejecución, pruebas, límites y próximos pasos. Muestra una demo breve y cuenta qué cambió después de validar. En entrevista, empieza por el problema y la decisión más difícil; la stack viene después."}</p>
          </section>
        </article>

        <aside className="detail-sidebar">
          <div className="fact-card">
            <strong>{labels.stack}</strong>
            <div className="tags">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
          </div>
          <div className="fact-card">
            <div className="fact-list">
              <div className="fact-row"><span>{labels.scope}</span><b>{t(project.duration, locale)}</b></div>
              <div className="fact-row"><span>{labels.level}</span><b>{levelLabel(project.level, locale)}</b></div>
            </div>
            <p className="scope-note">{labels.flexible}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
