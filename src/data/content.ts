import type {
  Area,
  GlossaryTerm,
  Project,
  Roadmap,
  SimpleCollectionItem,
  Technology
} from "@/lib/content-types";
import type { Localized } from "@/lib/i18n";
import { buildTechnologyCatalog } from "@/data/technologies";
import { roadmapAdditions } from "@/data/roadmap-additions";
import { glossaryAdditions } from "@/data/glossary-additions";
import { validateContent } from "@/data/validate-content";
import { enhanceProjects } from "@/data/project-guides";
import { roadmapStepReason } from "@/data/roadmap-step-reasons";

const l = (pt: string, en: string, es: string): Localized => ({ pt, en, es });

type LegacyTechnologyType = "linguagem" | "framework" | "ferramenta" | "banco" | "cloud" | "conceito";

const technicalType = (id: string, type: LegacyTechnologyType): Technology["type"] => {
  if (id === "nodejs") return "runtime";
  if (["react", "pytorch", "scikitlearn"].includes(id)) return "biblioteca";
  if (["unity", "unreal"].includes(id)) return "engine";
  if (["vscode", "intellij"].includes(id)) return "ide-editor";
  if (["playwright", "vitest", "postman"].includes(id)) return "ferramenta-teste";
  if (["grafana", "prometheus", "sentry", "datadog"].includes(id)) return "observabilidade";
  if (["wireshark", "nmap", "sonarqube"].includes(id)) return "seguranca";
  if (id === "figma") return "design";
  if (id === "jira") return "produto";
  if (id === "linux") return "sistema-operacional";
  if (["docker", "kubernetes", "terraform", "githubactions", "gitlab", "jenkins", "kafka", "rabbitmq", "nginx", "ansible"].includes(id)) return "infraestrutura";
  if (type === "banco") return id === "qdrant" ? "banco-vetorial" : "banco-dados";
  if (type === "cloud") {
    return ["aws", "azure", "gcp", "digitalocean"].includes(id) ? "provedor-cloud" : "plataforma";
  }
  return type;
};

const technologyDomains = (id: string, areaIds: string[]): Technology["domains"] => {
  const special: Record<string, Technology["domains"]> = {
    html: ["fundamentos", "web", "frontend"],
    css: ["fundamentos", "web", "frontend", "ux-ui"],
    javascript: ["fundamentos", "web", "frontend", "backend"],
    typescript: ["web", "frontend", "backend"],
    swift: ["mobile"],
    kotlin: ["mobile", "backend"],
    dart: ["mobile"],
    flutter: ["mobile"],
    reactnative: ["mobile"],
    electron: ["desktop"],
    unity: ["games"],
    unreal: ["games"],
    figma: ["ux-ui", "produto"],
    nodejs: ["backend"],
    nextjs: ["frontend", "backend", "fullstack"],
    nuxt: ["frontend", "backend", "fullstack"],
    remix: ["frontend", "backend", "fullstack"]
  };
  if (special[id]) return special[id];
  const map: Record<string, Technology["domains"][number]> = {
    frontend: "frontend",
    backend: "backend",
    dados: "dados",
    ia: "ia",
    devops: "devops",
    cloud: "cloud",
    seguranca: "seguranca",
    qa: "qa",
    ux: "ux-ui",
    suporte: "infraestrutura"
  };
  return [...new Set(areaIds.map((areaId) => map[areaId]).filter(Boolean))];
};

