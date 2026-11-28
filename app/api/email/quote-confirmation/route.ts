import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner, emailButton } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { customerName, email, reference, productInterest, requirements } =
    await req.json() as {
      customerName: string;
      email: string;
      reference: string;
      productInterest?: string;
      requirements?: string;
    };

  // ── Customer confirmation ──────────────────────────────────────────────
  const customerHtml = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#fdf8f0', '#c3a268', '#c3a268', '✓', 'Quote Request Received', 'We\'ll prepare a detailed quotation for you')}
    <div style="padding:28px 32px">
      <p style="font-size:15px;color:#333;margin:0 0 20px">Hi <strong>${customerName}</strong>,</p>
      <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 24px">
        Thank you for reaching out to Raj Tandoor &amp; Kitchen Equipment. We have received your enquiry
        and our team will review your requirements and get back to you within <strong>1–2 business days</strong>.
      </p>
      <div style="background:#f5ede0;border:1.5px solid #c3a268;border-radius:8px;padding:14px 18px;margin-bottom:24px">
        <p style="font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Your Reference Number</p>
        <p style="font-family:monospace;font-weight:700;font-size:17px;color:#020103;margin:0;letter-spacing:0.04em">${reference}</p>
      </div>
      ${productInterest ? `<p style="font-size:13px;color:#555;margin:0 0 8px"><strong>Product of interest:</strong> ${productInterest}</p>` : ''}
      ${requirements ? `<p style="font-size:13px;color:#555;margin:0 0 24px"><strong>Your requirements:</strong> ${requirements}</p>` : ''}
      <p style="font-size:13px;color:#555;margin:0 0 24px">
        In the meantime, feel free to explore our full range of commercial kitchen equipment.
      </p>
      ${emailButton('https://rajtandoorkitchenequipments.vercel.app/shop', 'Browse Products')}
    </div>
    ${emailFooter('You received this because you submitted a quote request on rajtandoor.in')}
  `);

  // ── Admin notification ─────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'rajtandoorequipment@gmail.com';
  const adminHtml = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#fff3e0', '#e88c00', '#e88c00', '!', 'New Quote Request', reference)}
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr><td style="padding:6px 0;color:#888;width:140px">Customer</td><td style="padding:6px 0;color:#111;font-weight:600">${customerName}</td></tr>
        <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#c3a268">${email}</a></td></tr>
        ${productInterest ? `<tr><td style="padding:6px 0;color:#888">Product</td><td style="padding:6px 0;color:#111">${productInterest}</td></tr>` : ''}
        ${requirements ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top">Requirements</td><td style="padding:6px 0;color:#111">${requirements}</td></tr>` : ''}
      </table>
      <div style="margin-top:24px">
        ${emailButton('https://rajtandoorkitchenequipments.vercel.app/admin/quotes', 'View in Admin')}
      </div>
    </div>
    ${emailFooter('Admin notification — Raj Tandoor internal')}
  `);

  await Promise.all([
    sendEmail({ to: email, subject: `Quote Request Received — ${reference} | Raj Tandoor`, html: customerHtml }),
    sendEmail({ to: adminEmail, subject: `New Quote: ${reference} from ${customerName}`, html: adminHtml }),
  ]);

  return Response.json({ ok: true });
}
