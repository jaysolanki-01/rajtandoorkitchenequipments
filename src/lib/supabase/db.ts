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
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
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
