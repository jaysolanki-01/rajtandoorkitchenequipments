-- Restore anon INSERT access on the quotes table for website visitors.
-- The policy was created in 001_initial.sql but may not be present in
-- the production database if migrations were run out of order.
-- Safe to re-run: drop + recreate is idempotent.

drop policy if exists "quotes_insert" on public.quotes;

create policy "quotes_insert" on public.quotes
  for insert
  with check (true);

-- Ensure the anon role has the SQL-level INSERT privilege as well.
-- RLS policies alone are not enough — the role also needs GRANT INSERT.
grant insert on public.quotes to anon;

-- Reload PostgREST schema cache so the change takes effect immediately.
notify pgrst, 'reload schema';
