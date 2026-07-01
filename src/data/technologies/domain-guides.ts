import type { Technology, TechnologyRelation } from "@/lib/content-types";
import { localized, localizedList } from "@/data/localized";

type Text = [string, string, string];

type Profile = {
  practice: Text;
  caution: Text;
  project: Text;
  fundamentals: Text;
  prerequisites: string[];
  relations?: TechnologyRelation[];
};

const profiles: Record<string, Profile> = {
  java: {
    practice: ["Java aparece em serviços corporativos, integrações, processamento transacional e plataformas mantidas por equipes grandes.", "Java appears in enterprise services, integrations, transactional processing and platforms maintained by large teams.", "Java aparece en servicios empresariales, integraciones, procesamiento transaccional y plataformas mantenidas por equipos grandes."],
    caution: ["A JVM e o ecossistema trazem maturidade, mas também build, configuração e abstrações que pesam em scripts ou serviços muito pequenos.", "The JVM and ecosystem bring maturity, but also build tooling, configuration and abstractions that weigh on scripts or very small services.", "La JVM y el ecosistema aportan madurez, pero también build, configuración y abstracciones que pesan en scripts o servicios muy pequeños."],
    project: ["Implemente uma API de pedidos com transações, validação, testes de integração e observabilidade; explique onde a tipagem evitou estados inválidos.", "Build an order API with transactions, validation, integration tests and observability; explain where typing prevented invalid states.", "Implementa una API de pedidos con transacciones, validación, pruebas de integración y observabilidad; explica dónde el tipado evitó estados inválidos."],
    fundamentals: ["JVM, tipos, classes, interfaces, coleções, exceções, generics, concorrência, build e gerenciamento de memória.", "JVM, types, classes, interfaces, collections, exceptions, generics, concurrency, builds and memory management.", "JVM, tipos, clases, interfaces, colecciones, excepciones, generics, concurrencia, build y gestión de memoria."],
    prerequisites: ["logica-programacao", "orientacao-objetos", "terminal-shell"],
    relations: [{ technologyId: "springboot", type: "next-step" }, { technologyId: "kotlin", type: "alternative" }]
  },
  csharp: {
    practice: ["C# é usado em APIs com .NET, aplicações desktop, serviços Microsoft e jogos com Unity.", "C# is used for .NET APIs, desktop applications, Microsoft services and Unity games.", "C# se usa en APIs con .NET, aplicaciones de escritorio, servicios Microsoft y juegos con Unity."],
    caution: ["Aprender apenas a sintaxe não basta: o trabalho real depende do runtime .NET, tarefas assíncronas, gerenciamento de dependências e perfil da aplicação.", "Syntax alone is not enough: real work depends on the .NET runtime, asynchronous tasks, dependency management and the application profile.", "Aprender solo sintaxis no basta: el trabajo real depende del runtime .NET, tareas asíncronas, dependencias y perfil de la aplicación."],
    project: ["Crie um serviço de inventário com ASP.NET Core, EF Core, autenticação, testes e um cliente simples.", "Build an inventory service with ASP.NET Core, EF Core, authentication, tests and a simple client.", "Crea un servicio de inventario con ASP.NET Core, EF Core, autenticación, pruebas y un cliente simple."],
    fundamentals: ["Tipos, LINQ, orientação a objetos, async/await, exceções, delegates, injeção de dependência e ferramentas do .NET.", "Types, LINQ, object orientation, async/await, exceptions, delegates, dependency injection and .NET tooling.", "Tipos, LINQ, orientación a objetos, async/await, excepciones, delegates, inyección de dependencias y herramientas .NET."],
    prerequisites: ["logica-programacao", "orientacao-objetos"],
    relations: [{ technologyId: "dotnet", type: "next-step" }, { technologyId: "unity", type: "ecosystem" }]
  },
  go: {
    practice: ["Go aparece em serviços de rede, ferramentas de infraestrutura, CLIs e componentes cloud que valorizam binários simples e concorrência explícita.", "Go appears in network services, infrastructure tooling, CLIs and cloud components that value simple binaries and explicit concurrency.", "Go aparece en servicios de red, herramientas de infraestructura, CLI y componentes cloud que valoran binarios simples y concurrencia explícita."],
    caution: ["A linguagem reduz recursos, não decisões: concorrência mal coordenada, interfaces amplas e erros ignorados continuam produzindo sistemas frágeis.", "The language reduces features, not decisions: poorly coordinated concurrency, broad interfaces and ignored errors still create fragile systems.", "El lenguaje reduce recursos, no decisiones: concurrencia mal coordinada, interfaces amplias y errores ignorados siguen creando sistemas frágiles."],
    project: ["Construa um coletor concorrente de status HTTP com limites, cancelamento, métricas e testes de race.", "Build a concurrent HTTP status collector with limits, cancellation, metrics and race tests.", "Construye un colector concurrente de estado HTTP con límites, cancelación, métricas y pruebas de race."],
    fundamentals: ["Packages, structs, interfaces pequenas, errors, goroutines, channels, context, módulos, testes e profiling.", "Packages, structs, small interfaces, errors, goroutines, channels, context, modules, tests and profiling.", "Packages, structs, interfaces pequeñas, errors, goroutines, channels, context, módulos, pruebas y profiling."],
    prerequisites: ["logica-programacao", "http", "terminal-shell"],
    relations: [{ technologyId: "docker", type: "pairs-with" }, { technologyId: "kubernetes", type: "ecosystem" }]
  },
  kotlin: {
    practice: ["Kotlin é central no Android moderno e também executa na JVM em serviços que buscam interoperabilidade com Java e uma linguagem mais concisa.", "Kotlin is central to modern Android and also runs on the JVM in services seeking Java interoperability with a more concise language.", "Kotlin es central en Android moderno y también se ejecuta en JVM para servicios que buscan interoperabilidad con Java y un lenguaje más conciso."],
    caution: ["Coroutines, null safety e extensões ajudam, mas podem esconder fluxo e custo quando usados sem domínio da JVM e do ciclo de vida da plataforma.", "Coroutines, null safety and extensions help, but can hide flow and cost without an understanding of the JVM and platform lifecycle.", "Coroutines, null safety y extensiones ayudan, pero pueden ocultar flujo y costo sin dominar JVM y ciclo de vida de la plataforma."],
    project: ["Crie um aplicativo offline-first ou uma API JVM pequena, documentando concorrência, persistência e integração com código Java.", "Build an offline-first app or a small JVM API, documenting concurrency, persistence and Java interoperability.", "Crea una app offline-first o una API JVM pequeña, documentando concurrencia, persistencia e integración con Java."],
    fundamentals: ["Tipos anuláveis, data classes, sealed classes, coleções, funções de extensão, coroutines e interoperabilidade Java.", "Nullable types, data classes, sealed classes, collections, extension functions, coroutines and Java interoperability.", "Tipos anulables, data classes, sealed classes, colecciones, funciones de extensión, coroutines e interoperabilidad Java."],
    prerequisites: ["logica-programacao", "orientacao-objetos"],
    relations: [{ technologyId: "java", type: "ecosystem" }, { technologyId: "swift", type: "alternative" }]
  },
  swift: {
    practice: ["Swift é usado para aplicativos e frameworks nas plataformas Apple, com integração direta a APIs de sistema e ao ecossistema Xcode.", "Swift is used for applications and frameworks on Apple platforms, with direct access to system APIs and the Xcode ecosystem.", "Swift se usa para aplicaciones y frameworks en plataformas Apple, con integración directa a APIs del sistema y al ecosistema Xcode."],
    caution: ["A linguagem não substitui fundamentos de mobile: ciclo de vida, estado, concorrência, persistência, acessibilidade e publicação continuam sendo o trabalho principal.", "The language does not replace mobile foundations: lifecycle, state, concurrency, persistence, accessibility and release remain the main work.", "El lenguaje no sustituye fundamentos mobile: ciclo de vida, estado, concurrencia, persistencia, accesibilidad y publicación siguen siendo el trabajo principal."],
    project: ["Faça um aplicativo de notas offline com busca, acessibilidade, persistência e sincronização simulada.", "Build an offline notes app with search, accessibility, persistence and simulated synchronization.", "Crea una app de notas offline con búsqueda, accesibilidad, persistencia y sincronización simulada."],
    fundamentals: ["Optionals, value/reference semantics, protocols, generics, error handling, async/await e gerenciamento de estado.", "Optionals, value/reference semantics, protocols, generics, error handling, async/await and state management.", "Optionals, semántica de valor/referencia, protocols, generics, manejo de errores, async/await y estado."],
    prerequisites: ["logica-programacao", "orientacao-objetos"],
    relations: [{ technologyId: "kotlin", type: "alternative" }, { technologyId: "sqlite", type: "pairs-with" }]
  },
  dart: {
    practice: ["Dart é estudado principalmente para Flutter, onde controla interface, estado, domínio e integração de aplicações multiplataforma.", "Dart is studied mainly for Flutter, where it drives UI, state, domain logic and multiplatform integration.", "Dart se estudia principalmente para Flutter, donde controla interfaz, estado, dominio e integración multiplataforma."],
    caution: ["Fora do ecossistema Flutter, a adoção é mais restrita. Não escolha Dart antes de confirmar que o objetivo é realmente multiplataforma com Flutter.", "Outside Flutter, adoption is narrower. Do not choose Dart before confirming that Flutter-based multiplatform development is the actual goal.", "Fuera de Flutter, la adopción es menor. No elijas Dart antes de confirmar que el objetivo es multiplataforma con Flutter."],
    project: ["Implemente em Dart a camada de domínio e testes de um app antes de adicionar widgets e integrações nativas.", "Implement the domain layer and tests of an app in Dart before adding widgets and native integrations.", "Implementa en Dart la capa de dominio y pruebas de una app antes de añadir widgets e integraciones nativas."],
    fundamentals: ["Null safety, classes, mixins, generics, Futures, Streams, isolates, packages e testes.", "Null safety, classes, mixins, generics, Futures, Streams, isolates, packages and tests.", "Null safety, clases, mixins, generics, Futures, Streams, isolates, packages y pruebas."],
    prerequisites: ["logica-programacao", "orientacao-objetos"],
    relations: [{ technologyId: "flutter", type: "next-step" }, { technologyId: "typescript", type: "alternative" }]
  },
  vue: {
    practice: ["Vue.js é usado em interfaces progressivas, painéis e aplicações em que templates legíveis e adoção gradual ajudam equipes de diferentes perfis.", "Vue.js is used in progressive interfaces, dashboards and applications where readable templates and gradual adoption help mixed-skill teams.", "Vue.js se usa en interfaces progresivas, paneles y aplicaciones donde templates legibles y adopción gradual ayudan a equipos diversos."],
    caution: ["A facilidade inicial não elimina decisões de estado, roteamento, testes e arquitetura; misturar padrões Options e Composition sem critério fragmenta o projeto.", "Initial ease does not remove state, routing, testing and architecture decisions; mixing Options and Composition patterns without intent fragments a project.", "La facilidad inicial no elimina decisiones de estado, routing, pruebas y arquitectura; mezclar Options y Composition sin criterio fragmenta el proyecto."],
    project: ["Crie um painel operacional com Composition API, filtros na URL, estados de erro, testes de componentes e acessibilidade.", "Build an operational dashboard with the Composition API, URL filters, error states, component tests and accessibility.", "Crea un panel operativo con Composition API, filtros en URL, estados de error, pruebas de componentes y accesibilidad."],
    fundamentals: ["Templates, reatividade, computed, watchers, componentes, props/emits, composables, roteamento e estado.", "Templates, reactivity, computed values, watchers, components, props/emits, composables, routing and state.", "Templates, reactividad, computed, watchers, componentes, props/emits, composables, routing y estado."],
    prerequisites: ["html", "css", "javascript"],
    relations: [{ technologyId: "nuxt", type: "next-step" }, { technologyId: "react", type: "alternative" }]
  },
  angular: {
    practice: ["Angular aparece em aplicações corporativas grandes que valorizam convenções, DI, formulários, roteamento e uma plataforma integrada.", "Angular appears in large enterprise applications that value conventions, DI, forms, routing and an integrated platform.", "Angular aparece en aplicaciones empresariales grandes que valoran convenciones, DI, formularios, routing y una plataforma integrada."],
    caution: ["É uma escolha pesada para páginas pequenas e exige TypeScript, RxJS e entendimento do ciclo de detecção; copiar módulos sem arquitetura cria complexidade cedo.", "It is heavy for small pages and requires TypeScript, RxJS and change-detection knowledge; copying modules without architecture creates early complexity.", "Es pesado para páginas pequeñas y exige TypeScript, RxJS y entender detección de cambios; copiar módulos sin arquitectura crea complejidad temprano."],
    project: ["Modele um sistema administrativo com formulários complexos, permissões, lazy loading, testes e tratamento uniforme de erros.", "Model an administrative system with complex forms, permissions, lazy loading, tests and uniform error handling.", "Modela un sistema administrativo con formularios complejos, permisos, lazy loading, pruebas y manejo uniforme de errores."],
    fundamentals: ["Componentes, templates, signals/RxJS, DI, roteamento, formulários, interceptors, change detection e testes.", "Components, templates, signals/RxJS, DI, routing, forms, interceptors, change detection and tests.", "Componentes, templates, signals/RxJS, DI, routing, formularios, interceptors, change detection y pruebas."],
    prerequisites: ["html", "css", "typescript"],
    relations: [{ technologyId: "typescript", type: "pairs-with" }, { technologyId: "react", type: "alternative" }]
  },
  svelte: {
    practice: ["Svelte compila componentes e é usado em interfaces que buscam modelo reativo direto, bundle enxuto e pouco código de runtime.", "Svelte compiles components and is used for interfaces seeking a direct reactive model, lean bundles and little runtime code.", "Svelte compila componentes y se usa en interfaces que buscan reactividad directa, bundles ligeros y poco código de runtime."],
    caution: ["Sintaxe curta não dispensa HTML, CSS, estado e acessibilidade. O ecossistema menor pode pesar em equipes que dependem de integrações muito específicas.", "Short syntax does not replace HTML, CSS, state and accessibility. A smaller ecosystem can matter for teams relying on very specific integrations.", "La sintaxis corta no sustituye HTML, CSS, estado y accesibilidad. Un ecosistema menor puede pesar en equipos con integraciones muy específicas."],
    project: ["Construa uma interface de dados reativa com carregamento progressivo, formulários e medição de bundle.", "Build a reactive data interface with progressive loading, forms and bundle measurement.", "Construye una interfaz de datos reactiva con carga progresiva, formularios y medición de bundle."],
    fundamentals: ["Componentes, reatividade, stores, eventos, lifecycle, ações, transições e limites cliente/servidor.", "Components, reactivity, stores, events, lifecycle, actions, transitions and client/server boundaries.", "Componentes, reactividad, stores, eventos, lifecycle, acciones, transiciones y límites cliente/servidor."],
    prerequisites: ["html", "css", "javascript"],
    relations: [{ technologyId: "astro", type: "pairs-with" }, { technologyId: "vue", type: "alternative" }]
  },
  tailwind: {
    practice: ["Tailwind CSS é usado para compor interfaces com utilitários e tokens próximos do markup, especialmente em produtos com sistema visual bem definido.", "Tailwind CSS is used to compose interfaces with utilities and tokens close to markup, especially in products with a defined visual system.", "Tailwind CSS se usa para componer interfaces con utilidades y tokens cerca del markup, especialmente en productos con sistema visual definido."],
    caution: ["Sem domínio de CSS e critérios de componente, classes se acumulam, estados ficam inconsistentes e o framework apenas desloca a complexidade.", "Without CSS knowledge and component boundaries, classes accumulate, states become inconsistent and the framework only moves complexity around.", "Sin dominio de CSS y límites de componentes, las clases se acumulan, los estados quedan inconsistentes y el framework solo desplaza complejidad."],
    project: ["Implemente um conjunto pequeno de componentes com tokens, variantes, foco visível e comparação do CSS produzido.", "Implement a small component set with tokens, variants, visible focus and a comparison of the generated CSS.", "Implementa un conjunto pequeño de componentes con tokens, variantes, foco visible y comparación del CSS generado."],
    fundamentals: ["CSS, design tokens, responsividade, estados, composição, configuração de conteúdo e extração de componentes.", "CSS, design tokens, responsiveness, states, composition, content configuration and component extraction.", "CSS, design tokens, responsividad, estados, composición, configuración de contenido y extracción de componentes."],
    prerequisites: ["css", "html"],
    relations: [{ technologyId: "acessibilidade-web", type: "pairs-with" }, { technologyId: "bootstrap", type: "alternative" }]
  },
  nestjs: {
    practice: ["NestJS estrutura APIs Node.js em módulos, controllers e providers, comum em equipes que querem convenções e injeção de dependência.", "NestJS structures Node.js APIs into modules, controllers and providers, common in teams seeking conventions and dependency injection.", "NestJS estructura APIs Node.js en módulos, controllers y providers, común en equipos que buscan convenciones e inyección de dependencias."],
    caution: ["A arquitetura pode virar cerimônia em serviços pequenos e decorators não substituem entender HTTP, Node.js, ciclo de dependências e erros.", "The architecture can become ceremony in small services, and decorators do not replace understanding HTTP, Node.js, dependency cycles and errors.", "La arquitectura puede volverse ceremonia en servicios pequeños y los decorators no sustituyen entender HTTP, Node.js, ciclos de dependencias y errores."],
    project: ["Crie uma API modular com autorização, fila, transações, testes de integração e observabilidade, justificando os limites entre módulos.", "Build a modular API with authorization, a queue, transactions, integration tests and observability, justifying module boundaries.", "Crea una API modular con autorización, cola, transacciones, pruebas de integración y observabilidad, justificando límites entre módulos."],
    fundamentals: ["Node.js, TypeScript, módulos, DI, pipes, guards, interceptors, validação, exceções e testes.", "Node.js, TypeScript, modules, DI, pipes, guards, interceptors, validation, exceptions and tests.", "Node.js, TypeScript, módulos, DI, pipes, guards, interceptors, validación, excepciones y pruebas."],
    prerequisites: ["nodejs", "typescript", "http", "apis"],
    relations: [{ technologyId: "express", type: "ecosystem" }, { technologyId: "postgresql", type: "pairs-with" }]
  },
  fastapi: {
    practice: ["FastAPI aparece em APIs Python, serviços de dados e inferência que aproveitam type hints, validação e OpenAPI automática.", "FastAPI appears in Python APIs, data services and inference endpoints that benefit from type hints, validation and automatic OpenAPI.", "FastAPI aparece en APIs Python, servicios de datos e inferencia que aprovechan type hints, validación y OpenAPI automática."],
    caution: ["A documentação automática não garante um contrato bem desenhado; tarefas pesadas, acesso síncrono e dependências globais podem bloquear o serviço.", "Automatic documentation does not guarantee a well-designed contract; heavy tasks, synchronous access and global dependencies can block the service.", "La documentación automática no garantiza un contrato bien diseñado; tareas pesadas, acceso síncrono y dependencias globales pueden bloquear el servicio."],
    project: ["Publique um serviço de classificação com validação, versionamento de modelo, fila para tarefas longas, testes e métricas.", "Publish a classification service with validation, model versioning, a queue for long tasks, tests and metrics.", "Publica un servicio de clasificación con validación, versionado de modelo, cola para tareas largas, pruebas y métricas."],
    fundamentals: ["Python, type hints, Pydantic, ASGI, dependências, async, erros HTTP, OpenAPI e testes.", "Python, type hints, Pydantic, ASGI, dependencies, async, HTTP errors, OpenAPI and tests.", "Python, type hints, Pydantic, ASGI, dependencias, async, errores HTTP, OpenAPI y pruebas."],
    prerequisites: ["python", "http", "apis"],
    relations: [{ technologyId: "pytorch", type: "pairs-with" }, { technologyId: "docker", type: "pairs-with" }]
  },
  express: {
    practice: ["Express fornece uma camada HTTP mínima para Node.js e aparece em APIs, gateways e serviços onde a equipe quer controlar a estrutura.", "Express provides a minimal HTTP layer for Node.js and appears in APIs, gateways and services where the team wants control over structure.", "Express ofrece una capa HTTP mínima para Node.js y aparece en APIs, gateways y servicios donde el equipo quiere controlar la estructura."],
    caution: ["A liberdade cobra arquitetura: middleware fora de ordem, erros assíncronos, validação dispersa e ausência de limites crescem rápido.", "Freedom requires architecture: out-of-order middleware, async errors, scattered validation and missing boundaries grow quickly.", "La libertad exige arquitectura: middleware fuera de orden, errores asíncronos, validación dispersa y falta de límites crecen rápido."],
    project: ["Implemente uma API pequena com composição de middleware, validação na borda, erro central, testes e shutdown seguro.", "Build a small API with middleware composition, boundary validation, centralized errors, tests and graceful shutdown.", "Implementa una API pequeña con composición de middleware, validación en el borde, error central, pruebas y shutdown seguro."],
    fundamentals: ["Node.js, request/response, roteamento, middleware, erros, segurança, validação e lifecycle do processo.", "Node.js, request/response, routing, middleware, errors, security, validation and process lifecycle.", "Node.js, request/response, routing, middleware, errores, seguridad, validación y lifecycle del proceso."],
    prerequisites: ["nodejs", "javascript", "http"],
    relations: [{ technologyId: "nestjs", type: "next-step" }, { technologyId: "fastapi", type: "alternative" }]
  },
  django: {
    practice: ["Django é usado em aplicações web e back-ends que se beneficiam de ORM, autenticação, admin, formulários e convenções integradas.", "Django is used in web applications and backends that benefit from an ORM, authentication, admin, forms and integrated conventions.", "Django se usa en aplicaciones web y backends que aprovechan ORM, autenticación, admin, formularios y convenciones integradas."],
    caution: ["O framework acelera o comum, mas consultas N+1, models acoplados e regras no lugar errado degradam aplicações sem aparecer no protótipo.", "The framework accelerates common work, but N+1 queries, coupled models and misplaced rules degrade applications without showing in prototypes.", "El framework acelera lo común, pero consultas N+1, models acoplados y reglas mal ubicadas degradan aplicaciones sin verse en el prototipo."],
    project: ["Crie um sistema editorial com permissões, admin customizado, busca, testes, análise de consultas e deploy reproduzível.", "Build an editorial system with permissions, a customized admin, search, tests, query analysis and reproducible deployment.", "Crea un sistema editorial con permisos, admin personalizado, búsqueda, pruebas, análisis de consultas y deploy reproducible."],
    fundamentals: ["Python, ciclo request/response, models, migrations, ORM, views, templates/APIs, autenticação, cache e testes.", "Python, request/response cycle, models, migrations, ORM, views, templates/APIs, authentication, caching and tests.", "Python, ciclo request/response, models, migrations, ORM, views, templates/APIs, autenticación, caché y pruebas."],
    prerequisites: ["python", "http", "sql", "modelagem-dados"],
    relations: [{ technologyId: "postgresql", type: "pairs-with" }, { technologyId: "fastapi", type: "alternative" }]
  },
  laravel: {
    practice: ["Laravel aparece em produtos web PHP que aproveitam roteamento, Eloquent, filas, autenticação e ferramentas integradas de entrega.", "Laravel appears in PHP web products that benefit from routing, Eloquent, queues, authentication and integrated delivery tooling.", "Laravel aparece en productos web PHP que aprovechan routing, Eloquent, colas, autenticación y herramientas integradas."],
    caution: ["Facades e convenções tornam o início rápido, mas regras em controllers, queries implícitas e jobs não idempotentes criam dívida difícil de observar.", "Facades and conventions make starts fast, but controller-heavy rules, implicit queries and non-idempotent jobs create hidden debt.", "Facades y convenciones aceleran el inicio, pero reglas en controllers, queries implícitas y jobs no idempotentes crean deuda oculta."],
    project: ["Construa uma central de reservas com políticas, transações, fila de notificações, testes e observação de queries.", "Build a booking hub with policies, transactions, notification queues, tests and query observation.", "Construye una central de reservas con políticas, transacciones, cola de notificaciones, pruebas y observación de queries."],
    fundamentals: ["PHP moderno, Composer, container, routing, Eloquent, migrations, policies, queues, eventos e testes.", "Modern PHP, Composer, the container, routing, Eloquent, migrations, policies, queues, events and tests.", "PHP moderno, Composer, container, routing, Eloquent, migrations, policies, queues, eventos y pruebas."],
    prerequisites: ["php", "http", "sql", "orientacao-objetos"],
    relations: [{ technologyId: "postgresql", type: "pairs-with" }, { technologyId: "django", type: "alternative" }]
  },
  springboot: {
    practice: ["Spring Boot é usado em serviços Java corporativos com integração a dados, mensageria, segurança, observabilidade e infraestrutura organizacional.", "Spring Boot is used in enterprise Java services integrating data, messaging, security, observability and organizational infrastructure.", "Spring Boot se usa en servicios Java empresariales con integración a datos, mensajería, seguridad, observabilidad e infraestructura."],
    caution: ["Auto-configuração reduz setup, mas pode esconder beans, proxies, transações e concorrência; adicionar starters sem entender o runtime torna falhas opacas.", "Auto-configuration reduces setup but can hide beans, proxies, transactions and concurrency; adding starters without runtime knowledge makes failures opaque.", "La autoconfiguración reduce setup, pero puede ocultar beans, proxies, transacciones y concurrencia; añadir starters sin entender el runtime vuelve opacos los fallos."],
    project: ["Implemente um serviço de cobrança com transação, idempotência, mensageria, testes de contrato e métricas operacionais.", "Implement a billing service with transactions, idempotency, messaging, contract tests and operational metrics.", "Implementa un servicio de cobro con transacción, idempotencia, mensajería, pruebas de contrato y métricas operativas."],
    fundamentals: ["Java, DI/IoC, configuração, MVC/WebFlux, dados, transações, segurança, testes, Actuator e empacotamento.", "Java, DI/IoC, configuration, MVC/WebFlux, data, transactions, security, tests, Actuator and packaging.", "Java, DI/IoC, configuración, MVC/WebFlux, datos, transacciones, seguridad, pruebas, Actuator y empaquetado."],
    prerequisites: ["java", "http", "sql", "orientacao-objetos"],
    relations: [{ technologyId: "postgresql", type: "pairs-with" }, { technologyId: "kafka", type: "pairs-with" }]
  },
  dotnet: {
    practice: ["ASP.NET Core aparece em APIs, back-ends e sistemas Microsoft que precisam de alto desempenho, tooling integrado e suporte multiplataforma.", "ASP.NET Core appears in APIs, backends and Microsoft systems needing high performance, integrated tooling and cross-platform support.", "ASP.NET Core aparece en APIs, backends y sistemas Microsoft que necesitan alto rendimiento, tooling integrado y soporte multiplataforma."],
    caution: ["Templates e DI ajudam, mas controllers anêmicos, EF Core sem observar SQL e middleware mal ordenado escondem problemas até produção.", "Templates and DI help, but anemic controllers, EF Core without SQL awareness and misordered middleware hide problems until production.", "Templates y DI ayudan, pero controllers anémicos, EF Core sin observar SQL y middleware mal ordenado ocultan problemas hasta producción."],
    project: ["Crie uma API de ativos com políticas, EF Core, concorrência otimista, testes de integração e telemetria.", "Build an asset API with policies, EF Core, optimistic concurrency, integration tests and telemetry.", "Crea una API de activos con políticas, EF Core, concurrencia optimista, pruebas de integración y telemetría."],
    fundamentals: ["C#, hosting, middleware, routing, model binding, DI, configuração, autenticação, EF Core e testes.", "C#, hosting, middleware, routing, model binding, DI, configuration, authentication, EF Core and tests.", "C#, hosting, middleware, routing, model binding, DI, configuración, autenticación, EF Core y pruebas."],
    prerequisites: ["csharp", "http", "sql", "orientacao-objetos"],
    relations: [{ technologyId: "azure", type: "pairs-with" }, { technologyId: "springboot", type: "alternative" }]
  },
  flutter: {
    practice: ["Flutter é usado para criar interfaces mobile, web e desktop a partir de uma base Dart, mantendo renderização e componentes próprios.", "Flutter is used to build mobile, web and desktop interfaces from one Dart codebase with its own rendering and components.", "Flutter se usa para crear interfaces mobile, web y desktop desde una base Dart con renderizado y componentes propios."],
    caution: ["Uma base compartilhada não elimina diferenças de plataforma, acessibilidade, navegação, plugins, tamanho do app e integração nativa.", "A shared codebase does not remove platform differences, accessibility, navigation, plugins, app size and native integration.", "Una base compartida no elimina diferencias de plataforma, accesibilidad, navegación, plugins, tamaño e integración nativa."],
    project: ["Crie um app offline-first com sincronização simulada, estados de conectividade, testes de widgets e adaptação por plataforma.", "Build an offline-first app with simulated sync, connectivity states, widget tests and platform adaptation.", "Crea una app offline-first con sincronización simulada, estados de conectividad, pruebas de widgets y adaptación por plataforma."],
    fundamentals: ["Dart, widgets, constraints, estado, navegação, async, persistência, plugins, testes e ciclo de publicação.", "Dart, widgets, constraints, state, navigation, async, persistence, plugins, tests and release lifecycle.", "Dart, widgets, constraints, estado, navegación, async, persistencia, plugins, pruebas y ciclo de publicación."],
    prerequisites: ["dart", "logica-programacao"],
    relations: [{ technologyId: "firebase", type: "pairs-with" }, { technologyId: "reactnative", type: "alternative" }]
  },
  reactnative: {
    practice: ["React Native é usado em aplicativos iOS e Android que compartilham lógica React enquanto acessam componentes e capacidades nativas.", "React Native is used in iOS and Android apps that share React logic while accessing native components and capabilities.", "React Native se usa en apps iOS y Android que comparten lógica React y acceden a componentes y capacidades nativas."],
    caution: ["Conhecer React não resolve navegação, ciclo mobile, permissões, performance de listas, builds e módulos nativos.", "Knowing React does not solve navigation, mobile lifecycle, permissions, list performance, builds and native modules.", "Conocer React no resuelve navegación, ciclo mobile, permisos, rendimiento de listas, builds y módulos nativos."],
    project: ["Construa um app de campo com cache offline, fila de sincronização, câmera simulada, acessibilidade e testes em duas plataformas.", "Build a field app with offline cache, a sync queue, simulated camera use, accessibility and tests on two platforms.", "Construye una app de campo con caché offline, cola de sincronización, cámara simulada, accesibilidad y pruebas en dos plataformas."],
    fundamentals: ["React, componentes nativos, navegação, estado, listas, bridge/nova arquitetura, permissões, builds e depuração.", "React, native components, navigation, state, lists, bridge/new architecture, permissions, builds and debugging.", "React, componentes nativos, navegación, estado, listas, bridge/nueva arquitectura, permisos, builds y depuración."],
    prerequisites: ["react", "javascript", "typescript"],
    relations: [{ technologyId: "firebase", type: "pairs-with" }, { technologyId: "flutter", type: "alternative" }]
  },
  mysql: {
    practice: ["MySQL aparece em aplicações web, SaaS e sistemas gerenciados que valorizam amplo suporte de hospedagem e ecossistema operacional conhecido.", "MySQL appears in web applications, SaaS and managed systems that value broad hosting support and a familiar operational ecosystem.", "MySQL aparece en aplicaciones web, SaaS y sistemas gestionados que valoran amplio soporte de hosting y ecosistema operativo conocido."],
    caution: ["Compatibilidade superficial com outros bancos não torna comportamento idêntico; tipos, collations, isolamento, índices e recursos variam por versão e engine.", "Surface compatibility with other databases does not make behavior identical; types, collations, isolation, indexes and features vary by version and engine.", "La compatibilidad superficial con otras bases no hace idéntico el comportamiento; tipos, collations, aislamiento, índices y recursos varían."],
    project: ["Modele um catálogo com constraints, transações, índices compostos, paginação e análise de planos de consulta.", "Model a catalog with constraints, transactions, composite indexes, pagination and query-plan analysis.", "Modela un catálogo con constraints, transacciones, índices compuestos, paginación y análisis de planes."],
    fundamentals: ["SQL, InnoDB, tipos, constraints, índices, transações, EXPLAIN, backup, replicação e configuração.", "SQL, InnoDB, types, constraints, indexes, transactions, EXPLAIN, backup, replication and configuration.", "SQL, InnoDB, tipos, constraints, índices, transacciones, EXPLAIN, backup, replicación y configuración."],
    prerequisites: ["sql", "modelagem-dados"],
    relations: [{ technologyId: "postgresql", type: "alternative" }, { technologyId: "mariadb", type: "alternative" }]
  },
  mongodb: {
    practice: ["MongoDB é usado quando documentos agregados e padrões de acesso combinam melhor com o problema que tabelas altamente relacionais.", "MongoDB is used when aggregate documents and access patterns fit the problem better than highly relational tables.", "MongoDB se usa cuando documentos agregados y patrones de acceso encajan mejor que tablas muy relacionales."],
    caution: ["Schema flexível não significa ausência de modelo. Documentos sem limite, duplicação sem estratégia e joins improvisados geram custo e inconsistência.", "Flexible schema does not mean no model. Unbounded documents, duplication without strategy and improvised joins create cost and inconsistency.", "Schema flexible no significa ausencia de modelo. Documentos sin límite, duplicación sin estrategia y joins improvisados generan costo e inconsistencia."],
    project: ["Modele um catálogo com variantes e histórico, compare embedding e referência, crie índices e teste padrões reais de consulta.", "Model a catalog with variants and history, compare embedding and references, create indexes and test real access patterns.", "Modela un catálogo con variantes e historial, compara embedding y referencias, crea índices y prueba patrones reales."],
    fundamentals: ["Documentos, BSON, schema validation, embedding/reference, índices, aggregation pipeline, transações, sharding e operação.", "Documents, BSON, schema validation, embedding/references, indexes, aggregation pipelines, transactions, sharding and operations.", "Documentos, BSON, validación de schema, embedding/referencias, índices, aggregation pipeline, transacciones, sharding y operación."],
    prerequisites: ["modelagem-dados", "json", "indices"],
    relations: [{ technologyId: "postgresql", type: "alternative" }, { technologyId: "nodejs", type: "pairs-with" }]
  },
  redis: {
    practice: ["Redis aparece como cache, armazenamento efêmero, rate limiter, coordenação e estrutura de dados em memória.", "Redis appears as a cache, ephemeral store, rate limiter, coordination mechanism and in-memory data structure server.", "Redis aparece como caché, almacenamiento efímero, rate limiter, coordinación y estructuras en memoria."],
    caution: ["Usá-lo como 'banco rápido' sem política de expiração, limite de memória, persistência e comportamento de falha transforma aceleração em perda de dados.", "Using it as a 'fast database' without expiration, memory limits, persistence and failure behavior turns acceleration into data loss.", "Usarlo como 'base rápida' sin expiración, límites de memoria, persistencia y comportamiento ante fallos convierte velocidad en pérdida de datos."],
    project: ["Adicione cache a uma API, meça hit rate e latência, implemente invalidação e demonstre o comportamento quando Redis fica indisponível.", "Add caching to an API, measure hit rate and latency, implement invalidation and demonstrate behavior when Redis is unavailable.", "Añade caché a una API, mide hit rate y latencia, implementa invalidación y demuestra qué ocurre si Redis no está disponible."],
    fundamentals: ["Tipos de dados, TTL, eviction, persistência, atomicidade, transactions/scripts, pub/sub, streams e topologias.", "Data types, TTL, eviction, persistence, atomicity, transactions/scripts, pub/sub, streams and topologies.", "Tipos de datos, TTL, eviction, persistencia, atomicidad, transactions/scripts, pub/sub, streams y topologías."],
    prerequisites: ["modelagem-dados", "tcp-ip"],
    relations: [{ technologyId: "postgresql", type: "pairs-with" }, { technologyId: "rabbitmq", type: "alternative" }]
  },
  qdrant: {
    practice: ["Qdrant é usado para armazenar vetores e recuperar itens semanticamente próximos em busca, recomendação e RAG.", "Qdrant stores vectors and retrieves semantically close items for search, recommendation and RAG.", "Qdrant se usa para almacenar vectores y recuperar elementos semánticamente cercanos en búsqueda, recomendación y RAG."],
    caution: ["O banco não corrige embeddings ruins, chunking arbitrário nem avaliação ausente. Similaridade alta também não garante resposta correta.", "The database does not fix poor embeddings, arbitrary chunking or missing evaluation. High similarity does not guarantee a correct answer.", "La base no corrige embeddings malos, chunking arbitrario ni falta de evaluación. Alta similitud tampoco garantiza respuesta correcta."],
    project: ["Monte uma busca semântica com conjunto de avaliação, filtros de metadados e comparação contra busca textual.", "Build semantic search with an evaluation set, metadata filters and a comparison against text search.", "Monta una búsqueda semántica con conjunto de evaluación, filtros de metadatos y comparación con búsqueda textual."],
    fundamentals: ["Embeddings, distância, coleções, payloads, filtros, índices ANN, recall/latência, ingestão e avaliação.", "Embeddings, distance, collections, payloads, filters, ANN indexes, recall/latency, ingestion and evaluation.", "Embeddings, distancia, colecciones, payloads, filtros, índices ANN, recall/latencia, ingesta y evaluación."],
    prerequisites: ["python", "estruturas-dados", "modelagem-dados"],
    relations: [{ technologyId: "fastapi", type: "pairs-with" }, { technologyId: "postgresql", type: "alternative" }]
  },
  elasticsearch: {
    practice: ["Elasticsearch aparece em busca textual, observabilidade e exploração de documentos com relevância, filtros e agregações.", "Elasticsearch appears in full-text search, observability and document exploration with relevance, filters and aggregations.", "Elasticsearch aparece en búsqueda textual, observabilidad y exploración de documentos con relevancia, filtros y agregaciones."],
    caution: ["Mapeamentos errados, cardinalidade alta, shards demais e uso como banco primário tornam operação cara e recuperação difícil.", "Wrong mappings, high cardinality, too many shards and use as a primary database make operations expensive and recovery difficult.", "Mappings erróneos, alta cardinalidad, demasiados shards y uso como base primaria vuelven cara la operación y difícil la recuperación."],
    project: ["Indexe um catálogo, configure análise por idioma, relevância, filtros e métricas de busca; documente reindexação.", "Index a catalog, configure language analysis, relevance, filters and search metrics; document reindexing.", "Indexa un catálogo, configura análisis por idioma, relevancia, filtros y métricas de búsqueda; documenta reindexación."],
    fundamentals: ["Índices, mappings, analyzers, inverted index, queries, aggregations, shards, replicas e lifecycle.", "Indexes, mappings, analyzers, inverted indexes, queries, aggregations, shards, replicas and lifecycle.", "Índices, mappings, analyzers, inverted index, queries, agregaciones, shards, réplicas y lifecycle."],
    prerequisites: ["json", "http", "indices"],
    relations: [{ technologyId: "logs", type: "pairs-with" }, { technologyId: "grafana", type: "pairs-with" }]
  },
  kubernetes: {
    practice: ["Kubernetes orquestra workloads containerizados quando múltiplos serviços, equipes e requisitos operacionais justificam uma plataforma comum.", "Kubernetes orchestrates containerized workloads when multiple services, teams and operational requirements justify a shared platform.", "Kubernetes orquesta workloads en contenedores cuando múltiples servicios, equipos y requisitos operativos justifican una plataforma común."],
    caution: ["Ele não conserta aplicações frágeis e costuma ser excesso para um produto pequeno. Rede, armazenamento, segurança e upgrades viram responsabilidade contínua.", "It does not fix fragile applications and is often excessive for a small product. Networking, storage, security and upgrades become ongoing responsibilities.", "No corrige aplicaciones frágiles y suele ser exceso para un producto pequeño. Red, almacenamiento, seguridad y upgrades se vuelven responsabilidad continua."],
    project: ["Execute dois serviços com probes, requests/limits, configuração, secret, política de rede e um cenário de falha observado.", "Run two services with probes, requests/limits, configuration, a secret, a network policy and an observed failure scenario.", "Ejecuta dos servicios con probes, requests/limits, configuración, secret, política de red y un escenario de fallo observado."],
    fundamentals: ["Control plane, pods, deployments, services, ingress, configuração, volumes, scheduling, RBAC, observabilidade e upgrades.", "Control plane, pods, deployments, services, ingress, configuration, volumes, scheduling, RBAC, observability and upgrades.", "Control plane, pods, deployments, services, ingress, configuración, volúmenes, scheduling, RBAC, observabilidad y upgrades."],
    prerequisites: ["linux", "docker", "tcp-ip", "terminal-shell"],
    relations: [{ technologyId: "argocd", type: "next-step" }, { technologyId: "prometheus", type: "pairs-with" }]
  },
  terraform: {
    practice: ["Terraform descreve infraestrutura e dependências em código, permitindo revisar planos e reproduzir ambientes entre contas e regiões.", "Terraform describes infrastructure and dependencies as code, enabling plan review and reproducible environments across accounts and regions.", "Terraform describe infraestructura y dependencias como código, permitiendo revisar planes y reproducir entornos entre cuentas y regiones."],
    caution: ["Estado é dado sensível e crítico. Módulos genéricos demais, secrets no plano e mudanças sem revisão podem ampliar o impacto de um erro.", "State is sensitive and critical data. Overly generic modules, secrets in plans and unreviewed changes can amplify mistakes.", "El estado es dato sensible y crítico. Módulos demasiado genéricos, secrets en planes y cambios sin revisión amplifican errores."],
    project: ["Provisione rede e aplicação mínima com módulos pequenos, estado remoto, validação, política de custo e destruição segura.", "Provision a minimal network and application with small modules, remote state, validation, cost policy and safe teardown.", "Provisiona red y aplicación mínima con módulos pequeños, estado remoto, validación, política de costo y destrucción segura."],
    fundamentals: ["Providers, resources, data sources, expressions, dependency graph, plan/apply, state, modules, import e lifecycle.", "Providers, resources, data sources, expressions, dependency graph, plan/apply, state, modules, import and lifecycle.", "Providers, resources, data sources, expresiones, grafo de dependencias, plan/apply, estado, módulos, import y lifecycle."],
    prerequisites: ["git", "terminal-shell", "tcp-ip"],
    relations: [{ technologyId: "aws", type: "pairs-with" }, { technologyId: "azure", type: "pairs-with" }, { technologyId: "gcp", type: "pairs-with" }]
  },
  githubactions: {
    practice: ["GitHub Actions automatiza validação, build e entrega a partir de eventos do repositório, com contexto próximo ao pull request.", "GitHub Actions automates validation, builds and delivery from repository events, close to pull-request context.", "GitHub Actions automatiza validación, build y entrega desde eventos del repositorio, cerca del contexto del pull request."],
    caution: ["Actions de terceiros, permissões amplas, secrets em forks e workflows sem pinning criam risco de supply chain e execução imprevisível.", "Third-party actions, broad permissions, fork secrets and unpinned workflows create supply-chain and unpredictable-execution risks.", "Actions de terceros, permisos amplios, secrets en forks y workflows sin pinning crean riesgo de supply chain y ejecución imprevisible."],
    project: ["Crie um pipeline com lint, testes, build, cache, artefato assinado, ambiente protegido e rollback documentado.", "Create a pipeline with lint, tests, build, cache, a signed artifact, a protected environment and documented rollback.", "Crea un pipeline con lint, pruebas, build, caché, artefacto firmado, entorno protegido y rollback documentado."],
    fundamentals: ["Eventos, jobs, steps, runners, matriz, cache, artifacts, environments, permissions, secrets e reutilização.", "Events, jobs, steps, runners, matrices, cache, artifacts, environments, permissions, secrets and reuse.", "Eventos, jobs, steps, runners, matrix, caché, artifacts, environments, permissions, secrets y reutilización."],
    prerequisites: ["git", "github", "ci-cd"],
    relations: [{ technologyId: "docker", type: "pairs-with" }, { technologyId: "jenkins", type: "alternative" }]
  },
  aws: {
    practice: ["AWS oferece serviços de compute, rede, dados, identidade e operação usados de protótipos a plataformas globais.", "AWS offers compute, networking, data, identity and operations services used from prototypes to global platforms.", "AWS ofrece servicios de compute, red, datos, identidad y operación usados desde prototipos hasta plataformas globales."],
    caution: ["Conhecer nomes de serviços não equivale a arquitetura. IAM, custo, regiões, limites, recuperação e responsabilidade compartilhada orientam decisões.", "Knowing service names is not architecture. IAM, cost, regions, limits, recovery and shared responsibility guide decisions.", "Conocer nombres de servicios no equivale a arquitectura. IAM, costo, regiones, límites, recuperación y responsabilidad compartida guían decisiones."],
    project: ["Publique uma aplicação mínima com rede, identidade, logs, orçamento, backup e IaC; simule uma falha e recupere.", "Deploy a minimal application with networking, identity, logs, budget, backup and IaC; simulate a failure and recover.", "Publica una aplicación mínima con red, identidad, logs, presupuesto, backup e IaC; simula un fallo y recupera."],
    fundamentals: ["IAM, regiões/AZs, VPC, compute, storage, bancos, observabilidade, preços, segurança e Well-Architected.", "IAM, regions/AZs, VPC, compute, storage, databases, observability, pricing, security and Well-Architected.", "IAM, regiones/AZ, VPC, compute, storage, bases, observabilidad, precios, seguridad y Well-Architected."],
    prerequisites: ["linux", "tcp-ip", "dns", "http"],
    relations: [{ technologyId: "terraform", type: "pairs-with" }, { technologyId: "dynamodb", type: "ecosystem" }]
  },
  azure: {
    practice: ["Azure integra compute, dados, redes e identidade, com forte presença em organizações que já usam Microsoft 365, Windows e .NET.", "Azure integrates compute, data, networking and identity, with strong adoption in organizations already using Microsoft 365, Windows and .NET.", "Azure integra compute, datos, redes e identidad, con fuerte presencia en organizaciones que ya usan Microsoft 365, Windows y .NET."],
    caution: ["A integração facilita adoção, mas RBAC, subscriptions, tenants, custos e diferenças entre serviços exigem desenho explícito.", "Integration eases adoption, but RBAC, subscriptions, tenants, cost and service differences require explicit design.", "La integración facilita adopción, pero RBAC, subscriptions, tenants, costos y diferencias entre servicios exigen diseño explícito."],
    project: ["Monte uma aplicação .NET ou Node com Entra ID, rede privada, monitoramento, orçamento e provisionamento reproduzível.", "Build a .NET or Node application with Entra ID, a private network, monitoring, budget and reproducible provisioning.", "Monta una aplicación .NET o Node con Entra ID, red privada, monitoreo, presupuesto y aprovisionamiento reproducible."],
    fundamentals: ["Tenants, subscriptions, resource groups, Entra ID, RBAC, VNets, compute, storage, monitoramento e custos.", "Tenants, subscriptions, resource groups, Entra ID, RBAC, VNets, compute, storage, monitoring and cost.", "Tenants, subscriptions, resource groups, Entra ID, RBAC, VNets, compute, storage, monitoreo y costos."],
    prerequisites: ["windows", "tcp-ip", "dns", "autenticacao"],
    relations: [{ technologyId: "entra-id", type: "ecosystem" }, { technologyId: "dotnet", type: "pairs-with" }]
  },
  gcp: {
    practice: ["Google Cloud aparece em plataformas de dados, analytics, machine learning e workloads containerizados com serviços gerenciados.", "Google Cloud appears in data platforms, analytics, machine learning and containerized workloads through managed services.", "Google Cloud aparece en plataformas de datos, analytics, machine learning y workloads en contenedores con servicios gestionados."],
    caution: ["Serviços gerenciados reduzem operação, mas não removem IAM, desenho de rede, egress, quotas, localização de dados e custo por consulta.", "Managed services reduce operations but do not remove IAM, network design, egress, quotas, data location and per-query cost.", "Los servicios gestionados reducen operación, pero no eliminan IAM, diseño de red, egress, cuotas, ubicación de datos y costo por consulta."],
    project: ["Crie um pipeline pequeno até BigQuery ou um serviço no Cloud Run, com IAM mínimo, orçamento, logs e IaC.", "Build a small pipeline into BigQuery or a Cloud Run service with least-privilege IAM, budget, logs and IaC.", "Crea un pipeline pequeño hasta BigQuery o un servicio en Cloud Run, con IAM mínimo, presupuesto, logs e IaC."],
    fundamentals: ["Projects, IAM, VPC, compute, storage, BigQuery, Cloud Run, observabilidade, quotas e faturamento.", "Projects, IAM, VPC, compute, storage, BigQuery, Cloud Run, observability, quotas and billing.", "Projects, IAM, VPC, compute, storage, BigQuery, Cloud Run, observabilidad, cuotas y facturación."],
    prerequisites: ["linux", "tcp-ip", "dns", "sql"],
    relations: [{ technologyId: "python", type: "pairs-with" }, { technologyId: "terraform", type: "pairs-with" }]
  },
  prometheus: {
    practice: ["Prometheus coleta métricas rotuladas, permite consultas temporais e alimenta alertas sobre comportamento de serviços e infraestrutura.", "Prometheus collects labeled metrics, enables time-series queries and powers alerts about services and infrastructure.", "Prometheus recopila métricas etiquetadas, permite consultas temporales y alimenta alertas sobre servicios e infraestructura."],
    caution: ["Labels sem controle explodem cardinalidade; métricas não substituem logs ou traces e alertas sobre sintomas precisam de contexto operacional.", "Uncontrolled labels explode cardinality; metrics do not replace logs or traces, and symptom alerts need operational context.", "Labels sin control explotan cardinalidad; métricas no sustituyen logs ni traces y alertas sobre síntomas necesitan contexto operativo."],
    project: ["Instrumente uma API, defina SLI de erro e latência, crie alertas acionáveis e demonstre uma investigação com Grafana.", "Instrument an API, define error and latency SLIs, create actionable alerts and demonstrate an investigation with Grafana.", "Instrumenta una API, define SLI de error y latencia, crea alertas accionables y demuestra una investigación con Grafana."],
    fundamentals: ["Modelo de dados, labels, scraping, exporters, PromQL, recording rules, Alertmanager, retenção e cardinalidade.", "Data model, labels, scraping, exporters, PromQL, recording rules, Alertmanager, retention and cardinality.", "Modelo de datos, labels, scraping, exporters, PromQL, recording rules, Alertmanager, retención y cardinalidad."],
    prerequisites: ["metricas", "http", "linux"],
    relations: [{ technologyId: "grafana", type: "pairs-with" }, { technologyId: "kubernetes", type: "pairs-with" }]
  },
  kafka: {
    practice: ["Kafka é usado como log distribuído de eventos para integrar sistemas, processar streams e desacoplar produtores de consumidores.", "Kafka is used as a distributed event log to integrate systems, process streams and decouple producers from consumers.", "Kafka se usa como log distribuido de eventos para integrar sistemas, procesar streams y desacoplar productores de consumidores."],
    caution: ["Não é uma fila universal. Partições, ordenação, retenção, reprocessamento, schema e idempotência exigem desenho e operação maduros.", "It is not a universal queue. Partitions, ordering, retention, replay, schemas and idempotency require mature design and operations.", "No es una cola universal. Particiones, orden, retención, reproceso, schema e idempotencia exigen diseño y operación maduros."],
    project: ["Modele eventos de pedidos com schema versionado, consumidor idempotente, retry controlado e reprocessamento observado.", "Model order events with versioned schemas, an idempotent consumer, controlled retries and observable replay.", "Modela eventos de pedidos con schema versionado, consumidor idempotente, retry controlado y reproceso observable."],
    fundamentals: ["Brokers, topics, partitions, offsets, consumer groups, entrega, schemas, compactação, retenção e operação.", "Brokers, topics, partitions, offsets, consumer groups, delivery, schemas, compaction, retention and operations.", "Brokers, topics, partitions, offsets, consumer groups, entrega, schemas, compactación, retención y operación."],
    prerequisites: ["tcp-ip", "apis", "transacoes"],
    relations: [{ technologyId: "rabbitmq", type: "alternative" }, { technologyId: "springboot", type: "pairs-with" }]
  },
  nginx: {
    practice: ["NGINX atua como servidor web, proxy reverso, terminador TLS, cache e balanceador na borda de aplicações.", "NGINX acts as a web server, reverse proxy, TLS terminator, cache and load balancer at application edges.", "NGINX actúa como servidor web, proxy inverso, terminador TLS, caché y balanceador en el borde."],
    caution: ["Configurações copiadas podem abrir headers, cachear conteúdo privado ou quebrar timeouts. A borda precisa refletir o comportamento da aplicação.", "Copied configurations can expose headers, cache private content or break timeouts. The edge must reflect application behavior.", "Configuraciones copiadas pueden exponer headers, cachear contenido privado o romper timeouts. El borde debe reflejar la aplicación."],
    project: ["Configure TLS local, proxy para dois serviços, cache seletivo, limites de tamanho, logs correlacionados e healthcheck.", "Configure local TLS, proxying to two services, selective caching, size limits, correlated logs and health checks.", "Configura TLS local, proxy a dos servicios, caché selectivo, límites de tamaño, logs correlacionados y healthcheck."],
    fundamentals: ["Contexts, server/location, proxying, headers, TLS, cache, upstreams, timeouts, logs e reload seguro.", "Contexts, server/location, proxying, headers, TLS, caching, upstreams, timeouts, logs and safe reloads.", "Contexts, server/location, proxying, headers, TLS, caché, upstreams, timeouts, logs y reload seguro."],
    prerequisites: ["linux", "http", "dns", "tcp-ip"],
    relations: [{ technologyId: "docker", type: "pairs-with" }, { technologyId: "cloudflare", type: "pairs-with" }]
  },
  figma: {
    practice: ["Figma é usado para explorar fluxos, prototipar, manter componentes e comunicar decisões entre design, produto e engenharia.", "Figma is used to explore flows, prototype, maintain components and communicate decisions across design, product and engineering.", "Figma se usa para explorar flujos, prototipar, mantener componentes y comunicar decisiones entre diseño, producto e ingeniería."],
    caution: ["Dominar a ferramenta não é dominar UX. Telas sem problema, conteúdo, acessibilidade, estados e evidências continuam sendo apenas decoração.", "Mastering the tool is not mastering UX. Screens without a problem, content, accessibility, states and evidence remain decoration.", "Dominar la herramienta no es dominar UX. Pantallas sin problema, contenido, accesibilidad, estados y evidencia siguen siendo decoración."],
    project: ["Documente um fluxo completo com pesquisa, wireframe, componentes, variantes, tokens, protótipo acessível e handoff validado.", "Document a complete flow with research, wireframes, components, variants, tokens, an accessible prototype and validated handoff.", "Documenta un flujo completo con investigación, wireframe, componentes, variantes, tokens, prototipo accesible y handoff validado."],
    fundamentals: ["Frames, auto layout, componentes, variantes, variáveis, protótipos, bibliotecas, acessibilidade e handoff.", "Frames, auto layout, components, variants, variables, prototypes, libraries, accessibility and handoff.", "Frames, auto layout, componentes, variantes, variables, prototipos, bibliotecas, accesibilidad y handoff."],
    prerequisites: ["acessibilidade-web"],
    relations: [{ technologyId: "maze", type: "pairs-with" }, { technologyId: "css", type: "related-concept" }]
  },
  powerbi: {
    practice: ["Power BI conecta fontes, modela dados e distribui análises interativas em organizações que precisam de governança e autosserviço.", "Power BI connects sources, models data and distributes interactive analysis in organizations needing governance and self-service.", "Power BI conecta fuentes, modela datos y distribuye análisis interactivo en organizaciones que necesitan gobernanza y autoservicio."],
    caution: ["Um dashboard bonito não corrige métricas mal definidas. Modelos planos, DAX sem contexto e atualização opaca geram números inconsistentes.", "A polished dashboard does not fix poorly defined metrics. Flat models, context-blind DAX and opaque refreshes create inconsistent numbers.", "Un dashboard bonito no corrige métricas mal definidas. Modelos planos, DAX sin contexto y actualizaciones opacas generan números inconsistentes."],
    project: ["Construa um painel de vendas com modelo estrela, dicionário de métricas, DAX testado, segurança por linha e narrativa de decisão.", "Build a sales dashboard with a star schema, metric dictionary, tested DAX, row-level security and a decision narrative.", "Construye un panel de ventas con modelo estrella, diccionario de métricas, DAX probado, seguridad por fila y narrativa de decisión."],
    fundamentals: ["Power Query, modelo estrela, relações, contexto de filtro, DAX, visualização, atualização, RLS e publicação.", "Power Query, star schemas, relationships, filter context, DAX, visualization, refresh, RLS and publishing.", "Power Query, modelo estrella, relaciones, contexto de filtro, DAX, visualización, actualización, RLS y publicación."],
    prerequisites: ["modelagem-dados", "sql"],
    relations: [{ technologyId: "dbt", type: "pairs-with" }, { technologyId: "postgresql", type: "pairs-with" }]
  },
  dbt: {
    practice: ["dbt organiza transformações SQL em modelos versionados, testados e documentados dentro de warehouses analíticos.", "dbt organizes SQL transformations into versioned, tested and documented models inside analytical warehouses.", "dbt organiza transformaciones SQL en modelos versionados, probados y documentados dentro de warehouses analíticos."],
    caution: ["Não é ferramenta de ingestão nem substitui modelagem. DAGs enormes, macros opacas e testes superficiais transferem bagunça para o warehouse.", "It is not an ingestion tool and does not replace modeling. Huge DAGs, opaque macros and shallow tests move disorder into the warehouse.", "No es herramienta de ingesta ni sustituye modelado. DAG enormes, macros opacas y pruebas superficiales trasladan desorden al warehouse."],
    project: ["Modele vendas em staging, dimensões e fatos; adicione testes, documentação, incremental, freshness e análise de lineage.", "Model sales into staging, dimensions and facts; add tests, documentation, incrementals, freshness and lineage analysis.", "Modela ventas en staging, dimensiones y hechos; añade pruebas, documentación, incremental, freshness y análisis de lineage."],
    fundamentals: ["Models, sources, refs, materializations, tests, macros, snapshots, incremental, documentation e deployment.", "Models, sources, refs, materializations, tests, macros, snapshots, incrementals, documentation and deployment.", "Models, sources, refs, materializations, tests, macros, snapshots, incremental, documentación y deployment."],
    prerequisites: ["sql", "modelagem-dados", "git"],
    relations: [{ technologyId: "postgresql", type: "pairs-with" }, { technologyId: "powerbi", type: "pairs-with" }]
  },
  playwright: {
    practice: ["Playwright automatiza navegadores para verificar jornadas, compatibilidade e comportamento próximo do usuário em aplicações web.", "Playwright automates browsers to verify journeys, compatibility and user-like behavior in web applications.", "Playwright automatiza navegadores para verificar recorridos, compatibilidad y comportamiento cercano al usuario en aplicaciones web."],
    caution: ["E2E demais deixa feedback lento e instável. Seletores frágeis, espera manual e dados compartilhados mascaram regressões reais.", "Too much E2E makes feedback slow and unstable. Fragile selectors, manual waits and shared data mask real regressions.", "Demasiado E2E vuelve lento e inestable el feedback. Selectores frágiles, esperas manuales y datos compartidos ocultan regresiones."],
    project: ["Automatize três jornadas críticas com fixtures isoladas, seletores acessíveis, traces, execução paralela e relatório de flakiness.", "Automate three critical journeys with isolated fixtures, accessible selectors, traces, parallel execution and a flakiness report.", "Automatiza tres recorridos críticos con fixtures aisladas, selectores accesibles, traces, ejecución paralela e informe de flakiness."],
    fundamentals: ["Browser contexts, locators, auto-wait, fixtures, assertions, network, storage state, traces, paralelismo e CI.", "Browser contexts, locators, auto-waiting, fixtures, assertions, networking, storage state, traces, parallelism and CI.", "Browser contexts, locators, auto-wait, fixtures, assertions, network, storage state, traces, paralelismo y CI."],
    prerequisites: ["html", "http", "testes"],
    relations: [{ technologyId: "githubactions", type: "pairs-with" }, { technologyId: "vitest", type: "pairs-with" }]
  },
  wireshark: {
    practice: ["Wireshark captura e decodifica pacotes para diagnosticar resolução de nomes, conexões, protocolos e comportamentos inesperados.", "Wireshark captures and decodes packets to diagnose name resolution, connections, protocols and unexpected behavior.", "Wireshark captura y decodifica paquetes para diagnosticar resolución de nombres, conexiones, protocolos y comportamientos inesperados."],
    caution: ["Capturar tráfego sem autorização pode expor dados sensíveis. A ferramenta mostra pacotes, mas interpretar causa exige entender a pilha e o contexto.", "Capturing traffic without authorization can expose sensitive data. The tool shows packets, but finding causes requires stack and context knowledge.", "Capturar tráfico sin autorización puede exponer datos sensibles. La herramienta muestra paquetes, pero interpretar causas exige entender la pila y el contexto."],
    project: ["Registre uma navegação controlada, filtre DNS/TCP/TLS/HTTP, explique o handshake e identifique onde a latência foi introduzida.", "Record controlled browsing, filter DNS/TCP/TLS/HTTP, explain the handshake and identify where latency was introduced.", "Registra una navegación controlada, filtra DNS/TCP/TLS/HTTP, explica el handshake e identifica dónde apareció la latencia."],
    fundamentals: ["Captura, interfaces, filtros, camadas, TCP handshake, retransmissão, DNS, TLS, HTTP e preservação de evidência.", "Capture, interfaces, filters, layers, TCP handshakes, retransmission, DNS, TLS, HTTP and evidence preservation.", "Captura, interfaces, filtros, capas, TCP handshake, retransmisión, DNS, TLS, HTTP y preservación de evidencia."],
    prerequisites: ["tcp-ip", "dns", "http"],
    relations: [{ technologyId: "nmap", type: "pairs-with" }, { technologyId: "linux", type: "pairs-with" }]
  },
  nmap: {
    practice: ["Nmap descobre hosts e serviços e ajuda a validar exposição de rede em ambientes próprios ou explicitamente autorizados.", "Nmap discovers hosts and services and helps validate network exposure in owned or explicitly authorized environments.", "Nmap descubre hosts y servicios y ayuda a validar exposición de red en entornos propios o autorizados."],
    caution: ["Resultado de scan não é prova de vulnerabilidade e varreduras podem causar alerta ou impacto. Escopo e autorização vêm antes do comando.", "A scan result is not proof of vulnerability, and scans can trigger alerts or impact. Scope and authorization come before commands.", "Un resultado de scan no prueba vulnerabilidad y los escaneos pueden causar alertas o impacto. Alcance y autorización vienen antes del comando."],
    project: ["Mapeie um laboratório conhecido, compare o resultado ao inventário, investigue divergências e produza recomendações de exposição mínima.", "Map a known lab, compare results with inventory, investigate differences and produce least-exposure recommendations.", "Mapea un laboratorio conocido, compara resultados con inventario, investiga diferencias y produce recomendaciones de exposición mínima."],
    fundamentals: ["Descoberta, portas, estados, TCP/UDP, detecção de serviço, scripts, timing, saída estruturada, escopo e ética.", "Discovery, ports, states, TCP/UDP, service detection, scripts, timing, structured output, scope and ethics.", "Descubrimiento, puertos, estados, TCP/UDP, detección de servicio, scripts, timing, salida estructurada, alcance y ética."],
    prerequisites: ["tcp-ip", "linux"],
    relations: [{ technologyId: "wireshark", type: "pairs-with" }, { technologyId: "wazuh", type: "pairs-with" }]
  }
};