export const areas: Area[] = [
  {
    id: "frontend",
    name: l("Front-end", "Front-end", "Front-end"),
    eyebrow: l("Interfaces que funcionam", "Interfaces that work", "Interfaces que funcionan"),
    description: l("Constrói a parte dos produtos digitais que as pessoas veem, entendem e usam.", "Builds the part of digital products people see, understand and use.", "Construye la parte de los productos digitales que las personas ven, entienden y usan."),
    longDescription: l("Front-end combina programação, interface e comportamento. O trabalho vai muito além de deixar uma tela bonita: envolve acessibilidade, desempenho, integração com APIs, estados complexos e decisões que afetam diretamente a experiência.", "Front-end combines programming, interface and behavior. It goes far beyond making screens look good: accessibility, performance, API integration and complex state are part of the job.", "Front-end combina programación, interfaz y comportamiento. Va mucho más allá de crear pantallas bonitas: incluye accesibilidad, rendimiento, APIs y estados complejos."),
    category: "desenvolvimento", icon: "PanelsTopLeft", accent: "#ff6b35", difficulty: 3, remote: "alto", freelance: "alto", math: "baixa",
    routine: [l("Transformar layouts em componentes responsivos", "Turn layouts into responsive components", "Convertir diseños en componentes responsivos"), l("Integrar APIs e tratar estados de erro e carregamento", "Integrate APIs and handle loading and errors", "Integrar APIs y tratar carga y errores"), l("Revisar acessibilidade e desempenho", "Review accessibility and performance", "Revisar accesibilidad y rendimiento")],
    skills: [l("HTML semântico e CSS", "Semantic HTML and CSS", "HTML semántico y CSS"), l("JavaScript e TypeScript", "JavaScript and TypeScript", "JavaScript y TypeScript"), l("Acessibilidade e testes", "Accessibility and testing", "Accesibilidad y pruebas")],
    roles: ["Desenvolvedor front-end", "UI Engineer", "Web Developer"], technologies: ["html", "css", "javascript", "typescript", "react", "nextjs"], firstProject: l("Dashboard responsivo consumindo uma API pública", "Responsive dashboard using a public API", "Dashboard responsivo usando una API pública"), related: ["backend", "ux", "qa"]
  },
  {
    id: "backend",
    name: l("Back-end", "Back-end", "Back-end"),
    eyebrow: l("Regras, dados e integrações", "Rules, data and integrations", "Reglas, datos e integraciones"),
    description: l("Cuida da lógica, dos dados, da segurança e das integrações por trás de uma aplicação.", "Handles the logic, data, security and integrations behind an application.", "Se ocupa de la lógica, los datos, la seguridad y las integraciones de una aplicación."),
    longDescription: l("Back-end é onde regras de negócio viram software confiável. APIs, bancos, autenticação, filas e observabilidade formam sistemas que precisam continuar corretos mesmo sob falhas e picos de uso.", "Back-end turns business rules into reliable software. APIs, databases, authentication, queues and observability form systems that must stay correct under failures and traffic spikes.", "Back-end convierte reglas de negocio en software confiable. APIs, bases de datos, autenticación, colas y observabilidad forman sistemas resistentes."),
    category: "desenvolvimento", icon: "Braces", accent: "#2d7ff9", difficulty: 4, remote: "alto", freelance: "medio", math: "media",
    routine: [l("Modelar regras e dados", "Model rules and data", "Modelar reglas y datos"), l("Criar, testar e documentar APIs", "Build, test and document APIs", "Crear, probar y documentar APIs"), l("Investigar logs, falhas e gargalos", "Investigate logs, failures and bottlenecks", "Investigar logs, fallos y cuellos de botella")],
    skills: [l("HTTP, APIs e segurança", "HTTP, APIs and security", "HTTP, APIs y seguridad"), l("SQL e modelagem", "SQL and data modeling", "SQL y modelado"), l("Testes e observabilidade", "Testing and observability", "Pruebas y observabilidad")],
    roles: ["Desenvolvedor back-end", "API Engineer", "Software Engineer"], technologies: ["typescript", "nodejs", "python", "java", "postgresql", "redis"], firstProject: l("API de chamados com autenticação e permissões", "Ticket API with authentication and permissions", "API de tickets con autenticación y permisos"), related: ["frontend", "devops", "dados"]
  },
  {
    id: "dados",
    name: l("Dados & BI", "Data & BI", "Datos y BI"),
    eyebrow: l("Decisões com evidência", "Evidence-based decisions", "Decisiones con evidencia"),
    description: l("Organiza, analisa e comunica dados para responder perguntas reais de negócio.", "Organizes, analyzes and communicates data to answer real business questions.", "Organiza, analiza y comunica datos para responder preguntas reales de negocio."),
    longDescription: l("A área conecta fontes dispersas, melhora a qualidade dos dados e transforma números em decisões. Um bom profissional não entrega só gráficos: entende a pergunta, as limitações da base e o impacto da conclusão.", "The field connects scattered sources, improves data quality and turns numbers into decisions. Good practitioners understand the question, data limitations and the impact of their conclusions.", "El área conecta fuentes, mejora la calidad de los datos y convierte números en decisiones. Un buen profesional entiende la pregunta, los límites y el impacto."),
    category: "dados", icon: "ChartNoAxesCombined", accent: "#00a878", difficulty: 3, remote: "alto", freelance: "medio", math: "media",
    routine: [l("Consultar e validar dados", "Query and validate data", "Consultar y validar datos"), l("Construir métricas e dashboards", "Build metrics and dashboards", "Crear métricas y dashboards"), l("Apresentar conclusões para áreas de negócio", "Present findings to business teams", "Presentar conclusiones al negocio")],
    skills: [l("SQL e planilhas", "SQL and spreadsheets", "SQL y hojas de cálculo"), l("Visualização e storytelling", "Visualization and storytelling", "Visualización y storytelling"), l("Estatística descritiva", "Descriptive statistics", "Estadística descriptiva")],
    roles: ["Analista de dados", "Analista de BI", "Analytics Engineer"], technologies: ["sql", "postgresql", "python", "powerbi", "dbt"], firstProject: l("Painel de vendas com dicionário de métricas", "Sales dashboard with a metric dictionary", "Panel de ventas con diccionario de métricas"), related: ["ia", "backend", "cloud"]
  },
  {
    id: "ia",
    name: l("IA & Machine Learning", "AI & Machine Learning", "IA y Machine Learning"),
    eyebrow: l("Modelos com propósito", "Purposeful models", "Modelos con propósito"),
    description: l("Desenvolve sistemas que reconhecem padrões, geram conteúdo ou apoiam decisões.", "Builds systems that recognize patterns, generate content or support decisions.", "Desarrolla sistemas que reconocen patrones, generan contenido o apoyan decisiones."),
    longDescription: l("IA aplicada começa pelo problema e pelos dados, não pelo modelo da moda. O trabalho envolve experimentação, avaliação, custos, segurança e monitoramento contínuo para evitar respostas erradas ou degradadas.", "Applied AI starts with the problem and data, not the fashionable model. Work includes experimentation, evaluation, cost, safety and continuous monitoring.", "La IA aplicada empieza por el problema y los datos, no por el modelo de moda. Incluye experimentación, evaluación, costos, seguridad y monitoreo."),
    category: "dados", icon: "Sparkles", accent: "#8f5cff", difficulty: 5, remote: "alto", freelance: "medio", math: "alta",
    routine: [l("Preparar dados e definir métricas de avaliação", "Prepare data and define evaluation metrics", "Preparar datos y definir métricas"), l("Treinar ou integrar modelos", "Train or integrate models", "Entrenar o integrar modelos"), l("Monitorar qualidade, viés e custo", "Monitor quality, bias and cost", "Monitorear calidad, sesgo y costo")],
    skills: [l("Python e estatística", "Python and statistics", "Python y estadística"), l("Machine learning e avaliação", "Machine learning and evaluation", "Machine learning y evaluación"), l("Engenharia de dados e APIs", "Data engineering and APIs", "Ingeniería de datos y APIs")],
    roles: ["ML Engineer", "Cientista de dados", "AI Engineer"], technologies: ["python", "pytorch", "scikitlearn", "qdrant", "docker"], firstProject: l("Assistente RAG com avaliação e fontes citadas", "RAG assistant with evaluation and cited sources", "Asistente RAG con evaluación y fuentes citadas"), related: ["dados", "backend", "cloud"]
  },
  {
    id: "devops",
    name: l("DevOps & SRE", "DevOps & SRE", "DevOps y SRE"),
    eyebrow: l("Entrega confiável", "Reliable delivery", "Entrega confiable"),
    description: l("Automatiza a entrega e mantém sistemas observáveis, seguros e disponíveis.", "Automates delivery and keeps systems observable, secure and available.", "Automatiza la entrega y mantiene sistemas observables, seguros y disponibles."),
    longDescription: l("DevOps aproxima desenvolvimento e operação por meio de automação e responsabilidade compartilhada. SRE acrescenta práticas de engenharia, indicadores e orçamento de erro para equilibrar confiabilidade e velocidade.", "DevOps brings development and operations together through automation and shared ownership. SRE adds engineering practices, indicators and error budgets.", "DevOps acerca desarrollo y operaciones mediante automatización y responsabilidad compartida. SRE suma indicadores y presupuestos de error."),
    category: "infraestrutura", icon: "Container", accent: "#e74c3c", difficulty: 4, remote: "alto", freelance: "medio", math: "baixa",
    routine: [l("Manter pipelines e infraestrutura como código", "Maintain pipelines and infrastructure as code", "Mantener pipelines e infraestructura como código"), l("Responder a alertas e incidentes", "Respond to alerts and incidents", "Responder alertas e incidentes"), l("Remover trabalho manual repetitivo", "Remove repetitive manual work", "Eliminar trabajo manual repetitivo")],
    skills: [l("Linux, redes e shell", "Linux, networks and shell", "Linux, redes y shell"), l("Containers e cloud", "Containers and cloud", "Contenedores y cloud"), l("CI/CD e observabilidade", "CI/CD and observability", "CI/CD y observabilidad")],
    roles: ["DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"], technologies: ["linux", "docker", "kubernetes", "terraform", "githubactions", "grafana"], firstProject: l("Aplicação em containers com CI/CD e monitoramento", "Containerized app with CI/CD and monitoring", "Aplicación en contenedores con CI/CD y monitoreo"), related: ["cloud", "backend", "seguranca"]
  },
  {
    id: "cloud",
    name: l("Cloud Computing", "Cloud Computing", "Cloud Computing"),
    eyebrow: l("Infraestrutura sob demanda", "Infrastructure on demand", "Infraestructura bajo demanda"),
    description: l("Projeta e opera aplicações usando serviços de computação, dados, rede e segurança na nuvem.", "Designs and operates applications using cloud compute, data, network and security services.", "Diseña y opera aplicaciones usando servicios de cómputo, datos, red y seguridad en la nube."),
    longDescription: l("Cloud não é apenas alugar um servidor. Arquitetura, identidade, custos, resiliência e automação precisam caminhar juntos para que a flexibilidade não vire uma conta imprevisível ou uma superfície de ataque maior.", "Cloud is more than renting a server. Architecture, identity, cost, resilience and automation must work together.", "Cloud no es solo alquilar un servidor. Arquitectura, identidad, costos, resiliencia y automatización deben trabajar juntos."),
    category: "infraestrutura", icon: "CloudCog", accent: "#168aad", difficulty: 4, remote: "alto", freelance: "medio", math: "baixa",
    routine: [l("Desenhar arquiteturas e políticas de acesso", "Design architectures and access policies", "Diseñar arquitecturas y políticas de acceso"), l("Automatizar ambientes", "Automate environments", "Automatizar entornos"), l("Acompanhar disponibilidade e custos", "Track availability and costs", "Controlar disponibilidad y costos")],
    skills: [l("Redes e IAM", "Networking and IAM", "Redes e IAM"), l("Arquitetura distribuída", "Distributed architecture", "Arquitectura distribuida"), l("FinOps e segurança", "FinOps and security", "FinOps y seguridad")],
    roles: ["Cloud Engineer", "Cloud Architect", "FinOps Analyst"], technologies: ["aws", "azure", "gcp", "cloudflare", "terraform", "kubernetes"], firstProject: l("Ambiente web resiliente criado com Terraform", "Resilient web environment provisioned with Terraform", "Entorno web resiliente creado con Terraform"), related: ["devops", "seguranca", "backend"]
  },
  {
    id: "seguranca",
    name: l("Cibersegurança", "Cybersecurity", "Ciberseguridad"),
    eyebrow: l("Risco sob controle", "Risk under control", "Riesgo bajo control"),
    description: l("Protege sistemas, dados e pessoas por meio de prevenção, detecção e resposta.", "Protects systems, data and people through prevention, detection and response.", "Protege sistemas, datos y personas mediante prevención, detección y respuesta."),
    longDescription: l("Segurança é uma disciplina de risco, não uma coleção de ferramentas. Inclui políticas, arquitetura, testes autorizados, monitoramento e resposta. Laboratórios devem ser próprios ou ter autorização explícita.", "Security is a risk discipline, not a tool collection. It includes policy, architecture, authorized testing, monitoring and response.", "La seguridad es una disciplina de riesgo, no una colección de herramientas. Incluye políticas, arquitectura, pruebas autorizadas y respuesta."),
    category: "seguranca", icon: "ShieldCheck", accent: "#d1495b", difficulty: 4, remote: "alto", freelance: "baixo", math: "media",
    routine: [l("Analisar eventos, vulnerabilidades e riscos", "Analyze events, vulnerabilities and risk", "Analizar eventos, vulnerabilidades y riesgos"), l("Aplicar hardening e controles", "Apply hardening and controls", "Aplicar hardening y controles"), l("Documentar e responder a incidentes", "Document and respond to incidents", "Documentar y responder incidentes")],
    skills: [l("Redes, sistemas e criptografia", "Networks, systems and cryptography", "Redes, sistemas y criptografía"), l("Análise de logs", "Log analysis", "Análisis de logs"), l("Ética e comunicação", "Ethics and communication", "Ética y comunicación")],
    roles: ["Analista de segurança", "SOC Analyst", "AppSec Engineer"], technologies: ["linux", "wireshark", "nmap", "wazuh", "owasp"], firstProject: l("Laboratório defensivo com hardening e análise de logs", "Defensive lab with hardening and log analysis", "Laboratorio defensivo con hardening y análisis de logs"), related: ["cloud", "devops", "backend"]
  },
  {
    id: "qa",
    name: l("QA & Testes", "QA & Testing", "QA y Pruebas"),
    eyebrow: l("Qualidade por projeto", "Quality by design", "Calidad por diseño"),
    description: l("Ajuda o time a prevenir riscos e entregar software com comportamento verificável.", "Helps teams prevent risk and deliver software with verifiable behavior.", "Ayuda al equipo a prevenir riesgos y entregar software verificable."),
    longDescription: l("QA não é a pessoa que testa tudo no fim. Qualidade nasce nos critérios, passa por testes em diferentes camadas e chega à produção com monitoramento. Automação é um meio; confiança é o resultado.", "QA is not the person who tests everything at the end. Quality starts in criteria, passes through test layers and reaches production with monitoring.", "QA no es quien prueba todo al final. La calidad nace en los criterios, pasa por varias capas y llega a producción con monitoreo."),
    category: "desenvolvimento", icon: "TestTubeDiagonal", accent: "#f4a261", difficulty: 3, remote: "alto", freelance: "medio", math: "baixa",
    routine: [l("Refinar critérios de aceite", "Refine acceptance criteria", "Refinar criterios de aceptación"), l("Planejar e automatizar testes", "Plan and automate tests", "Planificar y automatizar pruebas"), l("Investigar defeitos com o time", "Investigate defects with the team", "Investigar defectos con el equipo")],
    skills: [l("Técnicas de teste", "Test techniques", "Técnicas de prueba"), l("Automação e APIs", "Automation and APIs", "Automatización y APIs"), l("Comunicação de risco", "Risk communication", "Comunicación de riesgo")],
    roles: ["QA Analyst", "QA Automation Engineer", "SDET"], technologies: ["playwright", "vitest", "postman", "javascript"], firstProject: l("Estratégia de testes para um e-commerce de demonstração", "Test strategy for a demo e-commerce", "Estrategia de pruebas para un e-commerce de demo"), related: ["frontend", "backend", "devops"]
  },
  {
    id: "ux",
    name: l("UX & Product Design", "UX & Product Design", "UX y Product Design"),
    eyebrow: l("Problemas antes de telas", "Problems before screens", "Problemas antes que pantallas"),
    description: l("Pesquisa necessidades e desenha experiências compreensíveis, úteis e inclusivas.", "Researches needs and designs understandable, useful and inclusive experiences.", "Investiga necesidades y diseña experiencias comprensibles, útiles e inclusivas."),
    longDescription: l("UX reduz incerteza sobre o que construir. Pesquisa, arquitetura de informação, prototipação e testes ajudam a equilibrar necessidades das pessoas, limites técnicos e objetivos do produto.", "UX reduces uncertainty about what to build. Research, information architecture, prototyping and testing balance people, technology and product goals.", "UX reduce la incertidumbre sobre qué construir. Investigación, arquitectura de información, prototipos y pruebas equilibran personas, tecnología y negocio."),
    category: "design", icon: "DraftingCompass", accent: "#ef476f", difficulty: 3, remote: "alto", freelance: "alto", math: "baixa",
    routine: [l("Pesquisar contexto e comportamento", "Research context and behavior", "Investigar contexto y comportamiento"), l("Mapear fluxos e prototipar", "Map flows and prototype", "Mapear flujos y prototipar"), l("Testar hipóteses e acessibilidade", "Test hypotheses and accessibility", "Probar hipótesis y accesibilidad")],
    skills: [l("Pesquisa e síntese", "Research and synthesis", "Investigación y síntesis"), l("Arquitetura de informação", "Information architecture", "Arquitectura de información"), l("Prototipação e facilitação", "Prototyping and facilitation", "Prototipado y facilitación")],
    roles: ["UX Designer", "Product Designer", "UX Researcher"], technologies: ["figma", "maze", "hotjar"], firstProject: l("Redesenho documentado de um serviço público digital", "Documented redesign of a public digital service", "Rediseño documentado de un servicio público digital"), related: ["frontend", "qa", "dados"]
  },
  {
    id: "suporte",
    name: l("Suporte & Infraestrutura", "Support & Infrastructure", "Soporte e Infraestructura"),
    eyebrow: l("Tecnologia funcionando", "Technology working", "Tecnología funcionando"),
    description: l("Mantém pessoas, equipamentos, redes e serviços trabalhando com segurança e previsibilidade.", "Keeps people, devices, networks and services working safely and predictably.", "Mantiene personas, equipos, redes y servicios funcionando con seguridad y previsibilidad."),
    longDescription: l("Suporte é uma excelente porta de entrada para entender tecnologia em contexto real. Diagnóstico, documentação e atendimento importam tanto quanto saber configurar sistemas, redes e identidades.", "Support is a strong entry point for understanding technology in real contexts. Diagnosis, documentation and service matter as much as systems, networks and identity.", "Soporte es una gran entrada para entender tecnología en contextos reales. Diagnóstico, documentación y atención importan tanto como sistemas y redes."),
    category: "suporte", icon: "LifeBuoy", accent: "#52796f", difficulty: 2, remote: "medio", freelance: "medio", math: "baixa",
    routine: [l("Diagnosticar incidentes e atender usuários", "Diagnose incidents and help users", "Diagnosticar incidentes y atender usuarios"), l("Administrar acessos e equipamentos", "Manage access and equipment", "Administrar accesos y equipos"), l("Documentar soluções e acompanhar SLA", "Document solutions and track SLA", "Documentar soluciones y seguir SLA")],
    skills: [l("Windows, Linux e redes", "Windows, Linux and networks", "Windows, Linux y redes"), l("Diagnóstico estruturado", "Structured diagnosis", "Diagnóstico estructurado"), l("Atendimento e documentação", "Service and documentation", "Atención y documentación")],
    roles: ["Analista de suporte", "Service Desk Analyst", "Sysadmin"], technologies: ["windows", "linux", "active-directory", "zabbix", "glpi"], firstProject: l("Laboratório de rede com inventário e base de conhecimento", "Network lab with inventory and knowledge base", "Laboratorio de red con inventario y base de conocimiento"), related: ["cloud", "seguranca", "devops"]
  }
];

