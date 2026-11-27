'use client';
import { useState } from 'react';

const row1 = [
  { name: 'Holiday Inn',          domain: 'ihg.com' },
  { name: 'Hilton',               domain: 'hilton.com' },
  { name: 'ibis',                 domain: 'ibis.com' },
  { name: 'Ramada',               domain: 'ramada.com' },
  { name: 'Mövenpick',            domain: 'movenpick.com' },
  { name: 'Courtyard by Marriott',domain: 'marriott.com' },
  { name: 'The Claridges',        domain: 'claridges.com' },
  { name: 'Reliance Fresh',       domain: 'reliancefresh.com' },
  { name: "Spencer's",            domain: 'spencers.in' },
  { name: "Nature's Basket",      domain: 'naturesbasket.co.in' },
  { name: 'easyDay',              domain: 'bhartiretail.com' },
  { name: 'Foodworld',            domain: 'foodworld.in' },
];

const row2 = [
  { name: 'Amul',              domain: 'amul.com' },
  { name: 'Baskin-Robbins',    domain: 'baskinrobbins.com' },
  { name: "Dinshaw's",         domain: 'dinshaws.com' },
  { name: 'Vadilal',           domain: 'vadilalicecreams.com' },
  { name: "Nirula's",          domain: 'nirulas.com' },
  { name: 'Häagen-Dazs',       domain: 'haagen-dazs.com' },
  { name: 'Cremica',           domain: 'cremica.com' },
  { name: 'Pepsi',             domain: 'pepsi.com' },
  { name: 'Infosys',           domain: 'infosys.com' },
  { name: 'Bharat Petroleum',  domain: 'bharatpetroleum.in' },
  { name: 'Torrent',           domain: 'torrentpower.com' },
  { name: 'Ranbaxy',           domain: 'ranbaxy.com' },
];

function BrandPill({ name, domain }: { name: string; domain: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <div className="cust__pill">
      <div className="cust__logo-box">
        {!imgFailed ? (
          <img
            src={logoUrl}
            alt=""
            className="cust__logo"
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <span className="cust__name">{name}</span>
        )}
      </div>
    </div>
  );
}

function MarqueeRow({ brands, reverse }: { brands: typeof row1; reverse?: boolean }) {
  const doubled = [...brands, ...brands];
  return (
    <div className={`cust__row-wrap${reverse ? ' cust__row-wrap--reverse' : ''}`}>
      <div className={`cust__track${reverse ? ' cust__track--reverse' : ''}`}>
        {doubled.map((b, i) => (
          <BrandPill key={`${b.domain}-${i}`} name={b.name} domain={b.domain} />
        ))}
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
        <MarqueeRow brands={row1} />
        <MarqueeRow brands={row2} reverse />
      </div>
    </section>
  );
}
