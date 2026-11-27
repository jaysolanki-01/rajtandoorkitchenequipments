/**
 * Email #1 — Welcome Email
 * Trigger: Customer registration (new account created)
 * Wire-up: Call after successful Supabase auth sign-up in the registration flow
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailButton, emailBanner } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, name } = await req.json() as { email: string; name: string };

  const firstName = (name || 'there').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#f0faf4', '#86efac', '#22c55e', '🎉', `Welcome to Raj Tandoor, ${firstName}!`, 'Your account is ready.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Welcome to Raj Tandoor &amp; Kitchen Equipment. You can now browse our full range of commercial tandoors and kitchen equipment, save your favourites, and place orders directly.
      </p>

      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:20px 24px;margin-bottom:28px">
        <p style="font-size:13px;font-weight:700;color:#020103;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.06em">What you can do</p>
        <ul style="margin:0;padding:0 0 0 18px;font-size:14px;color:#555;line-height:2">
          <li>Browse 14+ categories of commercial kitchen equipment</li>
          <li>Request quotes for bulk or custom orders</li>
          <li>Track your orders in real time</li>
          <li>Manage your delivery addresses</li>
        </ul>
      </div>

      ${emailButton('https://rajtandoor.in/shop', 'Start Shopping')}
    </div>

    ${emailFooter('You received this because you created an account at rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: 'Welcome to Raj Tandoor & Kitchen Equipment',
    html,
    from: 'Raj Tandoor <noreply@rajtandoor.in>',
  });

  return Response.json(result);
}
