import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const text = locale === "pt"
    ? { line: "Um mapa para quem prefere entender o caminho antes de correr.", explore: "Explorar", about: "Sobre", a11y: "Acessibilidade", note: "Conteúdo educacional. Tecnologias mudam; fundamentos ficam." }
    : locale === "en"
      ? { line: "A map for people who prefer to understand the path before rushing.", explore: "Explore", about: "About", a11y: "Accessibility", note: "Educational content. Technology changes; foundations remain." }
      : { line: "Un mapa para quien prefiere entender el camino antes de correr.", explore: "Explorar", about: "Acerca de", a11y: "Accesibilidad", note: "Contenido educativo. La tecnología cambia; los fundamentos permanecen." };

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <span className="footer-brand">DevAtlas</span>
          <p>{text.line}</p>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/explorar`}>{text.explore}</Link>
          <Link href={`/${locale}/sobre`}>{text.about}</Link>
          <Link href={`/${locale}/acessibilidade`}>{text.a11y}</Link>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} DevAtlas</span><span>{text.note}</span></div>
    </footer>
  );
}
