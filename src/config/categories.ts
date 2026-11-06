export interface ProductItem {
  slug: string;
  name: string;
}

export interface CategoryItem {
  slug: string;
  name: string;
  products: ProductItem[];
}

function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().replace(/\s+/g, '-');
}

function items(names: string[]): ProductItem[] {
  return names.map(name => ({ slug: toSlug(name), name }));
}

export const CATEGORIES: CategoryItem[] = [
  {
    slug: 'tandoor-equipment',
    name: 'Tandoor Equipment',
    products: items([
      'Clay Tandoor', 'Drum Tandoor', 'Stainless Steel Tandoor', 'Gas Tandoor',
      'Electric Tandoor', 'Charcoal Tandoor', 'Commercial Tandoor', 'Portable Tandoor',
      'Round Tandoor', 'Square Tandoor', 'Custom-Built Tandoor',
    ]),
  },
  {
    slug: 'burners-gas-stoves',
    name: 'Burners & Gas Stoves',
    products: items([
      'Single Burner Gas Stove', 'Double Burner Gas Stove', 'Three Burner Gas Stove',
      'Four Burner Gas Stove', 'Heavy-Duty Gas Range', 'High-Pressure Burner',
      'Chinese Wok Burner', 'Stock Pot Burner', 'Tabletop Gas Stove',
      'LPG-Compatible Burner', 'Natural-Gas-Compatible Burner',
    ]),
  },
  {
    slug: 'commercial-cooking-ranges',
    name: 'Commercial Cooking Ranges',
    products: items([
      'Indian Cooking Range', 'Chinese Cooking Range', 'Multi-Burner Cooking Range',
      'Stock Pot Range', 'Commercial Hot Plate', 'Commercial Griddle Range',
      'Heavy-Duty Cooking Range', 'Gas Cooking Range', 'Electric Cooking Range',
    ]),
  },
  {
    slug: 'fryers-griddles',
    name: 'Fryers & Griddles',
    products: items([
      'Gas Deep Fryer', 'Electric Deep Fryer', 'Single-Tank Fryer', 'Double-Tank Fryer',
      'Flat-Top Griddle', 'Commercial Hot Plate', 'Charbroiler',
      'Commercial Grill', 'Sandwich Griller', 'Barbecue Grill',
    ]),
  },
  {
    slug: 'stainless-steel-fabrication',
    name: 'Stainless Steel Fabrication',
    products: items([
      'Stainless Steel Work Table', 'Food Preparation Table', 'Wall Shelf', 'Storage Rack',
      'Storage Cabinet', 'Single-Bowl Sink', 'Double-Bowl Sink', 'Dish Landing Table',
      'Drain Table', 'Exhaust Hood', 'Utility Trolley', 'Custom Stainless Steel Fabrication',
    ]),
  },
  {
    slug: 'food-preparation-machines',
    name: 'Food Preparation Machines',
    products: items([
      'Vegetable Cutting Machine', 'Potato Peeler', 'Dough Kneader', 'Planetary Mixer',
      'Wet Grinder', 'Food Processor', 'Meat Mincer', 'Commercial Slicer',
      'Juicer', 'Commercial Mixer Grinder',
    ]),
  },
  {
    slug: 'food-warming-display',
    name: 'Food Warming & Display',
    products: items([
      'Bain-Marie', 'Food Warmer', 'Hot Display Case', 'Buffet Counter',
      'Soup Kettle', 'Chapati Warmer', 'Serving Counter', 'Heated Display Cabinet',
    ]),
  },
  {
    slug: 'refrigeration-equipment',
    name: 'Refrigeration Equipment',
    products: items([
      'Commercial Refrigerator', 'Deep Freezer', 'Undercounter Refrigerator',
      'Display Chiller', 'Beverage Cooler', 'Cold Room',
      'Refrigerated Prep Counter', 'Upright Freezer', 'Ice Maker',
    ]),
  },
  {
    slug: 'exhaust-ventilation',
    name: 'Exhaust & Ventilation',
    products: items([
      'Commercial Exhaust Hood', 'Kitchen Chimney', 'Exhaust Ducting',
      'Fresh-Air System', 'Grease Filter', 'Ventilation Fan',
      'Make-Up Air Unit', 'Ventilation Accessories',
    ]),
  },
  {
    slug: 'kitchen-accessories-spare-parts',
    name: 'Kitchen Accessories & Spare Parts',
    products: items([
      'Tandoor Seekh / Skewer', 'Tandoor Cooking Tools', 'Commercial Cooking Pot',
      'Commercial Frying Pan', 'Kitchen Utensil Set', 'Burner Replacement Part',
      'Gas Connector / Hose', 'Approved Gas Regulator', 'Tandoor Spare Parts',
      'Replacement Filter', 'Other Compatible Spare Parts',
    ]),
  },
  {
    slug: 'bakery-pizza-equipment',
    name: 'Bakery & Pizza Equipment',
    products: items([
      'Commercial Pizza Oven', 'Deck Oven', 'Convection Oven', 'Dough Mixer',
      'Dough Sheeter', 'Proofing Cabinet', 'Bakery Work Table', 'Baking Tray',
    ]),
  },
  {
    slug: 'dishwashing-cleaning',
    name: 'Dishwashing & Cleaning',
    products: items([
      'Commercial Dishwasher', 'Glass Washer', 'Pre-Rinse Spray Unit',
      'Pot Washing Sink', 'Dish Rack', 'Hand Wash Sink', 'Cleaning Trolley',
    ]),
  },
  {
    slug: 'storage-material-handling',
    name: 'Storage & Material Handling',
    products: items([
      'Wall-Mounted Storage Shelf', 'Four-Tier Storage Rack', 'Ingredient Bin',
      'Heavy-Duty Storage Rack', 'Platform Trolley', 'Service Trolley',
      'LPG Cylinder Cage Storage',
    ]),
  },
  {
    slug: 'beverage-equipment',
    name: 'Beverage Equipment',
    products: items([
      'Commercial Tea Coffee Urn', 'Hot Water Dispenser', 'Commercial Coffee Machine',
      'Juice Dispenser', 'Milkshake Mixer', 'Beverage Blender',
    ]),
  },
];

/** First N categories split into two halves for footer columns */
export const FOOTER_CATS_LEFT = CATEGORIES.slice(0, 7);
export const FOOTER_CATS_RIGHT = CATEGORIES.slice(7);
