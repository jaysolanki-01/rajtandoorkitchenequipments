import { Router, Response } from 'express';
import { z } from 'zod';
import { dbGet, dbAll, dbRun } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

type CartRow = { id: number; quantity: number; product_id: number; slug: string; name: string; price_minor: number | null; currency: string; image_url: string | null; image_alt: string | null; is_available: number };

async function getUserCart(userId: number): Promise<CartRow[]> {
  return dbAll<CartRow>(`
    SELECT ci.id, ci.quantity, p.id as product_id, p.slug, p.name, p.price_minor, p.currency, p.image_url, p.image_alt, p.is_available
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.user_id = ?
    ORDER BY ci.added_at DESC
  `, [userId]);
}

// GET /api/cart
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const items = await getUserCart(req.user!.id);
  res.json({ success: true, data: items });
});

// POST /api/cart/items
router.post('/items', requireAuth, async (req: AuthRequest, res: Response) => {
  const schema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).max(999).default(1),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: 'Invalid input.' }); return; }

  const { productId, quantity } = parsed.data;
  const product = await dbGet<{ id: number; is_available: number }>('SELECT id, is_available FROM products WHERE id = ? AND is_demo = 0', [productId]);
  if (!product) { res.status(404).json({ success: false, error: 'Product not found.' }); return; }
  if (!product.is_available) { res.status(409).json({ success: false, error: 'This product is currently unavailable.' }); return; }

  await dbRun(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + excluded.quantity`,
    [req.user!.id, productId, quantity]
  );

  res.json({ success: true, data: await getUserCart(req.user!.id) });
});

// PATCH /api/cart/items/:id
router.patch('/items/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const itemId = parseInt(req.params.id, 10);
  const { quantity } = req.body;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
    res.status(422).json({ success: false, error: 'Quantity must be between 1 and 999.' }); return;
  }

  const item = await dbGet('SELECT id FROM cart_items WHERE id = ? AND user_id = ?', [itemId, req.user!.id]);
  if (!item) { res.status(404).json({ success: false, error: 'Cart item not found.' }); return; }

  await dbRun('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId]);
  res.json({ success: true, data: await getUserCart(req.user!.id) });
});

// DELETE /api/cart/items/:id
router.delete('/items/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const itemId = parseInt(req.params.id, 10);
  await dbRun('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [itemId, req.user!.id]);
  res.json({ success: true, data: await getUserCart(req.user!.id) });
});

// DELETE /api/cart
router.delete('/', requireAuth, async (req: AuthRequest, res: Response) => {
  await dbRun('DELETE FROM cart_items WHERE user_id = ?', [req.user!.id]);
  res.json({ success: true, data: [] });
});

// POST /api/cart/sync
router.post('/sync', requireAuth, async (req: AuthRequest, res: Response) => {
  const schema = z.array(z.object({ productId: z.number().int().positive(), quantity: z.number().int().min(1) }));
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: 'Invalid payload.' }); return; }

  for (const item of parsed.data) {
    const product = await dbGet('SELECT id FROM products WHERE id = ? AND is_demo = 0 AND is_available = 1', [item.productId]);
    if (product) {
      await dbRun(
        `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)
         ON CONFLICT(user_id, product_id) DO NOTHING`,
        [req.user!.id, item.productId, item.quantity]
      );
    }
  }

  res.json({ success: true, data: await getUserCart(req.user!.id) });
});

export default router;
