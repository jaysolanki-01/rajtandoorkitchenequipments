-- Admin panel: allow admin/super_admin role to manage products and storage
-- Run this in the Supabase SQL editor after 003_security_hardening.sql.

-- ── 1. Products write access for admin users ──────────────────────────────────
-- Previously products could only be written by service_role (no browser client).
-- Now admin and super_admin users (identified by JWT user_metadata.role) can
-- insert, update and delete products from the browser-based admin panel.

drop policy if exists "products_insert" on public.products;
drop policy if exists "products_update" on public.products;
drop policy if exists "products_delete" on public.products;

create policy "products_insert" on public.products
  for insert with check (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

create policy "products_update" on public.products
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

create policy "products_delete" on public.products
  for delete using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

-- ── 2. Extend quote + order policies for super_admin ─────────────────────────

drop policy if exists "quotes_select_admin"  on public.quotes;
drop policy if exists "quotes_update_admin"  on public.quotes;
drop policy if exists "orders_select_admin"  on public.orders;
drop policy if exists "orders_update_admin"  on public.orders;

create policy "quotes_select_admin" on public.quotes
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

create policy "quotes_update_admin" on public.quotes
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

create policy "orders_select_admin" on public.orders
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

create policy "orders_update_admin" on public.orders
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

-- ── 3. Product images storage bucket ─────────────────────────────────────────
-- Create a public bucket for product images.
-- If the bucket already exists this is a no-op.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,  -- 5 MB per file
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do nothing;

-- Allow admin/super_admin to upload product images
drop policy if exists "product_images_insert" on storage.objects;
create policy "product_images_insert" on storage.objects
  for insert with check (
    bucket_id = 'product-images'
    and (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

-- Allow admin/super_admin to delete product images
drop policy if exists "product_images_delete" on storage.objects;
create policy "product_images_delete" on storage.objects
  for delete using (
    bucket_id = 'product-images'
    and (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
  );

-- Public read of product images
drop policy if exists "product_images_select" on storage.objects;
create policy "product_images_select" on storage.objects
  for select using (bucket_id = 'product-images');
