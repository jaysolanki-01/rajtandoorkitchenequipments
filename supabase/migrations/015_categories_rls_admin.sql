-- Allow authenticated users (admin panel) to manage categories.
-- The admin panel signs in via Supabase Auth; authenticated role covers admin sessions.
CREATE POLICY "authenticated_insert_categories" ON public.categories
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated_update_categories" ON public.categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_delete_categories" ON public.categories
  FOR DELETE TO authenticated USING (true);
