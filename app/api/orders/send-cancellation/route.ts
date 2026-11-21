import { NextRequest } from 'next/server';

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI',
  card: 'Credit / Debit Card',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

type OrderItem = { name?: string; qty?: number; quantity?: number; price?: number | null };

export async function POST(req: NextRequest) {
  const { orderNumber, customerName, email, items, total, payMethod } =
    await req.json() as {
      orderNumber: string;
      customerName: string;
      email: string;
      items: OrderItem[];
      total: number | null;
      payMethod: string;
    };

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return Response.json({ success: true, skipped: true });
  }

  const firstName = (customerName || 'Customer').split(' ')[0];

  const itemsHtml = (items ?? []).map(item => {
    const qty = item.qty ?? item.quantity ?? 1;
    return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;color:#020103">${item.name ?? 'Product'}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;text-align:center;color:#666">${qty}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;text-align:right;color:#020103">
        ${item.price != null ? '₹' + (item.price * qty).toLocaleString('en-IN') : 'On request'}
      </td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">

    <!-- Header -->
    <div style="background:#020103;padding:28px 32px;display:flex;align-items:center;gap:12px">
      <div style="width:40px;height:40px;background:#c3a268;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:#fff">RT</div>
      <div>
        <p style="color:#c3a268;font-weight:700;font-size:17px;margin:0;letter-spacing:0.02em">RAJ TANDOOR</p>
        <p style="color:rgba(255,255,255,0.55);font-size:11px;margin:2px 0 0;letter-spacing:0.04em">& KITCHEN EQUIPMENT</p>
      </div>
    </div>

    <!-- Cancellation banner -->
    <div style="background:#fef2f2;border-bottom:2px solid #fca5a5;padding:20px 32px;display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <span style="color:#fff;font-size:18px;font-weight:700">✕</span>
      </div>
      <div>
        <p style="font-weight:700;font-size:16px;color:#020103;margin:0">Order Cancelled</p>
        <p style="font-size:13px;color:#555;margin:3px 0 0">Your order has been successfully cancelled.</p>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 16px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        We've received your cancellation request and your order has been cancelled. If you paid online, any amount charged will be refunded within 5–7 business days.
      </p>

      <!-- Order ID -->
      <div style="background:#fef2f2;border:1.5px solid #fca5a5;border-radius:8px;padding:14px 18px;margin-bottom:28px;display:inline-block">
        <p style="font-size:11px;color:#b91c1c;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Cancelled Order</p>
        <p style="font-family:monospace;font-weight:700;font-size:17px;color:#020103;margin:0;letter-spacing:0.04em">${orderNumber}</p>
      </div>

      <!-- Items table -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <thead>
          <tr style="border-bottom:2px solid #e9e3da">
            <th style="text-align:left;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Product</th>
            <th style="text-align:center;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Qty</th>
            <th style="text-align:right;padding:0 0 8px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">Amount</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      ${total != null ? `
      <div style="text-align:right;border-top:2px solid #e9e3da;padding-top:12px;margin-bottom:28px">
        <p style="font-size:16px;font-weight:700;color:#020103;margin:0">
          Order Total: ₹${total.toLocaleString('en-IN')}
        </p>
        <p style="font-size:12px;color:#888;margin:4px 0 0">Payment method: ${PAY_LABEL[payMethod] ?? payMethod}</p>
      </div>` : ''}

      <!-- What's next -->
      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <p style="font-size:13px;font-weight:700;color:#020103;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.06em">What happens next</p>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${payMethod !== 'cod' ? `
          <div style="display:flex;gap:10px;align-items:flex-start">
            <div style="width:24px;height:24px;background:#c3a268;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700">1</div>
            <div>
              <p style="font-size:13px;font-weight:600;color:#020103;margin:0 0 2px">Refund initiated</p>
              <p style="font-size:12px;color:#666;margin:0">Your refund will be processed within 5–7 business days.</p>
            </div>
          </div>` : ''}
          <div style="display:flex;gap:10px;align-items:flex-start">
            <div style="width:24px;height:24px;background:#c3a268;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700">${payMethod !== 'cod' ? '2' : '1'}</div>
            <div>
              <p style="font-size:13px;font-weight:600;color:#020103;margin:0 0 2px">Order confirmation removed</p>
              <p style="font-size:12px;color:#666;margin:0">This order will be marked as cancelled in your account.</p>
            </div>
          </div>
        </div>
      </div>

      <a href="https://rajtandoor.in/shop" style="display:inline-block;background:#c3a268;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
        Browse Products →
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#f9f9f7;border-top:1px solid #e9e3da;padding:20px 32px;text-align:center">
      <p style="font-size:12px;color:#888;margin:0 0 6px">
        <strong style="color:#020103">Raj Tandoor & Kitchen Equipment</strong>
      </p>
      <p style="font-size:11px;color:#aaa;margin:0">
        Ahmedabad, Gujarat •
        <a href="mailto:rajtandoorequipment@gmail.com" style="color:#c3a268;text-decoration:none">rajtandoorequipment@gmail.com</a> •
        +91 9687861313
      </p>
      <p style="font-size:11px;color:#ccc;margin:8px 0 0">
        If you did not request this cancellation, please contact us immediately.
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Raj Tandoor <orders@rajtandoor.in>',
        to: email,
        subject: `Order Cancelled: ${orderNumber} — Raj Tandoor`,
        html,
      }),
    });

    if (!res.ok) {
      console.error('Resend cancellation email error:', await res.text());
    }
  } catch (err) {
    console.error('Cancellation email send failed:', err);
  }

  return Response.json({ success: true });
}
