-- Add stock_quantity column to products table.
-- NULL = quantity not tracked (legacy / unset)
-- 0    = out of stock
-- >0   = units available
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT NULL;
