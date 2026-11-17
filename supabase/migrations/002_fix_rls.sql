-- Fix RLS policies: scope reads to own records + admin only
-- Run this in the Supabase SQL editor.

-- ── Orders ────────────────────────────────────────────────────────────────────

-- Drop the broad policy that lets any authenticated user read ALL orders
drop policy if exists "orders_select" on public.orders;
drop policy if exists "orders_update_admin" on public.orders;

-- Customers can only read their own orders
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

-- Admins (user_metadata.role = 'admin') can read all orders
create policy "orders_select_admin" on public.orders
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Only admins can update orders
create policy "orders_update_admin" on public.orders
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- ── Quotes ────────────────────────────────────────────────────────────────────

-- Drop the broad policy that lets any authenticated user read ALL quotes
drop policy if exists "quotes_select_admin" on public.quotes;
drop policy if exists "quotes_update_admin" on public.quotes;

-- Only admins can read quotes
create policy "quotes_select_admin" on public.quotes
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Only admins can update quotes
create policy "quotes_update_admin" on public.quotes
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- ── Track Order function (SECURITY DEFINER bypasses RLS safely) ───────────────
-- Anonymous users can't read the orders table directly after the fix above.
-- This function verifies order_number + email server-side and returns only
-- the status fields — no other order data is exposed.

create or replace function public.track_order(p_order_number text, p_email text)
returns table(order_number text, status text, created_at timestamptz, payment_method text)
language sql security definer stable
as $$
  select o.order_number, o.status, o.created_at, o.payment_method
  from public.orders o
  where o.order_number = upper(trim(p_order_number))
    and lower(o.email) = lower(trim(p_email))
  limit 1;
$$;

-- Restrict who can call this function (anon + authenticated both need it)
grant execute on function public.track_order(text, text) to anon, authenticated;
