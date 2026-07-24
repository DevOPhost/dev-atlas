# DevAtlas

**[English](#english) · [Português](#portugues)**

---

<a name="english"></a>

Technology is too broad to navigate in the dark.

I created DevAtlas because choosing a path in tech is often harder than finding content to study. There are too many areas, tools, opinions, and roadmaps, but not always enough context to understand what comes first, what actually matters, and how each technology connects to real work.

DevAtlas is my attempt to organize that map. It is a free and open guide for students, career changers, and professionals who want to compare paths with more clarity. It is not a course platform, it does not promise fast results, and it does not assume there is one perfect roadmap for everyone.

[View live demo](https://devatlas-mauve.vercel.app/pt) · [Source code](https://github.com/DevOPhost/dev-atlas)

## What is inside

* Tech areas with routines, responsibilities, skills, roles, and relationships.
* Guides for technologies and fundamentals with prerequisites, use cases, limitations, good practices, projects, and next steps.
* Domain-based roadmaps focused on progress criteria, not fixed timelines.
* Portfolio project ideas with problem, scope, decisions, risks, and presentation guidance.
* A technical glossary with introductory explanations and deeper context.
* An area comparison tool and an orientation quiz that explains the result without treating it as a diagnosis.
* A practical guide for LinkedIn, GitHub, and project READMEs.
* Local search, light/dark mode, and content in Portuguese, English, and Spanish.

The main content is available as HTML and can be browsed without an account. Language, theme, and roadmap progress preferences stay only in the browser.

## Principles behind DevAtlas

I try to present the problem before the tool. A page about Kubernetes, for example, should explain why the technology exists, which fundamentals come before it, and when it may be unnecessary complexity. The same idea applies to programming languages, databases, cloud, security, data, and design.

I also treat roadmaps as competency maps. Progress should come from being able to explain, practice, and demonstrate a foundation — not from simply finishing an arbitrary number of weeks.

Other important decisions:

* open content, no login, and no personal data collection;
* typed relationships between technologies, fundamentals, areas, and projects;
* official names and links to primary documentation whenever available;
* pre-rendered pages to preserve readability, SEO, and performance;
* animation used to support hierarchy, never as a requirement to access content;
* support for keyboard navigation, screen readers, and reduced motion preferences.

## Technologies used

| Layer            | Choice                   | Role in the project                                        |
| ---------------- | ------------------------ | ---------------------------------------------------------- |
| Application      | Next.js and React        | Routes, static generation, metadata, and interface         |
| Language         | TypeScript               | Content contracts and build-time validation                |
| Search           | Fuse.js                  | Local fuzzy search with tolerance for variations           |
| Interface        | Custom CSS and Lucide    | Visual system, responsiveness, and interface icons         |
| Technical brands | Simple Icons and Devicon | Official or widely recognized technology logos             |
| Persistence      | `localStorage`           | Theme, language, and local progress without sensitive data |

This version does not use a database, authentication, custom API, or secret environment variables.

## Structure

```text
.
├── docs/
│   ├── briefing.md             # original product context
│   └── content-audit.md        # editorial audit that guided the evolution
├── src/
│   ├── app/
│   │   ├── [locale]/           # pages under /pt, /en and /es
│   │   ├── globals.css         # tokens, themes, layout and responsiveness
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/             # navigation, search, catalogs and interactions
│   ├── data/
│   │   ├── technologies/       # guides, fundamentals and relationships
│   │   ├── content.ts          # collections and catalog composition
│   │   └── validate-content.ts # integrity checks for IDs, relations and URLs
│   └── lib/                    # i18n, types, metadata and utilities
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

The `src/data/content.ts` file still concentrates part of the legacy collection composition. Larger content pieces have already been separated by domain; future expansions should follow that structure instead of growing a single source file again.

## Running locally

Requirements:

* Node.js 20.9 or newer;
* npm compatible with the `package-lock.json`.

Install the dependencies and start the development server:

```bash
npm ci
npm run dev
```

The application will be available at `http://localhost:3000`, and the root route redirects to `/pt`.

To validate the same version used in production:

```bash
npm run lint
npm run build
npm start
```

The `lint` command runs the full TypeScript verification. The build also validates content relationships and generates the static pages.

## Content and internationalization

Localized text uses three keys:

```ts
type Localized = {
  pt: string;
  en: string;
  es: string;
};
```

IDs remain short, stable, and accent-free. Displayed values are handled through localized editorial labels. The language selector preserves the current route when switching between `/pt`, `/en`, and `/es`.

When changing content, I check:

1. whether IDs and relationships point to existing records;
2. whether editorial links use HTTPS;
3. whether the three languages were actually filled in;
4. whether proper names keep their official spelling;
5. whether the guidance explains context and trade-offs instead of presenting a universal recipe.

## Accessibility

DevAtlas uses semantic HTML, a skip link, visible focus states, keyboard navigation, and accessible names for controls. The content does not depend on animation, color, or hover states to be understood. When `prefers-reduced-motion` is enabled, transitions and movement are reduced.

Manual checks include keyboard usage, zoom, contrast in both themes, small screen widths, and the absence of horizontal overflow.

## Security and privacy

This version does not receive form data, does not include authentication, and does not send preferences to a server. The `localStorage` only stores:

* selected theme;
* selected language;
* checked roadmap steps.

The project validates IDs, relationships, and editorial URLs during the build, does not render HTML from the catalog, and applies a content security policy and defensive headers in Next.js. External links opened in a new tab use `noopener noreferrer`.

Vulnerability reports should follow the instructions in [SECURITY.md](./SECURITY.md), without publicly exposing sensitive details.

## SEO and performance

Content routes are pre-rendered, have their own URLs, and include localized versions. The project maintains sitemap, robots, canonical URLs, and `hreflang`. Search and interactions run on the client, but the main reading experience remains available in the HTML.

The canonical environment URL is centralized in `src/lib/site.ts`. It should be updated if the public domain changes.

## Contributing

Technical fixes, language improvements, and editorial contributions are welcome. Since the content is available in three languages and has internal relationships, changes should be small and easy to verify.

The recommended workflow is described in [CONTRIBUTING.md](./CONTRIBUTING.md). For vulnerabilities, use the private channel described in the security policy.

## Next steps

* deepen guides that still have introductory coverage;
* review content with professionals from each area;
* expand primary sources and review dates;
* gradually separate legacy collections by domain;
* improve editorial validation and accessibility tests;
* monitor real performance before adding new dependencies.

## License

The code and content in this repository are available under the [MIT License](./LICENSE).

---

<a name="portugues"></a>

Tecnologia é grande demais para navegar no escuro.

Eu criei o DevAtlas porque escolher um caminho em tecnologia costuma ser mais difícil do que encontrar conteúdo para estudar. Existem muitas áreas, ferramentas, opiniões e roadmaps, mas nem sempre existe contexto suficiente para entender o que vem antes, o que realmente importa e como cada tecnologia se conecta ao trabalho real.

O DevAtlas é a forma que encontrei de organizar esse mapa. É um guia gratuito e aberto para estudantes, pessoas em transição de carreira e profissionais que querem comparar caminhos com mais clareza. Não é uma plataforma de cursos, não promete resultados rápidos e não parte da ideia de que exista uma trilha perfeita para todo mundo.

[Ver demonstração](https://devatlas-mauve.vercel.app/pt) · [Código-fonte](https://github.com/DevOPhost/dev-atlas)

## O que há no projeto

* Áreas de atuação com rotina, responsabilidades, habilidades, cargos e relações.
* Guias de tecnologias e fundamentos com pré-requisitos, contexto de uso, limitações, boas práticas, projetos e próximos passos.
* Roadmaps organizados por domínio e critérios de avanço, sem cronogramas fechados.
* Ideias de projetos de portfólio com problema, escopo, decisões, riscos e formas de apresentação.
* Glossário técnico com explicações introdutórias e aprofundamento.
* Comparador de áreas e um quiz de orientação que explica o resultado sem tratá-lo como diagnóstico.
* Guia prático para LinkedIn, GitHub e README de projetos.
* Busca local, tema claro/escuro e conteúdo em português, inglês e espanhol.

O conteúdo central fica disponível em HTML e pode ser navegado sem conta. Preferências de idioma, tema e progresso dos roadmaps ficam apenas no navegador.

## Decisões que orientam o DevAtlas

Eu tento apresentar o problema antes da ferramenta. Uma página sobre Kubernetes, por exemplo, precisa deixar claro por que a tecnologia existe, quais fundamentos vêm antes e quando ela pode ser complexidade desnecessária. O mesmo vale para linguagens, bancos de dados, cloud, segurança, dados e design.

Também trato os roadmaps como mapas de competência. A pessoa avança quando consegue explicar, praticar e demonstrar uma base — não porque uma quantidade arbitrária de semanas terminou.

Outras decisões importantes:

* conteúdo aberto, sem login e sem coleta de dados pessoais;
* relações tipadas entre tecnologias, fundamentos, áreas e projetos;
* nomes oficiais e links para documentação primária quando disponíveis;
* páginas pré-renderizadas para preservar leitura, SEO e desempenho;
* animação como apoio à hierarquia, nunca como requisito para acessar conteúdo;
* suporte a teclado, leitores de tela e movimento reduzido.

## Tecnologias utilizadas

| Camada          | Escolha                | Papel no projeto                                     |
| --------------- | ---------------------- | ---------------------------------------------------- |
| Aplicação       | Next.js e React        | Rotas, geração estática, metadados e interface       |
| Linguagem       | TypeScript             | Contratos do conteúdo e validação em build           |
| Busca           | Fuse.js                | Busca local tolerante a variações                    |
| Interface       | CSS próprio e Lucide   | Sistema visual, responsividade e ícones de interface |
| Marcas técnicas | Simple Icons e Devicon | Logotipos oficiais ou reconhecidos das tecnologias   |
| Persistência    | `localStorage`         | Tema, idioma e progresso local, sem dados sensíveis  |

Esta versão não utiliza banco de dados, autenticação, API própria ou variáveis secretas.

## Estrutura

```text
.
├── docs/
│   ├── briefing.md             # contexto original do produto
│   └── content-audit.md        # auditoria editorial que orientou a evolução
├── src/
│   ├── app/
│   │   ├── [locale]/           # páginas em /pt, /en e /es
│   │   ├── globals.css         # tokens, temas, layout e responsividade
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/             # navegação, busca, catálogos e interações
│   ├── data/
│   │   ├── technologies/       # guias, fundamentos e relações
│   │   ├── content.ts          # coleções e composição do catálogo
│   │   └── validate-content.ts # integridade de IDs, relações e URLs
│   └── lib/                    # i18n, tipos, metadados e utilitários
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

O arquivo `src/data/content.ts` ainda concentra parte da composição das coleções legadas. Os conteúdos mais extensos já foram separados por domínio; novas expansões devem seguir essa organização em vez de voltar a aumentar uma única fonte.

## Rodando localmente

Pré-requisitos:

* Node.js 20.9 ou mais recente;
* npm compatível com o `package-lock.json`.

Instale as dependências e inicie o ambiente de desenvolvimento:

```bash
npm ci
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`, e a rota raiz redireciona para `/pt`.

Para validar a mesma versão usada em produção:

```bash
npm run lint
npm run build
npm start
```

O comando `lint` executa a verificação completa do TypeScript. O build também valida as relações do conteúdo e gera as páginas estáticas.

## Conteúdo e internacionalização

Os textos localizados usam três chaves:

```ts
type Localized = {
  pt: string;
  en: string;
  es: string;
};
```

Os IDs permanecem curtos, estáveis e sem acento. Os valores exibidos passam por rótulos editoriais localizados. O seletor de idioma preserva a rota atual ao alternar entre `/pt`, `/en` e `/es`.

Ao alterar conteúdo, eu verifico:

1. se IDs e relações apontam para registros existentes;
2. se links editoriais usam HTTPS;
3. se os três idiomas foram preenchidos de verdade;
4. se nomes próprios mantêm a grafia oficial;
5. se a orientação descreve contexto e trade-offs, não uma receita universal.

## Acessibilidade

O DevAtlas usa HTML semântico, link de salto, foco visível, navegação por teclado e nomes acessíveis nos controles. O conteúdo não depende de animação, cor ou hover para ser compreendido. Quando `prefers-reduced-motion` está ativo, transições e movimentos são reduzidos.

As verificações manuais incluem teclado, zoom, contraste nos dois temas, larguras pequenas e ausência de overflow horizontal.

## Segurança e privacidade

Esta versão não recebe dados de formulário, não possui autenticação e não envia preferências para um servidor. O `localStorage` guarda apenas:

* tema escolhido;
* idioma escolhido;
* etapas marcadas nos roadmaps.

O projeto valida IDs, relações e URLs editoriais durante o build, não renderiza HTML vindo do catálogo e aplica uma política de segurança de conteúdo e headers defensivos no Next.js. Links externos abertos em nova aba usam `noopener noreferrer`.

Relatos de vulnerabilidade devem seguir as instruções de [SECURITY.md](./SECURITY.md), sem exposição pública de detalhes sensíveis.

## SEO e performance

As rotas de conteúdo são pré-renderizadas, têm URLs próprias e versões localizadas. O projeto mantém sitemap, robots, canonical e `hreflang`. A busca e as interações são carregadas no cliente, mas a leitura principal permanece disponível no HTML.

A URL canônica do ambiente está centralizada em `src/lib/site.ts`. Ela deve ser atualizada se o domínio público mudar.

## Contribuições

Correções técnicas, ajustes de linguagem e melhorias editoriais são bem-vindos. Como o conteúdo está disponível em três idiomas e possui relações internas, mudanças precisam ser pequenas e verificáveis.

O fluxo recomendado está em [CONTRIBUTING.md](./CONTRIBUTING.md). Para vulnerabilidades, use o canal privado descrito na política de segurança.

## Próximos passos

* aprofundar os guias que ainda têm cobertura introdutória;
* revisar conteúdos com profissionais de cada área;
* ampliar fontes primárias e datas de revisão;
* separar gradualmente as coleções legadas por domínio;
* melhorar a validação editorial e os testes de acessibilidade;
* acompanhar desempenho real antes de adicionar novas dependências.

## Licença

O código e o conteúdo deste repositório são disponibilizados sob a [licença MIT](./LICENSE).
