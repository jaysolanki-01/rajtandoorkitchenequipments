-- Migration 013: Categories table with full CRUD support
-- Stores category metadata (name, description, image) managed via admin panel.
-- Product structure (slugs, product lists) stays in src/config/categories.ts.

create table if not exists public.categories (
  id           uuid        primary key default gen_random_uuid(),
  slug         text        unique not null,
  name         text        not null,
  description  text,
  image        text,
  sort_order   integer     not null default 0,
  is_active    boolean     not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "categories_select"        on public.categories;
drop policy if exists "categories_service_write" on public.categories;

-- Anyone can read active categories (navbar, shop page)
create policy "categories_select" on public.categories
  for select using (true);

-- Only service role (admin client) can write
create policy "categories_service_write" on public.categories
  for all using (auth.role() = 'service_role');

-- Auto-update updated_at
drop trigger if exists categories_updated_at on public.categories;
create trigger categories_updated_at
  before update on public.categories
  for each row execute procedure public.set_updated_at();

-- Seed the 14 existing categories (no-op if already exist)
insert into public.categories (slug, name, description, sort_order) values
  ('tandoor-equipment',           'Tandoor Equipment',              'Traditional and modern tandoors in clay, drum, and stainless steel for restaurants, dhabas, and cloud kitchens.',                                               1),
  ('burners-gas-stoves',          'Burners & Gas Stoves',           'Single to multi-burner commercial gas stoves and high-pressure LPG burners built for heavy-duty kitchen use.',                                                 2),
  ('commercial-cooking-ranges',   'Commercial Cooking Ranges',      'Full-width Indian and Chinese cooking ranges engineered for high-volume restaurant and catering kitchens.',                                                      3),
  ('fryers-griddles',             'Fryers & Griddles',              'Gas and electric deep fryers, flat-top griddles, and charbroilers for QSR, fast-food, and food-court operations.',                                              4),
  ('stainless-steel-fabrication', 'Stainless Steel Fabrication',    'Custom-fabricated work tables, sinks, shelves, and exhaust hoods in food-grade stainless steel to your specification.',                                         5),
  ('food-preparation-machines',   'Food Preparation Machines',      'Vegetable cutters, dough kneaders, planetary mixers, and grinders to streamline your commercial prep line.',                                                    6),
  ('food-warming-display',        'Food Warming & Display',         'Bain-maries, buffet counters, and hot display cases to keep food at temperature and always service-ready.',                                                      7),
  ('refrigeration-equipment',     'Refrigeration Equipment',        'Commercial refrigerators, deep freezers, display chillers, and cold rooms for all storage and chilling needs.',                                                 8),
  ('exhaust-ventilation',         'Exhaust & Ventilation',          'Exhaust hoods, grease filters, ducting, and fresh-air systems to meet commercial kitchen ventilation standards.',                                               9),
  ('kitchen-accessories-spare-parts', 'Kitchen Accessories & Spare Parts', 'Tandoor seekhs, gas regulators, cooking utensils, and genuine spare parts for all commercial kitchen equipment.',                                     10),
  ('bakery-pizza-equipment',      'Bakery & Pizza Equipment',       'Pizza ovens, deck ovens, dough mixers, and proofers purpose-built for bakery and pizzeria operations.',                                                        11),
  ('dishwashing-cleaning',        'Dishwashing & Cleaning',         'Commercial dishwashers, glass washers, pre-rinse units, and sinks for fast, hygienic ware cleaning.',                                                          12),
  ('storage-material-handling',   'Storage & Material Handling',    'Heavy-duty shelves, four-tier storage racks, platform trolleys, and LPG cylinder cage storage solutions.',                                                     13),
  ('beverage-equipment',          'Beverage Equipment',             'Tea urns, coffee machines, juice dispensers, and blenders for high-volume beverage service in hotels and cafes.',                                              14)
on conflict (slug) do nothing;
