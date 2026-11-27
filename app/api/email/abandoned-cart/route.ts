/**
 * Email #14 — Abandoned Cart
 * Trigger: Customer leaves with items in cart (after a configurable delay, e.g. 1-2 hours)
 * Wire-up: Set up a scheduled job (Supabase pg_cron, Vercel Cron, or similar) that:
 *   1. Queries sessions/carts not converted to orders within N hours
 *   2. Calls this route for each abandoned cart (if user is logged in and has email)
 *
 * NOTE: Requires persisting cart state to Supabase (not just browser localStorage).
 *       Build cart persistence first before wiring this trigger.
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, name, items, cartUrl, discountCode } =
    await req.json() as {
      email: string;
      name?: string;
      items: { name: string; qty: number; price: number | null; image?: string }[];
      cartUrl: string;
      discountCode?: string;
    };

  const firstName = (name || 'there').split(' ')[0];

  const itemsHtml = items.slice(0, 3).map(item => `
    <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #f0ebe4">
      ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:56px;height:56px;border-radius:6px;object-fit:cover;flex-shrink:0" />` : `<div style="width:56px;height:56px;background:#f5ede0;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:20px">🍳</div>`}
      <div style="flex:1;min-width:0">
        <p style="font-size:14px;font-weight:600;color:#020103;margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.name}</p>
        <p style="font-size:13px;color:#888;margin:0">Qty: ${item.qty}${item.price != null ? ' &nbsp;&bull;&nbsp; &#8377;' + (item.price * item.qty).toLocaleString('en-IN') : ''}</p>
      </div>
    </div>`).join('');

  const moreCount = items.length - 3;

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#fffbeb', '#fcd34d', '#f59e0b', '🛒', 'You left something behind!', 'Your cart is waiting for you.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        You left some items in your cart. They're still available — come back and complete your order before they sell out.
      </p>

      <div style="margin-bottom:24px">
        ${itemsHtml}
        ${moreCount > 0 ? `<p style="font-size:13px;color:#888;margin:10px 0 0">+ ${moreCount} more item${moreCount > 1 ? 's' : ''} in your cart</p>` : ''}
      </div>

      ${discountCode ? `
      <div style="background:#f0fdf4;border:1.5px dashed #22c55e;border-radius:8px;padding:14px 18px;margin-bottom:24px;text-align:center">
        <p style="font-size:12px;color:#166534;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px">Special offer for you</p>
        <p style="font-size:20px;font-weight:800;color:#020103;font-family:monospace;letter-spacing:0.1em;margin:0">${discountCode}</p>
        <p style="font-size:12px;color:#555;margin:6px 0 0">Use this code at checkout for a discount</p>
      </div>` : ''}

      ${emailButton(cartUrl, 'Complete Your Order')}

      <p style="font-size:12px;color:#aaa;margin:20px 0 0;text-align:center">
        Questions? Call us on +91 9687861313 or WhatsApp us.
      </p>
    </div>

    ${emailFooter('You received this because you have items in your cart at rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `${firstName}, you left something in your cart - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <noreply@rajtandoor.in>',
  });

  return Response.json(result);
}
