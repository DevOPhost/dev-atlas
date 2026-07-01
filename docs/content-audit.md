# Auditoria de conteúdo do DevAtlas

> Auditoria editorial e estrutural do estado atual do projeto. Este documento não implementa tecnologias, não reescreve o conteúdo publicado e não altera a interface. A leitura considera as coleções de `src/data/content.ts`, seus relacionamentos e a forma como o conteúdo é apresentado nas rotas atuais.

## 1. Resumo executivo

O DevAtlas já tem uma base funcional coerente para uma primeira versão: cobre dez áreas profissionais, mantém 95 tecnologias em um catálogo central, oferece cinco roadmaps, onze projetos, dez verbetes de glossário e conteúdo localizado em três idiomas. A cobertura é larga, mas a profundidade ainda é introdutória. Hoje o produto funciona melhor como mapa inicial do ecossistema do que como guia completo de estudo, prática e carreira.

### Inventário atual

| Coleção | Quantidade | Observação |
| --- | ---: | --- |
| Áreas | 10 | Todas têm descrição, rotina, habilidades, cargos, projeto inicial e relações |
| Tecnologias | 95 | Todas têm descrição curta, orientação de uso, alternativas, nível e áreas relacionadas |
| Linguagens | 10 | Coleção paralela e simplificada, com sobreposição ao catálogo de tecnologias |
| Frameworks | 10 | Coleção paralela e simplificada |
| Ferramentas | 10 | Coleção paralela e simplificada |
| Bancos de dados | 10 | Coleção paralela e simplificada |
| Serviços de nuvem | 10 | Coleção paralela e simplificada |
| Caminhos de carreira | 2 | Cobertura muito pequena em relação às dez áreas |
| Roadmaps | 5 | Apenas quatro áreas técnicas e uma trilha geral têm sequência própria |
| Projetos | 11 | Há pelo menos um projeto associado a cada área |
| Certificações | 5 | Cobertura inicial, concentrada em cloud, segurança, dados e redes |
| Glossário | 10 | Estrutura boa, volume insuficiente |
| Comparações | 2 | Comparador geral das áreas e React × Vue × Svelte |
| Trilhas de aprendizagem | 3 | Visões resumidas de início, web e cloud |

### Inventário das coleções complementares

As cinco coleções simplificadas não devem ser somadas às 95 tecnologias como se fossem 50 tecnologias adicionais: há sobreposição parcial e granularidades diferentes.

| Coleção | Itens cadastrados |
| --- | --- |
| Linguagens | JavaScript, TypeScript, Python, Java, C#, Go, PHP, Rust, Kotlin e SQL |
| Frameworks | React, Next.js, Vue, Angular, Svelte, NestJS, FastAPI, Spring Boot, ASP.NET Core e Laravel |
| Bancos de dados | PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, Redis, DynamoDB, Neo4j, Qdrant e TimescaleDB |
| Ferramentas | Docker, Kubernetes, Terraform, Ansible, GitHub Actions, GitLab CI, Prometheus, Grafana, Argo CD e Vault |
| Serviços cloud | Amazon EC2, Amazon S3, AWS Lambda, Azure Functions, Microsoft Entra ID, Google Cloud Run, BigQuery, Cloudflare Workers, Vercel e Supabase |
| Certificações | AWS Certified Cloud Practitioner, Microsoft Azure Fundamentals (AZ-900), CompTIA A+, Cisco CCNA e CompTIA Security+ |

Inconsistências dessa camada:

- TimescaleDB, GitLab CI, Argo CD e Vault existem apenas nas coleções simplificadas, não entre as 95 tecnologias.
- O framework Spring Boot usa ID `spring` na coleção simplificada e `springboot` no catálogo principal.
- Serviços específicos de cloud usam uma granularidade diferente dos registros amplos AWS, Azure, GCP e Cloudflare.
- Vue aparece como “Vue” em uma coleção e “Vue.js” na outra.
- Descrições dessas 55 entradas — as 50 dos cinco grupos e as cinco certificações — são replicadas em português nos três idiomas.

### Outros registros

- **Caminhos de carreira (2):** trilha de especialista (`especialista`: Estágio → Júnior → Pleno → Sênior → Staff/Especialista) e trilha de liderança (`lideranca`: Sênior → Tech Lead → Engineering Manager → Head/CTO).
- **Comparações (2):** comparador geral das dez áreas (`areas`, pelos campos dificuldade, remoto, freelance e matemática) e React × Vue × Svelte (`react-vue-svelte`, pelos campos curva, ecossistema e desempenho).
- **Trilhas de aprendizagem (3):** Base digital (`base-digital`, roadmap começar do zero), Construir produtos web (`construir-produtos`, roadmaps front-end e back-end) e Operar plataformas (`operar-plataformas`, roadmap DevOps).

Os estágios dos caminhos de carreira e os valores de público das trilhas são strings não localizadas. Isso precisa entrar na mesma validação dos demais rótulos editoriais.

### Distribuição das 95 tecnologias

**Por tipo atual**

| Tipo | Quantidade | Percentual aproximado |
| --- | ---: | ---: |
| Ferramenta | 28 | 29,5% |
| Framework | 26 | 27,4% |
| Linguagem | 18 | 18,9% |
| Banco de dados | 13 | 13,7% |
| Cloud | 10 | 10,5% |

**Por categoria atual**

| Categoria | Quantidade |
| --- | ---: |
| Desenvolvimento | 47 |
| Infraestrutura | 23 |
| Dados | 20 |
| Segurança | 3 |
| Design | 1 |
| Gestão | 1 |

**Por nível atual**

| Nível | Quantidade |
| --- | ---: |
| Iniciante | 18 |
| Intermediário | 49 |
| Avançado | 28 |

### Avaliação geral

- **Pontos fortes:** modelo relacional simples, boa amplitude inicial, descrições geralmente claras, uma página por tecnologia, conteúdo útil de rotina e carreira nas áreas, projetos distribuídos por todo o catálogo e localização estrutural em `/pt`, `/en` e `/es`.
- **Limites principais:** profundidade básica em todas as tecnologias; pouca diferenciação entre recomendações de uso; ausência de fontes e links oficiais; conceitos fundamentais sem presença própria; seis áreas sem roadmap; traduções incompletas em coleções secundárias; referências a tecnologias inexistentes; e duas fontes de verdade para relações entre áreas e tecnologias.
- **Risco editorial:** a largura do catálogo pode transmitir uma sensação de completude que o material ainda não sustenta. O produto deve comunicar que apresenta um mapa curado, não “todas as tecnologias existentes”.
- **Prioridade recomendada:** antes de ampliar o número de itens, consolidar taxonomia, relacionamentos, internacionalização e um modelo editorial mais profundo para páginas de tecnologia.

## 2. Auditoria das áreas

Escala usada nesta seção: **básica** = apresenta o campo e a definição; **intermediária** = orienta uma decisão ou prática; **completa** = sustenta estudo, execução e evolução profissional. Nenhuma área está completa segundo o briefing amplo do produto.

| Área | Conteúdo atual | Profundidade | Cobertura e tecnologias | O que falta ou precisa ser revisto |
| --- | --- | --- | --- | --- |
| **Front-end** (`frontend`) | Definição, texto longo, rotina, habilidades, cargos, projeto inicial, métricas, relações e roadmap próprio | Intermediária | HTML, CSS, JavaScript, TypeScript, React e Next.js são referências explícitas; a página recebe outras tecnologias por regra paralela | Fundamentos de web e acessibilidade mais explícitos; estado, formulários, testes de interface, consumo de APIs, desempenho e arquitetura; critérios por senioridade; exemplos de rotina; revisar a origem paralela do ecossistema |
| **Back-end** (`backend`) | Definição, rotina, habilidades, cargos, projeto inicial, métricas, relações e roadmap | Intermediária | TypeScript, Node.js, Python, Java, PostgreSQL e Redis formam um núcleo coerente | HTTP, autenticação e autorização, filas, cache, observabilidade, testes, modelagem, segurança e sistemas distribuídos; separar linguagem, runtime e framework; critérios por senioridade |
| **Dados & BI** (`dados`) | Definição, rotina, habilidades, cargos, projeto inicial, métricas, relações e roadmap | Intermediária | SQL, PostgreSQL, Python, Power BI e dbt cobrem análise e analytics engineering | Planilhas, estatística, qualidade de dados, visualização, modelagem dimensional, ETL/ELT, governança e privacidade; separar BI, engenharia e ciência de dados em caminhos mais claros |
| **IA & Machine Learning** (`ia`) | Definição, rotina, habilidades, cargos, projeto de RAG, métricas e relações | Básica a intermediária | Python, PyTorch, scikit-learn, Qdrant e Docker; ênfase atual tende a ML aplicado e RAG | Matemática e estatística, dados, avaliação de modelos, MLOps, ética, experimentação, modelos clássicos, NLP e visão; roadmap próprio; distinguir ciência de dados, ML engineering e IA generativa |
| **DevOps & SRE** (`devops`) | Definição, rotina, habilidades, cargos, projeto, métricas, relações e roadmap | Intermediária | Linux, Docker, Kubernetes, Terraform, GitHub Actions e Grafana oferecem boa espinha dorsal | Redes, shell, CI/CD como conceito, observabilidade completa, incidentes, SLI/SLO, segurança, custo e plataformas; Kubernetes aparece cedo sem trilha explícita de pré-requisitos |
| **Cloud Computing** (`cloud`) | Definição, rotina, habilidades, cargos, projeto, métricas e relações | Básica a intermediária | AWS, Azure, GCP, Cloudflare, Terraform e Kubernetes | Fundamentos de redes, IAM, custos, alta disponibilidade, storage, compute, bancos gerenciados, serverless e arquitetura; roadmap próprio; evitar transformar provedores em listas de serviços |
| **Cibersegurança** (`seguranca`) | Definição, rotina, habilidades, cargos, laboratório defensivo, métricas e relações | Básica a intermediária | Linux, Wireshark e Nmap existem; Wazuh e OWASP são citados, mas não existem no catálogo central | Corrigir referências quebradas; fundamentos de redes, sistemas, identidade, AppSec, blue/red team, resposta a incidentes, governança, LGPD e ética; roadmap; práticas seguras para laboratórios |
| **QA & Testes** (`qa`) | Definição, rotina, habilidades, cargos, projeto de E2E, métricas e relações | Básica a intermediária | Playwright, Vitest, Postman e JavaScript formam uma introdução consistente | Pirâmide de testes, estratégia, testes manuais, integração, contrato, performance, acessibilidade, dados de teste e CI; roadmap; separar ferramenta de prática |
| **UX & Product Design** (`ux`) | Definição, rotina, habilidades, cargos, case de serviço, métricas e relações | Básica | Figma existe; Maze e Hotjar são citados, mas não estão cadastrados | Corrigir referências; pesquisa, arquitetura de informação, conteúdo, acessibilidade, design systems, prototipação, métricas, handoff e portfólio; roadmap; ampliar relação com produto e front-end |
| **Suporte & Infraestrutura** (`suporte`) | Definição, rotina, habilidades, cargos, base de conhecimento, métricas e relações; é a área da trilha “começar do zero” | Básica a intermediária | Windows, Active Directory, Zabbix e GLPI são citados, mas nenhum está no catálogo; apenas Linux existe | Corrigir quatro referências; hardware, redes, ITIL, Microsoft 365, identidade, inventário, automação, atendimento e escalonamento; separar suporte, administração de sistemas e redes |

