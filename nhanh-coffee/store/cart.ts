"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Size } from "@/lib/menu";

export interface CartLine { itemId: string; size: Size; qty: number }

interface CartState {
  lines: CartLine[];
  add: (itemId: string, size?: Size) => void;
  inc: (itemId: string, size: Size) => void;
  dec: (itemId: string, size: Size) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (itemId, size = "M") =>
        set((s) => {
          const hit = s.lines.find((l) => l.itemId === itemId && l.size === size);
          return hit
            ? { lines: s.lines.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l)) }
            : { lines: [...s.lines, { itemId, size, qty: 1 }] };
        }),
      inc: (itemId, size) =>
        set((s) => ({ lines: s.lines.map((l) => (l.itemId === itemId && l.size === size ? { ...l, qty: Math.min(20, l.qty + 1) } : l)) })),
      dec: (itemId, size) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.itemId === itemId && l.size === size ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "nhanh-cart" },
  ),
);
