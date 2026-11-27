'use client';
import { useEffect, useState, useMemo } from 'react';
import { fetchAdminInventory, updateInventoryStock, type AdminInventoryItem } from '../../../src/lib/supabase/admin';

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

type SortKey = 'name' | 'price' | 'category';

export default function AdminInventoryPage() {
  const [items, setItems] = useState<AdminInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in_stock' | 'out_of_stock' | 'demo' | 'live'>('all');
  const [sort, setSort] = useState<SortKey>('category');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAdminInventory().then(data => {
      setItems(data);
      // expand all categories by default
      const cats = new Set(data.map(i => i.category));
      setExpandedCategories(cats);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return items.filter(i => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        (i.short_description ?? '').toLowerCase().includes(q) ||
        (i.tags ?? []).some(t => t.toLowerCase().includes(q));
      const matchFilter =
        filter === 'all' ? true :
        filter === 'in_stock' ? i.in_stock :
        filter === 'out_of_stock' ? !i.in_stock :
        filter === 'demo' ? i.is_demo :
        !i.is_demo;
      return matchSearch && matchFilter;
    }).sort((a, b) => {
      if (sort === 'price') return (b.price ?? 0) - (a.price ?? 0);
      if (sort === 'name') return a.name.localeCompare(b.name);
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    });
  }, [items, search, filter, sort]);

  // Category grouping
  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; items: AdminInventoryItem[] }>();
    for (const item of filtered) {
      if (!map.has(item.category)) {
        map.set(item.category, {
          label: item.category_label || item.category.replace(/-/g, ' '),
          items: [],
        });
      }
      map.get(item.category)!.items.push(item);
    }
    return map;
  }, [filtered]);

  async function toggleStock(id: string, current: boolean) {
    setUpdating(id);
    try {
      await updateInventoryStock(id, !current);
      setItems(prev => prev.map(i => i.id === id ? { ...i, in_stock: !current } : i));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdating(null);
    }
  }

  function toggleCategory(cat: string) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const inStockCount = items.filter(i => i.in_stock).length;
  const outCount = items.length - inStockCount;
  const liveCount = items.filter(i => !i.is_demo).length;
  const categoryCount = new Set(items.map(i => i.category)).size;
  const pricedItems = items.filter(i => i.price != null);
  const avgPrice = pricedItems.length ? Math.round(pricedItems.reduce((s, i) => s + i.price!, 0) / pricedItems.length) : 0;
  const stockPct = items.length ? Math.round((inStockCount / items.length) * 100) : 0;

  return (
    <div>
      <title>Inventory | Admin</title>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Products', value: loading ? '…' : items.length, color: 'var(--admin-fg)' },
          { label: 'In Stock', value: loading ? '…' : inStockCount, color: 'var(--admin-green)' },
          { label: 'Out of Stock', value: loading ? '…' : outCount, color: 'var(--admin-red)' },
          { label: 'Live Products', value: loading ? '…' : liveCount, color: 'var(--admin-blue)' },
          { label: 'Categories', value: loading ? '…' : categoryCount, color: '#7c3aed' },
          { label: 'Avg. Price', value: loading ? '…' : fmt(avgPrice), color: 'var(--admin-accent)' },
        ].map(s => (
          <div key={s.label} className="admin-stat">
            <div className="admin-stat-label">{s.label}</div>
            <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Stock health bar */}
      {!loading && items.length > 0 && (
        <div className="admin-card" style={{ padding: '14px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Stock Health
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: stockPct >= 70 ? 'var(--admin-green)' : stockPct >= 40 ? '#d97706' : 'var(--admin-red)' }}>
              {stockPct}% in stock
            </span>
          </div>
          <div style={{ height: 8, background: 'var(--admin-border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${stockPct}%`,
              background: stockPct >= 70 ? 'var(--admin-green)' : stockPct >= 40 ? '#d97706' : 'var(--admin-red)',
              borderRadius: 4,
              transition: 'width 0.4s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--admin-fg-muted)' }}>
            <span>{inStockCount} in stock</span>
            <span>{outCount} out of stock</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="search" placeholder="Search by name, category, tag…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 240px', maxWidth: 320, padding: '9px 12px', borderRadius: 6, border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 13 }}
        />
        <div className="admin-filter-row" style={{ margin: 0 }}>
          {([
            ['all', 'All'],
            ['in_stock', 'In Stock'],
            ['out_of_stock', 'Out of Stock'],
            ['live', 'Live'],
            ['demo', 'Demo'],
          ] as const).map(([f, label]) => (
            <button key={f} className={`admin-filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortKey)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-fg)', fontSize: 13, cursor: 'pointer' }}
        >
          <option value="category">Sort: Category</option>
          <option value="name">Sort: Name A–Z</option>
          <option value="price">Sort: Price High–Low</option>
        </select>
      </div>

      {/* Results summary */}
      {!loading && search && (
        <p style={{ fontSize: 12, color: 'var(--admin-fg-muted)', marginBottom: 12 }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Product list — grouped by category when sorted by category */}
      {loading ? (
        <div className="admin-card" style={{ padding: '24px 20px' }}>
          <p style={{ color: 'var(--admin-fg-muted)', fontSize: 13 }}>Loading inventory…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card" style={{ padding: '24px 20px' }}>
          <p style={{ color: 'var(--admin-fg-muted)', fontSize: 13 }}>No products match.</p>
        </div>
      ) : sort === 'category' ? (
        // Grouped view
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from(grouped.entries()).map(([cat, { label, items: catItems }]) => {
            const expanded = expandedCategories.has(cat);
            const catInStock = catItems.filter(i => i.in_stock).length;
            const catPrices = catItems.filter(i => i.price != null).map(i => i.price!);
            const catMinPrice = catPrices.length ? Math.min(...catPrices) : null;
            const catMaxPrice = catPrices.length ? Math.max(...catPrices) : null;

            return (
              <div key={cat} className="admin-card" style={{ overflow: 'hidden' }}>
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(cat)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 20px', background: 'none', border: 'none',
                    borderBottom: expanded ? '1px solid var(--admin-border)' : 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--admin-fg)', textTransform: 'capitalize' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--admin-fg-muted)', background: 'var(--admin-border)', padding: '2px 8px', borderRadius: 20 }}>
                      {catItems.length} product{catItems.length !== 1 ? 's' : ''}
                    </span>
                    <span style={{ fontSize: 11, color: catInStock === catItems.length ? 'var(--admin-green)' : catInStock === 0 ? 'var(--admin-red)' : '#d97706', fontWeight: 600 }}>
                      {catInStock}/{catItems.length} in stock
                    </span>
                    {catMinPrice != null && (
                      <span style={{ fontSize: 11, color: 'var(--admin-fg-muted)' }}>
                        {catMinPrice === catMaxPrice ? fmt(catMinPrice) : `${fmt(catMinPrice)} – ${fmt(catMaxPrice!)}`}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 16, color: 'var(--admin-fg-muted)', transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
                    ▾
                  </span>
                </button>

                {/* Products table */}
                {expanded && (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Tags / Warranty</th>
                        <th style={{ textAlign: 'center' }}>Visibility</th>
                        <th style={{ textAlign: 'center' }}>Stock</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catItems.map(i => (
                        <tr key={i.id}>
                          <td style={{ maxWidth: 280 }}>
                            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--admin-fg)' }}>{i.name}</div>
                            {i.short_description && (
                              <div style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
                                {i.short_description}
                              </div>
                            )}
                            <div className="admin-mono" style={{ marginTop: 2, fontSize: 10 }}>{i.slug}</div>
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            {i.price != null ? (
                              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--admin-fg)' }}>{fmt(i.price)}</span>
                            ) : i.price_label ? (
                              <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)', fontStyle: 'italic' }}>{i.price_label}</span>
                            ) : (
                              <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>On request</span>
                            )}
                          </td>
                          <td style={{ maxWidth: 180 }}>
                            {i.warranty && (
                              <div style={{ fontSize: 11, color: '#7c3aed', marginBottom: 4 }}>
                                {i.warranty} warranty
                              </div>
                            )}
                            {i.tags && i.tags.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {i.tags.slice(0, 3).map(tag => (
                                  <span key={tag} style={{ fontSize: 10, padding: '1px 6px', background: 'var(--admin-border)', borderRadius: 10, color: 'var(--admin-fg-muted)', textTransform: 'capitalize' }}>
                                    {tag}
                                  </span>
                                ))}
                                {i.tags.length > 3 && (
                                  <span style={{ fontSize: 10, color: 'var(--admin-fg-muted)' }}>+{i.tags.length - 3}</span>
                                )}
                              </div>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`admin-badge ${i.is_demo ? 'badge-quoted' : 'badge-done'}`}>
                              {i.is_demo ? 'Demo' : 'Live'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`admin-badge ${i.in_stock ? 'badge-done' : 'badge-cancelled'}`}>
                              {i.in_stock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              disabled={updating === i.id}
                              onClick={() => toggleStock(i.id, i.in_stock)}
                              style={{
                                padding: '5px 14px', borderRadius: 5, border: '1px solid var(--admin-border)',
                                background: i.in_stock ? 'rgba(159,18,57,0.08)' : 'rgba(26,107,69,0.1)',
                                color: i.in_stock ? 'var(--admin-red)' : 'var(--admin-green)',
                                fontSize: 12, fontWeight: 600, cursor: updating === i.id ? 'not-allowed' : 'pointer',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {updating === i.id ? '…' : i.in_stock ? 'Mark Out' : 'Mark In'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Flat table (name/price sort)
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tags / Warranty</th>
                <th style={{ textAlign: 'center' }}>Visibility</th>
                <th style={{ textAlign: 'center' }}>Stock</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id}>
                  <td style={{ maxWidth: 220 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{i.name}</div>
                    {i.short_description && (
                      <div style={{ fontSize: 11, color: 'var(--admin-fg-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                        {i.short_description}
                      </div>
                    )}
                    <div className="admin-mono" style={{ marginTop: 2, fontSize: 10 }}>{i.slug}</div>
                  </td>
                  <td style={{ fontSize: 12, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                    {(i.category_label || i.category).replace(/-/g, ' ')}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {i.price != null ? (
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{fmt(i.price)}</span>
                    ) : i.price_label ? (
                      <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)', fontStyle: 'italic' }}>{i.price_label}</span>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--admin-fg-muted)' }}>On request</span>
                    )}
                  </td>
                  <td style={{ maxWidth: 160 }}>
                    {i.warranty && (
                      <div style={{ fontSize: 11, color: '#7c3aed', marginBottom: 3 }}>{i.warranty} warranty</div>
                    )}
                    {i.tags && i.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {i.tags.slice(0, 2).map(tag => (
                          <span key={tag} style={{ fontSize: 10, padding: '1px 5px', background: 'var(--admin-border)', borderRadius: 10, color: 'var(--admin-fg-muted)', textTransform: 'capitalize' }}>
                            {tag}
                          </span>
                        ))}
                        {i.tags.length > 2 && (
                          <span style={{ fontSize: 10, color: 'var(--admin-fg-muted)' }}>+{i.tags.length - 2}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`admin-badge ${i.is_demo ? 'badge-quoted' : 'badge-done'}`}>
                      {i.is_demo ? 'Demo' : 'Live'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`admin-badge ${i.in_stock ? 'badge-done' : 'badge-cancelled'}`}>
                      {i.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      disabled={updating === i.id}
                      onClick={() => toggleStock(i.id, i.in_stock)}
                      style={{
                        padding: '5px 14px', borderRadius: 5, border: '1px solid var(--admin-border)',
                        background: i.in_stock ? 'rgba(159,18,57,0.08)' : 'rgba(26,107,69,0.1)',
                        color: i.in_stock ? 'var(--admin-red)' : 'var(--admin-green)',
                        fontSize: 12, fontWeight: 600, cursor: updating === i.id ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {updating === i.id ? '…' : i.in_stock ? 'Mark Out' : 'Mark In'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
