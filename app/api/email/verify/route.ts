/**
 * Email #2 — Email Verification
 * Trigger: New account registration (send alongside welcome, or separately)
 * Wire-up: Call after Supabase generates a verification token; pass the magic link URL
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, name, verificationUrl } = await req.json() as {
    email: string;
    name: string;
    verificationUrl: string;
  };

  const firstName = (name || 'there').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#fffbeb', '#fcd34d', '#f59e0b', '✉', 'Verify your email address', 'One quick step to activate your account.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Please verify your email address to finish setting up your Raj Tandoor account. This link expires in 24 hours.
      </p>

      <div style="text-align:center;margin:32px 0">
        <a href="${verificationUrl}" style="display:inline-block;background:#c3a268;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px">
          Verify Email Address &rarr;
        </a>
      </div>

      <p style="font-size:13px;color:#999;line-height:1.6;margin:0">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        <span style="color:#c3a268;word-break:break-all">${verificationUrl}</span>
      </p>

      <div style="margin-top:24px;padding:14px 18px;background:#f9f9f7;border-radius:8px;border:1px solid #e9e3da">
        <p style="font-size:12px;color:#888;margin:0">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    </div>

    ${emailFooter('You received this because someone registered with this email at rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: 'Verify your email - Raj Tandoor',
    html,
    from: 'Raj Tandoor <noreply@rajtandoor.in>',
  });

  return Response.json(result);
}
