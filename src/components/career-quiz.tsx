"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { areas } from "@/data/content";
import { t, type Locale } from "@/lib/i18n";

type Answer = { label: Record<Locale, string>; scores: Record<string, number> };
type Question = { text: Record<Locale, string>; answers: Answer[] };

const questions: Question[] = [
  {
    text: { pt: "Que tipo de resultado dá mais satisfação?", en: "Which outcome feels most satisfying?", es: "¿Qué resultado te da más satisfacción?" },
    answers: [
      { label: { pt: "Uma interface clara que alguém usa sem ajuda", en: "A clear interface people use without help", es: "Una interfaz clara que alguien usa sin ayuda" }, scores: { frontend: 3, ux: 3 } },
      { label: { pt: "Um processo complexo funcionando sem falhar", en: "A complex process running without failure", es: "Un proceso complejo funcionando sin fallar" }, scores: { backend: 3, devops: 2 } },
      { label: { pt: "Uma conclusão útil escondida nos dados", en: "A useful finding hidden in data", es: "Una conclusión útil escondida en datos" }, scores: { dados: 3, ia: 2 } },
      { label: { pt: "Uma pessoa voltando a trabalhar depois de um problema", en: "Someone getting back to work after a problem", es: "Alguien volviendo a trabajar tras un problema" }, scores: { suporte: 3, seguranca: 1 } }
    ]
  },
  {
    text: { pt: "Diante de um erro difícil, qual impulso vem primeiro?", en: "Facing a hard error, what is your first impulse?", es: "Ante un error difícil, ¿cuál es tu primer impulso?" },
    answers: [
      { label: { pt: "Reproduzir, isolar variáveis e criar um teste", en: "Reproduce it, isolate variables and create a test", es: "Reproducir, aislar variables y crear una prueba" }, scores: { qa: 3, backend: 1 } },
      { label: { pt: "Olhar logs, métricas e o ambiente", en: "Check logs, metrics and the environment", es: "Mirar logs, métricas y el entorno" }, scores: { devops: 3, seguranca: 1 } },
      { label: { pt: "Observar a pessoa usando e perguntar onde travou", en: "Watch the person and ask where they got stuck", es: "Observar a la persona y preguntar dónde se atascó" }, scores: { ux: 3, suporte: 2 } },
      { label: { pt: "Inspecionar entradas, permissões e caminhos inesperados", en: "Inspect inputs, permissions and unexpected paths", es: "Inspeccionar entradas, permisos y caminos inesperados" }, scores: { seguranca: 3, backend: 2 } }
    ]
  },
  {
    text: { pt: "Qual ambiente parece menos cansativo para passar algumas horas?", en: "Which environment feels least tiring for a few hours?", es: "¿Qué entorno parece menos agotador durante unas horas?" },
    answers: [
      { label: { pt: "Editor, navegador e protótipos", en: "Editor, browser and prototypes", es: "Editor, navegador y prototipos" }, scores: { frontend: 3, ux: 2 } },
      { label: { pt: "Terminal, servidores e painéis operacionais", en: "Terminal, servers and operational dashboards", es: "Terminal, servidores y paneles operativos" }, scores: { devops: 3, cloud: 3, suporte: 1 } },
      { label: { pt: "Notebooks, consultas e experimentos", en: "Notebooks, queries and experiments", es: "Notebooks, consultas y experimentos" }, scores: { dados: 3, ia: 3 } },
      { label: { pt: "Documentação, cenários e automações de teste", en: "Documentation, scenarios and test automation", es: "Documentación, escenarios y automatización de pruebas" }, scores: { qa: 3, seguranca: 1 } }
    ]
  },
  {
    text: { pt: "Qual frase combina mais com o seu jeito?", en: "Which sentence sounds most like you?", es: "¿Qué frase se parece más a ti?" },
    answers: [
      { label: { pt: "Gosto de tornar coisas complexas compreensíveis", en: "I like making complex things understandable", es: "Me gusta hacer comprensible lo complejo" }, scores: { ux: 3, frontend: 2, dados: 1 } },
      { label: { pt: "Gosto de descobrir por que algo quebrou", en: "I like finding out why something broke", es: "Me gusta descubrir por qué algo se rompió" }, scores: { suporte: 2, qa: 3, devops: 2 } },
      { label: { pt: "Gosto de criar regras e estruturas consistentes", en: "I like creating consistent rules and structures", es: "Me gusta crear reglas y estructuras consistentes" }, scores: { backend: 3, cloud: 2 } },
      { label: { pt: "Gosto de encontrar padrões que não são óbvios", en: "I like finding patterns that are not obvious", es: "Me gusta encontrar patrones no evidentes" }, scores: { ia: 3, dados: 3, seguranca: 1 } }
    ]
  },
  {
    text: { pt: "Em um projeto em grupo, qual papel você assume naturalmente?", en: "In a group project, which role do you naturally take?", es: "En un proyecto grupal, ¿qué papel asumes naturalmente?" },
    answers: [
      { label: { pt: "Organizo o problema e desenho como a pessoa vai usar", en: "I frame the problem and design how people will use it", es: "Organizo el problema y diseño cómo se usará" }, scores: { ux: 3, frontend: 2 } },
      { label: { pt: "Penso nas regras, nos dados e nas exceções", en: "I think through rules, data and edge cases", es: "Pienso en reglas, datos y excepciones" }, scores: { backend: 3, qa: 2 } },
      { label: { pt: "Preparo o ambiente e evito que a entrega quebre", en: "I prepare the environment and keep delivery from breaking", es: "Preparo el entorno y evito fallos en la entrega" }, scores: { devops: 3, cloud: 3 } },
      { label: { pt: "Investigo evidências antes de propor uma resposta", en: "I investigate evidence before proposing an answer", es: "Investigo evidencias antes de proponer una respuesta" }, scores: { dados: 3, seguranca: 2, ia: 1 } }
    ]
  },
  {
    text: { pt: "Como você se sente sobre matemática e estatística?", en: "How do you feel about math and statistics?", es: "¿Cómo te sientes con matemáticas y estadística?" },
    answers: [
      { label: { pt: "Gosto e quero usar com frequência", en: "I enjoy them and want to use them often", es: "Me gustan y quiero usarlas a menudo" }, scores: { ia: 4, dados: 3 } },
      { label: { pt: "Uso quando ajuda a responder uma pergunta", en: "I use them when they help answer a question", es: "Las uso cuando ayudan a responder una pregunta" }, scores: { dados: 3, backend: 1, seguranca: 1 } },
      { label: { pt: "Prefiro lógica e estrutura a cálculos", en: "I prefer logic and structure over calculations", es: "Prefiero lógica y estructura a cálculos" }, scores: { backend: 3, devops: 2, qa: 2 } },
      { label: { pt: "Prefiro trabalhar com pessoas, linguagem e percepção", en: "I prefer working with people, language and perception", es: "Prefiero trabajar con personas, lenguaje y percepción" }, scores: { ux: 4, suporte: 3, frontend: 1 } }
    ]
  },
  {
    text: { pt: "Qual restrição de trabalho pesa mais para você?", en: "Which work constraint matters most to you?", es: "¿Qué restricción laboral pesa más para ti?" },
    answers: [
      { label: { pt: "Quero ver resultado visual com frequência", en: "I want frequent visual results", es: "Quiero ver resultados visuales a menudo" }, scores: { frontend: 4, ux: 3, dados: 1 } },
      { label: { pt: "Não me incomodo com problemas que levam dias para fechar", en: "I do not mind problems that take days to resolve", es: "No me molestan problemas que tardan días" }, scores: { seguranca: 3, backend: 3, ia: 2 } },
      { label: { pt: "Gosto de variedade e contato direto com usuários", en: "I like variety and direct contact with users", es: "Me gusta la variedad y el contacto con usuarios" }, scores: { suporte: 4, ux: 2 } },
      { label: { pt: "Aceito plantões se o trabalho for operacional e concreto", en: "I accept on-call work if it is operational and concrete", es: "Acepto guardias si el trabajo es operativo y concreto" }, scores: { devops: 4, cloud: 3, seguranca: 2 } }
    ]
  },
  {
    text: { pt: "Qual destes assuntos você abriria por curiosidade?", en: "Which topic would you open out of curiosity?", es: "¿Qué tema abrirías por curiosidad?" },
    answers: [
      { label: { pt: "Por que uma interface confunde as pessoas", en: "Why an interface confuses people", es: "Por qué una interfaz confunde a las personas" }, scores: { ux: 4, frontend: 2 } },
      { label: { pt: "Como uma requisição atravessa vários serviços", en: "How a request travels through several services", es: "Cómo una petición atraviesa varios servicios" }, scores: { backend: 4, cloud: 2, devops: 2 } },
      { label: { pt: "Como detectar uma atividade anormal em milhares de eventos", en: "How to detect abnormal activity across thousands of events", es: "Cómo detectar actividad anormal entre miles de eventos" }, scores: { seguranca: 4, dados: 2, ia: 2 } },
      { label: { pt: "Como impedir que um erro volte a acontecer", en: "How to prevent an error from happening again", es: "Cómo evitar que un error vuelva a ocurrir" }, scores: { qa: 4, devops: 2, suporte: 1 } }
    ]
  }
];

