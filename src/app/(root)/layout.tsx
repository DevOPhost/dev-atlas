import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const themeScript = "(function(){try{var t=localStorage.getItem('devatlas-theme');document.documentElement.dataset.theme=t?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}})()";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "DevAtlas | encontre seu caminho em tecnologia",
    template: "%s · DevAtlas"
  },
  description: "Um mapa prático para estudar, construir projetos e escolher uma carreira em tecnologia.",
  applicationName: "DevAtlas",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg"
  },
  openGraph: {
    type: "website",
    url: "/pt",
    siteName: "DevAtlas",
    title: "DevAtlas",
    description: "Tecnologia é grande. Seu próximo passo não precisa ser."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script>{themeScript}</script>
      </head>
      <body>{children}</body>
    </html>
  );
}
