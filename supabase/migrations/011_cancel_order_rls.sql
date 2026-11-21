-- ── 011: Allow authenticated users to cancel their own orders ─────────────────

-- Users may update status → 'cancelled' on their own orders
-- only when the current status is pending or confirmed
create policy "users can cancel own orders"
  on public.orders
  for update
  using (
    auth.uid() = user_id
    and status in ('pending', 'confirmed')
  )
  with check (
    status = 'cancelled'
  );
