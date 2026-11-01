import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { computeTotals, pointsFor, vnDateKey, type PricedLine } from "./pricing";

export const STATUSES = ["pending_payment", "received", "brewing", "ready", "picked_up"] as const;
export type Status = (typeof STATUSES)[number];

export interface Order {
  code: string; // "042"
  status: Status;
  pickupType: "now" | "scheduled";
  pickupAt: string | null;
  payMethod: "qr" | "cash";
  paid: boolean;
  priority: boolean;
  subtotal: number;
  discount: number;
  total: number;
  phone: string | null;
  items: PricedLine[];
  createdAt: string;
  readyAt: string | null;
  day: string;
}

export const CreateOrderSchema = z
  .object({
    lines: z
      .array(
        z.object({
          itemId: z.string(),
          size: z.enum(["M", "L"]),
          qty: z.number().int().min(1).max(20),
        }),
      )
      .min(1)
      .max(30),
    pickupType: z.enum(["now", "scheduled"]),
    pickupAt: z.string().datetime().optional(),
    payMethod: z.enum(["qr", "cash"]),
    phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ").optional().or(z.literal("")),
  })
  .refine((v) => !(v.payMethod === "cash" && v.pickupType === "scheduled"), {
    message: "Tiền mặt chỉ áp dụng cho đơn lấy ngay",
  })
  .refine((v) => v.pickupType === "now" || !!v.pickupAt, { message: "Thiếu giờ hẹn" });

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

interface Repo {
  create(o: Omit<Order, "code">): Promise<Order>;
  get(code: string): Promise<Order | null>;
  list(): Promise<Order[]>; // đơn của hôm nay
  update(code: string, patch: Partial<Order>): Promise<Order | null>;
  addPoints(phone: string, points: number): Promise<void>;
  getPoints(phone: string): Promise<number>;
}

/* ---------- Bộ nhớ tạm (dev, khi chưa cấu hình Supabase) ---------- */
type Mem = { orders: Order[]; points: Map<string, number>; counters: Map<string, number> };
const g = globalThis as unknown as { __mem?: Mem };
const mem = (): Mem => (g.__mem ??= { orders: [], points: new Map(), counters: new Map() });

const memoryRepo: Repo = {
  async create(o) {
    const m = mem();
    const n = (m.counters.get(o.day) ?? 0) + 1;
    m.counters.set(o.day, n);
    const order = { ...o, code: String(n).padStart(3, "0") };
    m.orders.push(order);
    return order;
  },
  async get(code) {
    const day = vnDateKey(new Date());
    return mem().orders.find((o) => o.code === code && o.day === day) ?? null;
  },
  async list() {
    const day = vnDateKey(new Date());
    return mem().orders.filter((o) => o.day === day);
  },
  async update(code, patch) {
    const o = await this.get(code);
    if (!o) return null;
    Object.assign(o, patch);
    return o;
  },
  async addPoints(phone, p) {
    const m = mem();
    m.points.set(phone, (m.points.get(phone) ?? 0) + p);
  },
  async getPoints(phone) {
    return mem().points.get(phone) ?? 0;
  },
};

/* ---------- Supabase ---------- */
function supabaseRepo(): Repo {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const fromRow = (r: any): Order => ({
    code: r.code,
    status: r.status,
    pickupType: r.pickup_type,
    pickupAt: r.pickup_at,
    payMethod: r.pay_method,
    paid: r.paid,
    priority: r.priority,
    subtotal: r.subtotal,
    discount: r.discount,
    total: r.total,
    phone: r.phone,
    items: r.items,
    createdAt: r.created_at,
    readyAt: r.ready_at,
    day: r.day,
  });
  const toPatch = (p: Partial<Order>) => ({
    ...(p.status !== undefined && { status: p.status }),
    ...(p.paid !== undefined && { paid: p.paid }),
    ...(p.priority !== undefined && { priority: p.priority }),
    ...(p.readyAt !== undefined && { ready_at: p.readyAt }),
  });
  return {
    async create(o) {
      const { data: code, error: e1 } = await db.rpc("next_order_code", { p_day: o.day });
      if (e1) throw e1;
      const { data, error } = await db
        .from("orders")
        .insert({
          code, day: o.day, status: o.status, pickup_type: o.pickupType, pickup_at: o.pickupAt,
          pay_method: o.payMethod, paid: o.paid, priority: o.priority, subtotal: o.subtotal,
          discount: o.discount, total: o.total, phone: o.phone, items: o.items,
        })
        .select()
        .single();
      if (error) throw error;
      return fromRow(data);
    },
    async get(code) {
      const { data } = await db.from("orders").select().eq("code", code).eq("day", vnDateKey(new Date())).maybeSingle();
      return data ? fromRow(data) : null;
    },
    async list() {
      const { data } = await db.from("orders").select().eq("day", vnDateKey(new Date())).order("created_at");
      return (data ?? []).map(fromRow);
    },
    async update(code, patch) {
      const { data } = await db
        .from("orders").update(toPatch(patch)).eq("code", code).eq("day", vnDateKey(new Date())).select().maybeSingle();
      return data ? fromRow(data) : null;
    },
    async addPoints(phone, p) {
      await db.rpc("add_member_points", { p_phone: phone, p_points: p });
    },
    async getPoints(phone) {
      const { data } = await db.from("members").select("points").eq("phone", phone).maybeSingle();
      return data?.points ?? 0;
    },
  };
}

const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const repo: Repo = useSupabase ? supabaseRepo() : memoryRepo;

/* ---------- Nghiệp vụ ---------- */
export async function createOrder(input: CreateOrderInput, now = new Date()) {
  // Giá luôn tính lại ở server, không tin số tiền từ trình duyệt.
  const t = computeTotals(input.lines, now);
  const order = await repo.create({
    status: input.payMethod === "cash" ? "received" : "pending_payment",
    pickupType: input.pickupType,
    pickupAt: input.pickupAt ?? null,
    payMethod: input.payMethod,
    paid: false,
    priority: false,
    subtotal: t.subtotal,
    discount: t.discount,
    total: t.total,
    phone: input.phone || null,
    items: t.lines,
    createdAt: now.toISOString(),
    readyAt: null,
    day: vnDateKey(now),
  });
  return order;
}

export const getOrder = (code: string) => repo.get(code);
export const listOrders = () => repo.list();
export const getPoints = (phone: string) => repo.getPoints(phone);

export type StaffAction = "confirm_paid" | "start" | "ready" | "picked_up" | "redo";

export async function applyAction(code: string, action: StaffAction) {
  const o = await repo.get(code);
  if (!o) return null;
  switch (action) {
    case "confirm_paid":
      return repo.update(code, { paid: true, status: o.status === "pending_payment" ? "received" : o.status });
    case "start":
      if (o.status === "pending_payment") return o; // chưa thu tiền thì chưa pha
      return repo.update(code, { status: "brewing" });
    case "ready":
      return repo.update(code, { status: "ready", readyAt: new Date().toISOString() });
    case "picked_up": {
      const done = await repo.update(code, { status: "picked_up", paid: true });
      if (done?.phone && o.status !== "picked_up") await repo.addPoints(done.phone, pointsFor(done.total));
      return done;
    }
    case "redo": // E3: món sai → về brewing, ưu tiên
      return repo.update(code, { status: "brewing", priority: true, readyAt: null });
  }
}
