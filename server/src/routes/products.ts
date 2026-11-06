import { Router, Request, Response } from 'express';
import { dbGet, dbAll } from '../db';

const router = Router();

// GET /api/products
router.get('/', async (req: Request, res: Response) => {
  const { category, search, sort = 'newest', page = '1', limit = '20', includeDemo } = req.query;

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (!includeDemo) {
    conditions.push('p.is_demo = 0');
  }
  if (category) {
    conditions.push('p.category_slug = ?');
    params.push(category);
  }
  if (search && typeof search === 'string' && search.trim()) {
    conditions.push('(p.name LIKE ? OR p.description LIKE ? OR p.tagline LIKE ?)');
    const q = `%${search.trim()}%`;
    params.push(q, q, q);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const sortMap: Record<string, string> = {
    newest: 'p.created_at DESC',
    oldest: 'p.created_at ASC',
    name_asc: 'p.name ASC',
    name_desc: 'p.name DESC',
    price_asc: 'p.price_minor ASC',
    price_desc: 'p.price_minor DESC',
  };
  const orderBy = sortMap[String(sort)] || 'p.created_at DESC';

  const pageNum = Math.max(1, parseInt(String(page), 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10)));
  const offset = (pageNum - 1) * limitNum;

  const totalRow = await dbGet<{ c: number }>(`SELECT COUNT(*) as c FROM products p ${where}`, params);
  const total = totalRow?.c ?? 0;
  const rows = await dbAll(
    `SELECT p.id, p.slug, p.name, p.tagline, p.description, p.category_slug,
            p.price_minor, p.currency, p.is_available, p.is_demo, p.image_url, p.image_alt
     FROM products p ${where}
     ORDER BY ${orderBy}
     LIMIT ? OFFSET ?`,
    [...params, limitNum, offset]
  );

  res.json({
    success: true,
    data: rows,
    meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) },
  });
});

// GET /api/products/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await dbGet<Record<string, unknown>>(`
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN categories c ON c.slug = p.category_slug
    WHERE p.slug = ?
  `, [slug]);

  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }

  const specs = await dbAll('SELECT label, value FROM product_specs WHERE product_id = ? ORDER BY sort_order', [product.id]);
  const images = await dbAll('SELECT url, alt FROM product_images WHERE product_id = ? ORDER BY sort_order', [product.id]);

  res.json({ success: true, data: { ...product, specs, images } });
});

export default router;
