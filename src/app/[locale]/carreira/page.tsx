import { Check, TriangleAlert } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { isLocale, type Locale } from "@/lib/i18n";
import { TechnologyLogo } from "@/components/technology-logo";

const readmeProject = `# Nome do projeto

Uma frase direta: o que ele resolve e para quem.

## Por que este projeto existe
Explique o problema e o recorte escolhido. Duas ou três frases bastam.

## O que já funciona
- fluxo principal;
- validações importantes;
- comportamento em erro.

## Decisões técnicas
Registre 2 ou 3 escolhas reais e os motivos. Exemplo:
"Usei PostgreSQL porque os dados têm relações e precisam de consistência."

## Como executar
\`\`\`bash
npm install
npm run dev
\`\`\`

## Próximos passos
Liste pendências honestas. Projeto bom não precisa fingir que está terminado.`;

const readmeProfile = `# Olá, eu sou a Ana

Desenvolvedora back-end em formação, com foco em APIs e dados.

## No que estou trabalhando
- API de chamados com Node.js e PostgreSQL
- testes de integração e documentação OpenAPI

## O que sei usar
TypeScript · Node.js · PostgreSQL · Git · Docker

## Projeto que melhor representa meu trabalho
[API de chamados](link) — decisões, arquitetura e demonstração.

## Contato
LinkedIn: [seu perfil](link)`;

