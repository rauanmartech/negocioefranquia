import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Negócio e Franquia | Inteligência de Mercado",
    template: "%s | Negócio e Franquia",
  },
  description:
    "O principal ecossistema de conteúdo, mídia e relacionamento dos mercados de franquias, varejo e shopping centers.",
  metadataBase: new URL("https://negocioefranquia.com.br"),
  openGraph: {
    siteName: "Negócio e Franquia",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

