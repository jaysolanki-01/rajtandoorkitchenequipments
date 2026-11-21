-- ══════════════════════════════════════════════════════════════════════════════
-- ADMIN COMPLETE SETUP  —  Run this in Supabase Dashboard → SQL Editor
-- Safe to run multiple times (all statements use IF NOT EXISTS / OR REPLACE).
-- ══════════════════════════════════════════════════════════════════════════════

-- ── STEP 1: Fix orders status constraint (add 'confirmed') ────────────────────
-- Drop the old constraint (if it exists) and re-add with 'confirmed' included.
alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
  check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'));

-- ── STEP 2: Add default status so new orders start as 'pending' ───────────────
alter table public.orders alter column status set default 'pending';

-- ── STEP 3: Admin RLS — orders (select + update for admin/super_admin) ────────
drop policy if exists "orders_select_admin" on public.orders;
drop policy if exists "orders_update_admin" on public.orders;

create policy "orders_select_admin" on public.orders
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

create policy "orders_update_admin" on public.orders
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

-- ── STEP 4: Admin RLS — quotes (select + update) ─────────────────────────────
drop policy if exists "quotes_select_admin"  on public.quotes;
drop policy if exists "quotes_update_admin"  on public.quotes;

create policy "quotes_select_admin" on public.quotes
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

create policy "quotes_update_admin" on public.quotes
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

-- ── STEP 5: Admin RLS — products (insert, update, delete) ────────────────────
drop policy if exists "products_insert" on public.products;
drop policy if exists "products_update" on public.products;
drop policy if exists "products_delete" on public.products;

create policy "products_insert" on public.products
  for insert with check (
    auth.role() = 'service_role'
    or (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

create policy "products_update" on public.products
  for update using (
    auth.role() = 'service_role'
    or (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

create policy "products_delete" on public.products
  for delete using (
    auth.role() = 'service_role'
    or (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
    or (auth.jwt() -> 'app_metadata'  ->> 'role') in ('admin', 'super_admin')
  );

-- ── STEP 6: Performance indexes (safe to re-run) ─────────────────────────────
create index if not exists orders_user_id_idx      on public.orders (user_id);
create index if not exists orders_status_idx       on public.orders (status);
create index if not exists orders_created_at_idx   on public.orders (created_at desc);
create index if not exists orders_email_idx        on public.orders (email);
create index if not exists orders_order_number_idx on public.orders (order_number);

create index if not exists quotes_status_idx     on public.quotes (status);
create index if not exists quotes_created_at_idx on public.quotes (created_at desc);

-- ── STEP 7: Reload PostgREST schema cache ────────────────────────────────────
notify pgrst, 'reload schema';

-- ══════════════════════════════════════════════════════════════════════════════
-- AFTER running this SQL, set the admin role on your Supabase user:
--
--   Option A (SQL — replace the email):
--     update auth.users
--     set raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb
--     where email = 'your-admin-email@example.com';
--
--   Option B (Dashboard):
--     Supabase Dashboard → Authentication → Users → click your user
--     → Edit → User Metadata → add: {"role": "admin"} → Save
--
-- Then sign out and sign back in at /admin/login.
-- ══════════════════════════════════════════════════════════════════════════════