const tech = (
  id: string, name: string, type: LegacyTechnologyType, category: Technology["category"],
  pt: string, en: string, es: string, areas: string[], level: Technology["level"] = "iniciante",
  alternatives: string[] = []
): Technology => {
  const guidance = {
    linguagem: l(
      `Considere ${name} quando seu ecossistema combina com a plataforma, a equipe e o tipo de aplicação. Faça um projeto pequeno antes de decidir pela linguagem.`,
      `Consider ${name} when its ecosystem fits the platform, team and application. Build a small project before committing to it.`,
      `Considera ${name} cuando su ecosistema encaje con la plataforma, el equipo y la aplicación. Haz un proyecto pequeño antes de decidir.`
    ),
    framework: l(
      `${name} vale a pena quando suas convenções eliminam trabalho que o projeto realmente teria. Confira documentação, manutenção e integração com a stack existente.`,
      `${name} is worthwhile when its conventions remove work the project would otherwise need. Check documentation, maintenance and integration.`,
      `${name} vale la pena cuando sus convenciones eliminan trabajo real. Revisa documentación, mantenimiento e integración.`
    ),
    ferramenta: l(
      `Adote ${name} quando ele melhora uma etapa concreta do fluxo — desenvolvimento, teste, entrega ou operação — e há alguém responsável por mantê-lo.`,
      `Adopt ${name} when it improves a concrete development, testing, delivery or operations step and someone can maintain it.`,
      `Adopta ${name} cuando mejore una etapa concreta de desarrollo, pruebas, entrega u operación y alguien pueda mantenerlo.`
    ),
    banco: l(
      `${name} faz sentido quando o formato dos dados, as consultas e as garantias de consistência combinam com o problema. Modele e teste as consultas principais primeiro.`,
      `${name} fits when data shape, query patterns and consistency guarantees match the problem. Model and test the main queries first.`,
      `${name} encaja cuando la forma de datos, consultas y consistencia corresponden al problema. Modela y prueba primero.`
    ),
    cloud: l(
      `Use ${name} quando o serviço gerenciado reduzir operação sem esconder custos ou criar dependência desnecessária. Calcule saída de dados e limites antes do deploy.`,
      `Use ${name} when the managed service reduces operations without hiding cost or creating needless lock-in. Check limits and data egress first.`,
      `Usa ${name} cuando el servicio reduzca operación sin ocultar costos ni crear dependencia innecesaria. Revisa límites y salida de datos.`
    ),
    conceito: l(
      `Aplique ${name} quando ele ajudar a explicar ou resolver uma necessidade observada no sistema.`,
      `Apply ${name} when it helps explain or solve an observed system need.`,
      `Aplica ${name} cuando ayude a explicar o resolver una necesidad observada.`
    )
  }[type];
  const cautions = {
    linguagem: l(`Evite escolher ${name} só por ranking ou salário. A linguagem precisa caber no mercado que você busca e no ambiente em que será executada.`, `Do not choose ${name} only because of rankings or salaries. It must fit your target market and runtime.`, `No elijas ${name} solo por rankings o salarios. Debe encajar con tu mercado y entorno.`),
    framework: l(`Evite ${name} se o projeto é menor que a estrutura exigida ou se a equipe ainda não domina seus fundamentos.`, `Avoid ${name} when the project is smaller than its required structure or the team lacks its foundations.`, `Evita ${name} si el proyecto es menor que su estructura o el equipo no domina sus fundamentos.`),
    ferramenta: l(`Evite colocar ${name} no fluxo sem um problema mensurável; toda ferramenta adiciona configuração, atualização e diagnóstico.`, `Avoid adding ${name} without a measurable problem; every tool adds configuration, upgrades and troubleshooting.`, `Evita añadir ${name} sin un problema medible; toda herramienta agrega configuración y mantenimiento.`),
    banco: l(`Evite ${name} se o padrão principal de consulta contraria seu modelo ou se a equipe não consegue operar backup, restauração e monitoramento.`, `Avoid ${name} if core queries fight its model or the team cannot operate backup, restore and monitoring.`, `Evita ${name} si las consultas chocan con su modelo o el equipo no puede operar backup y monitoreo.`),
    cloud: l(`Evite ${name} quando a conveniência custa mais que a operação suporta ou torna uma migração simples desnecessariamente difícil.`, `Avoid ${name} when convenience costs more than operations can support or makes a simple migration needlessly difficult.`, `Evita ${name} cuando la comodidad cuesta más de lo sostenible o dificulta una migración simple.`),
    conceito: l(`Evite aplicar ${name} como regra universal. Primeiro identifique o problema e o efeito esperado.`, `Avoid treating ${name} as a universal rule. Identify the problem and expected effect first.`, `Evita tratar ${name} como regla universal. Identifica primero el problema y el efecto.`)
  }[type];
  return {
    id,
    name,
    type: technicalType(id, type),
    domains: technologyDomains(id, areas),
    category,
    description: l(pt, en, es),
    useWhen: guidance,
    avoidWhen: cautions,
    alternatives,
    level,
    areaIds: areas
  };
};