const prerequisiteText = (
  prerequisites: string[],
  catalog: Map<string, Technology>
) => {
  const names = prerequisites.map((id) => catalog.get(id)?.name ?? id);
  return localizedList(names, names, names);
};

export const applyDomainGuides = (technologies: Technology[]): Technology[] => {
  const catalog = new Map(technologies.map((item) => [item.id, item]));
  return technologies.map((technology) => {
    const profile = profiles[technology.id];
    if (!profile) return technology;
    const prerequisites = prerequisiteText(profile.prerequisites, catalog);
    return {
      ...technology,
      explanation: technology.description,
      problem: technology.description,
      inPractice: localized(...profile.practice),
      studyWhen: localized(
        `Priorize ${technology.name} quando os fundamentos listados abaixo já fizerem parte da sua prática e a tecnologia aparecer no tipo de produto que você quer construir.`,
        `Prioritize ${technology.name} when the foundations below are already part of your practice and it appears in the kind of product you want to build.`,
        `Prioriza ${technology.name} cuando las bases siguientes ya formen parte de tu práctica y aparezca en el tipo de producto que quieres construir.`
      ),
      notPriorityWhen: localized(...profile.caution),
      prerequisites,
      fundamentals: [localized(...profile.fundamentals)],
      strengths: [localized(...profile.practice)],
      limitations: [localized(...profile.caution)],
      useCases: [localized(...profile.practice)],
      examples: [localized(...profile.project)],
      commonMistakes: [
        localized(
          `Começar por ${technology.name} antes de dominar ${prerequisites.map((item) => item.pt).join(", ")} e copiar uma arquitetura sem conhecer o problema que a justificou.`,
          `Starting with ${technology.name} before mastering ${prerequisites.map((item) => item.en).join(", ")} and copying an architecture without knowing the problem that justified it.`,
          `Empezar por ${technology.name} antes de dominar ${prerequisites.map((item) => item.es).join(", ")} y copiar una arquitectura sin conocer el problema que la justificó.`
        )
      ],
      bestPractices: [localized(...profile.fundamentals)],
      studyOrder: [
        ...prerequisites,
        localized(...profile.fundamentals),
        localized(...profile.project)
      ],
      projectIdeas: [localized(...profile.project)],
      nextSteps: [
        localized(
          "Revise as relações abaixo e escolha apenas o próximo conceito que o projeto realmente exigir.",
          "Review the relationships below and choose only the next concept the project actually requires.",
          "Revisa las relaciones y elige solo el siguiente concepto que el proyecto realmente necesite."
        )
      ],
      relations: profile.relations ?? technology.relations,
      reviewedAt: "2026-06-30"
    };
  });
};
