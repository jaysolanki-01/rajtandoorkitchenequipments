import { createServerClient } from '@supabase/ssr';
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

  // Fetch order and verify ownership
  const { data: order, error: fetchErr } = await supabase
    .from('orders')
    .select('status, user_id, customer_name, email, items, total, payment_method')
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

  // Update status using the user's own session — allowed by the RLS policy
  // "users can cancel own orders" (migration 011)
  const { error: updateErr } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('order_number', orderNumber)
    .eq('user_id', user.id);

  if (updateErr) {
    return Response.json({ error: updateErr.message }, { status: 500 });
  }

  // Send cancellation email (best-effort — don't block the response)
  const origin = req.headers.get('origin') || req.headers.get('host') || '';
  const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
  fetch(`${baseUrl}/api/orders/send-cancellation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderNumber,
      customerName: order.customer_name,
      email: order.email,
      items: order.items ?? [],
      total: order.total,
      payMethod: order.payment_method,
    }),
  }).catch(() => { /* fire-and-forget */ });

  return Response.json({ success: true });
}