const baseTechnologies: Technology[] = [
  tech("html", "HTML", "linguagem", "desenvolvimento", "Estrutura semântica das páginas web.", "Semantic structure of web pages.", "Estructura semántica de páginas web.", ["frontend"]),
  tech("css", "CSS", "linguagem", "desenvolvimento", "Estilos, layout e adaptação visual da web.", "Styles, layout and visual adaptation for the web.", "Estilos, layout y adaptación visual de la web.", ["frontend"]),
  tech("javascript", "JavaScript", "linguagem", "desenvolvimento", "Linguagem nativa de comportamento na web e comum no servidor.", "The web's native behavior language, also common on servers.", "Lenguaje nativo de comportamiento web, también común en servidores.", ["frontend", "backend", "qa"], "iniciante", ["TypeScript"]),
  tech("typescript", "TypeScript", "linguagem", "desenvolvimento", "JavaScript com tipagem estática e melhor suporte a sistemas grandes.", "JavaScript with static types and better support for large systems.", "JavaScript con tipos estáticos y mejor soporte para sistemas grandes.", ["frontend", "backend"], "intermediario", ["JavaScript"]),
  tech("python", "Python", "linguagem", "dados", "Linguagem legível usada em automação, dados, IA e APIs.", "Readable language used in automation, data, AI and APIs.", "Lenguaje legible usado en automatización, datos, IA y APIs.", ["backend", "dados", "ia"]),
  tech("java", "Java", "linguagem", "desenvolvimento", "Ecossistema maduro para sistemas corporativos e de grande escala.", "Mature ecosystem for enterprise and large-scale systems.", "Ecosistema maduro para sistemas empresariales y de gran escala.", ["backend"], "intermediario", ["Kotlin", "C#"]),
  tech("sql", "SQL", "linguagem", "dados", "Linguagem para consultar e transformar dados relacionais.", "Language for querying and transforming relational data.", "Lenguaje para consultar y transformar datos relacionales.", ["backend", "dados"]),
  tech("react", "React", "framework", "desenvolvimento", "Biblioteca baseada em componentes para interfaces.", "Component-based library for user interfaces.", "Biblioteca basada en componentes para interfaces.", ["frontend"], "intermediario", ["Vue", "Svelte"]),
  tech("nextjs", "Next.js", "framework", "desenvolvimento", "Framework React para aplicações renderizadas no servidor e sites estáticos.", "React framework for server-rendered applications and static sites.", "Framework React para aplicaciones en servidor y sitios estáticos.", ["frontend", "backend"], "intermediario", ["Nuxt", "SvelteKit"]),
  tech("nodejs", "Node.js", "framework", "desenvolvimento", "Runtime de JavaScript para servidores, scripts e ferramentas.", "JavaScript runtime for servers, scripts and tooling.", "Runtime de JavaScript para servidores, scripts y herramientas.", ["backend"], "intermediario", ["Deno", "Bun"]),
  tech("nestjs", "NestJS", "framework", "desenvolvimento", "Framework opinativo para APIs Node.js modulares.", "Opinionated framework for modular Node.js APIs.", "Framework opinado para APIs Node.js modulares.", ["backend"], "avancado", ["Fastify", "Express"]),
  tech("fastapi", "FastAPI", "framework", "desenvolvimento", "Framework Python tipado para APIs rápidas e documentadas.", "Typed Python framework for fast, documented APIs.", "Framework Python tipado para APIs rápidas y documentadas.", ["backend", "ia"], "intermediario", ["Django REST Framework"]),
  tech("pytorch", "PyTorch", "framework", "dados", "Framework de deep learning voltado a pesquisa e produção.", "Deep-learning framework for research and production.", "Framework de deep learning para investigación y producción.", ["ia"], "avancado", ["TensorFlow"]),
  tech("scikitlearn", "scikit-learn", "framework", "dados", "Biblioteca prática para machine learning clássico.", "Practical library for classical machine learning.", "Biblioteca práctica para machine learning clásico.", ["ia", "dados"], "intermediario", ["XGBoost"]),
  tech("playwright", "Playwright", "ferramenta", "desenvolvimento", "Automação confiável de testes em navegadores.", "Reliable browser test automation.", "Automatización confiable de pruebas en navegadores.", ["qa", "frontend"], "intermediario", ["Cypress"]),
  tech("vitest", "Vitest", "ferramenta", "desenvolvimento", "Executor de testes rápido para projetos modernos em JavaScript.", "Fast test runner for modern JavaScript projects.", "Ejecutor de pruebas rápido para proyectos JavaScript modernos.", ["qa", "frontend"], "intermediario", ["Jest"]),
  tech("postman", "Postman", "ferramenta", "desenvolvimento", "Cliente e ambiente colaborativo para testar APIs.", "Client and collaborative environment for testing APIs.", "Cliente y entorno colaborativo para probar APIs.", ["qa", "backend"], "iniciante", ["Bruno", "Insomnia"]),
  tech("postgresql", "PostgreSQL", "banco", "dados", "Banco relacional robusto, extensível e aderente a padrões.", "Robust, extensible, standards-oriented relational database.", "Base relacional robusta, extensible y orientada a estándares.", ["backend", "dados"], "intermediario", ["MySQL"]),
  tech("mysql", "MySQL", "banco", "dados", "Banco relacional difundido em aplicações web.", "Relational database widely used in web applications.", "Base relacional muy usada en aplicaciones web.", ["backend", "dados"], "iniciante", ["PostgreSQL", "MariaDB"]),
  tech("mongodb", "MongoDB", "banco", "dados", "Banco documental flexível para dados semelhantes a JSON.", "Flexible document database for JSON-like data.", "Base documental flexible para datos similares a JSON.", ["backend"], "intermediario", ["PostgreSQL JSONB"]),
  tech("redis", "Redis", "banco", "dados", "Armazenamento em memória usado em cache, sessão e filas.", "In-memory store used for caching, sessions and queues.", "Almacenamiento en memoria para caché, sesiones y colas.", ["backend", "devops"], "intermediario", ["Memcached"]),
  tech("qdrant", "Qdrant", "banco", "dados", "Banco vetorial para busca semântica e aplicações com embeddings.", "Vector database for semantic search and embedding applications.", "Base vectorial para búsqueda semántica y embeddings.", ["ia"], "avancado", ["pgvector", "Weaviate"]),
  tech("docker", "Docker", "ferramenta", "infraestrutura", "Empacota aplicações e dependências em containers reproduzíveis.", "Packages applications and dependencies in reproducible containers.", "Empaqueta aplicaciones y dependencias en contenedores reproducibles.", ["devops", "cloud", "ia"], "intermediario", ["Podman"]),
  tech("kubernetes", "Kubernetes", "ferramenta", "infraestrutura", "Orquestra containers em ambientes distribuídos.", "Orchestrates containers in distributed environments.", "Orquesta contenedores en entornos distribuidos.", ["devops", "cloud"], "avancado", ["Nomad", "ECS"]),
  tech("terraform", "Terraform", "ferramenta", "infraestrutura", "Declara e versiona infraestrutura como código.", "Declares and versions infrastructure as code.", "Declara y versiona infraestructura como código.", ["devops", "cloud"], "avancado", ["OpenTofu", "Pulumi"]),
  tech("githubactions", "GitHub Actions", "ferramenta", "infraestrutura", "Automatiza testes, builds e entregas a partir do GitHub.", "Automates tests, builds and delivery from GitHub.", "Automatiza pruebas, builds y entregas desde GitHub.", ["devops"], "intermediario", ["GitLab CI", "Jenkins"]),
  tech("grafana", "Grafana", "ferramenta", "infraestrutura", "Visualiza métricas, logs e traces em painéis operacionais.", "Visualizes metrics, logs and traces in operational dashboards.", "Visualiza métricas, logs y traces en paneles operativos.", ["devops", "suporte"], "intermediario", ["Kibana"]),
  tech("aws", "AWS", "cloud", "infraestrutura", "Plataforma ampla de serviços de nuvem.", "Broad cloud services platform.", "Plataforma amplia de servicios cloud.", ["cloud", "devops"], "avancado", ["Azure", "Google Cloud"]),
  tech("azure", "Microsoft Azure", "cloud", "infraestrutura", "Nuvem integrada ao ecossistema Microsoft e corporativo.", "Cloud integrated with Microsoft and enterprise ecosystems.", "Cloud integrada al ecosistema Microsoft y empresarial.", ["cloud", "devops"], "avancado", ["AWS", "Google Cloud"]),
  tech("gcp", "Google Cloud", "cloud", "infraestrutura", "Nuvem com forte oferta em dados, IA e Kubernetes.", "Cloud with strong data, AI and Kubernetes offerings.", "Cloud con fuerte oferta en datos, IA y Kubernetes.", ["cloud", "dados", "ia"], "avancado", ["AWS", "Azure"]),
  tech("cloudflare", "Cloudflare", "cloud", "infraestrutura", "Rede global para CDN, segurança e computação na borda.", "Global network for CDN, security and edge compute.", "Red global para CDN, seguridad y cómputo en el borde.", ["cloud", "seguranca"], "intermediario", ["Fastly"]),
  tech("linux", "Linux", "ferramenta", "infraestrutura", "Base de grande parte dos servidores, containers e nuvens.", "Foundation of most servers, containers and cloud platforms.", "Base de gran parte de servidores, contenedores y nubes.", ["devops", "cloud", "seguranca", "suporte"]),
  tech("wireshark", "Wireshark", "ferramenta", "seguranca", "Analisa pacotes de rede para diagnóstico e investigação autorizada.", "Analyzes network packets for diagnostics and authorized investigation.", "Analiza paquetes de red para diagnóstico e investigación autorizada.", ["seguranca", "suporte"], "intermediario", ["tcpdump"]),
  tech("nmap", "Nmap", "ferramenta", "seguranca", "Mapeia hosts e serviços em redes próprias ou autorizadas.", "Maps hosts and services on owned or authorized networks.", "Mapea hosts y servicios en redes propias o autorizadas.", ["seguranca"], "intermediario"),
  tech("figma", "Figma", "ferramenta", "design", "Ambiente colaborativo para interface, protótipos e design systems.", "Collaborative environment for interfaces, prototypes and design systems.", "Entorno colaborativo para interfaces, prototipos y sistemas de diseño.", ["ux"], "iniciante", ["Penpot"]),
  tech("powerbi", "Power BI", "ferramenta", "dados", "Plataforma de análise e visualização de dados da Microsoft.", "Microsoft data analytics and visualization platform.", "Plataforma de análisis y visualización de datos de Microsoft.", ["dados"], "intermediario", ["Tableau", "Looker Studio"]),
  tech("dbt", "dbt", "ferramenta", "dados", "Transforma dados no warehouse com SQL versionado e testável.", "Transforms warehouse data with versioned, testable SQL.", "Transforma datos en el warehouse con SQL versionado y comprobable.", ["dados"], "avancado", ["Dataform"])
  ,
  tech("csharp", "C#", "linguagem", "desenvolvimento", "Linguagem do ecossistema .NET, usada em APIs, desktop, cloud e jogos com Unity.", "The .NET language used for APIs, desktop, cloud and Unity games.", "Lenguaje de .NET usado en APIs, escritorio, cloud y juegos con Unity.", ["backend"], "intermediario", ["Java", "Kotlin"]),
  tech("go", "Go", "linguagem", "desenvolvimento", "Linguagem compilada e direta, comum em serviços de rede, CLIs e infraestrutura.", "A direct compiled language common in network services, CLIs and infrastructure.", "Lenguaje compilado y directo, común en servicios de red, CLI e infraestructura.", ["backend", "devops"], "intermediario", ["Rust", "Java"]),
  tech("php", "PHP", "linguagem", "desenvolvimento", "Linguagem de servidor presente em grande parte da web e em ecossistemas como Laravel e WordPress.", "A server language powering a large part of the web through ecosystems such as Laravel and WordPress.", "Lenguaje de servidor presente en gran parte de la web con Laravel y WordPress.", ["backend"], "iniciante", ["JavaScript", "Python"]),
  tech("rust", "Rust", "linguagem", "desenvolvimento", "Linguagem de sistemas focada em desempenho e segurança de memória sem coletor de lixo.", "A systems language focused on performance and memory safety without garbage collection.", "Lenguaje de sistemas centrado en rendimiento y seguridad de memoria sin recolector.", ["backend", "devops"], "avancado", ["C++", "Go"]),
  tech("kotlin", "Kotlin", "linguagem", "desenvolvimento", "Linguagem moderna da JVM, oficial no Android e compatível com bibliotecas Java.", "A modern JVM language, official on Android and compatible with Java libraries.", "Lenguaje moderno de la JVM, oficial en Android y compatible con Java.", ["backend"], "intermediario", ["Java", "Swift"]),
  tech("swift", "Swift", "linguagem", "desenvolvimento", "Linguagem principal para aplicativos nos ecossistemas iOS, macOS e demais plataformas Apple.", "The primary language for apps across Apple's platforms.", "Lenguaje principal para aplicaciones en las plataformas Apple.", ["frontend"], "intermediario", ["Kotlin", "Dart"]),
  tech("dart", "Dart", "linguagem", "desenvolvimento", "Linguagem usada principalmente com Flutter para aplicações multiplataforma.", "The language primarily used with Flutter for cross-platform apps.", "Lenguaje usado principalmente con Flutter para aplicaciones multiplataforma.", ["frontend"], "intermediario", ["Kotlin", "TypeScript"]),
  tech("ruby", "Ruby", "linguagem", "desenvolvimento", "Linguagem expressiva conhecida pelo ecossistema produtivo do Ruby on Rails.", "An expressive language known for the productive Ruby on Rails ecosystem.", "Lenguaje expresivo conocido por el ecosistema productivo de Ruby on Rails.", ["backend"], "intermediario", ["Python", "Elixir"]),
  tech("c", "C", "linguagem", "desenvolvimento", "Linguagem fundamental para sistemas operacionais, embarcados, drivers e bibliotecas de baixo nível.", "A foundational language for operating systems, embedded devices, drivers and low-level libraries.", "Lenguaje fundamental para sistemas operativos, embebidos, drivers y bibliotecas de bajo nivel.", ["backend"], "avancado", ["Rust", "C++"]),
  tech("cpp", "C++", "linguagem", "desenvolvimento", "Linguagem de alto desempenho usada em engines, aplicações nativas, jogos e sistemas críticos.", "A high-performance language used in engines, native apps, games and critical systems.", "Lenguaje de alto rendimiento usado en motores, aplicaciones nativas, juegos y sistemas críticos.", ["backend"], "avancado", ["Rust", "C"]),
  tech("elixir", "Elixir", "linguagem", "desenvolvimento", "Linguagem funcional sobre a BEAM para sistemas concorrentes, distribuídos e tolerantes a falhas.", "A functional BEAM language for concurrent, distributed and fault-tolerant systems.", "Lenguaje funcional sobre BEAM para sistemas concurrentes y tolerantes a fallos.", ["backend"], "avancado", ["Erlang", "Go"]),
  tech("vue", "Vue.js", "framework", "desenvolvimento", "Framework progressivo para interfaces, com templates acessíveis e adoção gradual.", "A progressive UI framework with approachable templates and gradual adoption.", "Framework progresivo para interfaces con plantillas accesibles y adopción gradual.", ["frontend"], "intermediario", ["React", "Svelte"]),
  tech("angular", "Angular", "framework", "desenvolvimento", "Plataforma completa e opinativa para aplicações web grandes, tipadas e modulares.", "A complete, opinionated platform for large, typed and modular web applications.", "Plataforma completa y opinada para aplicaciones web grandes, tipadas y modulares.", ["frontend"], "avancado", ["React", "Vue"]),
  tech("svelte", "Svelte", "framework", "desenvolvimento", "Framework compilado que produz componentes enxutos e uma experiência direta de desenvolvimento.", "A compiled framework producing lean components with a direct developer experience.", "Framework compilado que produce componentes ligeros y una experiencia directa.", ["frontend"], "intermediario", ["Vue", "React"]),
  tech("astro", "Astro", "framework", "desenvolvimento", "Framework orientado a conteúdo que envia pouco JavaScript e aceita componentes de vários ecossistemas.", "A content-oriented framework shipping little JavaScript and supporting several component ecosystems.", "Framework orientado a contenido que envía poco JavaScript y acepta varios ecosistemas.", ["frontend"], "intermediario", ["Next.js", "Eleventy"]),
  tech("nuxt", "Nuxt", "framework", "desenvolvimento", "Framework full-stack sobre Vue para SSR, conteúdo e aplicações web.", "A full-stack Vue framework for SSR, content and web applications.", "Framework full-stack sobre Vue para SSR, contenido y aplicaciones web.", ["frontend", "backend"], "intermediario", ["Next.js", "SvelteKit"]),
  tech("remix", "Remix", "framework", "desenvolvimento", "Framework web focado em padrões da plataforma, formulários e carregamento aninhado de dados.", "A web framework focused on platform standards, forms and nested data loading.", "Framework web centrado en estándares, formularios y carga anidada de datos.", ["frontend", "backend"], "avancado", ["Next.js", "React Router"]),
  tech("tailwind", "Tailwind CSS", "framework", "desenvolvimento", "Framework CSS utility-first para construir interfaces diretamente na marcação.", "A utility-first CSS framework for composing interfaces in markup.", "Framework CSS utility-first para construir interfaces en el marcado.", ["frontend"], "intermediario", ["CSS Modules", "UnoCSS"]),
  tech("bootstrap", "Bootstrap", "framework", "desenvolvimento", "Biblioteca de componentes e utilitários CSS útil para protótipos e sistemas administrativos.", "A CSS component and utility library useful for prototypes and administrative systems.", "Biblioteca de componentes y utilidades CSS útil para prototipos y sistemas administrativos.", ["frontend"], "iniciante", ["Tailwind CSS", "Bulma"]),
  tech("express", "Express", "framework", "desenvolvimento", "Framework mínimo para APIs e servidores HTTP no Node.js.", "A minimal framework for Node.js APIs and HTTP servers.", "Framework mínimo para APIs y servidores HTTP en Node.js.", ["backend"], "intermediario", ["Fastify", "Hono"]),
  tech("django", "Django", "framework", "desenvolvimento", "Framework Python completo com ORM, administração, segurança e convenções maduras.", "A complete Python framework with ORM, administration, security and mature conventions.", "Framework Python completo con ORM, administración, seguridad y convenciones maduras.", ["backend"], "intermediario", ["FastAPI", "Flask"]),
  tech("laravel", "Laravel", "framework", "desenvolvimento", "Framework PHP produtivo com ORM, filas, autenticação e ferramentas de ecossistema.", "A productive PHP framework with ORM, queues, authentication and ecosystem tooling.", "Framework PHP productivo con ORM, colas, autenticación y herramientas.", ["backend"], "intermediario", ["Symfony", "Django"]),
  tech("rails", "Ruby on Rails", "framework", "desenvolvimento", "Framework full-stack que privilegia convenções e entrega rápida de produtos web.", "A full-stack framework favoring conventions and fast delivery of web products.", "Framework full-stack que prioriza convenciones y entrega rápida.", ["backend"], "intermediario", ["Laravel", "Phoenix"]),
  tech("sqlite", "SQLite", "banco", "dados", "Banco relacional embarcado, armazenado em arquivo e sem servidor separado.", "An embedded relational database stored in a file with no separate server.", "Base relacional embebida, guardada en archivo y sin servidor separado.", ["backend", "frontend"], "iniciante", ["PostgreSQL", "Turso"]),
  tech("cassandra", "Apache Cassandra", "banco", "dados", "Banco distribuído orientado a colunas para grandes volumes e escrita disponível entre regiões.", "A distributed wide-column database for large volumes and highly available writes.", "Base distribuida orientada a columnas para grandes volúmenes y escrituras disponibles.", ["backend", "dados"], "avancado", ["DynamoDB", "ScyllaDB"]),
  tech("firebase", "Firebase", "cloud", "infraestrutura", "Plataforma gerenciada com autenticação, bancos, funções e hospedagem para aplicações.", "A managed platform providing authentication, databases, functions and app hosting.", "Plataforma gestionada con autenticación, bases, funciones y hosting.", ["frontend", "backend"], "intermediario", ["Supabase", "Appwrite"]),
  tech("elasticsearch", "Elasticsearch", "banco", "dados", "Motor distribuído de busca textual, agregações e análise de logs.", "A distributed engine for full-text search, aggregations and log analysis.", "Motor distribuido de búsqueda textual, agregaciones y análisis de logs.", ["backend", "dados", "devops"], "avancado", ["OpenSearch", "Meilisearch"]),
  tech("git", "Git", "ferramenta", "desenvolvimento", "Sistema distribuído de controle de versão para registrar e integrar mudanças no código.", "A distributed version control system for recording and integrating code changes.", "Sistema distribuido de control de versiones para registrar e integrar cambios.", ["frontend", "backend", "devops"], "iniciante", ["Mercurial"]),
  tech("github", "GitHub", "ferramenta", "desenvolvimento", "Plataforma de colaboração em código com repositórios, issues, pull requests e automações.", "A code collaboration platform with repositories, issues, pull requests and automation.", "Plataforma de colaboración con repositorios, issues, pull requests y automatización.", ["frontend", "backend", "devops"], "iniciante", ["GitLab", "Bitbucket"]),
  tech("gitlab", "GitLab", "ferramenta", "infraestrutura", "Plataforma DevSecOps integrada com repositórios, CI/CD, pacotes e gestão de trabalho.", "An integrated DevSecOps platform for repositories, CI/CD, packages and work management.", "Plataforma DevSecOps integrada con repositorios, CI/CD, paquetes y gestión.", ["devops"], "intermediario", ["GitHub", "Azure DevOps"]),
  tech("jenkins", "Jenkins", "ferramenta", "infraestrutura", "Servidor extensível de automação para pipelines, comum em ambientes corporativos legados.", "An extensible automation server for pipelines, common in established enterprise environments.", "Servidor extensible de automatización para pipelines, común en empresas.", ["devops"], "avancado", ["GitHub Actions", "GitLab CI"]),
  tech("prometheus", "Prometheus", "ferramenta", "infraestrutura", "Sistema de métricas temporais e alertas, muito usado em ambientes cloud native.", "A time-series metrics and alerting system widely used in cloud-native environments.", "Sistema de métricas temporales y alertas muy usado en cloud native.", ["devops", "cloud"], "avancado", ["VictoriaMetrics", "Datadog"]),
  tech("kafka", "Apache Kafka", "ferramenta", "dados", "Plataforma distribuída de eventos para streaming, integração e processamento assíncrono.", "A distributed event platform for streaming, integration and asynchronous processing.", "Plataforma distribuida de eventos para streaming, integración y procesos asíncronos.", ["backend", "dados"], "avancado", ["RabbitMQ", "Pulsar"]),
  tech("vercel", "Vercel", "cloud", "infraestrutura", "Plataforma de deploy e execução para aplicações front-end e frameworks web modernos.", "A deployment and runtime platform for front-end applications and modern web frameworks.", "Plataforma de despliegue y ejecución para aplicaciones front-end y frameworks modernos.", ["frontend", "cloud"], "iniciante", ["Netlify", "Cloudflare Pages"]),
  tech("springboot", "Spring Boot", "framework", "desenvolvimento", "Framework Java para APIs e sistemas corporativos com amplo ecossistema de integração.", "A Java framework for APIs and enterprise systems with a broad integration ecosystem.", "Framework Java para APIs y sistemas empresariales con amplio ecosistema.", ["backend"], "avancado", ["Quarkus", "Micronaut"]),
  tech("dotnet", "ASP.NET Core", "framework", "desenvolvimento", "Framework multiplataforma da Microsoft para APIs, aplicações web e serviços de alto desempenho.", "Microsoft's cross-platform framework for APIs, web apps and high-performance services.", "Framework multiplataforma de Microsoft para APIs, web y servicios de alto rendimiento.", ["backend"], "intermediario", ["Spring Boot", "NestJS"]),
  tech("flutter", "Flutter", "framework", "desenvolvimento", "Kit do Google para criar aplicativos compilados para mobile, web e desktop com uma base em Dart.", "Google's toolkit for compiled mobile, web and desktop apps from one Dart codebase.", "Kit de Google para apps compiladas mobile, web y escritorio con Dart.", ["frontend"], "intermediario", ["React Native", "Kotlin Multiplatform"]),
  tech("reactnative", "React Native", "framework", "desenvolvimento", "Framework para aplicativos iOS e Android usando React, JavaScript e componentes nativos.", "A framework for iOS and Android apps using React, JavaScript and native components.", "Framework para apps iOS y Android con React, JavaScript y componentes nativos.", ["frontend"], "intermediario", ["Flutter", "Ionic"]),
  tech("electron", "Electron", "framework", "desenvolvimento", "Empacota aplicações web como programas desktop usando Chromium e Node.js.", "Packages web applications as desktop software using Chromium and Node.js.", "Empaqueta aplicaciones web como programas de escritorio con Chromium y Node.js.", ["frontend"], "intermediario", ["Tauri", ".NET MAUI"]),
  tech("unity", "Unity", "framework", "desenvolvimento", "Engine para jogos 2D, 3D, realidade aumentada e experiências interativas com C#.", "An engine for 2D, 3D, augmented reality and interactive experiences using C#.", "Motor para juegos 2D, 3D, realidad aumentada y experiencias con C#.", ["frontend"], "avancado", ["Unreal Engine", "Godot"]),
  tech("unreal", "Unreal Engine", "framework", "desenvolvimento", "Engine de jogos e visualização em tempo real conhecida por gráficos de alta fidelidade.", "A game and real-time visualization engine known for high-fidelity graphics.", "Motor de juegos y visualización en tiempo real de alta fidelidad.", ["frontend"], "avancado", ["Unity", "Godot"]),
  tech("mariadb", "MariaDB", "banco", "dados", "Banco relacional compatível com grande parte do ecossistema MySQL e mantido de forma aberta.", "An open relational database compatible with much of the MySQL ecosystem.", "Base relacional abierta compatible con gran parte del ecosistema MySQL.", ["backend", "dados"], "intermediario", ["MySQL", "PostgreSQL"]),
  tech("sqlserver", "SQL Server", "banco", "dados", "Banco relacional da Microsoft com forte presença em ambientes corporativos e BI.", "Microsoft's relational database with a strong enterprise and BI presence.", "Base relacional de Microsoft con fuerte presencia empresarial y BI.", ["backend", "dados"], "intermediario", ["PostgreSQL", "Oracle"]),
  tech("oracle", "Oracle Database", "banco", "dados", "Banco relacional comercial usado em sistemas corporativos críticos e grandes cargas transacionais.", "A commercial relational database used in critical enterprise systems and large transactional workloads.", "Base relacional comercial usada en sistemas empresariales críticos.", ["backend", "dados"], "avancado", ["PostgreSQL", "SQL Server"]),
  tech("neo4j", "Neo4j", "banco", "dados", "Banco de grafos para relações densas, caminhos, recomendações e detecção de fraude.", "A graph database for dense relationships, paths, recommendations and fraud detection.", "Base de grafos para relaciones densas, rutas, recomendaciones y fraude.", ["dados", "backend"], "avancado", ["Amazon Neptune", "ArangoDB"]),
  tech("dynamodb", "Amazon DynamoDB", "banco", "dados", "Banco NoSQL gerenciado da AWS com escala automática e acesso por chave.", "AWS's managed NoSQL database with automatic scaling and key-based access.", "Base NoSQL gestionada de AWS con escalado automático y acceso por clave.", ["cloud", "backend"], "avancado", ["Cassandra", "MongoDB"]),
  tech("supabase", "Supabase", "cloud", "infraestrutura", "Plataforma baseada em PostgreSQL com autenticação, storage, realtime e APIs prontas.", "A PostgreSQL-based platform with authentication, storage, realtime and generated APIs.", "Plataforma basada en PostgreSQL con autenticación, storage, realtime y APIs.", ["frontend", "backend"], "intermediario", ["Firebase", "Appwrite"]),
  tech("rabbitmq", "RabbitMQ", "ferramenta", "infraestrutura", "Broker de mensagens para filas, roteamento e processamento assíncrono confiável.", "A message broker for queues, routing and reliable asynchronous processing.", "Broker de mensajes para colas, enrutamiento y procesos asíncronos.", ["backend", "devops"], "avancado", ["Kafka", "NATS"]),
  tech("nginx", "NGINX", "ferramenta", "infraestrutura", "Servidor web e proxy reverso usado para TLS, roteamento, cache e balanceamento.", "A web server and reverse proxy used for TLS, routing, caching and load balancing.", "Servidor web y proxy reverso para TLS, rutas, caché y balanceo.", ["devops", "cloud"], "intermediario", ["Caddy", "Traefik"]),
  tech("ansible", "Ansible", "ferramenta", "infraestrutura", "Automatiza configuração e tarefas em servidores por meio de playbooks declarativos.", "Automates server configuration and tasks through declarative playbooks.", "Automatiza configuración y tareas en servidores con playbooks declarativos.", ["devops", "suporte"], "intermediario", ["Salt", "Puppet"]),
  tech("digitalocean", "DigitalOcean", "cloud", "infraestrutura", "Provedor de cloud com máquinas, bancos e Kubernetes voltados a uso direto.", "A cloud provider offering straightforward virtual machines, databases and Kubernetes.", "Proveedor cloud con máquinas, bases y Kubernetes de uso directo.", ["cloud"], "intermediario", ["Hetzner", "Linode"]),
  tech("netlify", "Netlify", "cloud", "infraestrutura", "Plataforma para sites e front-ends com deploy contínuo, funções e CDN.", "A platform for sites and front ends with continuous deployment, functions and CDN.", "Plataforma para sitios y front-end con despliegue continuo, funciones y CDN.", ["frontend", "cloud"], "iniciante", ["Vercel", "Cloudflare Pages"]),
  tech("jira", "Jira", "ferramenta", "gestao", "Ferramenta de gestão de trabalho, backlog e fluxo muito presente em equipes de software.", "A work, backlog and workflow management tool widely used by software teams.", "Herramienta de gestión de trabajo, backlog y flujo muy usada en software.", ["qa", "devops"], "iniciante", ["Linear", "YouTrack"]),
  tech("vscode", "Visual Studio Code", "ferramenta", "desenvolvimento", "Editor extensível para programação, depuração, Git e trabalho remoto.", "An extensible editor for coding, debugging, Git and remote development.", "Editor extensible para programación, depuración, Git y trabajo remoto.", ["frontend", "backend", "dados"], "iniciante", ["Zed", "Sublime Text"]),
  tech("intellij", "IntelliJ IDEA", "ferramenta", "desenvolvimento", "IDE da JetBrains com análise profunda para Java, Kotlin e desenvolvimento corporativo.", "JetBrains' IDE with deep analysis for Java, Kotlin and enterprise development.", "IDE de JetBrains con análisis profundo para Java, Kotlin y desarrollo empresarial.", ["backend"], "intermediario", ["Eclipse", "VS Code"]),
  tech("sonarqube", "SonarQube", "ferramenta", "seguranca", "Analisa qualidade, bugs e riscos de segurança no código durante a integração.", "Analyzes code quality, bugs and security risks during integration.", "Analiza calidad, bugs y riesgos de seguridad durante la integración.", ["qa", "devops", "seguranca"], "intermediario", ["CodeQL", "Semgrep"]),
  tech("sentry", "Sentry", "ferramenta", "infraestrutura", "Monitora erros e desempenho de aplicações com contexto de versão e usuário.", "Monitors application errors and performance with release and user context.", "Monitorea errores y rendimiento con contexto de versión y usuario.", ["frontend", "backend", "devops"], "intermediario", ["Datadog", "Rollbar"]),
  tech("datadog", "Datadog", "cloud", "infraestrutura", "Plataforma comercial de observabilidade para métricas, logs, traces e segurança.", "A commercial observability platform for metrics, logs, traces and security.", "Plataforma comercial de observabilidad para métricas, logs, trazas y seguridad.", ["devops", "cloud"], "avancado", ["Grafana Cloud", "New Relic"])
];

