'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSearch } from '../../store/SearchContext';

const RECENT_KEY = 'rt-recent-searches';
const MAX_RECENT = 5;
const QUICK_SEARCHES = ['Tandoor', 'Gas Tandoor', 'Commercial', 'Clay Tandoor', 'Accessories', 'Restaurant'];

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
}
function saveRecent(term: string) {
  if (!term.trim()) return;
  const list = [term, ...getRecent().filter((r) => r !== term)].slice(0, MAX_RECENT);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
}
function removeRecent(term: string) {
  const list = getRecent().filter((r) => r !== term);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="so__hl">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchOverlay() {
  const { isOpen, query, results, close, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [focused, setFocused] = useState(-1);

  useEffect(() => {
    if (isOpen) {
      setRecent(getRecent());
      setFocused(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = useCallback((term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  }, [setQuery]);

  const handleResultClick = useCallback((name: string) => {
    saveRecent(name);
    setRecent(getRecent());
    close();
  }, [close]);

  const handleRemoveRecent = useCallback((e: React.MouseEvent, term: string) => {
    e.preventDefault(); e.stopPropagation();
    removeRecent(term);
    setRecent(getRecent());
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused((f) => Math.min(f + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocused((f) => Math.max(f - 1, -1)); }
    if (e.key === 'Enter' && focused >= 0) {
      const r = results[focused];
      saveRecent(r.name);
      close();
      window.location.href = `/products/${r.slug}`;
    }
  }, [results, focused, close]);

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div className="so" role="dialog" aria-modal="true" aria-label="Search products" onKeyDown={handleKeyDown}>
      <div className="so__backdrop" onClick={close} aria-hidden="true" />

      <div className="so__panel">
        {/* ── Header ── */}
        <div className="so__header">
          <button type="button" className="so__back-btn" onClick={close} aria-label="Close search">←</button>
          <label htmlFor="so-input" className="sr-only">Search products</label>
          <input
            id="so-input"
            ref={inputRef}
            type="search"
            className="so__input"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setFocused(-1); }}
            autoComplete="off"
            spellCheck={false}
            aria-autocomplete="list"
            aria-controls="so-results"
          />
          {hasQuery && (
            <button type="button" className="so__clear" aria-label="Clear search"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}>×</button>
          )}
        </div>

        {/* ── Body ── */}
        <div className="so__body" id="so-results" role="region" aria-label="Search results">

          {!hasQuery && (
            <>
              {recent.length > 0 && (
                <div className="so__section">
                  <div className="so__section-head">Recent</div>
                  <div className="so__chips">
                    {recent.map((r) => (
                      <button key={r} type="button" className="so__chip so__chip--recent" onClick={() => handleSelect(r)}>
                        {r}
                        <span className="so__chip-remove" role="button" aria-label={`Remove ${r}`}
                          onClick={(e) => handleRemoveRecent(e, r)}>×</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="so__section">
                <div className="so__section-head">Popular searches</div>
                <div className="so__chips">
                  {QUICK_SEARCHES.map((s) => (
                    <button key={s} type="button" className="so__chip" onClick={() => handleSelect(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {hasQuery && results.length > 0 && (
            <div className="so__section">
              <div className="so__section-head">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </div>
              <ul className="so__results" role="listbox" aria-label="Product results">
                {results.slice(0, 8).map((p, i) => (
                  <li key={p.id} role="option" aria-selected={focused === i}>
                    <Link
                      href={`/products/${p.slug}`}
                      className={`so__result${focused === i ? ' so__result--focused' : ''}`}
                      onClick={() => handleResultClick(p.name)}
                    >
                      <div className="so__result-img-wrap">
                        {p.image
                          ? <img src={p.image} alt="" className="so__result-img" loading="lazy" width={52} height={52} />
                          : <span className="so__result-img-placeholder" />}
                      </div>
                      <div className="so__result-info">
                        <span className="so__result-cat">{p.category_label}</span>
                        <span className="so__result-name">
                          <Highlight text={p.name} query={query} />
                        </span>
                      </div>
                      <span className="so__result-price">
                        {p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Request Quote'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasQuery && results.length === 0 && (
            <div className="so__empty">
              <p className="so__empty-title">No results for &ldquo;{query}&rdquo;</p>
              <p className="so__empty-sub">Try a different word or browse all products.</p>
              <div className="so__chips so__chips--center">
                {QUICK_SEARCHES.slice(0, 4).map((s) => (
                  <button key={s} type="button" className="so__chip" onClick={() => handleSelect(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="so__footer">
          <Link href="/shop" className="so__browse-all" onClick={close}>
            Browse all products →
          </Link>
        </div>
      </div>
    </div>
  );
}
