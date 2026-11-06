import { Router, Response } from 'express';
import { dbGet, dbAll, dbRun } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

async function getUserWishlist(userId: number) {
  return dbAll(`
    SELECT p.id as product_id, p.slug, p.name, p.tagline, p.price_minor, p.currency, p.image_url, p.image_alt, p.is_available, wi.added_at
    FROM wishlist_items wi
    JOIN products p ON p.id = wi.product_id
    WHERE wi.user_id = ?
    ORDER BY wi.added_at DESC
  `, [userId]);
}

// GET /api/wishlist
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: await getUserWishlist(req.user!.id) });
});

// POST /api/wishlist/:productId
router.post('/:productId', requireAuth, async (req: AuthRequest, res: Response) => {
  const productId = parseInt(req.params.productId, 10);
  const product = await dbGet('SELECT id FROM products WHERE id = ?', [productId]);
  if (!product) { res.status(404).json({ success: false, error: 'Product not found.' }); return; }

  const existing = await dbGet('SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?', [req.user!.id, productId]);
  if (existing) { res.json({ success: true, action: 'already_added', data: await getUserWishlist(req.user!.id) }); return; }

  await dbRun('INSERT INTO wishlist_items (user_id, product_id) VALUES (?, ?)', [req.user!.id, productId]);
  res.status(201).json({ success: true, action: 'added', data: await getUserWishlist(req.user!.id) });
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', requireAuth, async (req: AuthRequest, res: Response) => {
  const productId = parseInt(req.params.productId, 10);
  await dbRun('DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?', [req.user!.id, productId]);
  res.json({ success: true, action: 'removed', data: await getUserWishlist(req.user!.id) });
});

// POST /api/wishlist/sync/merge
router.post('/sync/merge', requireAuth, async (req: AuthRequest, res: Response) => {
  const slugs: string[] = Array.isArray(req.body?.slugs) ? req.body.slugs : [];
  for (const slug of slugs) {
    const product = await dbGet<{ id: number }>('SELECT id FROM products WHERE slug = ?', [slug]);
    if (product) {
      await dbRun('INSERT OR IGNORE INTO wishlist_items (user_id, product_id) VALUES (?, ?)', [req.user!.id, product.id]);
    }
  }
  res.json({ success: true, data: await getUserWishlist(req.user!.id) });
});

export default router;
