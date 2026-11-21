import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const CANCELLABLE = ['pending', 'confirmed'];

export async function POST(req: NextRequest) {
  const { orderNumber } = await req.json() as { orderNumber: string };
  if (!orderNumber) {
    return Response.json({ error: 'Order number is required.' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    },
  );

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return Response.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  // Verify the order belongs to this user
  const { data: order, error: fetchErr } = await supabase
    .from('orders')
    .select('status, user_id')
    .eq('order_number', orderNumber)
    .maybeSingle();

  if (fetchErr || !order) {
    return Response.json({ error: 'Order not found.' }, { status: 404 });
  }
  if (order.user_id !== user.id) {
    return Response.json({ error: 'Not authorized.' }, { status: 403 });
  }
  if (!CANCELLABLE.includes(order.status)) {
    return Response.json({ error: `Orders with status "${order.status}" cannot be cancelled.` }, { status: 400 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return Response.json({ error: 'Server not configured for order updates. Please contact support.' }, { status: 503 });
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey);
  const { error: updateErr } = await admin
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('order_number', orderNumber);

  if (updateErr) {
    return Response.json({ error: updateErr.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
