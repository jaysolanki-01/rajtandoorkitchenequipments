import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// ── Section tips ───────────────────────────────────────────────────────────────
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
  '/shop': ["🛒 50+ premium products here!", "🔍 Filter by category!", "💰 Request bulk pricing!", "🚚 Free delivery above ₹5,000!"],
  '/tandoors': ["🔥 Signature hand-crafted tandoors!", "🏆 Perfect heat distribution!", "📏 Clay, steel & electric variants!"],
  '/kitchen-equipment': ["🍳 Complete commercial kitchen!", "✅ All commercial-grade products!", "🔧 Installation guidance available!"],
  '/about': ["📖 Crafting tandoors since 2000!", "🏭 Traditional craftsmanship!", "🌟 500+ restaurants trust us!"],
  '/contact': ["📞 Experts ready to help!", "⏰ Reply within 24 hours!", "💬 WhatsApp for fastest reply!"],
  '/request-quote': ["📋 Custom quote in 2 hours!", "🤝 Special rates for bulk orders!"],
  '/cart': ["🛍️ Review before checkout!", "💳 Multiple payment options!"],
  '/faq': ["❓ Can't find it? Just contact us!", "📋 Most common questions here!"],
};

function getTips(pathname: string): string[] {
  if (pathname.startsWith('/products/')) return ["🏷️ Check the full product specs!", "🌟 Read customer reviews!", "📦 Add to cart or request a quote!"];
  if (pathname.startsWith('/account')) return ["👤 Manage orders & addresses here!", "📦 Track deliveries in real-time!"];
  return PAGE_TIPS[pathname] ?? PAGE_TIPS['/'];
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ── Viewport perimeter waypoints (scroll 0→1 visits all corners + sides) ─────
interface WayPt { x: number; y: number; flipX: boolean; ptRot: number; ptArm: 'L' | 'R' }

function buildWaypoints(vw: number, vh: number): WayPt[] {
  const W = 96, H = 185; // character dimensions
  const mx = 18;          // margin from edge
  const top = 65, bot = vh - H - 10;
  const midX = vw / 2 - W / 2;
  const midY = vh / 2 - H / 2;
  const right = vw - W - mx;
  const left  = mx;

  return [
    // Right side (facing left, arm points left at content)
    { x: right,  y: bot,          flipX: false, ptRot: -78,  ptArm: 'L' }, // 0 bottom-right
    { x: right,  y: midY,         flipX: false, ptRot: -78,  ptArm: 'L' }, // 1 right-center
    { x: right,  y: top,          flipX: false, ptRot: -78,  ptArm: 'L' }, // 2 top-right
    // Top (centered, arm points down at content)
    { x: midX,   y: top,          flipX: false, ptRot:  85,  ptArm: 'L' }, // 3 top-center
    // Left side (flipped, arm now points right at content)
    { x: left,   y: top,          flipX: true,  ptRot: -78,  ptArm: 'L' }, // 4 top-left
    { x: left,   y: midY,         flipX: true,  ptRot: -78,  ptArm: 'L' }, // 5 left-center
    { x: left,   y: bot,          flipX: true,  ptRot: -78,  ptArm: 'L' }, // 6 bottom-left
    // Bottom (centered, arm points up at content above)
    { x: midX,   y: bot,          flipX: false, ptRot: -145, ptArm: 'L' }, // 7 bottom-center
    // Middle (surprise pop-in!)
    { x: midX,   y: midY,         flipX: false, ptRot: -78,  ptArm: 'L' }, // 8 center
  ];
}

function getWaypoint(pct: number, vw: number, vh: number): WayPt {
  const pts = buildWaypoints(vw, vh);
  const raw = pct * (pts.length - 1);
  const lo  = Math.floor(raw);
  const hi  = Math.min(pts.length - 1, lo + 1);
  const t   = raw - lo;
  const a   = pts[lo], b = pts[hi];
  return {
    x:      a.x + (b.x - a.x) * t,
    y:      a.y + (b.y - a.y) * t,
    flipX:  t > 0.5 ? b.flipX : a.flipX,
    ptRot:  t > 0.5 ? b.ptRot : a.ptRot,
    ptArm:  t > 0.5 ? b.ptArm : a.ptArm,
  };
}

export function RajMascot() {
  const { pathname } = useLocation();

  // DOM refs
  const wrapRef   = useRef<HTMLDivElement>(null);
  const charRef   = useRef<HTMLDivElement>(null);
  const armLRef   = useRef<SVGGElement>(null);
  const armRRef   = useRef<SVGGElement>(null);
  const legLRef   = useRef<SVGGElement>(null);
  const legRRef   = useRef<SVGGElement>(null);
  const eyeLRef   = useRef<SVGGElement>(null);
  const eyeRRef   = useRef<SVGGElement>(null);
  const browLRef  = useRef<SVGPathElement>(null);
  const browRRef  = useRef<SVGPathElement>(null);

  // Animation refs
  const floatTlRef   = useRef<gsap.core.Timeline | null>(null);
  const walkTlRef    = useRef<gsap.core.Timeline | null>(null);
  const waveTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const walkTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const posAnimRef   = useRef<gsap.core.Tween | null>(null);
  const isWalkingRef = useRef(false);
  const prevPtRef    = useRef<{ x: number; y: number } | null>(null);
  const curFlipRef   = useRef(false);

  // State
  const [tipIdx, setTipIdx]       = useState(0);
  const [mini,   setMini]         = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [onLeft, setOnLeft]       = useState(false);
  const [bubBelow, setBubBelow]   = useState(false);

  const tips = getTips(pathname);
  const tip  = tips[tipIdx % tips.length];

  // ── Float ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = charRef.current; if (!el) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { y: -10, duration: 1.8, ease: 'sine.inOut' });
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
    const id = setInterval(blink, 2800 + Math.random() * 1500);
    return () => clearInterval(id);
  }, []);

  // ── Idle wave ─────────────────────────────────────────────────────────────
  const doWave = useCallback(() => {
    if (isWalkingRef.current) return;
    const arm = armRRef.current; if (!arm) return;
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
    gsap.to([armLRef.current!, armRRef.current!], { rotation: 0, duration: 0.15 });

    walkTlRef.current = gsap.timeline({ repeat: -1 })
      .to(legLRef.current!, { rotation: -24, svgOrigin: '40 142', duration: 0.2, ease: 'sine.inOut' })
      .to(legRRef.current!, { rotation:  24, svgOrigin: '60 142', duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armLRef.current!, { rotation:  22, svgOrigin: '16 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armRRef.current!, { rotation: -22, svgOrigin: '84 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(charRef.current!, { y: -6, duration: 0.1, ease: 'sine.out' }, '<')
      .to(charRef.current!, { y:  0, duration: 0.1, ease: 'sine.in'  })
      .to(legLRef.current!, { rotation:  24, svgOrigin: '40 142', duration: 0.2, ease: 'sine.inOut' })
      .to(legRRef.current!, { rotation: -24, svgOrigin: '60 142', duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armLRef.current!, { rotation: -22, svgOrigin: '16 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(armRRef.current!, { rotation:  22, svgOrigin: '84 93',  duration: 0.2, ease: 'sine.inOut' }, '<')
      .to(charRef.current!, { y: -6, duration: 0.1, ease: 'sine.out' }, '<')
      .to(charRef.current!, { y:  0, duration: 0.1, ease: 'sine.in'  });
  }, []);

  const stopWalking = useCallback((ptRot: number) => {
    if (!isWalkingRef.current) return;
    isWalkingRef.current = false;
    walkTlRef.current?.kill();

    // Land: straighten legs/arms
    gsap.to([legLRef.current!, legRRef.current!], { rotation: 0, svgOrigin: '50 142', duration: 0.3, ease: 'power2.out' });
    gsap.to(charRef.current!, { y: 0, duration: 0.2 });
    gsap.to([armLRef.current!, armRRef.current!], { rotation: 0, duration: 0.2 });

    setTimeout(() => { if (!isWalkingRef.current) floatTlRef.current?.play(); }, 500);

    // Arrive: jump + eyebrow raise + point
    setTimeout(() => {
      if (isWalkingRef.current) return;
      gsap.timeline()
        .to(charRef.current!, { y: -18, scale: 1.09, duration: 0.18, ease: 'power2.out' })
        .to(charRef.current!, { y: 0,  scale: 1,    duration: 0.38, ease: 'bounce.out'  });
      gsap.to([browLRef.current!, browRRef.current!], { y: -4, duration: 0.18 });
      gsap.to([browLRef.current!, browRRef.current!], { y: 0,  duration: 0.4,  delay: 0.7 });
      gsap.to(armLRef.current!, { rotation: ptRot, svgOrigin: '16 93', duration: 0.5, ease: 'back.out(1.5)' });
      gsap.to(armRRef.current!, { rotation: 14,    svgOrigin: '84 93', duration: 0.3, ease: 'power2.out'   });
    }, 300);
  }, []);

  // ── Scroll → perimeter position ───────────────────────────────────────────
  const stopWalkingRef = useRef(stopWalking);
  stopWalkingRef.current = stopWalking;

  useEffect(() => {
    let lastPtRot = -78;

    const handleScroll = () => {
      const wrap = wrapRef.current; if (!wrap) return;
      const scrollY = window.scrollY;
      const scrollH = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const pct = clamp(scrollY / Math.max(1, scrollH - vh), 0, 1);

      const wp = getWaypoint(pct, vw, vh);
      lastPtRot = wp.ptRot;

      const prev = prevPtRef.current;
      const moved = !prev || Math.abs(wp.x - prev.x) > 4 || Math.abs(wp.y - prev.y) > 4;

      if (moved) {
        prevPtRef.current = { x: wp.x, y: wp.y };

        // Flip character for left-side positions
        if (wp.flipX !== curFlipRef.current) {
          curFlipRef.current = wp.flipX;
          gsap.to(charRef.current!, { scaleX: wp.flipX ? -1 : 1, duration: 0.28, ease: 'power2.inOut' });
        }

        setOnLeft(wp.flipX);
        setBubBelow(wp.y < vh * 0.35);

        startWalking();
        posAnimRef.current?.kill();
        posAnimRef.current = gsap.to(wrap, { left: wp.x, top: wp.y, duration: 0.5, ease: 'power2.inOut' });
      }

      clearTimeout(walkTimerRef.current);
      walkTimerRef.current = setTimeout(() => stopWalkingRef.current(lastPtRot), 650);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(walkTimerRef.current);
    };
  }, [pathname, startWalking]);

  // ── IntersectionObserver for section tips ─────────────────────────────────
  useEffect(() => {
    const selectors = Array.from({ length: 10 }, (_, i) => `#raj-s${i}`);
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
    setTipIdx(0); setMini(false); setOnLeft(false); setBubBelow(false);
    isWalkingRef.current = false;
    walkTlRef.current?.kill();
    prevPtRef.current = null;
    curFlipRef.current = false;

    const wrap = wrapRef.current;
    if (wrap) {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const startX = vw - 96 - 18;
      const startY = vh - 185 - 10;
      gsap.set(wrap, { left: startX, top: startY });
      gsap.set(charRef.current!, { scaleX: 1 });
      gsap.fromTo(wrap,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }
    gsap.set(armLRef.current!, { rotation: 0 });
    setTimeout(() => {
      if (!isWalkingRef.current) {
        gsap.to(armLRef.current!, { rotation: -78, svgOrigin: '16 93', duration: 0.55, ease: 'back.out(1.4)' });
      }
    }, 750);
  }, [pathname]);

  // ── Next-tip bounce ───────────────────────────────────────────────────────
  const nextTip = () => {
    gsap.timeline()
      .to(charRef.current!, { scale: 1.14, duration: 0.1, ease: 'power2.out' })
      .to(charRef.current!, { scale: 1,    duration: 0.42, ease: 'elastic.out(1.2, 0.5)' });
    setTipIdx(i => (i + 1) % tips.length);
  };

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
    <div
      ref={wrapRef}
      className={`raj-wrap${onLeft ? ' raj-wrap--left' : ''}${bubBelow ? ' raj-wrap--bub-below' : ''}`}
      role="complementary"
      aria-label="Raj guide"
      style={{ left: 'calc(100vw - 114px)', top: 'calc(100vh - 215px)' }}
    >
      {/* Speech bubble */}
      {!mini && (
        <div className="raj-bubble" aria-live="polite">
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

      {/* Character */}
      <div
        ref={charRef}
        className={`raj-char${mini ? ' raj-char--mini' : ''}`}
        onClick={() => { if (mini) setMini(false); }}
        role={mini ? 'button' : undefined}
        aria-label={mini ? 'Open Raj guide' : undefined}
        tabIndex={mini ? 0 : -1}
        onKeyDown={mini ? (e) => { if (e.key === 'Enter' || e.key === ' ') setMini(false); } : undefined}
      >
        <svg viewBox="0 0 100 192" width={mini ? 60 : 96} height={mini ? 90 : 185} overflow="visible" aria-hidden="true">
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

          {/* Shadow */}
          <ellipse cx="50" cy="190" rx="40" ry="7" fill="#000" opacity="0.12" />

          {/* Legs */}
          <g ref={legLRef}>
            <ellipse cx="40" cy="158" rx="10" ry="20" fill="url(#raj-clay)" />
            <ellipse cx="36" cy="177" rx="13" ry="6"  fill="url(#raj-clay)" />
          </g>
          <g ref={legRRef}>
            <ellipse cx="60" cy="158" rx="10" ry="20" fill="url(#raj-clay)" />
            <ellipse cx="64" cy="177" rx="13" ry="6"  fill="url(#raj-clay)" />
          </g>

          {/* Left arm (pointing) */}
          <g ref={armLRef}>
            <ellipse cx="16" cy="108" rx="10" ry="20" fill="url(#raj-clay)" />
            <circle  cx="11" cy="126" r="8.5" fill="url(#raj-skin)" />
            <ellipse cx="2"  cy="121" rx="4"  ry="7.5" fill="url(#raj-skin)" transform="rotate(-20 11 126)" />
          </g>

          {/* Body */}
          <ellipse cx="50" cy="112" rx="37" ry="34" fill="url(#raj-clay)" filter="url(#raj-drop)" />
          <ellipse cx="38" cy="96"  rx="9"  ry="13" fill="rgba(255,255,255,0.13)" />
          <ellipse cx="50" cy="114" rx="20" ry="13" fill="url(#raj-gold)" opacity="0.93" />
          <text x="50" y="118" textAnchor="middle" fontFamily="'Mont','Georgia',serif" fontSize="10" fontWeight="700" fill="#4A2200" letterSpacing="1">RAJ</text>

          {/* Neck */}
          <ellipse cx="50" cy="82" rx="20" ry="8" fill="#C4621A" />

          {/* Flames */}
          <g className="raj-flames">
            <path d="M43 84 Q41 74 46 66 Q48 76 51 72 Q51 81 46 86 Z" fill="#FF6B1A" />
            <path d="M50 84 Q48 72 52 65 Q54 74 56 71 Q56 81 52 86 Z" fill="#FFB347" />
            <path d="M57 84 Q55 74 59 66 Q61 76 63 73 Q62 82 58 86 Z" fill="#FF6B1A" />
            <path d="M47 85 Q46 77 50 71 Q51 78 53 75 Q53 83 49 87 Z" fill="#FFE135" />
          </g>

          {/* Head */}
          <ellipse cx="50" cy="56" rx="32" ry="34" fill="url(#raj-skin)" filter="url(#raj-drop)" />
          <ellipse cx="38" cy="43" rx="9"  ry="12" fill="rgba(255,255,255,0.18)" />

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

          {/* Right arm (wave) */}
          <g ref={armRRef}>
            <ellipse cx="84" cy="108" rx="10" ry="20" fill="url(#raj-clay)" />
            <circle  cx="89" cy="126" r="8.5" fill="url(#raj-skin)" />
          </g>

          {/* Chef hat */}
          <ellipse cx="50" cy="25" rx="36" ry="7.5" fill="url(#raj-hat)" />
          <rect x="22" y="1" width="56" height="26" rx="6" fill="url(#raj-hat)" />
          <ellipse cx="50" cy="2" rx="28" ry="5" fill="#FAFAFA" />
          <rect x="22" y="22" width="56" height="8" rx="2" fill="url(#raj-gold)" />
          <circle cx="50" cy="12" r="9" fill="url(#raj-gold)" opacity="0.9" />
          <text x="50" y="16.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="bold" fill="#4A2200">R</text>
        </svg>
      </div>

      {/* Hide button */}
      {!mini && (
        <button className="raj-hide-btn" onClick={() => setHidden(true)} aria-label="Hide Raj guide">×</button>
      )}
    </div>
  );
}
