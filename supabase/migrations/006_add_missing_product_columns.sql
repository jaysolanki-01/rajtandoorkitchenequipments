-- Add missing columns to products table
-- Run this in Supabase Dashboard → SQL Editor
-- Safe to run multiple times (uses IF NOT EXISTS).

-- Core columns that may be missing if the table was created without migration 001
alter table public.products add column if not exists category       text not null default '';
alter table public.products add column if not exists category_label text not null default '';
alter table public.products add column if not exists short_description text not null default '';
alter table public.products add column if not exists description    text not null default '';
alter table public.products add column if not exists image          text not null default '';
alter table public.products add column if not exists images         text[] not null default '{}';
alter table public.products add column if not exists price          integer;
alter table public.products add column if not exists currency       text not null default 'INR';
alter table public.products add column if not exists specs          jsonb not null default '[]';
alter table public.products add column if not exists features       text[] not null default '{}';
alter table public.products add column if not exists is_demo        boolean not null default false;
alter table public.products add column if not exists in_stock       boolean not null default true;
alter table public.products add column if not exists price_label    text;
alter table public.products add column if not exists group_id       text;
alter table public.products add column if not exists warranty       text;
alter table public.products add column if not exists tags           text[];
alter table public.products add column if not exists created_at     timestamptz not null default now();
alter table public.products add column if not exists updated_at     timestamptz not null default now();

-- Reload the PostgREST schema cache so the new columns are visible immediately
notify pgrst, 'reload schema';
