import { createAdminClient } from './admin-client';
import { fmtProductId, fmtCustomerId } from './db';
export { fmtProductId, fmtCustomerId };

function getClient() {
  return createAdminClient();
}

export type AdminOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
  items: { product?: { name?: string }; name?: string; quantity: number }[];
  address: Record<string, unknown>;
  notes: string | null;
};

export type AdminQuote = {
  id: string;
  reference: string;
  customer_name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  product_interest: string | null;
  quantity: string | null;
  requirements: string | null;
  delivery_location: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

export type AdminStats = {
  totalOrders: number;
  pendingOrders: number;
  totalQuotes: number;
  pendingQuotes: number;
  totalRevenue: number;
  cancelledOrders: number;
  cancelledRevenue: number;
  ordersByStatus: Record<string, number>;
  quotesByStatus: Record<string, number>;
};

export async function fetchAdminStats(): Promise<AdminStats> {
  const sb = getClient();
  const [ordersRes, quotesRes] = await Promise.all([
    sb.from('orders').select('status, total'),
    sb.from('quotes').select('status'),
  ]);
  const orders = (ordersRes.data ?? []) as { status: string; total: number }[];
  const quotes = (quotesRes.data ?? []) as { status: string }[];

  const countBy = (rows: { status: string }[]) =>
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    }, {});

  const ordersByStatus = countBy(orders);
  const quotesByStatus = countBy(quotes);
  const cancelledOrders = ordersByStatus['cancelled'] ?? 0;
  const cancelledRevenue = orders
    .filter(o => o.status === 'cancelled')
    .reduce((sum, o) => sum + (o.total ?? 0), 0);
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  return {
    totalOrders: orders.length,
    pendingOrders: ordersByStatus['pending'] ?? 0,
    totalQuotes: quotes.length,
    pendingQuotes: quotesByStatus['pending'] ?? 0,
    totalRevenue,
    cancelledOrders,
    cancelledRevenue,
    ordersByStatus,
    quotesByStatus,
  };
}

export async function fetchAdminOrders(limit = 50): Promise<AdminOrder[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('orders')
    .select('id, order_number, customer_name, email, phone, total, status, payment_method, created_at, items, address, notes')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as AdminOrder[];
}

export async function fetchAdminQuotes(limit = 100): Promise<AdminQuote[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('quotes')
    .select('id, reference, customer_name, email, phone, business_name, product_interest, quantity, requirements, delivery_location, status, notes, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as AdminQuote[];
}

export async function updateOrderStatus(id: string, status: string): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('orders').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function updateQuoteStatus(id: string, status: string, notes?: string): Promise<void> {
  const sb = getClient();
  const payload: Record<string, string> = { status };
  if (notes !== undefined) payload.notes = notes;
  const { error } = await sb.from('quotes').update(payload).eq('id', id);
  if (error) throw new Error(error.message);
}

// ── Product CRUD ─────────────────────────────────────────────────────────────────────────

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_label: string;
  short_description: string;
  description: string;
  image: string;
  images: string[];
  price: number | null;
  currency: string;
  specs: { label: string; value: string }[];
  features: string[];
  is_demo: boolean;
  in_stock: boolean;
  price_label: string | null;
  group_id: string | null;
  warranty: string | null;
  tags: string[] | null;
  product_number: number | null;
  created_at: string;
  updated_at: string;
};

export type AdminCustomerRow = {
  id: string;
  customer_number: number;
  email: string;
  name: string | null;
  phone: string | null;
  user_id: string | null;
  created_at: string;
};

export async function fetchCustomerByEmail(email: string): Promise<AdminCustomerRow | null> {
  const sb = getClient();
  const { data, error } = await sb
    .from('customers')
    .select('id, customer_number, email, name, phone, user_id, created_at')
    .ilike('email', email)
    .maybeSingle();
  if (error || !data) return null;
  return data as AdminCustomerRow;
}

export async function fetchAdminProducts(): Promise<AdminProduct[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('products')
    .select('*')
    .order('name');
  if (error || !data) return [];
  return data as AdminProduct[];
}

