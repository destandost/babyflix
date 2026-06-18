"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { getChildAge } from "@/lib/child-profile";
import { isGameAppropriateForAge } from "@/lib/recommendations";

const GAME_ROUTE_IDS: Record<string, string> = {
  "/games/sprout-valley": "sprout-valley",
};

export default function GamesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  useEffect(() => {
    const age = getChildAge();
    if (age === null) return;

    const gameId = GAME_ROUTE_IDS[pathname];
    if (!gameId) return;

    if (!isGameAppropriateForAge(gameId, age)) {
      router.replace("/games");
    }
  }, [pathname, router]);

  return children;
}
