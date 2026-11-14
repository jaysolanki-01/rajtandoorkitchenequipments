import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// ── Section-aware tips (index matches scroll order) ────────────────────────────
const PAGE_TIPS: Record<string, string[]> = {
  '/': [
    "🙏 Namaste! Welcome to India's #1 tandoor store!",
    "⭐ Trusted by 500+ restaurants nationwide!",
    "🍽️ Browse our product categories below!",
    "🔥 Shop our premium featured products!",
    "🏆 Discover our best-selling tandoors!",
    "🏭 Built for commercial kitchens!",
    "💡 Find the right tandoor for your business!",
    "📋 Use our guide to choose the perfect tandoor!",
    "❓ Have a question? Check our FAQ!",
    "📞 Ready to order? Let's connect!",
  ],
  '/shop': [
    "🛒 Browsing 50+ premium products!",
    "🔍 Filter by category to find your match!",
    "💰 Want bulk pricing? Request a Quote!",
    "🚚 Free delivery on orders above ₹5,000!",
  ],
  '/tandoors': [
    "🔥 Our signature hand-crafted tandoor ovens!",
    "🏆 Perfect heat distribution — every time!",
    "📏 Clay, steel & electric variants available!",
    "🍞 Perfect for naan, kebabs, tikka & more!",
  ],
  '/kitchen-equipment': [
    "🍳 Complete your commercial kitchen here!",
    "✅ All products are commercial-grade quality!",
    "🔧 Installation guidance available on request!",
  ],
  '/about': [
    "📖 Crafting tandoors since the year 2000!",
    "🏭 Traditional craftsmanship, modern precision!",
    "🌟 500+ restaurants choose Raj Tandoor!",
  ],
  '/contact': [
    "📞 Our experts are ready to help you!",
    "⏰ We reply to all queries within 24 hours!",
    "💬 WhatsApp us for the fastest response!",
  ],
  '/request-quote': [
    "📋 Get a custom quote in just 2 hours!",
    "🤝 Special rates for restaurants & bulk orders!",
  ],
  '/cart': [
    "🛍️ Review your items before checkout!",
    "💳 Multiple payment options available!",
  ],
  '/faq': [
    "❓ Can't find your answer? Just contact us!",
    "📋 Most common questions answered here!",
  ],
};

function getTips(pathname: string): string[] {
  if (pathname.startsWith('/products/')) {
    return ["🏷️ Check the full product specs below!", "🌟 Read customer reviews!", "📦 Add to cart or request a quote!"];
  }
  if (pathname.startsWith('/account')) return ["👤 Manage your orders & addresses here!", "📦 Track your deliveries in real-time!"];
  return PAGE_TIPS[pathname] ?? PAGE_TIPS['/'];
}

