"use client";

import { speakGame } from "@/lib/speech";

type GameButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Spoken on tap; falls back to aria-label or plain text children */
  speak?: string;
};

function speakLabelFromChildren(children: React.ReactNode): string | undefined {
  if (typeof children === "string") return children.trim() || undefined;
  if (typeof children === "number") return String(children);
  return undefined;
}

export function GameButton({
  speak,
  onClick,
  children,
  ...props
}: GameButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = speak ?? props["aria-label"] ?? speakLabelFromChildren(children);
    if (text) void speakGame(text);
    onClick?.(e);
  };

  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
