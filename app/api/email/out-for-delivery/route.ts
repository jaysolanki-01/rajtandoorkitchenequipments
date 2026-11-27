/**
 * Email #8 — Out for Delivery
 * Trigger: Courier marks shipment as "Out for Delivery"
 * Wire-up: Call from courier webhook (Delhivery/DTDC/Shiprocket) on OFD status event
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, estimatedTime } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      estimatedTime?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#fefce8', '#fde047', '#ca8a04', '🛵', 'Your Order is Out for Delivery!', 'Your package will arrive today.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Your order is out for delivery today. Please ensure someone is available to receive it at your delivery address.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      ${estimatedTime ? `
      <div style="background:#fefce8;border:1.5px solid #fde047;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        <p style="font-size:12px;color:#a16207;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Estimated Arrival</p>
        <p style="font-size:16px;font-weight:700;color:#020103;margin:0">${estimatedTime}</p>
      </div>` : ''}

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <p style="font-size:13px;font-weight:700;color:#020103;margin:0 0 10px">Delivery tips</p>
        <ul style="margin:0;padding:0 0 0 18px;font-size:13px;color:#666;line-height:1.9">
          <li>Keep your phone accessible for the delivery agent</li>
          <li>Have your order ID ready: <strong>${orderNumber}</strong></li>
          <li>For COD orders, keep the exact amount ready</li>
        </ul>
      </div>
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Out for Delivery Today: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
