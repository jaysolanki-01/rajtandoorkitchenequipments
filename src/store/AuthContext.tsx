import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  /** @deprecated use user.email */
  email: string | null;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get<AuthUser>('/auth/me')
      .then(setUser)
      .catch(() => { /* no session */ })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const u = await api.post<AuthUser>('/auth/login', { email, password });
    setUser(u);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    const u = await api.post<AuthUser>('/auth/register', { name, email, password, phone });
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    try { await api.post('/auth/logout'); } catch { /* ignore */ }
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isAdmin, isLoading, login, register, logout, email: user?.email ?? null }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
