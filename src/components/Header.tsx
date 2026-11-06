import { useEffect, useState } from 'react';
import { links, nav } from '../config/content';
import { BrandLockup } from './BrandMark';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo" aria-label="Raj Tandoor and Kitchen Equipment — home">
          <BrandLockup />
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul id="site-nav-list" className="site-nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="site-nav__mobile-cta">
              <a className="btn btn--primary btn--block" href={links.requestQuote} onClick={() => setOpen(false)}>
                Request a Quote
              </a>
            </li>
          </ul>
        </nav>

        <a className="btn btn--outline btn--sm site-header__cta" href={links.requestQuote}>
          Request a Quote
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav-list"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
        </button>
      </div>
    </header>
  );
}
