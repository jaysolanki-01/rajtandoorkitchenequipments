import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(req: NextRequest) {
  // Verify the caller is authenticated
  const cookieStore = await cookies();
  const userClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    },
  );

  const { data: { user }, error: authErr } = await userClient.auth.getUser();
  if (authErr || !user) {
    return Response.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const body = await req.json() as {
    customer_name: string;
    email: string;
    phone: string;
    address: Record<string, unknown>;
    items: { id?: string; name?: string; slug?: string | null; image?: string | null; qty?: number; price?: number | null }[];
    subtotal: number;
    shipping: number;
    total: number;
    payment_method?: string;
    notes?: string;
    coupon_code?: string;
    coupon_discount?: number;
  };

  const sb = serviceClient();

  // Insert the order
  const { data: order, error: insertErr } = await sb
    .from('orders')
    .insert({ ...body, user_id: user.id })
    .select('order_number')
    .single();

  if (insertErr || !order) {
    return Response.json({ error: insertErr?.message ?? 'Failed to create order.' }, { status: 500 });
  }

  const orderNumber = (order as { order_number: string }).order_number;

  // Auto-update inventory: mark ordered products as out of stock (best-effort)
  const productIds = body.items
    .map(i => i.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0);

  if (productIds.length > 0) {
    await sb
      .from('products')
      .update({ in_stock: false })
      .in('id', productIds)
      .then(null, () => { /* don't block the order */ });
  }

  return Response.json({ orderNumber });
}
