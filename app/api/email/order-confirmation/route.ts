/**
 * Email #3 — Order Confirmation
 * Trigger: Successful order placement
 * Wire-up: Already wired in the checkout flow via /api/orders/send-confirmation
 *          This route is the unified replacement — update the checkout to call here instead
 *
 * NOTE: The existing /api/orders/send-confirmation route handles this for now.
 *       Migrate to this route when ready to unify all email calls.
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI',
  card: 'Credit / Debit Card',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, items, total, payMethod, address } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      items: { name: string; qty: number; price: number | null }[];
      total: number | null;
      payMethod: string;
      address: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;color:#020103">${item.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;text-align:center;color:#666">${item.qty}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;text-align:right;font-weight:600;color:#020103">
        ${item.price != null ? '&#8377;' + (item.price * item.qty).toLocaleString('en-IN') : 'On request'}
      </td>
    </tr>`).join('');

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0faf4', '#86efac', '#22c55e', '✓', 'Order Placed Successfully!', "We've received your order and will be in touch shortly.")}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Thank you for ordering from Raj Tandoor &amp; Kitchen Equipment. Your order has been confirmed and our team will contact you to arrange payment and delivery.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <thead>
          <tr style="border-bottom:2px solid #e9e3da">
            <th style="text-align:left;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Product</th>
            <th style="text-align:center;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Qty</th>
            <th style="text-align:right;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Amount</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      ${total != null ? `
      <div style="text-align:right;border-top:2px solid #e9e3da;padding-top:12px;margin-bottom:28px">
        <p style="font-size:16px;font-weight:700;color:#020103;margin:0">
          Total: &#8377;${total.toLocaleString('en-IN')} <span style="font-size:12px;font-weight:400;color:#888">(Incl. GST)</span>
        </p>
        <p style="font-size:12px;color:#22c55e;margin:4px 0 0;font-weight:600">FREE Shipping</p>
      </div>` : ''}

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px">
          <span style="color:#888">Payment</span>
          <span style="color:#020103;font-weight:600">${PAY_LABEL[payMethod] ?? payMethod}</span>
        </div>
        <div style="border-top:1px solid #ede9e3;padding-top:10px;font-size:13px">
          <span style="color:#888;display:block;margin-bottom:4px">Delivery address</span>
          <span style="color:#020103">${address}</span>
        </div>
      </div>

      ${emailButton('https://rajtandoor.in/track-order', 'Track Your Order')}
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Order Confirmed: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
