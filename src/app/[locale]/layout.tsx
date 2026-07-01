import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ReadingTools } from "@/components/reading-tools";
import { MotionSystem } from "@/components/motion-system";
import type { Metadata } from "next";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { htmlLanguage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const themeScript = "(function(){try{var t=localStorage.getItem('devatlas-theme');document.documentElement.dataset.theme=t?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}})()";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = {
    pt: {
      title: "Encontre seu caminho em tecnologia",
      description: "Um guia gratuito para entender áreas, tecnologias e caminhos de carreira em tecnologia.",
      openGraphLocale: "pt_BR"
    },
    en: {
      title: "Find your path in technology",
      description: "A free guide to understanding technology fields, tools and career paths.",
      openGraphLocale: "en"
    },
    es: {
      title: "Encuentra tu camino en tecnología",
      description: "Una guía gratuita para entender áreas, tecnologías y caminos profesionales.",
      openGraphLocale: "es"
    }
  };
  const current = copy[locale];
  return {
    metadataBase: siteUrl,
    title: {
      default: current.title,
      template: "%s · DevAtlas"
    },
    description: current.description,
    applicationName: "DevAtlas",
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg"
    },
    openGraph: {
      title: `DevAtlas | ${current.title}`,
      description: current.description,
      locale: current.openGraphLocale,
      siteName: "DevAtlas",
      type: "website",
      url: `/${locale}`
    },
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  return (
    <html lang={htmlLanguage[locale]} suppressHydrationWarning>
      <head>
        <script>{themeScript}</script>
      </head>
      <body>
        <a className="skip-link" href="#conteudo">
          {locale === "pt" ? "Pular para o conteúdo" : locale === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <Header locale={locale} />
        <ReadingTools locale={locale} />
        <MotionSystem />
        <main id="conteudo">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
