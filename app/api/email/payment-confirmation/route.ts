/**
 * Email #4 — Payment Confirmation
 * Trigger: Successful payment received (online payment verified)
 * Wire-up: Call from payment webhook handler (Razorpay/PhonePe) after verifying payment signature
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, amount, payMethod, paidAt } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      amount: number;
      payMethod: string;
      paidAt: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0faf4', '#86efac', '#22c55e', '₹', 'Payment Received!', 'Your payment has been successfully processed.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        We've received your payment for order <strong>${orderNumber}</strong>. Your order is now being prepared for dispatch.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:10px">
          <span style="color:#888">Amount paid</span>
          <span style="color:#020103;font-weight:700">&#8377;${amount.toLocaleString('en-IN')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px;border-top:1px solid #ede9e3;padding-top:10px">
          <span style="color:#888">Payment method</span>
          <span style="color:#020103;font-weight:600">${payMethod}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px">
          <span style="color:#888">Paid on</span>
          <span style="color:#020103">${paidAt}</span>
        </div>
      </div>

      ${emailButton('https://rajtandoor.in/account/orders', 'View Order')}
    </div>

    ${emailFooter('You received this because you made a payment on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Payment Confirmed: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
