import { NextResponse } from "next/server";
import { applyAction, listOrders, type StaffAction } from "@/lib/orders";
import { isStaff } from "@/lib/staff-auth";

export const dynamic = "force-dynamic";
const ACTIONS: StaffAction[] = ["confirm_paid", "start", "ready", "picked_up", "redo"];

export async function GET(req: Request) {
  if (!isStaff(req)) return NextResponse.json({ error: "Sai PIN" }, { status: 401 });
  const orders = (await listOrders()).filter((o) => o.status !== "picked_up");
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  if (!isStaff(req)) return NextResponse.json({ error: "Sai PIN" }, { status: 401 });
  const { code, action } = await req.json();
  if (!ACTIONS.includes(action)) return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  const o = await applyAction(String(code), action);
  return o ? NextResponse.json({ order: o }) : NextResponse.json({ error: "Không tìm thấy đơn" }, { status: 404 });
}
