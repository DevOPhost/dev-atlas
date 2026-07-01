"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function ReadingTools({ locale }: { locale: Locale }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrollY / total) * 100) : 0);
      setVisible(scrollY > 650);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <div className="reading-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      {visible && <button className="back-to-top" type="button" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} aria-label={locale === "pt" ? "Voltar ao topo" : locale === "en" ? "Back to top" : "Volver arriba"}><ArrowUp size={18} /></button>}
    </>
  );
}
