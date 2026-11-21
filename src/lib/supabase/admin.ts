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
};

export async function fetchAdminStats(): Promise<AdminStats> {
  const sb = getClient();
  const [ordersRes, quotesRes, pendingOrdersRes, pendingQuotesRes] = await Promise.all([
    sb.from('orders').select('id', { count: 'exact', head: true }),
    sb.from('quotes').select('id', { count: 'exact', head: true }),
    sb.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    sb.from('quotes').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);
  return {
    totalOrders: ordersRes.count ?? 0,
    pendingOrders: pendingOrdersRes.count ?? 0,
    totalQuotes: quotesRes.count ?? 0,
    pendingQuotes: pendingQuotesRes.count ?? 0,
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

// ── Product CRUD ──────────────────────────────────────────────────────────────

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
  const { data, error } = await sb
    .from('products')
    .insert(payload)
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

// ── Customers (derived from orders) ──────────────────────────────────────────

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
    sb.from('orders').select('email, customer_name, phone, total, created_at').order('created_at', { ascending: false }),
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

// ── Inventory (products with in_stock status) ─────────────────────────────────

export type AdminInventoryItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | null;
  in_stock: boolean;
  is_demo: boolean;
};

export async function fetchAdminInventory(): Promise<AdminInventoryItem[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('products')
    .select('id, slug, name, category, price, in_stock, is_demo')
    .order('name');
  if (error || !data) return [];
  return data as AdminInventoryItem[];
}

export async function updateInventoryStock(id: string, in_stock: boolean): Promise<void> {
  const sb = getClient();
  const { error } = await sb.from('products').update({ in_stock }).eq('id', id);
  if (error) throw new Error(error.message);
}
