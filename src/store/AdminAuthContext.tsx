'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createAdminClient } from '../lib/supabase/admin-client';
import type { User } from '@supabase/supabase-js';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthState {
  user: AdminUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

function toAdminUser(u: User): AdminUser {
  return {
    id: u.id,
    name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? u.email?.split('@')[0] ?? 'Admin',
    email: u.email ?? '',
    role: u.user_metadata?.role ?? 'user',
  };
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

// One singleton per browser — separate storage key means no conflict with user auth
const adminSupabase = createAdminClient();

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminSupabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ? toAdminUser(u) : null);
      setIsLoading(false);
    });

    const { data: { subscription } } = adminSupabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toAdminUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await adminSupabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }, []);

  const logout = useCallback(async () => {
    await adminSupabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
