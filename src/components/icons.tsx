import {
  BookOpenText, Braces, ChartNoAxesCombined, CloudCog, Container, DraftingCompass,
  LifeBuoy, PanelsTopLeft, ShieldCheck, Sparkles, TestTubeDiagonal
} from "lucide-react";

const icons = {
  PanelsTopLeft,
  Braces,
  ChartNoAxesCombined,
  Sparkles,
  Container,
  CloudCog,
  ShieldCheck,
  TestTubeDiagonal,
  DraftingCompass,
  LifeBuoy
};

export function AreaIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = icons[name as keyof typeof icons] ?? BookOpenText;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.7} />;
}
