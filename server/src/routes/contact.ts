import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { dbRun } from '../db';

const router = Router();

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  phone: z.string().trim().optional(),
  businessName: z.string().trim().optional(),
  enquiryType: z.string().trim().optional(),
  productInterest: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please enter a message of at least 10 characters').max(2000),
});

// POST /api/contact
router.post('/', async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.issues[0]?.message || 'Invalid input.' });
    return;
  }

  const { name, email, phone, businessName, enquiryType, productInterest, message } = parsed.data;

  await dbRun(
    `INSERT INTO contact_enquiries (name, email, phone, business_name, enquiry_type, product_interest, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone ?? null, businessName ?? null, enquiryType ?? null, productInterest ?? null, message]
  );

  res.status(201).json({
    success: true,
    message: 'Your enquiry has been received. The Raj Tandoor team will be in touch shortly.',
  });
});

export default router;
