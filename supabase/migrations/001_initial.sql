-- Products table
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  category_label text not null,
  short_description text not null,
  description text not null,
  image text not null,
  images text[] not null default '{}',
  price integer,  -- null = price on enquiry, stored in paise (multiply ₹ by 1 for display since we store rupees)
  currency text not null default 'INR',
  specs jsonb not null default '[]',
  features text[] not null default '{}',
  is_demo boolean not null default false,
  in_stock boolean not null default true,
  price_label text,
  group_id text,
  warranty text,
  included text[],
  tags text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Quotes table (from request-quote form, checkout enquiry, contact form)
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default ('QT-' || to_char(now(), 'YYYYMMDD') || '-' || floor(random()*9000+1000)::text),
  customer_name text not null,
  email text not null,
  phone text,
  business_name text,
  product_interest text,
  quantity text,
  requirements text,
  delivery_location text,
  source text not null default 'website',  -- 'quote-form' | 'checkout' | 'contact' | 'product-page'
  status text not null default 'pending',  -- 'pending' | 'contacted' | 'quoted' | 'done' | 'cancelled'
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Orders table (from checkout place-order flow)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('ORD-' || floor(random()*90000+10000)::text),
  customer_name text not null,
  email text not null,
  phone text not null,
  address jsonb not null,
  items jsonb not null,
  subtotal integer not null,
  shipping integer not null default 0,
  total integer not null,
  payment_method text not null default 'cod',
  status text not null default 'pending',
  user_id uuid references auth.users(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: allow anon insert (website visitors submit quotes/orders), authenticated read all
alter table public.products enable row level security;
alter table public.quotes enable row level security;
alter table public.orders enable row level security;

-- Drop existing policies before recreating (safe re-run)
drop policy if exists "products_select" on public.products;
drop policy if exists "products_insert" on public.products;
drop policy if exists "products_update" on public.products;
drop policy if exists "products_delete" on public.products;
drop policy if exists "quotes_insert" on public.quotes;
drop policy if exists "quotes_select_admin" on public.quotes;
drop policy if exists "quotes_update_admin" on public.quotes;
drop policy if exists "orders_insert" on public.orders;
drop policy if exists "orders_select" on public.orders;
drop policy if exists "orders_update_admin" on public.orders;

-- Products: anyone can read, only service_role can write
create policy "products_select" on public.products for select using (true);
create policy "products_insert" on public.products for insert with check (auth.role() = 'service_role');
create policy "products_update" on public.products for update using (auth.role() = 'service_role');
create policy "products_delete" on public.products for delete using (auth.role() = 'service_role');

-- Quotes: anyone can insert, authenticated users can read all (admin)
create policy "quotes_insert" on public.quotes for insert with check (true);
create policy "quotes_select_admin" on public.quotes for select using (auth.role() = 'authenticated');
create policy "quotes_update_admin" on public.quotes for update using (auth.role() = 'authenticated');

-- Orders: anyone can insert (guest checkout), authenticated can read own + admin reads all
create policy "orders_insert" on public.orders for insert with check (true);
create policy "orders_select" on public.orders for select using (
  auth.uid() = user_id or auth.role() = 'authenticated'
);
create policy "orders_update_admin" on public.orders for update using (auth.role() = 'authenticated');

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists products_updated_at on public.products;
drop trigger if exists quotes_updated_at on public.quotes;
drop trigger if exists orders_updated_at on public.orders;
create trigger products_updated_at before update on public.products for each row execute procedure public.set_updated_at();
create trigger quotes_updated_at before update on public.quotes for each row execute procedure public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();
