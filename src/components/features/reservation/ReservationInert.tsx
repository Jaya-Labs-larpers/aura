"use client";

import type { ReactNode } from "react";
import { useReservation } from "@/components/features/reservation/ReservationProvider";

/** Makes the page behind the reservation overlay unreachable by keyboard/AT while it's open. */
export function ReservationInert({ children }: { children: ReactNode }) {
  const { open } = useReservation();
  return <div inert={open}>{children}</div>;
}
