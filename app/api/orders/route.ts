import { NextResponse } from "next/server";
import { CreateOrderSchema, createOrder } from "@/lib/orders";
import { vietQrUrl } from "@/lib/vietqr";

export async function POST(req: Request) {
  const parsed = CreateOrderSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  try {
    const o = await createOrder(parsed.data);
    return NextResponse.json({
      code: o.code,
      total: o.total,
      discount: o.discount,
      qr: o.payMethod === "qr" ? vietQrUrl(o.total, o.code) : null,
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
