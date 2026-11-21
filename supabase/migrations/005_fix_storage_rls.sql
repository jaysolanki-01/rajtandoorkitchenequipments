-- Fix storage RLS for product-images bucket
-- Run this in Supabase Dashboard → SQL Editor
-- It is safe to run multiple times (idempotent).

-- ── 1. Ensure the bucket exists ───────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760, -- 10 MB
  array['image/jpeg','image/png','image/webp','image/gif','image/avif']
)
on conflict (id) do update set
  public           = true,
  file_size_limit  = 10485760,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/avif'];

-- ── 2. Drop all old storage policies for this bucket ─────────────────────────
drop policy if exists "product_images_insert" on storage.objects;
drop policy if exists "product_images_update" on storage.objects;
drop policy if exists "product_images_delete" on storage.objects;
drop policy if exists "product_images_select" on storage.objects;

-- ── 3. Public SELECT (anyone can view product images) ────────────────────────
create policy "product_images_select" on storage.objects
  for select using (bucket_id = 'product-images');

-- ── 4. INSERT – admin/super_admin only ───────────────────────────────────────
-- Checks both user_metadata and app_metadata so the role works however it was set.
create policy "product_images_insert" on storage.objects
  for insert with check (
    bucket_id = 'product-images'
    and (
      (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
      or (auth.jwt() -> 'app_metadata'   ->> 'role') in ('admin', 'super_admin')
    )
  );

-- ── 5. UPDATE – needed because admin.ts uploads with upsert:true ─────────────
create policy "product_images_update" on storage.objects
  for update using (
    bucket_id = 'product-images'
    and (
      (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
      or (auth.jwt() -> 'app_metadata'   ->> 'role') in ('admin', 'super_admin')
    )
  );

-- ── 6. DELETE – admin/super_admin only ───────────────────────────────────────
create policy "product_images_delete" on storage.objects
  for delete using (
    bucket_id = 'product-images'
    and (
      (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin')
      or (auth.jwt() -> 'app_metadata'   ->> 'role') in ('admin', 'super_admin')
    )
  );
