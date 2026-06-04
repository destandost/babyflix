import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { CharacterDefs } from "@/components/characters/Characters";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "babyflix — Shows, games & learning for kids",
  description:
    "Educational entertainment for ages 2–7: shows, games, lessons, leaderboard, and parent progress reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CharacterDefs />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