export const technologies = buildTechnologyCatalog(baseTechnologies);

const projectDescriptions: Record<string, Localized> = {
  "painel-financeiro": l("Transforme lançamentos cotidianos em uma visão clara de orçamento, recorrências e variação mensal.", "Turn everyday transactions into a clear view of budgets, recurring costs and monthly change.", "Convierte movimientos cotidianos en una visión clara de presupuesto, recurrencias y variación mensual."),
  "api-chamados": l("Modele abertura, encaminhamento e resolução de chamados com histórico confiável e permissões por função.", "Model ticket intake, assignment and resolution with reliable history and role-based permissions.", "Modela apertura, asignación y resolución de tickets con historial confiable y permisos."),
  "plataforma-estudos": l("Organize conteúdos, sessões e progresso sem transformar a experiência em uma sequência rígida de aulas.", "Organize content, sessions and progress without turning the experience into a rigid lesson sequence.", "Organiza contenidos, sesiones y progreso sin convertir la experiencia en una secuencia rígida."),
  "pipeline-vendas": l("Leve dados brutos de vendas até uma camada analítica testada, documentada e pronta para responder perguntas.", "Move raw sales data into a tested, documented analytical layer ready to answer questions.", "Lleva datos brutos de ventas a una capa analítica probada, documentada y lista para responder preguntas."),
  "assistente-rag": l("Construa um assistente que responda a partir de fontes delimitadas e permita conferir de onde veio cada afirmação.", "Build an assistant that answers from bounded sources and lets readers verify each claim.", "Construye un asistente que responda desde fuentes delimitadas y permita verificar cada afirmación."),
  "entrega-observavel": l("Publique uma aplicação pequena com pipeline reproduzível e sinais suficientes para diagnosticar uma falha.", "Deploy a small application with a reproducible pipeline and enough signals to diagnose failures.", "Publica una aplicación pequeña con pipeline reproducible y señales suficientes para diagnosticar fallos."),
  "infra-terraform": l("Descreva uma infraestrutura web enxuta em código, incluindo rede, acesso mínimo e estimativa de custo.", "Describe a lean web infrastructure in code, including networking, least access and a cost estimate.", "Describe una infraestructura web sencilla en código, incluyendo red, acceso mínimo y costo estimado."),
  "laboratorio-defensivo": l("Monte um ambiente próprio para praticar hardening, coleta de eventos e resposta documentada a incidentes.", "Build an owned environment to practice hardening, event collection and documented incident response.", "Monta un entorno propio para practicar hardening, recolección de eventos y respuesta documentada."),
  "suite-e2e": l("Proteja as jornadas mais importantes de uma loja de demonstração com testes legíveis e execução contínua.", "Protect the most important journeys in a demo store with readable tests and continuous execution.", "Protege los recorridos principales de una tienda de demostración con pruebas legibles y ejecución continua."),
  "case-servico": l("Investigue um serviço digital confuso, proponha um fluxo melhor e registre o que mudou depois dos testes.", "Investigate a confusing digital service, propose a better flow and record what changed after testing.", "Investiga un servicio digital confuso, propone un flujo mejor y registra qué cambió tras las pruebas."),
  "base-conhecimento": l("Estruture um catálogo de atendimento com diagnósticos reproduzíveis, prioridades e artigos realmente encontráveis.", "Structure a support catalog with reproducible diagnostics, priorities and articles people can actually find.", "Estructura un catálogo de soporte con diagnósticos reproducibles, prioridades y artículos fáciles de encontrar.")
};

