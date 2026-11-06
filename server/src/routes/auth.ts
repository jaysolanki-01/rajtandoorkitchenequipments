import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { dbGet, dbRun } from '../db';
import { JWT_SECRET, COOKIE_NAME, requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 24 * 60 * 60 * 1000,
};

function issueToken(res: Response, userId: number) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
  res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
}

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
  phone: z.string().trim().optional(),
});

const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.issues[0]?.message || 'Invalid input.' });
    return;
  }
  const { name, email, password, phone } = parsed.data;

  const existing = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
  if (existing) {
    res.status(409).json({ success: false, error: 'An account with this email address already exists.' });
    return;
  }

  const password_hash = await bcrypt.hash(password, 12);
  const row = await dbRun(`INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, 'user')`,
    [name, email, password_hash, phone ?? null]);
  const userId = row.lastInsertRowid;

  issueToken(res, userId);
  res.status(201).json({ success: true, data: { id: userId, name, email, role: 'user' } });
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: 'Please enter a valid email and password.' });
    return;
  }
  const { email, password } = parsed.data;

  const user = await dbGet<{ id: number; name: string; email: string; password_hash: string; phone: string | null; role: string; is_active: number }>(
    `SELECT id, name, email, password_hash, phone, COALESCE(role, 'user') as role, COALESCE(is_active, 1) as is_active FROM users WHERE email = ?`, [email]
  );
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    res.status(401).json({ success: false, error: 'Invalid email address or password.' });
    return;
  }
  if (!user.is_active) {
    res.status(403).json({ success: false, error: 'Your account has been deactivated. Please contact support.' });
    return;
  }

  issueToken(res, user.id);
  res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ success: true });
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const full = await dbGet<{ id: number; name: string; email: string; phone: string | null; role: string; created_at: string }>(
    `SELECT id, name, email, phone, COALESCE(role, 'user') as role, created_at FROM users WHERE id = ?`, [user.id]
  );
  if (!full) { res.status(401).json({ success: false, error: 'User not found.' }); return; }
  res.json({ success: true, data: full });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    res.status(422).json({ success: false, error: 'Please enter your email address.' });
    return;
  }

  const user = await dbGet<{ id: number }>('SELECT id FROM users WHERE email = ?', [email.trim().toLowerCase()]);
  if (user) {
    const crypto = await import('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await dbRun('DELETE FROM password_reset_tokens WHERE user_id = ?', [user.id]);
    await dbRun('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, expiresAt]);
    // TODO: send email via configured SMTP when credentials are available
  }

  res.json({ success: true, message: 'If that email address is registered, a password reset link has been sent.' });
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body;
  if (!token || !password || password.length < 8) {
    res.status(422).json({ success: false, error: 'Invalid request.' });
    return;
  }

  const record = await dbGet<{ id: number; uid: number }>(`
    SELECT prt.id, u.id as uid FROM password_reset_tokens prt
    JOIN users u ON u.id = prt.user_id
    WHERE prt.token = ? AND prt.used = 0 AND prt.expires_at > datetime('now')
  `, [token]);

  if (!record) {
    res.status(400).json({ success: false, error: 'This reset link is invalid or has expired.' });
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  await dbRun('UPDATE users SET password_hash = ? WHERE id = ?', [hash, record.uid]);
  await dbRun('UPDATE password_reset_tokens SET used = 1 WHERE id = ?', [record.id]);
  res.clearCookie(COOKIE_NAME);
  res.json({ success: true, message: 'Password updated successfully. Please sign in with your new password.' });
});

export default router;
