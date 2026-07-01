"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { readStorage, removeStorage, writeStorage } from "@/lib/browser-storage";
import type { RoadmapStep } from "@/lib/content-types";
import { t, type Locale } from "@/lib/i18n";

export function RoadmapProgress({
  roadmapId,
  steps,
  locale
}: {
  roadmapId: string;
  steps: RoadmapStep[];
  locale: Locale;
}) {
  const [completed, setCompleted] = useState<number[]>([]);
  const storageKey = `devatlas-roadmap:${roadmapId}`;
  const labels = locale === "pt"
    ? { progress: "Progresso neste dispositivo", complete: "Marcar etapa como concluída", undo: "Desmarcar etapa", objective: "Objetivo", study: "O que estudar", practice: "O que praticar", checkpoint: "Critério para avançar", done: "concluído" }
    : locale === "en"
      ? { progress: "Progress on this device", complete: "Mark stage as complete", undo: "Unmark stage", objective: "Goal", study: "What to study", practice: "What to practice", checkpoint: "Ready-to-move checkpoint", done: "complete" }
      : { progress: "Progreso en este dispositivo", complete: "Marcar etapa como completada", undo: "Desmarcar etapa", objective: "Objetivo", study: "Qué estudiar", practice: "Qué practicar", checkpoint: "Criterio para avanzar", done: "completado" };

  useEffect(() => {
    try {
      const saved = JSON.parse(readStorage(storageKey) ?? "[]");
      if (Array.isArray(saved)) {
        setCompleted(
          saved.filter(
            (item) => Number.isInteger(item) && item >= 0 && item < steps.length
          )
        );
      }
    } catch {
      removeStorage(storageKey);
    }
  }, [steps.length, storageKey]);

  const toggle = (index: number) => {
    setCompleted((current) => {
      const next = current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
      writeStorage(storageKey, JSON.stringify(next));
      return next;
    });
  };
  const percent = Math.round((completed.length / steps.length) * 100);

  return (
    <section className="interactive-roadmap" aria-label={labels.progress}>
      <div className="roadmap-progress-head">
        <div><strong>{labels.progress}</strong><span>{completed.length}/{steps.length} · {percent}% {labels.done}</span></div>
        <span className="roadmap-progress-track"><i style={{ width: `${percent}%` }} /></span>
      </div>
      <div className="roadmap-timeline">
        {steps.map((item, index) => {
          const done = completed.includes(index);
          return (
            <section className={done ? "timeline-step is-complete" : "timeline-step"} key={t(item.title, locale)}>
              <button type="button" onClick={() => toggle(index)} aria-label={done ? labels.undo : labels.complete} aria-pressed={done}>
                <Check size={14} />
              </button>
              <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
              <h2>{t(item.title, locale)}</h2>
              <p>{t(item.description, locale)}</p>
              {item.study?.length && <div className="roadmap-study"><strong>{labels.study}</strong><ul>{item.study.map((subject) => <li key={t(subject, locale)}>{t(subject, locale)}</li>)}</ul></div>}
              {item.practice && <p><strong>{labels.practice}:</strong> {t(item.practice, locale)}</p>}
              <p className="checkpoint"><strong>{labels.checkpoint}:</strong> {t(item.checkpoint, locale)}</p>
            </section>
          );
        })}
      </div>
    </section>
  );
}