### Descrições resumidas atuais

- **Front-end:** constrói a parte visível e interativa dos produtos digitais.
- **Back-end:** sustenta regras de negócio, dados, segurança e integrações.
- **Dados & BI:** organiza, analisa e comunica dados para apoiar decisões.
- **IA & Machine Learning:** cria sistemas que aprendem padrões e automatizam previsões ou geração.
- **DevOps & SRE:** automatiza entrega, operação, observabilidade e confiabilidade.
- **Cloud Computing:** projeta e opera recursos de computação em provedores de nuvem.
- **Cibersegurança:** reduz riscos, investiga eventos e protege sistemas e dados.
- **QA & Testes:** previne defeitos e produz evidências sobre a qualidade do produto.
- **UX & Product Design:** pesquisa necessidades e desenha experiências compreensíveis.
- **Suporte & Infraestrutura:** mantém pessoas, dispositivos, acessos e serviços trabalhando.

### Conclusões sobre as áreas

1. A estrutura editorial é consistente, mas os textos usam praticamente o mesmo grau de detalhe em áreas de complexidades muito diferentes.
2. Front-end, back-end, dados e DevOps são as áreas mais maduras porque têm roadmap e projetos associados.
3. IA, cloud, segurança, QA, UX e suporte não têm roadmap próprio.
4. Cibersegurança, UX e suporte contêm oito IDs de tecnologia sem registro correspondente: `wazuh`, `owasp`, `maze`, `hotjar`, `windows`, `active-directory`, `zabbix` e `glpi`.
5. Os níveis de dificuldade, trabalho remoto, possibilidade de freelance e exigência matemática ajudam na comparação, mas são valores editoriais sem metodologia, fonte ou data de revisão.
6. Falta explicitar progressão de júnior a sênior, expectativas reais do mercado, contextos organizacionais e interseções entre cargos.

## 3. Auditoria individual das 95 tecnologias

### Critério aplicado

Todas as 95 fichas possuem a mesma base estrutural:

- **A — disponível atualmente:** nome, tipo, categoria, descrição curta, “quando usar”, “quando evitar”, alternativas escritas como texto, nível e IDs de áreas relacionadas.
- **L — lacuna comum a todas:** pré-requisitos, conceitos fundamentais, pontos fortes e limitações em campos próprios, combinações recomendadas, comparações aprofundadas, exemplos reais, ideias de projeto, ordem de estudo, erros comuns, boas práticas, empregos relacionados, próximos passos, fontes e documentação oficial.

Nos registros atuais, “quando usar” e “quando evitar” são gerados por modelos baseados no tipo. Isso reduz a precisão: duas tecnologias do mesmo tipo recebem orientações quase iguais, mesmo quando têm papéis e restrições muito diferentes. Nenhuma tecnologia tem `officialUrl` preenchida.

Classificação editorial de papel:

- **E — essencial:** base recorrente para aprender ou trabalhar no domínio indicado.
- **C — complementar:** amplia uma base, mas não deve anteceder os fundamentos.
- **A — avançada:** exige pré-requisitos e contexto para ser estudada com proveito.
- **S — específica:** importante em um nicho, plataforma ou organização, sem ser universal.

Todas as fichas têm profundidade **básica**. A coluna “Revisão” registra lacunas específicas além de **L** e relações/candidatas úteis para evolução futura.

### Linguagens e fundamentos classificados como linguagem

| Tecnologia | Áreas e nível atuais | Resumo do conteúdo disponível (A) | Papel | Revisão específica, relações e candidatas |
| --- | --- | --- | --- | --- |
| HTML (`html`) | Front-end · iniciante | Estrutura semântica de páginas | E | L; aprofundar semântica, formulários e acessibilidade; relacionar CSS, JavaScript e padrões web |
| CSS (`css`) | Front-end, UX · iniciante | Layout, responsividade e apresentação | E | L; incluir cascade, box model, layout, animação e acessibilidade visual; relacionar Sass e CSS Modules |
| JavaScript (`javascript`) | Front-end, back-end, QA · iniciante | Linguagem central da web | E | L; diferenciar browser e servidor; incluir assíncrono, DOM, módulos e runtime |
| TypeScript (`typescript`) | Front-end, back-end, QA · intermediário | Tipagem estática sobre JavaScript | C/E | L; pré-requisito JavaScript; explicar inferência, narrowing e custo de configuração |
| Python (`python`) | Back-end, dados, IA · iniciante | Automação, dados, web e ML | E | L; organizar caminhos por domínio; relacionar pandas, NumPy, Flask e automação |
| Java (`java`) | Back-end · intermediário | Backend corporativo e ecossistema maduro | E/S | L; incluir JVM, build, testes e Spring; diferenciar Java da plataforma |
| SQL (`sql`) | Back-end, dados · iniciante | Consulta e transformação de dados relacionais | E | L; explicar linguagem versus banco; incluir joins, agregações, modelagem, índices e transações |
| C# (`csharp`) | Back-end · intermediário | Serviços, desktop e jogos no ecossistema .NET | E/S | L; relacionar .NET, Unity, desktop e Azure; evitar restringir a descrição a um único nicho |
| Go (`go`) | Back-end, DevOps · intermediário | Serviços concorrentes e infraestrutura | C | L; incluir concorrência, módulos, testes e trade-offs; relacionar Kubernetes e cloud native |
| PHP (`php`) | Back-end · iniciante | Web server-side e amplo mercado | E/S | L; relacionar Composer, Laravel, Symfony e WordPress; contextualizar PHP moderno |
| Rust (`rust`) | Back-end, DevOps · avançado | Sistemas seguros e de alto desempenho | A | L; explicitar ownership, borrowing e curva de aprendizado; relacionar WebAssembly e Tauri |
| Kotlin (`kotlin`) | Back-end · intermediário | JVM moderna e desenvolvimento Android | E/S | L; a área mobile não existe; relacionar Android, Spring e Kotlin Multiplatform |
| Swift (`swift`) | Front-end · intermediário | Aplicativos para plataformas Apple | S | L; associação com front-end é imprecisa; criar domínio mobile e relacionar SwiftUI/Xcode |
| Dart (`dart`) | Front-end · intermediário | Linguagem do ecossistema Flutter | S | L; depende de Flutter; mover para mobile e comparar com Kotlin/Swift/React Native |
| Ruby (`ruby`) | Back-end · intermediário | Desenvolvimento web produtivo | S | L; relacionar Rails, gems, testes e automação; contextualizar mercado |
| C (`c`) | Back-end, DevOps · avançado | Sistemas, embarcados e fundamentos de memória | A/E | L; áreas atuais são insuficientes; relacionar sistemas operacionais, embarcados e redes |
| C++ (`cpp`) | Back-end · avançado | Sistemas de alta performance, engines e desktop | A/S | L; criar domínio games/sistemas; relacionar Unreal, CMake e gerenciamento de memória |
| Elixir (`elixir`) | Back-end · avançado | Sistemas concorrentes e tolerantes a falhas | A/S | L; relacionar Erlang, BEAM e Phoenix; incluir cenários em que a adoção não compensa |

### Frameworks, bibliotecas, runtimes e plataformas classificados como framework

