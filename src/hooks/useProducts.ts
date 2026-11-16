'use client';
import { useEffect, useState } from 'react';
import { products as staticProducts } from '../config/products';
import { fetchProducts, type SupabaseProduct } from '../lib/supabase/db';
import type { Product } from '../config/products';

function toProduct(p: SupabaseProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category as Product['category'],
    categoryLabel: p.category_label,
    shortDescription: p.short_description,
    description: p.description,
    image: p.image,
    images: p.images,
    price: p.price,
    currency: p.currency,
    specs: p.specs,
    features: p.features,
    isDemo: p.is_demo,
    inStock: p.in_stock,
    priceLabel: p.price_label ?? undefined,
    sizeGroup: p.group_id ?? undefined,
    warranty: p.warranty ?? undefined,
    included: p.included ?? undefined,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        if (data.length > 0) setProducts(data.map(toProduct));
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
