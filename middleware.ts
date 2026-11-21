import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_STORAGE_KEY } from './src/lib/supabase/admin-client';

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { pathname } = request.nextUrl;

  // ── /admin/* — use the admin-specific Supabase client ───────────────────────
  if (pathname.startsWith('/admin')) {
    let adminResponse = NextResponse.next({ request });

    const adminClient = createServerClient(url, key, {
      auth: { storageKey: ADMIN_STORAGE_KEY },
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          adminResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            adminResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    const { data: { user: adminUser } } = await adminClient.auth.getUser();

    // Not logged in at all
    if (!adminUser && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
    if (!adminUser) {
      adminResponse.headers.set('x-pathname', pathname);
      return adminResponse;
    }

    const role = adminUser.user_metadata?.role;
    const isAdmin = role === 'admin' || role === 'super_admin';

    // Admin already logged in — skip the login page
    if (pathname === '/admin/login' && isAdmin) {
      const dashUrl = request.nextUrl.clone();
      dashUrl.pathname = '/admin';
      dashUrl.search = '';
      return NextResponse.redirect(dashUrl);
    }

    // Logged in but not admin — back to login
    if (!isAdmin && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }

    adminResponse.headers.set('x-pathname', pathname);
    return adminResponse;
  }

  // ── All other routes — use the regular user Supabase client ─────────────────
  let userResponse = NextResponse.next({ request });

  const userClient = createServerClient(url, key, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        userResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          userResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data: { user } } = await userClient.auth.getUser();

  if (pathname.startsWith('/account') && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  userResponse.headers.set('x-pathname', pathname);
  return userResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
