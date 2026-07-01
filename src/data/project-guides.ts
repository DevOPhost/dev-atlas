import type { Project } from "@/lib/content-types";
import { localized } from "./localized";

type ProjectEditorial = {
  problem: [string, string, string];
  avoid: [string, string, string];
  differentials: [string, string, string];
  professionalProof: [string, string, string];
};

const editorial: Record<string, ProjectEditorial> = {
  "painel-financeiro": {
    problem: ["Transformar lançamentos dispersos em uma leitura clara de saldo, categorias e comportamento ao longo do tempo.", "Turn scattered transactions into a clear view of balance, categories and behavior over time.", "Convertir movimientos dispersos en una lectura clara de saldo, categorías y comportamiento en el tiempo."],
    avoid: ["Não faça apenas três gráficos com dados fixos. Sem entrada, filtro, estado vazio e tratamento de valores, o projeto não demonstra produto.", "Do not build only three charts with fixed data. Without input, filters, empty states and value handling, it does not demonstrate product thinking.", "No hagas solo tres gráficos con datos fijos. Sin entrada, filtros, estados vacíos y manejo de valores, no demuestra pensamiento de producto."],
    differentials: ["Inclua importação CSV, categorias editáveis, navegação por teclado e uma explicação de como os totais são calculados.", "Add CSV import, editable categories, keyboard navigation and an explanation of how totals are calculated.", "Incluye importación CSV, categorías editables, navegación por teclado y una explicación de cómo se calculan los totales."],
    professionalProof: ["Mostre decisões responsivas, testes dos cálculos e uma auditoria curta de acessibilidade no README.", "Show responsive decisions, calculation tests and a short accessibility audit in the README.", "Muestra decisiones responsivas, pruebas de cálculos y una auditoría breve de accesibilidad en el README."]
  },
  "api-chamados": {
    problem: ["Organizar solicitações, responsáveis, prioridade e histórico sem perder controle de acesso ou rastreabilidade.", "Organize requests, ownership, priority and history without losing access control or traceability.", "Organizar solicitudes, responsables, prioridad e historial sin perder control de acceso ni trazabilidad."],
    avoid: ["Evite uma API CRUD sem regras. Chamados precisam de transições válidas, permissões, auditoria e respostas de erro consistentes.", "Avoid a rule-free CRUD API. Tickets need valid transitions, permissions, audit trails and consistent error responses.", "Evita una API CRUD sin reglas. Los tickets necesitan transiciones válidas, permisos, auditoría y errores consistentes."],
    differentials: ["Modele SLA, idempotência, paginação, concorrência de atualização e um contrato OpenAPI que reflita o comportamento real.", "Model SLAs, idempotency, pagination, update concurrency and an OpenAPI contract that reflects real behavior.", "Modela SLA, idempotencia, paginación, concurrencia de actualización y un contrato OpenAPI fiel al comportamiento real."],
    professionalProof: ["Inclua testes de integração, migration, seed mínimo, diagrama de dados e exemplos de autorização negada.", "Include integration tests, migrations, a minimal seed, a data diagram and denied-authorization examples.", "Incluye pruebas de integración, migraciones, seed mínimo, diagrama de datos y ejemplos de autorización denegada."]
  },
  "plataforma-estudos": {
    problem: ["Ajudar uma pessoa a organizar materiais e acompanhar prática sem transformar progresso em uma contagem vazia de aulas.", "Help someone organize material and track practice without reducing progress to an empty lesson count.", "Ayudar a organizar materiales y seguir la práctica sin reducir el progreso a un conteo vacío de clases."],
    avoid: ["Não tente reproduzir uma escola online inteira. Escolha uma jornada: organizar uma trilha, registrar evidências e retomar o próximo passo.", "Do not recreate an entire online school. Choose one journey: organize a path, record evidence and resume the next step.", "No intentes reproducir una escuela online completa. Elige un recorrido: organizar una ruta, registrar evidencia y retomar el siguiente paso."],
    differentials: ["Use busca com URL compartilhável, progresso baseado em evidência, conteúdo acessível e limites claros entre servidor e cliente.", "Use shareable search URLs, evidence-based progress, accessible content and clear server/client boundaries.", "Usa búsqueda con URL compartible, progreso basado en evidencia, contenido accesible y límites claros entre servidor y cliente."],
    professionalProof: ["Documente arquitetura, modelo de autorização, estratégia de cache, metadados e decisões que reduziram o escopo.", "Document architecture, authorization model, caching strategy, metadata and decisions that reduced scope.", "Documenta arquitectura, modelo de autorización, estrategia de caché, metadatos y decisiones que redujeron el alcance."]
  },
  "pipeline-vendas": {
    problem: ["Transformar fontes de vendas inconsistentes em métricas reproduzíveis e compreensíveis por quem toma decisões.", "Turn inconsistent sales sources into reproducible metrics understood by decision makers.", "Convertir fuentes de ventas inconsistentes en métricas reproducibles y comprensibles para quienes deciden."],
    avoid: ["Não esconda limpeza e regras de negócio em um notebook único. O valor está na rastreabilidade da origem ao indicador.", "Do not hide cleaning and business rules in a single notebook. The value lies in traceability from source to metric.", "No ocultes limpieza y reglas de negocio en un único notebook. El valor está en la trazabilidad desde la fuente hasta el indicador."],
    differentials: ["Inclua dados atrasados, duplicados e inválidos; modele dimensões, testes de qualidade, atualização incremental e dicionário de métricas.", "Include late, duplicate and invalid data; model dimensions, quality tests, incremental updates and a metric dictionary.", "Incluye datos tardíos, duplicados e inválidos; modela dimensiones, pruebas de calidad, actualización incremental y diccionario de métricas."],
    professionalProof: ["Mostre lineage, decisões de modelagem, consultas de validação e como uma falha seria detectada antes do dashboard.", "Show lineage, modeling decisions, validation queries and how a failure would be caught before the dashboard.", "Muestra lineage, decisiones de modelado, consultas de validación y cómo se detectaría un fallo antes del dashboard."]
  },
  "assistente-rag": {
    problem: ["Responder sobre um conjunto documental delimitado, recuperando evidências e deixando claro quando a base não sustenta a resposta.", "Answer from a bounded document set by retrieving evidence and making uncertainty explicit when sources do not support an answer.", "Responder sobre un conjunto documental delimitado, recuperando evidencia y dejando claro cuando las fuentes no sostienen la respuesta."],
    avoid: ["Não apresente apenas um chat conectado a um modelo. Sem avaliação de recuperação, citações verificáveis e casos de recusa, não há evidência de qualidade.", "Do not present only a chat connected to a model. Without retrieval evaluation, verifiable citations and refusal cases, there is no quality evidence.", "No presentes solo un chat conectado a un modelo. Sin evaluación de recuperación, citas verificables y casos de rechazo, no hay evidencia de calidad."],
    differentials: ["Crie um conjunto de perguntas com respostas esperadas, meça recuperação, registre custo e latência e trate documentos maliciosos.", "Build a question set with expected answers, measure retrieval, record cost and latency and handle malicious documents.", "Crea un conjunto de preguntas con respuestas esperadas, mide recuperación, registra costo y latencia y trata documentos maliciosos."],
    professionalProof: ["Publique relatório de avaliação, arquitetura, limites conhecidos, política de dados e exemplos em que o sistema decide não responder.", "Publish an evaluation report, architecture, known limitations, data policy and examples where the system refuses to answer.", "Publica informe de evaluación, arquitectura, límites conocidos, política de datos y ejemplos donde el sistema decide no responder."]
  },
  "entrega-observavel": {
    problem: ["Levar uma mudança do repositório ao ambiente com validação, sinais operacionais e um caminho seguro de recuperação.", "Move a change from repository to environment with validation, operational signals and a safe recovery path.", "Llevar un cambio del repositorio al entorno con validación, señales operativas y un camino seguro de recuperación."],
    avoid: ["Não confunda um pipeline verde com entrega confiável. É preciso verificar a aplicação depois do deploy e saber reverter.", "Do not confuse a green pipeline with reliable delivery. The application must be verified after deployment and be reversible.", "No confundas un pipeline verde con entrega confiable. Hay que verificar la aplicación después del deploy y saber revertir."],
    differentials: ["Inclua artefato imutável, ambientes protegidos, healthcheck, rollback, métricas de serviço e uma falha simulada.", "Include an immutable artifact, protected environments, health checks, rollback, service metrics and a simulated failure.", "Incluye artefacto inmutable, entornos protegidos, healthcheck, rollback, métricas de servicio y un fallo simulado."],
    professionalProof: ["Apresente o fluxo em diagrama, histórico de uma execução, runbook e uma retrospectiva curta do incidente simulado.", "Present a flow diagram, an execution record, a runbook and a short retrospective of the simulated incident.", "Presenta el flujo en un diagrama, historial de ejecución, runbook y una retrospectiva breve del incidente simulado."]
  },
  "infra-terraform": {
    problem: ["Criar um ambiente cloud reproduzível com acesso mínimo, custo conhecido e remoção segura dos recursos.", "Create a reproducible cloud environment with least privilege, known cost and safe resource teardown.", "Crear un entorno cloud reproducible con acceso mínimo, costo conocido y eliminación segura de recursos."],
    avoid: ["Não publique credenciais nem crie uma arquitetura grande para parecer avançado. Complexidade sem necessidade só aumenta custo e superfície de ataque.", "Do not publish credentials or build a large architecture to look advanced. Unneeded complexity only increases cost and attack surface.", "No publiques credenciales ni construyas una arquitectura grande para parecer avanzado. La complejidad innecesaria aumenta costo y superficie de ataque."],
    differentials: ["Use módulos pequenos, estado remoto protegido, política de custo, tags, revisão do plano e destruição automatizada do laboratório.", "Use small modules, protected remote state, a cost policy, tags, plan review and automated lab teardown.", "Usa módulos pequeños, estado remoto protegido, política de costo, tags, revisión del plan y destrucción automatizada del laboratorio."],
    professionalProof: ["Inclua threat model simples, estimativa antes/depois, saída de um plano revisado e procedimento comprovado de recuperação.", "Include a simple threat model, before/after estimate, reviewed plan output and a proven recovery procedure.", "Incluye threat model simple, estimación antes/después, salida de un plan revisado y procedimiento probado de recuperación."]
  },
  "laboratorio-defensivo": {
    problem: ["Observar um ambiente controlado, reconhecer atividade suspeita e produzir uma investigação reproduzível.", "Observe a controlled environment, recognize suspicious activity and produce a reproducible investigation.", "Observar un entorno controlado, reconocer actividad sospechosa y producir una investigación reproducible."],
    avoid: ["Não execute testes em sistemas de terceiros nem transforme capturas de tela de alertas em investigação. Defina autorização, hipótese e evidência.", "Do not test third-party systems or turn alert screenshots into an investigation. Define authorization, hypothesis and evidence.", "No pruebes sistemas de terceros ni conviertas capturas de alertas en investigación. Define autorización, hipótesis y evidencia."],
    differentials: ["Gere eventos benignos e maliciosos conhecidos, ajuste regras, reduza falsos positivos e documente contenção e recuperação.", "Generate known benign and malicious events, tune rules, reduce false positives and document containment and recovery.", "Genera eventos benignos y maliciosos conocidos, ajusta reglas, reduce falsos positivos y documenta contención y recuperación."],
    professionalProof: ["Entregue timeline, fontes de log, regra criada, evidências preservadas, impacto e recomendações priorizadas.", "Deliver a timeline, log sources, the created rule, preserved evidence, impact and prioritized recommendations.", "Entrega timeline, fuentes de log, regla creada, evidencia preservada, impacto y recomendaciones priorizadas."]
  },
  "suite-e2e": {
    problem: ["Proteger as jornadas de maior risco de uma loja sem criar uma suíte lenta e instável.", "Protect a store's highest-risk journeys without creating a slow, unstable suite.", "Proteger los recorridos de mayor riesgo de una tienda sin crear una suite lenta e inestable."],
    avoid: ["Não automatize toda combinação pela interface. E2E deve cobrir risco crítico; regras menores pertencem a testes mais rápidos.", "Do not automate every combination through the UI. E2E should cover critical risk; smaller rules belong in faster tests.", "No automatices cada combinación por la interfaz. E2E debe cubrir riesgo crítico; reglas menores van en pruebas más rápidas."],
    differentials: ["Use dados controlados, seletores por papel, traces de falha, execução paralela e medição explícita de flakiness.", "Use controlled data, role-based selectors, failure traces, parallel execution and explicit flakiness measurement.", "Usa datos controlados, selectores por rol, traces de fallo, ejecución paralela y medición explícita de flakiness."],
    professionalProof: ["Mostre matriz de risco, fronteira entre camadas, relatório de CI e um caso real em que o teste encontrou regressão.", "Show a risk matrix, boundaries between layers, a CI report and a real case where the test caught a regression.", "Muestra matriz de riesgo, frontera entre capas, informe de CI y un caso real donde la prueba detectó una regresión."]
  },
  "case-servico": {
    problem: ["Reduzir uma fricção real em um serviço público sem assumir que a primeira solução visual está correta.", "Reduce real friction in a public service without assuming the first visual solution is correct.", "Reducir una fricción real en un servicio público sin asumir que la primera solución visual es correcta."],
    avoid: ["Não invente entrevistas nem apresente apenas telas finais. Diferencie evidência, hipótese, restrição e decisão.", "Do not invent interviews or present only final screens. Separate evidence, hypothesis, constraint and decision.", "No inventes entrevistas ni presentes solo pantallas finales. Separa evidencia, hipótesis, restricción y decisión."],
    differentials: ["Inclua recrutamento e roteiro, achados rastreáveis, conteúdo acessível, protótipo testado e mudanças causadas pelos testes.", "Include recruitment and script, traceable findings, accessible content, a tested prototype and changes caused by testing.", "Incluye reclutamiento y guion, hallazgos rastreables, contenido accesible, prototipo probado y cambios causados por las pruebas."],
    professionalProof: ["O case deve explicar contexto, seu papel, método, limites, decisões descartadas e efeito esperado, não apenas estética.", "The case should explain context, your role, method, limitations, rejected decisions and expected effect, not only aesthetics.", "El caso debe explicar contexto, tu rol, método, límites, decisiones descartadas y efecto esperado, no solo estética."]
  },
  "base-conhecimento": {
    problem: ["Diminuir tempo de diagnóstico e respostas inconsistentes em problemas recorrentes de suporte.", "Reduce troubleshooting time and inconsistent responses for recurring support issues.", "Reducir tiempo de diagnóstico y respuestas inconsistentes en problemas recurrentes de soporte."],
    avoid: ["Não copie artigos genéricos nem registre apenas a solução final. Um bom artigo informa sintomas, escopo, riscos e validação.", "Do not copy generic articles or record only the final fix. A good article includes symptoms, scope, risks and validation.", "No copies artículos genéricos ni registres solo la solución final. Un buen artículo incluye síntomas, alcance, riesgos y validación."],
    differentials: ["Crie taxonomia, busca, histórico de revisão, artigos ligados a chamados e um processo para confirmar se a solução ainda funciona.", "Create a taxonomy, search, review history, articles linked to tickets and a process to confirm solutions still work.", "Crea taxonomía, búsqueda, historial de revisión, artículos ligados a tickets y un proceso para confirmar que la solución aún funciona."],
    professionalProof: ["Mostre antes/depois de um atendimento simulado, evidências de validação por outra pessoa e critérios para arquivar conteúdo.", "Show before/after for a simulated support case, validation evidence from another person and criteria for archiving content.", "Muestra antes/después de un caso simulado, evidencia de validación por otra persona y criterios para archivar contenido."]
  }
};

export const enhanceProjects = (projects: Project[]): Project[] =>
  projects.map((project) => {
    const guide = editorial[project.id];
    if (!guide) return project;
    return {
      ...project,
      objective: project.description,
      problem: localized(...guide.problem),
      deliverables: project.features,
      avoid: [localized(...guide.avoid)],
      differentials: [localized(...guide.differentials)],
      professionalProof: [localized(...guide.professionalProof)]
    };
  });
