import { NextResponse } from "next/server";
import { getOrder, listOrders } from "@/lib/orders";
import { vietQrUrl } from "@/lib/vietqr";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const o = await getOrder(code);
  if (!o) return NextResponse.json({ error: "Không tìm thấy đơn" }, { status: 404 });
  const ahead = (await listOrders()).filter(
    (x) => (x.status === "received" || x.status === "brewing") && x.createdAt < o.createdAt,
  ).length;
  return NextResponse.json({
    code: o.code,
    status: o.status,
    paid: o.paid,
    payMethod: o.payMethod,
    total: o.total,
    items: o.items,
    etaMinutes: 3 + ahead * 2,
    qr: o.status === "pending_payment" && o.payMethod === "qr" ? vietQrUrl(o.total, o.code) : null,
  });
}
