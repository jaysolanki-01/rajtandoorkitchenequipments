import { Router, Response } from 'express';
import { z } from 'zod';
import { dbGet, dbAll, dbRun } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/orders
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const orders = await dbAll(
    `SELECT id, order_number, status, subtotal_minor, total_minor, currency,
            payment_status, payment_method, placed_at, updated_at
     FROM orders WHERE user_id = ? ORDER BY placed_at DESC`,
    [req.user!.id]
  );
  res.json({ success: true, data: orders });
});

// GET /api/orders/:orderNumber
router.get('/:orderNumber', requireAuth, async (req: AuthRequest, res: Response) => {
  const order = await dbGet<Record<string, unknown>>(
    'SELECT * FROM orders WHERE order_number = ? AND user_id = ?',
    [req.params.orderNumber, req.user!.id]
  );
  if (!order) { res.status(404).json({ success: false, error: 'Order not found.' }); return; }

  const items = await dbAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
  res.json({ success: true, data: { ...order, items } });
});

// POST /api/orders
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const schema = z.object({
    notes: z.string().trim().max(1000).optional(),
    shippingAddressId: z.number().int().positive().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: 'Invalid input.' }); return; }

  const userId = req.user!.id;
  const cartItems = await dbAll<{ quantity: number; product_id: number; name: string; slug: string; price_minor: number | null; is_available: number }>(
    `SELECT ci.quantity, p.id as product_id, p.name, p.slug, p.price_minor, p.is_available
     FROM cart_items ci JOIN products p ON p.id = ci.product_id
     WHERE ci.user_id = ?`,
    [userId]
  );

  if (!cartItems.length) { res.status(400).json({ success: false, error: 'Your cart is empty.' }); return; }

  const unavailable = cartItems.filter(i => !i.is_available);
  if (unavailable.length) {
    res.status(409).json({ success: false, error: `The following products are currently unavailable: ${unavailable.map(i => i.name).join(', ')}.` });
    return;
  }

  let shippingAddressJson: string | null = null;
  if (parsed.data.shippingAddressId) {
    const addr = await dbGet('SELECT * FROM addresses WHERE id = ? AND user_id = ?', [parsed.data.shippingAddressId, userId]);
    if (addr) shippingAddressJson = JSON.stringify(addr);
  }

  const orderNumber = `RT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const orderResult = await dbRun(
    `INSERT INTO orders (order_number, user_id, status, subtotal_minor, total_minor, shipping_address_json, notes, payment_method, payment_status)
     VALUES (?, ?, 'placed', 0, 0, ?, ?, 'enquiry', 'pending')`,
    [orderNumber, userId, shippingAddressJson, parsed.data.notes ?? null]
  );

  const orderId = orderResult.lastInsertRowid;
  for (const item of cartItems) {
    await dbRun(
      `INSERT INTO order_items (order_id, product_id, product_name, product_slug, quantity, unit_price_minor, line_total_minor)
       VALUES (?, ?, ?, ?, ?, 0, 0)`,
      [orderId, item.product_id, item.name, item.slug, item.quantity]
    );
  }

  await dbRun('DELETE FROM cart_items WHERE user_id = ?', [userId]);
  res.status(201).json({ success: true, data: { orderNumber } });
});

export default router;
