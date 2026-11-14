import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// ── Page-specific guidance tips ────────────────────────────────────────────────
const TIPS: Record<string, string[]> = {
  '/': [
    "🙏 Namaste! I'm Raj — your personal tandoor guide!",
    "🔥 Scroll down to explore our incredible product range!",
    "⭐ Trusted by 500+ restaurants nationwide since 2000!",
    "💡 Tap 'Products' to browse all categories!",
    "📞 Need help? Contact us — we reply within 24 hours!",
  ],
  '/shop': [
    "🛒 You're browsing 50+ premium products!",
    "🔍 Filter by category to find your perfect match!",
    "💰 Want bulk pricing? Request a Quote!",
    "🚚 Free delivery on orders above ₹5,000!",
  ],
  '/tandoors': [
    "🔥 These are our signature tandoor ovens!",
    "🏆 Hand-crafted for perfect heat distribution!",
    "📏 Available in clay, steel & electric variants!",
    "🍞 Perfect for naan, kebabs & more!",
  ],
  '/kitchen-equipment': [
    "🍳 Complete your commercial kitchen here!",
    "✅ All products are commercial-grade quality!",
    "🔧 Installation guidance available on request!",
    "🏭 ISO certified & industry approved!",
  ],
  '/about': [
    "📖 We've been crafting tandoors since 2000!",
    "🏭 Traditional craftsmanship meets modern precision!",
    "🌟 500+ restaurants choose Raj Tandoor!",
    "🤝 Family-owned, passion-driven business!",
  ],
  '/contact': [
    "📞 Our experts are ready to help you!",
    "⏰ We reply to all queries within 24 hours!",
    "🗺️ Find us on the map below!",
    "💬 WhatsApp us for the fastest response!",
  ],
  '/request-quote': [
    "📋 Get a custom quote in just 2 hours!",
    "🤝 Special rates for restaurants & bulk orders!",
    "✉️ We'll send your quote directly by email!",
  ],
  '/cart': [
    "🛍️ Review your items before checkout!",
    "💳 Multiple payment options available!",
    "🎁 Check if any coupons apply to your order!",
  ],
  '/wishlist': [
    "💖 Your saved favourites are here!",
    "🛒 Ready to add them to cart? Let's go!",
  ],
  '/faq': [
    "❓ Can't find your answer? Contact us!",
    "📋 We've answered the most common questions here!",
  ],
  '/checkout': [
    "🎉 Almost done — you're on the last step!",
    "🔒 Your payment is 100% secure!",
  ],
};

function getTips(pathname: string): string[] {
  if (pathname.startsWith('/products/')) {
    return [
      "🏷️ Check the full specifications below!",
      "🌟 Read customer reviews before deciding!",
      "📦 Add to cart or request a custom quote!",
    ];
  }
  if (pathname.startsWith('/account')) {
    return [
      "👤 Manage your orders and addresses here!",
      "📦 Track your deliveries in real-time!",
    ];
  }
  return TIPS[pathname] ?? TIPS['/'];
}

