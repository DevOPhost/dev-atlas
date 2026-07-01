# DevAtlas

Tecnologia é grande demais para navegar no escuro.

Eu criei o DevAtlas porque escolher um caminho em tecnologia costuma ser mais difícil do que encontrar conteúdo para estudar. Há muitas áreas, ferramentas e opiniões, mas nem sempre existe contexto para entender o que vem antes, o que é prioridade e como uma tecnologia se relaciona com o trabalho real.

O DevAtlas é a forma que encontrei de organizar esse mapa. É um guia gratuito e aberto para estudantes, pessoas em transição de carreira e profissionais que querem comparar caminhos com mais clareza. Não é uma plataforma de cursos, não promete resultados rápidos e não parte da ideia de que exista uma trilha única para todo mundo.

## O que há no projeto

- Áreas de atuação com rotina, responsabilidades, habilidades, cargos e relações.
- Guias de tecnologias e fundamentos com pré-requisitos, contexto de uso, limitações, boas práticas, projetos e próximos passos.
- Roadmaps orientados por domínio e critérios de avanço, sem cronogramas fechados.
- Projetos de portfólio com problema, escopo, decisões, riscos e formas de apresentação.
- Glossário técnico com explicações introdutórias e aprofundamento.
- Comparador de áreas e um quiz de orientação que explica o resultado sem tratá-lo como diagnóstico.
- Guia prático para LinkedIn, GitHub e README de projetos.
- Busca local, tema claro/escuro e conteúdo em português, inglês e espanhol.

O conteúdo central fica disponível em HTML e pode ser navegado sem conta. Preferências de idioma, tema e progresso dos roadmaps ficam apenas no navegador.

## Decisões que orientam o DevAtlas

Eu tento apresentar o problema antes da ferramenta. Uma página sobre Kubernetes, por exemplo, precisa deixar claro por que a tecnologia existe, quais fundamentos vêm antes e quando ela seria complexidade desnecessária. O mesmo vale para linguagens, bancos, cloud, segurança, dados e design.

Também trato os roadmaps como mapas de competência. A pessoa avança quando consegue explicar, praticar e demonstrar uma base — não porque uma quantidade arbitrária de semanas terminou.

Outras decisões importantes:

- conteúdo aberto, sem login e sem coleta de dados pessoais;
- relações tipadas entre tecnologias, fundamentos, áreas e projetos;
- nomes oficiais e links para documentação primária quando disponíveis;
- páginas pré-renderizadas para preservar leitura, SEO e desempenho;
- animação como apoio à hierarquia, nunca como requisito para acessar conteúdo;
- suporte a teclado, leitores de tela e movimento reduzido.

## Tecnologias utilizadas

| Camada | Escolha | Papel no projeto |
| --- | --- | --- |
| Aplicação | Next.js e React | Rotas, geração estática, metadados e interface |
| Linguagem | TypeScript | Contratos do conteúdo e validação em build |
| Busca | Fuse.js | Busca tolerante a variações, executada localmente |
| Interface | CSS próprio e Lucide | Sistema visual, responsividade e ícones de interface |
| Marcas técnicas | Simple Icons e Devicon | Logotipos oficiais ou reconhecidos das tecnologias |
| Persistência | `localStorage` | Tema, idioma e progresso local, sem dados sensíveis |

Não há banco de dados, autenticação, API própria ou variáveis secretas nesta versão.

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

O arquivo `src/data/content.ts` ainda concentra a composição das coleções legadas. Os conteúdos mais extensos já foram separados por domínio; novas expansões devem seguir essa organização em vez de voltar a aumentar uma única fonte.

## Rodando localmente

Pré-requisitos:

- Node.js 20.9 ou mais recente;
- npm compatível com o `package-lock.json`.

Instale as dependências e inicie o ambiente:

```bash
npm ci
npm run dev
```

A aplicação fica disponível em `http://localhost:3000` e encaminha a raiz para `/pt`.

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

Os IDs permanecem curtos, estáveis e sem acento; os valores exibidos passam por rótulos editoriais localizados. O seletor de idioma preserva a rota atual ao alternar entre `/pt`, `/en` e `/es`.

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

- tema escolhido;
- idioma escolhido;
- etapas marcadas nos roadmaps.

O projeto valida IDs, relações e URLs editoriais durante o build, não renderiza HTML vindo do catálogo e aplica uma política de segurança de conteúdo e headers defensivos no Next.js. Links externos abertos em nova aba usam `noopener noreferrer`.

Relatos de vulnerabilidade devem seguir as instruções de [SECURITY.md](./SECURITY.md), sem exposição pública de detalhes sensíveis.

## SEO e performance

As rotas de conteúdo são pré-renderizadas, têm URLs próprias e versões localizadas. O projeto mantém sitemap, robots, canonical e `hreflang`. A busca e as interações são carregadas no cliente, mas a leitura principal permanece disponível no HTML.

A URL canônica do ambiente está centralizada em `src/lib/site.ts`. Ela deve ser atualizada se o domínio público mudar.

## Contribuições

Correções técnicas, ajustes de linguagem e melhorias editoriais são bem-vindos. Como o conteúdo está disponível em três idiomas e possui relações internas, mudanças precisam ser pequenas e verificáveis.

O fluxo recomendado está em [CONTRIBUTING.md](./CONTRIBUTING.md). Para vulnerabilidades, use o canal privado descrito na política de segurança.

## Próximos passos

- aprofundar os guias que ainda têm cobertura introdutória;
- revisar conteúdos com profissionais de cada área;
- ampliar fontes primárias e datas de revisão;
- separar gradualmente as coleções legadas por domínio;
- melhorar a validação editorial e os testes de acessibilidade;
- acompanhar desempenho real antes de adicionar novas dependências.

## Licença

O código e o conteúdo deste repositório são disponibilizados sob a [licença MIT](./LICENSE).
