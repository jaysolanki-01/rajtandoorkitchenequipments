'use client';
import { useEffect, useState } from 'react';
import { fetchAdminQuotes, updateQuoteStatus, type AdminQuote } from '../../../src/lib/supabase/admin';

const STATUSES = ['all', 'pending', 'contacted', 'quoted', 'done', 'cancelled'];

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge badge-${status}`}>{status}</span>;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    fetchAdminQuotes(200).then(setQuotes).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    try {
      await updateQuoteStatus(id, status);
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    } finally {
      setUpdating(null);
    }
  }

  async function handleSaveNote(q: AdminQuote) {
    setUpdating(q.id);
    try {
      await updateQuoteStatus(q.id, q.status, noteText);
      setQuotes(prev => prev.map(x => x.id === q.id ? { ...x, notes: noteText } : x));
      setExpanded(null);
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <title>Quotes | Admin</title>

      <div className="admin-filter-row">
        {STATUSES.map(s => (
          <button key={s} className={`admin-filter-btn${filter === s ? ' active' : ''}`} onClick={() => setFilter(s)}>
            {s === 'all' ? 'All' : s}
            {s !== 'all' && (
              <span style={{ marginLeft: 5, opacity: 0.65 }}>
                ({quotes.filter(q => q.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '24px 20px', color: 'var(--admin-fg-muted)', fontSize: 13 }}>No quotes.</p>
        ) : filtered.map(q => (
          <div key={q.id} className="admin-quote-card">
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Left: customer info */}
              <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="admin-mono">{q.reference}</span>
                  <StatusBadge status={q.status} />
                  <span style={{ fontSize: 11, color: 'var(--admin-fg-muted)' }}>{fmtDate(q.created_at)}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>{q.customer_name}</div>
                {q.business_name && <div style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>{q.business_name}</div>}
                <div style={{ fontSize: 12, marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href={`mailto:${q.email}`} style={{ color: 'var(--admin-accent)' }}>{q.email}</a>
                  {q.phone && <span style={{ color: 'var(--admin-fg-muted)' }}>{q.phone}</span>}
                </div>
              </div>

              {/* Middle: request details */}
              <div style={{ flex: '2 1 280px', fontSize: 13 }}>
                {q.product_interest && (
                  <div><span style={{ color: 'var(--admin-fg-muted)', fontSize: 11 }}>PRODUCT </span>{q.product_interest}</div>
                )}
                {q.quantity && (
                  <div style={{ marginTop: 2 }}><span style={{ color: 'var(--admin-fg-muted)', fontSize: 11 }}>QTY </span>{q.quantity}</div>
                )}
                {q.delivery_location && (
                  <div style={{ marginTop: 2 }}><span style={{ color: 'var(--admin-fg-muted)', fontSize: 11 }}>DELIVERY </span>{q.delivery_location}</div>
                )}
                {q.requirements && (
                  <div style={{ marginTop: 6, fontSize: 12, color: 'var(--admin-fg-muted)', fontStyle: 'italic' }}>"{q.requirements}"</div>
                )}
              </div>

              {/* Right: actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                <select
                  className="admin-select"
                  value={q.status}
                  disabled={updating === q.id}
                  onChange={e => handleStatusChange(q.id, e.target.value)}
                >
                  {STATUSES.filter(s => s !== 'all').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => { setExpanded(expanded === q.id ? null : q.id); setNoteText(q.notes ?? ''); }}
                  style={{ fontSize: 11, padding: '4px 10px', border: '1px solid var(--admin-border)', borderRadius: 5, background: 'transparent', color: 'var(--admin-fg-muted)', cursor: 'pointer' }}
                >
                  {q.notes ? 'Edit note' : 'Add note'}
                </button>
              </div>
            </div>

            {/* Notes */}
            {q.notes && expanded !== q.id && (
              <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--admin-bg)', borderRadius: 6, fontSize: 12, color: 'var(--admin-fg-muted)' }}>
                {q.notes}
              </div>
            )}
            {expanded === q.id && (
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  rows={2}
                  placeholder="Internal note…"
                  style={{ flex: 1, fontSize: 12, padding: '8px 10px', border: '1px solid var(--admin-border)', borderRadius: 6, background: 'var(--admin-card)', color: 'var(--admin-fg)', resize: 'vertical' }}
                />
                <button
                  disabled={updating === q.id}
                  onClick={() => handleSaveNote(q)}
                  style={{ padding: '0 14px', background: 'var(--admin-accent)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
