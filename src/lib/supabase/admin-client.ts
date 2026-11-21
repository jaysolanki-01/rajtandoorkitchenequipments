import { createBrowserClient } from '@supabase/ssr';

// Admin auth is stored in a separate cookie key so it never conflicts
// with the regular user session in the same browser.
export const ADMIN_STORAGE_KEY = 'rt-admin-session';

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
  return createBrowserClient(url, key, {
    auth: { storageKey: ADMIN_STORAGE_KEY },
  });
}
