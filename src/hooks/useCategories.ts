'use client';
import { useEffect, useState } from 'react';
import { CATEGORIES } from '../config/categories';
import { fetchCategories, type PublicCategory } from '../lib/supabase/db';

export type ShopCategory = PublicCategory;

const staticCategories: ShopCategory[] = CATEGORIES.map(c => ({
  slug: c.slug,
  label: c.name,
  description: c.description || null,
  image: c.image || null,
}));

export function useCategories() {
  const [categories, setCategories] = useState<ShopCategory[]>(staticCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        if (data.length > 0) {
          // Enrich static categories with any Supabase overrides, but never
          // drop a static category just because it isn't in the DB yet.
          const dbMap = new Map(data.map(c => [c.slug, c]));
          const merged = staticCategories.map(c => dbMap.get(c.slug) ?? c);
          // Also append any DB-only categories the static config doesn't know about.
          const staticSlugs = new Set(staticCategories.map(c => c.slug));
          data.forEach(c => { if (!staticSlugs.has(c.slug)) merged.push(c); });
          setCategories(merged);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
