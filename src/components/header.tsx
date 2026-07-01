"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { SearchDialog } from "./search-dialog";
import { ThemeToggle } from "./theme-toggle";

export function Header({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);
  const labels = locale === "pt"
    ? { home: "DevAtlas — página inicial", nav: "Navegação principal", open: "Abrir menu", close: "Fechar menu" }
    : locale === "en"
      ? { home: "DevAtlas — home page", nav: "Main navigation", open: "Open menu", close: "Close menu" }
      : { home: "DevAtlas — página de inicio", nav: "Navegación principal", open: "Abrir menú", close: "Cerrar menú" };
  const links = [
    [dict.nav.areas, `/${locale}/areas`],
    [locale === "pt" ? "Tecnologias" : locale === "en" ? "Technologies" : "Tecnologías", `/${locale}/tecnologias`],
    [locale === "pt" ? "Carreira" : locale === "en" ? "Career" : "Carrera", `/${locale}/carreira`],
    [dict.nav.projects, `/${locale}/projetos`],
    [locale === "pt" ? "Teste vocacional" : locale === "en" ? "Career test" : "Test vocacional", `/${locale}/quiz`]
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href={`/${locale}`} aria-label={labels.home}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>DevAtlas</span>
        </Link>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={labels.nav}>
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </nav>
        <div className="header-tools">
          <SearchDialog locale={locale} />
          <LanguageSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? labels.close : labels.open}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
