-- Migration 012: Sequential order numbers (ORD-YYYY-NNNNNN)
-- Creates a per-year sequence table and a function to generate collision-safe order numbers.
-- Existing orders keep their old ORD-XXXXX (5 random digits) format; new orders get ORD-YYYY-NNNNNN.

-- 1. Per-year sequence table
create table if not exists public.order_sequences (
  year smallint primary key,
  last_seq integer not null default 0
);

-- Only service role / security-definer functions should touch this table
revoke all on public.order_sequences from anon, authenticated;

-- 2. Generator function (security definer so it can update order_sequences from any role)
create or replace function public.generate_order_number()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year  smallint;
  v_seq   integer;
begin
  v_year := extract(year from now())::smallint;

  -- Atomic upsert: insert first row for this year (seq = 1) or bump existing row
  insert into public.order_sequences (year, last_seq)
  values (v_year, 1)
  on conflict (year)
  do update set last_seq = order_sequences.last_seq + 1
  returning last_seq into v_seq;

  return 'ORD-' || v_year::text || '-' || lpad(v_seq::text, 6, '0');
end;
$$;

-- Grant execute to authenticated users (they hit this via the orders insert default)
grant execute on function public.generate_order_number() to authenticated;

-- 3. Replace the bigint identity column with a text column using the new generator
--    Step A: drop the identity so we can alter the type
alter table public.orders
  alter column order_number drop identity if exists;

--    Step B: cast the existing bigint values to text (preserves any existing rows)
alter table public.orders
  alter column order_number type text using order_number::text;

--    Step C: set the new sequential text default
alter table public.orders
  alter column order_number set default public.generate_order_number();

-- 4. Seed the sequence counter so new orders start AFTER the highest existing order
--    (handles both old ORD-XXXXX and new ORD-YYYY-NNNNNN rows)
do $$
declare
  v_year  smallint;
  v_max   integer;
begin
  v_year := extract(year from now())::smallint;

  -- Find the highest sequential number already in this year (new-format rows only)
  select coalesce(max(
    case
      when order_number ~ ('^ORD-' || v_year::text || '-[0-9]{6}$')
      then (split_part(order_number, '-', 3))::integer
      else 0
    end
  ), 0)
  into v_max
  from public.orders;

  if v_max > 0 then
    insert into public.order_sequences (year, last_seq)
    values (v_year, v_max)
    on conflict (year)
    do update set last_seq = greatest(order_sequences.last_seq, v_max);
  end if;
end;
$$;
