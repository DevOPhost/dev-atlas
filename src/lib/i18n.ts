export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export type Localized = Record<Locale, string>;

export const languageNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español"
};

const dictionaries = {
  pt: {
    nav: {
      explore: "Explorar",
      areas: "Áreas",
      roadmaps: "Roadmaps",
      projects: "Projetos",
      glossary: "Glossário",
      compare: "Comparar",
      quiz: "Descobrir minha área"
    },
    common: {
      search: "Buscar no DevAtlas",
      searchHint: "Busque uma área, tecnologia ou termo",
      viewAll: "Ver todos",
      start: "Começar do zero",
      open: "Abrir conteúdo",
      readMore: "Entender esta área",
      level: "Nível",
      duration: "Duração",
      saved: "Salvo",
      save: "Salvar",
      noResults: "Nada por aqui. Tente outro termo ou remova um filtro.",
      skip: "Pular para o conteúdo"
    }
  },
  en: {
    nav: {
      explore: "Explore",
      areas: "Fields",
      roadmaps: "Roadmaps",
      projects: "Projects",
      glossary: "Glossary",
      compare: "Compare",
      quiz: "Find my field"
    },
    common: {
      search: "Search DevAtlas",
      searchHint: "Search for a field, technology or term",
      viewAll: "View all",
      start: "Start from scratch",
      open: "Open content",
      readMore: "Explore this field",
      level: "Level",
      duration: "Duration",
      saved: "Saved",
      save: "Save",
      noResults: "Nothing here. Try another term or clear a filter.",
      skip: "Skip to content"
    }
  },
  es: {
    nav: {
      explore: "Explorar",
      areas: "Áreas",
      roadmaps: "Roadmaps",
      projects: "Proyectos",
      glossary: "Glosario",
      compare: "Comparar",
      quiz: "Descubrir mi área"
    },
    common: {
      search: "Buscar en DevAtlas",
      searchHint: "Busca un área, tecnología o término",
      viewAll: "Ver todos",
      start: "Empezar desde cero",
      open: "Abrir contenido",
      readMore: "Conocer esta área",
      level: "Nivel",
      duration: "Duración",
      saved: "Guardado",
      save: "Guardar",
      noResults: "No hay resultados. Prueba otro término o quita un filtro.",
      skip: "Saltar al contenido"
    }
  }
} as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const t = (value: Localized, locale: Locale) => value[locale];

const levelLabels = {
  iniciante: { pt: "Iniciante", en: "Beginner", es: "Principiante" },
  intermediario: { pt: "Intermediário", en: "Intermediate", es: "Intermedio" },
  avancado: { pt: "Avançado", en: "Advanced", es: "Avanzado" }
} as const;

const technologyTypeLabels = {
  linguagem: { pt: "Linguagem", en: "Language", es: "Lenguaje" },
  runtime: { pt: "Runtime", en: "Runtime", es: "Runtime" },
  biblioteca: { pt: "Biblioteca", en: "Library", es: "Biblioteca" },
  framework: { pt: "Framework", en: "Framework", es: "Framework" },
  "banco-dados": { pt: "Banco de dados", en: "Database", es: "Base de datos" },
  "banco-vetorial": { pt: "Banco vetorial", en: "Vector database", es: "Base vectorial" },
  "provedor-cloud": { pt: "Provedor cloud", en: "Cloud provider", es: "Proveedor cloud" },
  "servico-cloud": { pt: "Serviço cloud", en: "Cloud service", es: "Servicio cloud" },
  ferramenta: { pt: "Ferramenta", en: "Tool", es: "Herramienta" },
  plataforma: { pt: "Plataforma", en: "Platform", es: "Plataforma" },
  protocolo: { pt: "Protocolo", en: "Protocol", es: "Protocolo" },
  conceito: { pt: "Conceito", en: "Concept", es: "Concepto" },
  pratica: { pt: "Prática", en: "Practice", es: "Práctica" },
  engine: { pt: "Engine", en: "Engine", es: "Engine" },
  "ide-editor": { pt: "IDE/editor", en: "IDE/editor", es: "IDE/editor" },
  "ferramenta-teste": { pt: "Ferramenta de teste", en: "Testing tool", es: "Herramienta de pruebas" },
  observabilidade: { pt: "Observabilidade", en: "Observability", es: "Observabilidad" },
  seguranca: { pt: "Segurança", en: "Security", es: "Seguridad" },
  design: { pt: "Design", en: "Design", es: "Diseño" },
  produto: { pt: "Produto", en: "Product", es: "Producto" },
  "sistema-operacional": { pt: "Sistema operacional", en: "Operating system", es: "Sistema operativo" },
  infraestrutura: { pt: "Infraestrutura", en: "Infrastructure", es: "Infraestructura" },
  arquitetura: { pt: "Arquitetura", en: "Architecture", es: "Arquitectura" }
} as const;

const scaleLabels = {
  alto: { pt: "Alto", en: "High", es: "Alto" },
  medio: { pt: "Médio", en: "Medium", es: "Medio" },
  baixo: { pt: "Baixo", en: "Low", es: "Bajo" },
  alta: { pt: "Alta", en: "High", es: "Alta" },
  media: { pt: "Média", en: "Medium", es: "Media" },
  baixa: { pt: "Baixa", en: "Low", es: "Baja" }
} as const;

export const levelLabel = (value: keyof typeof levelLabels, locale: Locale) =>
  levelLabels[value][locale];

export const technologyTypeLabel = (
  value: keyof typeof technologyTypeLabels,
  locale: Locale
) => technologyTypeLabels[value][locale];

export const scaleLabel = (value: keyof typeof scaleLabels, locale: Locale) =>
  scaleLabels[value][locale];

const roleLabels: Record<string, Localized> = {
  "Desenvolvedor front-end": { pt: "Desenvolvedor front-end", en: "Front-end Developer", es: "Desarrollador front-end" },
  "Desenvolvedor back-end": { pt: "Desenvolvedor back-end", en: "Back-end Developer", es: "Desarrollador back-end" },
  "Analista de dados": { pt: "Analista de dados", en: "Data Analyst", es: "Analista de datos" },
  "Analista de BI": { pt: "Analista de BI", en: "BI Analyst", es: "Analista de BI" },
  "Cientista de dados": { pt: "Cientista de dados", en: "Data Scientist", es: "Científico de datos" },
  "Analista de segurança": { pt: "Analista de segurança", en: "Security Analyst", es: "Analista de seguridad" },
  "Analista de suporte": { pt: "Analista de suporte", en: "Support Analyst", es: "Analista de soporte" }
};

export const roleLabel = (value: string, locale: Locale) =>
  roleLabels[value]?.[locale] ?? value;
