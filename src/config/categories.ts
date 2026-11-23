export interface ProductItem {
  slug: string;
  name: string;
}

export interface CategoryItem {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  products: ProductItem[];
}

function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().replace(/\s+/g, '-');
}

function items(names: string[]): ProductItem[] {
  return names.map(name => ({ slug: toSlug(name), name }));
}

// Pexels CDN: images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg
function px(id: number, w = 700, h = 280): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;
}

export const CATEGORIES: CategoryItem[] = [
  {
    slug: 'tandoor-equipment',
    name: 'Tandoor Equipment',
    description: 'Traditional and modern tandoors in clay, drum, and stainless steel for restaurants, dhabas, and cloud kitchens.',
    image: '/images/tandoor-equipment-hero.webp',
    products: items([
      'Clay Tandoor', 'Drum Tandoor', 'Stainless Steel Tandoor', 'Gas Tandoor',
      'Electric Tandoor', 'Charcoal Tandoor', 'Commercial Tandoor', 'Portable Tandoor',
      'Round Tandoor', 'Square Tandoor', 'Custom-Built Tandoor',
    ]),
  },
  {
    slug: 'burners-gas-stoves',
    name: 'Burners & Gas Stoves',
    description: 'Single to multi-burner commercial gas stoves and high-pressure LPG burners built for heavy-duty kitchen use.',
    image: px(17303438),
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
    description: 'Full-width Indian and Chinese cooking ranges engineered for high-volume restaurant and catering kitchens.',
    image: px(21661595),
    products: items([
      'Indian Cooking Range', 'Chinese Cooking Range', 'Multi-Burner Cooking Range',
      'Stock Pot Range', 'Commercial Hot Plate', 'Commercial Griddle Range',
      'Heavy-Duty Cooking Range', 'Gas Cooking Range', 'Electric Cooking Range',
    ]),
  },
  {
    slug: 'fryers-griddles',
    name: 'Fryers & Griddles',
    description: 'Gas and electric deep fryers, flat-top griddles, and charbroilers for QSR, fast-food, and food-court operations.',
    image: px(11731658),
    products: items([
      'Gas Deep Fryer', 'Electric Deep Fryer', 'Single-Tank Fryer', 'Double-Tank Fryer',
      'Flat-Top Griddle', 'Commercial Hot Plate', 'Charbroiler',
      'Commercial Grill', 'Sandwich Griller', 'Barbecue Grill',
    ]),
  },
  {
    slug: 'stainless-steel-fabrication',
    name: 'Stainless Steel Fabrication',
    description: 'Custom-fabricated work tables, sinks, shelves, and exhaust hoods in food-grade stainless steel to your specification.',
    image: px(6375553),
    products: items([
      'Stainless Steel Work Table', 'Food Preparation Table', 'Wall Shelf', 'Storage Rack',
      'Storage Cabinet', 'Single-Bowl Sink', 'Double-Bowl Sink', 'Dish Landing Table',
      'Drain Table', 'Exhaust Hood', 'Utility Trolley', 'Custom Stainless Steel Fabrication',
    ]),
  },
  {
    slug: 'food-preparation-machines',
    name: 'Food Preparation Machines',
    description: 'Vegetable cutters, dough kneaders, planetary mixers, and grinders to streamline your commercial prep line.',
    image: px(28704740),
    products: items([
      'Vegetable Cutting Machine', 'Potato Peeler', 'Dough Kneader', 'Planetary Mixer',
      'Wet Grinder', 'Food Processor', 'Meat Mincer', 'Commercial Slicer',
      'Juicer', 'Commercial Mixer Grinder',
    ]),
  },
  {
    slug: 'food-warming-display',
    name: 'Food Warming & Display',
    description: 'Bain-maries, buffet counters, and hot display cases to keep food at temperature and always service-ready.',
    image: px(6375558),
    products: items([
      'Bain-Marie', 'Food Warmer', 'Hot Display Case', 'Buffet Counter',
      'Soup Kettle', 'Chapati Warmer', 'Serving Counter', 'Heated Display Cabinet',
    ]),
  },
  {
    slug: 'refrigeration-equipment',
    name: 'Refrigeration Equipment',
    description: 'Commercial refrigerators, deep freezers, display chillers, and cold rooms for all storage and chilling needs.',
    image: px(8583864),
    products: items([
      'Commercial Refrigerator', 'Deep Freezer', 'Undercounter Refrigerator',
      'Display Chiller', 'Beverage Cooler', 'Cold Room',
      'Refrigerated Prep Counter', 'Upright Freezer', 'Ice Maker',
    ]),
  },
  {
    slug: 'exhaust-ventilation',
    name: 'Exhaust & Ventilation',
    description: 'Exhaust hoods, grease filters, ducting, and fresh-air systems to meet commercial kitchen ventilation standards.',
    image: px(33955606),
    products: items([
      'Commercial Exhaust Hood', 'Kitchen Chimney', 'Exhaust Ducting',
      'Fresh-Air System', 'Grease Filter', 'Ventilation Fan',
      'Make-Up Air Unit', 'Ventilation Accessories',
    ]),
  },
  {
    slug: 'kitchen-accessories-spare-parts',
    name: 'Kitchen Accessories & Spare Parts',
    description: 'Tandoor seekhs, gas regulators, cooking utensils, and genuine spare parts for all commercial kitchen equipment.',
    image: px(4221389),
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
    description: 'Pizza ovens, deck ovens, dough mixers, and proofers purpose-built for bakery and pizzeria operations.',
    image: px(5953578),
    products: items([
      'Commercial Pizza Oven', 'Deck Oven', 'Convection Oven', 'Dough Mixer',
      'Dough Sheeter', 'Proofing Cabinet', 'Bakery Work Table', 'Baking Tray',
    ]),
  },
  {
    slug: 'dishwashing-cleaning',
    name: 'Dishwashing & Cleaning',
    description: 'Commercial dishwashers, glass washers, pre-rinse units, and sinks for fast, hygienic ware cleaning.',
    image: px(15945555),
    products: items([
      'Commercial Dishwasher', 'Glass Washer', 'Pre-Rinse Spray Unit',
      'Pot Washing Sink', 'Dish Rack', 'Hand Wash Sink', 'Cleaning Trolley',
    ]),
  },
  {
    slug: 'storage-material-handling',
    name: 'Storage & Material Handling',
    description: 'Heavy-duty shelves, four-tier storage racks, platform trolleys, and LPG cylinder cage storage solutions.',
    image: px(4483610),
    products: items([
      'Wall-Mounted Storage Shelf', 'Four-Tier Storage Rack', 'Ingredient Bin',
      'Heavy-Duty Storage Rack', 'Platform Trolley', 'Service Trolley',
      'LPG Cylinder Cage Storage',
    ]),
  },
  {
    slug: 'beverage-equipment',
    name: 'Beverage Equipment',
    description: 'Tea urns, coffee machines, juice dispensers, and blenders for high-volume beverage service in hotels and cafes.',
    // Unsplash: commercial espresso machine on counter
    image: 'https://images.unsplash.com/photo-O50HtSlCzag?w=700&h=280&fit=crop&q=75&auto=format',
    products: items([
      'Commercial Tea Coffee Urn', 'Hot Water Dispenser', 'Commercial Coffee Machine',
      'Juice Dispenser', 'Milkshake Mixer', 'Beverage Blender',
    ]),
  },
];

/** First N categories split into two halves for footer columns */
export const FOOTER_CATS_LEFT = CATEGORIES.slice(0, 7);
export const FOOTER_CATS_RIGHT = CATEGORIES.slice(7);
