import type { Localized } from "./i18n";

export type Level = "iniciante" | "intermediario" | "avancado";
export type TechnologyType =
  | "linguagem"
  | "runtime"
  | "biblioteca"
  | "framework"
  | "banco-dados"
  | "banco-vetorial"
  | "provedor-cloud"
  | "servico-cloud"
  | "ferramenta"
  | "plataforma"
  | "protocolo"
  | "conceito"
  | "pratica"
  | "engine"
  | "ide-editor"
  | "ferramenta-teste"
  | "observabilidade"
  | "seguranca"
  | "design"
  | "produto"
  | "sistema-operacional"
  | "infraestrutura"
  | "arquitetura";

export type TechnologyDomain =
  | "fundamentos"
  | "web"
  | "frontend"
  | "backend"
  | "fullstack"
  | "mobile"
  | "desktop"
  | "games"
  | "dados"
  | "ia"
  | "devops"
  | "cloud"
  | "infraestrutura"
  | "seguranca"
  | "qa"
  | "ux-ui"
  | "produto";

export type TechnologyRelationType =
  | "prerequisite"
  | "ecosystem"
  | "pairs-with"
  | "alternative"
  | "next-step"
  | "related-concept";

export interface TechnologyRelation {
  technologyId: string;
  type: TechnologyRelationType;
  note?: Localized;
}

export interface TechnologyNarrative {
  opening: Localized[];
  ecosystem: Localized;
  decisions: Localized;
  gettingStarted: Localized;
  comparison?: Localized;
}
export type Category =
  | "desenvolvimento"
  | "dados"
  | "infraestrutura"
  | "seguranca"
  | "design"
  | "gestao"
  | "suporte";

export interface Area {
  id: string;
  name: Localized;
  eyebrow: Localized;
  description: Localized;
  longDescription: Localized;
  category: Category;
  icon: string;
  accent: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  remote: "alto" | "medio" | "baixo";
  freelance: "alto" | "medio" | "baixo";
  math: "alta" | "media" | "baixa";
  routine: Localized[];
  skills: Localized[];
  roles: string[];
  technologies: string[];
  firstProject: Localized;
  related: string[];
}

export interface Technology {
  id: string;
  name: string;
  type: TechnologyType;
  domains: TechnologyDomain[];
  category: Category;
  description: Localized;
  explanation?: Localized;
  problem?: Localized;
  inPractice?: Localized;
  studyWhen?: Localized;
  notPriorityWhen?: Localized;
  useWhen: Localized;
  avoidWhen: Localized;
  alternatives: string[];
  relations?: TechnologyRelation[];
  prerequisites?: Localized[];
  fundamentals?: Localized[];
  strengths?: Localized[];
  limitations?: Localized[];
  useCases?: Localized[];
  examples?: Localized[];
  commonMistakes?: Localized[];
  bestPractices?: Localized[];
  studyOrder?: Localized[];
  projectIdeas?: Localized[];
  roles?: string[];
  nextSteps?: Localized[];
  level: Level;
  areaIds: string[];
  officialUrl?: string;
  docsUrl?: string;
  reviewedAt?: string;
  editorialNote?: Localized;
  narrative?: TechnologyNarrative;
}

export interface RoadmapStep {
  title: Localized;
  description: Localized;
  checkpoint: Localized;
  objective?: Localized;
  study?: Localized[];
  practice?: Localized;
  projectId?: string;
  technologyIds?: string[];
}

export interface Roadmap {
  id: string;
  title: Localized;
  description: Localized;
  duration: Localized;
  pace?: Localized;
  level: Level;
  areaId: string;
  steps: RoadmapStep[];
  projectIds: string[];
  prerequisites?: Localized[];
  technologyIds?: string[];
  direction?: Localized;
}

export interface Project {
  id: string;
  title: Localized;
  description: Localized;
  areaId: string;
  level: Level;
  duration: Localized;
  stack: string[];
  features: Localized[];
  recruiterSignal: Localized;
  objective?: Localized;
  problem?: Localized;
  deliverables?: Localized[];
  avoid?: Localized[];
  differentials?: Localized[];
  professionalProof?: Localized[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  simple: Localized;
  technical: Localized;
  example: Localized;
  areaIds: string[];
  technologyIds?: string[];
}

export interface SimpleCollectionItem {
  id: string;
  name: string;
  description: Localized;
  relatedIds: string[];
}
