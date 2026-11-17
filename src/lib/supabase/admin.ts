import { createBrowserClient } from '@supabase/ssr';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
  return createBrowserClient(url, key);
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
