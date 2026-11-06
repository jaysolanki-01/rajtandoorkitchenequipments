import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';

const DATA_DIR = process.env.DB_DIR || path.join(__dirname, '../../data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'rajtandoor.db').replace(/\\/g, '/');

export const client = createClient({ url: `file:${DB_PATH}` });

// ── Helpers ──────────────────────────────────────────────────────────────────

export async function dbGet<T>(sql: string, args: unknown[] = []): Promise<T | undefined> {
  const result = await client.execute({ sql, args: args as import('@libsql/client').InValue[] });
  return result.rows[0] as unknown as T | undefined;
}

export async function dbAll<T>(sql: string, args: unknown[] = []): Promise<T[]> {
  const result = await client.execute({ sql, args: args as import('@libsql/client').InValue[] });
  return result.rows as unknown as T[];
}

export async function dbRun(sql: string, args: unknown[] = []): Promise<{ lastInsertRowid: number; rowsAffected: number }> {
  const result = await client.execute({ sql, args: args as import('@libsql/client').InValue[] });
  return { lastInsertRowid: Number(result.lastInsertRowid ?? 0), rowsAffected: result.rowsAffected };
}

// ── Schema + seed ─────────────────────────────────────────────────────────────

export async function initDb() {
  await client.execute('PRAGMA journal_mode = WAL');
  await client.execute('PRAGMA foreign_keys = ON');

  const schema = [
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'user',
      is_active INTEGER DEFAULT 1,
      is_verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      is_demo INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT,
      description TEXT,
      long_description TEXT,
      category_slug TEXT,
      price_minor INTEGER,
      currency TEXT DEFAULT 'INR',
      is_available INTEGER DEFAULT 1,
      is_demo INTEGER DEFAULT 0,
      image_url TEXT,
      image_alt TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS product_specs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      alt TEXT,
      sort_order INTEGER DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL DEFAULT 1,
      added_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, product_id)
    )`,
    `CREATE TABLE IF NOT EXISTS wishlist_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      added_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, product_id)
    )`,
    `CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      label TEXT DEFAULT 'Home',
      name TEXT NOT NULL,
      phone TEXT,
      line1 TEXT NOT NULL,
      line2 TEXT,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pincode TEXT NOT NULL,
      country TEXT DEFAULT 'India',
      is_default INTEGER DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      user_id INTEGER REFERENCES users(id),
      status TEXT DEFAULT 'placed',
      subtotal_minor INTEGER NOT NULL DEFAULT 0,
      shipping_minor INTEGER DEFAULT 0,
      tax_minor INTEGER DEFAULT 0,
      total_minor INTEGER NOT NULL DEFAULT 0,
      currency TEXT DEFAULT 'INR',
      payment_method TEXT DEFAULT 'enquiry',
      payment_status TEXT DEFAULT 'pending',
      shipping_address_json TEXT,
      notes TEXT,
      placed_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER,
      product_name TEXT NOT NULL,
      product_slug TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price_minor INTEGER NOT NULL DEFAULT 0,
      line_total_minor INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS quote_enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      business_name TEXT,
      product_interest TEXT,
      quantity TEXT,
      requirements TEXT,
      delivery_location TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS contact_enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      business_name TEXT,
      enquiry_type TEXT,
      product_interest TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('percent','fixed')),
      value INTEGER NOT NULL,
      min_order_minor INTEGER DEFAULT 0,
      max_uses INTEGER,
      uses_count INTEGER DEFAULT 0,
      expires_at TEXT,
      is_active INTEGER DEFAULT 1,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
  ];

  for (const sql of schema) {
    await client.execute(sql);
  }

  // Migrations for existing DBs
  await runMigrations();

  await seed();
  await seedAdmin();
}

async function runMigrations() {
  // Add role column if missing
  try {
    await client.execute(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`);
  } catch { /* column already exists */ }

  // Add is_active column if missing
  try {
    await client.execute(`ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1`);
  } catch { /* column already exists */ }
}

async function seedAdmin() {
  const existing = await dbGet('SELECT id FROM users WHERE email = ?', ['admin@rajtandoor.com']);
  if (existing) {
    // ensure role is admin even if column was just added
    await dbRun(`UPDATE users SET role = 'admin' WHERE email = ?`, ['admin@rajtandoor.com']);
    return;
  }
  const bcrypt = await import('bcryptjs');
  const passwordHash = await bcrypt.default.hash('Admin@1234', 12);
  await dbRun(
    `INSERT INTO users (name, email, password_hash, role, is_active, is_verified) VALUES (?, ?, ?, 'admin', 1, 1)`,
    ['Admin', 'admin@rajtandoor.com', passwordHash]
  );
  console.log('  Admin user created: admin@rajtandoor.com / Admin@1234');
}

async function seed() {
  const countResult = await dbGet<{ c: number }>('SELECT COUNT(*) as c FROM categories');
  if ((countResult?.c ?? 0) > 0) return;

  await dbRun('INSERT INTO categories (slug, name, description, image_url, is_demo, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
    ['tandoors', 'Tandoors', 'Commercial and restaurant-grade tandoor ovens', '/images/raj-tandoor-product.webp', 0, 1]);
  await dbRun('INSERT INTO categories (slug, name, description, image_url, is_demo, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
    ['kitchen-equipment', 'Kitchen Equipment', 'Professional commercial kitchen equipment', null, 1, 2]);
  await dbRun('INSERT INTO categories (slug, name, description, image_url, is_demo, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
    ['accessories', 'Accessories', 'Tandoor accessories and spare parts', null, 1, 3]);

  await dbRun(
    `INSERT INTO products (slug, name, tagline, description, long_description, category_slug, price_minor, is_available, is_demo, image_url, image_alt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'stainless-steel-tandoor',
      'Stainless Steel Commercial Tandoor',
      'Restaurant-grade tandoor with clay-lined chamber for authentic results',
      'A fully stainless-steel commercial tandoor designed for the rigorous demands of professional kitchen environments. Clay-lined chamber delivers authentic results while the outer housing is built for durability and hygiene.',
      'The Raj Tandoor Stainless Steel Commercial Tandoor combines traditional clay-lined cooking with commercial construction.',
      'tandoors', 1850000, 1, 0,
      '/images/raj-tandoor-product.webp',
      'Raj Tandoor stainless-steel commercial tandoor',
    ]
  );

  await dbRun(
    `INSERT INTO products (slug, name, tagline, description, category_slug, price_minor, is_available, is_demo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['commercial-gas-tandoor', 'Commercial Gas Tandoor', 'High-output gas tandoor for commercial kitchens',
      'Gas-fired commercial tandoor with precise temperature control. Contact us for specifications and pricing.',
      'tandoors', null, 1, 1]
  );

  await dbRun(
    `INSERT INTO products (slug, name, tagline, description, category_slug, price_minor, is_available, is_demo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['tandoor-accessories-set', 'Tandoor Accessories Set', 'Essential accessories for professional tandoor operation',
      'Professional tandoor accessories including skewers and maintenance tools.',
      'accessories', null, 1, 1]
  );
}
