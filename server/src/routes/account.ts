import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { dbGet, dbAll, dbRun } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/account/profile
router.get('/profile', requireAuth, async (req: AuthRequest, res: Response) => {
  const user = await dbGet<Record<string, unknown>>('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [req.user!.id]);
  if (!user) { res.status(404).json({ success: false, error: 'User not found.' }); return; }
  res.json({ success: true, data: user });
});

// PATCH /api/account/profile
router.patch('/profile', requireAuth, async (req: AuthRequest, res: Response) => {
  const schema = z.object({
    name: z.string().trim().min(2).max(100).optional(),
    phone: z.string().trim().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).max(128).optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.issues[0]?.message || 'Invalid input.' }); return; }

  const { name, phone, currentPassword, newPassword } = parsed.data;
  const updates: string[] = [];
  const params: unknown[] = [];

  if (name) { updates.push('name = ?'); params.push(name); }
  if (phone !== undefined) { updates.push('phone = ?'); params.push(phone || null); }

  if (newPassword) {
    if (!currentPassword) { res.status(422).json({ success: false, error: 'Current password is required to set a new password.' }); return; }
    const user = await dbGet<{ password_hash: string }>('SELECT password_hash FROM users WHERE id = ?', [req.user!.id]);
    if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
      res.status(401).json({ success: false, error: 'Current password is incorrect.' }); return;
    }
    updates.push('password_hash = ?');
    params.push(await bcrypt.hash(newPassword, 12));
  }

  if (!updates.length) { res.status(422).json({ success: false, error: 'No changes provided.' }); return; }
  params.push(req.user!.id);
  await dbRun(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);

  const updated = await dbGet('SELECT id, name, email, phone FROM users WHERE id = ?', [req.user!.id]);
  res.json({ success: true, data: updated });
});

// GET /api/account/addresses
router.get('/addresses', requireAuth, async (req: AuthRequest, res: Response) => {
  const rows = await dbAll('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id ASC', [req.user!.id]);
  res.json({ success: true, data: rows });
});

const addressSchema = z.object({
  label: z.string().trim().max(50).default('Home'),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().optional(),
  line1: z.string().trim().min(3).max(200),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  pincode: z.string().trim().regex(/^\d{6}$/, 'PIN code must be 6 digits'),
  country: z.string().trim().max(100).default('India'),
  isDefault: z.boolean().default(false),
});

// POST /api/account/addresses
router.post('/addresses', requireAuth, async (req: AuthRequest, res: Response) => {
  const parsed = addressSchema.safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.issues[0]?.message || 'Invalid input.' }); return; }
  const d = parsed.data;
  if (d.isDefault) await dbRun('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [req.user!.id]);

  const row = await dbRun(
    `INSERT INTO addresses (user_id, label, name, phone, line1, line2, city, state, pincode, country, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user!.id, d.label, d.name, d.phone ?? null, d.line1, d.line2 ?? null, d.city, d.state, d.pincode, d.country, d.isDefault ? 1 : 0]
  );

  const address = await dbGet('SELECT * FROM addresses WHERE id = ?', [row.lastInsertRowid]);
  res.status(201).json({ success: true, data: address });
});

// PATCH /api/account/addresses/:id
router.patch('/addresses/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const existing = await dbGet('SELECT id FROM addresses WHERE id = ? AND user_id = ?', [id, req.user!.id]);
  if (!existing) { res.status(404).json({ success: false, error: 'Address not found.' }); return; }

  const parsed = addressSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(422).json({ success: false, error: parsed.error.issues[0]?.message || 'Invalid input.' }); return; }
  const d = parsed.data;

  const updates: string[] = [];
  const params: unknown[] = [];
  const fieldMap: Record<string, string> = { label: 'label', name: 'name', phone: 'phone', line1: 'line1', line2: 'line2', city: 'city', state: 'state', pincode: 'pincode', country: 'country' };

  for (const [key, col] of Object.entries(fieldMap)) {
    if (key in d) { updates.push(`${col} = ?`); params.push((d as Record<string, unknown>)[key] ?? null); }
  }
  if (d.isDefault !== undefined) {
    if (d.isDefault) await dbRun('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [req.user!.id]);
    updates.push('is_default = ?');
    params.push(d.isDefault ? 1 : 0);
  }

  if (!updates.length) { res.status(422).json({ success: false, error: 'No changes provided.' }); return; }
  params.push(id);
  await dbRun(`UPDATE addresses SET ${updates.join(', ')} WHERE id = ?`, params);

  res.json({ success: true, data: await dbGet('SELECT * FROM addresses WHERE id = ?', [id]) });
});

// DELETE /api/account/addresses/:id
router.delete('/addresses/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const result = await dbRun('DELETE FROM addresses WHERE id = ? AND user_id = ?', [id, req.user!.id]);
  if (!result.rowsAffected) { res.status(404).json({ success: false, error: 'Address not found.' }); return; }
  res.json({ success: true });
});

export default router;
