"use client";
import { useState } from "react";
import { usePoll } from "@/lib/use-poll";
import { vnd } from "@/lib/menu";
import type { Order } from "@/lib/orders";

export default function StaffPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState("");
  const { data, error } = usePoll<{ orders: Order[] }>(authed ? "/api/staff" : null, 2000, { "x-staff-pin": authed });

  async function act(code: string, action: string) {
    await fetch("/api/staff", {
      method: "POST",
      headers: { "x-staff-pin": authed, "content-type": "application/json" },
      body: JSON.stringify({ code, action }),
    });
  }

  if (!authed || error === 401) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); setAuthed(pin); }} className="mx-auto mt-24 max-w-xs space-y-3 p-4">
        <h1 className="text-h2">Màn hình bếp</h1>
        <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Nhập PIN" className="min-h-11 w-full rounded-md border border-line px-3" />
        {error === 401 && <p className="text-sm text-red-700">Sai PIN</p>}
        <button className="min-h-11 w-full rounded-md bg-espresso font-semibold text-cream">Vào</button>
      </form>
    );
  }

  const btn = "min-h-12 rounded-md px-4 font-bold text-white";
  return (
    <div className="p-4">
      <h1 className="text-h2 mb-4">Đơn đang xử lý ({data?.orders.length ?? 0})</h1>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {data?.orders.map((o) => {
          const late = o.status === "brewing" && Date.now() - Date.parse(o.createdAt) > 8 * 60_000;
          return (
            <div key={o.code} className={`rounded-lg border-2 bg-white p-4 ${o.priority ? "border-caramel" : late ? "border-red-600" : "border-line"}`}>
              <div className="flex items-baseline justify-between">
                <span className="text-display-l">#{o.code}</span>
                <span className="text-caption">{o.status}{o.priority ? " · ƯU TIÊN" : ""}{late ? " · QUÁ 8 PHÚT" : ""}</span>
              </div>
              <ul className="my-2 text-sm">{o.items.map((l) => <li key={l.itemId + l.size}>{l.qty}× {l.name} ({l.size})</li>)}</ul>
              <p className="mb-3 text-sm">
                {vnd(o.total)} · {o.payMethod === "qr" ? "QR" : "Tiền mặt"} · {o.paid ? "ĐÃ THU" : "CHƯA THU"}
                {o.pickupAt ? ` · hẹn ${new Date(o.pickupAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {!o.paid && <button className={`${btn} bg-green`} onClick={() => act(o.code, "confirm_paid")}>Đã thu</button>}
                {o.status === "received" && <button className={`${btn} bg-caramel`} onClick={() => act(o.code, "start")}>Bắt đầu pha</button>}
                {o.status === "brewing" && <button className={`${btn} bg-green`} onClick={() => act(o.code, "ready")}>Xong</button>}
                {o.status === "ready" && (
                  <>
                    <button className={`${btn} bg-espresso`} onClick={() => act(o.code, "picked_up")}>Đã lấy</button>
                    <button className={`${btn} bg-red-700`} onClick={() => act(o.code, "redo")}>Làm lại</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
