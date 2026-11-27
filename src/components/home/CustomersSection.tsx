'use client';

const row1 = [
  'Easyday',
  'Reliance Fresh',
  "Spencer's",
  "Nature's Basket",
  'Aditya Birla Retail',
  'Foodworld',
  'Holiday Inn',
  'The Claridges',
  'Hilton',
  'ibis',
  'Ramada',
  'Mövenpick',
  'Courtyard by Marriott',
  'Baskin Robbins',
  'Arun Icecreams',
  'Amul',
];

const row2 = [
  "Dinshaw's",
  'Vadilal',
  "Nirula's",
  'Häagen-Dazs',
  'Ranbaxy',
  'Torrent',
  'Pepsi',
  'Cremica',
  'Infosys',
  'Bharat Petroleum',
  'Adlabs',
  'PVR Cinemas',
  'Honest',
  'MahaMahel',
  'Salwa Family Restaurant',
];

function BrandPill({ name }: { name: string }) {
  return <div className="cust__pill"><span className="cust__name">{name}</span></div>;
}

function MarqueeRow({ brands, reverse }: { brands: string[]; reverse?: boolean }) {
  const doubled = [...brands, ...brands];
  return (
    <div className={`cust__row-wrap${reverse ? ' cust__row-wrap--reverse' : ''}`}>
      <div className={`cust__track${reverse ? ' cust__track--reverse' : ''}`}>
        {doubled.map((name, i) => (
          <BrandPill key={`${name}-${i}`} name={name} />
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
