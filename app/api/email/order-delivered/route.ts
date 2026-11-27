/**
 * Email #9 — Order Delivered
 * Trigger: Courier confirms successful delivery
 * Wire-up: Call from courier webhook on "Delivered" status, or admin marking order delivered
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, deliveredAt } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      deliveredAt?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0fdf4', '#86efac', '#16a34a', '✓', 'Order Delivered!', 'Your package has been successfully delivered.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Your order has been delivered. We hope you're happy with your purchase!
      </p>

      ${emailOrderIdBlock(orderNumber)}

      ${deliveredAt ? `
      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;font-size:13px">
          <span style="color:#888">Delivered on</span>
          <span style="color:#020103;font-weight:600">${deliveredAt}</span>
        </div>
      </div>` : ''}

      <div style="background:#faf5eb;border:1px solid #e9d9b8;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <p style="font-size:13px;color:#020103;font-weight:600;margin:0 0 6px">Need any help?</p>
        <p style="font-size:13px;color:#666;margin:0">
          If there's any issue with your order, please contact us within 48 hours at
          <a href="mailto:rajtandoorequipment@gmail.com" style="color:#c3a268;text-decoration:none">rajtandoorequipment@gmail.com</a>
          or call +91 9687861313.
        </p>
      </div>

      ${emailButton('https://rajtandoor.in/account/orders', 'View Order Details')}
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Order Delivered: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
