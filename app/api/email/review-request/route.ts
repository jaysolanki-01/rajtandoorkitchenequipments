/**
 * Email #15 — Review Request
 * Trigger: N days after successful delivery (e.g. 3-5 days)
 * Wire-up: Set up a scheduled job that:
 *   1. Finds orders marked 'delivered' N days ago with no review yet
 *   2. Calls this route for each eligible order
 *
 * NOTE: Requires a reviews table in Supabase to track which orders have been reviewed.
 *       Build the review system first, then wire this trigger.
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailOrderIdBlock, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, customerName, orderNumber, items, reviewUrl } =
    await req.json() as {
      email: string;
      customerName: string;
      orderNumber: string;
      items: { name: string; image?: string }[];
      reviewUrl: string;
    };

  const firstName = (customerName || 'Customer').split(' ')[0];
  const primaryProduct = items[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#faf5ff', '#c4b5fd', '#7c3aed', '⭐', 'How was your order?', 'Share your experience and help others decide.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        We hope you're enjoying your new equipment! Your feedback helps other commercial kitchen operators make informed decisions.
        It only takes a minute — we'd love to hear from you.
      </p>

      ${emailOrderIdBlock(orderNumber)}

      ${primaryProduct ? `
      <div style="display:flex;align-items:center;gap:14px;background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:14px 18px;margin-bottom:28px">
        ${primaryProduct.image ? `<img src="${primaryProduct.image}" alt="${primaryProduct.name}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;flex-shrink:0" />` : `<div style="width:60px;height:60px;background:#f5ede0;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:24px">🍳</div>`}
        <div>
          <p style="font-size:14px;font-weight:600;color:#020103;margin:0 0 2px">${primaryProduct.name}</p>
          ${items.length > 1 ? `<p style="font-size:12px;color:#888;margin:0">+${items.length - 1} more item${items.length > 2 ? 's' : ''}</p>` : ''}
        </div>
      </div>` : ''}

      <div style="text-align:center;margin:0 0 28px">
        <p style="font-size:14px;color:#555;margin:0 0 16px">Rate your overall experience</p>
        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px">
          ${[1,2,3,4,5].map(n => `<a href="${reviewUrl}?rating=${n}" style="display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;background:#f5ede0;border-radius:50%;font-size:20px;text-decoration:none">⭐</a>`).join('')}
        </div>
        ${emailButton(reviewUrl, 'Write a Review')}
      </div>

      <div style="background:#faf5eb;border:1px solid #e9d9b8;border-radius:8px;padding:14px 18px">
        <p style="font-size:13px;color:#666;margin:0">
          Had an issue? Before leaving a review, reach out to us —
          we're happy to make it right.
          <a href="mailto:rajtandoorequipment@gmail.com" style="color:#c3a268;text-decoration:none">rajtandoorequipment@gmail.com</a>
        </p>
      </div>
    </div>

    ${emailFooter('You received this because you recently received an order from rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: `How was your order, ${firstName}? Share your feedback - Raj Tandoor`,
    html,
    from: 'Raj Tandoor <noreply@rajtandoor.in>',
  });

  return Response.json(result);
}