// Clamp helper
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function RajMascot() {
  const { pathname } = useLocation();

  // DOM refs
  const wrapRef    = useRef<HTMLDivElement>(null);
  const charRef    = useRef<HTMLDivElement>(null);
  const armLRef    = useRef<SVGGElement>(null);   // pointing arm (left)
  const armRRef    = useRef<SVGGElement>(null);   // waving arm (right)
  const legLRef    = useRef<SVGGElement>(null);
  const legRRef    = useRef<SVGGElement>(null);
  const eyeLRef    = useRef<SVGGElement>(null);
  const eyeRRef    = useRef<SVGGElement>(null);
  const browLRef   = useRef<SVGPathElement>(null);
  const browRRef   = useRef<SVGPathElement>(null);
  const shadowRef  = useRef<SVGEllipseElement>(null);

  // Animation refs
  const floatTlRef   = useRef<gsap.core.Timeline | null>(null);
  const walkTlRef    = useRef<gsap.core.Timeline | null>(null);
  const waveTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const walkTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const posAnimRef   = useRef<gsap.core.Tween | null>(null);
  const isWalkingRef = useRef(false);
  const prevTopRef   = useRef<number | null>(null);

  // State
  const [tipIdx,     setTipIdx]      = useState(0);
  const [mini,       setMini]        = useState(false);
  const [hidden,     setHidden]      = useState(false);
  const [bubbleBelow, setBubbleBelow] = useState(false);

  const tips = getTips(pathname);
  const tip  = tips[tipIdx % tips.length];

  // ── Float ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = charRef.current;
    if (!el) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { y: -9, duration: 1.7, ease: 'sine.inOut' });
    floatTlRef.current = tl;
    return () => { tl.kill(); };
  }, []);

  // ── Blink ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const blink = () => {
      const els = [eyeLRef.current, eyeRRef.current].filter(Boolean) as Element[];
      gsap.timeline()
        .to(els, { scaleY: 0.08, duration: 0.07, transformOrigin: '50% 50%' })
        .to(els, { scaleY: 1,    duration: 0.1,  transformOrigin: '50% 50%' });
    };
    const id = setInterval(blink, 3000 + Math.random() * 1800);
    return () => clearInterval(id);
  }, []);

  // ── Idle wave (right arm, periodic) ──────────────────────────────────────
  const doWave = useCallback(() => {
    if (isWalkingRef.current) return;
    const arm = armRRef.current;
    if (!arm) return;
    gsap.timeline()
      .to(arm, { rotation: -38, svgOrigin: '84 93', duration: 0.2, ease: 'power1.out' })
      .to(arm, { rotation:  18, svgOrigin: '84 93', duration: 0.2, ease: 'power1.inOut' })
      .to(arm, { rotation: -38, svgOrigin: '84 93', duration: 0.2, ease: 'power1.inOut' })
      .to(arm, { rotation:   0, svgOrigin: '84 93', duration: 0.2, ease: 'power1.in'   });
  }, []);

  useEffect(() => {
    doWave();
    waveTimerRef.current = setInterval(doWave, 5500);
    return () => clearInterval(waveTimerRef.current);
  }, [doWave]);

  // ── Walk helpers ──────────────────────────────────────────────────────────
  const startWalking = useCallback(() => {
    if (isWalkingRef.current) return;
    isWalkingRef.current = true;

    floatTlRef.current?.pause();
    gsap.set(charRef.current!, { y: 0 });

    // Reset arms to neutral swing
    gsap.to(armLRef.current!, { rotation: 0, svgOrigin: '16 93', duration: 0.15 });
    gsap.to(armRRef.current!, { rotation: 0, svgOrigin: '84 93', duration: 0.15 });

    walkTlRef.current = gsap.timeline({ repeat: -1 })
      // Step A — left leg forward
      .to(legLRef.current!, { rotation: -24, svgOrigin: '40 142', duration: 0.2, ease: 'sine.inOut' })
      .to(legRRef.current!, { rotation:  24, svgOrigin: '60 142', duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armLRef.current!, { rotation:  20, svgOrigin: '16 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armRRef.current!, { rotation: -20, svgOrigin: '84 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(charRef.current!, { y: -5, duration: 0.1, ease: 'sine.out' }, '<')
      .to(charRef.current!, { y: 0,  duration: 0.1, ease: 'sine.in'  })
      // Step B — right leg forward
      .to(legLRef.current!, { rotation:  24, svgOrigin: '40 142', duration: 0.2, ease: 'sine.inOut' })
      .to(legRRef.current!, { rotation: -24, svgOrigin: '60 142', duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armLRef.current!, { rotation: -20, svgOrigin: '16 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armRRef.current!, { rotation:  20, svgOrigin: '84 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(charRef.current!, { y: -5, duration: 0.1, ease: 'sine.out' }, '<')
      .to(charRef.current!, { y: 0,  duration: 0.1, ease: 'sine.in'  });
  }, []);

  const stopWalking = useCallback(() => {
    if (!isWalkingRef.current) return;
    isWalkingRef.current = false;
    walkTlRef.current?.kill();

    // Land pose
    gsap.to([legLRef.current!, legRRef.current!], { rotation: 0, svgOrigin: '50 142', duration: 0.3, ease: 'power2.out' });
    gsap.to(charRef.current!, { y: 0, duration: 0.2 });
    gsap.to([armLRef.current!, armRRef.current!], { rotation: 0, duration: 0.2 });

    // Resume float
    setTimeout(() => { if (!isWalkingRef.current) floatTlRef.current?.play(); }, 500);

    // Arrive: excited jump + point
    setTimeout(() => {
      if (isWalkingRef.current) return;
      // Jump
      gsap.timeline()
        .to(charRef.current!, { y: -16, scale: 1.07, duration: 0.18, ease: 'power2.out' })
        .to(charRef.current!, { y: 0,  scale: 1,    duration: 0.35, ease: 'bounce.out'   });
      // Raise eyebrows
      gsap.to([browLRef.current!, browRRef.current!], { y: -3.5, duration: 0.18 });
      gsap.to([browLRef.current!, browRRef.current!], { y: 0, duration: 0.4, delay: 0.6 });
      // Point left arm at content
      gsap.to(armLRef.current!, { rotation: -78, svgOrigin: '16 93', duration: 0.45, ease: 'back.out(1.5)' });
      gsap.to(armRRef.current!, { rotation:  12, svgOrigin: '84 93', duration: 0.3,  ease: 'power2.out'   });
    }, 320);
  }, []);

  // ── Scroll → position + walk ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const scrollY  = window.scrollY;
      const scrollH  = document.documentElement.scrollHeight;
      const vh       = window.innerHeight;
      const pct      = clamp(scrollY / Math.max(1, scrollH - vh), 0, 1);

      const minTop = 70;
      const maxTop = vh - 215;
      const targetTop = Math.round(minTop + pct * (maxTop - minTop));

      setBubbleBelow(targetTop < vh * 0.38);

      // Only walk if the position changed meaningfully
      if (prevTopRef.current === null || Math.abs(targetTop - prevTopRef.current) > 6) {
        prevTopRef.current = targetTop;
        startWalking();
        posAnimRef.current?.kill();
        posAnimRef.current = gsap.to(wrap, { top: targetTop, duration: 0.38, ease: 'power2.out' });
      }

      clearTimeout(walkTimerRef.current);
      walkTimerRef.current = setTimeout(stopWalking, 650);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(walkTimerRef.current);
    };
  }, [pathname, startWalking, stopWalking]);

  // ── IntersectionObserver: section-aware tips ──────────────────────────────
  useEffect(() => {
    const selectors = [
      '#raj-s0', '#raj-s1', '#raj-s2', '#raj-s3', '#raj-s4',
      '#raj-s5', '#raj-s6', '#raj-s7', '#raj-s8', '#raj-s9',
    ];
    const els = selectors.map(s => document.querySelector(s)).filter(Boolean) as Element[];
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = selectors.findIndex(s => document.querySelector(s) === entry.target);
          if (idx >= 0 && idx < tips.length) setTipIdx(idx);
          break;
        }
      }
    }, { threshold: 0.4, rootMargin: '-10% 0px -50% 0px' });

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [pathname, tips.length]);

  // ── Page change ───────────────────────────────────────────────────────────
  useEffect(() => {
    setTipIdx(0);
    setMini(false);
    isWalkingRef.current = false;
    walkTlRef.current?.kill();
    prevTopRef.current = null;

    const wrap = wrapRef.current;
    const vh = window.innerHeight;
    if (wrap) {
      gsap.set(wrap, { top: vh - 215 });
      gsap.fromTo(wrap,
        { x: 115, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.4)' }
      );
    }
    // Initial point
    gsap.set(armLRef.current!, { rotation: 0 });
    setTimeout(() => {
      if (!isWalkingRef.current) {
        gsap.to(armLRef.current!, { rotation: -78, svgOrigin: '16 93', duration: 0.5, ease: 'back.out(1.4)' });
      }
    }, 700);
  }, [pathname]);

  // ── Next-tip bounce ───────────────────────────────────────────────────────
  const nextTip = () => {
    gsap.timeline()
      .to(charRef.current!, { scale: 1.13, duration: 0.1, ease: 'power2.out' })
      .to(charRef.current!, { scale: 1,    duration: 0.4, ease: 'elastic.out(1.2, 0.5)' });
    setTipIdx(i => (i + 1) % tips.length);
  };

  // ── Hidden state ──────────────────────────────────────────────────────────
  if (hidden) {
    return (
      <button className="raj-revive" onClick={() => setHidden(false)} aria-label="Open Raj guide">
        <svg viewBox="0 0 36 36" width="26" height="26" aria-hidden="true">
          <circle cx="18" cy="18" r="17" fill="#c3621a" />
          <text x="18" y="23" textAnchor="middle" fontFamily="Georgia,serif" fontSize="14" fontWeight="bold" fill="#fff">R</text>
        </svg>
      </button>
    );
  }

  return (
    <div ref={wrapRef} className={`raj-wrap${bubbleBelow ? ' raj-bubble-below' : ''}`} role="complementary" aria-label="Raj guide"
      style={{ top: 'calc(100vh - 215px)', right: 20, bottom: 'auto' }}>

      {/* ── Speech bubble ── */}
      {!mini && (
        <div className={`raj-bubble${bubbleBelow ? ' raj-bubble--below' : ''}`} aria-live="polite">
          <div className="raj-bubble__inner">
            <p className="raj-bubble__text">{tip}</p>
            <div className="raj-bubble__footer">
              <span className="raj-bubble__count">{(tipIdx % tips.length) + 1} / {tips.length}</span>
              <button className="raj-bubble__next" onClick={nextTip}>Next →</button>
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
        <svg
          viewBox="0 0 100 192"
          width={mini ? 60 : 92}
          height={mini ? 92 : 182}
          overflow="visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="raj-skin" cx="38%" cy="30%" r="66%">
              <stop offset="0%"   stopColor="#FECDA6" />
              <stop offset="48%" stopColor="#E8933E" />
              <stop offset="100%" stopColor="#9B521A" />
            </radialGradient>
            <radialGradient id="raj-clay" cx="35%" cy="28%" r="68%">
              <stop offset="0%"   stopColor="#F0A050" />
              <stop offset="45%" stopColor="#C4621A" />
              <stop offset="100%" stopColor="#7A2E0A" />
            </radialGradient>
            <linearGradient id="raj-hat" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D0D0D0" />
            </linearGradient>
            <linearGradient id="raj-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#FFD966" />
              <stop offset="100%" stopColor="#B5860D" />
            </linearGradient>
            <radialGradient id="raj-iris" cx="40%" cy="35%" r="62%">
              <stop offset="0%"   stopColor="#8B5E3C" />
              <stop offset="70%"  stopColor="#5B3010" />
              <stop offset="100%" stopColor="#2d1808" />
            </radialGradient>
            <filter id="raj-drop" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse ref={shadowRef} cx="50" cy="190" rx="40" ry="7" fill="#000" opacity="0.12" />

          {/* == LEGS (drawn first = behind body) == */}
          {/* Left leg — hip pivot at (40, 142) */}
          <g ref={legLRef}>
            <ellipse cx="40" cy="158" rx="10" ry="20" fill="url(#raj-clay)" />
            {/* Foot */}
            <ellipse cx="36" cy="177" rx="13" ry="6" fill="url(#raj-clay)" />
          </g>
          {/* Right leg — hip pivot at (60, 142) */}
          <g ref={legRRef}>
            <ellipse cx="60" cy="158" rx="10" ry="20" fill="url(#raj-clay)" />
            <ellipse cx="64" cy="177" rx="13" ry="6" fill="url(#raj-clay)" />
          </g>

          {/* == LEFT ARM (pointing, shoulder at ~16,93) == */}
          <g ref={armLRef}>
            <ellipse cx="16" cy="108" rx="10" ry="20" fill="url(#raj-clay)" />
            {/* Hand */}
            <circle cx="11" cy="126" r="8.5" fill="url(#raj-skin)" />
            {/* Index finger (pointing) */}
            <ellipse cx="2" cy="121" rx="4" ry="7.5" fill="url(#raj-skin)" transform="rotate(-20 11 126)" />
          </g>

          {/* == BODY (tandoor pot) == */}
          <ellipse cx="50" cy="112" rx="37" ry="34" fill="url(#raj-clay)" filter="url(#raj-drop)" />
          <ellipse cx="38" cy="96"  rx="9"  ry="13" fill="rgba(255,255,255,0.13)" />

          {/* Badge */}
          <ellipse cx="50" cy="114" rx="20" ry="13" fill="url(#raj-gold)" opacity="0.93" />
          <text x="50" y="118" textAnchor="middle" fontFamily="'Mont','Georgia',serif" fontSize="10" fontWeight="700" fill="#4A2200" letterSpacing="1">RAJ</text>

          {/* == NECK == */}
          <ellipse cx="50" cy="82" rx="20" ry="8" fill="#C4621A" />

          {/* == FLAMES == */}
          <g className="raj-flames">
            <path d="M43 84 Q41 74 46 66 Q48 76 51 72 Q51 81 46 86 Z" fill="#FF6B1A" />
            <path d="M50 84 Q48 72 52 65 Q54 74 56 71 Q56 81 52 86 Z" fill="#FFB347" />
            <path d="M57 84 Q55 74 59 66 Q61 76 63 73 Q62 82 58 86 Z" fill="#FF6B1A" />
            <path d="M47 85 Q46 77 50 71 Q51 78 53 75 Q53 83 49 87 Z" fill="#FFE135" />
          </g>

          {/* == HEAD == */}
          <ellipse cx="50" cy="56" rx="32" ry="34" fill="url(#raj-skin)" filter="url(#raj-drop)" />
          <ellipse cx="38" cy="43" rx="9" ry="12" fill="rgba(255,255,255,0.18)" />

          {/* Cheeks */}
          <circle cx="29" cy="64" r="7" fill="#FF9B72" opacity="0.32" />
          <circle cx="71" cy="64" r="7" fill="#FF9B72" opacity="0.32" />

          {/* Eyebrows */}
          <path ref={browLRef} d="M27 42 Q37 37 47 42" stroke="#5B2800" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <path ref={browRRef} d="M53 42 Q63 37 73 42" stroke="#5B2800" strokeWidth="2.8" fill="none" strokeLinecap="round" />

          {/* Left eye */}
          <g ref={eyeLRef} style={{ transformOrigin: '37px 54px' }}>
            <ellipse cx="37" cy="54" rx="9.5" ry="10.5" fill="white" stroke="#E0C090" strokeWidth="0.5" />
            <circle  cx="37" cy="54" r="7.5"  fill="url(#raj-iris)" />
            <circle  cx="37" cy="54" r="4.5"  fill="#180C04" />
            <circle  cx="40" cy="50" r="2.8"  fill="white" />
            <circle  cx="34.5" cy="58" r="1.2" fill="rgba(255,255,255,0.55)" />
          </g>

          {/* Right eye */}
          <g ref={eyeRRef} style={{ transformOrigin: '63px 54px' }}>
            <ellipse cx="63" cy="54" rx="9.5" ry="10.5" fill="white" stroke="#E0C090" strokeWidth="0.5" />
            <circle  cx="63" cy="54" r="7.5"  fill="url(#raj-iris)" />
            <circle  cx="63" cy="54" r="4.5"  fill="#180C04" />
            <circle  cx="66" cy="50" r="2.8"  fill="white" />
            <circle  cx="60.5" cy="58" r="1.2" fill="rgba(255,255,255,0.55)" />
          </g>

          {/* Nose */}
          <ellipse cx="50" cy="64" rx="4" ry="2.5" fill="rgba(155,82,26,0.6)" />

          {/* Mustache */}
          <path d="M38 70 Q44 67 50 70 Q46 74 38 70" fill="#3D1A0A" />
          <path d="M50 70 Q56 67 62 70 Q56 74 50 70" fill="#3D1A0A" />

          {/* Smile */}
          <path d="M38 77 Q50 88 62 77" stroke="#8B2500" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M42 77 Q50 85 58 77 Q50 83 42 77" fill="rgba(255,255,255,0.72)" />

          {/* == RIGHT ARM (wave, shoulder at ~84,93) == */}
          <g ref={armRRef}>
            <ellipse cx="84" cy="108" rx="10" ry="20" fill="url(#raj-clay)" />
            <circle  cx="89" cy="126" r="8.5" fill="url(#raj-skin)" />
          </g>

          {/* == CHEF HAT (top layer) == */}
          <ellipse cx="50" cy="25" rx="36" ry="7.5" fill="url(#raj-hat)" />
          <rect x="22" y="1" width="56" height="26" rx="6" fill="url(#raj-hat)" />
          <ellipse cx="50" cy="2" rx="28" ry="5" fill="#FAFAFA" />
          <rect x="22" y="22" width="56" height="8" rx="2" fill="url(#raj-gold)" />
          <circle cx="50" cy="12" r="9" fill="url(#raj-gold)" opacity="0.9" />
          <text x="50" y="16.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="bold" fill="#4A2200">R</text>
        </svg>
      </div>

      {/* ── Hide button ── */}
      {!mini && (
        <button className="raj-hide-btn" onClick={() => setHidden(true)} aria-label="Hide Raj guide">×</button>
      )}
    </div>
  );
}
