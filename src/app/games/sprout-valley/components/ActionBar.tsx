"use client";

import { GAME_ACTION_BAR_HEIGHT, GAME_SAFE_BOTTOM } from "../lib/scenery";
import { useFarmStore, type ToolType } from "../store/farmStore";

const TOOLS: { id: ToolType | "build"; label: string; modal?: string }[] = [
  { id: "plant", label: "Plant" },
  { id: "water", label: "Water" },
  { id: "harvest", label: "Harvest" },
  { id: "build", label: "Build", modal: "build" },
];

function ToolIcon({ id, active }: { id: string; active: boolean }) {
  const stroke = active ? "#5D4037" : "#8D6E63";
  const fill = active ? "#7B4FFF" : "#5D4037";
  if (id === "plant") {
    return (
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="14" fill={active ? "#E8D5FF" : "#FFF8E1"} stroke={stroke} strokeWidth="2" />
        <ellipse cx="16" cy="22" rx="7" ry="3" fill="#8D6E63" />
        <path d="M16 22 V12" stroke={fill} strokeWidth="2" />
        <ellipse cx="16" cy="9" rx="6" ry="7" fill="#66BB6A" />
      </svg>
    );
  }
  if (id === "water") {
    return (
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="14" fill={active ? "#E3F2FD" : "#FFF8E1"} stroke={stroke} strokeWidth="2" />
        <path d="M10 8h14l-4 18H14L10 8z" fill="#4FC3F7" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }
  if (id === "harvest") {
    return (
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="14" fill={active ? "#FFF3E0" : "#FFF8E1"} stroke={stroke} strokeWidth="2" />
        <path d="M6 15h20v11H6z" fill="#D7CCC8" stroke={stroke} strokeWidth="2" />
        <path d="M10 15V9c4-4 8-4 12 0v6" fill="none" stroke={fill} strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="14" fill={active ? "#E0E0E0" : "#FFF8E1"} stroke={stroke} strokeWidth="2" />
      <rect x="8" y="16" width="16" height="5" fill="#8D6E63" />
      <rect x="14" y="8" width="4" height="12" fill={fill} />
      <polygon points="16,6 20,11 12,11" fill="#FFD600" />
    </svg>
  );
}

export function ActionBar() {
  const selectedTool = useFarmStore((s) => s.selectedTool);
  const setTool = useFarmStore((s) => s.setTool);
  const setModal = useFarmStore((s) => s.setModal);

  return (
    <div
      className="relative z-[210] flex-shrink-0 border-t-4 border-[#5D4037] shadow-[0_-8px_24px_rgba(93,64,55,0.35)]"
      style={{
        height: GAME_ACTION_BAR_HEIGHT,
        paddingBottom: GAME_SAFE_BOTTOM,
        background: "linear-gradient(180deg, #D7CCC8 0%, #A1887F 45%, #8D6E63 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-3 top-1 h-1 rounded-full bg-white/30"
        aria-hidden
      />
      <div className="flex h-full items-center justify-around gap-2 px-3 pt-1">
        {TOOLS.map((tool) => {
          const isTool = tool.id === "plant" || tool.id === "water" || tool.id === "harvest";
          const active = isTool && selectedTool === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                if (isTool) {
                  setTool(tool.id as ToolType);
                  setModal(null);
                } else if (tool.modal) {
                  setModal(tool.modal);
                }
              }}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 transition-all active:scale-95 ${
                active
                  ? "bg-[#FFF8E1] shadow-[inset_0_2px_0_#fff,inset_0_-3px_0_#BCAAA4,0_4px_0_#5D4037]"
                  : "bg-[#EFEBE9]/90 shadow-[inset_0_1px_0_#fff,0_3px_0_#6D4C41]"
              }`}
            >
              <ToolIcon id={tool.id} active={active} />
              <span className="font-display text-[10px] font-bold text-[#3E2723]">{tool.label}</span>
            </button>
          );
        })}
      </div>
      <p className="pb-1 text-center text-[9px] font-semibold text-[#3E2723]/70">
        Tap the truck for orders · market stall to sell
      </p>
    </div>
  );
}
