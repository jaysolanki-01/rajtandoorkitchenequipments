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
  { label: 'Shop', href: '/shop' },
  { label: 'Tandoors', href: '/tandoors' },
  { label: 'Kitchen Equipment', href: '/kitchen-equipment' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const footerColumns = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Tandoors', href: '/tandoors' },
      { label: 'Kitchen Equipment', href: '/kitchen-equipment' },
      { label: 'Featured Products', href: '/shop#featured' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Frequently Asked Questions', href: '/#faq' },
      { label: 'Request a Quote', href: '/contact?type=quote' },
      // Add these once the pages are approved by the business:
      // { label: 'Shipping Information', href: '/shipping' },
      // { label: 'Returns & Refunds', href: '/returns' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      // { label: 'Privacy Policy', href: '/privacy' },
      // { label: 'Terms of Use', href: '/terms' },
    ],
  },
] as const;
