/**
 * Site-wide configuration for Raj Tandoor & Kitchen Equipment.
 * All empty strings are intentional placeholders — fill them in before going live.
 * Never add invented values (phone, email, address, GSTIN, social handles, etc.)
 */

export const brand = {
  name: 'Raj Tandoor',
  fullName: 'Raj Tandoor & Kitchen Equipment',
  tagline: 'Professional Tandoors Built for Commercial Kitchens',
  logoLine1: 'RAJ TANDOOR',
  logoLine2: '& KITCHEN EQUIPMENT',
  monogram: 'RT',
  /**
   * Path to a high-res transparent logo (PNG/WebP, ≥ 400 px wide).
   * Set this once you have the official standalone logo artwork.
   * Example: '/images/logo.png'
   * Currently only the product photo is available; the SVG emblem is used instead.
   */
  logoImageUrl: '',
} as const;

export const contact = {
  /** Business email – used in the contact form and footer. */
  email: '',
  /** Phone number with country code. Example: '+91 98765 43210' */
  phone: '',
  /** WhatsApp number with country code (may differ from phone). */
  whatsapp: '',
  /** Full postal address. */
  address: '',
  city: '',
  state: '',
  country: 'India',
  /** Visible business hours. Example: 'Mon–Sat 9 am – 6 pm IST' */
  businessHours: '',
  /** GST Identification Number. */
  gstin: '',
  /** Google Maps embed URL or '' to hide the map. */
  mapEmbedUrl: '',
} as const;

export const social = {
  /** Full URL, e.g. 'https://www.instagram.com/rajtandoor/'. Leave '' to hide. */
  instagram: '',
  facebook: '',
  linkedin: '',
  youtube: '',
} as const;

export const seo = {
  /** Replace with your live domain before deployment. */
  siteUrl: 'https://rajtandoor.com',
  title: 'Commercial Tandoors & Kitchen Equipment | Raj Tandoor',
  description:
    'Explore tandoors and professional kitchen equipment from Raj Tandoor. Discover products, review available specifications, and enquire about your kitchen requirements.',
  ogImage: '/images/raj-tandoor-product.webp',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const footerColumns = [
  {
    heading: 'Cooking Equipment',
    links: [
      { label: 'Tandoor Equipment', href: '/shop?category=tandoor-equipment' },
      { label: 'Burners & Gas Stoves', href: '/shop?category=burners-gas-stoves' },
      { label: 'Commercial Cooking Ranges', href: '/shop?category=commercial-cooking-ranges' },
      { label: 'Fryers & Griddles', href: '/shop?category=fryers-griddles' },
      { label: 'Stainless Steel Fabrication', href: '/shop?category=stainless-steel-fabrication' },
      { label: 'Food Preparation Machines', href: '/shop?category=food-preparation-machines' },
      { label: 'Food Warming & Display', href: '/shop?category=food-warming-display' },
    ],
  },
  {
    heading: 'Kitchen Solutions',
    links: [
      { label: 'Refrigeration Equipment', href: '/shop?category=refrigeration-equipment' },
      { label: 'Exhaust & Ventilation', href: '/shop?category=exhaust-ventilation' },
      { label: 'Kitchen Accessories & Spare Parts', href: '/shop?category=kitchen-accessories-spare-parts' },
      { label: 'Bakery & Pizza Equipment', href: '/shop?category=bakery-pizza-equipment' },
      { label: 'Dishwashing & Cleaning', href: '/shop?category=dishwashing-cleaning' },
      { label: 'Storage & Material Handling', href: '/shop?category=storage-material-handling' },
      { label: 'Beverage Equipment', href: '/shop?category=beverage-equipment' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Frequently Asked Questions', href: '/#faq' },
      { label: 'Request a Quote', href: '/contact?type=quote' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
    ],
  },
] as const;