| Tecnologia | Áreas e nível atuais | Resumo do conteúdo disponível (A) | Papel | Revisão específica, relações e candidatas |
| --- | --- | --- | --- | --- |
| React (`react`) | Front-end · intermediário | Biblioteca para interfaces componentizadas | E/C | L; o tipo “framework” conflita com a própria descrição como biblioteca; relacionar Router, estado, testes e Next.js |
| Next.js (`nextjs`) | Front-end, back-end · intermediário | Framework full-stack baseado em React | C | L; incluir renderização, roteamento, cache, servidor e limites da plataforma; comparar Remix/Nuxt |
| Node.js (`nodejs`) | Back-end · intermediário | Runtime JavaScript no servidor | E | L; está classificado incorretamente como framework; relacionar npm, HTTP, Express, Nest e event loop |
| NestJS (`nestjs`) | Back-end · intermediário | Framework opinativo para Node.js | C | L; pré-requisitos TypeScript/Node; comparar Express/Fastify e explicar injeção de dependência |
| FastAPI (`fastapi`) | Back-end, IA · intermediário | APIs Python tipadas e rápidas | C | L; relacionar Pydantic, ASGI e Uvicorn; comparar Django REST e Flask |
| PyTorch (`pytorch`) | IA · avançado | Deep learning e pesquisa aplicada | A | L; exige Python, álgebra, cálculo e ML; relacionar TensorFlow, JAX e MLOps |
| scikit-learn (`scikitlearn`) | Dados, IA · intermediário | Machine learning clássico | E/C | L; incluir pipelines, validação, métricas e preparação de dados; relacionar pandas e XGBoost |
| Vue.js (`vue`) | Front-end · intermediário | Interfaces progressivas | C | L; comparar React/Svelte/Angular; relacionar Pinia, Vue Router e Nuxt |
| Angular (`angular`) | Front-end · avançado | Framework completo para aplicações grandes | S | L; explicar RxJS, DI e estrutura; comparar React/Vue e contextualizar mercado corporativo |
| Svelte (`svelte`) | Front-end · intermediário | Interfaces compiladas e reativas | C | L; relacionar SvelteKit; descrever ecossistema e limites de adoção |
| Astro (`astro`) | Front-end · intermediário | Sites orientados a conteúdo com pouco JavaScript | C | L; comparar Next/Eleventy e explicar ilhas, SSR e integração com CMS |
| Nuxt (`nuxt`) | Front-end, back-end · intermediário | Framework full-stack do ecossistema Vue | C | L; pré-requisito Vue; comparar Next/SvelteKit e explicar Nitro/renderização |
| Remix (`remix`) | Front-end, back-end · avançado | Aplicações React centradas na plataforma web | C/A | L; relacionar React Router; comparar Next e explicar loaders/actions |
| Tailwind CSS (`tailwind`) | Front-end · intermediário | CSS utilitário e design por composição | C | L; pré-requisito CSS; tratar manutenção, design tokens e alternativas como CSS Modules |
| Bootstrap (`bootstrap`) | Front-end · iniciante | Componentes e utilitários prontos | C | L; incluir customização e acessibilidade; comparar Tailwind e bibliotecas de componentes |
| Express (`express`) | Back-end · intermediário | Framework HTTP minimalista para Node | C/E | L; incluir middleware, erros, segurança e estrutura; comparar Fastify/Hono/Nest |
| Django (`django`) | Back-end · intermediário | Framework web completo para Python | C | L; relacionar ORM, templates, admin e DRF; comparar FastAPI/Flask |
| Laravel (`laravel`) | Back-end · intermediário | Framework PHP produtivo e integrado | C/E | L; relacionar Composer, Eloquent, filas e testes; comparar Symfony |
| Ruby on Rails (`rails`) | Back-end · intermediário | Framework Ruby por convenção | C/S | L; incluir Active Record, Hotwire, testes e deploy; comparar Laravel/Django |
| Spring Boot (`springboot`) | Back-end · avançado | Serviços Java no ecossistema Spring | E/S | L; exige Java/JVM; explicar Spring Core, dados, segurança, testes e operação |
| ASP.NET Core (`dotnet`) | Back-end · avançado | Plataforma web moderna do .NET | E/S | L; “.NET” não é apenas framework web; relacionar C#, EF Core, Azure e testes |
| Flutter (`flutter`) | Front-end · intermediário | Apps multiplataforma com Dart | E/S | L; mover para mobile; relacionar Dart, widgets, estado e integração nativa |
| React Native (`reactnative`) | Front-end · intermediário | Apps móveis com React e JavaScript | E/S | L; mover para mobile; explicar bridge/nova arquitetura, Expo e limites nativos |
| Electron (`electron`) | Front-end · avançado | Desktop multiplataforma com tecnologias web | S | L; criar domínio desktop; explicar segurança, consumo de recursos e Tauri |
| Unity (`unity`) | Front-end · avançado | Engine para jogos e experiências interativas | S | L; área atual é inadequada; criar domínio games e relacionar C#, assets e publicação |
| Unreal Engine (`unreal`) | Front-end · avançado | Engine de alta fidelidade visual | S/A | L; área atual é inadequada; relacionar C++, Blueprints, pipeline 3D e plataformas |

### Ferramentas, infraestrutura, qualidade e produto

| Tecnologia | Áreas e nível atuais | Resumo do conteúdo disponível (A) | Papel | Revisão específica, relações e candidatas |
| --- | --- | --- | --- | --- |
| Playwright (`playwright`) | QA, front-end · intermediário | Automação E2E em navegadores | E/C | L; incluir fixtures, seletores, isolamento, CI e acessibilidade; comparar Cypress |
| Vitest (`vitest`) | QA, front-end · intermediário | Testes rápidos no ecossistema Vite | C | L; relacionar Vite, Testing Library e Jest; explicar unidade versus integração |
| Postman (`postman`) | QA, back-end · iniciante | Exploração e coleções de APIs | C | L; relacionar OpenAPI, Bruno/Insomnia e testes automatizados; não confundir ferramenta com estratégia |
| Docker (`docker`) | DevOps, back-end, IA · intermediário | Empacotamento e execução em contêineres | E | L; incluir imagens, camadas, volumes, redes, Compose e segurança; comparar Podman |
| Kubernetes (`kubernetes`) | DevOps, cloud · avançado | Orquestração de contêineres | A | L; exigir Linux, redes, Docker e YAML; explicar quando não usar; relacionar ECS/Nomad |
| Terraform (`terraform`) | DevOps, cloud · avançado | Infraestrutura como código declarativa | E/A | L; incluir estado, módulos, plano, segurança e colaboração; relacionar OpenTofu/Pulumi |
| GitHub Actions (`githubactions`) | DevOps, QA · intermediário | Automação de CI/CD no GitHub | C/E | L; pré-requisitos Git e CI/CD; incluir segurança de secrets, cache e ambientes |
| Grafana (`grafana`) | DevOps, dados · intermediário | Dashboards e visualização operacional | C | L; relacionar Prometheus, Loki e OpenTelemetry; diferenciar observabilidade de dashboard |
| Linux (`linux`) | DevOps, segurança, suporte · iniciante | Base de servidores e infraestrutura | E | L; incluir shell, processos, permissões, sistema de arquivos, serviços e redes |
| Wireshark (`wireshark`) | Segurança, suporte · intermediário | Inspeção visual de tráfego de rede | C/E | L; exigir TCP/IP; incluir filtros e ética; relacionar tcpdump |
| Nmap (`nmap`) | Segurança, suporte · intermediário | Descoberta e diagnóstico de redes | C | L; exigir redes e autorização; incluir modos de scan, interpretação e limites |
| Figma (`figma`) | UX, front-end · iniciante | Design colaborativo e prototipação | E | L; incluir auto layout, componentes, variáveis, acessibilidade, handoff e design systems |
| Power BI (`powerbi`) | Dados · iniciante | Modelagem, análise e dashboards | E/S | L; incluir Power Query, DAX, modelo estrela e governança; comparar Tableau/Looker Studio |
| dbt (`dbt`) | Dados · avançado | Transformação analítica versionada | C/A | L; exigir SQL/modelagem; incluir testes, documentação, lineage e warehouse |
| Git (`git`) | Todas as áreas técnicas por uso, mas apenas desenvolvimento/infraestrutura no registro · iniciante | Versionamento distribuído | E | L; ampliar relações; incluir commits, branches, merge/rebase, recuperação e colaboração |
| GitHub (`github`) | Desenvolvimento, infraestrutura · iniciante | Hospedagem e colaboração sobre Git | E/C | L; incluir issues, pull requests, Actions, segurança, perfil e portfólio |
| GitLab (`gitlab`) | Desenvolvimento, infraestrutura · intermediário | Plataforma integrada de repositório e CI/CD | S | L; comparar GitHub e Azure DevOps; separar Git da plataforma |
| Jenkins (`jenkins`) | DevOps · avançado | Automação extensível de pipelines | S/A | L; incluir agentes, Jenkinsfile, credenciais e manutenção; comparar CI gerenciado |
| Prometheus (`prometheus`) | DevOps · avançado | Métricas e alertas time series | E/A | L; incluir modelo pull, PromQL, cardinalidade e Alertmanager; relacionar Grafana |
| Apache Kafka (`kafka`) | Back-end, dados · avançado | Streaming de eventos distribuído | A | L; exigir mensageria e sistemas distribuídos; comparar Pulsar/NATS/RabbitMQ |
| RabbitMQ (`rabbitmq`) | Back-end · avançado | Mensageria com filas e roteamento | C/A | L; explicar acknowledgements, exchanges e idempotência; comparar Kafka/NATS |
| NGINX (`nginx`) | DevOps, back-end · intermediário | Servidor web e proxy reverso | E/C | L; incluir TLS, proxy, cache e balanceamento; comparar Caddy/Traefik |
| Ansible (`ansible`) | DevOps · avançado | Automação de configuração e operações | C/A | L; incluir inventário, idempotência, roles e secrets; comparar Puppet/Salt |
| Jira (`jira`) | Todas por prática, mas gestão no registro · iniciante | Acompanhamento de trabalho e fluxo | C/S | L; categoria gestão tem apenas este item; explicar práticas sem transformar a ferramenta em método |
| Visual Studio Code (`vscode`) | Desenvolvimento · iniciante | Editor extensível | C | L; alternativas incluem “VS Code”, que é o mesmo produto; relacionar terminal, Git e depuração |
| IntelliJ IDEA (`intellij`) | Desenvolvimento · intermediário | IDE para JVM e backend | C/S | L; incluir edições, depuração e build tools; relacionar Java/Kotlin/Spring |
| SonarQube (`sonarqube`) | QA, DevOps · avançado | Análise estática e quality gates | C/A | L; incluir falso positivo, cobertura e CI; relacionar CodeQL/Semgrep |
| Sentry (`sentry`) | Desenvolvimento, DevOps · intermediário | Monitoramento de erros em aplicações | C | L; incluir source maps, releases e privacidade; comparar Rollbar e observabilidade ampla |

### Bancos, mecanismos de busca e armazenamento

| Tecnologia | Áreas e nível atuais | Resumo do conteúdo disponível (A) | Papel | Revisão específica, relações e candidatas |
| --- | --- | --- | --- | --- |
| PostgreSQL (`postgresql`) | Back-end, dados · intermediário | Banco relacional robusto e extensível | E | L; incluir modelagem, índices, transações, JSONB, operação e backup |
| MySQL (`mysql`) | Back-end, dados · iniciante | Banco relacional amplamente adotado | E | L; comparar PostgreSQL/MariaDB; incluir índices, transações e replicação |
| MongoDB (`mongodb`) | Back-end, dados · intermediário | Documentos flexíveis em JSON/BSON | C | L; ensinar modelagem por acesso e consistência; explicar quando SQL é melhor |
| Redis (`redis`) | Back-end, DevOps · intermediário | Estruturas em memória, cache e coordenação | C/A | L; incluir expiração, persistência, eviction e uso como cache versus banco |
| Qdrant (`qdrant`) | IA, back-end · avançado | Busca vetorial e recuperação semântica | S/A | L; exige embeddings/RAG; comparar pgvector, Weaviate e bancos híbridos |
| SQLite (`sqlite`) | Back-end, front-end · iniciante | Banco relacional embutido | E/C | L; incluir concorrência, migrações, persistência local e casos móveis/desktop |
| Apache Cassandra (`cassandra`) | Back-end, dados · avançado | Banco distribuído orientado a alto volume | S/A | L; explicar modelagem por consulta e consistência; comparar ScyllaDB/DynamoDB |
| Elasticsearch (`elasticsearch`) | Back-end, dados · avançado | Busca textual e analytics distribuído | S/A | L; incluir mappings, relevância, shards e operação; comparar OpenSearch |
| MariaDB (`mariadb`) | Back-end, dados · intermediário | Banco relacional compatível com MySQL | S/C | L; esclarecer diferenças reais de MySQL e critérios de escolha |
| SQL Server (`sqlserver`) | Back-end, dados · intermediário | Banco relacional do ecossistema Microsoft | S/E | L; relacionar Azure e Power BI; incluir T-SQL, operação e licenciamento |
| Oracle Database (`oracle`) | Back-end, dados · avançado | Banco corporativo de alta criticidade | S/A | L; incluir PL/SQL, administração e custo; contextualizar mercado corporativo |
| Neo4j (`neo4j`) | Back-end, dados · avançado | Banco de grafos e relações conectadas | S/A | L; incluir Cypher e modelagem; comparar PostgreSQL e Amazon Neptune |
| Amazon DynamoDB (`dynamodb`) | Back-end, cloud · avançado | NoSQL gerenciado da AWS | S/A | L; explicar chaves, padrões de acesso, índices e custo; relacionar AWS serverless |

