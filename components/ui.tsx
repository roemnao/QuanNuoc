"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Clock, Home, Minus, Plus, ShoppingBag, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { findItem, vnd, type MenuItem } from "@/lib/menu";
import { useCart, type CartLine } from "@/store/cart";
import { unitPrice } from "@/lib/pricing";

export function Button({
  variant = "primary", fullWidth, icon: Icon, children, className = "", ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "dark" | "outline"; fullWidth?: boolean; icon?: LucideIcon }) {
  const v = {
    primary: "bg-caramel text-white",
    dark: "bg-espresso text-cream",
    outline: "border-2 border-espresso text-espresso",
  }[variant];
  return (
    <button
      {...rest}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 font-semibold disabled:opacity-50 ${v} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {Icon && <Icon size={18} strokeWidth={2} />}
      {children}
    </button>
  );
}

export function CategoryChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold ${active ? "bg-espresso text-cream" : "border border-line bg-white text-ink-2"}`}
    >
      {label}
    </button>
  );
}

export function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
      <div className="grid size-16 shrink-0 place-items-center rounded-md bg-latte text-caramel">
        <UtensilsCrossed />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{item.name}</div>
        {item.note && <div className="text-caption">{item.note}</div>}
        <div className="font-bold text-caramel">{vnd(item.price)}</div>
      </div>
      <button aria-label={`Thêm ${item.name}`} onClick={onAdd} className="grid size-11 place-items-center rounded-full bg-caramel text-white">
        <Plus />
      </button>
    </div>
  );
}

export function CartLineRow({ line }: { line: CartLine }) {
  const { inc, dec } = useCart();
  const item = findItem(line.itemId);
  if (!item) return null;
  return (
    <div className="flex items-center gap-3 border-b border-line py-3">
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-caption">Size {line.size}</div>
      </div>
      <div className="flex items-center gap-1">
        <button aria-label="Giảm" onClick={() => dec(line.itemId, line.size)} className="grid size-11 place-items-center rounded-full border border-line"><Minus size={16} /></button>
        <span className="w-6 text-center font-semibold">{line.qty}</span>
        <button aria-label="Tăng" onClick={() => inc(line.itemId, line.size)} className="grid size-11 place-items-center rounded-full border border-line"><Plus size={16} /></button>
      </div>
      <div className="w-24 text-right font-bold">{vnd(unitPrice(item.price, item.hasSize, line.size) * line.qty)}</div>
    </div>
  );
}

export function RadioCard({ icon: Icon, title, sub, checked, onClick }: { icon: LucideIcon; title: string; sub?: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      role="radio" aria-checked={checked} onClick={onClick}
      className={`flex min-h-14 w-full items-center gap-3 rounded-lg border-2 p-3 text-left ${checked ? "border-caramel bg-caramel-soft" : "border-line bg-white"}`}
    >
      <Icon size={22} className="text-caramel" />
      <span>
        <span className="block font-semibold">{title}</span>
        {sub && <span className="text-caption">{sub}</span>}
      </span>
    </button>
  );
}

export function StatusStep({ state, title, sub }: { state: "done" | "active" | "pending"; title: string; sub?: string }) {
  const dot = {
    done: "bg-green text-white",
    active: "bg-caramel text-white",
    pending: "border-2 border-line bg-white text-muted",
  }[state];
  return (
    <li className="flex items-start gap-3 py-2" aria-current={state === "active" ? "step" : undefined}>
      <span className={`grid size-8 shrink-0 place-items-center rounded-full ${dot}`}>
        {state === "done" ? <Check size={16} /> : state === "active" ? <Clock size={16} /> : null}
      </span>
      <span>
        <span className={`block font-semibold ${state === "pending" ? "text-muted" : ""}`}>{title}</span>
        {sub && <span className="text-caption">{sub}</span>}
      </span>
    </li>
  );
}

const TABS = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/menu", label: "Thực đơn", icon: UtensilsCrossed },
  { href: "/cart", label: "Giỏ", icon: ShoppingBag },
  { href: "/store", label: "Cửa hàng", icon: Store },
];

export function TabBar() {
  const path = usePathname();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const badge = (href: string) => (href === "/cart" && count > 0 ? ` (${count})` : "");
  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line bg-white md:hidden" aria-label="Điều hướng">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className={`flex min-h-14 flex-col items-center justify-center text-xs font-semibold ${path === t.href ? "text-caramel" : "text-muted"}`}>
            <t.icon size={22} />
            {t.label}{badge(t.href)}
          </Link>
        ))}
      </nav>
      <header className="sticky top-0 z-20 hidden border-b border-line bg-white/90 backdrop-blur md:block">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="text-h2 text-caramel">NHANH.</Link>
          <div className="flex gap-6 font-semibold">
            {TABS.map((t) => (
              <Link key={t.href} href={t.href} className={path === t.href ? "text-caramel" : "text-ink-2"}>
                {t.label}{badge(t.href)}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
