import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Skip Supabase session refresh at build time when env vars are absent
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session so it doesn't expire
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /account/* — redirect unauthenticated visitors to /login
  if (pathname.startsWith('/account') && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect /admin/* — redirect unauthenticated to /admin/login
  if (pathname.startsWith('/admin')) {
    if (!user && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
    if (!user) {
      // Allow /admin/login for unauthenticated visitors
      return supabaseResponse;
    }
    const role = user.user_metadata?.role;
    const isAdmin = role === 'admin' || role === 'super_admin';

    // Admin already logged in — skip the login page
    if (pathname === '/admin/login' && isAdmin) {
      const dashUrl = request.nextUrl.clone();
      dashUrl.pathname = '/admin';
      dashUrl.search = '';
      return NextResponse.redirect(dashUrl);
    }

    // Non-admin trying to access any admin page (except login) → send to login
    if (!isAdmin && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
  }

  // Pass pathname to root layout so it can suppress site chrome on /admin pages
  supabaseResponse.headers.set('x-pathname', pathname);
  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
