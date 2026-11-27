'use client';

type Brand = { name: string; logo?: string };

const categories: { label: string; brands: Brand[] }[] = [
  {
    label: 'Retail',
    brands: [
      { name: 'Easyday' },
      { name: 'Reliance Fresh' },
      { name: "Spencer's" },
      { name: "Nature's Basket" },
      { name: 'Aditya Birla Retail', logo: '/logos/aditya-birla.webp' },
      { name: 'Foodworld' },
    ],
  },
  {
    label: 'Hotels & Restaurants',
    brands: [
      { name: 'Holiday Inn' },
      { name: 'The Claridges' },
      { name: 'Hilton' },
      { name: 'ibis' },
      { name: 'Ramada' },
      { name: 'Mövenpick' },
      { name: 'Courtyard by Marriott' },
      { name: 'Honest' },
      { name: 'MahaMahel' },
      { name: 'Salwa Family Restaurant' },
    ],
  },
  {
    label: 'Food & Beverage',
    brands: [
      { name: 'Baskin Robbins', logo: '/logos/baskin-robbins.webp' },
      { name: 'Arun Icecreams', logo: '/logos/arun-icecreams.png' },
      { name: 'Amul', logo: '/logos/amul.webp' },
      { name: "Dinshaw's" },
      { name: 'Vadilal' },
      { name: "Nirula's" },
      { name: 'Häagen-Dazs' },
      { name: 'Ranbaxy' },
    ],
  },
  {
    label: 'Corporate & Entertainment',
    brands: [
      { name: 'Torrent' },
      { name: 'Pepsi' },
      { name: 'Cremica' },
      { name: 'Infosys' },
      { name: 'Bharat Petroleum' },
      { name: 'Adlabs', logo: '/logos/adlabs.png' },
      { name: 'PVR Cinemas' },
    ],
  },
];

function BrandPill({ brand }: { brand: Brand }) {
  return (
    <div className="cust__pill">
      {brand.logo ? (
        <img src={brand.logo} alt={brand.name} className="cust__logo" loading="lazy" />
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