const projectFeatureTranslations: Record<string, [string, string]> = {
  "Filtros por período": ["Date range filters", "Filtros por período"],
  "Estados vazios": ["Empty states", "Estados vacíos"],
  "Gráficos acessíveis": ["Accessible charts", "Gráficos accesibles"],
  "RBAC": ["RBAC", "RBAC"],
  "Auditoria": ["Audit trail", "Auditoría"],
  "OpenAPI": ["OpenAPI", "OpenAPI"],
  "Progresso": ["Progress tracking", "Progreso"],
  "Busca": ["Search", "Búsqueda"],
  "Painel do aluno": ["Student dashboard", "Panel del estudiante"],
  "Ingestão": ["Ingestion", "Ingesta"],
  "Testes de qualidade": ["Quality tests", "Pruebas de calidad"],
  "Camada analítica": ["Analytics layer", "Capa analítica"],
  "RAG": ["RAG", "RAG"],
  "Citações": ["Citations", "Citas"],
  "Conjunto de avaliação": ["Evaluation dataset", "Conjunto de evaluación"],
  "CI/CD": ["CI/CD", "CI/CD"],
  "Métricas": ["Metrics", "Métricas"],
  "Runbook": ["Runbook", "Runbook"],
  "Rede privada": ["Private network", "Red privada"],
  "IAM mínimo": ["Least-privilege IAM", "IAM de mínimo privilegio"],
  "Estimativa de custo": ["Cost estimate", "Estimación de costo"],
  "Hardening": ["Hardening", "Hardening"],
  "Alertas": ["Alerts", "Alertas"],
  "Relatório de incidente": ["Incident report", "Informe de incidente"],
  "Jornadas críticas": ["Critical journeys", "Recorridos críticos"],
  "Relatório HTML": ["HTML report", "Informe HTML"],
  "Execução em CI": ["CI execution", "Ejecución en CI"],
  "Pesquisa": ["Research", "Investigación"],
  "Fluxo": ["Flow", "Flujo"],
  "Teste de usabilidade": ["Usability test", "Prueba de usabilidad"],
  "Catálogo de serviços": ["Service catalog", "Catálogo de servicios"],
  "SLA": ["SLA", "SLA"],
  "Artigos de solução": ["Solution articles", "Artículos de solución"]
};