export function RajMascot() {
  const { pathname } = useLocation();
  const wrapRef    = useRef<HTMLDivElement>(null);
  const charRef    = useRef<HTMLDivElement>(null);
  const armRef     = useRef<SVGGElement>(null);
  const eyeLRef    = useRef<SVGGElement>(null);
  const eyeRRef    = useRef<SVGGElement>(null);
  const shadowRef  = useRef<SVGEllipseElement>(null);
  const floatTlRef = useRef<gsap.core.Timeline | null>(null);

  const [tipIdx, setTipIdx]   = useState(0);
  const [mini,   setMini]     = useState(false);
  const [hidden, setHidden]   = useState(false);

  const tips = getTips(pathname);
  const tip  = tips[tipIdx % tips.length];

  // ── Float ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = charRef.current;
    const sh = shadowRef.current;
    if (!el) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { y: -10, duration: 1.8, ease: 'sine.inOut' });
    if (sh) {
      gsap.to(sh, { attr: { rx: 36, ry: 5 }, opacity: 0.08, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }
    floatTlRef.current = tl;
    return () => { tl.kill(); };
  }, []);

  // ── Blink ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const blink = () => {
      const els = [eyeLRef.current, eyeRRef.current].filter(Boolean) as SVGGElement[];
      gsap.timeline()
        .to(els, { scaleY: 0.08, duration: 0.07, ease: 'power1.in',  transformOrigin: '50% 50%' })
        .to(els, { scaleY: 1,    duration: 0.1,  ease: 'power1.out', transformOrigin: '50% 50%' });
    };
    const id = setInterval(blink, 3200 + Math.random() * 1800);
    return () => clearInterval(id);
  }, []);

  // ── Wave ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const arm = armRef.current;
    if (!arm) return;
    const wave = () => {
      gsap.timeline()
        .to(arm, { rotation: -38, svgOrigin: '76 90', duration: 0.2, ease: 'power1.out'  })
        .to(arm, { rotation:  18, svgOrigin: '76 90', duration: 0.2, ease: 'power1.inOut' })
        .to(arm, { rotation: -38, svgOrigin: '76 90', duration: 0.2, ease: 'power1.inOut' })
        .to(arm, { rotation:   0, svgOrigin: '76 90', duration: 0.2, ease: 'power1.in'   });
    };
    wave();
    const id = setInterval(wave, 5000);
    return () => clearInterval(id);
  }, []);

  // ── Page change — reset tip + entry slide ─────────────────────────────────
  useEffect(() => {
    setTipIdx(0);
    setMini(false);
    const wrap = wrapRef.current;
    if (wrap) {
      gsap.fromTo(wrap, { x: 110, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.4)' });
    }
  }, [pathname]);

  // ── Next-tip bounce ────────────────────────────────────────────────────────
  const nextTip = () => {
    const el = charRef.current;
    if (el) {
      gsap.timeline()
        .to(el, { scale: 1.14, duration: 0.1,  ease: 'power2.out' })
        .to(el, { scale: 1,    duration: 0.45, ease: 'elastic.out(1.2, 0.5)' });
    }
    setTipIdx(i => i + 1);
  };

  // ── Hidden state: small revive button ─────────────────────────────────────
  if (hidden) {
    return (
      <button className="raj-revive" onClick={() => setHidden(false)} aria-label="Open Raj guide">
        <svg viewBox="0 0 36 36" width="28" height="28" aria-hidden="true">
          <circle cx="18" cy="18" r="17" fill="#c3621a" />
          <text x="18" y="23" textAnchor="middle" fontFamily="Georgia,serif" fontSize="14" fontWeight="bold" fill="#fff">R</text>
        </svg>
      </button>
    );
  }

  return (
    <div ref={wrapRef} className="raj-wrap" role="complementary" aria-label="Raj guide">

      {/* ── Speech bubble ── */}
      {!mini && (
        <div className="raj-bubble" aria-live="polite">
          <div className="raj-bubble__inner">
            <p className="raj-bubble__text">{tip}</p>
            <div className="raj-bubble__footer">
              <span className="raj-bubble__count">{(tipIdx % tips.length) + 1} / {tips.length}</span>
              <button className="raj-bubble__next" onClick={nextTip} aria-label="Next tip">Next →</button>
              <button className="raj-bubble__close" onClick={() => setMini(true)} aria-label="Minimise">✕</button>
            </div>
          </div>
          <div className="raj-bubble__tail" aria-hidden="true" />
        </div>
      )}

      {/* ── Character ── */}
      <div
        ref={charRef}
        className={`raj-char${mini ? ' raj-char--mini' : ''}`}
        onClick={() => { if (mini) setMini(false); }}
        role={mini ? 'button' : undefined}
        aria-label={mini ? 'Open Raj guide' : undefined}
        tabIndex={mini ? 0 : -1}
        onKeyDown={mini ? (e) => { if (e.key === 'Enter' || e.key === ' ') setMini(false); } : undefined}
      >
        <svg viewBox="0 0 100 162" width={mini ? 62 : 94} height={mini ? 95 : 148} overflow="visible" aria-hidden="true">
          <defs>
            {/* Skin — warm Indian terracotta */}
            <radialGradient id="raj-skin" cx="38%" cy="30%" r="66%">
              <stop offset="0%"   stopColor="#FECDA6" />
              <stop offset="48%" stopColor="#E8933E" />
              <stop offset="100%" stopColor="#9B521A" />
            </radialGradient>
            {/* Body (clay/tandoor) */}
            <radialGradient id="raj-clay" cx="35%" cy="28%" r="68%">
              <stop offset="0%"   stopColor="#F0A050" />
              <stop offset="45%" stopColor="#C4621A" />
              <stop offset="100%" stopColor="#7A2E0A" />
            </radialGradient>
            {/* Hat */}
            <linearGradient id="raj-hat" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D0D0D0" />
            </linearGradient>
            {/* Gold */}
            <linearGradient id="raj-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#FFD966" />
              <stop offset="100%" stopColor="#B5860D" />
            </linearGradient>
            {/* Iris */}
            <radialGradient id="raj-iris" cx="40%" cy="35%" r="62%">
              <stop offset="0%"   stopColor="#8B5E3C" />
              <stop offset="70%"  stopColor="#5B3010" />
              <stop offset="100%" stopColor="#2d1808" />
            </radialGradient>
            {/* Drop shadow */}
            <filter id="raj-drop" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse ref={shadowRef} cx="50" cy="160" rx="40" ry="7" fill="#000" opacity="0.12" />

          {/* == BODY (tandoor pot shape) == */}
          <ellipse cx="50" cy="122" rx="38" ry="40" fill="url(#raj-clay)" filter="url(#raj-drop)" />
          <ellipse cx="38" cy="105" rx="10" ry="14" fill="rgba(255,255,255,0.13)" />

          {/* == BADGE == */}
          <ellipse cx="50" cy="124" rx="20" ry="13" fill="url(#raj-gold)" opacity="0.93" />
          <text x="50" y="128" textAnchor="middle" fontFamily="'Mont','Georgia',serif" fontSize="10" fontWeight="700" fill="#4A2200" letterSpacing="1">RAJ</text>

          {/* == LEFT ARM (static) == */}
          <g transform="rotate(-20 24 90)">
            <ellipse cx="24" cy="107" rx="10" ry="20" fill="url(#raj-clay)" />
          </g>
          <circle cx="15" cy="123" r="9" fill="url(#raj-skin)" />

          {/* == NECK == */}
          <ellipse cx="50" cy="84" rx="20" ry="8" fill="#C4621A" />

          {/* == FLAMES (tandoor fire at top of body) == */}
          <g className="raj-flames">
            <path d="M43 86 Q41 76 46 68 Q48 78 51 74 Q51 83 46 88 Z" fill="#FF6B1A" />
            <path d="M50 86 Q48 74 52 67 Q54 76 56 73 Q56 83 52 88 Z" fill="#FFB347" />
            <path d="M57 86 Q55 76 59 68 Q61 78 63 75 Q62 84 58 88 Z" fill="#FF6B1A" />
            <path d="M47 87 Q46 79 50 73 Q51 80 53 77 Q53 85 49 89 Z" fill="#FFE135" />
          </g>

          {/* == HEAD == */}
          <ellipse cx="50" cy="58" rx="32" ry="34" fill="url(#raj-skin)" filter="url(#raj-drop)" />
          <ellipse cx="38" cy="45" rx="9" ry="12" fill="rgba(255,255,255,0.18)" />

          {/* == CHEEKS == */}
          <circle cx="29" cy="66" r="7"  fill="#FF9B72" opacity="0.32" />
          <circle cx="71" cy="66" r="7"  fill="#FF9B72" opacity="0.32" />

          {/* == EYEBROWS == */}
          <path d="M27 44 Q37 39 47 44" stroke="#5B2800" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <path d="M53 44 Q63 39 73 44" stroke="#5B2800" strokeWidth="2.8" fill="none" strokeLinecap="round" />

          {/* == LEFT EYE == */}
          <g ref={eyeLRef} style={{ transformOrigin: '37px 56px' }}>
            <ellipse cx="37" cy="56" rx="9.5" ry="10.5" fill="white" stroke="#E0C090" strokeWidth="0.5" />
            <circle  cx="37" cy="56" r="7.5"  fill="url(#raj-iris)" />
            <circle  cx="37" cy="56" r="4.5"  fill="#180C04" />
            <circle  cx="40" cy="52" r="2.8"  fill="white" />
            <circle  cx="34.5" cy="60" r="1.2" fill="rgba(255,255,255,0.55)" />
          </g>

          {/* == RIGHT EYE == */}
          <g ref={eyeRRef} style={{ transformOrigin: '63px 56px' }}>
            <ellipse cx="63" cy="56" rx="9.5" ry="10.5" fill="white" stroke="#E0C090" strokeWidth="0.5" />
            <circle  cx="63" cy="56" r="7.5"  fill="url(#raj-iris)" />
            <circle  cx="63" cy="56" r="4.5"  fill="#180C04" />
            <circle  cx="66" cy="52" r="2.8"  fill="white" />
            <circle  cx="60.5" cy="60" r="1.2" fill="rgba(255,255,255,0.55)" />
          </g>

          {/* == NOSE == */}
          <ellipse cx="50" cy="66" rx="4" ry="2.5" fill="rgba(155,82,26,0.6)" />

          {/* == MUSTACHE == */}
          <path d="M38 72 Q44 69 50 72 Q46 76 38 72" fill="#3D1A0A" />
          <path d="M50 72 Q56 69 62 72 Q56 76 50 72" fill="#3D1A0A" />

          {/* == SMILE == */}
          <path d="M38 79 Q50 90 62 79" stroke="#8B2500" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M42 79 Q50 87 58 79 Q50 84 42 79" fill="rgba(255,255,255,0.72)" />

          {/* == WAVING ARM (right, animated) == */}
          <g ref={armRef}>
            <g transform="rotate(20 76 90)">
              <ellipse cx="76" cy="107" rx="10" ry="20" fill="url(#raj-clay)" />
            </g>
            <circle cx="85" cy="122" r="9" fill="url(#raj-skin)" />
          </g>

          {/* == CHEF HAT (drawn last → on top of head) == */}
          <ellipse cx="50" cy="27" rx="36" ry="7.5" fill="url(#raj-hat)" />
          <rect x="22" y="2" width="56" height="27" rx="6" fill="url(#raj-hat)" />
          <ellipse cx="50" cy="3.5" rx="28" ry="5" fill="#FAFAFA" />
          <rect x="22" y="23" width="56" height="8" rx="2" fill="url(#raj-gold)" />
          {/* Hat emblem */}
          <circle cx="50" cy="13" r="9" fill="url(#raj-gold)" opacity="0.9" />
          <text x="50" y="17.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="bold" fill="#4A2200">R</text>
        </svg>
      </div>

      {/* ── Hide button (hover-visible) ── */}
      {!mini && (
        <button className="raj-hide-btn" onClick={() => setHidden(true)} aria-label="Hide Raj guide" title="Hide guide">
          ×
        </button>
      )}
    </div>
  );
}
