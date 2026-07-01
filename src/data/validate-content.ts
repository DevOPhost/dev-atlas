import type {
  Area,
  GlossaryTerm,
  Project,
  Roadmap,
  Technology
} from "@/lib/content-types";

type Content = {
  areas: Area[];
  technologies: Technology[];
  roadmaps: Roadmap[];
  projects: Project[];
  glossary: GlossaryTerm[];
};

const assertUnique = (label: string, ids: string[]) => {
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    throw new Error(`${label}: duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
  }
};

const assertReferences = (
  label: string,
  ids: string[],
  validIds: Set<string>
) => {
  const invalid = [...new Set(ids.filter((id) => !validIds.has(id)))];
  if (invalid.length) {
    throw new Error(`${label}: unknown IDs: ${invalid.join(", ")}`);
  }
};

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const assertValidIds = (label: string, ids: string[]) => {
  const invalid = ids.filter((id) => !idPattern.test(id));
  if (invalid.length) {
    throw new Error(`${label}: invalid IDs: ${[...new Set(invalid)].join(", ")}`);
  }
};

const assertSecureUrl = (label: string, value?: string) => {
  if (!value) return;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label}: invalid URL`);
  }
  if (url.protocol !== "https:") {
    throw new Error(`${label}: only HTTPS URLs are allowed`);
  }
  if (url.username || url.password) {
    throw new Error(`${label}: credentials are not allowed in URLs`);
  }
};

const localeKeys = ["pt", "en", "es"] as const;

const assertLocalizedContent = (value: unknown, path = "content") => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertLocalizedContent(item, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  const localized = localeKeys.some((locale) => locale in record);
  if (localized) {
    for (const locale of localeKeys) {
      const text = record[locale];
      if (typeof text !== "string" || !text.trim()) {
        throw new Error(`${path}.${locale}: localized text must not be empty`);
      }
      if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(text)) {
        throw new Error(`${path}.${locale}: localized text contains control characters`);
      }
    }
  }

  Object.entries(record).forEach(([key, item]) =>
    assertLocalizedContent(item, `${path}.${key}`)
  );
};

const assertReviewedAt = (label: string, value?: string) => {
  if (!value) return;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error(`${label}: reviewedAt must use a valid YYYY-MM-DD date`);
  }
};

export const validateContent = ({
  areas,
  technologies,
  roadmaps,
  projects,
  glossary
}: Content) => {
  assertLocalizedContent({ areas, technologies, roadmaps, projects, glossary });

  const areaIds = new Set(areas.map((item) => item.id));
  const technologyIds = new Set(technologies.map((item) => item.id));
  const projectIds = new Set(projects.map((item) => item.id));

  assertUnique("areas", areas.map((item) => item.id));
  assertUnique("technologies", technologies.map((item) => item.id));
  assertUnique("roadmaps", roadmaps.map((item) => item.id));
  assertUnique("projects", projects.map((item) => item.id));
  assertUnique("glossary", glossary.map((item) => item.id));
  assertValidIds("areas", areas.map((item) => item.id));
  assertValidIds("technologies", technologies.map((item) => item.id));
  assertValidIds("roadmaps", roadmaps.map((item) => item.id));
  assertValidIds("projects", projects.map((item) => item.id));
  assertValidIds("glossary", glossary.map((item) => item.id));

  for (const area of areas) {
    if (!/^#[0-9a-f]{6}$/i.test(area.accent)) {
      throw new Error(`area ${area.id}: accent must be a six-digit hex color`);
    }
    assertUnique(`area ${area.id} technologies`, area.technologies);
    assertUnique(`area ${area.id} related`, area.related);
    assertReferences(`area ${area.id} technologies`, area.technologies, technologyIds);
    assertReferences(`area ${area.id} related`, area.related, areaIds);
  }
  for (const technology of technologies) {
    assertSecureUrl(`technology ${technology.id} officialUrl`, technology.officialUrl);
    assertSecureUrl(`technology ${technology.id} docsUrl`, technology.docsUrl);
    assertReviewedAt(`technology ${technology.id}`, technology.reviewedAt);
    assertUnique(`technology ${technology.id} areas`, technology.areaIds);
    assertUnique(
      `technology ${technology.id} relations`,
      (technology.relations ?? []).map((relation) => `${relation.type}:${relation.technologyId}`)
    );
    assertReferences(`technology ${technology.id} areas`, technology.areaIds, areaIds);
    assertReferences(
      `technology ${technology.id} relations`,
      (technology.relations ?? []).map((relation) => relation.technologyId),
      technologyIds
    );
  }
  for (const roadmap of roadmaps) {
    assertUnique(`roadmap ${roadmap.id} projects`, roadmap.projectIds);
    assertUnique(`roadmap ${roadmap.id} technologies`, roadmap.technologyIds ?? []);
    assertReferences(`roadmap ${roadmap.id} area`, [roadmap.areaId], areaIds);
    assertReferences(
      `roadmap ${roadmap.id} projects`,
      [
        ...roadmap.projectIds,
        ...roadmap.steps.flatMap((step) => step.projectId ? [step.projectId] : [])
      ],
      projectIds
    );
    assertReferences(
      `roadmap ${roadmap.id} technologies`,
      [
        ...(roadmap.technologyIds ?? []),
        ...roadmap.steps.flatMap((step) => step.technologyIds ?? [])
      ],
      technologyIds
    );
  }
  for (const project of projects) {
    if (!project.stack.length) {
      throw new Error(`project ${project.id}: stack must not be empty`);
    }
    assertReferences(`project ${project.id} area`, [project.areaId], areaIds);
  }
  for (const term of glossary) {
    assertReferences(`glossary ${term.id} areas`, term.areaIds, areaIds);
    assertReferences(
      `glossary ${term.id} technologies`,
      term.technologyIds ?? [],
      technologyIds
    );
  }
};
