import { notFound } from "next/navigation";
import { CareerQuiz } from "@/components/career-quiz";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function QuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return <CareerQuiz locale={rawLocale as Locale} />;
}