### Plataformas e serviços classificados como cloud

| Tecnologia | Áreas e nível atuais | Resumo do conteúdo disponível (A) | Papel | Revisão específica, relações e candidatas |
| --- | --- | --- | --- | --- |
| AWS (`aws`) | Cloud, DevOps · intermediário | Provedor amplo de nuvem pública | E/S | L; decompor fundamentos antes de serviços; incluir IAM, redes, custos e arquitetura |
| Microsoft Azure (`azure`) | Cloud, DevOps · intermediário | Nuvem integrada ao ecossistema Microsoft | E/S | L; incluir Entra ID, redes, custos e serviços-base; relacionar .NET e Microsoft 365 |
| Google Cloud (`gcp`) | Cloud, dados, IA · intermediário | Nuvem forte em dados e ML | E/S | L; incluir IAM, redes, custos e serviços-base; evitar descrição apenas por reputação |
| Cloudflare (`cloudflare`) | Cloud, segurança, front-end · intermediário | Edge, CDN, DNS e proteção | C | L; separar DNS/CDN/WAF/Workers; comparar Fastly e provedores de cloud |
| Firebase (`firebase`) | Front-end, back-end · intermediário | Backend gerenciado para apps | C/S | L; explicar lock-in, regras de segurança, custos, uso móvel e alternativas |
| Vercel (`vercel`) | Front-end, cloud · iniciante | Deploy e infraestrutura para aplicações web | C/S | L; comparar Netlify/Cloudflare Pages; explicar limites, observabilidade e custos |
| Supabase (`supabase`) | Back-end, front-end · intermediário | Plataforma sobre PostgreSQL com serviços prontos | C/S | L; explicar RLS, Auth, storage e dependência; comparar Firebase/Appwrite |
| DigitalOcean (`digitalocean`) | Cloud, DevOps · iniciante | Infraestrutura cloud simplificada | C/S | L; incluir droplets, redes, backups e operação; comparar provedores e Hetzner/Linode |
| Netlify (`netlify`) | Front-end, cloud · iniciante | Deploy e fluxo para sites web | C/S | L; comparar Vercel/Cloudflare Pages; explicar funções, builds e limites |
| Datadog (`datadog`) | DevOps, cloud · avançado | Observabilidade SaaS integrada | S/A | L; foi classificado como cloud, mas é plataforma de observabilidade; incluir custo, agentes e privacidade |

### Síntese da auditoria tecnológica

- A taxonomia mistura linguagens, runtimes, bibliotecas, frameworks, engines, IDEs, plataformas SaaS e conceitos de infraestrutura em apenas cinco tipos. Node.js e Datadog são os exemplos mais evidentes de classificação imprecisa; React aparece como framework apesar de ser descrito como biblioteca.
- Os níveis não têm critérios publicados. “Iniciante”, “intermediário” e “avançado” parecem avaliar dificuldade isolada, não a ordem de estudo dentro de cada área.
- Mobile, desktop e games aparecem na descrição de várias tecnologias, mas não existem como áreas ou trilhas próprias; esses itens acabam relacionados a front-end ou back-end.
- As alternativas são nomes livres, não IDs. Foram encontradas 76 referências sem registro no catálogo, incluindo produtos úteis, sinônimos, conceitos e recursos internos. Isso inviabiliza navegação consistente e dificulta validar relações.
- A cobertura de segurança, design e gestão é muito menor que a de desenvolvimento e infraestrutura. Arquitetura, fundamentos e práticas não têm entidade própria.

### Categoria registrada de cada tecnologia

Esta é a categoria editorial efetivamente armazenada em cada um dos 95 registros; ela complementa o tipo informado nas tabelas anteriores.

- **Desenvolvimento (47):** HTML, CSS, JavaScript, TypeScript, Java, React, Next.js, Node.js, NestJS, FastAPI, Playwright, Vitest, Postman, C#, Go, PHP, Rust, Kotlin, Swift, Dart, Ruby, C, C++, Elixir, Vue.js, Angular, Svelte, Astro, Nuxt, Remix, Tailwind CSS, Bootstrap, Express, Django, Laravel, Ruby on Rails, Git, GitHub, Spring Boot, ASP.NET Core, Flutter, React Native, Electron, Unity, Unreal Engine, Visual Studio Code e IntelliJ IDEA.
- **Dados (20):** Python, SQL, PyTorch, scikit-learn, PostgreSQL, MySQL, MongoDB, Redis, Qdrant, Power BI, dbt, SQLite, Apache Cassandra, Elasticsearch, Apache Kafka, MariaDB, SQL Server, Oracle Database, Neo4j e Amazon DynamoDB.
- **Infraestrutura (23):** Docker, Kubernetes, Terraform, GitHub Actions, Grafana, AWS, Microsoft Azure, Google Cloud, Cloudflare, Linux, Firebase, GitLab, Jenkins, Prometheus, Vercel, Supabase, RabbitMQ, NGINX, Ansible, DigitalOcean, Netlify, Sentry e Datadog.
- **Segurança (3):** Wireshark, Nmap e SonarQube.
- **Design (1):** Figma.
- **Gestão (1):** Jira.

## 4. Classificação por domínio

Uma tecnologia pode aparecer em mais de um domínio. A classificação abaixo é editorial e não substitui a taxonomia técnica recomendada na seção 15.

| Domínio | Tecnologias atuais relacionadas | Leitura da cobertura |
| --- | --- | --- |
| **Fundamentos web** | HTML, CSS, JavaScript, TypeScript, HTTP apenas de forma implícita, Git, GitHub, VS Code | Boa base de ferramentas; faltam HTTP/HTTPS, DOM, browser, acessibilidade, DNS, terminal e protocolos como conteúdos próprios |
| **Front-end** | HTML, CSS, JavaScript, TypeScript, React, Next.js, Vue, Angular, Svelte, Astro, Nuxt, Remix, Tailwind, Bootstrap, Vitest, Playwright, Vercel, Netlify | Ampla em frameworks; superficial em arquitetura, estado, formulários, design systems, desempenho e acessibilidade |
| **Back-end** | JavaScript, TypeScript, Python, Java, C#, Go, PHP, Rust, Kotlin, Ruby, C, C++, Elixir, Node, Nest, FastAPI, Express, Django, Laravel, Rails, Spring Boot, ASP.NET Core, NGINX, RabbitMQ, Kafka | Ampla em stacks; faltam fundamentos explícitos de APIs, segurança, autenticação, modelagem, filas, cache e sistemas distribuídos |
| **Full-stack** | Next.js, Nuxt, Remix, Django, Laravel, Rails, Firebase, Supabase | Existe por combinação, mas não há área ou trilha que explique o papel e os trade-offs |
| **Mobile** | Kotlin, Swift, Dart, Flutter, React Native, Firebase, SQLite | Catálogo razoável, mas não há área, roadmap ou projetos próprios; algumas relações apontam para um ID inexistente |
| **Desktop e games** | C#, C++, Rust, Electron, Unity, Unreal Engine | Itens isolados e associados a front-end/back-end; falta domínio, contexto e progressão |
| **Bancos e armazenamento** | SQL, PostgreSQL, MySQL, MongoDB, Redis, Qdrant, SQLite, Cassandra, Elasticsearch, MariaDB, SQL Server, Oracle, Neo4j, DynamoDB | Boa amplitude; falta um caminho de modelagem, administração, operação, segurança e escolha por caso |
| **DevOps** | Docker, Kubernetes, Terraform, GitHub Actions, GitLab, Jenkins, Ansible, Grafana, Prometheus, Sentry, Datadog | Cobertura forte de ferramentas; CI/CD, incidentes, SRE e observabilidade precisam de mais peso |
| **Infraestrutura** | Linux, NGINX, Docker, Ansible, Wireshark, Nmap, cloud e ferramentas de observabilidade | Faltam redes, shell, sistemas operacionais, virtualização, identidade, storage, backup e recuperação |
| **Cloud** | AWS, Azure, GCP, Cloudflare, DigitalOcean, Vercel, Netlify, Firebase, Supabase, DynamoDB | Provedores bem representados; serviços e princípios arquiteturais ainda não estão organizados |
| **Segurança** | Linux, Wireshark, Nmap, Cloudflare, SonarQube; Wazuh e OWASP apenas como referências quebradas | Cobertura crítica e insuficiente; não representa AppSec, IAM, resposta a incidentes, GRC ou segurança ofensiva/defensiva |
| **Dados e BI** | SQL, Python, PostgreSQL, Power BI, dbt, scikit-learn, Kafka, Elasticsearch e bancos | Bom início para analytics; faltam planilhas, estatística, pandas, NumPy, warehouses, orquestração e governança |
| **IA e ML** | Python, PyTorch, scikit-learn, Qdrant, FastAPI, Docker, GCP | Ênfase em implementação; faltam matemática, ciclo de dados, avaliação, MLOps, ética e especializações |
| **Automação** | Python, GitHub Actions, Jenkins, Terraform, Ansible | Presente por ferramentas; falta explicar automação como competência transversal |
| **Testes e qualidade** | Playwright, Vitest, Postman, SonarQube, Sentry, GitHub Actions, Jira | Ferramentas úteis; estratégia de qualidade e tipos de teste não têm conteúdo próprio |
| **UX/UI** | Figma, HTML, CSS e frameworks front-end; Maze e Hotjar são referências quebradas | Muito concentrado em uma ferramenta; pesquisa, conteúdo, acessibilidade e design systems estão ausentes |
| **Produto e gestão** | Jira e Figma | Insuficiente para representar product management, discovery, métricas, priorização e colaboração |
| **Ferramentas de desenvolvimento** | Git, GitHub, GitLab, VS Code, IntelliJ IDEA, Postman | Boa introdução operacional; faltam terminal, package managers, build tools, linters e depuradores |
| **Arquitetura** | Aparece indiretamente em descrições e roadmaps | Grande lacuna: não há conteúdos próprios sobre modularidade, padrões, integração, sistemas distribuídos e decisões técnicas |
| **Boas práticas** | Git, testes, SonarQube, CI e observabilidade oferecem partes do tema | Faltam conteúdos próprios sobre legibilidade, revisão, documentação, segurança, acessibilidade e manutenção |
| **Outros** | Flutter, React Native, Electron, Unity, Unreal Engine, C e C++ | Mobile, desktop, games e sistemas aparecem sem domínio editorial correspondente |

