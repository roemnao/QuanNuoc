const CONFIG = {
  staffPin: "1234",
  bank: "",
  account: "",
  accountName: "",
  hotline: "09xx xxx xxx",
  hotlineTel: "",
  address: "123 đường X, Quận 1, TP.HCM",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=123+%C4%91%C6%B0%E1%BB%9Dng+X+Qu%E1%BA%ADn+1+TP.HCM",
};

const TZ = "Asia/Ho_Chi_Minh";
const SIZE_L_EXTRA = 5000;
const GOLDEN_RATE = 0.2;
const POINT_UNIT = 10000;
const FREE_DRINK_POINTS = 50;
const SOON_MINUTES = 5;

const CATS = [
  { id: "cf", label: "Cà phê", head: "CÀ PHÊ" },
  { id: "tea", label: "Trà", head: "TRÀ" },
  { id: "blend", label: "Đá xay", head: "ĐÁ XAY" },
  { id: "other", label: "Khác", head: "KHÁC" },
];

const MENU = [
  { id: "cf-den", cat: "cf", name: "Cà phê đen đá", price: 19000, note: "Robusta Đắk Lắk rang đậm, pha phin" },
  { id: "cf-sua", cat: "cf", name: "Cà phê sữa đá", price: 25000, note: "Robusta pha phin cùng sữa đặc" },
  { id: "bac-xiu", cat: "cf", name: "Bạc xỉu", price: 28000, note: "Robusta : Arabica 7:3, vị nhẹ ít đắng" },
  { id: "cf-muoi", cat: "cf", name: "Cà phê muối", price: 29000, note: "Robusta rang vừa, phủ kem muối" },
  { id: "cf-dua", cat: "cf", name: "Cà phê cốt dừa đá xay", price: 38000, note: "Cà phê phin cô đặc xay cùng cốt dừa" },
  { id: "ts-cf", cat: "cf", name: "Trà sữa cà phê", price: 30000, note: "Cà phê và sữa" },
  { id: "tra-dao", cat: "tea", name: "Trà đào cam sả", price: 30000, note: "Trà đen ủ đào, cam tươi và sả" },
  { id: "tra-vai", cat: "tea", name: "Trà vải lài", price: 29000, note: "Trà lài thơm, vải ngọt thanh" },
  { id: "tra-chanh", cat: "tea", name: "Trà chanh mật ong", price: 25000, note: "Chanh tươi, mật ong nguyên chất" },
  { id: "matcha", cat: "blend", name: "Matcha đá xay", price: 35000, note: "Matcha xay mịn, béo nhẹ" },
  { id: "socola", cat: "blend", name: "Socola đá xay", price: 35000, note: "Socola đậm vị, kem tươi" },
  { id: "cam", cat: "other", name: "Nước cam ép", price: 25000, note: "Cam tươi ép nguyên chất" },
  { id: "croissant", cat: "other", name: "Croissant bơ", price: 22000, note: "Nướng mới mỗi sáng", noSize: true },
];

const ICONS = {
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  cup: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  parking: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  qr: '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
  cash: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
};

const ic = (name, size = 24) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";
const find = (id) => MENU.find((m) => m.id === id);
const hasSize = (item) => !item.noSize;

