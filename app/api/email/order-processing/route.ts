/**
 * Email #5 — Order Processing
 * Trigger: Admin marks order status as "processing" (being prepared)
 * Wire-up: Call from admin order status update handler when status changes to 'processing'
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, estimatedDispatch } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      estimatedDispatch?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#eff6ff', '#93c5fd', '#3b82f6', '⚙', 'Your Order is Being Prepared', "We've started processing your order.")}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Great news! Your order is now being prepared by our team. We're making sure everything is packed securely before dispatch.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      ${estimatedDispatch ? `
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        <p style="font-size:13px;color:#1d4ed8;font-weight:600;margin:0 0 4px">Estimated Dispatch</p>
        <p style="font-size:14px;color:#020103;font-weight:700;margin:0">${estimatedDispatch}</p>
      </div>` : ''}

      <div style="margin-bottom:28px">
        <p style="font-size:13px;font-weight:700;color:#020103;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.06em">What happens next</p>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px">
          <div style="width:28px;height:28px;background:#c3a268;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">1</div>
          <div>
            <p style="font-size:13px;font-weight:600;color:#020103;margin:0 0 2px">Order prepared</p>
            <p style="font-size:12px;color:#666;margin:0">Your items are being packed and quality-checked.</p>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div style="width:28px;height:28px;background:#e9e3da;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#888;font-size:12px;font-weight:700">2</div>
          <div>
            <p style="font-size:13px;font-weight:600;color:#888;margin:0 0 2px">Dispatch &amp; tracking</p>
            <p style="font-size:12px;color:#aaa;margin:0">You'll receive tracking details once your order ships.</p>
          </div>
        </div>
      </div>

      ${emailButton('https://rajtandoor.in/account/orders', 'View Order Status')}
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Order Processing: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