## 5. Lacunas reais do conteúdo atual

### Fundamentos

O maior vazio do DevAtlas não é uma tecnologia específica, mas a camada que explica como a computação e a web funcionam. Faltam conteúdos navegáveis sobre:

- lógica de programação, algoritmos, estruturas de dados e complexidade;
- terminal, shell, variáveis de ambiente, processos, arquivos e permissões;
- HTTP/HTTPS, DNS, TCP/IP, portas, cliente-servidor e ciclo de uma requisição;
- browser, DOM, acessibilidade, responsividade e desempenho web;
- APIs, REST, JSON, status HTTP, autenticação e autorização;
- modelagem de dados, normalização, índices, transações e consistência;
- testes, depuração, logs, documentação e controle de versão como práticas;
- segurança básica, privacidade, LGPD, gestão de segredos e atualização de dependências;
- leitura técnica em inglês, resolução de problemas e comunicação profissional.

Sem essa camada, o iniciante encontra nomes de ferramentas antes de compreender os problemas que elas resolvem.

### Áreas sub-representadas ou ausentes

- Desenvolvimento mobile;
- redes e telecomunicações;
- administração de bancos de dados;
- engenharia de dados separada de BI;
- ciência de dados separada de IA generativa;
- engenharia de software e arquitetura;
- desenvolvimento desktop e de jogos;
- produto e gestão de produto;
- redes, sistemas e administração de ambientes;
- governança, risco e conformidade em segurança;
- documentação técnica e Developer Experience;
- IoT, embarcados, blockchain e realidade estendida — de prioridade menor, mas hoje sem contexto.

### Relações e integridade

1. Oito tecnologias usadas diretamente por áreas não existem no catálogo: Wazuh, OWASP, Maze, Hotjar, Windows, Active Directory, Zabbix e GLPI.
2. A página de área complementa tecnologias com um mapa `ecosystemAdditions` mantido no componente. Assim, parte da relação está no conteúdo e parte está na interface.
3. As alternativas são textos livres. Existem 76 nomes sem entidade correspondente:

   `.NET MAUI`, Amazon Neptune, Appwrite, ArangoDB, Azure DevOps, Bitbucket, Bruno, Bulma, Bun, CSS Modules, Caddy, Cloudflare Pages, CodeQL, Cypress, Dataform, Deno, Django REST Framework, ECS, Eclipse, Eleventy, Erlang, Fastify, Fastly, Flask, GitLab CI, Godot, Grafana Cloud, Hetzner, Hono, Insomnia, Ionic, Jest, Kibana, Kotlin Multiplatform, Linear, Linode, Looker Studio, Meilisearch, Memcached, Mercurial, Micronaut, NATS, New Relic, Nomad, OpenSearch, OpenTofu, Penpot, Phoenix, Podman, PostgreSQL JSONB, Pulsar, Pulumi, Puppet, Quarkus, React Router, Rollbar, Salt, ScyllaDB, Semgrep, Sublime Text, SvelteKit, Symfony, Tableau, Tauri, TensorFlow, Traefik, Turso, UnoCSS, VS Code, VictoriaMetrics, Weaviate, XGBoost, YouTrack, Zed, pgvector e tcpdump.

4. A lista acima não deve ser importada automaticamente. Ela mistura produtos relevantes, sinônimos (`VS Code` e Visual Studio Code), recursos de um produto (`PostgreSQL JSONB`), frameworks, serviços e alternativas muito específicas.
5. As coleções `languages`, `frameworks`, `tools`, `databases` e `cloudServices` repetem parte do catálogo principal em um formato mais simples. É possível editar uma fonte e esquecer a outra.

### Profundidade editorial

- Não há páginas de conceito ou fundamentos.
- As páginas tecnológicas não indicam fontes, data de revisão ou versão considerada.
- “Quando usar” e “quando evitar” variam por tipo, não pela tecnologia concreta.
- Não há critérios verificáveis de conclusão, exercícios, repertório, exemplos ou avaliação.
- Mercado, cargos e certificações não se conectam diretamente às tecnologias.
- Comparações são escassas: duas para todo o produto.
- As relações não distinguem pré-requisito, alternativa, complemento, sucessor ou ferramenta normalmente combinada.

### Lacunas por domínio

| Domínio | Lacunas principais |
| --- | --- |
| Fundamentos web | HTTP/HTTPS, DOM, browser, acessibilidade, desempenho, DNS e protocolos |
| Front-end | estado, formulários, consumo de dados, design systems, arquitetura e testes por camada |
| Back-end | contratos de API, autenticação, autorização, modelagem, segurança, filas, cache e observabilidade |
| Mobile | área, ferramentas nativas, publicação, integração nativa, testes e projetos |
| Bancos de dados | modelagem, administração, migrações, backup, segurança, tuning e critérios de escolha |
| DevOps/infraestrutura | redes, shell, sistemas, virtualização, incidentes, SRE, observabilidade e gestão de configuração |
| Cloud | IAM, redes, custos, resiliência, storage, compute, serverless e arquitetura transferível entre provedores |
| Segurança | AppSec, identidade, blue/red team, resposta a incidentes, GRC, privacidade e práticas de laboratório |
| Dados | estatística, planilhas, pandas/NumPy, visualização, warehouses, qualidade, governança e orquestração |
| IA | matemática, ciclo de dados, avaliação, experimentação, ética, MLOps, NLP e visão |
| Testes | estratégia, testes manuais, unidade, integração, contrato, performance, acessibilidade e dados de teste |
| UX/UI e produto | pesquisa, conteúdo, arquitetura da informação, design systems, métricas, discovery e priorização |
| Mercado e carreira | senioridade, tipos de empresa, entrevistas, expectativas por cargo, evidências de portfólio e fontes |
| Portfólio | critérios de aceitação, README, demonstração, arquitetura, testes, deploy, retrospectiva e rubrica |

## 6. Tecnologias e conteúdos candidatos para fases futuras

Esta seção é uma fila editorial, não uma solicitação de implementação imediata. Cada entrada deve passar por validação de utilidade, manutenção e aderência às áreas antes de virar conteúdo.

### Prioridade alta — corrigir a promessa atual

| Grupo | Candidatos | Justificativa |
| --- | --- | --- |
| Referências já usadas | Windows, Active Directory/Entra ID, Zabbix, GLPI, Wazuh, OWASP Top 10, Maze, Hotjar | Eliminam referências quebradas e tornam suporte, segurança e UX coerentes com o que já prometem |
| Fundamentos web e rede | HTTP/HTTPS, DNS, TCP/IP, REST, JSON, browser/DOM, terminal e shell | São pré-requisitos de várias áreas e evitam estudo orientado apenas por ferramentas |
| Fundamentos de programação | lógica, algoritmos, estruturas de dados, orientação a objetos, depuração, tratamento de erros | Permitem organizar linguagens e frameworks em uma sequência compreensível |
| Colaboração e entrega | Git workflow, pull request, revisão de código, CI/CD, ambientes, documentação, semver | Afetam quase todas as áreas e projetos |
| Segurança básica | autenticação, autorização, OAuth/OIDC, hashing, gestão de segredos, LGPD, vulnerabilidades web | Corrigem uma lacuna transversal de alto risco |
| Ecossistema JavaScript | npm, pnpm, Vite, ESLint e Prettier ou Biome | São parte da rotina real das stacks front-end e Node, hoje invisível |
| Testes web | Testing Library, Jest e Cypress | Completam o recorte atual de Vitest e Playwright e permitem comparação por nível de teste |
| Contratos de API | OpenAPI/Swagger | Conecta back-end, QA, documentação e colaboração |
| Novas áreas prioritárias | Mobile, Redes, Engenharia de Dados, Engenharia de Software/Arquitetura | Organizam tecnologias já existentes que hoje estão encaixadas de forma artificial |

### Prioridade média — preencher fluxos profissionais

| Grupo | Candidatos | Condição para entrada |
| --- | --- | --- |
| Estado e dados no front-end | Redux Toolkit, Zustand, TanStack Query, React Hook Form, Zod | Entrar como respostas a problemas, não como checklist obrigatório |
| UI e design systems | Storybook, Sass, CSS Modules, tokens e bibliotecas acessíveis | Vincular a CSS, Figma, acessibilidade e manutenção |
| ORMs e acesso a dados | Prisma, Drizzle, TypeORM, SQLAlchemy, Hibernate, EF Core, Eloquent | Comparar com SQL direto e explicar custo de abstração |
| Mensageria e jobs | NATS, SQS, BullMQ, Celery | Só após fila, idempotência, retry e eventos serem fundamentos |
| Observabilidade | OpenTelemetry, Loki, traces, logs e SLI/SLO | Organizar ferramentas atuais em uma prática completa |
| Dados | pandas, NumPy, Apache Spark, Airflow, warehouses e qualidade de dados | Diferenciar análise, engenharia e ciência de dados |
| Identidade | Keycloak, Auth0/serviços equivalentes, RBAC | Tratar como ecossistema de identidade, com segurança e lock-in |
| Cloud e IaC | OpenTofu, Pulumi, serviços-base de AWS/Azure/GCP | Evitar uma enciclopédia de serviços; priorizar princípios transferíveis |
| Mobile | Android Studio, Xcode, SwiftUI, Jetpack Compose, Expo | Depende da criação da área e de projetos próprios |
| Produto | discovery, métricas, priorização, analytics de produto | Conteúdo conceitual deve preceder ferramentas específicas |

### Prioridade baixa ou específica

