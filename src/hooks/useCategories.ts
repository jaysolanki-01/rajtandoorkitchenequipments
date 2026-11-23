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
        if (data.length > 0) setCategories(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
