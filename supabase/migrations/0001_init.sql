create table orders (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  day date not null,
  status text not null default 'pending_payment'
    check (status in ('pending_payment','received','brewing','ready','picked_up')),
  pickup_type text not null check (pickup_type in ('now','scheduled')),
  pickup_at timestamptz,
  pay_method text not null check (pay_method in ('qr','cash')),
  paid boolean not null default false,
  priority boolean not null default false,
  subtotal int not null,
  discount int not null default 0,
  total int not null,
  phone text,
  items jsonb not null,
  ready_at timestamptz,
  created_at timestamptz not null default now(),
  unique (day, code)
);

create table members (
  phone text primary key,
  points int not null default 0,
  updated_at timestamptz not null default now()
);

create table order_counters (
  day date primary key,
  n int not null default 0
);

-- Số đơn reset về 001 mỗi ngày, an toàn khi nhiều đơn cùng lúc.
create function next_order_code(p_day date) returns text language plpgsql as $$
declare v int;
begin
  insert into order_counters(day, n) values (p_day, 1)
  on conflict (day) do update set n = order_counters.n + 1
  returning n into v;
  return lpad(v::text, 3, '0');
end $$;

create function add_member_points(p_phone text, p_points int) returns void language sql as $$
  insert into members(phone, points) values (p_phone, p_points)
  on conflict (phone) do update set points = members.points + p_points, updated_at = now();
$$;

-- Chỉ server (service role) ghi/đọc; trình duyệt không truy cập trực tiếp.
alter table orders enable row level security;
alter table members enable row level security;
alter table order_counters enable row level security;
