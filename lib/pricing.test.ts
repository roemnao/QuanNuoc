import { describe, expect, it } from "vitest";
import { computeTotals, isGoldenHour, pointsFor, vnDateKey } from "./pricing";

// Giờ UTC → VN = UTC+7
const at = (vnH: number, vnM = 0) => new Date(Date.UTC(2026, 10, 9, vnH - 7, vnM));

describe("giờ vàng", () => {
  it("chỉ áp 7:00–8:59 giờ Việt Nam", () => {
    expect(isGoldenHour(at(6, 59))).toBe(false);
    expect(isGoldenHour(at(7))).toBe(true);
    expect(isGoldenHour(at(8, 59))).toBe(true);
    expect(isGoldenHour(at(9))).toBe(false);
  });
  it("không phụ thuộc múi giờ server (UTC 0h = 7h VN)", () => {
    expect(isGoldenHour(new Date("2026-11-09T00:00:00Z"))).toBe(true);
  });
});

describe("tính giá", () => {
  it("size L = M + 5.000đ", () => {
    const r = computeTotals([{ itemId: "cf-sua", size: "L", qty: 1 }], at(12));
    expect(r.total).toBe(34000);
  });
  it("croissant không có size L", () => {
    const r = computeTotals([{ itemId: "croissant", size: "L", qty: 1 }], at(12));
    expect(r.total).toBe(30000);
  });
  it("giờ vàng chỉ giảm 20% món cà phê", () => {
    const r = computeTotals(
      [
        { itemId: "cf-sua", size: "M", qty: 1 }, // 29.000 cà phê
        { itemId: "tra-vai", size: "M", qty: 1 }, // 38.000 không phải cà phê
      ],
      at(8),
    );
    expect(r.discount).toBe(5800);
    expect(r.total).toBe(67000 - 5800);
  });
  it("ngoài giờ vàng không giảm", () => {
    expect(computeTotals([{ itemId: "cf-sua", size: "M", qty: 2 }], at(15)).discount).toBe(0);
  });
  it("từ chối món lạ", () => {
    expect(() => computeTotals([{ itemId: "x", size: "M", qty: 1 }], at(12))).toThrow();
  });
});

describe("điểm & mã ngày", () => {
  it("10.000đ = 1 điểm", () => {
    expect(pointsFor(29000)).toBe(2);
    expect(pointsFor(9999)).toBe(0);
  });
  it("ngày tính theo giờ VN", () => {
    expect(vnDateKey(new Date("2026-11-09T18:00:00Z"))).toBe("2026-11-10");
  });
});
