import type { Localized } from "@/lib/i18n";

export const localized = (pt: string, en: string, es: string): Localized => ({
  pt,
  en,
  es
});

export const localizedList = (
  pt: string[],
  en: string[],
  es: string[]
): Localized[] => pt.map((item, index) => localized(item, en[index], es[index]));
