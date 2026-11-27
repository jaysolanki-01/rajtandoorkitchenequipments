/** Shared HTML building blocks for all Raj Tandoor transactional emails */

export function emailHeader() {
  return `
  <div style="background:#020103;padding:28px 32px;display:flex;align-items:center;gap:12px">
    <div style="width:40px;height:40px;background:#c3a268;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:#fff">RT</div>
    <div>
      <p style="color:#c3a268;font-weight:700;font-size:17px;margin:0;letter-spacing:0.02em">RAJ TANDOOR</p>
      <p style="color:rgba(255,255,255,0.55);font-size:11px;margin:2px 0 0;letter-spacing:0.04em">&amp; KITCHEN EQUIPMENT</p>
    </div>
  </div>`;
}

export function emailFooter(unsubscribeNote = 'You received this email because you have an account on rajtandoor.in') {
  return `
  <div style="background:#f9f9f7;border-top:1px solid #e9e3da;padding:20px 32px;text-align:center">
    <p style="font-size:12px;color:#888;margin:0 0 6px">
      <strong style="color:#020103">Raj Tandoor &amp; Kitchen Equipment</strong>
    </p>
    <p style="font-size:11px;color:#aaa;margin:0">
      Ahmedabad, Gujarat &nbsp;&bull;&nbsp;
      <a href="mailto:rajtandoorequipment@gmail.com" style="color:#c3a268;text-decoration:none">rajtandoorequipment@gmail.com</a> &nbsp;&bull;&nbsp;
      +91 9687861313
    </p>
    <p style="font-size:11px;color:#ccc;margin:8px 0 0">${unsubscribeNote}</p>
  </div>`;
}

export function emailBanner(
  color: string,
  borderColor: string,
  iconBg: string,
  icon: string,
  title: string,
  subtitle: string,
) {
  return `
  <div style="background:${color};border-bottom:2px solid ${borderColor};padding:20px 32px;display:flex;align-items:center;gap:12px">
    <div style="width:36px;height:36px;background:${iconBg};border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">
      <span style="color:#fff;font-size:18px;font-weight:700">${icon}</span>
    </div>
    <div>
      <p style="font-weight:700;font-size:16px;color:#020103;margin:0">${title}</p>
      <p style="font-size:13px;color:#555;margin:3px 0 0">${subtitle}</p>
    </div>
  </div>`;
}

export function emailOrderIdBlock(orderNumber: string) {
  return `
  <div style="background:#f5ede0;border:1.5px solid #c3a268;border-radius:8px;padding:14px 18px;margin-bottom:28px;display:inline-block">
    <p style="font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4px">Order ID</p>
    <p style="font-family:monospace;font-weight:700;font-size:17px;color:#020103;margin:0;letter-spacing:0.04em">${orderNumber}</p>
  </div>`;
}

export function emailButton(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#c3a268;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">${label} &rarr;</a>`;
}

export function emailWrap(bodyContent: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
    ${bodyContent}
  </div>
</body>
</html>`;
}
