import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const htmlLanguage: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es"
};

export function localizedAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      "pt-BR": `/pt${suffix}`,
      en: `/en${suffix}`,
      es: `/es${suffix}`,
      "x-default": `/pt${suffix}`
    }
  };
}
