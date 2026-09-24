-- Схема заказов магазина PRIZ.
-- Выполните в Supabase: SQL Editor -> New query -> вставить -> Run.
-- Сайт использует только publishable (anon) ключ и может ТОЛЬКО создавать заказы.
-- Читать и менять заказы можно в панели Supabase (Table Editor) или с service-ключом.

create table if not exists public.shop_orders (
  id            uuid primary key,
  order_no      text not null,
  created_at    timestamptz not null default now(),
  customer_name text not null check (char_length(customer_name) between 2 and 100),
  phone         text not null check (char_length(phone) between 6 and 30),
  city          text check (char_length(city) <= 100),
  delivery      text not null check (delivery in ('courier', 'post', 'pickup')),
  address       text check (char_length(address) <= 300),
  comment       text check (char_length(comment) <= 500),
  total         numeric(10, 2) not null check (total >= 0),
  status        text not null default 'new'
                check (status in ('new', 'confirmed', 'shipped', 'done', 'cancelled'))
);

create table if not exists public.shop_order_items (
  id           bigint generated always as identity primary key,
  order_id     uuid not null references public.shop_orders(id) on delete cascade,
  product_id   text not null,
  product_name text not null,
  size         text,
  color        text,
  qty          int not null check (qty between 1 and 20),
  price        numeric(10, 2) not null check (price >= 0)
);

create index if not exists shop_order_items_order_idx on public.shop_order_items(order_id);
create index if not exists shop_orders_created_idx on public.shop_orders(created_at desc);

alter table public.shop_orders enable row level security;
alter table public.shop_order_items enable row level security;

-- Гости сайта могут только добавлять заказы (читать их нельзя).
drop policy if exists "shop: anyone can place order" on public.shop_orders;
create policy "shop: anyone can place order" on public.shop_orders
  for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "shop: anyone can add order items" on public.shop_order_items;
create policy "shop: anyone can add order items" on public.shop_order_items
  for insert to anon, authenticated
  with check (true);
