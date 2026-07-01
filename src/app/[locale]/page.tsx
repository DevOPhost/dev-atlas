import { ArrowRight, Compass, Route } from "lucide-react";
import Link from "next/link";
import { AreaCard } from "@/components/area-card";
import { OrbitScene } from "@/components/orbit-scene";
import { TechnologyLogo } from "@/components/technology-logo";
import { areas, glossary, projects, roadmaps, technologies } from "@/data/content";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/metadata";

const copy = {
  pt: {
    eyebrow: "Guia gratuito e aberto de tecnologia",
    title: <>Tecnologia é grande demais<br /><em>para navegar no escuro.</em></>,
    intro: "Você não precisa aprender tudo. Compare áreas, entenda tecnologias e escolha o próximo passo com contexto — sem curso à venda e sem caminho mágico.",
    explore: "Ver áreas da TI", roadmaps: "Consultar roadmaps",
    signals: [["10", "áreas com rotina real"], ["95", "tecnologias no catálogo"], ["11", "projetos comentados"], ["3", "idiomas"]],
    areasLabel: "Territórios", areasTitle: "Primeiro, entenda onde você está entrando.", areasText: "Cada área tem rotina, ferramentas e problemas diferentes. Veja o trabalho real antes de escolher pelo nome da vaga.",
    roadmapLabel: "Caminhos de estudo", roadmapTitle: "Um passo por vez, com critério para avançar.", roadmapText: "Cada etapa explica o que estudar, o que praticar e qual evidência mostra que a base está pronta.",
    techLabel: "Catálogo", techTitle: "Ferramentas entram depois do problema.",
    ctaTitle: "Ainda não sabe qual área combina com você?", ctaText: "Responda oito perguntas sobre rotina, interesses e forma de pensar. O resultado é um ponto de partida, não um rótulo.", ctaButton: "Fazer o teste"
  },
  en: {
    eyebrow: "A free and open technology guide",
    title: <>Technology is too broad<br /><em>to navigate in the dark.</em></>,
    intro: "You do not need to learn everything. Compare fields, understand technologies and choose a next step with context—no course to sell and no magic path.",
    explore: "View IT fields", roadmaps: "Browse roadmaps",
    signals: [["10", "fields with real routines"], ["95", "catalog technologies"], ["11", "reviewed projects"], ["3", "languages"]],
    areasLabel: "Territories", areasTitle: "First, understand where you’re heading.", areasText: "Each field has a different routine, entry barrier and set of problems. See the actual work before choosing by job title.",
    roadmapLabel: "Study paths", roadmapTitle: "One step at a time, with criteria to move on.", roadmapText: "Each stage explains what to study, what to practice and which evidence shows the foundation is ready.",
    techLabel: "Catalog", techTitle: "Tools come after the problem.",
    ctaTitle: "Still unsure which field fits you?", ctaText: "Answer eight questions about routines, interests and how you think. The result is a starting point, not a label.", ctaButton: "Take the test"
  },
  es: {
    eyebrow: "Guía gratuita y abierta de tecnología",
    title: <>La tecnología es demasiado amplia<br /><em>para navegar a oscuras.</em></>,
    intro: "No necesitas aprenderlo todo. Compara áreas, entiende tecnologías y elige el próximo paso con contexto, sin cursos a la venta ni caminos mágicos.",
    explore: "Ver áreas de TI", roadmaps: "Consultar roadmaps",
    signals: [["10", "áreas con rutinas reales"], ["95", "tecnologías catalogadas"], ["11", "proyectos comentados"], ["3", "idiomas"]],
    areasLabel: "Territorios", areasTitle: "Primero, entiende dónde estás entrando.", areasText: "Cada área tiene una rutina, barrera y problemas diferentes. Mira el trabajo real antes de elegir por el nombre.",
    roadmapLabel: "Rutas de estudio", roadmapTitle: "Un paso a la vez, con criterios para avanzar.", roadmapText: "Cada etapa explica qué estudiar, qué practicar y qué evidencia demuestra que la base está lista.",
    techLabel: "Catálogo", techTitle: "Las herramientas vienen después del problema.",
    ctaTitle: "¿Aún no sabes qué área encaja contigo?", ctaText: "Responde ocho preguntas sobre rutina, intereses y forma de pensar. El resultado es un punto de partida, no una etiqueta.", ctaButton: "Hacer el test"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: localizedAlternates(locale) };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = copy[locale];
  const featured = [areas[0], areas[1], areas[2], areas[4], areas[6], areas[8]];
  const signals = [
    [String(areas.length), c.signals[0][1]],
    [String(technologies.length), c.signals[1][1]],
    [String(projects.length), c.signals[2][1]],
    ["3", c.signals[3][1]]
  ];

  return (
    <>
      <section className="home-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{c.eyebrow}</span>
            <h1>{c.title}</h1>
            <p>{c.intro}</p>
            <div className="button-row">
              <Link className="button" href={`/${locale}/tecnologias`}><Compass size={18} />{locale === "pt" ? "Abrir catálogo técnico" : locale === "en" ? "Open technology catalog" : "Abrir catálogo técnico"}</Link>
              <Link className="button secondary" href={`/${locale}/areas`}>{c.explore}<ArrowRight size={17} /></Link>
              <Link className="button ghost" href={`/${locale}/roadmaps`}><Route size={18} />{c.roadmaps}</Link>
            </div>
          </div>
          <OrbitScene areas={areas.slice(0, 5)} locale={locale} />
        </div>
      </section>
      <div className="signal-strip">
        <div className="signal-inner">{signals.map(([value, label]) => <div className="signal" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </div>
      <section className="home-section">
        <div className="section-heading">
          <div><span className="eyebrow">{c.areasLabel}</span><h2>{c.areasTitle}</h2></div><p>{c.areasText}</p>
        </div>
        <div className="area-grid">{featured.map((area) => <AreaCard key={area.id} area={area} locale={locale} />)}</div>
        <div className="button-row"><Link className="button secondary" href={`/${locale}/areas`}>{c.explore}<ArrowRight size={17} /></Link></div>
      </section>
      <section className="section-ink">
        <div className="home-section">
          <div className="section-heading"><div><span className="eyebrow">{locale === "pt" ? "Diretório" : locale === "en" ? "Directory" : "Directorio"}</span><h2>{locale === "pt" ? "Consulte do seu jeito." : locale === "en" ? "Browse it your way." : "Consulta a tu manera."}</h2></div><p>{locale === "pt" ? "Entre por uma tecnologia, por uma dúvida de carreira ou pela área que você está tentando entender." : locale === "en" ? "Start with a technology, a career question or a field you are trying to understand." : "Entra por una tecnología, una duda de carrera o el área que intentas entender."}</p></div>
          <div className="reference-grid">
            {[
              [locale === "pt" ? "Linguagens" : locale === "en" ? "Languages" : "Lenguajes", `/${locale}/linguagens`, "C, Java, Python, JavaScript, Go…"],
              [locale === "pt" ? "Frameworks e bibliotecas" : "Frameworks & libraries", `/${locale}/tecnologias`, "React, Angular, Spring, Laravel…"],
              [locale === "pt" ? "Glossário técnico" : locale === "en" ? "Technical glossary" : "Glosario técnico", `/${locale}/glossario`, "API, deploy, cache, CI/CD…"],
              [locale === "pt" ? "LinkedIn e GitHub" : "LinkedIn & GitHub", `/${locale}/carreira`, locale === "pt" ? "Perfil, repositórios e README.md" : locale === "en" ? "Profile, repositories and README.md" : "Perfil, repositorios y README.md"],
              [locale === "pt" ? "Comparar áreas" : locale === "en" ? "Compare fields" : "Comparar áreas", `/${locale}/comparar`, locale === "pt" ? "Rotina, entrada, remoto e matemática" : locale === "en" ? "Routine, entry, remote work and math" : "Rutina, entrada, trabajo remoto y matemáticas"],
              [locale === "pt" ? "Teste vocacional" : locale === "en" ? "Career test" : "Orientación profesional", `/${locale}/quiz`, locale === "pt" ? "Ranking explicado de compatibilidade" : locale === "en" ? "Explained compatibility ranking" : "Ranking explicado de compatibilidad"]
            ].map(([title, href, text], index) => <Link className="reference-link" href={href} key={href}><span>0{index + 1}</span><strong>{title}</strong><small>{text}</small><b>↗</b></Link>)}
          </div>
        </div>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <div><span className="eyebrow">{c.roadmapLabel}</span><h2>{c.roadmapTitle}</h2></div><p>{c.roadmapText}</p>
        </div>
        <div className="roadmap-row">{roadmaps.map((item, index) => <Link className="roadmap-card" href={`/${locale}/roadmaps/${item.id}`} key={item.id}><span className="number">{locale === "pt" ? "MAPA" : locale === "en" ? "MAP" : "MAPA"} 0{index + 1}</span><h3>{t(item.title, locale)}</h3><p>{t(item.description, locale)}</p><footer><span>{locale === "pt" ? "Ritmo flexível" : locale === "en" ? "Flexible pace" : "Ritmo flexible"}</span><span>{item.steps.length} {locale === "en" ? "stages" : "etapas"}</span></footer></Link>)}</div>
      </section>
      <section className="home-section home-section-tight">
        <div className="section-heading"><div><span className="eyebrow">{c.techLabel}</span><h2>{c.techTitle}</h2></div><Link href={`/${locale}/tecnologias`}>{locale === "pt" ? "Abrir catálogo" : locale === "en" ? "Open catalog" : "Abrir catálogo"} →</Link></div>
        <div className="home-tech-grid">{technologies.slice(0, 20).map((item) => <Link className="home-tech-link" href={`/${locale}/tecnologias/${item.id}`} key={item.id}><TechnologyLogo id={item.id} size={25} /><span>{item.name}</span></Link>)}</div>
      </section>
      <section className="home-section home-section-tight">
        <div className="home-split">
          <article className="home-panel">
            <span className="eyebrow">{locale === "pt" ? "Portfólio" : locale === "en" ? "Portfolio" : "Portafolio"}</span>
            <h3>{locale === "pt" ? "Projetos que mostram decisões." : locale === "en" ? "Projects that show your decisions." : "Proyectos que muestran tus decisiones."}</h3>
            {projects.slice(0, 4).map((item) => <Link className="mini-project" href={`/${locale}/projetos/${item.id}`} key={item.id}><strong>{t(item.title, locale)}</strong><span>{item.stack.join(" · ")}</span></Link>)}
            <Link className="card-link" href={`/${locale}/projetos`}>{locale === "pt" ? "Ver projetos" : locale === "en" ? "View projects" : "Ver proyectos"} →</Link>
          </article>
          <article className="home-panel">
            <span className="eyebrow">{locale === "pt" ? "Glossário rápido" : locale === "en" ? "Quick glossary" : "Glosario rápido"}</span>
            <h3>{locale === "pt" ? "Entenda o termo antes de continuar." : locale === "en" ? "Understand the term before moving on." : "Entiende el término antes de continuar."}</h3>
            <dl>{glossary.slice(0, 4).map((item) => <div className="mini-glossary" key={item.id}><dt>{item.term}</dt><dd>{t(item.simple, locale)}</dd></div>)}</dl>
            <Link className="card-link" href={`/${locale}/glossario`}>{locale === "pt" ? "Abrir glossário" : locale === "en" ? "Open glossary" : "Abrir glosario"} →</Link>
          </article>
        </div>
      </section>
      <section className="home-section home-section-tight">
        <div className="cta-panel"><div><h2>{c.ctaTitle}</h2><p>{c.ctaText}</p></div><Link className="button" href={`/${locale}/quiz`}>{c.ctaButton}<ArrowRight size={17} /></Link></div>
      </section>
    </>
  );
}
