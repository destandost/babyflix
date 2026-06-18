"use client";

import { useFarmStore } from "../store/farmStore";
import { AnimalModal } from "./modals/AnimalModal";
import { BuildModal } from "./modals/BuildModal";
import { MachineModal } from "./modals/MachineModal";
import { OrderBoard } from "./modals/OrderBoard";
import { PlantModal } from "./modals/PlantModal";
import { ShopModal } from "./modals/ShopModal";

export function GameModals() {
  const activeModal = useFarmStore((s) => s.activeModal);

  if (activeModal === "plant") return <PlantModal />;
  if (activeModal === "orders") return <OrderBoard />;
  if (activeModal === "shop") return <ShopModal />;
  if (activeModal === "build") return <BuildModal />;
  if (activeModal === "animals") return <AnimalModal />;
  if (activeModal === "machines") return <MachineModal />;
  return null;
}
