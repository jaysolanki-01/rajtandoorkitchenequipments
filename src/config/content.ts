/**
 * All page copy, links and CTA destinations live here.
 * Change text or URLs in this file — components read from it and contain no hard-coded copy.
 *
 * Only facts visible in the product reference are stated. Do not add specifications,
 * ratings, certifications or warranty claims here unless they are verified.
 */

export const links = {
  /** Destination of every "Explore Tandoors" button. */
  exploreTandoors: '/tandoors',
  /** Destination of every "Request a Quote" / "Enquire" button. */
  requestQuote: '/contact',
};

export const contact = {
  /**
   * Email address the enquiry form sends to (opens the visitor's mail app).
   * Leave empty until the real address is known — the form then shows a friendly notice instead.
   */
  email: '',
  /** Optional phone number, e.g. '+91 00000 00000'. Shown only when set. */
  phone: '',
};

export const brand = {
  name: 'Raj Tandoor',
  fullName: 'Raj Tandoor & Kitchen Equipment',
  logoLine1: 'RAJ TANDOOR',
  logoLine2: 'AND KITCHEN EQUIPMENT',
  monogram: 'RT',
  /**
   * Optional: path to the official emblem artwork (square PNG/WebP with transparent background,
   * ideally 1024×1024) placed in /public. When set, it is used on the 3D model instead of the
   * redrawn emblem. Example: '/images/raj-tandoor-emblem.png'
   */
  emblemTextureUrl: '',
};

export const productImage = {
  src: '/images/raj-tandoor-product.webp',
  width: 941,
  height: 1672,
  alt: 'Raj Tandoor stainless-steel commercial tandoor with cream clay rim, removable lid with raised handle, side carrying handles and front firebox opening',
};

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Tandoors', href: '#tandoors' },
  { label: 'Kitchen Equipment', href: '#kitchen-equipment' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export type CalloutId =
  | 'steel'
  | 'clay'
  | 'design'
  | 'firebox'
  | 'body'
  | 'handles'
  | 'base';

export interface ChapterContent {
  id: string;
  /** Short name used by the chapter progress navigation. */
  navLabel: string;
  eyebrow?: string;
  heading: string;
  body: string;
  /** Shorter copy used on narrow screens. */
  mobileBody?: string;
  /** Small label under the copy. */
  tag?: string;
  /** Feature items. On desktop these appear as 3D-anchored callouts; elsewhere as a list. */
  features?: { id: CalloutId; index?: string; label: string }[];
  ctas?: { label: string; href: string; variant: 'primary' | 'ghost' }[];
}

export const chapters: ChapterContent[] = [
  {
    id: 'reveal',
    navLabel: 'Reveal',
    eyebrow: 'Raj Tandoor & Kitchen Equipment',
    heading: 'Built for the\nHeat of Service.',
    body: 'Commercial tandoors and professional kitchen equipment, crafted for restaurants, caterers and hospitality kitchens that demand authentic performance.',
    mobileBody: 'Commercial tandoors crafted for restaurants, caterers and hospitality kitchens.',
    ctas: [
      { label: 'View Tandoors', href: links.exploreTandoors, variant: 'primary' },
      { label: 'Get a Quote', href: links.requestQuote, variant: 'ghost' },
    ],
  },
  {
    id: 'craft',
    navLabel: 'Craftsmanship',
    eyebrow: 'Crafted for professional kitchens',
    heading: 'Stainless steel,\nprecision in every weld.',
    body: 'A fully welded stainless-steel body built for the demands of professional kitchen service, with an authentic refractory-clay cooking chamber.',
    mobileBody: 'Fully welded stainless steel with an authentic refractory-clay cooking chamber.',
    features: [
      { id: 'steel', index: '01', label: 'Stainless-Steel Construction' },
      { id: 'clay', index: '02', label: 'Refractory-Clay Cooking Chamber' },
      { id: 'design', index: '03', label: 'Practical Commercial Design' },
    ],
  },
  {
    id: 'chamber',
    navLabel: 'Cooking chamber',
    eyebrow: 'Inside the tandoor',
    heading: 'Authentic clay.\nEngineered to last.',
    body: 'The traditional refractory-clay cooking chamber retains heat with precision, delivering authentic tandoor cooking at commercial scale, service after service.',
    mobileBody: 'Refractory-clay chamber for authentic tandoor cooking at commercial scale.',
    tag: 'Explore the cooking chamber',
  },
  {
    id: 'details',
    navLabel: 'Details',
    eyebrow: 'Built from the details',
    heading: 'Every detail\nhas a purpose.',
    body: 'From the front firebox opening to the stable supporting base — each design decision serves the demands of a working professional kitchen.',
    mobileBody: 'Every design detail built for a working professional kitchen.',
    features: [
      { id: 'firebox', label: 'Front Firebox Access' },
      { id: 'body', label: 'Stainless-Steel Body' },
      { id: 'handles', label: 'Side Carrying Handles' },
      { id: 'base', label: 'Stable Supporting Base' },
    ],
  },
  {
    id: 'complete',
    navLabel: 'Enquire',
    eyebrow: 'Raj Tandoor & Kitchen Equipment',
    heading: 'The right tandoor\nfor your kitchen.',
    body: 'From single-kitchen restaurants to large catering operations — explore our tandoor collection and find the right equipment for the way you work.',
    mobileBody: 'Find the right tandoor for your restaurant, catering or hospitality operation.',
    ctas: [
      { label: 'View Our Tandoors', href: links.exploreTandoors, variant: 'primary' },
      { label: 'Get a Quote', href: links.requestQuote, variant: 'ghost' },
    ],
  },
];

/** Construction features visible on the reference product — used in the static product section. */
export const productFeatures = [
  'Brushed stainless-steel cylindrical body',
  'Cream refractory-clay rim and dark cooking chamber',
  'Removable stainless-steel lid with raised handle',
  'Side carrying handles',
  'Front firebox opening',
  'Supporting feet',
];

/**
 * Glass cards that pop in around the product photo in the homepage hero.
 * `pos` picks the spot around the photo; `tilt` is the resting angle in degrees.
 */
export const heroGlassCards: {
  index: string;
  title: string;
  note: string;
  pos: 'top-left' | 'mid-right' | 'bottom-left';
  tilt: number;
}[] = [
  { index: '01', title: 'Stainless-steel body', note: 'Brushed cylindrical finish', pos: 'top-left', tilt: -3 },
  { index: '02', title: 'Clay-lined chamber', note: 'Cream refractory-clay rim', pos: 'mid-right', tilt: 2.5 },
  { index: '03', title: 'Front firebox', note: 'Opening at the base', pos: 'bottom-left', tilt: -1.5 },
];
