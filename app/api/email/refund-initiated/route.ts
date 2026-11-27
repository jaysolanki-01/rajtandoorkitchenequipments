/**
 * Email #11 — Refund Initiated
 * Trigger: Admin initiates a refund after order cancellation
 * Wire-up: Call from admin refund action handler after creating refund record in Supabase
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, amount, estimatedDays, method } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      amount: number;
      estimatedDays: number;
      method?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#eff6ff', '#93c5fd', '#3b82f6', '↩', 'Refund Initiated', 'Your refund is being processed.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        We've initiated a refund for your cancelled order. The amount will be credited back to your original payment method within the timeframe below.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:10px">
          <span style="color:#888">Refund amount</span>
          <span style="color:#020103;font-weight:700">&#8377;${amount.toLocaleString('en-IN')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px${method ? ';margin-bottom:10px' : ''}">
          <span style="color:#888">Estimated time</span>
          <span style="color:#020103;font-weight:600">${estimatedDays} business days</span>
        </div>
        ${method ? `
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px">
          <span style="color:#888">Refund to</span>
          <span style="color:#020103;font-weight:600">${method}</span>
        </div>` : ''}
      </div>

      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        <p style="font-size:13px;color:#1d4ed8;margin:0">
          If you don't receive the refund within ${estimatedDays} business days, please contact us at
          <a href="mailto:rajtandoorequipment@gmail.com" style="color:#1d4ed8">rajtandoorequipment@gmail.com</a>.
        </p>
      </div>
    </div>

    ${emailFooter('You received this because you have an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Refund Initiated: ₹${amount.toLocaleString('en-IN')} for ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
