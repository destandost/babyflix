"use client";

import type { ReactNode } from "react";
import { useFarmStore } from "../../store/farmStore";

export function ModalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const setModal = useFarmStore((s) => s.setModal);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40">
      <div
        className="max-h-[75vh] w-full max-w-[430px] overflow-y-auto rounded-t-4xl bg-white shadow-xl"
        style={{ paddingBottom: "calc(5.25rem + max(0.5rem, env(safe-area-inset-bottom)) + 1rem)" }}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-brand-border bg-white px-4 py-3">
          <h2 className="font-display text-lg text-brand-text">{title}</h2>
          <button
            type="button"
            onClick={() => setModal(null)}
            className="rounded-xl bg-brand-off px-3 py-1 font-black text-brand-muted"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
