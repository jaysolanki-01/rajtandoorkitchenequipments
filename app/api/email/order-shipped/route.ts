/**
 * Email #6 — Order Shipped
 * Trigger: Admin marks order as "shipped" / dispatched
 * Wire-up: Call from admin order status update handler when status changes to 'shipped'
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, carrier, trackingNumber, trackingUrl, estimatedDelivery } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      carrier: string;
      trackingNumber: string;
      trackingUrl?: string;
      estimatedDelivery?: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0fdf4', '#86efac', '#16a34a', '🚚', 'Your Order Has Been Shipped!', 'Your package is on its way.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Your order has been dispatched and is heading your way. Use the tracking details below to follow its progress.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px">
          <span style="color:#888">Courier partner</span>
          <span style="color:#020103;font-weight:600">${carrier}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px${estimatedDelivery ? ';margin-bottom:10px' : ''}">
          <span style="color:#888">Tracking number</span>
          <span style="color:#020103;font-weight:700;font-family:monospace">${trackingNumber}</span>
        </div>
        ${estimatedDelivery ? `
        <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #ede9e3;padding-top:10px">
          <span style="color:#888">Estimated delivery</span>
          <span style="color:#020103;font-weight:600">${estimatedDelivery}</span>
        </div>` : ''}
      </div>

      ${trackingUrl
        ? emailButton(trackingUrl, 'Track Shipment')
        : emailButton('https://rajtandoor.in/track-order', 'Track Order')}
    </div>

    ${emailFooter('You received this because you placed an order on rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `Your Order is On Its Way: ${orderNumber} - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <orders@rajtandoor.in>',
  });

  return Response.json(result);
}
