import { NextResponse } from "next/server";
import { listOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function GET() {
  const all = await listOrders();
  return NextResponse.json({
    ready: all.filter((o) => o.status === "ready").map((o) => o.code),
    brewing: all.filter((o) => o.status === "brewing").map((o) => o.code),
  });
}
