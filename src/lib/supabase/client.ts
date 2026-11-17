import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Fall back to placeholder values at build time so module-level calls don't throw.
  // Real credentials must be set as env vars for auth/db to work at runtime.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
  return createBrowserClient(url, key);
}
