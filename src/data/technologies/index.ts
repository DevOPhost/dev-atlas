import type { Technology, TechnologyRelation } from "@/lib/content-types";
import { localized, localizedList } from "@/data/localized";
import { foundationalTechnologies } from "./foundations";
import { applyDomainGuides } from "./domain-guides";
import { applyTechnologyEssays } from "./essays";

type GuideSeed = {
  why: [string, string, string];
  focus: [string, string, string];
  project: [string, string, string];
  prerequisites: [string[], string[], string[]];
  relations: TechnologyRelation[];
  officialUrl: string;
  docsUrl?: string;
  roles: string[];
};

const relation = (
  technologyId: string,
  type: TechnologyRelation["type"]
): TechnologyRelation => ({ technologyId, type });

const guides: Record<string, GuideSeed> = {
  html: {
    why: ["HTML dá significado e estrutura ao conteúdo antes de qualquer estilo ou comportamento.", "HTML gives content meaning and structure before style or behavior.", "HTML da significado y estructura al contenido antes del estilo o comportamiento."],
    focus: ["Semântica, títulos, landmarks, links, formulários, mídia e acessibilidade nativa.", "Semantics, headings, landmarks, links, forms, media and native accessibility.", "Semántica, títulos, landmarks, enlaces, formularios, medios y accesibilidad nativa."],
    project: ["Uma página editorial responsiva, acessível e utilizável sem JavaScript.", "A responsive, accessible editorial page that works without JavaScript.", "Una página editorial responsiva y accesible que funcione sin JavaScript."],
    prerequisites: [["Nenhum pré-requisito técnico."], ["No technical prerequisite."], ["Ningún requisito técnico."]],
    relations: [relation("css", "next-step"), relation("javascript", "next-step"), relation("acessibilidade-web", "pairs-with")],
    officialUrl: "https://html.spec.whatwg.org/",
    docsUrl: "https://developer.mozilla.org/docs/Web/HTML",
    roles: ["Desenvolvedor front-end", "Web Developer", "UI Engineer"]
  },
  css: {
    why: ["CSS controla apresentação, layout e adaptação visual sem retirar significado do HTML.", "CSS controls presentation, layout and visual adaptation without removing meaning from HTML.", "CSS controla presentación, layout y adaptación visual sin quitar significado al HTML."],
    focus: ["Cascata, especificidade, box model, fluxo, Flexbox, Grid, responsividade e estados de foco.", "Cascade, specificity, box model, flow, Flexbox, Grid, responsiveness and focus states.", "Cascada, especificidad, box model, flujo, Flexbox, Grid, responsividad y estados de foco."],
    project: ["Reproduza um layout em três larguras sem framework e documente as decisões responsivas.", "Rebuild a layout at three widths without a framework and document responsive decisions.", "Reproduce un layout en tres anchos sin framework y documenta las decisiones responsivas."],
    prerequisites: [["HTML básico."], ["Basic HTML."], ["HTML básico."]],
    relations: [relation("html", "prerequisite"), relation("acessibilidade-web", "pairs-with"), relation("performance-web", "pairs-with")],
    officialUrl: "https://www.w3.org/Style/CSS/",
    docsUrl: "https://developer.mozilla.org/docs/Web/CSS",
    roles: ["Desenvolvedor front-end", "UI Engineer", "Web Designer"]
  },
  javascript: {
    why: ["JavaScript acrescenta comportamento à web e também executa em servidores e ferramentas.", "JavaScript adds behavior to the web and also runs on servers and tooling.", "JavaScript añade comportamiento a la web y también se ejecuta en servidores y herramientas."],
    focus: ["Tipos, funções, objetos, módulos, eventos, DOM, promessas, async/await e tratamento de erros.", "Types, functions, objects, modules, events, DOM, promises, async/await and error handling.", "Tipos, funciones, objetos, módulos, eventos, DOM, promesas, async/await y manejo de errores."],
    project: ["Aplicação de tarefas que persiste dados, trata estados vazios e consome uma API.", "A task app that persists data, handles empty states and consumes an API.", "Aplicación de tareas que persista datos, maneje estados vacíos y consuma una API."],
    prerequisites: [["Lógica de programação; HTML e CSS para uso no navegador."], ["Programming logic; HTML and CSS for browser work."], ["Lógica de programación; HTML y CSS para uso en el navegador."]],
    relations: [relation("logica-programacao", "prerequisite"), relation("html", "pairs-with"), relation("css", "pairs-with"), relation("typescript", "next-step"), relation("nodejs", "ecosystem")],
    officialUrl: "https://tc39.es/ecma262/",
    docsUrl: "https://developer.mozilla.org/docs/Web/JavaScript",
    roles: ["Desenvolvedor front-end", "Desenvolvedor back-end", "QA Automation Engineer"]
  },
  typescript: {
    why: ["TypeScript torna contratos e estados do JavaScript explícitos antes da execução.", "TypeScript makes JavaScript contracts and states explicit before runtime.", "TypeScript hace explícitos contratos y estados de JavaScript antes de ejecutar."],
    focus: ["Inferência, unions, narrowing, interfaces, generics, módulos e configuração gradual.", "Inference, unions, narrowing, interfaces, generics, modules and gradual configuration.", "Inferencia, unions, narrowing, interfaces, generics, módulos y configuración gradual."],
    project: ["Migre um projeto JavaScript pequeno e registre quais erros os tipos encontraram.", "Migrate a small JavaScript project and record which errors the types caught.", "Migra un proyecto JavaScript pequeño y registra qué errores encontraron los tipos."],
    prerequisites: [["JavaScript, módulos e ferramentas de build."], ["JavaScript, modules and build tooling."], ["JavaScript, módulos y herramientas de build."]],
    relations: [relation("javascript", "prerequisite"), relation("react", "pairs-with"), relation("nodejs", "pairs-with")],
    officialUrl: "https://www.typescriptlang.org/",
    docsUrl: "https://www.typescriptlang.org/docs/",
    roles: ["Desenvolvedor front-end", "Desenvolvedor Node.js", "Software Engineer"]
  },
  git: {
    why: ["Git registra a história do trabalho e permite integrar mudanças independentes com rastreabilidade.", "Git records work history and enables traceable integration of independent changes.", "Git registra la historia del trabajo y permite integrar cambios independientes con trazabilidad."],
    focus: ["Working tree, stage, commits, branches, merge, rebase, remotes, conflitos e recuperação.", "Working tree, stage, commits, branches, merge, rebase, remotes, conflicts and recovery.", "Working tree, stage, commits, branches, merge, rebase, remotes, conflictos y recuperación."],
    project: ["Versione um projeto desde o início com commits pequenos, branches e uma correção de conflito documentada.", "Version a project from the start with small commits, branches and a documented conflict resolution.", "Versiona un proyecto desde el inicio con commits pequeños, branches y una resolución de conflicto documentada."],
    prerequisites: [["Arquivos, diretórios e terminal básico."], ["Files, directories and a basic terminal."], ["Archivos, directorios y terminal básico."]],
    relations: [relation("terminal-shell", "prerequisite"), relation("git-workflow", "next-step"), relation("github", "pairs-with"), relation("pull-request", "next-step")],
    officialUrl: "https://git-scm.com/",
    docsUrl: "https://git-scm.com/doc",
    roles: ["Todas as funções que colaboram em código ou conteúdo versionado"]
  },
  github: {
    why: ["GitHub adiciona colaboração, revisão, automação e visibilidade a repositórios Git.", "GitHub adds collaboration, review, automation and visibility to Git repositories.", "GitHub añade colaboración, revisión, automatización y visibilidad a repositorios Git."],
    focus: ["Repositórios, issues, pull requests, revisão, Actions, releases, segurança e perfil público.", "Repositories, issues, pull requests, review, Actions, releases, security and public profile.", "Repositorios, issues, pull requests, revisión, Actions, releases, seguridad y perfil público."],
    project: ["Organize um repositório público com README, issues, pull request e validação automática.", "Organize a public repository with a README, issues, a pull request and automated checks.", "Organiza un repositorio público con README, issues, pull request y validación automática."],
    prerequisites: [["Git e noções de colaboração."], ["Git and basic collaboration."], ["Git y nociones de colaboración."]],
    relations: [relation("git", "prerequisite"), relation("pull-request", "ecosystem"), relation("githubactions", "ecosystem"), relation("gitlab", "alternative")],
    officialUrl: "https://github.com/",
    docsUrl: "https://docs.github.com/",
    roles: ["Desenvolvedor", "DevOps Engineer", "Data Engineer", "QA Engineer"]
  },
  sql: {
    why: ["SQL descreve quais dados relacionais devem ser lidos ou alterados sem ditar cada passo de execução.", "SQL describes which relational data should be read or changed without prescribing every execution step.", "SQL describe qué datos relacionales deben leerse o cambiarse sin indicar cada paso de ejecución."],
    focus: ["SELECT, filtros, joins, agregações, subconsultas, CTEs, escrita, transações e planos de execução.", "SELECT, filters, joins, aggregations, subqueries, CTEs, writes, transactions and query plans.", "SELECT, filtros, joins, agregaciones, subconsultas, CTEs, escritura, transacciones y planes de ejecución."],
    project: ["Modele uma pequena operação e responda dez perguntas de negócio com consultas explicadas.", "Model a small operation and answer ten business questions with explained queries.", "Modela una pequeña operación y responde diez preguntas de negocio con consultas explicadas."],
    prerequisites: [["Lógica básica e noção de tabelas."], ["Basic logic and an understanding of tables."], ["Lógica básica y noción de tablas."]],
    relations: [relation("modelagem-dados", "pairs-with"), relation("postgresql", "ecosystem"), relation("indices", "next-step"), relation("transacoes", "next-step")],
    officialUrl: "https://www.iso.org/standard/76583.html",
    docsUrl: "https://www.postgresql.org/docs/current/tutorial-sql.html",
    roles: ["Desenvolvedor back-end", "Analista de dados", "Data Engineer", "DBA"]
  },
  postgresql: {
    why: ["PostgreSQL oferece persistência relacional, transações e recursos extensíveis para aplicações e dados.", "PostgreSQL provides relational persistence, transactions and extensible features for applications and data.", "PostgreSQL ofrece persistencia relacional, transacciones y funciones extensibles para aplicaciones y datos."],
    focus: ["Schemas, tipos, constraints, índices, transações, concorrência, JSONB, backup e análise de consultas.", "Schemas, types, constraints, indexes, transactions, concurrency, JSONB, backup and query analysis.", "Schemas, tipos, constraints, índices, transacciones, concurrencia, JSONB, backup y análisis de consultas."],
    project: ["Banco de uma aplicação de reservas com constraints, transação concorrente, índices e backup testado.", "A booking database with constraints, a concurrent transaction, indexes and a tested backup.", "Base de reservas con constraints, transacción concurrente, índices y backup probado."],
    prerequisites: [["SQL e modelagem relacional."], ["SQL and relational modeling."], ["SQL y modelado relacional."]],
    relations: [relation("sql", "prerequisite"), relation("modelagem-dados", "prerequisite"), relation("indices", "pairs-with"), relation("transacoes", "pairs-with"), relation("mysql", "alternative")],
    officialUrl: "https://www.postgresql.org/",
    docsUrl: "https://www.postgresql.org/docs/",
    roles: ["Desenvolvedor back-end", "Data Engineer", "Analytics Engineer", "DBA"]
  },
  nodejs: {
    why: ["Node.js executa JavaScript fora do navegador com um modelo orientado a eventos e amplo ecossistema.", "Node.js runs JavaScript outside the browser with an event-driven model and broad ecosystem.", "Node.js ejecuta JavaScript fuera del navegador con un modelo orientado a eventos y amplio ecosistema."],
    focus: ["Event loop, módulos, npm, arquivos, streams, HTTP, erros, processos, segurança e observabilidade.", "Event loop, modules, npm, files, streams, HTTP, errors, processes, security and observability.", "Event loop, módulos, npm, archivos, streams, HTTP, errores, procesos, seguridad y observabilidad."],
    project: ["API HTTP pequena sem framework, seguida de uma versão estruturada com testes e logs.", "A small HTTP API without a framework, followed by a structured version with tests and logs.", "API HTTP pequeña sin framework, seguida de una versión estructurada con pruebas y logs."],
    prerequisites: [["JavaScript, terminal, HTTP e programação assíncrona."], ["JavaScript, terminal, HTTP and asynchronous programming."], ["JavaScript, terminal, HTTP y programación asíncrona."]],
    relations: [relation("javascript", "prerequisite"), relation("http", "prerequisite"), relation("typescript", "pairs-with"), relation("express", "ecosystem"), relation("nestjs", "ecosystem")],
    officialUrl: "https://nodejs.org/",
    docsUrl: "https://nodejs.org/docs/latest/api/",
    roles: ["Desenvolvedor back-end", "Full-stack Developer", "Platform Engineer"]
  },
  react: {
    why: ["React organiza interfaces como componentes que derivam visual do estado.", "React organizes interfaces as components that derive UI from state.", "React organiza interfaces como componentes que derivan la vista del estado."],
    focus: ["Componentes, props, estado, eventos, efeitos, composição, formulários, acessibilidade e testes.", "Components, props, state, events, effects, composition, forms, accessibility and testing.", "Componentes, props, estado, eventos, efectos, composición, formularios, accesibilidad y pruebas."],
    project: ["Painel de dados com filtros, URL compartilhável, estados de erro e testes de interação.", "A data dashboard with filters, shareable URLs, error states and interaction tests.", "Panel de datos con filtros, URL compartible, estados de error y pruebas de interacción."],
    prerequisites: [["HTML, CSS e JavaScript sólido."], ["Solid HTML, CSS and JavaScript."], ["HTML, CSS y JavaScript sólidos."]],
    relations: [relation("javascript", "prerequisite"), relation("html", "prerequisite"), relation("css", "prerequisite"), relation("typescript", "pairs-with"), relation("nextjs", "next-step"), relation("vue", "alternative")],
    officialUrl: "https://react.dev/",
    docsUrl: "https://react.dev/learn",
    roles: ["Desenvolvedor front-end", "Full-stack Developer", "UI Engineer"]
  },
  nextjs: {
    why: ["Next.js integra roteamento, renderização e recursos de servidor ao ecossistema React.", "Next.js integrates routing, rendering and server capabilities into the React ecosystem.", "Next.js integra routing, renderizado y funciones de servidor al ecosistema React."],
    focus: ["App Router, limites cliente/servidor, renderização, dados, cache, rotas, metadados e deploy.", "App Router, client/server boundaries, rendering, data, caching, routes, metadata and deployment.", "App Router, límites cliente/servidor, renderizado, datos, caché, rutas, metadatos y deploy."],
    project: ["Diretório de conteúdo com busca, páginas estáticas, metadados e uma mutação validada no servidor.", "A content directory with search, static pages, metadata and a server-validated mutation.", "Directorio de contenido con búsqueda, páginas estáticas, metadatos y una mutación validada en servidor."],
    prerequisites: [["React, TypeScript, HTTP e noções de servidor."], ["React, TypeScript, HTTP and server basics."], ["React, TypeScript, HTTP y nociones de servidor."]],
    relations: [relation("react", "prerequisite"), relation("typescript", "pairs-with"), relation("nodejs", "ecosystem"), relation("vercel", "pairs-with"), relation("remix", "alternative")],
    officialUrl: "https://nextjs.org/",
    docsUrl: "https://nextjs.org/docs",
    roles: ["Desenvolvedor front-end", "Full-stack Developer", "Web Developer"]
  },
  python: {
    why: ["Python privilegia legibilidade e possui ecossistemas fortes para automação, dados, IA e web.", "Python favors readability and has strong ecosystems for automation, data, AI and web.", "Python favorece legibilidad y tiene ecosistemas fuertes para automatización, datos, IA y web."],
    focus: ["Tipos, coleções, funções, módulos, ambientes virtuais, exceções, arquivos, testes e ferramentas.", "Types, collections, functions, modules, virtual environments, exceptions, files, tests and tooling.", "Tipos, colecciones, funciones, módulos, entornos virtuales, excepciones, archivos, pruebas y herramientas."],
    project: ["Automação que lê dados, valida entradas, gera relatório e possui testes e interface de linha de comando.", "An automation tool that reads data, validates input, produces a report and includes tests and a CLI.", "Automatización que lea datos, valide entradas, genere informe y tenga pruebas y CLI."],
    prerequisites: [["Lógica de programação e terminal básico."], ["Programming logic and a basic terminal."], ["Lógica de programación y terminal básico."]],
    relations: [relation("logica-programacao", "prerequisite"), relation("terminal-shell", "pairs-with"), relation("fastapi", "ecosystem"), relation("pytorch", "ecosystem"), relation("scikitlearn", "ecosystem")],
    officialUrl: "https://www.python.org/",
    docsUrl: "https://docs.python.org/3/",
    roles: ["Desenvolvedor back-end", "Analista de dados", "Data Scientist", "Automation Engineer"]
  },
  docker: {
    why: ["Docker empacota aplicação e dependências em imagens reproduzíveis executadas como contêineres.", "Docker packages applications and dependencies into reproducible images run as containers.", "Docker empaqueta aplicaciones y dependencias en imágenes reproducibles ejecutadas como contenedores."],
    focus: ["Imagens, camadas, Dockerfile, build context, volumes, redes, Compose, registros e segurança.", "Images, layers, Dockerfile, build context, volumes, networks, Compose, registries and security.", "Imágenes, capas, Dockerfile, build context, volúmenes, redes, Compose, registros y seguridad."],
    project: ["Empacote uma API e um banco com healthchecks, usuário sem privilégios e ambiente de desenvolvimento reproduzível.", "Package an API and database with health checks, a non-root user and a reproducible development environment.", "Empaqueta una API y una base con healthchecks, usuario sin privilegios y entorno reproducible."],
    prerequisites: [["Linux básico, processos, redes, terminal e variáveis de ambiente."], ["Basic Linux, processes, networking, terminal and environment variables."], ["Linux básico, procesos, redes, terminal y variables de entorno."]],
    relations: [relation("linux", "prerequisite"), relation("terminal-shell", "prerequisite"), relation("env-vars", "pairs-with"), relation("ci-cd", "pairs-with"), relation("kubernetes", "next-step")],
    officialUrl: "https://www.docker.com/",
    docsUrl: "https://docs.docker.com/",
    roles: ["Desenvolvedor back-end", "DevOps Engineer", "ML Engineer", "Platform Engineer"]
  },
  linux: {
    why: ["Linux sustenta grande parte de servidores, contêineres, cloud e ferramentas de desenvolvimento.", "Linux underpins much of servers, containers, cloud and development tooling.", "Linux sostiene gran parte de servidores, contenedores, cloud y herramientas de desarrollo."],
    focus: ["Sistema de arquivos, permissões, processos, pacotes, serviços, shell, rede, logs e acesso remoto.", "File systems, permissions, processes, packages, services, shell, networking, logs and remote access.", "Sistema de archivos, permisos, procesos, paquetes, servicios, shell, red, logs y acceso remoto."],
    project: ["Configure uma máquina virtual com usuário restrito, serviço, firewall, logs, backup e runbook.", "Configure a virtual machine with a restricted user, service, firewall, logs, backup and runbook.", "Configura una máquina virtual con usuario restringido, servicio, firewall, logs, backup y runbook."],
    prerequisites: [["Noções de computador, arquivos e terminal."], ["Computer, file and terminal basics."], ["Nociones de computador, archivos y terminal."]],
    relations: [relation("terminal-shell", "pairs-with"), relation("tcp-ip", "pairs-with"), relation("docker", "next-step"), relation("nginx", "next-step"), relation("windows", "alternative")],
    officialUrl: "https://kernel.org/",
    docsUrl: "https://docs.kernel.org/",
    roles: ["Sysadmin", "DevOps Engineer", "Security Analyst", "Cloud Engineer"]
  }
};

