-- ── 009: Customer and Product formatted IDs ──────────────────────────────────

-- 1. Add product_number BIGSERIAL to products
alter table public.products
  add column if not exists product_number bigserial;

-- Create a unique index so lookups are fast
create unique index if not exists products_product_number_idx
  on public.products (product_number);

-- 2. Create customers table (derived from orders, one row per unique email)
create table if not exists public.customers (
  id              uuid primary key default gen_random_uuid(),
  customer_number bigserial unique not null,
  email           text unique not null,
  name            text,
  phone           text,
  user_id         uuid references auth.users(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- RLS: admins can read/write; users can read their own row
alter table public.customers enable row level security;

create policy "Admins full access on customers"
  on public.customers for all
  using (
    (auth.jwt()->'user_metadata'->>'role') in ('admin','super_admin')
  );

create policy "Users read own customer row"
  on public.customers for select
  using (auth.uid() = user_id);

-- 3. Backfill customers from existing orders (one row per unique email, oldest first)
insert into public.customers (email, name, phone, user_id, created_at)
select distinct on (lower(email))
  lower(email)   as email,
  customer_name  as name,
  phone,
  user_id,
  min(created_at) over (partition by lower(email)) as created_at
from public.orders
where email is not null
order by lower(email), created_at asc
on conflict (email) do nothing;

-- 4. Trigger: auto-upsert customer when a new order is inserted
create or replace function public.upsert_customer_from_order()
returns trigger language plpgsql security definer as $$
begin
  insert into public.customers (email, name, phone, user_id)
  values (
    lower(new.email),
    new.customer_name,
    new.phone,
    new.user_id
  )
  on conflict (email) do update
    set
      name       = coalesce(excluded.name, public.customers.name),
      phone      = coalesce(excluded.phone, public.customers.phone),
      user_id    = coalesce(excluded.user_id, public.customers.user_id),
      updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_upsert_customer on public.orders;
create trigger trg_upsert_customer
  after insert on public.orders
  for each row execute function public.upsert_customer_from_order();
