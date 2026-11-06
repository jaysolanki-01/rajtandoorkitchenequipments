import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { dbRun } from '../db';

const router = Router();

const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  phone: z.string().trim().optional(),
  businessName: z.string().trim().optional(),
  productInterest: z.string().trim().optional(),
  quantity: z.string().trim().optional(),
  requirements: z.string().trim().min(1, 'Please describe your requirements').max(2000),
  deliveryLocation: z.string().trim().optional(),
});

// POST /api/quotes
router.post('/', async (req: Request, res: Response) => {
  const parsed = quoteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.issues[0]?.message || 'Invalid input.' });
    return;
  }

  const { name, email, phone, businessName, productInterest, quantity, requirements, deliveryLocation } = parsed.data;
  const reference = `RQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  await dbRun(
    `INSERT INTO quote_enquiries (reference, name, email, phone, business_name, product_interest, quantity, requirements, delivery_location)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [reference, name, email, phone ?? null, businessName ?? null, productInterest ?? null, quantity ?? null, requirements, deliveryLocation ?? null]
  );

  res.status(201).json({
    success: true,
    data: { reference },
    message: 'Your quote request has been received. The Raj Tandoor team will respond shortly.',
  });
});

export default router;
