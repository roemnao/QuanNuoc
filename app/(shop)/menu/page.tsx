"use client";
import { useState } from "react";
import Link from "next/link";
import { CategoryChip, MenuItemCard } from "@/components/ui";
import { CATEGORY_LABEL, MENU, type Category } from "@/lib/menu";
import { useCart } from "@/store/cart";

export default function MenuPage() {
  const [cat, setCat] = useState<Category | "all">("all");
  const { add, lines } = useCart();
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const items = MENU.filter((m) => cat === "all" || m.category === cat);
  return (
    <div>
      <h1 className="text-display-l mb-4">Thực đơn</h1>
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {(Object.keys(CATEGORY_LABEL) as (Category | "all")[]).map((c) => (
          <CategoryChip key={c} label={CATEGORY_LABEL[c]} active={cat === c} onClick={() => setCat(c)} />
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((i) => <MenuItemCard key={i.id} item={i} onAdd={() => add(i.id)} />)}
      </div>
      {count > 0 && (
        <Link href="/cart" className="fixed inset-x-4 bottom-20 z-10 flex min-h-12 items-center justify-center rounded-md bg-espresso font-semibold text-cream md:static md:mt-6 md:inline-flex md:px-6">
          Xem giỏ ({count} món)
        </Link>
      )}
    </div>
  );
}