const project = (
  id: string, pt: string, en: string, es: string, areaId: string,
  level: Project["level"], stack: string[], features: string[], signal: Localized
): Project => ({
  id, title: l(pt, en, es), areaId, level, stack,
  description: projectDescriptions[id],
  duration: level === "iniciante"
    ? l("Escopo pequeno e delimitado", "Small, bounded scope", "Alcance pequeño y delimitado")
    : l("Escopo médio, dividido em marcos", "Medium scope, split into milestones", "Alcance medio, dividido en hitos"),
  features: features.map((item) => {
    const [en, es] = projectFeatureTranslations[item] ?? [item, item];
    return l(item, en, es);
  }),
  recruiterSignal: signal
});

const baseProjects: Project[] = [
  project("painel-financeiro", "Painel financeiro pessoal", "Personal finance dashboard", "Panel financiero personal", "frontend", "iniciante", ["React", "TypeScript", "Chart.js"], ["Filtros por período", "Estados vazios", "Gráficos acessíveis"], l("Mostra domínio de interface, dados e atenção aos detalhes.", "Shows interface, data and detail skills.", "Demuestra dominio de interfaz, datos y detalle.")),
  project("api-chamados", "API de chamados", "Ticket management API", "API de tickets", "backend", "intermediario", ["Node.js", "PostgreSQL", "Redis"], ["RBAC", "Auditoria", "OpenAPI"], l("Demonstra modelagem, segurança e documentação.", "Demonstrates modeling, security and documentation.", "Demuestra modelado, seguridad y documentación.")),
  project("plataforma-estudos", "Plataforma de estudos", "Learning platform", "Plataforma de estudios", "frontend", "avancado", ["Next.js", "PostgreSQL", "Auth.js"], ["Progresso", "Busca", "Painel do aluno"], l("Prova que você conecta produto, front-end e back-end.", "Proves you can connect product, front-end and back-end.", "Prueba que conectas producto, front-end y back-end.")),
  project("pipeline-vendas", "Pipeline de dados de vendas", "Sales data pipeline", "Pipeline de datos de ventas", "dados", "intermediario", ["Python", "dbt", "PostgreSQL"], ["Ingestão", "Testes de qualidade", "Camada analítica"], l("Expõe decisões de engenharia, não apenas gráficos finais.", "Exposes engineering decisions, not only final charts.", "Expone decisiones de ingeniería, no solo gráficos finales.")),
  project("assistente-rag", "Assistente com fontes verificáveis", "Assistant with verifiable sources", "Asistente con fuentes verificables", "ia", "avancado", ["Python", "FastAPI", "Qdrant"], ["RAG", "Citações", "Conjunto de avaliação"], l("Mostra preocupação com avaliação, custo e respostas confiáveis.", "Shows attention to evaluation, cost and reliable answers.", "Muestra atención a evaluación, costo y respuestas confiables.")),
  project("entrega-observavel", "Entrega observável", "Observable delivery", "Entrega observable", "devops", "intermediario", ["Docker", "GitHub Actions", "Grafana"], ["CI/CD", "Métricas", "Runbook"], l("Demonstra que você sabe entregar e operar, não só configurar.", "Shows you can deliver and operate, not just configure.", "Demuestra que sabes entregar y operar, no solo configurar.")),
  project("infra-terraform", "Ambiente cloud reproduzível", "Reproducible cloud environment", "Entorno cloud reproducible", "cloud", "avancado", ["Terraform", "AWS", "GitHub Actions"], ["Rede privada", "IAM mínimo", "Estimativa de custo"], l("Torna visíveis escolhas de arquitetura, segurança e custo.", "Makes architecture, security and cost choices visible.", "Hace visibles decisiones de arquitectura, seguridad y costo.")),
  project("laboratorio-defensivo", "Laboratório defensivo", "Defensive security lab", "Laboratorio defensivo", "seguranca", "intermediario", ["Linux", "Wazuh", "Grafana"], ["Hardening", "Alertas", "Relatório de incidente"], l("Registra método, ética e capacidade de investigação.", "Documents method, ethics and investigation skills.", "Documenta método, ética y capacidad de investigación.")),
  project("suite-e2e", "Suíte E2E de uma loja", "Store E2E suite", "Suite E2E de una tienda", "qa", "intermediario", ["Playwright", "TypeScript", "GitHub Actions"], ["Jornadas críticas", "Relatório HTML", "Execução em CI"], l("Mostra priorização de risco e automação sustentável.", "Shows risk prioritization and sustainable automation.", "Muestra priorización de riesgo y automatización sostenible.")),
  project("case-servico", "Case de melhoria de serviço", "Service improvement case", "Caso de mejora de servicio", "ux", "iniciante", ["Figma", "Maze"], ["Pesquisa", "Fluxo", "Teste de usabilidade"], l("Apresenta raciocínio e evidências, não só telas finais.", "Presents reasoning and evidence, not only final screens.", "Presenta razonamiento y evidencia, no solo pantallas.")),
  project("base-conhecimento", "Base de conhecimento do suporte", "Support knowledge base", "Base de conocimiento de soporte", "suporte", "iniciante", ["GLPI", "Markdown", "Linux"], ["Catálogo de serviços", "SLA", "Artigos de solução"], l("Evidencia diagnóstico, documentação e visão de processo.", "Shows diagnosis, documentation and process thinking.", "Evidencia diagnóstico, documentación y visión de proceso."))
];

export const projects = enhanceProjects(baseProjects);

const step = (pt: string, en: string, es: string, checkPt: string): Roadmap["steps"][number] => ({
  title: l(pt, en, es),
  description: roadmapStepReason(pt, en, es),
  checkpoint: l(checkPt, "Move on when you can explain and apply this without following a tutorial.", "Avanza cuando puedas explicarlo y aplicarlo sin seguir un tutorial.")
});

const baseRoadmaps: Roadmap[] = [
  {
    id: "comecar-do-zero", title: l("Começar do zero", "Start from scratch", "Empezar desde cero"),
    description: l("Uma base curta e honesta antes de escolher especialização.", "A short, honest foundation before choosing a specialty.", "Una base breve y honesta antes de elegir especialidad."),
    duration: l("Ritmo definido pelas evidências", "Pace defined by evidence", "Ritmo definido por evidencias"), level: "iniciante", areaId: "suporte",
    steps: [step("Computador, arquivos e terminal", "Computers, files and terminal", "Computador, archivos y terminal", "Você navega, organiza arquivos e executa comandos básicos."), step("Lógica e uma linguagem", "Logic and one language", "Lógica y un lenguaje", "Você resolve pequenos problemas e depura os próprios erros."), step("Web, redes e dados", "Web, networks and data", "Web, redes y datos", "Você explica HTTP, DNS e faz consultas SQL simples."), step("Git e primeiro projeto", "Git and first project", "Git y primer proyecto", "Seu projeto tem README, histórico de commits e demonstração.")],
    projectIds: ["base-conhecimento", "painel-financeiro"]
  },
  {
    id: "frontend", title: l("Front-end profissional", "Professional front-end", "Front-end profesional"),
    description: l("Da web semântica a uma aplicação testada e publicada.", "From semantic web foundations to a tested, deployed application.", "Desde web semántica hasta una aplicación probada y publicada."),
    duration: l("Ritmo definido pelas evidências", "Pace defined by evidence", "Ritmo definido por evidencias"), level: "iniciante", areaId: "frontend",
    steps: [step("HTML, CSS e acessibilidade", "HTML, CSS and accessibility", "HTML, CSS y accesibilidad", "Você reproduz um layout responsivo sem framework."), step("JavaScript no navegador", "Browser JavaScript", "JavaScript en el navegador", "Você manipula dados, eventos e requisições."), step("TypeScript e React", "TypeScript and React", "TypeScript y React", "Você cria componentes com estados previsíveis."), step("Testes, performance e deploy", "Testing, performance and deployment", "Pruebas, rendimiento y despliegue", "Sua aplicação passa por auditoria e tem testes de jornada.")],
    projectIds: ["painel-financeiro", "plataforma-estudos"]
  },
  {
    id: "backend", title: l("Back-end e APIs", "Back-end and APIs", "Back-end y APIs"),
    description: l("Construa serviços seguros antes de pensar em microsserviços.", "Build secure services before thinking about microservices.", "Construye servicios seguros antes de pensar en microservicios."),
    duration: l("Ritmo definido pelas evidências", "Pace defined by evidence", "Ritmo definido por evidencias"), level: "intermediario", areaId: "backend",
    steps: [step("Linguagem e HTTP", "Language and HTTP", "Lenguaje y HTTP", "Você cria uma API pequena e explica o ciclo da requisição."), step("SQL e modelagem", "SQL and modeling", "SQL y modelado", "Você modela relações e justifica índices."), step("Autenticação e segurança", "Authentication and security", "Autenticación y seguridad", "Você aplica autorização e trata entradas hostis."), step("Testes e operação", "Testing and operations", "Pruebas y operación", "Você documenta, testa e observa o serviço.")],
    projectIds: ["api-chamados"]
  },
  {
    id: "dados", title: l("Dados & BI", "Data & BI", "Datos y BI"),
    description: l("Perguntas de negócio, SQL, qualidade e comunicação visual.", "Business questions, SQL, quality and visual communication.", "Preguntas de negocio, SQL, calidad y comunicación visual."),
    duration: l("Ritmo definido pelas evidências", "Pace defined by evidence", "Ritmo definido por evidencias"), level: "iniciante", areaId: "dados",
    steps: [step("Planilhas e perguntas", "Spreadsheets and questions", "Hojas de cálculo y preguntas", "Você traduz uma pergunta em métrica."), step("SQL e modelagem analítica", "SQL and analytical modeling", "SQL y modelado analítico", "Você consulta, agrega e valida dados."), step("BI e comunicação", "BI and communication", "BI y comunicación", "Seu painel tem narrativa e definições claras."), step("Pipeline e qualidade", "Pipeline and quality", "Pipeline y calidad", "Você automatiza transformações e testes.")],
    projectIds: ["pipeline-vendas", "painel-financeiro"]
  },
  {
    id: "devops", title: l("DevOps sem atalhos", "DevOps without shortcuts", "DevOps sin atajos"),
    description: l("Sistemas, automação, entrega e observabilidade na ordem certa.", "Systems, automation, delivery and observability in the right order.", "Sistemas, automatización, entrega y observabilidad en el orden correcto."),
    duration: l("Ritmo definido pelas evidências", "Pace defined by evidence", "Ritmo definido por evidencias"), level: "intermediario", areaId: "devops",
    steps: [step("Linux, redes e shell", "Linux, networking and shell", "Linux, redes y shell", "Você administra um servidor pequeno sem painel."), step("Containers", "Containers", "Contenedores", "Você cria imagens enxutas e ambientes reproduzíveis."), step("CI/CD e infraestrutura como código", "CI/CD and infrastructure as code", "CI/CD e infraestructura como código", "Um commit seguro chega ao ambiente automaticamente."), step("Observabilidade e incidentes", "Observability and incidents", "Observabilidad e incidentes", "Você define indicadores, alerta e runbook útil.")],
    projectIds: ["entrega-observavel", "infra-terraform"]
  }
];

export const roadmaps = [...baseRoadmaps, ...roadmapAdditions].map((roadmap) => ({
  ...roadmap,
  pace: l(
    "Avance pelas evidências de domínio de cada etapa, não por um calendário fixo.",
    "Move forward through evidence of mastery at each stage, not a fixed calendar.",
    "Avanza por evidencias de dominio en cada etapa, no por un calendario fijo."
  )
}));

