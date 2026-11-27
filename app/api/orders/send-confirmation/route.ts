import { NextRequest } from 'next/server';

const PAY_LABEL: Record<string, string> = {
  upi: 'UPI',
  card: 'Credit / Debit Card',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

export async function POST(req: NextRequest) {
  const { orderNumber, customerName, email, items, total, payMethod, address } =
    await req.json() as {
      orderNumber: string;
      customerName: string;
      email: string;
      items: { name: string; qty: number; price: number | null }[];
      total: number | null;
      payMethod: string;
      address: string;
    };

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    // Email not configured — silently skip so the order isn't blocked
    return Response.json({ success: true, skipped: true });
  }

  const firstName = customerName.split(' ')[0];

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;color:#020103">${item.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;text-align:center;color:#666">${item.qty}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe4;font-size:14px;text-align:right;font-weight:600;color:#020103">
        ${item.price != null ? '₹' + (item.price * item.qty).toLocaleString('en-IN') : 'On request'}
      </td>
    </tr>`).join('');

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

    <!-- Success banner -->
    <div style="background:#f0faf4;border-bottom:2px solid #86efac;padding:20px 32px;display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;background:#22c55e;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <span style="color:#fff;font-size:18px;font-weight:700">✓</span>
      </div>
      <div>
        <p style="font-weight:700;font-size:16px;color:#020103;margin:0">Order Placed Successfully!</p>
        <p style="font-size:13px;color:#555;margin:3px 0 0">We've received your order and will be in touch shortly.</p>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:32px">
      <p style="font-size:16px;color:#020103;margin:0 0 20px">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
        Thank you for ordering from Raj Tandoor & Kitchen Equipment. Your order has been confirmed and our team will contact you to arrange payment and delivery.
      </p>

      <!-- Order ID -->
      <div style="background:#f5ede0;border:1.5px solid #c3a268;border-radius:8px;padding:14px 18px;margin-bottom:28px;display:inline-block">
        <p style="font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Order ID</p>
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
          Total: ₹${total.toLocaleString('en-IN')} <span style="font-size:12px;font-weight:400;color:#888">(Incl. GST)</span>
        </p>
        <p style="font-size:12px;color:#22c55e;margin:4px 0 0;font-weight:600">FREE Shipping</p>
      </div>` : ''}

      <!-- Order info -->
      <div style="background:#f9f9f7;border:1px solid #e9e3da;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <div style="display:grid;gap:10px">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:#888">Payment</span>
            <span style="color:#020103;font-weight:600">${PAY_LABEL[payMethod] ?? payMethod}</span>
          </div>
          <div style="border-top:1px solid #ede9e3;padding-top:10px;font-size:13px">
            <span style="color:#888;display:block;margin-bottom:4px">Delivery address</span>
            <span style="color:#020103">${address}</span>
          </div>
        </div>
      </div>

      <!-- What's next -->
      <p style="font-size:13px;font-weight:700;color:#020103;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.06em">What happens next</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px">
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div style="width:28px;height:28px;background:#c3a268;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">1</div>
          <div>
            <p style="font-size:13px;font-weight:600;color:#020103;margin:0 0 2px">Our team contacts you</p>
            <p style="font-size:12px;color:#666;margin:0">We'll confirm your order and arrange payment.</p>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div style="width:28px;height:28px;background:#c3a268;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">2</div>
          <div>
            <p style="font-size:13px;font-weight:600;color:#020103;margin:0 0 2px">Dispatch & tracking</p>
            <p style="font-size:12px;color:#666;margin:0">We'll ship and share live tracking details.</p>
          </div>
        </div>
        ${payMethod === 'cod' ? `
        <div style="display:flex;gap:12px;align-items:flex-start;background:#fffbf0;border-radius:8px;padding:10px 12px">
          <div style="width:28px;height:28px;background:#f59e0b;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">₹</div>
          <div>
            <p style="font-size:13px;font-weight:600;color:#020103;margin:0 0 2px">Cash on Delivery</p>
            <p style="font-size:12px;color:#666;margin:0">Keep the exact amount ready at delivery.</p>
          </div>
        </div>` : ''}
      </div>

      <a href="https://rajtandoor.in/track-order" style="display:inline-block;background:#c3a268;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
        Track Your Order →
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
        You received this because you placed an order on rajtandoor.in
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
        subject: `Order Confirmed: ${orderNumber} - Raj Tandoor`,
        html,
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', await res.text());
    }
  } catch (err) {
    console.error('Email send failed:', err);
  }

  // Always return success — email is best-effort and shouldn't block order placement
  return Response.json({ success: true });
}
