/**
 * Email #10 — Order Cancelled
 * Trigger: Order cancellation (by customer or admin)
 * Wire-up: Already wired via /api/orders/send-cancellation
 *          This route is the unified replacement — update admin cancel flow to call here instead
 *
 * NOTE: The existing /api/orders/send-cancellation route handles this for now.
 *       Migrate to this route when ready to unify all email calls.
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, reason, refundInfo, items, total } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      reason?: string;
      refundInfo?: string;
      items?: { name: string; qty: number }[];
      total?: number | null;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const itemsHtml = items?.map(item => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f5e9e9;font-size:13px;color:#555">${item.name}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f5e9e9;font-size:13px;text-align:center;color:#888">x${item.qty}</td>
    </tr>`).join('') ?? '';

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#fef2f2', '#fca5a5', '#ef4444', '✕', 'Your Order Has Been Cancelled', `Order ${orderNumber} has been cancelled.`)}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Your order has been cancelled. We're sorry for any inconvenience.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      ${reason ? `
      <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:14px 18px;margin-bottom:20px">
        <p style="font-size:12px;color:#b91c1c;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Cancellation reason</p>
        <p style="font-size:14px;color:#020103;margin:0">${reason}</p>
      </div>` : ''}

      ${items && items.length > 0 ? `
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <thead>
          <tr style="border-bottom:2px solid #e9e3da">
            <th style="text-align:left;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Product</th>
            <th style="text-align:center;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Qty</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      ${total != null ? `<p style="text-align:right;font-size:14px;font-weight:700;color:#020103;margin:0 0 24px">Order Total: &#8377;${total.toLocaleString('en-IN')}</p>` : ''}` : ''}

      ${refundInfo ? `
      <div style="background:#f0faf4;border:1px solid #86efac;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        <p style="font-size:12px;color:#166534;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Refund Information</p>
        <p style="font-size:14px;color:#020103;margin:0">${refundInfo}</p>
      </div>` : ''}

      <p style="font-size:13px;color:#666;margin:0 0 24px">
        If you have any questions about your cancellation, please contact us at
        <a href="mailto:rajtandoorequipment@gmail.com" style="color:#c3a268;text-decoration:none">rajtandoorequipment@gmail.com</a>.
      </p>

      ${emailButton('https://rajtandoor.in/shop', 'Continue Shopping')}
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Order Cancelled: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
