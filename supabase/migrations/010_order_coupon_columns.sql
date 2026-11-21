-- ── 010: Add coupon tracking columns to orders ───────────────────────────────
alter table public.orders
  add column if not exists coupon_code     text,
  add column if not exists coupon_discount integer not null default 0;
