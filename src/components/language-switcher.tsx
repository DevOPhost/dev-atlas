"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { writeStorage } from "@/lib/browser-storage";
import { languageNames, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const codes: Record<Locale, string> = { pt: "PT", en: "EN", es: "ES" };

  const changeLanguage = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    writeStorage("devatlas-locale", next);
    router.push(segments.join("/") || `/${next}`);
    setOpen(false);
  };

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    addEventListener("pointerdown", close);
    addEventListener("keydown", escape);
    return () => {
      removeEventListener("pointerdown", close);
      removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <div className="language-menu" ref={rootRef}>
      <button className="language-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu">
        <Languages size={17} aria-hidden="true" />
        <span className="language-code">{codes[locale]}</span>
        <span className="language-current">{languageNames[locale]}</span>
        <ChevronDown className={open ? "rotated" : ""} size={14} aria-hidden="true" />
      </button>
      <div
        className={open ? "language-popover is-open" : "language-popover"}
        role="menu"
        aria-label={locale === "pt" ? "Escolher idioma" : locale === "en" ? "Choose language" : "Elegir idioma"}
      >
        <span className="language-popover-label">{locale === "pt" ? "Idioma do site" : locale === "en" ? "Site language" : "Idioma del sitio"}</span>
        {locales.map((item) => (
          <button type="button" role="menuitemradio" aria-checked={item === locale} onClick={() => changeLanguage(item)} key={item}>
            <span className="language-option-code">{codes[item]}</span>
            <span><strong>{languageNames[item]}</strong><small>{item === "pt" ? "Brasil" : item === "en" ? "International" : "Latinoamérica"}</small></span>
            {item === locale && <Check size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
}
