import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
<<<<<<< Updated upstream
=======
import { CharacterDefs } from "@/components/characters/Characters";
import { AppShell } from "@/components/layout/AppShell";
import { ChildProfileGate } from "@/components/onboarding/ChildProfileGate";
>>>>>>> Stashed changes
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
<<<<<<< Updated upstream
      <body className="min-h-full antialiased">{children}</body>
=======
      <body className="min-h-full antialiased">
        <CharacterDefs />
        <AppShell>
          <ChildProfileGate>{children}</ChildProfileGate>
        </AppShell>
      </body>
>>>>>>> Stashed changes
    </html>
  );
}