export async function createProduct(payload: Omit<AdminProduct, 'created_at' | 'updated_at'>): Promise<AdminProduct> {
  const sb = getClient();
  // product_number is bigserial — omitting it lets the DB sequence assign the next value.
  // Sending null explicitly overrides the sequence and triggers a NOT NULL violation.
  const { product_number, ...rest } = payload;
  const finalPayload = product_number != null ? { ...rest, product_number } : rest;
  const { data, error } = await sb
    .from('products')
    .insert(finalPayload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AdminProduct;
}

export async function updateProduct(id: string, payload: Partial<Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('products').update(payload).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteProduct(id: string): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const sb = getClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${productId}/${Date.now()}.${ext}`;
  const { error } = await sb.storage.from('product-images').upload(path, file, { upsert: true });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = sb.storage.from('product-images').getPublicUrl(path);
  return publicUrl;
}

// ── Customers (derived from orders) ──────────────────────────────────────────────

export type AdminCustomer = {
  email: string;
  customer_name: string;
  phone: string;
  order_count: number;
  total_spent: number;
  last_order: string;
  customer_number?: number | null;
};

export async function fetchAdminCustomers(): Promise<AdminCustomer[]> {
  const sb = getClient();
  const [ordersRes, cusRes] = await Promise.all([
    sb.from('orders')
      .select('email, customer_name, phone, total, created_at, status')
      .neq('status', 'cancelled')
      .order('created_at', { ascending: false }),
    sb.from('customers').select('email, customer_number'),
  ]);
  if (ordersRes.error || !ordersRes.data) return [];

  const cusNumMap = new Map<string, number>();
  for (const c of cusRes.data ?? []) {
    cusNumMap.set(c.email.toLowerCase(), c.customer_number);
  }

  const map = new Map<string, AdminCustomer>();
  for (const o of ordersRes.data) {
    const key = o.email.toLowerCase();
    const existing = map.get(key);
    if (existing) {
      existing.order_count += 1;
      existing.total_spent += o.total ?? 0;
    } else {
      map.set(key, {
        email: o.email,
        customer_name: o.customer_name,
        phone: o.phone ?? '',
        order_count: 1,
        total_spent: o.total ?? 0,
        last_order: o.created_at,
        customer_number: cusNumMap.get(key) ?? null,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.order_count - a.order_count);
}

export async function fetchAdminOrderById(id: string): Promise<AdminOrder | null> {
  const sb = getClient();
  const { data, error } = await sb
    .from('orders')
    .select('id, order_number, customer_name, email, phone, total, status, payment_method, created_at, items, address, notes')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data as AdminOrder;
}

export async function fetchOrdersByEmail(email: string): Promise<AdminOrder[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('orders')
    .select('id, order_number, customer_name, email, phone, total, status, payment_method, created_at, items, address, notes')
    .ilike('email', email)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as AdminOrder[];
}

// ── Category CRUD ────────────────────────────────────────────────────────────────────────

export type AdminCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function fetchAdminCategories(): Promise<AdminCategory[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('categories')
    .select('*')
    .order('sort_order');
  if (error || !data) return [];
  return data as AdminCategory[];
}

export async function createCategory(payload: Omit<AdminCategory, 'created_at' | 'updated_at'>): Promise<AdminCategory> {
  const sb = getClient();
  const { data, error } = await sb
    .from('categories')
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AdminCategory;
}

export async function updateCategory(id: string, payload: Partial<Omit<AdminCategory, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('categories').update(payload).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteCategory(id: string): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('categories').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function uploadCategoryImage(file: File, categorySlug: string): Promise<string> {
  const sb = getClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${categorySlug}/${Date.now()}.${ext}`;
  const { error } = await sb.storage.from('category-images').upload(path, file, { upsert: true });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = sb.storage.from('category-images').getPublicUrl(path);
  return publicUrl;
}

// ── Inventory (products with in_stock status) ─────────────────────────────────────────────

export type AdminInventoryItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_label: string;
  short_description: string;
  price: number | null;
  price_label: string | null;
  in_stock: boolean;
  is_demo: boolean;
  tags: string[] | null;
  warranty: string | null;
  stock_quantity: number | null;
};

export async function fetchAdminInventory(): Promise<AdminInventoryItem[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('products')
    .select('id, slug, name, category, category_label, short_description, price, price_label, in_stock, is_demo, tags, warranty, stock_quantity')
    .order('category')
    .order('name');
  if (error || !data) return [];
  return data as AdminInventoryItem[];
}

export async function fetchUsedCategories(): Promise<string[]> {
  const sb = getClient();
  const { data, error } = await sb.from('products').select('category');
  if (error || !data) return [];
  return [...new Set(data.map((r: { category: string }) => r.category))].sort();
}

export async function updateInventoryStock(id: string, in_stock: boolean): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('products').update({ in_stock }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function updateStockQuantity(id: string, stock_quantity: number | null): Promise<void> {
  const sb = getClient();
  // Also flip in_stock automatically: 0 → out of stock, >0 → in stock, null → unchanged
  const extra = stock_quantity === null ? {} : { in_stock: stock_quantity > 0 };
  const { error } = await sb.from('products').update({ stock_quantity, ...extra }).eq('id', id);
  if (error) throw new Error(error.message);
}
