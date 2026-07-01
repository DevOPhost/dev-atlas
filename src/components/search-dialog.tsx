"use client";

import Fuse from "fuse.js";
import { ArrowDown, ArrowUp, CornerDownLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { areas, glossary, projects, roadmaps, technologies } from "@/data/content";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { trapFocus } from "@/lib/focus";

type SearchItem = { id: string; title: string; description: string; type: string; href: string };

export function SearchDialog({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const router = useRouter();
  const dict = getDictionary(locale);
  const items = useMemo<SearchItem[]>(() => [
    ...areas.map((item) => ({ id: item.id, title: t(item.name, locale), description: t(item.description, locale), type: locale === "en" ? "Field" : locale === "es" ? "Área" : "Área", href: `/${locale}/areas/${item.id}` })),
    ...technologies.map((item) => ({ id: item.id, title: item.name, description: t(item.description, locale), type: locale === "pt" ? "Tecnologia" : locale === "en" ? "Technology" : "Tecnología", href: `/${locale}/tecnologias/${item.id}` })),
    ...roadmaps.map((item) => ({ id: item.id, title: t(item.title, locale), description: t(item.description, locale), type: "Roadmap", href: `/${locale}/roadmaps/${item.id}` })),
    ...projects.map((item) => ({ id: item.id, title: t(item.title, locale), description: t(item.description, locale), type: locale === "en" ? "Project" : locale === "es" ? "Proyecto" : "Projeto", href: `/${locale}/projetos/${item.id}` })),
    ...glossary.map((item) => ({ id: item.id, title: item.term, description: t(item.simple, locale), type: locale === "en" ? "Glossary" : locale === "es" ? "Glosario" : "Glossário", href: `/${locale}/glossario#${item.id}` }))
  ], [locale]);
  const fuse = useMemo(() => new Fuse(items, { keys: ["title", "description", "type"], threshold: 0.34 }), [items]);
  const results = query.trim() ? fuse.search(query).slice(0, 8).map((result) => result.item) : items.slice(0, 6);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", listener);
    return () => removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (wasOpen.current) {
      wasOpen.current = false;
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  const choose = (item: SearchItem) => {
    close();
    router.push(item.href);
  };

  const handleKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (value + 1) % Math.max(results.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (value - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
    }
    if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <>
      <button ref={triggerRef} className="search-trigger" onClick={() => setOpen(true)} type="button">
        <Search size={17} aria-hidden="true" />
        <span>{dict.common.search}</span>
        <kbd>Ctrl K</kbd>
      </button>
      {open && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={close}>
          <section ref={dialogRef} className="search-dialog" role="dialog" aria-modal="true" aria-label={dict.common.search} onKeyDown={(event) => trapFocus(event, dialogRef.current)} onMouseDown={(event) => event.stopPropagation()}>
            <div className="search-input-wrap">
              <Search size={20} aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeys}
                placeholder={dict.common.searchHint}
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
              />
              <button className="icon-button" onClick={close} aria-label={locale === "pt" ? "Fechar busca" : locale === "en" ? "Close search" : "Cerrar búsqueda"}><X size={18} /></button>
            </div>
            <div className="search-results" id="search-results" role="listbox" aria-live="polite">
              {results.map((item, index) => (
                <Link
                  id={`search-result-${index}`}
                  role="option"
                  aria-selected={index === active}
                  className={index === active ? "is-active" : ""}
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  onClick={close}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className="result-type">{item.type}</span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </Link>
              ))}
              {!results.length && <p className="empty-state">{dict.common.noResults}</p>}
            </div>
            <footer className="search-footer">
              <span><ArrowUp size={12} /><ArrowDown size={12} />{locale === "pt" ? "navegar" : locale === "en" ? "navigate" : "navegar"}</span>
              <span><CornerDownLeft size={12} />{locale === "pt" ? "abrir" : locale === "en" ? "open" : "abrir"}</span>
              <span>esc&nbsp; {locale === "pt" ? "fechar" : locale === "en" ? "close" : "cerrar"}</span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
