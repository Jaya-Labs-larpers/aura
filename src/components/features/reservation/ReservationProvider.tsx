"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ReservationContextValue {
  open: boolean;
  show: () => void;
  hide: () => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

/** Holds whether the reservation overlay is open, for any Reserve CTA on the page to trigger. */
export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, show: () => setOpen(true), hide: () => setOpen(false) }), [open]);
  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used within <ReservationProvider>");
  return ctx;
}
