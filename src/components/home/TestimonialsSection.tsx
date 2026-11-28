'use client';

type Review = {
  name: string;
  business: string;
  city: string;
  text: string;
  initial: string;
  color: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: 'Rajan Mehta',
    business: 'Mehta's Dhaba',
    city: 'Ahmedabad',
    text: 'Our charcoal tandoor from Raj Tandoor has been running non-stop for 2 years. The build quality is exceptional — perfect heat retention and no maintenance issues at all.',
    initial: 'R',
    color: '#c3a268',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    business: 'Spice Route Caterers',
    city: 'Delhi',
    text: 'We ordered 4 clay tandoors for our catering fleet. Delivered on time, perfectly packed. The naans we make get compliments at every event. Highly recommend!',
    initial: 'P',
    color: '#5b7fa6',
    rating: 5,
  },
  {
    name: 'Suresh Patel',
    business: 'Hotel Grand Residency',
    city: 'Surat',
    text: 'Installed their commercial gas tandoor in our restaurant kitchen. Temperature control is precise, and the stainless body has held up beautifully even with daily heavy use.',
    initial: 'S',
    color: '#7a9e7e',
    rating: 5,
  },
  {
    name: 'Ananya Krishnan',
    business: 'The Tandoor House',
    city: 'Bengaluru',
    text: 'Raj Tandoor understood exactly what a commercial kitchen needs. Fast delivery to Bengaluru, great after-sales support. Our kitchen output doubled after switching.',
    initial: 'A',
    color: '#b06b6b',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    business: 'Singh's Punjabi Kitchen',
    city: 'Ludhiana',
    text: 'As a Punjabi restaurant, we're very particular about our tandoor. The clay pot quality from Raj Tandoor is authentic — the roti and tandoori chicken taste exactly right.',
    initial: 'V',
    color: '#8b6fbf',
    rating: 5,
  },
  {
    name: 'Meera Joshi',
    business: 'Flavours of India',
    city: 'Pune',
    text: 'Ordered the drum tandoor for our outdoor catering setup. It is portable, heats up quickly, and the team guided us on the right size for our event capacity. Very satisfied.',
    initial: 'M',
    color: '#c37a3a',
    rating: 5,
  },
  {
    name: 'Ramesh Agarwal',
    business: 'Agarwal Banquet Hall',
    city: 'Jaipur',
    text: 'We've been using Raj Tandoor equipment for all our banquet events. 3 years, zero breakdowns. Their stainless steel tandoors are worth every rupee. Pure value for money.',
    initial: 'R',
    color: '#4a8fa8',
    rating: 5,
  },
  {
    name: 'Deepika Nair',
    business: 'Malabar Kitchen Co.',
    city: 'Kochi',
    text: 'Raj Tandoor shipped to Kerala with no hassle. The gas tandoor is compact yet powerful. Our customers are amazed at the quality of naans coming out of it every day.',
    initial: 'D',
    color: '#6b8b5a',
    rating: 5,
  },
  {
    name: 'Amit Thakur',
    business: 'Thakur Food Court',
    city: 'Chandigarh',
    text: 'Running a food court means high volume cooking. Raj Tandoor's commercial models handle the pressure perfectly. We've ordered 3 units so far and are planning a 4th.',
    initial: 'A',
    color: '#b07a5a',
    rating: 5,
  },
  {
    name: 'Sunita Reddy',
    business: 'Reddy's Cloud Kitchen',
    city: 'Hyderabad',
    text: 'Switched from a local vendor to Raj Tandoor and the difference is massive. Consistent heat, easy to clean, and the team was super responsive with technical queries.',
    initial: 'S',
    color: '#7060a8',
    rating: 5,
  },
  {
    name: 'Harsh Desai',
    business: 'Desai Hospitality Group',
    city: 'Vadodara',
    text: 'Raj Tandoor is now our go-to supplier for all kitchen equipment. Quality, pricing, and delivery — everything is top notch. Our head chef personally recommends them.',
    initial: 'H',
    color: '#5a8080',
    rating: 5,
  },
  {
    name: 'Kavya Pillai',
    business: 'Pillai's Catering Services',
    city: 'Chennai',
    text: 'Managing large-scale catering events is tough. Raj Tandoor's portable units have made our setup so much easier. Reliable, durable, and great customer service throughout.',
    initial: 'K',
    color: '#a06878',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="tmn-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="tmn-card">
      <Stars count={review.rating} />
      <p className="tmn-card__text">"{review.text}"</p>
      <div className="tmn-card__author">
        <span className="tmn-card__avatar" style={{ background: review.color }}>
          {review.initial}
        </span>
        <div className="tmn-card__meta">
          <span className="tmn-card__name">{review.name}</span>
          <span className="tmn-card__biz">{review.business} · {review.city}</span>
        </div>
      </div>
    </div>
  );
}

function Column({ items, direction }: { items: Review[]; direction: 'up' | 'down' }) {
  const doubled = [...items, ...items];
  return (
    <div className="tmn-col-wrap">
      <div className={`tmn-col tmn-col--${direction}`}>
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const col1 = reviews.slice(0, 4);
  const col2 = reviews.slice(4, 8);
  const col3 = reviews.slice(8, 12);

  return (
    <section className="tmn" aria-labelledby="tmn-heading">
      <div className="tmn__header container">
        <span className="tmn__eyebrow">What Our Customers Say</span>
        <h2 id="tmn-heading" className="tmn__h2">Trusted Across India's Best Kitchens</h2>
        <p className="tmn__sub">From 5-star hotels to neighbourhood dhabas — here's what our customers have to say.</p>
      </div>

      <div className="tmn__grid" aria-hidden="true">
        <Column items={col1} direction="up" />
        <Column items={col2} direction="down" />
        <Column items={col3} direction="up" />
      </div>
    </section>
  );
}
