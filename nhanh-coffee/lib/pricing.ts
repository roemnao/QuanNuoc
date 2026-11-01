import { findItem, type Size } from "./menu";

export const SIZE_L_EXTRA = 5000;
export const GOLDEN_DISCOUNT = 0.2;
export const POINT_UNIT = 10000;
export const POINTS_PER_FREE_DRINK = 50;

export interface LineInput {
  itemId: string;
  size: Size;
  qty: number;
}

export interface PricedLine extends LineInput {
  name: string;
  unitPrice: number;
  isCoffee: boolean;
}

/** Giờ hiện tại (0-23) theo múi giờ Việt Nam, bất kể server đặt ở đâu. */
export function vnHour(now: Date): number {
  const h = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(now);
  return Number(h) % 24;
}

export function vnDateKey(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(now);
}

export const isGoldenHour = (now: Date) => {
  const h = vnHour(now);
  return h >= 7 && h < 9;
};

export function unitPrice(basePrice: number, hasSize: boolean, size: Size): number {
  return basePrice + (hasSize && size === "L" ? SIZE_L_EXTRA : 0);
}

export function computeTotals(lines: LineInput[], now: Date) {
  const priced: PricedLine[] = [];
  for (const l of lines) {
    const item = findItem(l.itemId);
    if (!item) throw new Error(`Món không tồn tại: ${l.itemId}`);
    const size: Size = item.hasSize ? l.size : "M";
    priced.push({
      itemId: item.id,
      name: item.name,
      size,
      qty: l.qty,
      unitPrice: unitPrice(item.price, item.hasSize, size),
      isCoffee: item.isCoffee,
    });
  }
  const subtotal = priced.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const golden = isGoldenHour(now);
  const coffeeTotal = priced.filter((l) => l.isCoffee).reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const discount = golden ? Math.round(coffeeTotal * GOLDEN_DISCOUNT) : 0;
  return { lines: priced, subtotal, discount, total: subtotal - discount, golden };
}

export const pointsFor = (total: number) => Math.floor(total / POINT_UNIT);