export function CareerQuiz({ locale }: { locale: Locale }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const done = index >= questions.length;
  const ranked = done ? [...areas].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0)) : [];
  const result = ranked[0] ?? null;

  const choose = (answer: Answer) => {
    if (transitioning) return;
    setSelectedAnswer(answer.label[locale]);
    setTransitioning(true);
    window.setTimeout(() => {
      setScores((current) => {
        const next = { ...current };
        Object.entries(answer.scores).forEach(([id, value]) => { next[id] = (next[id] ?? 0) + value; });
        return next;
      });
      setIndex((value) => value + 1);
      setSelectedAnswer("");
      setTransitioning(false);
    }, 260);
  };
  const restart = () => { setIndex(0); setScores({}); setSelectedAnswer(""); setTransitioning(false); setStarted(false); };

  if (!started) {
    return <div className="quiz-shell quiz-intro"><span className="eyebrow">{locale === "pt" ? "Orientação de carreira" : locale === "en" ? "Career orientation" : "Orientación profesional"}</span><h1>{locale === "pt" ? "Que tipo de problema combina com você?" : locale === "en" ? "What kind of problem fits you?" : "¿Qué tipo de problema encaja contigo?"}</h1><p>{locale === "pt" ? "São oito situações sobre rotina, interesse, forma de pensar e ambiente de trabalho. O resultado compara dez áreas do DevAtlas e mostra as três com maior compatibilidade." : locale === "en" ? "Eight situations cover routine, interests, thinking style and work environment. Your result compares ten DevAtlas fields and shows the top three matches." : "Ocho situaciones cubren rutina, intereses, forma de pensar y entorno. El resultado compara diez áreas y muestra las tres más compatibles."}</p><div className="quiz-method"><strong>{locale === "pt" ? "Como interpretar" : locale === "en" ? "How to interpret it" : "Cómo interpretarlo"}</strong><p>{locale === "pt" ? "Isto não mede capacidade e não substitui orientação profissional. Ele organiza preferências declaradas. Use o resultado para escolher o que pesquisar e experimentar em seguida." : locale === "en" ? "This does not measure ability or replace professional guidance. It organizes stated preferences. Use it to decide what to research and try next." : "No mide capacidad ni sustituye orientación profesional. Organiza preferencias para decidir qué investigar y probar."}</p></div><button className="button" onClick={() => setStarted(true)}>{locale === "pt" ? "Começar teste" : locale === "en" ? "Start test" : "Empezar test"}</button></div>;
  }

  if (done && result) {
    const topScore = scores[result.id] || 1;
    return <div className="quiz-shell quiz-result"><span className="eyebrow">{locale === "pt" ? "Maior compatibilidade" : locale === "en" ? "Strongest match" : "Mayor compatibilidad"}</span><h1>{t(result.name, locale)}</h1><p>{t(result.longDescription, locale)}</p><div className="result-reason"><strong>{locale === "pt" ? "Por que apareceu primeiro" : locale === "en" ? "Why it ranked first" : "Por qué quedó primero"}</strong><p>{locale === "pt" ? `Suas respostas se aproximaram de uma rotina com ${result.skills.slice(0, 2).map((item) => t(item, locale).toLowerCase()).join(" e ")}. A área também combina com sua preferência pelo tipo de problema apresentado nas situações.` : locale === "en" ? `Your answers aligned with work involving ${result.skills.slice(0, 2).map((item) => t(item, locale).toLowerCase()).join(" and ")}.` : `Tus respuestas se acercaron a una rutina con ${result.skills.slice(0, 2).map((item) => t(item, locale).toLowerCase()).join(" y ")}.`}</p></div><h2>{locale === "pt" ? "Seu ranking" : locale === "en" ? "Your ranking" : "Tu ranking"}</h2><div className="result-ranking">{ranked.slice(0, 3).map((area, position) => { const percent = Math.max(35, Math.round(((scores[area.id] ?? 0) / topScore) * 100)); return <Link href={`/${locale}/areas/${area.id}`} className="result-area" key={area.id}><span className="result-position">0{position + 1}</span><div><strong>{t(area.name, locale)}</strong><small>{t(area.description, locale)}</small><span className="result-bar"><i style={{ width: `${percent}%` }} /></span></div><b>{percent}%</b></Link>; })}</div><div className="button-row"><Link className="button" href={`/${locale}/areas/${result.id}`}>{locale === "pt" ? "Ver rotina e primeiro projeto" : locale === "en" ? "See routine and first project" : "Ver rutina y primer proyecto"}</Link><Link className="button secondary" href={`/${locale}/comparar`}>{locale === "pt" ? "Comparar as áreas" : locale === "en" ? "Compare fields" : "Comparar áreas"}</Link><button className="button ghost" onClick={restart}><RotateCcw size={16} />{locale === "pt" ? "Refazer" : locale === "en" ? "Try again" : "Repetir"}</button></div><p className="result-disclaimer">{locale === "pt" ? "Compatibilidade é relativa ao maior escore deste teste, não uma probabilidade de sucesso. Antes de decidir, faça o primeiro projeto sugerido das duas áreas mais altas." : locale === "en" ? "Compatibility is relative to your highest score, not a probability of success. Try a starter project in your top two fields before deciding." : "La compatibilidad es relativa al mayor puntaje, no una probabilidad de éxito. Prueba un proyecto inicial de las dos primeras áreas."}</p></div>;
  }

  const question = questions[index];
  const progressLabel = locale === "pt" ? `Questão ${index + 1} de ${questions.length}` : locale === "en" ? `Question ${index + 1} of ${questions.length}` : `Pregunta ${index + 1} de ${questions.length}`;
  return <div className="quiz-shell"><div className="quiz-progress" aria-label={progressLabel}><i style={{ width: `${(index / questions.length) * 100}%` }} /></div><section className={transitioning ? "quiz-question is-leaving" : "quiz-question"}><span className="eyebrow">{String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span><h1>{question.text[locale]}</h1><div className="quiz-options">{question.answers.map((answer) => { const selected = selectedAnswer === answer.label[locale]; return <button className={selected ? "quiz-option is-selected" : "quiz-option"} type="button" aria-pressed={selected} onClick={() => choose(answer)} key={answer.label[locale]}><span>{answer.label[locale]}</span>{selected && <span aria-hidden="true">✓</span>}</button>; })}</div></section></div>;
}
