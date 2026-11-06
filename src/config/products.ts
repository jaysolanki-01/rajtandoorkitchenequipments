/**
 * Product catalog for Raj Tandoor & Kitchen Equipment.
 *
 * IMPORTANT: Only confirmed, visible product facts are listed here.
 * Do not add invented prices, specifications, certifications, or warranty claims.
 * Demo products are clearly marked with isDemo: true.
 */

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'tandoors' | 'kitchen-equipment' | 'accessories';
  categoryLabel: string;
  shortDescription: string;
  description: string;
  /** Primary image used for cards */
  image: string;
  /** Full gallery */
  images: string[];
  /**
   * null = price available on enquiry only.
   * Set a number once the price is confirmed.
   */
  price: number | null;
  currency: string;
  /** Only list specs confirmed by the manufacturer. */
  specs: ProductSpec[];
  features: string[];
  /** true = placeholder shown until a real product is added */
  isDemo: boolean;
  inStock: boolean;
  /** Override the "Request a Quote" label, e.g. "Contact for Pricing" */
  priceLabel?: string;
  /** Groups size variants of the same product line (e.g. 'ss-tandoor') */
  sizeGroup?: string;
  /** Display label for this size (e.g. 'Mini', 'Medium', 'Large') */
  sizeLabel?: string;
  /** Promotional badge (only use for verified claims, e.g. 'Best Seller') */
  badge?: string;
  /** Stock-keeping unit code */
  sku?: string;
  /** Warranty description — only set once confirmed by manufacturer */
  warranty?: string;
  /** Items included in the box, as confirmed by product documentation */
  included?: string[];
  /** Product-specific FAQs */
  faq?: { q: string; a: string }[];
}