const portfolioReadme = `# Portfólio de dados — João Silva

Projetos escolhidos para mostrar análise, modelagem e comunicação.

| Projeto | Pergunta respondida | Ferramentas |
| --- | --- | --- |
| Vendas | Onde perdemos margem? | SQL, Power BI |
| Churn | Quais sinais antecedem cancelamento? | Python, pandas |

Cada repositório contém a origem dos dados, limpeza, limitações e conclusão.`;

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const pt = locale === "pt";
  const en = locale === "en";
  const c = {
    label: pt ? "Carreira na prática" : en ? "Career in practice" : "Carrera en la práctica",
    title: pt ? "Seu perfil precisa ser fácil de entender." : en ? "Your profile should be easy to understand." : "Tu perfil debe ser fácil de entender.",
    intro: pt ? "LinkedIn, GitHub e portfólio têm funções diferentes. Organize cada um para que outra pessoa encontre rapidamente sua área, o que você sabe fazer e uma prova concreta." : en ? "LinkedIn, GitHub and a portfolio have different jobs. Organize each so another person quickly finds your field, skills and concrete evidence." : "LinkedIn, GitHub y portafolio tienen funciones distintas. Organiza cada uno para mostrar rápido tu área, habilidades y una prueba concreta.",
    linkedin: pt ? "LinkedIn que diz alguma coisa" : en ? "A LinkedIn profile that says something" : "Un LinkedIn que diga algo",
    github: pt ? "GitHub fácil de avaliar" : en ? "A GitHub that is easy to review" : "Un GitHub fácil de evaluar",
    readmes: pt ? "Modelos de README para adaptar" : en ? "README templates to adapt" : "Modelos de README para adaptar"
  };
  const linkedInItems = pt ? [
    ["Título", "Evite “em busca de oportunidade”. Escreva função + foco + tecnologias: “Desenvolvedor back-end júnior | Node.js, TypeScript e PostgreSQL”."],
    ["Sobre", "Use 5 a 8 linhas: contexto, área escolhida, o que já construiu, base técnica e objetivo atual. Escreva como você fala."],
    ["Experiência", "Projetos acadêmicos, trabalho voluntário e experiência anterior valem quando você descreve ação, contexto e resultado."],
    ["Destaques", "Fixe dois projetos bons, não dez links. Use uma imagem legível e diga em uma frase por que cada projeto importa."],
    ["Atividade", "Publique aprendizados concretos: um erro que resolveu, uma decisão de projeto ou uma explicação curta. Não copie listas motivacionais."]
  ] : en ? [
    ["Headline", "Use role + focus + technologies. Avoid vague “looking for opportunities” headlines."],
    ["About", "In 5–8 lines, cover context, chosen field, what you built, foundations and current goal."],
    ["Experience", "Academic, volunteer and previous work count when you describe action, context and result."],
    ["Featured", "Pin two strong projects, not ten links. Explain why each matters."],
    ["Activity", "Share concrete learning: a fixed bug, project decision or short explanation."]
  ] : [
    ["Titular", "Usa función + enfoque + tecnologías. Evita titulares vagos."],
    ["Acerca de", "En 5–8 líneas cuenta contexto, área, proyectos, base y objetivo."],
    ["Experiencia", "Proyectos académicos y experiencia previa valen con acción, contexto y resultado."],
    ["Destacados", "Fija dos buenos proyectos, no diez enlaces."],
    ["Actividad", "Publica aprendizajes concretos: errores, decisiones y explicaciones."]
  ];
  const githubItems = pt ? [
    "Foto, nome e bio coerentes com o LinkedIn. Bio curta: área, foco e localização opcional.",
    "Fixe de 4 a 6 repositórios. Um CRUD básico só merece destaque se houver alguma decisão além do tutorial.",
    "Cada repositório precisa de descrição, tópicos, licença quando aplicável e instruções que realmente funcionam.",
    "Commits contam uma história. Prefira “adiciona validação de estoque” a “update” ou “ajustes”.",
    "Não esconda limitações. Uma seção “o que falta” passa mais maturidade que um projeto abandonado fingindo estar pronto.",
    "Remova chaves, senhas, arquivos .env e dados pessoais do histórico antes de publicar."
  ] : en ? [
    "Keep photo, name and bio consistent with LinkedIn.",
    "Pin 4–6 repositories. A basic CRUD belongs there only if it goes beyond a tutorial.",
    "Every repository needs a description, topics and instructions that actually work.",
    "Commits should tell a story. Prefer “adds stock validation” to “update”.",
    "State limitations. An honest next-steps section signals maturity.",
    "Remove keys, passwords, .env files and personal data before publishing."
  ] : [
    "Mantén foto, nombre y bio coherentes con LinkedIn.",
    "Fija 4–6 repositorios. Un CRUD básico solo destaca si supera el tutorial.",
    "Cada repositorio necesita descripción, temas e instrucciones que funcionen.",
    "Los commits deben contar una historia. Evita “update”.",
    "Declara limitaciones y próximos pasos con honestidad.",
    "Elimina claves, contraseñas, .env y datos personales."
  ];

  return (
    <div className="page-shell">
      <header className="page-hero">
        <Breadcrumbs locale={locale} items={[{ label: c.label }]} />
        <span className="eyebrow">{c.label}</span><h1>{c.title}</h1><p>{c.intro}</p>
        <nav className="anchor-nav" aria-label={pt ? "Nesta página" : en ? "On this page" : "En esta página"}><a href="#linkedin">LinkedIn</a><a href="#github">GitHub</a><a href="#readme">README.md</a><a href="#erros">{pt ? "Erros comuns" : en ? "Common mistakes" : "Errores comunes"}</a></nav>
      </header>
      <article className="career-guide">
        <section id="linkedin" className="career-section">
          <div className="career-section-title"><span className="career-icon"><TechnologyLogo id="linkedin" size={24} /></span><div><span>01</span><h2>{c.linkedin}</h2></div></div>
          <div className="career-checks">{linkedInItems.map(([title, text]) => <div className="career-check" key={title}><Check size={17} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
          {pt && <div className="profile-example"><strong>Exemplo de “Sobre” sem enrolação</strong><p>“Estou migrando de suporte para desenvolvimento back-end depois de quatro anos atendendo sistemas internos. Hoje construo APIs com TypeScript, Node.js e PostgreSQL; meu projeto mais completo é um sistema de chamados com permissões e histórico de auditoria. Procuro uma primeira posição em desenvolvimento onde minha experiência com diagnóstico e atendimento também seja útil.”</p></div>}
        </section>
        <section id="github" className="career-section">
          <div className="career-section-title"><span className="career-icon"><TechnologyLogo id="github" size={24} /></span><div><span>02</span><h2>{c.github}</h2></div></div>
          <div className="plain-checklist">{githubItems.map((item) => <p key={item}><Check size={16} />{item}</p>)}</div>
        </section>
        <section id="readme" className="career-section">
          <div className="career-section-title"><div><span>03</span><h2>{c.readmes}</h2></div></div>
          <p className="section-intro">{pt ? "Copie a estrutura, não a personalidade. Troque títulos, remova seções inúteis e escreva detalhes que só poderiam pertencer ao seu projeto." : en ? "Copy the structure, not the personality. Remove useless sections and write details that could only belong to your project." : "Copia la estructura, no la personalidad. Quita secciones inútiles y escribe detalles propios del proyecto."}</p>
          <div className="readme-examples">
            <details open><summary>{pt ? "README de projeto" : en ? "Project README" : "README de proyecto"}</summary><pre><code>{readmeProject}</code></pre></details>
            <details><summary>{pt ? "README do perfil pessoal" : en ? "Personal profile README" : "README de perfil personal"}</summary><pre><code>{readmeProfile}</code></pre></details>
            <details><summary>{pt ? "README de portfólio de dados" : en ? "Data portfolio README" : "README de portafolio de datos"}</summary><pre><code>{portfolioReadme}</code></pre></details>
          </div>
        </section>
        <section id="erros" className="career-warning">
          <TriangleAlert />
          <div><h2>{pt ? "O que costuma enfraquecer um perfil" : en ? "What usually weakens a profile" : "Lo que suele debilitar un perfil"}</h2><p>{pt ? "Barras de porcentagem dizendo “JavaScript 90%”, dezenas de badges sem contexto, texto em terceira pessoa, commits artificiais para preencher calendário, projetos sem instrução de execução e descrições claramente copiadas. Troque volume por evidência." : en ? "Skill percentage bars, dozens of contextless badges, third-person copy, artificial commits and projects that cannot be run. Replace volume with evidence." : "Barras de porcentajes, docenas de badges sin contexto, commits artificiales y proyectos imposibles de ejecutar. Cambia volumen por evidencia."}</p></div>
        </section>
      </article>
    </div>
  );
}
