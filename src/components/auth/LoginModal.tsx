'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../store/AuthContext';

type Mode = 'login' | 'register' | 'forgot';

interface Props {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function LoginModal({ forceOpen, onClose }: Props) {
  const { login, register, resetPassword, isLoggedIn } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('login');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const emailId = useId();
  const pwId = useId();
  const nameId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // External trigger (clicking Login in header)
  useEffect(() => {
    if (forceOpen) { setOpen(true); setMode('login'); }
  }, [forceOpen]);

  // Focus trap + Escape key + body scroll lock
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleClose() {
    setOpen(false);
    setError('');
    setSuccess('');
    onClose?.();
  }

  function resetFields() {
    setError(''); setSuccess(''); setName(''); setEmail(''); setPassword(''); setConfirmPassword(''); setPhone('');
  }

  function switchMode(m: Mode) { resetFields(); setMode(m); }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password) { setError('Please enter your password.'); return; }
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      handleClose();
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setSubmitting(true);
    try {
      const { needsConfirmation } = await register(name.trim(), email.trim(), password, phone.trim());
      if (needsConfirmation) {
        setSuccess('Account created! Please check your email to confirm your account, then sign in.');
      } else {
        handleClose();
        router.push('/account');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    setSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSuccess('If that address is registered, a reset link has been sent.');
    } catch {
      setSuccess('If that address is registered, a reset link has been sent.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open || isLoggedIn) return null;

  const EyeIcon = ({ open: o }: { open: boolean }) => o ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <div className="lm-backdrop" role="presentation" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <dialog ref={dialogRef} className="lm" open aria-modal="true" aria-labelledby="lm-title" tabIndex={-1}>

        {/* ── Close button ── */}
        <button type="button" className="lm__close" aria-label="Close" onClick={handleClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── Form body ── */}
        <div className="lm__body">
          {/* Tab switcher */}
          {mode !== 'forgot' && (
            <div className="lm__tabs" role="tablist">
              <button type="button" role="tab" aria-selected={mode === 'login'} className={`lm__tab${mode === 'login' ? ' lm__tab--active' : ''}`} onClick={() => switchMode('login')}>Sign in</button>
              <button type="button" role="tab" aria-selected={mode === 'register'} className={`lm__tab${mode === 'register' ? ' lm__tab--active' : ''}`} onClick={() => switchMode('register')}>Create account</button>
            </div>
          )}

          {mode === 'login' && (
            <>
              <h2 id="lm-title" className="lm__title">Welcome back</h2>
              <p className="lm__subtitle">Sign in to manage your enquiries and saved products.</p>
              {error && <p className="lm__error" role="alert">{error}</p>}
              <form className="lm__form" onSubmit={handleLogin} noValidate>
                <div className="lm__field">
                  <label htmlFor={emailId} className="lm__label">Email address</label>
                  <input id={emailId} type="email" className="lm__input" placeholder="you@example.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="lm__field">
                  <label htmlFor={pwId} className="lm__label">Password</label>
                  <div className="lm__input-wrap">
                    <input id={pwId} type={showPassword ? 'text' : 'password'} className="lm__input" placeholder="••••••••" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" className="lm__show-pw" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(v => !v)}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>
                <button type="button" className="lm__forgot-link" onClick={() => switchMode('forgot')}>Forgot password?</button>
                <button type="submit" className="btn btn--gold btn--block lm__submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
              </form>
            </>
          )}

          {mode === 'register' && (
            <>
              <h2 id="lm-title" className="lm__title">Create an account</h2>
              <p className="lm__subtitle">Save your wishlist, track enquiries, and manage your orders.</p>
              {error && <p className="lm__error" role="alert">{error}</p>}
              {success && <p className="lm__success" role="status">{success}</p>}
              {!success && <form className="lm__form" onSubmit={handleRegister} noValidate>
                <div className="lm__field">
                  <label htmlFor={nameId} className="lm__label">Full name</label>
                  <input id={nameId} type="text" className="lm__input" placeholder="Your name" value={name} autoComplete="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="lm__field">
                  <label htmlFor={emailId} className="lm__label">Email address</label>
                  <input id={emailId} type="email" className="lm__input" placeholder="you@example.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="lm__field">
                  <label htmlFor={pwId} className="lm__label">
                    Password <span className="lm__label-hint">min. 8 characters</span>
                  </label>
                  <div className="lm__input-wrap">
                    <input id={pwId} type={showPassword ? 'text' : 'password'} className="lm__input" placeholder="••••••••" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" className="lm__show-pw" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(v => !v)}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>
                <div className="lm__field">
                  <label className="lm__label">Confirm password</label>
                  <input type="password" className="lm__input" placeholder="••••••••" value={confirmPassword} autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="lm__field">
                  <label className="lm__label">
                    Phone <span className="lm__label-hint">(optional)</span>
                  </label>
                  <input type="tel" className="lm__input" placeholder="+91 00000 00000" value={phone} autoComplete="tel" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit" className="btn btn--gold btn--block lm__submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Create account'}</button>
              </form>}
            </>
          )}

          {mode === 'forgot' && (
            <>
              <h2 id="lm-title" className="lm__title">Reset password</h2>
              <p className="lm__subtitle">Enter your email and we'll send a reset link if the address is registered.</p>
              {error && <p className="lm__error" role="alert">{error}</p>}
              {success && <p className="lm__success" role="status">{success}</p>}
              {!success && (
                <form className="lm__form" onSubmit={handleForgot} noValidate>
                  <div className="lm__field">
                    <label htmlFor={emailId} className="lm__label">Email address</label>
                    <input id={emailId} type="email" className="lm__input" placeholder="you@example.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn--gold btn--block lm__submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send reset link'}</button>
                </form>
              )}
              <button type="button" className="lm__forgot-link" style={{ marginTop: '1.25rem', alignSelf: 'center' }} onClick={() => switchMode('login')}>← Back to sign in</button>
            </>
          )}

          <div className="lm__divider"><span>or</span></div>
          <button type="button" className="btn btn--outline btn--block lm__skip" onClick={handleClose}>Continue as guest</button>
        </div>
      </dialog>
    </div>
  );
}