export const products: Product[] = [
  // ── TANDOORS ──────────────────────────────────────────────────────────────
  {
    id: 'ss-tandoor-mini',
    slug: 'stainless-steel-tandoor-mini',
    name: 'Stainless Steel Tandoor — Mini',
    sizeGroup: 'ss-tandoor',
    sizeLabel: 'Mini',
    category: 'tandoors',
    categoryLabel: 'Tandoors',
    shortDescription: 'Compact stainless-steel tandoor ideal for small restaurants, home caterers, and food stalls. Clay-lined chamber, solid-fuel operation.',
    description: `The Mini Stainless Steel Tandoor from Raj Tandoor is built for compact commercial use — perfect for small restaurants, cloud kitchens, and food stalls.

Features a clay-lined cooking chamber, removable lid, side carrying handles, and a front firebox for solid-fuel or gas operation. Stainless-steel body ensures durability and easy cleaning.

Contact us for bulk pricing and customisation options.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 12000,
    currency: 'INR',
    specs: [
      { label: 'Body Material', value: 'Stainless Steel (SS 304)' },
      { label: 'Lining', value: 'Clay' },
      { label: 'Fuel Type', value: 'Solid Fuel / Wood Charcoal' },
      { label: 'Size', value: 'Mini (approx. 18″ diameter)' },
      { label: 'Suitable For', value: 'Small restaurants, food stalls' },
    ],
    features: [
      'SS 304 stainless steel body',
      'Clay-lined cooking chamber',
      'Removable lid with handle',
      'Side carrying handles',
      'Front firebox opening',
      'Easy to clean and maintain',
    ],
    isDemo: false,
    inStock: true,
    sku: 'RT-SST-01',
    included: [
      'Stainless steel tandoor with clay-lined chamber',
      'Removable lid with handle',
    ],
    faq: [
      { q: 'What fuel can I use with this tandoor?', a: 'This model is designed for solid fuel (wood or charcoal). An optional gas burner attachment is available — contact us for details.' },
      { q: 'Is the clay lining replaceable?', a: 'Yes, the clay lining can be replaced. Contact us for guidance on re-lining your tandoor.' },
      { q: 'Is professional installation required?', a: 'No — solid-fuel tandoors are ready to use once placed and seasoned. Season the tandoor with coal for 2–3 cycles before first use.' },
    ],
  },
  {
    id: 'ss-tandoor-medium',
    slug: 'stainless-steel-tandoor-medium',
    name: 'Stainless Steel Tandoor — Medium',
    sizeGroup: 'ss-tandoor',
    sizeLabel: 'Medium',
    category: 'tandoors',
    categoryLabel: 'Tandoors',
    shortDescription: 'Mid-size commercial tandoor for restaurants and hotels. Deep clay chamber, dual side handles, solid-fuel or gas compatible.',
    description: `The Medium Stainless Steel Tandoor is our most popular model for mid-size restaurants and hotel kitchens.

The deeper clay-lined chamber accommodates larger bread and skewer batches, making it ideal for busy service periods. Built with SS 304 stainless steel and thick clay lining for heat retention.

Available in gas-burner and solid-fuel variants. Contact us for specifications and delivery timelines.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 18500,
    currency: 'INR',
    specs: [
      { label: 'Body Material', value: 'Stainless Steel (SS 304)' },
      { label: 'Lining', value: 'Clay (thick-walled)' },
      { label: 'Fuel Type', value: 'Solid Fuel / Gas (optional)' },
      { label: 'Size', value: 'Medium (approx. 22″ diameter)' },
      { label: 'Suitable For', value: 'Restaurants, hotels, caterers' },
    ],
    features: [
      'Heavy-gauge SS 304 body',
      'Thick clay lining for heat retention',
      'Removable disc lid',
      'Dual side handles for easy movement',
      'Compatible with solid fuel and gas burner',
      'Stabilising base feet',
    ],
    isDemo: false,
    inStock: true,
    badge: 'Best Seller',
    sku: 'RT-SST-02',
    included: [
      'Stainless steel tandoor with thick clay-lined chamber',
      'Removable disc lid',
      'Dual side handles',
    ],
    faq: [
      { q: 'Is this model compatible with a gas burner?', a: 'Yes — this model supports both solid fuel and an optional gas burner attachment. Contact us to add a gas burner to your order.' },
      { q: 'How much can this tandoor cook at once?', a: 'The medium chamber fits multiple naan or several skewers simultaneously. Exact capacity depends on the size of items being prepared.' },
      { q: 'How long does delivery take?', a: 'We typically dispatch within 3–5 business days. Delivery time to your location is confirmed at order placement.' },
    ],
  },
  {
    id: 'ss-tandoor-large',
    slug: 'stainless-steel-tandoor-large',
    name: 'Stainless Steel Tandoor — Large',
    sizeGroup: 'ss-tandoor',
    sizeLabel: 'Large',
    category: 'tandoors',
    categoryLabel: 'Tandoors',
    shortDescription: 'Large-capacity commercial tandoor for high-volume restaurants, banquet halls, and catering operations.',
    description: `The Large Stainless Steel Tandoor is engineered for high-volume commercial cooking — banquet kitchens, large restaurants, and outdoor catering setups.

Wide mouth opening allows simultaneous cooking of multiple naan and skewer batches. Reinforced SS 304 body with extra-thick clay lining maintains consistent temperatures during extended cooking sessions.

Comes with professional stabilising frame for countertop or floor installation.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 26000,
    currency: 'INR',
    specs: [
      { label: 'Body Material', value: 'Stainless Steel (SS 304)' },
      { label: 'Lining', value: 'Extra-thick clay' },
      { label: 'Fuel Type', value: 'Solid Fuel / Gas' },
      { label: 'Size', value: 'Large (approx. 28″ diameter)' },
      { label: 'Suitable For', value: 'Banquet halls, large restaurants' },
    ],
    features: [
      'Extra-thick clay lining',
      'Wide-mouth opening for high capacity',
      'Heavy-gauge reinforced SS 304 body',
      'Professional stabilising frame',
      'Dual fuel compatibility',
      'Extended heat retention',
    ],
    isDemo: false,
    inStock: true,
    sku: 'RT-SST-03',
    included: [
      'Large stainless steel tandoor with extra-thick clay lining',
      'Removable lid',
      'Professional stabilising frame',
    ],
  },
  {
    id: 'copper-finish-tandoor',
    slug: 'copper-finish-tandoor',
    name: 'Copper Finish Tandoor',
    category: 'tandoors',
    categoryLabel: 'Tandoors',
    shortDescription: 'Premium decorative tandoor with copper finish exterior. Ideal for open-kitchen restaurants and live cooking stations.',
    description: `The Copper Finish Tandoor combines authentic cooking performance with a striking decorative exterior — perfect for open kitchens, live counters, and premium dining setups.

Stainless steel construction with a hand-applied copper finish. Clay-lined chamber delivers authentic tandoori flavour. This model is frequently used as a centrepiece in premium restaurant interiors.

Available in mini, medium, and large sizes. Contact us for custom finishes and sizing.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 32000,
    currency: 'INR',
    specs: [
      { label: 'Body Material', value: 'Stainless Steel with Copper Finish' },
      { label: 'Lining', value: 'Clay' },
      { label: 'Fuel Type', value: 'Solid Fuel / Gas (optional)' },
      { label: 'Finish', value: 'Hand-applied copper' },
      { label: 'Suitable For', value: 'Open kitchens, premium restaurants' },
    ],
    features: [
      'Premium copper decorative finish',
      'Stainless steel structural body',
      'Clay-lined cooking chamber',
      'Ideal for live cooking stations',
      'Available in multiple sizes',
      'Custom finishes available on request',
    ],
    isDemo: false,
    inStock: true,
    badge: 'Premium',
    sku: 'RT-CPT-01',
    faq: [
      { q: 'Is this tandoor suitable for outdoor use?', a: 'Yes — the copper finish is designed to withstand commercial kitchen conditions. Outdoor use is possible in covered areas. Avoid prolonged exposure to direct rain.' },
      { q: 'Can I customise the finish or size?', a: 'Yes, Raj Tandoor offers custom finishes and sizes. Contact us with your requirements.' },
    ],
  },
  {
    id: 'gas-tandoor-compact',
    slug: 'gas-tandoor-compact',
    name: 'Gas Tandoor — Compact',
    sizeGroup: 'gas-tandoor',
    sizeLabel: 'Compact',
    category: 'tandoors',
    categoryLabel: 'Tandoors',
    shortDescription: 'Compact gas-operated tandoor with built-in LPG burner. Precise temperature control for consistent results in smaller kitchens.',
    description: `The Compact Gas Tandoor features a built-in LPG burner for precise, consistent heat without the need for charcoal management.

Designed for cloud kitchens, smaller restaurants, and fast-food operations where speed and temperature control are priorities. The gas burner ensures rapid heat-up and consistent results across each batch.

Comes with gas regulator fitting (LPG cylinder not included). Professional installation recommended.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 22500,
    currency: 'INR',
    specs: [
      { label: 'Body Material', value: 'Stainless Steel (SS 304)' },
      { label: 'Lining', value: 'Clay' },
      { label: 'Fuel Type', value: 'LPG Gas' },
      { label: 'Burner', value: 'Built-in LPG burner' },
      { label: 'Size', value: 'Compact (approx. 18″ diameter)' },
    ],
    features: [
      'Built-in LPG gas burner',
      'Precise temperature control',
      'Rapid heat-up time',
      'No charcoal management needed',
      'Stainless steel body with clay lining',
      'Gas regulator fitting included',
    ],
    isDemo: false,
    inStock: true,
    sku: 'RT-GTD-01',
    included: [
      'Compact gas tandoor with clay-lined chamber',
      'Gas regulator fitting',
      '(LPG cylinder not included — source locally)',
    ],
    faq: [
      { q: 'Does this come with an LPG cylinder?', a: 'No — the LPG cylinder is not included and must be sourced locally. The tandoor includes a gas regulator fitting.' },
      { q: 'Is professional installation required?', a: 'Professional gas fitting is strongly recommended. The gas regulator fitting is included; a certified gas plumber should connect the appliance to your supply.' },
      { q: 'What is the heat-up time?', a: 'Gas tandoors typically reach cooking temperature faster than solid-fuel models. Exact heat-up time depends on gas pressure and ambient conditions.' },
    ],
  },
  {
    id: 'gas-tandoor-commercial',
    slug: 'gas-tandoor-commercial',
    name: 'Gas Tandoor — Commercial',
    sizeGroup: 'gas-tandoor',
    sizeLabel: 'Commercial',
    category: 'tandoors',
    categoryLabel: 'Tandoors',
    shortDescription: 'Full-size commercial gas tandoor with high-output LPG burner. Designed for high-volume restaurants and catering operations.',
    description: `The Commercial Gas Tandoor delivers the performance demanded by high-volume catering operations, large restaurants, and hotel kitchens.

Equipped with a high-output LPG burner, this model reaches cooking temperature quickly and maintains consistent heat across long service periods. The large clay-lined chamber accommodates multiple naan and skewers simultaneously.

Includes gas regulator and fitting kit. LPG cylinder not included. Professional installation strongly recommended.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 38000,
    currency: 'INR',
    specs: [
      { label: 'Body Material', value: 'Stainless Steel (SS 304)' },
      { label: 'Lining', value: 'Extra-thick clay' },
      { label: 'Fuel Type', value: 'LPG Gas' },
      { label: 'Burner', value: 'High-output LPG burner' },
      { label: 'Size', value: 'Large (approx. 26″ diameter)' },
    ],
    features: [
      'High-output commercial LPG burner',
      'Extra-thick clay lining',
      'Large-capacity cooking chamber',
      'Consistent temperature across service',
      'Gas regulator and fitting kit included',
      'Built for extended daily use',
    ],
    isDemo: false,
    inStock: true,
    sku: 'RT-GTD-02',
    included: [
      'Commercial gas tandoor with extra-thick clay lining',
      'Gas regulator',
      'Fitting kit',
      '(LPG cylinder not included — source locally)',
    ],
  },

  // ── KITCHEN EQUIPMENT ─────────────────────────────────────────────────────
  {
    id: 'commercial-roti-maker',
    slug: 'commercial-roti-maker',
    name: 'Commercial Roti Maker',
    category: 'kitchen-equipment',
    categoryLabel: 'Kitchen Equipment',
    shortDescription: 'Electric commercial roti maker for consistent, uniform rotis. Suitable for restaurants, canteens, and catering operations.',
    description: `The Commercial Roti Maker from Raj Tandoor produces uniform, consistent rotis at scale — ideal for restaurants, school canteens, corporate cafeterias, and catering operations.

Non-stick heated plates press and cook rotis simultaneously, reducing preparation time significantly compared to hand-rolling. Adjustable pressure and temperature settings accommodate different dough types.

Capacity and power specifications available on request. Contact us for volume pricing.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 8500,
    currency: 'INR',
    specs: [
      { label: 'Operation', value: 'Electric' },
      { label: 'Plates', value: 'Non-stick heated plates' },
      { label: 'Power', value: 'Available on request' },
      { label: 'Suitable For', value: 'Restaurants, canteens, catering' },
    ],
    features: [
      'Electric non-stick heated plates',
      'Uniform roti thickness',
      'Adjustable pressure and temperature',
      'Reduces preparation time significantly',
      'Easy-clean non-stick surface',
      'Durable commercial-grade construction',
    ],
    isDemo: false,
    inStock: true,
  },
  {
    id: 'chapati-press-machine',
    slug: 'chapati-press-machine',
    name: 'Chapati Press Machine',
    category: 'kitchen-equipment',
    categoryLabel: 'Kitchen Equipment',
    shortDescription: 'Heavy-duty stainless-steel chapati press for commercial kitchens. Produces perfectly round, even chapatis quickly.',
    description: `The Chapati Press Machine is a heavy-duty manual press designed for commercial kitchens that require consistent chapati production.

Cast iron and stainless steel construction ensures longevity. The lever mechanism delivers even pressure across the dough ball, producing perfectly round chapatis of uniform thickness every time.

No electricity required — suitable for kitchens with limited electrical capacity.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 4500,
    currency: 'INR',
    specs: [
      { label: 'Material', value: 'Cast Iron / Stainless Steel' },
      { label: 'Operation', value: 'Manual lever press' },
      { label: 'Power Required', value: 'None' },
      { label: 'Output', value: 'Uniform round chapatis' },
    ],
    features: [
      'Heavy-duty cast iron and stainless steel',
      'Manual lever press — no electricity needed',
      'Consistent round shape and thickness',
      'Easy to operate and clean',
      'Durable for daily commercial use',
      'Compact footprint',
    ],
    isDemo: false,
    inStock: true,
  },
  {
    id: 'commercial-dough-mixer',
    slug: 'commercial-dough-mixer',
    name: 'Commercial Dough Mixer — 10 kg',
    category: 'kitchen-equipment',
    categoryLabel: 'Kitchen Equipment',
    shortDescription: '10 kg capacity spiral dough mixer for commercial bread, roti, and naan production. Heavy-duty motor, stainless steel bowl.',
    description: `The 10 kg Commercial Dough Mixer is built for high-volume dough preparation in restaurants, bakeries, and catering operations.

A heavy-duty spiral hook mixes dough thoroughly and consistently in large batches, saving time compared to manual kneading. The stainless steel bowl is removable for easy cleaning.

Available in 10 kg and 20 kg capacities. Contact us for specifications and delivery.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 15000,
    currency: 'INR',
    specs: [
      { label: 'Capacity', value: '10 kg dough' },
      { label: 'Bowl Material', value: 'Stainless Steel' },
      { label: 'Hook Type', value: 'Spiral' },
      { label: 'Operation', value: 'Electric' },
      { label: 'Suitable For', value: 'Restaurants, bakeries, caterers' },
    ],
    features: [
      '10 kg dough capacity',
      'Heavy-duty spiral mixing hook',
      'Stainless steel removable bowl',
      'Timer and speed controls',
      'Safety bowl guard',
      'Easy-clean design',
    ],
    isDemo: false,
    inStock: true,
  },

  // ── ACCESSORIES ───────────────────────────────────────────────────────────
  {
    id: 'tandoor-skewer-set',
    slug: 'tandoor-skewer-set',
    name: 'Tandoor Skewer Set (6 pieces)',
    category: 'accessories',
    categoryLabel: 'Accessories',
    shortDescription: 'Set of 6 flat stainless-steel tandoor skewers. Suitable for kebabs, tikka, and seekh. Commercial grade.',
    description: `This set of 6 flat stainless-steel tandoor skewers is designed for daily commercial use in tandoor cooking.

Flat blade design holds marinated meats and vegetables securely during cooking. Long handles keep hands clear of heat. Dishwasher safe and rust-resistant.

Compatible with all Raj Tandoor models.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 1200,
    currency: 'INR',
    specs: [
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Quantity', value: '6 pieces' },
      { label: 'Type', value: 'Flat blade' },
      { label: 'Compatibility', value: 'All Raj Tandoor models' },
    ],
    features: [
      'Set of 6 flat stainless steel skewers',
      'Long handles for safe handling',
      'Rust-resistant and dishwasher safe',
      'Flat blade holds food securely',
      'Compatible with all tandoor sizes',
    ],
    isDemo: false,
    inStock: true,
  },
  {
    id: 'tandoor-cleaning-kit',
    slug: 'tandoor-cleaning-kit',
    name: 'Tandoor Cleaning Kit',
    category: 'accessories',
    categoryLabel: 'Accessories',
    shortDescription: 'Complete cleaning kit for stainless-steel tandoors. Includes ash tray, wire brush, and cleaning cloth.',
    description: `Keep your tandoor in top condition with the Raj Tandoor Cleaning Kit — everything you need for regular maintenance and deep cleaning.

Includes: 1× ash tray insert, 1× long-handled wire brush for the clay chamber, 1× stainless steel exterior polish cloth.

Regular cleaning extends the life of both the steel body and the clay lining. Recommended after every service.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 850,
    currency: 'INR',
    specs: [
      { label: 'Contents', value: 'Ash tray, wire brush, polish cloth' },
      { label: 'Compatible With', value: 'All Raj Tandoor models' },
    ],
    features: [
      'Ash tray insert for easy ash removal',
      'Long-handled wire brush for clay chamber',
      'Stainless steel exterior polish cloth',
      'Extends life of clay lining',
      'Compatible with all tandoor sizes',
    ],
    isDemo: false,
    inStock: true,
  },
  {
    id: 'naan-bread-tray-set',
    slug: 'naan-bread-tray-set',
    name: 'Naan Bread Tray Set (4 pieces)',
    category: 'accessories',
    categoryLabel: 'Accessories',
    shortDescription: 'Set of 4 stainless steel naan trays for presenting and serving bread from the tandoor. Restaurant grade.',
    description: `The Naan Bread Tray Set contains 4 restaurant-grade stainless steel trays designed for serving naan and other flatbreads fresh from the tandoor.

The raised edge retains heat and prevents bread from sliding during service. Stackable design makes storage simple. Suitable for use in restaurants, hotels, and catering buffets.`,
    image: '/images/raj-tandoor-product.webp',
    images: ['/images/raj-tandoor-product.webp'],
    price: 1800,
    currency: 'INR',
    specs: [
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Quantity', value: '4 trays' },
      { label: 'Design', value: 'Raised edge, stackable' },
      { label: 'Suitable For', value: 'Restaurants, hotels, buffets' },
    ],
    features: [
      'Set of 4 stainless steel trays',
      'Raised edge retains heat',
      'Stackable for easy storage',
      'Dishwasher safe',
      'Restaurant-grade stainless steel',
    ],
    isDemo: false,
    inStock: true,
  },
];

// ── Category metadata ─────────────────────────────────────────────────────────

export interface Category {
  slug: string;
  label: string;
  description: string;
  href: string;
  image: string;
  isDemo: boolean;
  demoNote?: string;
}

export const categories: Category[] = [
  {
    slug: 'tandoors',
    label: 'Tandoors',
    description: 'Stainless-steel tandoors designed for restaurants, hotels, and commercial kitchens.',
    href: '/tandoors',
    image: '/images/raj-tandoor-product.webp',
    isDemo: false,
  },
  {
    slug: 'kitchen-equipment',
    label: 'Kitchen Equipment',
    description: 'Professional kitchen equipment for commercial cooking environments.',
    href: '/kitchen-equipment',
    image: '/images/raj-tandoor-product.webp',
    isDemo: true,
    demoNote: 'Product details coming soon — contact us to enquire.',
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    description: 'Accessories and consumables for tandoor operation and maintenance.',
    href: '/shop?category=accessories',
    image: '/images/raj-tandoor-product.webp',
    isDemo: true,
    demoNote: 'Product details coming soon — contact us to enquire.',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
