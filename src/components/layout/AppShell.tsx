import { Suspense } from "react";
import { AppNav } from "./AppNav";

interface AppShellProps {
  children: React.ReactNode;
}

/** Global frame: bottom tab bar on every page (home, shows, games, learn). */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-full bg-brand-off">
      <div className="relative mx-auto min-h-full w-full max-w-[430px] bg-white shadow-[0_0_40px_rgba(123,79,255,0.08)]">
        <Suspense fallback={null}>
          <AppNav />
        </Suspense>
        <main className="pb-[calc(4.5rem+env(safe-area-inset-bottom))]">{children}</main>
      </div>
    </div>
  );
}