- Qwik, Solid, Preact, UnoCSS e frameworks de front-end com adoção mais restrita;
- CouchDB, InfluxDB, Milvus e bancos especializados sem demanda clara nas trilhas;
- Tauri, Godot, Phoenix e ecossistemas de nicho;
- VR/AR, blockchain, robótica, IoT e embarcados como áreas introdutórias;
- IDEs e editores adicionais, salvo quando forem parte essencial de uma trilha;
- alternativas quase equivalentes que aumentem manutenção sem melhorar decisões.

### Conteúdo avançado

- sistemas distribuídos, consenso, consistência, particionamento e tolerância a falhas;
- arquitetura orientada a eventos, CQRS, sagas e trade-offs de microsserviços;
- SRE com SLI, SLO, error budgets, capacidade e resposta a incidentes;
- platform engineering, Developer Experience e portais internos;
- MLOps, avaliação de modelos, feature stores, monitoramento e avaliação de RAG;
- segurança com threat modeling, zero trust, supply chain, AppSec e resposta a incidentes;
- FinOps, governança cloud, resiliência e recuperação de desastre;
- performance, profiling e engenharia de confiabilidade por stack.

## 7. Avaliação das páginas de tecnologia

### Estado atual

A rota de tecnologia é clara e curta. Ela apresenta breadcrumb, nome, tipo, nível, descrição, situações de uso, situações para evitar, alternativas e áreas relacionadas. A base é legível e adequada a uma ficha rápida, mas não sustenta a promessa de guia de estudo completo.

| Elemento esperado | Estado | Avaliação |
| --- | --- | --- |
| Nome, tipo e nível | Presente | Tipo e nível são valores internos exibidos sem localização adequada |
| Descrição objetiva | Presente | Clara, geralmente em uma frase |
| Quando usar | Presente | Genérico por tipo; precisa ser específico por tecnologia |
| Quando evitar | Presente | Mesmo limite do campo anterior |
| Alternativas | Presente | Texto sem link ou relação validável |
| Áreas relacionadas | Presente | Navegável, mas parte do ecossistema de área é mantida fora dos dados |
| Pré-requisitos | Ausente | Necessário para ordenar estudo |
| Conceitos fundamentais | Ausente | Essencial para não reduzir o conteúdo a definição |
| Pontos fortes | Ausente como seção | Alguns aparecem na descrição, sem consistência |
| Limitações | Ausente como seção | “Quando evitar” não cobre limitações técnicas e operacionais |
| Combinações recomendadas | Ausente | Deveria distinguir integração comum de pré-requisito |
| Comparações | Ausente na página | Existem apenas duas comparações globais |
| Exemplos reais | Ausente | Falta contexto de produto, equipe e escala |
| Ideias de projeto | Ausente | Projetos existentes não são relacionados por tecnologia na página |
| Ordem de estudo | Ausente | O nível isolado não orienta sequência |
| Erros comuns | Ausente | Importante para aprendizagem prática |
| Boas práticas | Ausente | Importante para uso profissional |
| Empregos relacionados | Ausente | Só aparece indiretamente nas áreas |
| Próximos passos | Ausente | Não há continuidade após a leitura |
| Documentação oficial e fontes | Ausente | O contrato aceita URL oficial, mas nenhum registro a fornece |
| Data de revisão/versão | Ausente | Conteúdo técnico envelhece sem sinalização |

### O que torna as fichas genéricas

O principal fator não é o tamanho do texto, mas o uso de um gerador comum de orientação. Uma linguagem, um banco e uma ferramenta recebem frases-modelo segundo o tipo. Isso produz consistência visual, porém não responde a perguntas reais como “por que PostgreSQL em vez de MongoDB?”, “quando Kubernetes é excesso?” ou “o que preciso dominar antes de PyTorch?”.

### Recomendação

Adotar profundidade progressiva:

1. uma síntese curta para decisão rápida;
2. fundamentos e pré-requisitos;
3. uso profissional, exemplos e trade-offs;
4. aprendizagem e prática;
5. relações navegáveis e fontes.

Nem toda tecnologia precisa do mesmo volume. HTML, Git e SQL justificam páginas fundamentais extensas; um editor ou serviço específico pode ter ficha menor, desde que a diferença seja intencional.

## 8. Modelo ideal de página de tecnologia

### Cabeçalho

- nome oficial, pronúncia quando relevante e identidade visual licenciada;
- classificação técnica precisa: linguagem, runtime, biblioteca, framework, banco, protocolo, ferramenta, plataforma ou conceito;
- resumo editorial em até duas frases;
- nível de entrada, maturidade do conteúdo e última revisão;
- links para site e documentação oficiais.

### Visão rápida

- problema que resolve;
- onde aparece na rotina;
- pré-requisitos;
- áreas e cargos relacionados;
- “aprenda agora”, “aprenda depois” ou “opcional”, com justificativa.

### Fundamentos

- conceitos essenciais;
- modelo mental;
- vocabulário mínimo;
- pequeno exemplo técnico acessível e correto;
- limites do escopo: o que a tecnologia não é.

### Decisão e uso profissional

- pontos fortes;
- limitações e custos;
- quando usar e quando evitar, com situações concretas;
- combinações usuais;
- alternativas comparadas por critérios;
- exemplos reais por tipo de produto e equipe.

### Aprendizagem

- ordem recomendada;
- objetivos verificáveis por etapa;
- erros comuns;
- boas práticas;
- exercícios e projetos em níveis;
- critérios para considerar a base dominada;
- próximos passos.

### Carreira e ecossistema

- cargos em que aparece;
- exigência típica: central, desejável ou contextual;
- ferramentas relacionadas por tipo de relação;
- roadmap e projetos vinculados;
- certificações apenas quando realmente valorizadas;
- fontes oficiais, referências neutras e data de revisão.

### Requisitos de qualidade

- conteúdo principal disponível sem interação obrigatória;
- sumário e âncoras semânticas;
- tabelas responsivas e comparações compreensíveis por leitor de tela;
- exemplos de código pequenos, copiáveis e com linguagem indicada;
- termos técnicos localizados sem traduzir nomes próprios;
- metadados, dados estruturados e URLs canônicas por idioma;
- nenhum indicador dependente apenas de cor.

## 9. Auditoria dos roadmaps

| Roadmap | Área, nível e duração | Estrutura atual | Pontos fortes | Lacunas |
| --- | --- | --- | --- | --- |
| **Começar do zero** | Suporte · iniciante · 10–14 semanas | 4 etapas; 2 projetos | Porta de entrada concreta e menos dependente de programação | O vínculo exclusivo com suporte pode confundir “começar em tecnologia” com uma única carreira; faltam diagnóstico inicial, ramificações e critérios por ritmo |
| **Front-end** | Front-end · iniciante · 5–7 meses | 4 etapas; 2 projetos | Sequência geral compreensível e portfólio associado | Precisa detalhar web, acessibilidade, Git, consumo de API, testes e deploy; duração sem carga horária |
| **Back-end** | Back-end · intermediário · 6–8 meses | 4 etapas; 1 projeto | Relaciona API, dados e entrega | Começar em nível intermediário deixa uma lacuna; faltam HTTP, segurança, testes, observabilidade e escolha de uma linguagem |
| **Dados** | Dados · iniciante · 4–6 meses | 4 etapas; 2 projetos | Conecta análise, transformação e comunicação | Faltam planilhas, estatística, modelagem, qualidade, visualização e distinção de cargos |
| **DevOps** | DevOps · intermediário · 6–9 meses | 4 etapas; 2 projetos | Evita tratar ferramentas totalmente isoladas | Precisa de Linux, shell, redes e Git como pré-requisitos explícitos; Kubernetes deve vir após base operacional |

### Qualidade da estrutura

Cada roadmap tem título, descrição, duração, nível, área, quatro etapas e projetos relacionados. Cada etapa tem título, uma descrição e um checkpoint. É uma base boa, porém as descrições seguem um molde (“estude X...”) e os checkpoints são curtos demais para comprovar domínio.

### Ausências

- Roadmaps próprios para IA, cloud, segurança, QA, UX e suporte/infraestrutura;
- carga horária semanal e fatores que alteram a duração;
- pré-requisitos e teste de entrada;
- exercícios por etapa;
- ramificações opcionais;
- recursos e documentação;
- projetos intermediários, não apenas finais;
- critérios mensuráveis de avanço;
- revisão por versão e data;
- caminhos alternativos para quem já tem experiência;
- relação explícita entre roadmap, tecnologia, conceito, projeto e cargo.

### Recomendação editorial

Roadmaps futuros devem ser mapas de competência, não listas de produtos. A ordem ideal é: fundamentos → prática guiada → ferramenta contextual → projeto → critério de domínio. A duração deve ser apresentada como estimativa baseada em uma carga semanal declarada.

## 10. Auditoria dos projetos

| Projeto | Área e nível | Stack e duração | Força de portfólio | Avaliação |
| --- | --- | --- | --- | --- |
| **Painel financeiro pessoal** | Front-end · iniciante | React, TypeScript, Chart.js · 1–2 semanas | Média | Bom para estado e visualização; precisa de acessibilidade, persistência, dados e critérios de acabamento |
| **API de chamados** | Back-end · intermediário | Node.js, PostgreSQL, Redis · 3–5 semanas | Forte | Contexto profissional crível; faltam contrato OpenAPI, autenticação, testes, observabilidade e deploy |
| **Plataforma de estudos** | Front-end · avançado | Next.js, PostgreSQL, Auth.js · 3–5 semanas | Forte, mas escopo alto | Pode virar clone genérico sem recorte; duração parece curta para autenticação, banco e acabamento |
| **Pipeline de vendas** | Dados · intermediário | Python, dbt, PostgreSQL · 3–4 semanas | Forte | Boa demonstração de transformação; precisa de fonte de dados, qualidade, lineage e camada de análise |
| **Assistente RAG** | IA · avançado | Python, FastAPI, Qdrant · 4–6 semanas | Forte se avaliado | Tema atual e relevante; precisa de conjunto de avaliação, citações, segurança, custo e limites claros |
| **Entrega observável** | DevOps · intermediário | Docker, GitHub Actions, Grafana · 3–5 semanas | Forte | Integra entrega e operação; Prometheus/OpenTelemetry, rollback e incidentes precisam de critérios |
| **Infraestrutura reproduzível** | Cloud · avançado | Terraform, AWS, GitHub Actions · 4–6 semanas | Forte, com risco de custo | Deve incluir orçamento, destruição segura, IAM mínimo, estado remoto e diagrama |
| **Laboratório defensivo** | Segurança · intermediário | Linux, Wazuh, Grafana · 3–5 semanas | Forte | Wazuh não existe no catálogo; requer limites éticos, dados de teste, detecções e resposta |
| **Suíte E2E de e-commerce** | QA · intermediário | Playwright, TypeScript, GitHub Actions · 2–4 semanas | Média a forte | Precisa de estratégia, matriz de risco, evidências, flakiness e fronteira entre E2E e outros testes |
| **Case de serviço público** | UX · iniciante | Figma, Maze · 2–3 semanas | Média | Maze não existe no catálogo; precisa de plano de pesquisa, participantes, síntese, acessibilidade e decisões |
| **Base de conhecimento operacional** | Suporte · iniciante | GLPI, Markdown, Linux · 1–2 semanas | Média | GLPI não existe no catálogo; bom sinal de comunicação, mas precisa de cenários, SLA e avaliação de utilidade |

