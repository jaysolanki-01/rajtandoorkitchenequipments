import { useId, useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'What types of tandoors are available?',
    a: 'Raj Tandoor currently offers stainless-steel cylindrical tandoors designed for commercial kitchen use. Product details, available models, and specifications are available on the product pages or by contacting us directly.',
  },
  {
    q: 'How do I choose the right tandoor for my restaurant?',
    a: 'The right tandoor depends on your kitchen space, fuel type preference, intended cooking application, and required capacity. Review the product specifications and contact the Raj Tandoor team to discuss your specific requirements before ordering.',
  },
  {
    q: 'What is the difference between gas and traditional tandoors?',
    a: 'Traditional tandoors use solid fuel (wood or charcoal) to generate heat, while gas tandoors connect to a gas supply for more controllable, consistent temperatures. The appropriate choice depends on your kitchen setup, fuel availability, and local safety regulations. Confirm the fuel type of any product before purchasing.',
  },
  {
    q: 'Where can I find the dimensions and specifications of a product?',
    a: 'Product specifications are listed on individual product pages where available. For products without published specifications, contact the Raj Tandoor team directly to request detailed specifications before making a purchase decision.',
  },
  {
    q: 'Can I request a quotation for commercial kitchen equipment?',
    a: 'Yes. Use the Request a Quote form to describe your requirements, including the product of interest, quantity, and any specific needs. The Raj Tandoor team will respond with a quotation.',
  },
  {
    q: 'How can I enquire about bulk orders?',
    a: 'Contact the Raj Tandoor team using the enquiry form or the contact details provided. Describe the quantity and specification requirements, and the team will assist with your enquiry.',
  },
  {
    q: 'How can I find out about delivery options?',
    a: 'Delivery options, timelines, and costs vary depending on the product, quantity, and destination. Contact the Raj Tandoor team to discuss delivery arrangements for your order.',
  },
  {
    q: 'Is product installation or after-sales assistance available?',
    a: 'Contact the Raj Tandoor team to enquire about available installation assistance and after-sales support for the product you are considering.',
  },
  {
    q: 'How do I add a product to my wishlist?',
    a: 'Click the heart icon on any product card or product detail page to add or remove it from your wishlist. Your wishlist is stored in your browser and does not require an account.',
  },
  {
    q: 'How can I contact Raj Tandoor?',
    a: 'Use the Contact Us form on this website to send your enquiry. The Raj Tandoor team will respond as soon as possible.',
  },
];

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ id, question, answer, isOpen, onToggle }: FAQItemProps) {
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <h3 className="faq-item__heading">
        <button
          id={btnId}
          type="button"
          className="faq-item__btn"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{question}</span>
          <svg
            className="faq-item__icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points={isOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="faq-item__panel"
        hidden={!isOpen}
      >
        <p className="faq-item__answer">{answer}</p>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((v) => (v === i ? null : i));

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Common questions about our products and services. For anything not covered here,{' '}
            <Link to="/contact">contact us</Link>.
          </p>
        </div>

        <div className="faq-list" role="list">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              id={`${baseId}-${i}`}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
