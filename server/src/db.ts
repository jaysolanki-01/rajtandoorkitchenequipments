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

  // Migrate from old 3-category demo seed to full 14-category catalog
  const newCat = await dbGet('SELECT id FROM categories WHERE slug = ?', ['tandoor-equipment']);
  if (!newCat) {
    await dbRun(`DELETE FROM categories WHERE slug IN ('tandoors','kitchen-equipment','accessories')`);
    await dbRun(`DELETE FROM products WHERE is_demo = 1`);
    await seedFullCatalog();
    console.log('  Catalog migration complete: 14 categories and 126 products seeded.');
  }
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

function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().replace(/\s+/g, '-');
}

const CATALOG: { slug: string; name: string; products: string[] }[] = [
  { slug: 'tandoor-equipment', name: 'Tandoor Equipment', products: ['Clay Tandoor','Drum Tandoor','Stainless Steel Tandoor','Gas Tandoor','Electric Tandoor','Charcoal Tandoor','Commercial Tandoor','Portable Tandoor','Round Tandoor','Square Tandoor','Custom-Built Tandoor'] },
  { slug: 'burners-gas-stoves', name: 'Burners & Gas Stoves', products: ['Single Burner Gas Stove','Double Burner Gas Stove','Three Burner Gas Stove','Four Burner Gas Stove','Heavy-Duty Gas Range','High-Pressure Burner','Chinese Wok Burner','Stock Pot Burner','Tabletop Gas Stove','LPG-Compatible Burner','Natural-Gas-Compatible Burner'] },
  { slug: 'commercial-cooking-ranges', name: 'Commercial Cooking Ranges', products: ['Indian Cooking Range','Chinese Cooking Range','Multi-Burner Cooking Range','Stock Pot Range','Commercial Hot Plate','Commercial Griddle Range','Heavy-Duty Cooking Range','Gas Cooking Range','Electric Cooking Range'] },
  { slug: 'fryers-griddles', name: 'Fryers & Griddles', products: ['Gas Deep Fryer','Electric Deep Fryer','Single-Tank Fryer','Double-Tank Fryer','Flat-Top Griddle','Commercial Hot Plate','Charbroiler','Commercial Grill','Sandwich Griller','Barbecue Grill'] },
  { slug: 'stainless-steel-fabrication', name: 'Stainless Steel Fabrication', products: ['Stainless Steel Work Table','Food Preparation Table','Wall Shelf','Storage Rack','Storage Cabinet','Single-Bowl Sink','Double-Bowl Sink','Dish Landing Table','Drain Table','Exhaust Hood','Utility Trolley','Custom Stainless Steel Fabrication'] },
  { slug: 'food-preparation-machines', name: 'Food Preparation Machines', products: ['Vegetable Cutting Machine','Potato Peeler','Dough Kneader','Planetary Mixer','Wet Grinder','Food Processor','Meat Mincer','Commercial Slicer','Juicer','Commercial Mixer Grinder'] },
  { slug: 'food-warming-display', name: 'Food Warming & Display', products: ['Bain-Marie','Food Warmer','Hot Display Case','Buffet Counter','Soup Kettle','Chapati Warmer','Serving Counter','Heated Display Cabinet'] },
  { slug: 'refrigeration-equipment', name: 'Refrigeration Equipment', products: ['Commercial Refrigerator','Deep Freezer','Undercounter Refrigerator','Display Chiller','Beverage Cooler','Cold Room','Refrigerated Prep Counter','Upright Freezer','Ice Maker'] },
  { slug: 'exhaust-ventilation', name: 'Exhaust & Ventilation', products: ['Commercial Exhaust Hood','Kitchen Chimney','Exhaust Ducting','Fresh-Air System','Grease Filter','Ventilation Fan','Make-Up Air Unit','Ventilation Accessories'] },
  { slug: 'kitchen-accessories-spare-parts', name: 'Kitchen Accessories & Spare Parts', products: ['Tandoor Seekh Skewer','Tandoor Cooking Tools','Commercial Cooking Pot','Commercial Frying Pan','Kitchen Utensil Set','Burner Replacement Part','Gas Connector Hose','Approved Gas Regulator','Tandoor Spare Parts','Replacement Filter','Other Compatible Spare Parts'] },
  { slug: 'bakery-pizza-equipment', name: 'Bakery & Pizza Equipment', products: ['Commercial Pizza Oven','Deck Oven','Convection Oven','Dough Mixer','Dough Sheeter','Proofing Cabinet','Bakery Work Table','Baking Tray'] },
  { slug: 'dishwashing-cleaning', name: 'Dishwashing & Cleaning', products: ['Commercial Dishwasher','Glass Washer','Pre-Rinse Spray Unit','Pot Washing Sink','Dish Rack','Hand Wash Sink','Cleaning Trolley'] },
  { slug: 'storage-material-handling', name: 'Storage & Material Handling', products: ['Wall-Mounted Storage Shelf','Four-Tier Storage Rack','Ingredient Bin','Heavy-Duty Storage Rack','Platform Trolley','Service Trolley','LPG Cylinder Cage Storage'] },
  { slug: 'beverage-equipment', name: 'Beverage Equipment', products: ['Commercial Tea Coffee Urn','Hot Water Dispenser','Commercial Coffee Machine','Juice Dispenser','Milkshake Mixer','Beverage Blender'] },
];

async function seedFullCatalog() {
  for (let i = 0; i < CATALOG.length; i++) {
    const cat = CATALOG[i];
    await dbRun(
      `INSERT OR IGNORE INTO categories (slug, name, description, is_demo, sort_order) VALUES (?,?,?,0,?)`,
      [cat.slug, cat.name, `Commercial ${cat.name} for professional kitchens`, i + 1]
    );
    for (const pName of cat.products) {
      const pSlug = toSlug(pName);
      await dbRun(
        `INSERT OR IGNORE INTO products (slug, name, tagline, description, category_slug, is_available, is_demo)
         VALUES (?,?,?,?,?,1,0)`,
        [pSlug, pName, `${pName} for commercial kitchens`,
          'Contact us for pricing, specifications, and availability.', cat.slug]
      );
    }
  }
}

async function seed() {
  const newCat = await dbGet('SELECT id FROM categories WHERE slug = ?', ['tandoor-equipment']);
  if (newCat) return;

  await dbRun(`DELETE FROM categories WHERE slug IN ('tandoors','kitchen-equipment','accessories')`);
  await dbRun(`DELETE FROM products WHERE is_demo = 1`);

  await seedFullCatalog();
}
