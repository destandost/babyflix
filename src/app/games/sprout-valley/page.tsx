"use client";

import { useEffect } from "react";
import { ActionBar } from "./components/ActionBar";
import { FarmCanvas } from "./components/FarmCanvas";
import { FarmSvgDefs } from "./components/FarmSvgDefs";
import { GameModals } from "./components/GameModals";
import { HUD } from "./components/HUD";
import { LevelUpPopup } from "./components/modals/LevelUpPopup";
import { SciencePopup } from "./components/modals/SciencePopup";
import { useFarmStore } from "./store/farmStore";

export default function SproutValleyPage() {
  const tick = useFarmStore((s) => s.tick);
  const save = useFarmStore((s) => s.save);
  const load = useFarmStore((s) => s.load);
  const addWater = useFarmStore((s) => s.addWater);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    const saveInterval = setInterval(() => save(), 30000);
    const waterInterval = setInterval(() => addWater(1), 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(saveInterval);
      clearInterval(waterInterval);
      save();
    };
  }, [tick, save, addWater]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] mx-auto flex max-w-[430px] flex-col overflow-hidden bg-[#4A9035]">
      <FarmSvgDefs />
      <HUD />
      <FarmCanvas />
      <ActionBar />
      <GameModals />
      <SciencePopup />
      <LevelUpPopup />
    </div>
  );
}
