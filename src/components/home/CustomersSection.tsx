'use client';
import { useState } from 'react';

type Brand = { name: string; logo?: string };

const WP = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;

const categories: { label: string; brands: Brand[] }[] = [
  {
    label: 'Retail',
    brands: [
      { name: 'Easyday',             logo: '/logos/easyday.webp' },
      { name: 'Reliance Fresh' },
      { name: "Spencer's" },
      { name: "Nature's Basket" },
      { name: 'Aditya Birla Retail', logo: '/logos/aditya-birla.webp' },
      { name: 'Foodworld',           logo: '/logos/foodworld.png' },
    ],
  },
  {
    label: 'Hotels & Restaurants',
    brands: [
      { name: 'Holiday Inn',           logo: '/logos/holiday-inn.webp' },
      { name: 'The Claridges' },
      { name: 'Hilton',                logo: '/logos/hilton.webp' },
      { name: 'ibis',                  logo: WP('Ibis_hotels_logo.svg') },
      { name: 'Ramada',                logo: WP('Ramada_Logo.svg') },
      { name: 'Mövenpick',             logo: WP('Movenpick_Hotels_Resorts.svg') },
      { name: 'Courtyard by Marriott', logo: '/logos/courtyard-marriott.webp' },
      { name: 'Honest',                logo: '/logos/honest.png' },
      { name: 'MahaMahel' },
      { name: 'Salwa Family Restaurant' },
    ],
  },
  {
    label: 'Food & Beverage',
    brands: [
      { name: 'Baskin Robbins', logo: '/logos/baskin-robbins.webp' },
      { name: 'Arun Icecreams', logo: '/logos/arun-icecreams.png' },
      { name: 'Amul',           logo: '/logos/amul.webp' },
      { name: "Dinshaw's",      logo: '/logos/dinshaws.png' },
      { name: 'Vadilal' },
      { name: "Nirula's" },
      { name: 'Häagen-Dazs',    logo: '/logos/haagen-dazs.webp' },
      { name: 'Ranbaxy' },
    ],
  },
  {
    label: 'Corporate & Entertainment',
    brands: [
      { name: 'Torrent' },
      { name: 'Pepsi',            logo: WP('Pepsi_logo_2014.svg') },
      { name: 'Cremica',          logo: '/logos/cremica.webp' },
      { name: 'Infosys',          logo: WP('Infosys_logo.svg') },
      { name: 'Bharat Petroleum', logo: '/logos/bharat-petroleum.png' },
      { name: 'Adlabs',           logo: '/logos/adlabs.png' },
      { name: 'PVR Cinemas',      logo: WP('PVR_Cinemas_logo.svg') },
    ],
  },
];

function BrandPill({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  const showLogo = brand.logo && !failed;
  return (
    <div className="cust__pill">
      {showLogo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="cust__logo"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="cust__name">{brand.name}</span>
      )}
    </div>
  );
}

function CategoryRow({ label, brands, reverse }: { label: string; brands: Brand[]; reverse: boolean }) {
  const doubled = [...brands, ...brands, ...brands, ...brands];
  return (
    <div className="cust__category">
      <div className="cust__cat-label-wrap container">
        <span className="cust__cat-label">{label}</span>
      </div>
      <div className={`cust__row-wrap${reverse ? ' cust__row-wrap--reverse' : ''}`}>
        <div className={`cust__track${reverse ? ' cust__track--reverse' : ''}`}>
          {doubled.map((brand, i) => (
            <BrandPill key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CustomersSection() {
  return (
    <section className="cust" aria-labelledby="cust-heading">
      <div className="cust__header container">
        <h2 id="cust-heading" className="cust__h2">Trusted by Our Customers</h2>
        <p className="cust__sub">From 5-star hotel chains to national retail networks — our equipment powers commercial kitchens across India.</p>
      </div>
      <div className="cust__marquee" aria-hidden="true">
        {categories.map((cat, i) => (
          <CategoryRow key={cat.label} label={cat.label} brands={cat.brands} reverse={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
