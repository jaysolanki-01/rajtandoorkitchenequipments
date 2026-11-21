-- Security hardening: fix order user_id spoofing, add status constraints, add indexes
-- Run this in the Supabase SQL editor after 002_fix_rls.sql.

-- ── 1. Fix orders_insert: prevent user_id spoofing ────────────────────────────
-- The old policy (with check (true)) allowed any authenticated user to set
-- user_id to any UUID, causing orders to appear in the victim's account history.
-- New policy: user_id must be NULL (guest) or match the caller's own auth.uid().

drop policy if exists "orders_insert" on public.orders;

create policy "orders_insert" on public.orders
  for insert with check (
    user_id IS NULL
    OR auth.uid() = user_id
  );

-- ── 2. Status check constraints ───────────────────────────────────────────────
-- Prevent arbitrary strings being written to status columns via the anon key.

alter table public.orders
  add constraint orders_status_check
  check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled'));

alter table public.quotes
  add constraint quotes_status_check
  check (status in ('pending', 'contacted', 'quoted', 'done', 'cancelled'));

-- ── 3. Performance indexes ────────────────────────────────────────────────────
-- Queried on every admin page load and customer account page.

create index if not exists orders_user_id_idx      on public.orders (user_id);
create index if not exists orders_status_idx       on public.orders (status);
create index if not exists orders_created_at_idx   on public.orders (created_at desc);
create index if not exists orders_email_idx        on public.orders (email);
create index if not exists orders_order_number_idx on public.orders (order_number);

create index if not exists quotes_status_idx     on public.quotes (status);
create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_email_idx      on public.quotes (email);
