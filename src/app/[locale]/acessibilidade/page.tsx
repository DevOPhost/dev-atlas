import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const c = locale === "pt"
    ? ["Acessibilidade", "Acesso não é uma etapa de acabamento.", "O DevAtlas foi construído com HTML semântico, foco visível, navegação por teclado, contraste, alvos confortáveis e respeito a movimento reduzido.", "Recursos presentes", ["Link para pular ao conteúdo", "Hierarquia de títulos e regiões semânticas", "Busca operável por teclado (Ctrl/⌘ + K)", "Tabelas com cabeçalhos e conteúdo legível sem cor", "Suporte a prefers-reduced-motion", "Tema claro e escuro com contraste"], "Limitações conhecidas", "A validação automatizada ajuda, mas não substitui testes com leitores de tela e pessoas com diferentes necessidades. Problemas encontrados devem virar correções, não apenas notas em auditoria."]
    : locale === "en"
      ? ["Accessibility", "Access is not a finishing step.", "DevAtlas uses semantic HTML, visible focus, keyboard navigation, contrast, comfortable targets and reduced-motion support.", "Included features", ["Skip-to-content link", "Heading hierarchy and semantic regions", "Keyboard-friendly search (Ctrl/⌘ + K)", "Tables with headers and information not conveyed by color alone", "prefers-reduced-motion support", "High-contrast light and dark themes"], "Known limitations", "Automated validation helps but does not replace screen reader testing and work with people who have different access needs. Found issues should become fixes, not audit footnotes."]
      : ["Accesibilidad", "El acceso no es una etapa de acabado.", "DevAtlas usa HTML semántico, foco visible, teclado, contraste, objetivos cómodos y movimiento reducido.", "Recursos incluidos", ["Enlace para saltar al contenido", "Jerarquía de títulos y regiones semánticas", "Búsqueda por teclado (Ctrl/⌘ + K)", "Tablas con encabezados e información que no depende solo del color", "Soporte a prefers-reduced-motion", "Temas claro y oscuro con contraste"], "Limitaciones conocidas", "La validación automática ayuda, pero no sustituye pruebas con lectores de pantalla y personas con distintas necesidades. Los problemas deben convertirse en correcciones, no solo notas."];
  return <div className="page-shell"><header className="page-hero"><Breadcrumbs locale={locale} items={[{ label: c[0] as string }]} /><span className="eyebrow">{c[0]}</span><h1>{c[1]}</h1><p>{c[2]}</p></header><article className="prose article-narrow"><h2>{c[3]}</h2><ul>{(c[4] as string[]).map((item) => <li key={item}>{item}</li>)}</ul><h2>{c[5]}</h2><p>{c[6]}</p></article></div>;
}
