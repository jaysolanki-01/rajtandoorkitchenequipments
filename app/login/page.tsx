'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../src/store/AuthContext';
import { LoginModal } from '../../src/components/auth/LoginModal';

function LoginPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { isLoggedIn, isLoading } = useAuth();

  // Sanitise redirect — only allow relative paths, never external URLs
  const raw = params.get('redirect') ?? '';
  const redirectTo = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/account';

  // Already logged in — go straight to destination
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, isLoading, redirectTo, router]);

  function handleClose() {
    // Modal dismissed — if login succeeded the useEffect above handles redirect,
    // otherwise go home
    if (!isLoggedIn) router.replace('/');
  }

  if (isLoading) return null;
  if (isLoggedIn) return null;

  return (
    <>
      <title>Sign In | Raj Tandoor Kitchen Equipment</title>
      <meta name="robots" content="noindex" />
      <LoginModal forceOpen onClose={handleClose} />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}