### Estrutura atual

Todos os projetos têm título, área, nível, stack, descrição, duração, três funcionalidades e um “sinal para recrutador”. A distribuição entre áreas é boa e os temas são mais realistas que clones comuns de redes sociais ou lojas.

### Lacunas do modelo de projeto

- objetivo, usuário e problema separados da solução;
- pré-requisitos e conhecimentos praticados;
- escopo obrigatório, opcional e fora de escopo;
- arquitetura ou fluxo esperado;
- milestones e ordem de execução;
- critérios de aceitação;
- dados, APIs ou fixtures disponíveis;
- requisitos de testes, segurança, acessibilidade e desempenho;
- estrutura sugerida de repositório;
- roteiro de README e demonstração;
- deploy, custo e limpeza de recursos;
- rubrica de avaliação;
- perguntas para retrospectiva;
- extensões graduais sem inflar o MVP.

As funcionalidades em todos os onze projetos são textos em português repetidos também nos campos de inglês e espanhol. Isso representa 33 trechos não traduzidos.

### Projetos candidatos para fases futuras

| Área | Projeto candidato | Competência demonstrada |
| --- | --- | --- |
| Fundamentos web | Site acessível consumindo uma API pública | HTML semântico, CSS, JavaScript, HTTP, estados de erro e acessibilidade |
| Back-end | Serviço de reservas com concorrência controlada | modelagem, transações, idempotência, testes e contrato de API |
| Mobile | Aplicativo offline-first com sincronização | persistência local, rede instável, estado, integração nativa e publicação |
| Dados | Análise pública reproduzível com dashboard | limpeza, estatística, modelagem, comunicação e documentação |
| Engenharia de dados | Pipeline incremental com qualidade e lineage | ingestão, transformação, orquestração, testes e observabilidade |
| IA | Classificador com baseline, métricas e análise de erro | preparação de dados, avaliação, experimento e limites do modelo |
| Cloud | Aplicação pequena com custo, segurança e recuperação documentados | IAM, rede, IaC, orçamento, backup e operação |
| Segurança | Threat model e correção de uma aplicação deliberadamente vulnerável | análise de risco, AppSec, evidência e comunicação responsável |
| QA | Plano de qualidade multicanal para um produto pequeno | risco, testes manuais e automatizados, contrato, acessibilidade e relatório |
| UX/Produto | Redesenho baseado em pesquisa com métrica de sucesso | descoberta, síntese, protótipo, teste e decisão |
| Suporte/Redes | Ambiente de empresa simulada com identidade, inventário e runbooks | atendimento, acesso, rede, automação, documentação e recuperação |

Esses projetos só devem entrar após as áreas e os conceitos correspondentes existirem; caso contrário, ampliam a lista sem melhorar a orientação.

## 11. Auditoria do glossário

### Estado atual

Há dez termos: API, Deploy, Container, Cache, CI/CD, Observabilidade, ORM, JWT, DNS e RAG. Cada verbete oferece explicação simples, explicação técnica, exemplo e áreas relacionadas. O formato é adequado, acessível e mais útil que uma definição única.

### Qualidade

- **Clareza:** boa para uma primeira leitura.
- **Consistência:** boa, com três níveis de contexto em todos os verbetes.
- **Cobertura:** muito baixa para um guia com 95 tecnologias e dez áreas.
- **Relações:** úteis, mas ainda não conectam o termo às páginas tecnológicas.
- **Profundidade:** introdutória; suficiente para glossário, desde que existam links para aprofundamento.

### Termos prioritários ausentes

| Grupo | Termos |
| --- | --- |
| Web | HTTP, HTTPS, URL, domínio, endpoint, request, response, status code, JSON, REST, webhook, CORS, cookie, sessão |
| Programação | variável, função, tipo, objeto, classe, interface, módulo, dependência, runtime, compilador, interpretador, algoritmo, estrutura de dados |
| Git e entrega | repositório, commit, branch, merge, rebase, pull request, build, artifact, release, rollback |
| Dados | tabela, schema, query, join, índice, transação, normalização, SQL, NoSQL, ETL, ELT, data warehouse |
| Segurança | autenticação, autorização, hash, criptografia, token, OAuth, RBAC, vulnerabilidade, CVE, princípio do menor privilégio |
| Infraestrutura | processo, porta, servidor, proxy, balanceador, CDN, máquina virtual, contêiner, cluster, IaaS, PaaS, SaaS, serverless |
| Qualidade | teste unitário, integração, E2E, regressão, mock, cobertura, análise estática |
| Operação | log, métrica, trace, latência, throughput, disponibilidade, incidente, SLA, SLI, SLO |
| Produto e UX | persona, jornada, hipótese, usabilidade, acessibilidade, protótipo, design system, métrica |

### Recomendação

O glossário deve crescer pela frequência com que um termo aparece no próprio DevAtlas. Toda sigla usada sem explicação deve apontar para um verbete. Sinônimos, siglas e formas traduzidas devem compartilhar a mesma entrada canônica.

Os dez verbetes atuais não apresentam erro conceitual evidente, mas alguns podem ganhar limites úteis: API não é sinônimo de REST; container não é uma máquina virtual; cache exige política de invalidação; ORM não elimina a necessidade de entender SQL e pode introduzir consultas ineficientes; CI, entrega contínua e implantação contínua devem ser distinguidas; observabilidade não é apenas monitoramento; JWT não é criptografado por padrão; RAG precisa tratar qualidade de recuperação, avaliação e citação.

## 12. Auditoria de internacionalização

### Cobertura estrutural

Os objetos do tipo `Localized` analisados têm chaves `pt`, `en` e `es`; não foram encontrados campos localizados vazios. Isso confirma cobertura estrutural, mas não tradução efetiva.

### Problemas confirmados

1. A função `simple()` replica a descrição em português para os três idiomas. Isso afeta 55 registros:
   - 10 linguagens;
   - 10 frameworks;
   - 10 ferramentas;
   - 10 bancos de dados;
   - 10 serviços cloud;
   - 5 certificações.
2. As três funcionalidades de cada um dos onze projetos usam o mesmo texto em português nos três idiomas: 33 trechos.
3. Somando as exceções legítimas de nomes próprios, há 91 objetos localizados com conteúdo idêntico nos três idiomas; 88 exigem tradução editorial.
4. Valores internos como `iniciante`, `intermediario`, `avancado`, tipos e categorias podem ser apresentados diretamente em componentes. Isso produz português sem acento e rótulos em português nas rotas em inglês e espanhol.
5. Métricas das áreas, como `alta`, `media` e `baixo`, também precisam passar por dicionário quando exibidas.
6. Nomes de coleções técnicas podem aparecer como identificadores (`cloudServices`, por exemplo) em vez de rótulos editoriais localizados.
7. Os nove nomes de estágio dos dois caminhos de carreira são strings simples, em português ou inglês conforme o cargo, e não têm versões por idioma.
8. O campo `audience` das três trilhas usa valores internos (`iniciante`, `desenvolvedor`, `infra`) sem localização.

### Pontos que exigem revisão humana

- naturalidade de inglês e espanhol, não apenas presença de texto;
- consistência entre “front-end”, “frontend” e equivalentes;
- cargos mantidos em inglês no texto português;
- falsos cognatos e regionalismos em espanhol;
- terminologia oficial de produtos, que não deve ser traduzida;
- plural, gênero e concordância em textos montados por componentes;
- metadados, títulos e descrições por idioma;
- `lang`, alternates/hreflang, sitemap e canonical por rota.

### Estratégia recomendada

1. Centralizar rótulos de enumeração em dicionários tipados.
2. Impedir em validação que textos editoriais de português sejam reutilizados em inglês ou espanhol, com lista de exceções para nomes próprios.
3. Revisar uma coleção por vez com falante competente.
4. Manter IDs, slugs e valores internos sem acento, mas nunca exibi-los diretamente.
5. Criar glossário terminológico por idioma para palavras recorrentes.

## 13. Revisão da escrita em português

### Diagnóstico

O conteúdo principal em português está, em geral, corretamente acentuado. Não foram observados sinais de codificação quebrada. Os problemas mais relevantes são de consistência editorial e de exibição de valores internos, não uma ausência generalizada de acentos nos textos localizados.

### Pontos de atenção

- `intermediario`, `avancado`, `seguranca` e outros valores sem acento são válidos como IDs ou enums, mas ficam errados se chegarem à interface sem formatação.
- Termos técnicos em inglês são usados com frequência: stack, deploy, runtime, storage, logs, traces, hardening, issues e README. Muitos são correntes na área, porém o projeto precisa de regra: traduzir quando houver forma natural, explicar no primeiro uso ou incluir no glossário.
- Cargos alternam português e inglês: “Desenvolvedor back-end”, “API Engineer”, “Software Engineer”, “SOC Analyst”, “Product Designer”. Isso pode representar o mercado, mas deve ser apresentado como cargo principal e variações, não como mistura casual.
- “Cloud” e “IA & Machine Learning” combinam idiomas nos títulos. Pode ser uma escolha de marca, mas precisa ser consistente no menu, nas páginas e nos metadados.
- As frases geradas para uso e restrição têm construção correta, mas repetitiva e pouco específica.
- Textos de interface com tom muito publicitário ou autoconsciente devem ser usados com moderação. Expressões como “trilhas curadas”, “projetos com algo a dizer” ou “sem fingir que entendeu” podem funcionar uma vez, mas em excesso diminuem a precisão editorial.
- Nomes de tecnologias devem respeitar grafia oficial: Node.js, Next.js, Vue.js, GitHub, PostgreSQL, scikit-learn e dbt.

