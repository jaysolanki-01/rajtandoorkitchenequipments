import { Router, Request, Response } from 'express';
import { dbGet, dbAll } from '../db';

const router = Router();

// GET /api/categories
router.get('/', async (_req: Request, res: Response) => {
  const rows = await dbAll('SELECT * FROM categories ORDER BY sort_order');
  res.json({ success: true, data: rows });
});

// GET /api/categories/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const category = await dbGet<Record<string, unknown>>('SELECT * FROM categories WHERE slug = ?', [slug]);
  if (!category) {
    res.status(404).json({ success: false, error: 'Category not found.' });
    return;
  }
  const products = await dbAll(
    `SELECT id, slug, name, tagline, description, price_minor, currency, is_available, is_demo, image_url, image_alt
     FROM products WHERE category_slug = ? ORDER BY is_demo ASC, created_at DESC`,
    [slug]
  );

  res.json({ success: true, data: { ...category, products } });
});

export default router;
