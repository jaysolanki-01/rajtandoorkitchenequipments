import { Link } from 'react-router-dom';

const considerations = [
  {
    num: '01',
    title: 'Kitchen & Installation Requirements',
    body: 'Consider ventilation, fuel supply connections, and any structural requirements of your kitchen space before selecting a tandoor model.',
  },
  {
    num: '02',
    title: 'Preferred Fuel Type',
    body: 'Tandoors can operate on solid fuel (wood or charcoal) or gas. Confirm which fuel type is appropriate for your premises and local regulations.',
  },
  {
    num: '03',
    title: 'Available Space',
    body: 'Measure the available floor area and height clearance. Check the product dimensions against your kitchen layout before ordering.',
  },
  {
    num: '04',
    title: 'Intended Cooking Application',
    body: 'Different cooking applications — naan bread, tandoori chicken, kebabs, or mixed menus — may have different equipment requirements. Discuss these with the Raj Tandoor team.',
  },
  {
    num: '05',
    title: 'Product Dimensions & Capacity',
    body: 'Review the available specifications for each product. Contact us if you need information about a specific dimension, capacity, or output requirement.',
  },
  {
    num: '06',
    title: 'Installation & Service Support',
    body: 'Ask the Raj Tandoor team about any available assistance with installation, commissioning, and ongoing maintenance before purchasing.',
  },
];

export function ChooseTandoorGuide() {
  return (
    <section className="guide-section" aria-labelledby="guide-heading">
      <div className="container">
        <div className="guide-section__inner">
          <div className="guide-section__header">
            <h2 id="guide-heading" className="section-title">Find the Right Tandoor for Your Kitchen</h2>
            <p className="section-subtitle">
              Choosing commercial kitchen equipment requires careful consideration. Here are the key factors to evaluate.
            </p>
          </div>

          <ol className="guide-grid" role="list" aria-label="Buying considerations">
            {considerations.map((c) => (
              <li key={c.num} className="guide-card">
                <span className="guide-card__num" aria-hidden="true">{c.num}</span>
                <h3 className="guide-card__title">{c.title}</h3>
                <p className="guide-card__body">{c.body}</p>
              </li>
            ))}
          </ol>

          <div className="guide-section__cta">
            <p>Always verify specifications against current product details before ordering.</p>
            <Link to="/contact" className="btn btn--gold btn--lg">
              Need Help Choosing? Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
