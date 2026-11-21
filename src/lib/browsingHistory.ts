const KEY = 'rt-browsing-history';
const MAX = 24;

export type HistoryItem = {
  slug: string;
  name: string;
  image: string | null;
  price: number | null;
  category_label: string;
  viewedAt: number; // epoch ms
};

function load(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as HistoryItem[];
  } catch {
    return [];
  }
}

function save(items: HistoryItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — silent fail
  }
}

export function pushHistoryItem(item: Omit<HistoryItem, 'viewedAt'>) {
  const items = load().filter(h => h.slug !== item.slug);
  items.unshift({ ...item, viewedAt: Date.now() });
  save(items.slice(0, MAX));
}

export function getHistoryItems(): HistoryItem[] {
  return load();
}

export function removeHistoryItem(slug: string) {
  save(load().filter(h => h.slug !== slug));
}

export function clearHistory() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}
