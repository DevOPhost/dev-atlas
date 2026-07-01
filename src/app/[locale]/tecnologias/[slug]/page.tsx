import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, CircleAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TechnologyLogo } from "@/components/technology-logo";
import { areas, technologies } from "@/data/content";
import {
  isLocale,
  levelLabel,
  t,
  technologyTypeLabel,
  type Locale
} from "@/lib/i18n";
import { localizedAlternates } from "@/lib/metadata";
import type {
  Technology,
  TechnologyDomain,
  TechnologyRelationType
} from "@/lib/content-types";

export function generateStaticParams() {
  return technologies.flatMap((item) =>
    ["pt", "en", "es"].map((locale) => ({ locale, slug: item.id }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const item = technologies.find((technology) => technology.id === slug);
  return item
    ? {
        title: item.name,
        description: t(item.description, locale),
        alternates: localizedAlternates(locale, `tecnologias/${item.id}`)
      }
    : {};
}

const copy = {
  pt: {
    all: "Tecnologias",
    overview: "Visão geral",
    decision: "Decisão rápida",
    study: "Quando estudar",
    later: "Quando não priorizar",
    solves: "O problema que resolve",
    practice: "Onde aparece na prática",
    prerequisites: "Pré-requisitos",
    fundamentals: "Conceitos fundamentais",
    strengths: "Pontos fortes",
    limitations: "Limitações",
    uses: "Casos e exemplos",
    mistakes: "Erros comuns",
    practices: "Boas práticas",
    order: "Ordem de estudo",
    projects: "Projeto para praticar",
    next: "Próximos passos",
    relations: "Mapa de relações",
    areas: "Áreas relacionadas",
    level: "Nível sugerido",
    domains: "Domínios",
    contents: "Nesta página",
    sources: "Fontes oficiais",
    website: "Site oficial",
    docs: "Documentação",
    reviewed: "Revisado em",
    alternatives: "Alternativas citadas"
  },
  en: {
    all: "Technologies",
    overview: "Overview",
    decision: "Quick decision",
    study: "When to study it",
    later: "When not to prioritize it",
    solves: "The problem it solves",
    practice: "Where it appears in practice",
    prerequisites: "Prerequisites",
    fundamentals: "Core concepts",
    strengths: "Strengths",
    limitations: "Limitations",
    uses: "Uses and examples",
    mistakes: "Common mistakes",
    practices: "Good practices",
    order: "Study order",
    projects: "Project to practice",
    next: "Next steps",
    relations: "Relationship map",
    areas: "Related fields",
    level: "Suggested level",
    domains: "Domains",
    contents: "On this page",
    sources: "Official sources",
    website: "Official website",
    docs: "Documentation",
    reviewed: "Reviewed on",
    alternatives: "Mentioned alternatives"
  },
  es: {
    all: "Tecnologías",
    overview: "Visión general",
    decision: "Decisión rápida",
    study: "Cuándo estudiarlo",
    later: "Cuándo no priorizarlo",
    solves: "El problema que resuelve",
    practice: "Dónde aparece en la práctica",
    prerequisites: "Requisitos",
    fundamentals: "Conceptos fundamentales",
    strengths: "Puntos fuertes",
    limitations: "Limitaciones",
    uses: "Casos y ejemplos",
    mistakes: "Errores comunes",
    practices: "Buenas prácticas",
    order: "Orden de estudio",
    projects: "Proyecto para practicar",
    next: "Próximos pasos",
    relations: "Mapa de relaciones",
    areas: "Áreas relacionadas",
    level: "Nivel sugerido",
    domains: "Dominios",
    contents: "En esta página",
    sources: "Fuentes oficiales",
    website: "Sitio oficial",
    docs: "Documentación",
    reviewed: "Revisado el",
    alternatives: "Alternativas mencionadas"
  }
} as const;

const domainLabels: Record<TechnologyDomain, Record<Locale, string>> = {
  fundamentos: { pt: "Fundamentos", en: "Foundations", es: "Fundamentos" },
  web: { pt: "Web", en: "Web", es: "Web" },
  frontend: { pt: "Front-end", en: "Front-end", es: "Front-end" },
  backend: { pt: "Back-end", en: "Back-end", es: "Back-end" },
  fullstack: { pt: "Full-stack", en: "Full-stack", es: "Full-stack" },
  mobile: { pt: "Mobile", en: "Mobile", es: "Mobile" },
  desktop: { pt: "Desktop", en: "Desktop", es: "Desktop" },
  games: { pt: "Games", en: "Games", es: "Videojuegos" },
  dados: { pt: "Dados", en: "Data", es: "Datos" },
  ia: { pt: "IA", en: "AI", es: "IA" },
  devops: { pt: "DevOps", en: "DevOps", es: "DevOps" },
  cloud: { pt: "Cloud", en: "Cloud", es: "Cloud" },
  infraestrutura: { pt: "Infraestrutura", en: "Infrastructure", es: "Infraestructura" },
  seguranca: { pt: "Segurança", en: "Security", es: "Seguridad" },
  qa: { pt: "Qualidade", en: "Quality", es: "Calidad" },
  "ux-ui": { pt: "UX/UI", en: "UX/UI", es: "UX/UI" },
  produto: { pt: "Produto", en: "Product", es: "Producto" }
};

const relationLabels: Record<TechnologyRelationType, Record<Locale, string>> = {
  prerequisite: { pt: "Pré-requisito", en: "Prerequisite", es: "Requisito" },
  ecosystem: { pt: "Mesmo ecossistema", en: "Same ecosystem", es: "Mismo ecosistema" },
  "pairs-with": { pt: "Combina com", en: "Pairs with", es: "Combina con" },
  alternative: { pt: "Alternativa", en: "Alternative", es: "Alternativa" },
  "next-step": { pt: "Próximo passo", en: "Next step", es: "Próximo paso" },
  "related-concept": { pt: "Conceito relacionado", en: "Related concept", es: "Concepto relacionado" }
};

function TextList({
  items,
  locale,
  ordered = false
}: {
  items?: Technology["fundamentals"];
  locale: Locale;
  ordered?: boolean;
}) {
  if (!items?.length) return null;
  const Tag = ordered ? "ol" : "ul";
  return <Tag>{items.map((item) => <li key={t(item, locale)}>{t(item, locale)}</li>)}</Tag>;
}

export default async function TechnologyDetail({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const item = technologies.find((technology) => technology.id === slug);
  if (!item) notFound();

  const labels = copy[locale];
  const relatedAreas = item.areaIds
    .map((id) => areas.find((area) => area.id === id))
    .filter((area): area is (typeof areas)[number] => Boolean(area));
  const relatedTechnologies = (item.relations ?? [])
    .map((relation) => ({
      relation,
      technology: technologies.find((candidate) => candidate.id === relation.technologyId)
    }))
    .filter((entry): entry is { relation: NonNullable<typeof entry.relation>; technology: Technology } =>
      Boolean(entry.technology)
    );
  const hasExtendedGuide = Boolean(
    item.problem
    || item.prerequisites?.length
    || item.fundamentals?.length
    || item.projectIdeas?.length
  );
  const excludeRepeated = (
    values: Technology["fundamentals"] | undefined,
    references: Array<Technology["description"] | undefined>
  ) => values?.filter((value) =>
    !references.some((reference) => reference && t(reference, locale) === t(value, locale))
  );
  const uniqueStrengths = excludeRepeated(item.strengths, [item.description, item.explanation, item.problem, item.inPractice]);
  const uniqueLimitations = excludeRepeated(item.limitations, [item.avoidWhen, item.notPriorityWhen]);
  const uniqueUseCases = excludeRepeated(item.useCases, [item.inPractice]);
  const uniqueExamples = excludeRepeated(item.examples, item.projectIdeas ?? []);
  const uniqueMistakes = excludeRepeated(item.commonMistakes, [item.avoidWhen, item.notPriorityWhen, ...(item.limitations ?? [])]);
  const uniquePractices = excludeRepeated(item.bestPractices, item.fundamentals ?? []);
  const uniqueStudyOrder = excludeRepeated(item.studyOrder, [
    ...(item.prerequisites ?? []),
    ...(item.fundamentals ?? []),
    ...(item.projectIdeas ?? [])
  ]);
  const contents = [
    ["overview", labels.overview],
    hasExtendedGuide ? ["decision", labels.decision] : null,
    item.prerequisites?.length ? ["prerequisites", labels.prerequisites] : null,
    item.fundamentals?.length ? ["fundamentals", labels.fundamentals] : null,
    uniqueStrengths?.length || uniqueLimitations?.length ? ["tradeoffs", `${labels.strengths} / ${labels.limitations}`] : null,
    uniqueMistakes?.length || uniquePractices?.length || uniqueStudyOrder?.length ? ["practice", labels.practices] : null,
    item.projectIdeas?.length ? ["project", labels.projects] : null,
    relatedTechnologies.length ? ["relations", labels.relations] : null
  ].filter((entry): entry is string[] => Boolean(entry));

  if (item.narrative) {
    const story = locale === "pt"
      ? { context: "Por que isso existe", ecosystem: item.type === "linguagem" ? "Que tipo de problema esta linguagem ajuda a expressar" : item.type === "banco-dados" || item.type === "banco-vetorial" ? "As decisões que este banco torna visíveis" : item.type === "design" ? "A colaboração que melhora" : item.domains.includes("devops") || item.domains.includes("infraestrutura") ? "A dor operacional que reduz" : "Onde entra no ecossistema", decisions: "A decisão por trás da ferramenta", compare: "Uma comparação que ajuda", start: "Como começar sem se perder", before: "O que vale entender antes", project: "Uma forma honesta de praticar", relations: "Continue pelo contexto", contents: "Leitura desta página" }
      : locale === "en"
        ? { context: "Why this exists", ecosystem: item.type === "linguagem" ? "The kind of problem this language helps express" : item.type === "banco-dados" || item.type === "banco-vetorial" ? "The decisions this database makes visible" : item.type === "design" ? "The collaboration it improves" : item.domains.includes("devops") || item.domains.includes("infraestrutura") ? "The operational pain it reduces" : "Where it fits in the ecosystem", decisions: "The decision behind the tool", compare: "A comparison that helps", start: "How to begin without getting lost", before: "What is worth understanding first", project: "An honest way to practice", relations: "Continue through context", contents: "On this page" }
        : { context: "Por qué existe", ecosystem: item.type === "linguagem" ? "El tipo de problema que este lenguaje ayuda a expresar" : item.type === "banco-dados" || item.type === "banco-vetorial" ? "Las decisiones que esta base hace visibles" : item.type === "design" ? "La colaboración que mejora" : item.domains.includes("devops") || item.domains.includes("infraestrutura") ? "El dolor operativo que reduce" : "Dónde encaja en el ecosistema", decisions: "La decisión detrás de la herramienta", compare: "Una comparación que ayuda", start: "Cómo empezar sin perderse", before: "Qué conviene entender antes", project: "Una forma honesta de practicar", relations: "Continúa por el contexto", contents: "Lectura de esta página" };
    const storyContents = [
      ["context", story.context],
      ["ecosystem", story.ecosystem],
      ["decisions", story.decisions],
      item.narrative.comparison ? ["comparison", story.compare] : null,
      ["start", story.start],
      item.projectIdeas?.length ? ["project", story.project] : null,
      relatedTechnologies.length ? ["relations", story.relations] : null
    ].filter((entry): entry is string[] => Boolean(entry));

    return (
      <div className="page-shell">
        <header className="page-hero technology-hero">
          <Breadcrumbs locale={locale} items={[
            { label: labels.all, href: `/${locale}/tecnologias` },
            { label: item.name }
          ]} />
          <div className="technology-title">
            <span className="technology-icon-large"><TechnologyLogo id={item.id} size={52} /></span>
            <div>
              <span className="eyebrow">{technologyTypeLabel(item.type, locale)} · {levelLabel(item.level, locale)}</span>
              <h1>{item.name}</h1>
            </div>
          </div>
          <p>{t(item.description, locale)}</p>
        </header>

        <div className="technology-guide-layout">
          <article className="technology-story">
            <section id="context" className="story-opening">
              <span className="section-kicker">{story.context}</span>
              {item.narrative.opening.map((paragraph, index) => <p className={index === 0 ? "story-lead" : undefined} key={t(paragraph, locale)}>{t(paragraph, locale)}</p>)}
            </section>
            <section id="ecosystem">
              <h2>{story.ecosystem}</h2>
              <p>{t(item.narrative.ecosystem, locale)}</p>
            </section>
            <section id="decisions" className="story-decision">
              <h2>{story.decisions}</h2>
              <p>{t(item.narrative.decisions, locale)}</p>
            </section>
            {item.narrative.comparison && <section id="comparison"><h2>{story.compare}</h2><p>{t(item.narrative.comparison, locale)}</p></section>}
            <section id="start">
              <h2>{story.start}</h2>
              <p>{t(item.narrative.gettingStarted, locale)}</p>
              {item.prerequisites?.length && <div className="story-prerequisites"><strong>{story.before}</strong><TextList items={item.prerequisites} locale={locale} /></div>}
            </section>
            {item.projectIdeas?.length && <section id="project" className="story-project"><span className="section-kicker">{story.project}</span><TextList items={item.projectIdeas} locale={locale} /></section>}
            {relatedTechnologies.length > 0 && <section id="relations"><h2>{story.relations}</h2><p className="story-bridge">{locale === "pt" ? "As relações abaixo não formam uma lista obrigatória. Elas mostram de onde este assunto vem, o que costuma acompanhá-lo e para onde a curiosidade pode seguir." : locale === "en" ? "The relationships below are not a mandatory list. They show where this subject comes from, what usually accompanies it and where curiosity may lead next." : "Las relaciones siguientes no son una lista obligatoria. Muestran de dónde viene el tema, qué suele acompañarlo y hacia dónde puede seguir la curiosidad."}</p><div className="relation-grid">{relatedTechnologies.map(({ relation, technology }) => <Link href={`/${locale}/tecnologias/${technology.id}`} key={`${relation.type}-${technology.id}`}><small>{relationLabels[relation.type][locale]}</small><strong>{technology.name}</strong><ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div></section>}
          </article>

          <aside className="detail-sidebar technology-guide-sidebar">
            <nav className="guide-toc" aria-label={story.contents}><strong>{story.contents}</strong>{storyContents.map(([href, label]) => <a href={`#${href}`} key={href}>{label}</a>)}</nav>
            <div className="fact-card"><strong>{labels.domains}</strong><div className="tags">{item.domains.map((domain) => <span className="tag" key={domain}>{domainLabels[domain][locale]}</span>)}</div></div>
            <div className="fact-card"><strong>{labels.areas}</strong><div className="tags">{relatedAreas.map((area) => <Link className="tag" href={`/${locale}/areas/${area.id}`} key={area.id}>{t(area.name, locale)}</Link>)}</div></div>
            {(item.officialUrl || item.docsUrl) && <div className="fact-card"><strong>{labels.sources}</strong>{item.officialUrl && <a className="official-link" href={item.officialUrl} target="_blank" rel="noopener noreferrer">{labels.website}<ArrowUpRight size={14} /></a>}{item.docsUrl && <a className="official-link" href={item.docsUrl} target="_blank" rel="noopener noreferrer">{labels.docs}<ArrowUpRight size={14} /></a>}{item.reviewedAt && <small>{labels.reviewed} {new Intl.DateTimeFormat(locale).format(new Date(`${item.reviewedAt}T12:00:00Z`))}</small>}</div>}
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-hero technology-hero">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: labels.all, href: `/${locale}/tecnologias` },
            { label: item.name }
          ]}
        />
        <div className="technology-title">
          <span className="technology-icon-large">
            <TechnologyLogo id={item.id} size={52} />
          </span>
          <div>
            <span className="eyebrow">
              {technologyTypeLabel(item.type, locale)} · {levelLabel(item.level, locale)}
            </span>
            <h1>{item.name}</h1>
          </div>
        </div>
        <p>{t(item.description, locale)}</p>
      </header>

      <div className="technology-guide-layout">
        <article className="prose technology-guide">
          <section id="overview">
            <span className="section-kicker">01</span>
            <h2>{labels.overview}</h2>
            <p className="guide-lead">{t(item.explanation ?? item.description, locale)}</p>
            {item.problem && <><h3>{labels.solves}</h3><p>{t(item.problem, locale)}</p></>}
            {item.inPractice && <><h3>{labels.practice}</h3><p>{t(item.inPractice, locale)}</p></>}
          </section>

          {hasExtendedGuide && (
            <section id="decision">
              <span className="section-kicker">02</span>
              <h2>{labels.decision}</h2>
              <div className="decision-grid">
                <article className="decision-card positive">
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <h3>{labels.study}</h3>
                  <p>{t(item.studyWhen ?? item.useWhen, locale)}</p>
                </article>
                <article className="decision-card caution">
                  <CircleAlert size={20} aria-hidden="true" />
                  <h3>{labels.later}</h3>
                  <p>{t(item.notPriorityWhen ?? item.avoidWhen, locale)}</p>
                </article>
              </div>
            </section>
          )}

          {item.prerequisites?.length && (
            <section id="prerequisites">
              <span className="section-kicker">03</span>
              <h2>{labels.prerequisites}</h2>
              <TextList items={item.prerequisites} locale={locale} />
            </section>
          )}

          {item.fundamentals?.length && (
            <section id="fundamentals">
              <h2>{labels.fundamentals}</h2>
              <TextList items={item.fundamentals} locale={locale} />
              {Boolean(uniqueUseCases?.length) && <><h3>{labels.uses}</h3><TextList items={uniqueUseCases} locale={locale} /></>}
              {Boolean(uniqueExamples?.length) && <TextList items={uniqueExamples} locale={locale} />}
            </section>
          )}

          {Boolean(uniqueStrengths?.length || uniqueLimitations?.length) && (
            <section id="tradeoffs">
              <div className="guide-columns">
                {Boolean(uniqueStrengths?.length) && <div><h2>{labels.strengths}</h2><TextList items={uniqueStrengths} locale={locale} /></div>}
                {Boolean(uniqueLimitations?.length) && <div><h2>{labels.limitations}</h2><TextList items={uniqueLimitations} locale={locale} /></div>}
              </div>
            </section>
          )}

          {Boolean(uniqueMistakes?.length || uniquePractices?.length || uniqueStudyOrder?.length) && (
            <section id="practice">
              {Boolean(uniqueMistakes?.length) && <><h2>{labels.mistakes}</h2><TextList items={uniqueMistakes} locale={locale} /></>}
              {Boolean(uniquePractices?.length) && <><h2>{labels.practices}</h2><TextList items={uniquePractices} locale={locale} /></>}
              {Boolean(uniqueStudyOrder?.length) && <><h2>{labels.order}</h2><TextList items={uniqueStudyOrder} locale={locale} ordered /></>}
            </section>
          )}

          {item.projectIdeas?.length && (
            <section id="project" className="guide-project">
              <span className="section-kicker">Prática</span>
              <h2>{labels.projects}</h2>
              <TextList items={item.projectIdeas} locale={locale} />
              {item.nextSteps?.length && <><h3>{labels.next}</h3><TextList items={item.nextSteps} locale={locale} /></>}
            </section>
          )}

          {relatedTechnologies.length > 0 && (
            <section id="relations">
              <h2>{labels.relations}</h2>
              <div className="relation-grid">
                {relatedTechnologies.map(({ relation, technology }) => (
                  <Link href={`/${locale}/tecnologias/${technology.id}`} key={`${relation.type}-${technology.id}`}>
                    <small>{relationLabels[relation.type][locale]}</small>
                    <strong>{technology.name}</strong>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {!hasExtendedGuide && (
            <section>
              <h2>{labels.study}</h2>
              <p>{t(item.useWhen, locale)}</p>
              <h2>{labels.later}</h2>
              <p>{t(item.avoidWhen, locale)}</p>
              {item.alternatives.length > 0 && <><h2>{labels.alternatives}</h2><div className="tags">{item.alternatives.map((alternative) => <span className="tag" key={alternative}>{alternative}</span>)}</div></>}
            </section>
          )}
        </article>

        <aside className="detail-sidebar technology-guide-sidebar">
          <nav className="guide-toc" aria-label={labels.contents}>
            <strong>{labels.contents}</strong>
            {contents.map(([href, label]) => <a href={`#${href}`} key={href}>{label}</a>)}
          </nav>
          <div className="fact-card">
            <strong>{labels.level}</strong>
            <span className="tag">{levelLabel(item.level, locale)}</span>
          </div>
          <div className="fact-card">
            <strong>{labels.domains}</strong>
            <div className="tags">{item.domains.map((domain) => <span className="tag" key={domain}>{domainLabels[domain][locale]}</span>)}</div>
          </div>
          <div className="fact-card">
            <strong>{labels.areas}</strong>
            <div className="tags">{relatedAreas.map((area) => <Link className="tag" href={`/${locale}/areas/${area.id}`} key={area.id}>{t(area.name, locale)}</Link>)}</div>
          </div>
          {(item.officialUrl || item.docsUrl) && (
            <div className="fact-card">
              <strong>{labels.sources}</strong>
              {item.officialUrl && <a className="official-link" href={item.officialUrl} target="_blank" rel="noopener noreferrer">{labels.website}<ArrowUpRight size={14} /></a>}
              {item.docsUrl && <a className="official-link" href={item.docsUrl} target="_blank" rel="noopener noreferrer">{labels.docs}<ArrowUpRight size={14} /></a>}
              {item.reviewedAt && <small>{labels.reviewed} {new Intl.DateTimeFormat(locale).format(new Date(`${item.reviewedAt}T12:00:00Z`))}</small>}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
