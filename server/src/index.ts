import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { initDb } from './db';

import authRouter from './routes/auth';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';
import quotesRouter from './routes/quotes';
import contactRouter from './routes/contact';
import cartRouter from './routes/cart';
import wishlistRouter from './routes/wishlist';
import ordersRouter from './routes/orders';
import accountRouter from './routes/account';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// --- Middleware ---
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Rate limiting for auth and submission endpoints
const authLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false, message: { success: false, error: 'Too many requests. Please try again later.' } });
const formLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false, message: { success: false, error: 'Too many submissions. Please try again later.' } });

// --- Routes ---
app.use('/api/auth', authLimit, authRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/quotes', formLimit, quotesRouter);
app.use('/api/contact', formLimit, contactRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/account', accountRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Raj Tandoor API is running.' });
});

// 404 for unknown API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// --- Start ---
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n  Raj Tandoor API  →  http://localhost:${PORT}/api/health\n`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialise database:', err);
    process.exit(1);
  });

export default app;
