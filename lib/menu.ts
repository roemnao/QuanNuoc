export type Category = "coffee" | "tea" | "blended" | "other";
export type Size = "M" | "L";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number; // giá size M, VND
  note?: string;
  isCoffee: boolean;
  hasSize: boolean;
}

// TODO: thay bằng 13 món thật từ file Menu của quán (hiện là dữ liệu mẫu).
export const MENU: MenuItem[] = [
  { id: "cf-den", name: "Cà phê đen", category: "coffee", price: 25000, isCoffee: true, hasSize: true },
  { id: "cf-sua", name: "Cà phê sữa", category: "coffee", price: 29000, note: "Bán chạy nhất", isCoffee: true, hasSize: true },
  { id: "bac-xiu", name: "Bạc xỉu", category: "coffee", price: 32000, isCoffee: true, hasSize: true },
  { id: "americano", name: "Americano", category: "coffee", price: 35000, isCoffee: true, hasSize: true },
  { id: "latte", name: "Latte", category: "coffee", price: 42000, isCoffee: true, hasSize: true },
  { id: "cappuccino", name: "Cappuccino", category: "coffee", price: 42000, isCoffee: true, hasSize: true },
  { id: "tra-dao", name: "Trà đào cam sả", category: "tea", price: 38000, isCoffee: false, hasSize: true },
  { id: "tra-vai", name: "Trà vải", category: "tea", price: 38000, isCoffee: false, hasSize: true },
  { id: "tra-xanh", name: "Trà xanh chanh", category: "tea", price: 32000, isCoffee: false, hasSize: true },
  { id: "da-xay-cf", name: "Cà phê đá xay", category: "blended", price: 45000, isCoffee: true, hasSize: true },
  { id: "matcha-xay", name: "Matcha đá xay", category: "blended", price: 48000, isCoffee: false, hasSize: true },
  { id: "nuoc-cam", name: "Nước cam ép", category: "other", price: 40000, isCoffee: false, hasSize: true },
  { id: "croissant", name: "Croissant bơ", category: "other", price: 30000, isCoffee: false, hasSize: false },
];

export const CATEGORY_LABEL: Record<Category | "all", string> = {
  all: "Tất cả",
  coffee: "Cà phê",
  tea: "Trà",
  blended: "Đá xay",
  other: "Khác",
};

export const findItem = (id: string) => MENU.find((m) => m.id === id);
export const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";
