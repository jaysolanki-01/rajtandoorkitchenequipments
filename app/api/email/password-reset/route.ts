/**
 * Email #13 — Password Reset
 * Trigger: Customer requests a password reset
 * Wire-up: Supabase Auth can send this automatically via its own email provider,
 *          OR you can override it by configuring a custom SMTP and calling this route
 *          from a server action when supabase.auth.resetPasswordForEmail() is called.
 *
 * NOTE: If using Supabase Auth's built-in email, you can configure the template in
 *       Supabase Dashboard > Auth > Email Templates > Reset Password
 *       and skip wiring this route entirely.
 */
import { NextRequest } from 'next/server';
import { sendEmail } from '../../../../src/lib/email/send';
import { emailWrap, emailHeader, emailFooter, emailBanner } from '../../../../src/lib/email/base';

export async function POST(req: NextRequest) {
  const { email, name, resetUrl, expiresIn = '1 hour' } =
    await req.json() as {
      email: string;
      name?: string;
      resetUrl: string;
      expiresIn?: string;
    };

  const firstName = (name || 'there').split(' ')[0];

  const html = emailWrap(`
    ${emailHeader()}
    ${emailBanner('#faf5ff', '#c4b5fd', '#7c3aed', '🔑', 'Password Reset Request', 'A reset link has been generated for your account.')}

    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        We received a request to reset the password for your Raj Tandoor account. Click the button below to set a new password.
        This link expires in <strong>${expiresIn}</strong>.
      </p>

      <div style="text-align:center;margin:32px 0">
        <a href="${resetUrl}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px">
          Reset My Password &rarr;
        </a>
      </div>

      <p style="font-size:13px;color:#999;line-height:1.6;margin:0 0 24px">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        <span style="color:#7c3aed;word-break:break-all">${resetUrl}</span>
      </p>

      <div style="margin-top:24px;padding:14px 18px;background:#fef2f2;border-radius:8px;border:1px solid #fca5a5">
        <p style="font-size:12px;color:#b91c1c;margin:0">
          If you didn't request a password reset, please ignore this email. Your password will not be changed.
          If you're concerned about your account security, please contact us immediately.
        </p>
      </div>
    </div>

    ${emailFooter('You received this because a password reset was requested for this email at rajtandoor.in')}
  `);

  const result = await sendEmail({
    to: email,
    subject: 'Reset your password - Raj Tandoor',
    html,
    from: 'Raj Tandoor <noreply@rajtandoor.in>',
  });

  return Response.json(result);
}
