"use client";
import { use } from "react";
import { StatusStep } from "@/components/ui";
import { usePoll } from "@/lib/use-poll";
import { vnd } from "@/lib/menu";

interface Tracked { code: string; status: string; paid: boolean; payMethod: string; total: number; etaMinutes: number; qr: string | null }

export default function OrderPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const { data: o, error } = usePoll<Tracked>(`/api/orders/${code}`, 2000);
  if (error === 404) return <p className="py-12 text-center">Không tìm thấy đơn #{code}.</p>;
  if (!o) return <p className="py-12 text-center text-muted">Đang tải…</p>;

  const rank = ["pending_payment", "received", "brewing", "ready", "picked_up"].indexOf(o.status);
  const st = (i: number) => (rank > i ? "done" : rank === i ? "active" : "pending") as "done" | "active" | "pending";

  return (
    <div className="mx-auto max-w-md text-center">
      <p className="text-caption">Số thứ tự của bạn</p>
      <div className="ticket text-caramel">#{o.code}</div>
      <p className="mb-4 text-muted">{vnd(o.total)}</p>

      {o.status === "ready" && <p role="status" className="mb-4 rounded-lg bg-green-soft p-3 font-bold text-green">Đơn của bạn đã xong – mời tới quầy lấy ly!</p>}
      {o.status === "pending_payment" && (
        <div className="mb-4 rounded-lg bg-caramel-soft p-4">
          <p className="font-semibold">Chuyển khoản {vnd(o.total)}, nội dung “NHANH {o.code}”</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {o.qr ? <img src={o.qr} alt="Mã VietQR" className="mx-auto mt-2 w-56" /> : <p className="text-caption">Quán chưa cấu hình mã QR.</p>}
        </div>
      )}

      <ol className="text-left" aria-live="polite">
        <StatusStep state={st(1)} title="Đã nhận đơn" sub={o.paid ? "Đã thanh toán" : o.payMethod === "cash" ? "Trả tiền mặt tại quầy" : "Chờ thanh toán"} />
        <StatusStep state={st(2)} title="Đang pha" sub={rank <= 2 ? `Dự kiến ~${o.etaMinutes} phút` : undefined} />
        <StatusStep state={st(3)} title="Xong – tới quầy lấy" />
      </ol>
    </div>
  );
}
