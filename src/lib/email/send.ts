/** Core Resend sender. All email routes call this. */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from = 'Raj Tandoor <noreply@rajtandoor.in>' }: EmailPayload): Promise<{ success: boolean; skipped?: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No key configured — silently skip; never block user flows
    return { success: true, skipped: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[email] Resend error (${res.status}):`, text);
      return { success: false, error: text };
    }

    return { success: true };
  } catch (err) {
    console.error('[email] Send failed:', err);
    return { success: false, error: String(err) };
  }
}
