/**
 * Email #12 — Refund Completed
 * Trigger: Refund successfully credited (payment gateway webhook or manual admin confirmation)
 * Wire-up: Call from payment gateway refund webhook or admin "mark refund complete" action
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, amount, refundedAt, method } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      amount: number;
      refundedAt: string;
      method?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0faf4', '#86efac', '#22c55e', '✓', 'Refund Completed!', 'Your refund has been successfully credited.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Your refund has been processed and the amount has been credited back to your original payment method.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:10px">
          <span style="color:#888">Amount refunded</span>
          <span style="color:#16a34a;font-weight:700">&#8377;${amount.toLocaleString('en-IN')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px${method ? ';margin-bottom:10px' : ''}">
          <span style="color:#888">Refunded on</span>
          <span style="color:#020103;font-weight:600">${refundedAt}</span>
        </div>
        ${method ? `
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px">
          <span style="color:#888">Refunded to</span>
          <span style="color:#020103;font-weight:600">${method}</span>
        </div>` : ''}
      </div>

      <div style="background:#faf5eb;border:1px solid #e9d9b8;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        <p style="font-size:13px;color:#666;margin:0">
          If the amount hasn't appeared in your account within 2-3 business days, please contact your bank or reach us at
          <a href="mailto:rajtandoorequipment@gmail.com" style="color:#c3a268;text-decoration:none">rajtandoorequipment@gmail.com</a>.
        </p>
      </div>

      ${emailButton('https://rajtandoor.in/shop', 'Shop Again')}
    </div>

    ${emailFooter('You received this because you have an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Refund of ₹${amount.toLocaleString('en-IN')} Completed - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