const baseGlossary: GlossaryTerm[] = [
  { id: "api", term: "API", simple: l("Um contrato para dois sistemas conversarem.", "A contract that lets two systems communicate.", "Un contrato para que dos sistemas se comuniquen."), technical: l("Interface com operações, formatos e regras de comunicação definidos.", "An interface with defined operations, formats and communication rules.", "Interfaz con operaciones, formatos y reglas de comunicación definidos."), example: l("Um app consulta a previsão do tempo por uma API.", "An app gets weather forecasts through an API.", "Una app consulta el clima mediante una API."), areaIds: ["frontend", "backend"] },
  { id: "deploy", term: "Deploy", simple: l("Colocar uma versão para funcionar em um ambiente.", "Make a version run in an environment.", "Poner una versión a funcionar en un entorno."), technical: l("Processo de promover artefatos e configuração com validação e possível reversão.", "The process of promoting artifacts and configuration with validation and rollback.", "Proceso de promover artefactos y configuración con validación y reversión."), example: l("A pipeline publica a aplicação depois dos testes.", "A pipeline publishes the app after tests.", "El pipeline publica la app después de las pruebas."), areaIds: ["devops", "frontend", "backend"] },
  { id: "container", term: "Container", simple: l("Pacote isolado com aplicação e dependências.", "An isolated package with an app and its dependencies.", "Paquete aislado con aplicación y dependencias."), technical: l("Processo isolado pelo sistema operacional, geralmente criado a partir de uma imagem imutável.", "An OS-isolated process usually created from an immutable image.", "Proceso aislado por el sistema, normalmente desde una imagen inmutable."), example: l("A mesma imagem roda no notebook e no servidor.", "The same image runs on a laptop and server.", "La misma imagen se ejecuta en portátil y servidor."), areaIds: ["devops", "cloud"] },
  { id: "cache", term: "Cache", simple: l("Cópia temporária para evitar trabalho repetido.", "A temporary copy that avoids repeated work.", "Copia temporal que evita trabajo repetido."), technical: l("Camada de acesso rápido com política de validade e invalidação.", "A fast access layer with expiration and invalidation policies.", "Capa de acceso rápido con políticas de expiración e invalidación."), example: l("Produtos populares ficam no Redis por cinco minutos.", "Popular products stay in Redis for five minutes.", "Productos populares quedan en Redis cinco minutos."), areaIds: ["backend", "devops"] },
  { id: "ci-cd", term: "CI/CD", simple: l("Automação para verificar e entregar mudanças.", "Automation to verify and deliver changes.", "Automatización para verificar y entregar cambios."), technical: l("Integração contínua combinada a entrega ou implantação contínua.", "Continuous integration paired with continuous delivery or deployment.", "Integración continua junto con entrega o despliegue continuo."), example: l("Cada pull request executa lint, testes e build.", "Every pull request runs lint, tests and build.", "Cada pull request ejecuta lint, pruebas y build."), areaIds: ["devops", "qa"] },
  { id: "observabilidade", term: "Observabilidade", simple: l("Capacidade de entender o sistema pelo que ele mostra.", "The ability to understand a system from what it emits.", "Capacidad de entender un sistema por lo que emite."), technical: l("Uso correlacionado de métricas, logs, traces e contexto de negócio.", "Correlated use of metrics, logs, traces and business context.", "Uso correlacionado de métricas, logs, trazas y contexto de negocio."), example: l("Um trace revela em qual serviço a compra ficou lenta.", "A trace shows which service slowed a purchase.", "Una traza muestra qué servicio retrasó la compra."), areaIds: ["devops", "backend"] },
  { id: "orm", term: "ORM", simple: l("Camada que aproxima objetos do código e tabelas.", "A layer connecting code objects and database tables.", "Capa que acerca objetos del código y tablas."), technical: l("Mapeamento objeto-relacional com consultas, relações e persistência.", "Object-relational mapping for queries, relationships and persistence.", "Mapeo objeto-relacional para consultas, relaciones y persistencia."), example: l("Prisma traduz uma consulta tipada para SQL.", "Prisma translates a typed query into SQL.", "Prisma traduce una consulta tipada a SQL."), areaIds: ["backend"] },
  { id: "jwt", term: "JWT", simple: l("Formato assinado para transportar afirmações.", "A signed format for transporting claims.", "Formato firmado para transportar afirmaciones."), technical: l("Token compacto com cabeçalho, payload e assinatura; não é criptografia por padrão.", "Compact token with header, payload and signature; it is not encrypted by default.", "Token compacto con cabecera, payload y firma; no está cifrado por defecto."), example: l("Uma API valida a assinatura e as permissões do token.", "An API validates token signature and permissions.", "Una API valida firma y permisos del token."), areaIds: ["backend", "seguranca"] },
  { id: "dns", term: "DNS", simple: l("Sistema que encontra o endereço de um nome na internet.", "The system that finds the address behind an internet name.", "Sistema que encuentra la dirección detrás de un nombre en internet."), technical: l("Sistema hierárquico distribuído de resolução de nomes e outros registros.", "A hierarchical distributed name resolution and record system.", "Sistema jerárquico distribuido de resolución de nombres y registros."), example: l("devatlas.dev é resolvido para um endereço IP.", "devatlas.dev resolves to an IP address.", "devatlas.dev se resuelve a una dirección IP."), areaIds: ["cloud", "suporte"] },
  { id: "rag", term: "RAG", simple: l("IA que consulta fontes antes de responder.", "AI that retrieves sources before answering.", "IA que consulta fuentes antes de responder."), technical: l("Geração aumentada por recuperação combina busca relevante ao contexto enviado ao modelo.", "Retrieval-augmented generation combines relevant search with model context.", "Generación aumentada por recuperación combina búsqueda relevante con contexto."), example: l("Um assistente consulta manuais internos e cita os trechos usados.", "An assistant searches internal manuals and cites used passages.", "Un asistente busca manuales internos y cita los pasajes."), areaIds: ["ia", "dados"] }
];

const glossaryTechnologyIds: Record<string, string[]> = {
  api: ["apis", "http"],
  deploy: ["deploy", "ci-cd"],
  container: ["docker"],
  cache: ["redis"],
  "ci-cd": ["ci-cd", "githubactions"],
  observabilidade: ["logs", "metricas", "traces", "grafana"],
  orm: ["sql", "postgresql"],
  jwt: ["autenticacao", "autorizacao"],
  dns: ["dns"],
  rag: ["qdrant", "python", "pytorch"]
};

export const glossary: GlossaryTerm[] = [
  ...baseGlossary.map((item) => ({
    ...item,
    technologyIds: glossaryTechnologyIds[item.id] ?? []
  })),
  ...glossaryAdditions
];

validateContent({ areas, technologies, roadmaps, projects, glossary });

const asSimpleCollection = (items: Technology[]): SimpleCollectionItem[] =>
  items.map(({ id, name, description, areaIds }) => ({
    id,
    name,
    description,
    relatedIds: areaIds
  }));

export const languages = asSimpleCollection(
  technologies.filter((item) => item.type === "linguagem")
);

export const frameworks = asSimpleCollection(
  technologies.filter((item) => item.type === "framework" || item.type === "biblioteca")
);

export const databases = asSimpleCollection(
  technologies.filter((item) => item.type === "banco-dados" || item.type === "banco-vetorial")
);

export const tools = asSimpleCollection(
  technologies.filter((item) =>
    [
      "ferramenta",
      "infraestrutura",
      "ferramenta-teste",
      "observabilidade",
      "seguranca",
      "ide-editor",
      "sistema-operacional"
    ].includes(item.type)
  )
);

export const cloudServices = asSimpleCollection(
  technologies.filter((item) =>
    item.type === "provedor-cloud"
    || item.type === "servico-cloud"
    || (item.type === "plataforma" && item.domains.includes("cloud"))
  )
);

export const careerPaths = [
  {
    id: "especialista",
    name: l("Trilha de especialista", "Individual contributor track", "Ruta de especialista"),
    stages: [
      l("Estágio", "Internship", "Prácticas"),
      l("Júnior", "Junior", "Junior"),
      l("Pleno", "Mid-level", "Intermedio"),
      l("Sênior", "Senior", "Senior"),
      l("Staff/Especialista", "Staff/Specialist", "Staff/Especialista")
    ]
  },
  {
    id: "lideranca",
    name: l("Trilha de liderança", "Leadership track", "Ruta de liderazgo"),
    stages: [
      l("Sênior", "Senior", "Senior"),
      l("Liderança técnica", "Tech Lead", "Liderazgo técnico"),
      l("Gerência de engenharia", "Engineering Manager", "Gerencia de ingeniería"),
      l("Direção de tecnologia", "Head of Engineering/CTO", "Dirección de tecnología")
    ]
  }
];

export const certifications: SimpleCollectionItem[] = [
  { id: "aws-ccp", name: "AWS Certified Cloud Practitioner", description: l("Fundamentos comerciais e técnicos da AWS.", "AWS business and technical foundations.", "Fundamentos comerciales y técnicos de AWS."), relatedIds: ["cloud"] },
  { id: "az900", name: "Microsoft Azure Fundamentals (AZ-900)", description: l("Fundamentos de Azure e computação em nuvem.", "Azure and cloud computing foundations.", "Fundamentos de Azure y computación en la nube."), relatedIds: ["cloud"] },
  { id: "comptia-a", name: "CompTIA A+", description: l("Base de hardware, sistemas e suporte.", "Hardware, operating system and support foundations.", "Bases de hardware, sistemas y soporte."), relatedIds: ["suporte"] },
  { id: "ccna", name: "Cisco CCNA", description: l("Redes, roteamento e switching.", "Networking, routing and switching.", "Redes, routing y switching."), relatedIds: ["suporte"] },
  { id: "security-plus", name: "CompTIA Security+", description: l("Fundamentos de segurança da informação.", "Information security foundations.", "Fundamentos de seguridad de la información."), relatedIds: ["seguranca"] }
];

export const comparisons = [
  { id: "areas", fields: ["difficulty", "remote", "freelance", "math"], areaIds: areas.map((item) => item.id) },
  { id: "react-vue-svelte", fields: ["curva", "ecossistema", "desempenho"], technologyIds: ["react", "vue", "svelte"] }
];

export const learningTracks = [
  { id: "base-digital", title: l("Base digital", "Digital foundation", "Base digital"), audience: l("Iniciante", "Beginner", "Principiante"), roadmapIds: ["comecar-do-zero"] },
  { id: "construir-produtos", title: l("Construir produtos web", "Build web products", "Crear productos web"), audience: l("Desenvolvimento", "Development", "Desarrollo"), roadmapIds: ["frontend", "backend"] },
  { id: "operar-plataformas", title: l("Operar plataformas", "Operate platforms", "Operar plataformas"), audience: l("Infraestrutura", "Infrastructure", "Infraestructura"), roadmapIds: ["devops"] }
];

export const collections = {
  areas,
  technologies,
  languages,
  frameworks,
  tools,
  databases,
  cloudServices,
  careerPaths,
  roadmaps,
  projects,
  certifications,
  glossary,
  comparisons,
  learningTracks
};
