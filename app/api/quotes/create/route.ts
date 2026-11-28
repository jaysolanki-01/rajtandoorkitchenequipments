import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
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

  const sb = serviceClient();
  const { data, error } = await sb
    .from('quotes')
    .insert(body)
    .select('reference')
    .single();

  if (error || !data) {
    return Response.json({ error: error?.message ?? 'Failed to submit quote.' }, { status: 500 });
  }

  const reference = (data as { reference: string }).reference;

  // Fire-and-forget confirmation email — never block the response
  fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rajtandoorkitchenequipments.vercel.app'}/api/email/quote-confirmation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: body.customer_name,
      email: body.email,
      reference,
      productInterest: body.product_interest,
      requirements: body.requirements,
    }),
  }).catch(() => { /* non-critical */ });

  return Response.json({ reference });
}