### Guia de estilo recomendado

- Usar pt-BR direto, profissional e concreto.
- Preferir frases curtas e verbos de ação.
- Evitar superlativos sem evidência: “melhor”, “completo”, “essencial para todos”, “revolucionário”.
- Distinguir fato, recomendação editorial e estimativa.
- Explicar siglas no primeiro uso.
- Usar “você” apenas em orientações, sem tom professoral.
- Manter nomes oficiais; traduzir o conceito ao redor deles.
- Padronizar front-end, back-end, full-stack, DevOps, cloud, open source e termos similares.
- Informar fonte e data para afirmações sobre mercado, salário, adoção ou certificação.
- Não apresentar duração de estudo como promessa.

## 14. Recomendações editoriais

### Princípios

1. **Problema antes da ferramenta:** explicar o que precisa ser resolvido antes de introduzir um produto.
2. **Profundidade desigual por intenção:** conteúdos fundamentais merecem mais espaço que ferramentas periféricas.
3. **Relações tipadas:** pré-requisito, complemento, alternativa, integração e próximo passo não são a mesma coisa.
4. **Evidência e manutenção:** toda afirmação volátil precisa de fonte e data.
5. **Prática verificável:** roadmaps devem terminar etapas com uma entrega ou explicação observável.
6. **Neutralidade útil:** apresentar trade-offs sem promover uma stack como resposta universal.
7. **Carreira sem promessa:** descrever rotinas e expectativas sem garantir vaga, salário ou prazo.

### Fluxo editorial

1. Definir pauta e intenção de busca.
2. Identificar público, pré-requisitos e resultado esperado.
3. Produzir conteúdo com o template adequado.
4. Fazer revisão técnica por alguém da área.
5. Fazer revisão de linguagem e localização.
6. Validar relações, IDs, links e fontes automaticamente.
7. Publicar com autor/revisor, data e versão.
8. Reavaliar em ciclo definido ou quando a tecnologia mudar.

### Templates recomendados

- **Tecnologia:** usar o modelo da seção 8.
- **Conceito:** definição, modelo mental, exemplo, erros, relações e aprofundamento.
- **Área:** rotina, subáreas, habilidades, cargos, ferramentas, entrada, evolução e projetos.
- **Roadmap:** pré-requisito, etapa, competência, prática, checkpoint e ramificações.
- **Projeto:** problema, escopo, critérios, execução, avaliação, apresentação e extensões.
- **Comparação:** critérios fixos, cenários, trade-offs e decisão orientada a contexto.

### Métricas de qualidade

- percentual de páginas revisadas nos últimos 12 meses;
- referências quebradas;
- relações inválidas;
- traduções pendentes;
- páginas sem fonte oficial;
- conteúdos sem pré-requisito ou próximo passo;
- conclusão de roadmaps e projetos, caso métricas anônimas sejam adotadas;
- termos buscados sem resultado, para orientar pauta.

## 15. Recomendações técnicas para escalar o conteúdo

### Organização

O arquivo `src/data/content.ts` tem atualmente cerca de 86,7 KB e 477 linhas, além de concentrar dados, helpers, relações e coleções paralelas. O problema não é apenas o número de linhas: qualquer revisão toca uma unidade com muitas responsabilidades e conflitos potenciais. Ele já deve ser dividido antes de uma expansão grande. Uma estrutura futura possível:

```text
src/content/
├── areas/
├── technologies/
│   ├── fundamentals/
│   ├── frontend/
│   ├── backend/
│   ├── data-ai/
│   └── infrastructure/
├── concepts/
├── roadmaps/
├── projects/
├── glossary/
├── comparisons/
└── schemas/
```

Arquivos menores devem ser agrupados por domínio e exportados por índices claros. A divisão não deve criar um arquivo minúsculo por frase nem esconder relações em componentes.

### Modelo de dados

- Transformar `type` em uma taxonomia mais precisa: conceito, linguagem, runtime, biblioteca, framework, banco, protocolo, ferramenta, plataforma, serviço e engine.
- Substituir alternativas livres por relações tipadas com IDs.
- Manter a relação área–tecnologia em uma única fonte.
- Eliminar ou derivar automaticamente as coleções paralelas simplificadas.
- Adicionar `officialUrl`, `docsUrl`, `lastReviewed`, `contentVersion`, `sources` e responsáveis pela revisão.
- Separar nível de entrada, importância na área e complexidade operacional.
- Permitir blocos opcionais para que uma IDE não precise simular a profundidade de uma linguagem.

### Validação

Um script de validação em CI deve rejeitar:

- IDs duplicados;
- relações para IDs inexistentes;
- slugs duplicados;
- campos localizados ausentes ou vazios;
- texto português repetido em traduções, salvo exceções;
- URLs inválidas;
- páginas sem data de revisão;
- alternativas circulares ou assimétricas quando a relação exigir simetria;
- níveis, categorias ou tipos fora do vocabulário controlado.

TypeScript com `satisfies` pode preservar inferência; um schema em Zod ou ferramenta equivalente pode validar conteúdo em runtime/build. O importante é haver um contrato único e verificável.

### Busca e navegação

- Indexar por idioma somente o conteúdo necessário para resultado e snippet.
- Acrescentar sinônimos, siglas e nomes alternativos de forma controlada.
- Exibir tipo, área e nível no resultado para reduzir ambiguidade.
- Com centenas de páginas, gerar índices estáticos por idioma ou carregá-los por demanda.
- Registrar buscas sem resultado apenas com consentimento e de forma anônima.
- Criar navegação por relações sem formar ciclos confusos.

### SEO

- Metadados exclusivos por conteúdo e idioma.
- `hreflang`, canonical e sitemap consistentes.
- Dados estruturados apropriados, sem marcar conteúdo como curso quando não é curso.
- Breadcrumb semântico.
- Títulos que expressem intenção real, não combinações artificiais de palavras-chave.
- Fontes oficiais e datas visíveis aumentam confiança e manutenção.

### Performance e acessibilidade

- Manter o conteúdo essencial em HTML gerado no servidor.
- Evitar enviar as 95 fichas completas ao cliente em todas as rotas.
- Carregar busca e filtros progressivamente.
- Preservar foco ao abrir e fechar fichas laterais.
- Oferecer URL própria para estados importantes, mesmo quando o detalhe abre na mesma página.
- Garantir tabelas, sumários e exemplos navegáveis por teclado e leitor de tela.
- Não depender de animação para revelar conteúdo.
- Com crescimento para centenas ou milhares de rotas, medir tempo de build e considerar geração incremental por segmento.

## 16. Plano de evolução por fases

### Fase 0 — integridade e linha de base

**Objetivo:** tornar o estado atual confiável antes de ampliá-lo.

- corrigir referências quebradas entre áreas e tecnologias;
- decidir uma única fonte para o ecossistema de cada área;
- criar validação de IDs, relações e traduções;
- mapear valores internos para rótulos localizados;
- registrar data de revisão e links oficiais;
- documentar taxonomia e critérios de nível.

**Critério de conclusão:** nenhuma relação inválida, nenhum rótulo interno exposto e relatório automatizado de integridade aprovado.

### Fase 1 — fundamentos e modelo editorial

**Objetivo:** fazer o guia ensinar o terreno antes das ferramentas.

- criar a entidade de conceitos/fundamentos;
- publicar o núcleo de web, programação, redes, Git, dados, testes e segurança;
- aplicar o novo modelo a 10–15 tecnologias essenciais;
- relacionar projetos e roadmaps às páginas;
- estabelecer revisão técnica e guia de estilo.

**Critério de conclusão:** um iniciante consegue entender pré-requisitos, sequência e prática sem depender de listas externas.

### Fase 2 — completar as áreas atuais

**Objetivo:** equilibrar a profundidade das dez áreas.

- criar roadmaps para IA, cloud, segurança, QA, UX e suporte;
- aprofundar cargos, senioridade, rotina e subáreas;
- revisar os onze projetos com critérios de aceitação e apresentação;
- ampliar glossário conforme os termos realmente usados;
- traduzir integralmente coleções secundárias e funcionalidades de projetos.

**Critério de conclusão:** todas as áreas têm entrada, percurso, prática e próximos passos comparáveis.

### Fase 3 — expandir domínios prioritários

**Objetivo:** organizar o que já aparece no catálogo sem lugar adequado.

- lançar Mobile;
- lançar Redes;
- separar Engenharia de Dados de Dados & BI quando houver massa crítica;
- introduzir Engenharia de Software/Arquitetura;
- reclassificar desktop e games ou retirá-los da promessa principal até haver conteúdo suficiente.

**Critério de conclusão:** nenhuma tecnologia importante está associada a uma área apenas por falta de domínio apropriado.

### Fase 4 — profundidade profissional

**Objetivo:** apoiar transição do estudo inicial para prática de equipe.

- conteúdo avançado de arquitetura, SRE, segurança, MLOps, FinOps e qualidade;
- comparadores por critérios;
- projetos com rubricas, revisões e variantes;
- trilhas por cargo e senioridade;
- certificações vinculadas a objetivos, não a listas.

**Critério de conclusão:** o conteúdo diferencia conhecimento introdutório, competência prática e experiência operacional.

### Fase 5 — escala e governança

**Objetivo:** manter qualidade com crescimento.

- responsáveis e revisores por domínio;
- calendário de revisão;
- painel de links, traduções e conteúdos vencidos;
- índice de busca segmentado;
- estratégia de geração incremental se o build exigir;
- métricas editoriais anônimas e consentidas;
- processo público de contribuição e correção.

**Critério de conclusão:** o catálogo pode crescer sem duplicação, relações quebradas ou deterioração das traduções.

## Conclusão

O DevAtlas já tem uma fundação promissora e mais coerente que uma simples lista de links. Seu próximo salto de qualidade não depende de adicionar dezenas de logos: depende de transformar amplitude em orientação. A ordem recomendada é integridade, fundamentos, profundidade das páginas, equilíbrio entre áreas e só então expansão.

As prioridades mais urgentes são objetivas: resolver as oito referências quebradas, unificar relações, corrigir os 88 objetos localizados que repetem português em outros idiomas, localizar estágios e enums exibidos, definir uma taxonomia técnica mais precisa e substituir recomendações genéricas por conteúdo específico. Feito isso, a ampliação do catálogo poderá ocorrer sem repetir as fragilidades atuais.
