import { createBrowserClient } from '@supabase/ssr';

export type SupabaseProduct = {
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
  price_label?: string | null;
  group_id?: string | null;
  warranty?: string | null;
  included?: string[] | null;
  tags?: string[] | null;
};

export type QuoteInsert = {
  customer_name: string;
  email: string;
  phone?: string;
  business_name?: string;
  product_interest?: string;
  quantity?: string;
  requirements?: string;
  delivery_location?: string;
  source?: string;
};

export type OrderInsert = {
  customer_name: string;
  email: string;
  phone: string;
  address: Record<string, unknown>;
  items: unknown[];
  subtotal: number;
  shipping: number;
  total: number;
  payment_method?: string;
  user_id?: string;
  notes?: string;
};

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
  return createBrowserClient(url, key);
}

export async function fetchProducts(): Promise<SupabaseProduct[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('products')
    .select('*')
    .eq('is_demo', false)
    .order('name');
  if (error || !data?.length) return [];
  return data as SupabaseProduct[];
}

export async function insertQuote(payload: QuoteInsert): Promise<{ reference: string }> {
  const sb = getClient();
  const { data, error } = await sb
    .from('quotes')
    .insert(payload)
    .select('reference')
    .single();
  if (error) throw new Error(error.message);
  return { reference: data.reference };
}

export async function insertOrder(payload: OrderInsert): Promise<{ orderNumber: string }> {
  const sb = getClient();
  const { data, error } = await sb
    .from('orders')
    .insert(payload)
    .select('order_number')
    .single();
  if (error) throw new Error(error.message);
  return { orderNumber: data.order_number };
}

// ── User orders ──────────────────────────────────────────────────────────────

export type UserOrder = {
  order_number: string;
  status: string;
  created_at: string;
  total: number;
  payment_method: string;
  notes: string | null;
  items: { product?: { name?: string; slug?: string }; name?: string; slug?: string; quantity: number; price?: number }[];
  address: Record<string, unknown>;
  customer_name: string;
  email: string;
};

export async function fetchUserOrders(userId: string): Promise<UserOrder[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from('orders')
    .select('order_number, status, created_at, total, payment_method, notes')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as UserOrder[];
}

export async function fetchUserOrder(userId: string, orderNumber: string): Promise<UserOrder | null> {
  const sb = getClient();
  const { data, error } = await sb
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .eq('order_number', orderNumber)
    .maybeSingle();
  if (error || !data) return null;
  return data as UserOrder;
}

// ── Track order (no auth — match by order_number + email) ────────────────────

export type OrderTrackStatus = {
  order_number: string;
  status: string;
  created_at: string;
  payment_method: string;
};

export async function fetchOrderStatus(orderNumber: string, email: string): Promise<OrderTrackStatus | null> {
  const sb = getClient();
  // Use an RPC (SECURITY DEFINER function) so anonymous users can look up their
  // own order by number + email without needing direct table read access.
  const { data, error } = await sb.rpc('track_order', {
    p_order_number: orderNumber.trim().toUpperCase(),
    p_email: email.trim().toLowerCase(),
  });
  if (error || !data?.length) return null;
  return data[0] as OrderTrackStatus;
}

// ── Profile update (via Supabase Auth) ───────────────────────────────────────

export async function updateProfile(payload: {
  full_name?: string;
  phone?: string;
  password?: string;
}): Promise<void> {
  const sb = getClient();
  const { password, ...meta } = payload;
  const updates: { data?: Record<string, string>; password?: string } = {};
  if (Object.keys(meta).length > 0) updates.data = meta;
  if (password) updates.password = password;
  const { error } = await sb.auth.updateUser(updates);
  if (error) throw new Error(error.message);
}

// ── Addresses (stored in user_metadata — no extra table needed) ──────────────

export type UserAddress = {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
};

export async function fetchUserAddresses(): Promise<UserAddress[]> {
  const sb = getClient();
  const { data: { user } } = await sb.auth.getUser();
  return (user?.user_metadata?.addresses as UserAddress[]) ?? [];
}

export async function saveUserAddress(address: Omit<UserAddress, 'id'>): Promise<void> {
  const sb = getClient();
  const { data: { user } } = await sb.auth.getUser();
  const existing = (user?.user_metadata?.addresses as UserAddress[]) ?? [];
  const updated = address.is_default ? existing.map(a => ({ ...a, is_default: false })) : existing;
  const { error } = await sb.auth.updateUser({
    data: { addresses: [...updated, { ...address, id: crypto.randomUUID() }] },
  });
  if (error) throw new Error(error.message);
}

export async function deleteUserAddress(id: string): Promise<void> {
  const sb = getClient();
  const { data: { user } } = await sb.auth.getUser();
  const existing = (user?.user_metadata?.addresses as UserAddress[]) ?? [];
  const { error } = await sb.auth.updateUser({
    data: { addresses: existing.filter(a => a.id !== id) },
  });
  if (error) throw new Error(error.message);
}
