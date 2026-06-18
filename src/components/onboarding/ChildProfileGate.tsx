"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  CHILD_AGE_CHANGED_EVENT,
  hasChildAge,
} from "@/lib/child-profile";

const SKIP_PREFIXES = ["/welcome", "/games/sprout-valley"];

function isSkippedPath(path: string): boolean {
  return SKIP_PREFIXES.some((p) => path.startsWith(p));
}

/** usePathname can lag behind window.location during client navigations. */
function gatePath(pathname: string): string {
  if (typeof window !== "undefined") return window.location.pathname;
  return pathname;
}

export function ChildProfileGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const path = gatePath(pathname);
  const skipped = isSkippedPath(path);

  const [allowed, setAllowed] = useState(
    () => skipped || (typeof window !== "undefined" && hasChildAge()),
  );

  useEffect(() => {
    if (isSkippedPath(gatePath(pathname))) {
      setAllowed(true);
      return;
    }
    if (hasChildAge()) {
      setAllowed(true);
      return;
    }
    router.replace("/welcome");
  }, [pathname, router]);

  useEffect(() => {
    const sync = () => {
      if (hasChildAge()) setAllowed(true);
    };
    window.addEventListener(CHILD_AGE_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CHILD_AGE_CHANGED_EVENT, sync);
  }, []);

  if (skipped || allowed) {
    return children;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-off">
      <div className="font-display text-lg text-brand-muted">Loading…</div>
    </div>
  );
}
