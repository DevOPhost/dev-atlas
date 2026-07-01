"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/browser-storage";
import type { Locale } from "@/lib/i18n";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = readStorage("devatlas-theme");
    const enabled = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = enabled ? "dark" : "light";
    setDark(enabled);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    writeStorage("devatlas-theme", next ? "dark" : "light");
  };

  return (
    <button
      className={dark ? "icon-button theme-toggle is-dark" : "icon-button theme-toggle"}
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark
        ? (locale === "pt" ? "Ativar modo claro" : locale === "en" ? "Use light mode" : "Activar modo claro")
        : (locale === "pt" ? "Ativar modo escuro" : locale === "en" ? "Use dark mode" : "Activar modo oscuro")}
    >
      <Sun className="theme-sun" size={18} />
      <Moon className="theme-moon" size={18} />
    </button>
  );
}
