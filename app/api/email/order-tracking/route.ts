/**
 * Email #7 — Order Tracking Update
 * Trigger: Tracking status changes (e.g. "In Transit", "At Hub", "Out for Delivery")
 * Wire-up: Call from courier webhook or admin when a tracking milestone is reached
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, currentStatus, trackingUrl, estimatedDelivery } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      currentStatus: string;
      trackingUrl: string;
      estimatedDelivery?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0f9ff', '#7dd3fc', '#0284c7', '📍', 'Tracking Update for Your Order', `Status: ${currentStatus}`)}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        There's a new update on your order. Here's the latest tracking information.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      <div style="background:#f0f9ff;border:1.5px solid #7dd3fc;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <p style="font-size:12px;color:#0369a1;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px">Current Status</p>
        <p style="font-size:16px;font-weight:700;color:#020103;margin:0">${currentStatus}</p>
        ${estimatedDelivery ? `<p style="font-size:13px;color:#555;margin:6px 0 0">Expected delivery: <strong>${estimatedDelivery}</strong></p>` : ''}
      </div>

      ${emailButton(trackingUrl, 'View Full Tracking')}
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Order Update: ${currentStatus} - ${orderNumber}`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
