'use client';
import { useState } from 'react';

type Brand = { name: string; logo: string };

const categories: { label: string; brands: Brand[] }[] = [
  {
    label: 'Retail',
    brands: [
      { name: 'Easyday',            logo: 'https://logo.clearbit.com/bhartiretail.com' },
      { name: 'Reliance Fresh',     logo: 'https://logo.clearbit.com/reliancefresh.com' },
      { name: "Spencer's",          logo: 'https://logo.clearbit.com/spencers.in' },
      { name: "Nature's Basket",    logo: 'https://logo.clearbit.com/naturesbasket.co.in' },
      { name: 'Aditya Birla Retail',logo: '/logos/aditya-birla.webp' },
      { name: 'Foodworld',          logo: 'https://logo.clearbit.com/foodworld.in' },
    ],
  },
  {
    label: 'Hotels & Restaurants',
    brands: [
      { name: 'Holiday Inn',            logo: 'https://logo.clearbit.com/holidayinn.com' },
      { name: 'The Claridges',          logo: 'https://logo.clearbit.com/claridges.in' },
      { name: 'Hilton',                 logo: 'https://logo.clearbit.com/hilton.com' },
      { name: 'ibis',                   logo: 'https://logo.clearbit.com/ibis.com' },
      { name: 'Ramada',                 logo: 'https://logo.clearbit.com/ramada.com' },
      { name: 'Mövenpick',              logo: 'https://logo.clearbit.com/movenpick.com' },
      { name: 'Courtyard by Marriott',  logo: 'https://logo.clearbit.com/marriott.com' },
      { name: 'Honest',                 logo: 'https://logo.clearbit.com/honest.com' },
      { name: 'MahaMahel',              logo: 'https://logo.clearbit.com/mahamahel.com' },
      { name: 'Salwa Family Restaurant',logo: 'https://logo.clearbit.com/salwarestaurant.com' },
    ],
  },
  {
    label: 'Food & Beverage',
    brands: [
      { name: 'Baskin Robbins', logo: '/logos/baskin-robbins.webp' },
      { name: 'Arun Icecreams', logo: '/logos/arun-icecreams.png' },
      { name: 'Amul',           logo: '/logos/amul.webp' },
      { name: "Dinshaw's",      logo: 'https://logo.clearbit.com/dinshaws.com' },
      { name: 'Vadilal',        logo: 'https://logo.clearbit.com/vadilal.com' },
      { name: "Nirula's",       logo: 'https://logo.clearbit.com/nirulas.com' },
      { name: 'Häagen-Dazs',    logo: 'https://logo.clearbit.com/haagen-dazs.com' },
      { name: 'Ranbaxy',        logo: 'https://logo.clearbit.com/ranbaxy.com' },
    ],
  },
  {
    label: 'Corporate & Entertainment',
    brands: [
      { name: 'Torrent',          logo: 'https://logo.clearbit.com/torrentpower.com' },
      { name: 'Pepsi',            logo: 'https://logo.clearbit.com/pepsi.com' },
      { name: 'Cremica',          logo: 'https://logo.clearbit.com/cremica.com' },
      { name: 'Infosys',          logo: 'https://logo.clearbit.com/infosys.com' },
      { name: 'Bharat Petroleum', logo: 'https://logo.clearbit.com/bharatpetroleum.in' },
      { name: 'Adlabs',           logo: '/logos/adlabs.png' },
      { name: 'PVR Cinemas',      logo: 'https://logo.clearbit.com/pvrcinemas.com' },
    ],
  },
];

function BrandPill({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="cust__pill">
      {!failed ? (
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