const read = (store, key, fallback) => {
  try {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (store, key, value) => {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {}
};

const hm = (d) => new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
const hourVN = (d) => Number(hm(d).slice(0, 2)) % 24;
const dayKey = (d) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
const isGolden = (d = new Date()) => {
  const h = hourVN(d);
  return h >= 7 && h < 9;
};
const addMin = (d, m) => new Date(d.getTime() + m * 60000);

const unit = (item, size) => item.price + (hasSize(item) && size === "L" ? SIZE_L_EXTRA : 0);

function totals(lines, now = new Date()) {
  let subtotal = 0;
  let coffee = 0;
  const items = lines.map((l) => {
    const item = find(l.id);
    const size = hasSize(item) ? l.size : "M";
    const u = unit(item, size);
    subtotal += u * l.qty;
    if (item.cat === "cf") coffee += u * l.qty;
    return { id: item.id, name: item.name, size, qty: l.qty, unit: u };
  });
  const discount = isGolden(now) ? Math.round(coffee * GOLDEN_RATE) : 0;
  return { items, subtotal, discount, total: subtotal - discount };
}

const pointsFor = (total) => Math.floor(total / POINT_UNIT);

let cart = read(localStorage, "nhanh-cart", []);
let db = read(localStorage, "nhanh-db", { orders: [], counters: {}, points: {} });
const saveCart = () => write(localStorage, "nhanh-cart", cart);
const saveDb = () => write(localStorage, "nhanh-db", db);
const lastCode = () => read(localStorage, "nhanh-last", null);

const S = {
  cat: "cf",
  q: "",
  pickup: "now",
  pay: "qr",
  time: "",
  phone: "",
  err: "",
};

const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
const todayOrders = () => db.orders.filter((o) => o.day === dayKey(new Date()));
const orderBy = (code) => todayOrders().find((o) => o.code === code);

function addToCart(id) {
  const hit = cart.find((l) => l.id === id && l.size === "M");
  if (hit) hit.qty += 1;
  else cart.push({ id, size: "M", qty: 1 });
  saveCart();
}

function changeQty(id, size, delta) {
  const l = cart.find((x) => x.id === id && x.size === size);
  if (!l) return;
  l.qty = Math.min(20, l.qty + delta);
  cart = cart.filter((x) => x.qty > 0);
  saveCart();
}

function toggleSize(id, size) {
  const l = cart.find((x) => x.id === id && x.size === size);
  if (!l || !hasSize(find(id))) return;
  const next = size === "M" ? "L" : "M";
  const other = cart.find((x) => x !== l && x.id === id && x.size === next);
  if (other) {
    other.qty = Math.min(20, other.qty + l.qty);
    cart = cart.filter((x) => x !== l);
  } else {
    l.size = next;
  }
  saveCart();
}

function createOrder() {
  const now = new Date();
  const t = totals(cart, now);
  const day = dayKey(now);
  const ahead = todayOrders().filter((o) => o.status === "received" || o.status === "brewing").length;
  const n = (db.counters[day] || 0) + 1;
  db.counters[day] = n;
  const code = String(n).padStart(3, "0");
  let pickupAt = null;
  if (S.pickup === "scheduled") pickupAt = new Date(`${day}T${S.time}:00+07:00`);
  const eta = pickupAt || addMin(now, SOON_MINUTES + Math.min(ahead, 6) * 2);
  const phone = S.phone.trim();
  const order = {
    code,
    day,
    status: S.pay === "cash" ? "received" : "pending_payment",
    pickup: S.pickup,
    pickupAt: pickupAt ? pickupAt.toISOString() : null,
    eta: eta.toISOString(),
    pay: S.pay,
    paid: false,
    priority: false,
    items: t.items,
    subtotal: t.subtotal,
    discount: t.discount,
    total: t.total,
    phone: phone || null,
    createdAt: now.toISOString(),
    receivedAt: now.toISOString(),
    readyAt: null,
  };
  db.orders.push(order);
  saveDb();
  write(localStorage, "nhanh-last", code);
  return order;
}

function staffAction(code, action) {
  const o = orderBy(code);
  if (!o) return;
  if (action === "paid") {
    o.paid = true;
    if (o.status === "pending_payment") o.status = "received";
  } else if (action === "start" && o.status === "received") {
    o.status = "brewing";
  } else if (action === "ready" && o.status === "brewing") {
    o.status = "ready";
    o.readyAt = new Date().toISOString();
  } else if (action === "picked" && o.status === "ready") {
    o.status = "picked_up";
    o.paid = true;
    if (o.phone) db.points[o.phone] = (db.points[o.phone] || 0) + pointsFor(o.total);
  } else if (action === "redo" && o.status === "ready") {
    o.status = "brewing";
    o.priority = true;
    o.readyAt = null;
  }
  saveDb();
}

const route = () => {
  const parts = location.hash.replace(/^#\/?/, "").split("/");
  return { name: parts[0] || "home", arg: parts[1] || "" };
};

const wordmark = `<a href="#/" class="wordmark"><span class="mark">${ic("bolt", 18)}</span><span class="name">NHANH.</span></a>`;

const tabs = [
  { name: "home", href: "#/", label: "Trang chủ", icon: "home" },
  { name: "menu", href: "#/menu", label: "Thực đơn", icon: "cup" },
  { name: "order", href: "#/order", label: "Đơn của tôi", icon: "bag" },
  { name: "store", href: "#/store", label: "Cửa hàng", icon: "pin" },
];

const tabbar = (active) =>
  `<nav class="tabbar" aria-label="Điều hướng"><div class="tabbar-in">${tabs
    .map((t) => `<a href="${t.href}" class="${t.name === active ? "on" : ""}">${ic(t.icon)}<span class="t-caption">${t.label}</span></a>`)
    .join("")}</div></nav>`;

const topbar = () => `
<header class="top-d">
  ${wordmark}
  <nav class="links">
    <a href="#/menu">Thực đơn</a>
    <a href="#/" data-scroll="cach-dat">Cách đặt</a>
    <a href="#/" data-scroll="uu-dai">Ưu đãi</a>
    <a href="#/" data-scroll="uu-dai">Đơn nhóm</a>
    <a href="#/store">Cửa hàng</a>
  </nav>
  <div class="right">
    <a href="#/order" class="track">${ic("bag", 20)}<span>Tra cứu đơn</span></a>
    <a href="#/menu" class="btn primary">ĐẶT TRƯỚC NGAY ${ic("arrow")}</a>
  </div>
</header>`;

const navbar = (title, right = "") => `
<div class="navbar">
  <button class="circle-btn" data-act="back" aria-label="Quay lại">${ic("back")}</button>
  <h1 class="t-h2">${title}</h1>
  ${right}
</div>`;

const menuItem = (m) => `
<div class="mi">
  <div class="thumb">${ic("cup", 32)}</div>
  <div class="tx"><p class="t-strong">${m.name}</p><p class="note">${m.note}</p><p class="price">${vnd(m.price)}</p></div>
  <button class="add" data-act="add" data-id="${m.id}" aria-label="Thêm ${m.name}">${ic("plus")}</button>
</div>`;

const info = (icon, label, value) => `
<div class="info"><div class="iw">${ic(icon)}</div><div class="tx"><p class="t-caption">${label}</p><p class="t-strong">${value}</p></div></div>`;

const step = (state, title, sub) => `
<div class="step ${state}"><div class="badge">${ic(state === "done" ? "check" : state === "active" ? "cup" : "bag", 20)}</div><div class="stext"><p class="t-strong st">${title}</p><p class="ss">${sub}</p></div></div>`;

function orderSteps(o) {
  const s = o.status;
  const first = s === "pending_payment" ? "active" : "done";
  const second = s === "pending_payment" ? "pending" : s === "received" || s === "brewing" ? "active" : "done";
  const third = s === "ready" ? "active" : s === "picked_up" ? "done" : "pending";
  const paidSub = o.paid
    ? `${hm(new Date(o.receivedAt))} · Đã thanh toán`
    : o.pay === "cash"
      ? "Trả tiền mặt tại quầy"
      : "Chờ thanh toán QR";
  const secondSub = s === "brewing" ? "Barista đang làm ly của bạn" : s === "received" ? "Barista sắp làm ly của bạn" : s === "pending_payment" ? "Pha sau khi nhận được thanh toán" : "Ly của bạn đã pha xong";
  return [step(first, "Đã nhận đơn", paidSub), step(second, "Đang pha chế", secondSub), step(third, "Đã xong – mời lấy ly", "Đến quầy TỰ PHỤC VỤ")].join("");
}

const demoOrder = {
  code: "042",
  status: "brewing",
  paid: true,
  pay: "qr",
  receivedAt: new Date().toISOString(),
  eta: addMin(new Date(), 3).toISOString(),
};

function homeMobile() {
  const featured = [MENU[1], MENU[6], MENU[2]];
  return `
<div class="home-m">
  <div class="m-head">${wordmark}<a href="#/cart" class="circle-btn" aria-label="Giỏ hàng">${ic("bag")}${cartCount() ? `<span class="count">${cartCount()}</span>` : ""}</a></div>
  <div class="body">
    <section class="hero-m">
      <span class="badge-open-m t-caption">● Đang mở cửa · 6:30–22:00</span>
      <h1 class="t-display-xl">5 phút có cà phê mang đi.</h1>
      <p class="sub">Đặt trước trên điện thoại, đến quầy TỰ PHỤC VỤ lấy ly — không xếp hàng, không chờ trong mù mờ.</p>
      <a href="#/menu" class="btn primary full">ĐẶT TRƯỚC NGAY ${ic("arrow")}</a>
    </section>
    <section class="promo-m">${ic("bolt")}<div class="tx"><p class="t-strong">Giờ vàng 7:00–9:00 · Giảm 20%</p><span class="t-caption">Áp dụng mọi món cà phê khi đặt online</span></div></section>
    <section class="tiles">
      <div class="tile"><div class="iw">${ic("clock")}</div><p class="t-strong">5 phút lấy món</p><p class="t-caption">Từ lúc đặt đến lúc cầm ly</p></div>
      <div class="tile"><div class="iw">${ic("smartphone")}</div><p class="t-strong">Đặt trước online</p><p class="t-caption">Chọn lấy ngay hoặc hẹn giờ</p></div>
      <div class="tile"><div class="iw">${ic("parking")}</div><p class="t-strong">Bãi xe miễn phí</p><p class="t-caption">Ngay trước cửa quán</p></div>
    </section>
    <section class="stack-12">
      <div class="sec-row"><h2 class="t-h2">Món bán chạy</h2><a href="#/menu" class="t-strong caramel">Xem thực đơn →</a></div>
      ${featured.map(menuItem).join("")}
    </section>
    <section class="card-w">
      <h2 class="t-h2">Đặt trước, đến là lấy</h2>
      <div class="how"><span class="num">1</span><div class="tx"><p class="t-strong">Chọn món</p><p class="t-caption">Thêm món vào giỏ chỉ với 1 chạm</p></div></div>
      <div class="how"><span class="num">2</span><div class="tx"><p class="t-strong">Thanh toán &amp; nhận số</p><p class="t-caption">QR hoặc tiền mặt, nhận số thứ tự ngay</p></div></div>
      <div class="how"><span class="num">3</span><div class="tx"><p class="t-strong">Lấy ly ở quầy tự phục vụ</p><p class="t-caption">Màn hình hiện số của bạn → lấy ly và đi</p></div></div>
    </section>
    <section class="svc">
      <div class="c">${ic("gift", 28)}<p class="t-strong">Tích điểm</p><p class="t-caption">10.000đ = 1 điểm. Đủ 50 điểm đổi 1 ly bất kỳ.</p></div>
      <div class="c">${ic("users", 28)}<p class="t-strong">Đơn nhóm văn phòng</p><p class="t-caption">Từ 5 ly, giao tận nơi trong bán kính 1 km.</p></div>
    </section>
    <section class="stack-8">
      ${info("clock", "Giờ mở cửa", "Thứ 2 – Chủ nhật · 6:30 – 22:00")}
      ${info("pin", "Địa chỉ", CONFIG.address)}
      ${info("parking", "Gửi xe", "Bãi xe máy miễn phí ngay trước quán")}
    </section>
  </div>
  <div class="footer-m"><p class="t-strong">NHANH. — cà phê mang đi trong 5 phút</p><p class="t-caption">Hotline ${CONFIG.hotline} · © 2026</p></div>
</div>`;
}

function homeDesktop() {
  const last = lastCode() && orderBy(lastCode());
  const o = last || demoOrder;
  const eta = o.status === "ready" || o.status === "picked_up" ? "Đã xong – mời lấy ly" : `Còn khoảng ${Math.max(1, Math.ceil((new Date(o.eta) - Date.now()) / 60000))} phút`;
  const live = `
<div class="live">
  <div class="top"><span class="t-caption">SỐ CỦA BẠN</span><span class="pill t-caption">● LIVE</span></div>
  <p class="no">#${o.code}</p>
  <div class="steps">
    ${step(o.status === "pending_payment" ? "active" : "done", "Đã nhận đơn", hm(new Date(o.receivedAt)))}
    ${step(o.status === "pending_payment" ? "pending" : o.status === "received" || o.status === "brewing" ? "active" : "done", "Đang pha chế", eta)}
    ${step(o.status === "ready" ? "active" : o.status === "picked_up" ? "done" : "pending", "Đã xong – mời lấy ly", "Quầy TỰ PHỤC VỤ")}
  </div>
</div>`;
  const col = (c) => {
    const items = MENU.filter((m) => m.cat === c.id);
    return `<div class="col"><div class="ch t-caption"><b>${c.head}</b><span>· ${items.length} món</span></div>${items
      .map((m) => `<div class="irow"><p class="n">${m.name}</p><p class="p">${vnd(m.price)}</p><button class="a" data-act="add" data-id="${m.id}" aria-label="Thêm ${m.name}">${ic("plus", 16)}</button></div>`)
      .join("")}</div>`;
  };
  const row = (icon, label, value) => `<div class="irow-d"><div class="iw">${ic(icon, 22)}</div><div class="tx"><p class="t-caption">${label}</p><p class="t-strong">${value}</p></div></div>`;
  return `
<div class="home-d">
  <section class="hero-d"><div class="d-wrap">
    <div class="left">
      <span class="badge-open-d t-caption">● Đang mở cửa · 6:30 – 22:00 · Thứ 2 – Chủ nhật</span>
      <h1>5 phút có cà phê mang đi.</h1>
      <p class="lead">Đặt trước trên điện thoại, đến quầy TỰ PHỤC VỤ lấy ly và đi. Không xếp hàng, không phải hỏi “bao giờ tới lượt”.</p>
      <div class="ctas"><a href="#/menu" class="btn primary">ĐẶT TRƯỚC NGAY ${ic("arrow")}</a><a href="#/menu" class="btn outline">Xem thực đơn</a></div>
      <div class="stats">
        <div class="s"><b>5′</b><span>từ lúc đặt tới lúc cầm ly</span></div>
        <div class="s"><b>3 chạm</b><span>để hoàn tất một đơn</span></div>
        <div class="s"><b>0đ</b><span>gửi xe ngay trước quán</span></div>
      </div>
    </div>
    ${live}
  </div></section>
  <div class="promo-d">${ic("bolt")}<span>GIỜ VÀNG 7:00 – 9:00 · Giảm 20% mọi món cà phê khi đặt online</span></div>
  <section class="sec-d"><div class="d-wrap">
    <div class="sec-head"><h2>Vì sao khách bận rộn chọn NHANH.</h2><p>Mọi tính năng đều nhằm giảm thời gian bạn phải ở trong quán.</p></div>
    <div class="grid4">
      <div class="ft"><div class="iw">${ic("clock")}</div><p class="t-strong">5 phút lấy món</p><p class="t-caption">Pha sẵn theo giờ bạn chọn, đến là có.</p></div>
      <div class="ft"><div class="iw">${ic("smartphone")}</div><p class="t-strong">Đặt trước online</p><p class="t-caption">Lấy ngay hoặc hẹn giờ, thanh toán QR.</p></div>
      <div class="ft"><div class="iw">${ic("bag")}</div><p class="t-strong">Số thứ tự rõ ràng</p><p class="t-caption">Màn hình + loa gọi số, không phải chen hỏi.</p></div>
      <div class="ft"><div class="iw">${ic("parking")}</div><p class="t-strong">Bãi xe miễn phí</p><p class="t-caption">Ngay trước cửa, có người trông giờ sáng.</p></div>
    </div>
  </div></section>
  <section class="sec-d tall white" id="thuc-don"><div class="d-wrap">
    <div class="sec-head row"><div class="l"><h2>Thực đơn</h2><p>Giá size M · Size L +5.000đ/món nước</p></div><a href="#/menu" class="btn dark">ĐẶT MÓN ${ic("arrow")}</a></div>
    <div class="cols">${CATS.map(col).join("")}</div>
    <p class="note-d">Hạt chủ lực: Robusta Đắk Lắk rang đậm, pha phin — đậm, nhiều caffeine cho buổi sáng. Bạc xỉu phối thêm Arabica (7:3) cho vị nhẹ.</p>
  </div></section>
  <section class="sec-d tall" id="cach-dat"><div class="d-wrap">
    <h2>Đặt trước, đến là lấy — 3 bước</h2>
    <div class="steps3">
      <div class="s3"><div class="top"><div class="box caramel">${ic("cup", 26)}</div><span class="big">01</span></div><p class="t-h2">Chọn món</p><p class="d">Lọc theo nhóm, chạm [+] để thêm vào giỏ.</p></div>
      <div class="s3"><div class="top"><div class="box caramel">${ic("qr", 26)}</div><span class="big">02</span></div><p class="t-h2">Thanh toán &amp; nhận số</p><p class="d">Chọn lấy ngay / hẹn giờ. QR hoặc tiền mặt.</p></div>
      <div class="s3"><div class="top"><div class="box caramel">${ic("check", 26)}</div><span class="big">03</span></div><p class="t-h2">Lấy ly và đi</p><p class="d">Màn hình hiện số của bạn → quầy TỰ PHỤC VỤ → lối RA.</p></div>
    </div>
  </div></section>
  <section class="sec-d tall dark" id="uu-dai"><div class="d-wrap">
    <h2>Cho khách quen mỗi sáng</h2>
    <div class="cards3">
      <div class="c3">${ic("gift", 32)}<p class="t-h2">Tích điểm thành viên</p><p class="d">Mỗi 10.000đ = 1 điểm theo số điện thoại. Đủ 50 điểm đổi 1 ly bất kỳ.</p></div>
      <div class="c3">${ic("users", 32)}<p class="t-h2">Đơn nhóm văn phòng</p><p class="d">Từ 5 ly, giao tận nơi trong bán kính 1 km theo giờ hẹn.</p></div>
      <div class="c3">${ic("wifi", 32)}<p class="t-h2">Khu chờ nhanh</p><p class="d">Ghế băng, bàn đứng, wifi miễn phí và ổ cắm sạc.</p></div>
    </div>
  </div></section>
  <section class="sec-d tall store-d"><div class="d-wrap">
    ${mapBlock()}
    <div class="info-d">
      <h2>Ghé quán</h2>
      ${row("pin", "Địa chỉ", CONFIG.address)}
      ${row("clock", "Giờ mở cửa", "Thứ 2 – Chủ nhật · 6:30 – 22:00")}
      ${row("parking", "Gửi xe", "Bãi xe máy miễn phí ngay trước quán")}
      ${row("phone", "Hotline", CONFIG.hotline)}
      <div class="acts-d"><a href="${CONFIG.mapsUrl}" target="_blank" rel="noopener" class="btn primary">CHỈ ĐƯỜNG ${ic("arrow")}</a>${callLink("Gọi quán", "outline")}</div>
    </div>
  </div></section>
  <footer class="foot-d">
    <div class="l"><p class="t-h3">NHANH. — cà phê mang đi trong 5 phút</p><p class="t-caption">© 2026 · Bài tập Giai đoạn 3 – Nhóm anh Hiếu</p></div>
    <div class="links"><a href="#/menu">Thực đơn</a><a href="#/order">Tra cứu đơn</a><a href="#/store">Đơn nhóm</a><span>Facebook</span><span>Zalo</span></div>
  </footer>
</div>`;
}

const callLink = (label, variant, full = false) =>
  CONFIG.hotlineTel
    ? `<a href="tel:${CONFIG.hotlineTel}" class="btn ${variant}${full ? " full" : ""}">${label}</a>`
    : `<span class="btn ${variant}${full ? " full" : ""}">${label}</span>`;

const mapBlock = () => `
<div class="map">
  <i style="left:0;top:120px;width:100%;height:16px"></i>
  <i style="left:150px;top:0;width:14px;height:100%"></i>
  <i style="left:0;top:40px;width:100%;height:8px"></i>
  <i style="left:270px;top:0;width:8px;height:100%"></i>
  <i style="left:40px;top:0;width:6px;height:100%"></i>
  <span class="pin">${ic("pin")}</span>
  <span class="lab t-caption">NHANH. · 350m</span>
</div>`;

function menuListHTML() {
  const q = S.q.trim().toLowerCase();
  let items;
  let head;
  if (q) {
    items = MENU.filter((m) => m.name.toLowerCase().includes(q));
    head = `KẾT QUẢ · ${items.length} món`;
  } else {
    const c = CATS.find((x) => x.id === S.cat);
    items = MENU.filter((m) => m.cat === S.cat);
    head = `${c.head} · ${items.length} món`;
  }
  return `<p class="t-caption group-label">${head}</p>${items.length ? items.map(menuItem).join("") : '<p class="muted">Không tìm thấy món phù hợp.</p>'}`;
}

function menuView() {
  const t = totals(cart);
  const bar = cartCount()
    ? `<div class="sticky over-tab"><div class="sticky-in"><a href="#/cart" class="cartbar"><span class="l"><span class="n t-caption">${cartCount()}</span><span class="t-strong">${cartCount()} món · ${vnd(t.subtotal)}</span></span><span class="r">Xem giỏ ${ic("arrow", 20)}</span></a></div></div>`
    : "";
  return `
<div class="page">
  <div class="menu-top">
    <div class="title-row"><h1 class="t-display-l">Thực đơn</h1><span class="size-note t-caption">Size L +5.000đ</span></div>
    <label class="search">${ic("search", 20)}<input id="q" type="search" placeholder="Tìm món… (vd: bạc xỉu)" value="${S.q.replace(/"/g, "&quot;")}" autocomplete="off"></label>
    <div class="chips">${CATS.map((c) => `<button class="chip ${!S.q && S.cat === c.id ? "on" : ""}" data-act="cat" data-id="${c.id}">${c.label}</button>`).join("")}</div>
    <div class="golden t-caption">${ic("bolt", 18)}<span>${isGolden() ? "Đang trong giờ vàng: -20% cà phê đặt online" : "Giờ vàng 7:00–9:00: -20% cà phê đặt online"}</span></div>
  </div>
  <div class="menu-list" id="menu-list">${menuListHTML()}</div>
</div>
${bar}
${tabbar("menu")}`;
}

function radio(icon, title, sub, on, attrs, disabled = false) {
  return `<button class="radio ${on ? "on" : ""} ${disabled ? "off" : ""}" role="radio" aria-checked="${on}" ${attrs} ${disabled ? "disabled" : ""}><span class="lead">${ic(icon)}</span><span class="tx"><span class="t-strong">${title}</span><span class="t-caption">${sub}</span></span><span class="dot"></span></button>`;
}

function pointsMessage(total) {
  const earn = pointsFor(total);
  const phone = S.phone.trim();
  const cur = /^0\d{9}$/.test(phone) ? db.points[phone] || 0 : 0;
  const left = Math.max(0, FREE_DRINK_POINTS - (cur + earn));
  return `Đơn này được +${earn} điểm · Bạn còn ${left} điểm nữa để đổi 1 ly miễn phí`;
}

function cartView() {
  if (!cart.length) {
    return `<div class="page no-tab">${navbar("Giỏ hàng")}<div class="empty"><p>Giỏ hàng đang trống.</p><a href="#/menu" class="btn primary">Xem thực đơn</a></div></div>`;
  }
  const now = new Date();
  const t = totals(cart, now);
  const lines = cart
    .map((l) => {
      const item = find(l.id);
      const size = hasSize(item) ? l.size : "M";
      const price = unit(item, size) * l.qty;
      const opt = hasSize(item)
        ? `<button class="opt t-caption" data-act="size" data-id="${l.id}" data-size="${l.size}">Size ${size} · Đổi size</button>`
        : `<span class="opt t-caption muted">Không có size</span>`;
      return `<div class="cl"><div class="tx"><p class="t-strong">${item.name}</p>${opt}<p class="t-strong caramel">${vnd(price)}</p></div><div class="stepper"><button class="minus" data-act="dec" data-id="${l.id}" data-size="${l.size}" aria-label="Giảm">${ic("minus", 18)}</button><span class="q t-strong">${l.qty}</span><button class="plus" data-act="inc" data-id="${l.id}" data-size="${l.size}" aria-label="Tăng">${ic("plus", 18)}</button></div></div>`;
    })
    .join("");
  const scheduled = S.pickup === "scheduled";
  if (scheduled && S.pay === "cash") S.pay = "qr";
  return `
<div class="page no-tab">
  ${navbar("Giỏ hàng", '<button class="link" data-act="clear">Xoá hết</button>')}
  <div class="body">
    <div class="stack-10">${lines}<a href="#/menu" class="add-more t-strong">+ Thêm món khác</a></div>
    <div class="stack-10">
      <h2 class="t-h3">Giờ lấy món</h2>
      ${radio("bolt", "Lấy ngay", `Sẵn sàng lúc ~${hm(addMin(now, SOON_MINUTES))} (khoảng ${SOON_MINUTES} phút)`, !scheduled, 'data-act="pickup" data-v="now"')}
      ${radio("clock", "Hẹn giờ", "Chọn giờ lấy, quán pha sẵn trước 2 phút", scheduled, 'data-act="pickup" data-v="scheduled"')}
      ${scheduled ? `<label class="field">${ic("clock", 20)}<input id="time" type="time" value="${S.time}" aria-label="Giờ hẹn"></label>` : ""}
    </div>
    <div class="stack-10">
      <h2 class="t-h3">Thanh toán</h2>
      ${radio("qr", "Quét mã QR", "Momo · ZaloPay · Ngân hàng", S.pay === "qr", 'data-act="pay" data-v="qr"')}
      ${radio("cash", "Tiền mặt tại quán", "Trả ở quầy khi nhận ly", S.pay === "cash", 'data-act="pay" data-v="cash"', scheduled)}
    </div>
    <div class="stack-8">
      <h2 class="t-h3">Số điện thoại (tích điểm)</h2>
      <label class="field">${ic("phone", 20)}<input id="phone" type="tel" inputmode="tel" placeholder="09xx xxx xxx" value="${S.phone}" autocomplete="tel"></label>
      <p class="t-caption green" id="points">${pointsMessage(t.total)}</p>
    </div>
    <div class="sum">
      <div class="row"><span class="a">Tạm tính</span><span class="t-strong">${vnd(t.subtotal)}</span></div>
      ${t.discount ? `<div class="row g"><span class="a">Giờ vàng −20% (cà phê)</span><span class="b t-strong">−${vnd(t.discount)}</span></div>` : ""}
      <hr>
      <div class="row"><span class="t-h3">Tổng cộng</span><span class="t-h2">${vnd(t.total)}</span></div>
    </div>
  </div>
  <div class="sticky"><div class="sticky-in">
    ${S.err ? `<p class="err" role="alert">${S.err}</p>` : ""}
    <button class="btn dark full" data-act="submit">XÁC NHẬN ĐẶT MÓN · ${vnd(t.total)} ${ic("arrow")}</button>
  </div></div>
</div>`;
}

function submitOrder() {
  S.err = "";
  const phone = S.phone.trim();
  if (phone && !/^0\d{9}$/.test(phone)) S.err = "Số điện thoại không hợp lệ";
  else if (S.pickup === "scheduled") {
    if (!/^\d{2}:\d{2}$/.test(S.time)) S.err = "Chọn giờ hẹn lấy";
    else if (new Date(`${dayKey(new Date())}T${S.time}:00+07:00`) <= new Date()) S.err = "Giờ hẹn phải sau thời điểm hiện tại";
  }
  if (S.err) return render();
  const o = createOrder();
  cart = [];
  saveCart();
  S.phone = "";
  S.time = "";
  S.pickup = "now";
  S.pay = "qr";
  location.hash = `#/order/${o.code}`;
}

function qrBlock(o) {
  if (o.status !== "pending_payment") return "";
  const img = CONFIG.bank && CONFIG.account
    ? `<img alt="Mã VietQR" src="https://img.vietqr.io/image/${CONFIG.bank}-${CONFIG.account}-compact2.png?amount=${o.total}&addInfo=${encodeURIComponent("NHANH " + o.code)}&accountName=${encodeURIComponent(CONFIG.accountName)}">`
    : "";
  return `<div class="payqr"><p class="t-strong">Chuyển khoản ${vnd(o.total)}</p><p class="t-caption">Nội dung: NHANH ${o.code}</p>${img}</div>`;
}

function orderView(code) {
  const target = code || lastCode();
  if (!target) {
    return `<div class="page">${navbar("Đơn của bạn")}<div class="empty"><p>Bạn chưa có đơn nào hôm nay.</p><a href="#/menu" class="btn primary">Đặt món ngay</a></div></div>${tabbar("order")}`;
  }
  const o = orderBy(target);
  if (!o) {
    return `<div class="page">${navbar("Đơn của bạn")}<div class="empty"><p>Không tìm thấy đơn #${target}.</p><a href="#/menu" class="btn primary">Đặt món ngay</a></div></div>${tabbar("order")}`;
  }
  const done = o.status === "ready" || o.status === "picked_up";
  const left = Math.max(1, Math.ceil((new Date(o.eta) - Date.now()) / 60000));
  const pct = { pending_payment: 10, received: 33, brewing: 61, ready: 100, picked_up: 100 }[o.status];
  const pill = done
    ? `<div class="eta done">${ic("check", 18)}<span>Đơn đã xong – mời lấy ly</span></div>`
    : `<div class="eta">${ic("clock", 18)}<span>Xong lúc ~${hm(new Date(o.eta))} · còn ${left} phút</span></div>`;
  const rows = o.items.map((i) => `<div class="row"><span class="a">${i.qty} × ${i.name}${hasSize(find(i.id)) ? ` (${i.size})` : ""}</span><span class="t-strong">${vnd(i.unit * i.qty)}</span></div>`).join("");
  return `
<div class="page">
  ${navbar("Đơn của bạn")}
  <div class="body">
    <div class="ticket"><p class="lbl t-caption">SỐ CỦA BẠN</p><p class="no">#${o.code}</p>${pill}<div class="progress"><i style="width:${pct}%"></i></div></div>
    ${qrBlock(o)}
    <div class="steps" aria-live="polite">${orderSteps(o)}</div>
    <div class="hint">${ic("smartphone")}<p class="t-small">Khi màn hình tại quán hiện #${o.code}, đến quầy TỰ PHỤC VỤ lấy ly. Ống hút &amp; khăn giấy ở kệ cạnh lối RA.</p></div>
    <div class="detail">
      <p class="t-h3">Chi tiết đơn</p>
      ${rows}
      ${o.discount ? `<div class="row g"><span class="a">Giờ vàng −20% (cà phê)</span><span class="b t-strong">−${vnd(o.discount)}</span></div>` : ""}
      <div class="row"><span class="t-strong">Tổng cộng</span><span class="t-strong">${vnd(o.total)}</span></div>
      ${o.phone ? `<div class="row g"><span class="a">Điểm tích luỹ</span><span class="b t-strong">+${pointsFor(o.total)} điểm</span></div>` : ""}
    </div>
    <a href="#/" class="btn outline full">Về trang chủ</a>
  </div>
</div>
${tabbar("order")}`;
}

function storeView() {
  return `
<div class="page">
  ${navbar("Cửa hàng")}
  <div class="body" style="gap:16px">
    ${mapBlock()}
    <div class="stack-8">
      ${info("pin", "Địa chỉ", CONFIG.address)}
      ${info("clock", "Giờ mở cửa", "Thứ 2 – Chủ nhật · 6:30 – 22:00")}
      ${info("parking", "Gửi xe", "Bãi xe máy miễn phí ngay trước quán, có người trông giờ sáng")}
      ${info("wifi", "Khu chờ nhanh", "Wifi miễn phí + ổ cắm sạc")}
      ${info("users", "Đơn nhóm văn phòng", "Từ 5 ly · giao trong bán kính 1 km")}
    </div>
    <div class="stack-10">
      ${callLink(`GỌI ${CONFIG.hotline}`, "primary", true)}
      <a href="${CONFIG.mapsUrl}" target="_blank" rel="noopener" class="btn outline full">Chỉ đường đến quán ${ic("arrow")}</a>
    </div>
  </div>
</div>
${tabbar("store")}`;
}

const statusLabel = { pending_payment: "Chờ thanh toán", received: "Đã nhận", brewing: "Đang pha", ready: "Đã xong", picked_up: "Đã lấy" };

function staffView() {
  if (sessionStorage.getItem("nhanh-staff") !== "1") {
    return `<form class="pin-form" id="pin-form"><h1 class="t-h2">Màn hình bếp</h1><label class="field"><input id="pin" type="password" inputmode="numeric" placeholder="Nhập PIN" autocomplete="off"></label>${S.err ? `<p class="err">${S.err}</p>` : ""}<button class="btn dark full">Vào</button></form>`;
  }
  const list = todayOrders().filter((o) => o.status !== "picked_up");
  const cards = list
    .map((o) => {
      const late = o.status === "brewing" && Date.now() - new Date(o.receivedAt) > 8 * 60000;
      const acts = [];
      if (!o.paid) acts.push(`<button class="btn green-b" data-act="staff" data-code="${o.code}" data-a="paid">Đã thu</button>`);
      if (o.status === "received") acts.push(`<button class="btn primary" data-act="staff" data-code="${o.code}" data-a="start">Bắt đầu pha</button>`);
      if (o.status === "brewing") acts.push(`<button class="btn green-b" data-act="staff" data-code="${o.code}" data-a="ready">Xong</button>`);
      if (o.status === "ready") acts.push(`<button class="btn dark" data-act="staff" data-code="${o.code}" data-a="picked">Đã lấy</button><button class="btn red-b" data-act="staff" data-code="${o.code}" data-a="redo">Làm lại</button>`);
      return `<div class="oc ${o.priority ? "pri" : ""} ${late ? "late" : ""}">
        <div class="hd"><span class="t-display-l">#${o.code}</span><span class="t-caption muted">${statusLabel[o.status]}${o.priority ? " · ƯU TIÊN" : ""}${late ? " · QUÁ 8 PHÚT" : ""}</span></div>
        <ul>${o.items.map((i) => `<li>${i.qty}× ${i.name}${hasSize(find(i.id)) ? ` (${i.size})` : ""}</li>`).join("")}</ul>
        <p class="t-small">${vnd(o.total)} · ${o.pay === "qr" ? "QR" : "Tiền mặt"} · ${o.paid ? "ĐÃ THU" : "CHƯA THU"}${o.pickupAt ? ` · hẹn ${hm(new Date(o.pickupAt))}` : ""}</p>
        <div class="acts">${acts.join("")}</div>
      </div>`;
    })
    .join("");
  return `<div class="staff"><h1 class="t-h2">Đơn đang xử lý (${list.length})</h1><div class="board">${cards}</div></div>`;
}

let seenReady = null;

function screenView() {
  const list = todayOrders();
  const ready = list.filter((o) => o.status === "ready").map((o) => o.code);
  const brewing = list.filter((o) => o.status === "brewing").map((o) => o.code);
  if (seenReady === null) seenReady = new Set(ready);
  const fresh = ready.filter((c) => !seenReady.has(c));
  fresh.forEach((c) => seenReady.add(c));
  if (fresh.length && "speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(`Mời số ${fresh.join(", ")} nhận đồ uống`);
    u.lang = "vi-VN";
    speechSynthesis.speak(u);
  }
  return `<div class="screen"><section class="ready"><h1>XONG – MỜI LẤY LY</h1><div class="nums">${ready.map((c) => `<span class="rn">${c}</span>`).join("")}</div></section><section class="brew"><h1>ĐANG PHA</h1><div class="nums">${brewing.map((c) => `<span class="bn">${c}</span>`).join("")}</div></section></div>`;
}

const app = document.getElementById("app");

function render() {
  const r = route();
  const y = window.scrollY;
  let html;
  if (r.name === "menu") html = topbar() + menuView();
  else if (r.name === "cart") html = topbar() + cartView();
  else if (r.name === "order") html = topbar() + orderView(r.arg);
  else if (r.name === "store") html = topbar() + storeView();
  else if (r.name === "staff") html = staffView();
  else if (r.name === "screen") html = screenView();
  else html = topbar() + homeMobile() + homeDesktop() + tabbar("home");
  app.innerHTML = html;
  const titles = { menu: "Thực đơn", cart: "Giỏ hàng", order: "Đơn của bạn", store: "Cửa hàng", staff: "Màn hình bếp", screen: "Gọi số" };
  document.title = titles[r.name] ? `${titles[r.name]} – NHANH.` : "NHANH. – Cà phê mang đi";
  window.scrollTo(0, y);
}

function go() {
  S.err = "";
  render();
  window.scrollTo(0, 0);
}

document.addEventListener("click", (e) => {
  const scroller = e.target.closest("[data-scroll]");
  if (scroller) {
    const id = scroller.dataset.scroll;
    if (route().name === "home") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
    }
    return;
  }
  const t = e.target.closest("[data-act]");
  if (!t) return;
  const a = t.dataset.act;
  const id = t.dataset.id;
  if (a === "add") addToCart(id);
  else if (a === "inc") changeQty(id, t.dataset.size, 1);
  else if (a === "dec") changeQty(id, t.dataset.size, -1);
  else if (a === "size") toggleSize(id, t.dataset.size);
  else if (a === "clear") {
    cart = [];
    saveCart();
  } else if (a === "cat") {
    S.cat = id;
    S.q = "";
  } else if (a === "pickup") {
    S.pickup = t.dataset.v;
    if (S.pickup === "scheduled") S.pay = "qr";
  } else if (a === "pay") S.pay = t.dataset.v;
  else if (a === "back") {
    if (history.length > 1) history.back();
    else location.hash = "#/";
    return;
  } else if (a === "submit") return submitOrder();
  else if (a === "staff") staffAction(t.dataset.code, t.dataset.a);
  render();
});

document.addEventListener("input", (e) => {
  if (e.target.id === "q") {
    S.q = e.target.value;
    document.getElementById("menu-list").innerHTML = menuListHTML();
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", !S.q && c.dataset.id === S.cat));
  } else if (e.target.id === "phone") {
    S.phone = e.target.value;
    const msg = document.getElementById("points");
    if (msg) msg.textContent = pointsMessage(totals(cart).total);
  } else if (e.target.id === "time") {
    S.time = e.target.value;
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.id !== "pin-form") return;
  e.preventDefault();
  if (document.getElementById("pin").value === CONFIG.staffPin) {
    sessionStorage.setItem("nhanh-staff", "1");
    S.err = "";
  } else {
    S.err = "Sai PIN";
  }
  render();
});

window.addEventListener("hashchange", go);

let signature = "";
function sync() {
  const live = ["order", "staff", "screen", "home"].includes(route().name);
  if (!live) return;
  db = read(localStorage, "nhanh-db", db);
  const next = JSON.stringify(db) + Math.floor(Date.now() / 60000);
  if (next === signature) return;
  signature = next;
  const typing = document.activeElement && ["INPUT"].includes(document.activeElement.tagName);
  if (!typing) render();
}

window.addEventListener("storage", sync);
setInterval(sync, 1500);
render();
signature = JSON.stringify(db) + Math.floor(Date.now() / 60000);
