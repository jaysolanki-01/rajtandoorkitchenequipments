-- Fix products RLS policies to allow admin/super_admin users to write products
-- Run in Supabase Dashboard → SQL Editor

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
