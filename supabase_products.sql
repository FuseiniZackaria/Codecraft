-- Digital Products for the website. Run once in the Supabase SQL Editor,
-- after supabase_security.sql (it uses public.is_admin()).
-- Uses its own table, digital_products, because the AI agent app that
-- shares this database already has a table called "products".

create table if not exists public.digital_products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price_ghs numeric(10, 2) check (price_ghs is null or price_ghs >= 0),
  image_url text,
  selar_url text check (selar_url is null or selar_url ~* '^https://[^\s/]+\.[^\s]+$'),
  visible boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamp with time zone default now()
);

alter table public.digital_products enable row level security;

drop policy if exists "Public read visible digital products" on public.digital_products;
drop policy if exists "Admin manage digital products" on public.digital_products;

-- Visitors only see products marked visible.
create policy "Public read visible digital products" on public.digital_products
  for select using (visible = true);

-- Admins (public.admin_users) can see and change everything.
create policy "Admin manage digital products" on public.digital_products
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Starting products: hidden, no price, image or Selar link yet.
insert into public.digital_products (name, sort_order, visible)
select v.name, v.sort_order, false
from (values
  ('Handbook', 1),
  ('Prompt Pack', 2),
  ('Get Found', 3),
  ('Safe AI', 4),
  ('WhatsApp Kit', 5),
  ('Build Your First AI Agent (course)', 6)
) as v(name, sort_order)
where not exists (select 1 from public.digital_products p where p.name = v.name);