const applyGuide = (technology: Technology, seed: GuideSeed): Technology => ({
  ...technology,
  explanation: localized(...seed.why),
  problem: localized(...seed.why),
  inPractice: localized(...seed.focus),
  studyWhen: localized(
    `Estude ${technology.name} quando os pré-requisitos abaixo estiverem confortáveis e a tecnologia aparecer na trilha ou no projeto escolhido.`,
    `Study ${technology.name} when the prerequisites below feel comfortable and it appears in your chosen path or project.`,
    `Estudia ${technology.name} cuando los requisitos estén claros y aparezca en la ruta o proyecto elegido.`
  ),
  notPriorityWhen: localized(
    `Não priorize ${technology.name} apenas por popularidade. Primeiro confirme se ele resolve um problema do caminho que você escolheu.`,
    `Do not prioritize ${technology.name} for popularity alone. First confirm it solves a problem in your chosen path.`,
    `No priorices ${technology.name} solo por popularidad. Confirma primero que resuelve un problema de tu ruta.`
  ),
  prerequisites: localizedList(...seed.prerequisites),
  fundamentals: [localized(...seed.focus)],
  strengths: [localized(...seed.why)],
  limitations: [technology.avoidWhen],
  useCases: [localized(...seed.focus)],
  examples: [localized(...seed.project)],
  commonMistakes: [technology.avoidWhen],
  bestPractices: [localized(...seed.focus)],
  studyOrder: [
    localized("Revise os pré-requisitos.", "Review the prerequisites.", "Revisa los requisitos."),
    localized(...seed.focus),
    localized("Construa sem tutorial e explique as decisões.", "Build without a tutorial and explain the decisions.", "Construye sin tutorial y explica las decisiones.")
  ],
  projectIdeas: [localized(...seed.project)],
  roles: seed.roles,
  nextSteps: [
    localized(
      "Conecte o projeto a testes, documentação e uma tecnologia complementar indicada abaixo.",
      "Connect the project to tests, documentation and a complementary technology listed below.",
      "Conecta el proyecto con pruebas, documentación y una tecnología complementaria indicada abajo."
    )
  ],
  relations: seed.relations,
  officialUrl: seed.officialUrl,
  docsUrl: seed.docsUrl,
  reviewedAt: "2026-06-30"
});

export const buildTechnologyCatalog = (base: Technology[]): Technology[] => {
  const enhanced = base.map((technology) => {
    const guide = guides[technology.id];
    return guide ? applyGuide(technology, guide) : technology;
  });
  const existingIds = new Set(enhanced.map((technology) => technology.id));
  return applyTechnologyEssays(applyDomainGuides([
    ...enhanced,
    ...foundationalTechnologies.filter((technology) => !existingIds.has(technology.id))
  ]));
};
