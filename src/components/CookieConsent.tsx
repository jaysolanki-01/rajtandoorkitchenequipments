'use client';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'rt-cookie-consent';

type Prefs = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

function loadPrefs(): Prefs | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function savePrefs(prefs: Prefs) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs)); } catch { /* noop */ }
}

export function useCookieConsent() {
  const prefs = loadPrefs();
  return {
    functional: prefs?.functional ?? false,
    analytics: prefs?.analytics ?? false,
    marketing: prefs?.marketing ?? false,
    hasConsented: prefs !== null,
  };
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!loadPrefs()) setShow(true);
  }, []);

  function accept(prefs: Prefs) {
    savePrefs(prefs);
    setShow(false);
  }

  function acceptAll() {
    accept({ necessary: true, functional: true, analytics: true, marketing: true });
  }

  function declineAll() {
    accept({ necessary: true, functional: false, analytics: false, marketing: false });
    try {
      localStorage.removeItem('rt-cart');
      localStorage.removeItem('rt-wishlist');
    } catch { /* noop */ }
  }

  function saveCustom() {
    accept({ necessary: true, functional, analytics, marketing });
  }

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#0d1627', borderTop: '1px solid rgba(195,162,104,0.2)',
      boxShadow: '0 -4px 32px rgba(0,0,0,0.4)',
      padding: customize ? '1.5rem' : '1.25rem 1.5rem',
      display: 'flex', flexDirection: 'column', gap: '1rem',
      maxHeight: '90vh', overflowY: 'auto',
    }}>
      {!customize ? (
        /* ── Compact banner ── */
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ color: '#fff', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
              🍪 We use cookies to keep your cart, wishlist, and preferences saved between visits.
              {' '}<button onClick={() => setCustomize(true)} style={linkBtn}>Customise</button>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0, flexWrap: 'wrap' }}>
            <button onClick={declineAll} style={outlineBtn}>Decline</button>
            <button onClick={acceptAll} style={goldBtn}>Accept All</button>
          </div>
        </div>
      ) : (
        /* ── Customise panel ── */
        <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
          <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Cookie Preferences</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Choose which cookies you allow. Your choice is saved and you can change it at any time.
          </p>

          {[
            {
              label: 'Necessary', checked: true, locked: true,
              desc: 'Required for the site to work. Cannot be disabled.',
            },
            {
              label: 'Functional', checked: functional, locked: false,
              desc: 'Saves your cart and wishlist between visits.',
              onChange: setFunctional,
            },
            {
              label: 'Analytics', checked: analytics, locked: false,
              desc: 'Helps us understand how visitors use the site (no personal data).',
              onChange: setAnalytics,
            },
            {
              label: 'Marketing', checked: marketing, locked: false,
              desc: 'Used to show you relevant ads on other platforms.',
              onChange: setMarketing,
            },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'flex-start', gap: '1rem',
              padding: '0.875rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.2rem' }}>{item.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
              <Toggle
                checked={item.checked}
                disabled={item.locked}
                onChange={item.onChange ?? (() => {})}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={() => setCustomize(false)} style={outlineBtn}>Back</button>
            <button onClick={declineAll} style={outlineBtn}>Decline All</button>
            <button onClick={saveCustom} style={goldBtn}>Save Preferences</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={{
        flexShrink: 0, width: 44, height: 24, borderRadius: 12,
        background: checked ? 'var(--rt-gold, #c4882a)' : 'rgba(255,255,255,0.2)',
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative', transition: 'background 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: '#fff', transition: 'left 0.2s',
      }} />
    </button>
  );
}

const goldBtn: React.CSSProperties = {
  padding: '0.6rem 1.4rem', background: 'var(--rt-gold, #c4882a)', color: '#fff',
  border: 'none', borderRadius: 6, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const outlineBtn: React.CSSProperties = {
  padding: '0.6rem 1.2rem', background: 'transparent',
  color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: 6, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap',
};

const linkBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: 'var(--rt-gold, #c4882a)',
  fontSize: 'inherit', cursor: 'pointer', padding: 0, textDecoration: 'underline',
};
