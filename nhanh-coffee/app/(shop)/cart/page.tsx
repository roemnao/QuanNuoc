"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, CalendarClock, QrCode, Zap } from "lucide-react";
import { Button, CartLineRow, RadioCard } from "@/components/ui";
import { computeTotals } from "@/lib/pricing";
import { vnd } from "@/lib/menu";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const router = useRouter();
  const { lines, clear } = useCart();
  const [ready, setReady] = useState(false);
  const [pay, setPay] = useState<"qr" | "cash">("qr");
  const [pickup, setPickup] = useState<"now" | "scheduled">("now");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) return null;
  if (lines.length === 0) return <p className="py-12 text-center text-muted">Giỏ hàng trống.</p>;

  // Chỉ để hiển thị; server tính lại giá khi đặt đơn.
  const t = computeTotals(lines, new Date());

  async function submit() {
    setErr("");
    let pickupAt: string | undefined;
    if (pickup === "scheduled") {
      const [h, m] = time.split(":").map(Number);
      if (Number.isNaN(h)) return setErr("Chọn giờ hẹn");
      const d = new Date();
      d.setHours(h, m, 0, 0);
      pickupAt = d.toISOString();
    }
    setBusy(true);
    const r = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lines, pickupType: pickup, pickupAt, payMethod: pickup === "scheduled" ? "qr" : pay, phone }),
    });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return setErr(j.error ?? "Có lỗi, thử lại");
    clear();
    router.push(`/order/${j.code}`);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-display-l mb-2">Giỏ hàng</h1>
      {lines.map((l) => <CartLineRow key={l.itemId + l.size} line={l} />)}

      <h2 className="text-h3 mb-2 mt-6">Lấy ly</h2>
      <div className="grid gap-2" role="radiogroup">
        <RadioCard icon={Zap} title="Lấy ngay" sub="Pha ngay khi nhận đơn" checked={pickup === "now"} onClick={() => setPickup("now")} />
        <RadioCard icon={CalendarClock} title="Hẹn giờ" sub="Chỉ thanh toán QR" checked={pickup === "scheduled"} onClick={() => setPickup("scheduled")} />
      </div>
      {pickup === "scheduled" && (
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3" aria-label="Giờ hẹn" />
      )}

      {pickup === "now" && (
        <>
          <h2 className="text-h3 mb-2 mt-6">Thanh toán</h2>
          <div className="grid gap-2" role="radiogroup">
            <RadioCard icon={QrCode} title="Chuyển khoản QR" checked={pay === "qr"} onClick={() => setPay("qr")} />
            <RadioCard icon={Banknote} title="Tiền mặt tại quầy" checked={pay === "cash"} onClick={() => setPay("cash")} />
          </div>
        </>
      )}

      <input inputMode="tel" placeholder="SĐT tích điểm (không bắt buộc)" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-6 min-h-11 w-full rounded-md border border-line bg-white px-3" />

      <div className="mt-6 space-y-1 border-t border-line pt-4">
        <div className="flex justify-between"><span>Tạm tính</span><span>{vnd(t.subtotal)}</span></div>
        {t.golden && <div className="flex justify-between text-green"><span>Giờ vàng −20% cà phê</span><span>−{vnd(t.discount)}</span></div>}
        <div className="text-h3 flex justify-between"><span>Tổng</span><span className="text-caramel">{vnd(t.total)}</span></div>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{err}</p>}
      <Button fullWidth className="mt-4" onClick={submit} disabled={busy}>{busy ? "Đang gửi…" : "Xác nhận đặt món"}</Button>
    </div>
  );
}
