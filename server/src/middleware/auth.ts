import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { dbGet } from '../db';

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
export const COOKIE_NAME = 'rt_token';

export interface AuthRequest extends Request {
  user?: { id: number; name: string; email: string; role: string };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ success: false, error: 'Authentication required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await dbGet<{ id: number; name: string; email: string; role: string }>(
      `SELECT id, name, email, COALESCE(role, 'user') as role FROM users WHERE id = ?`, [payload.userId]
    );
    if (!user) {
      res.clearCookie(COOKIE_NAME);
      res.status(401).json({ success: false, error: 'Session expired.' });
      return;
    }
    req.user = user;
    next();
  } catch {
    res.clearCookie(COOKIE_NAME);
    res.status(401).json({ success: false, error: 'Invalid session.' });
  }
}

export async function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await dbGet<{ id: number; name: string; email: string; role: string }>(
        `SELECT id, name, email, COALESCE(role, 'user') as role FROM users WHERE id = ?`, [payload.userId]
      );
      if (user) req.user = user;
    } catch { /* ignore */ }
  }
  next();
}
