import { seo } from '../config/site';

export function ShippingPolicyPage() {
  return (
    <>
      <title>{`Shipping Policy | ${seo.title}`}</title>
      <meta name="description" content="Shipping and delivery information for Raj Tandoor & Kitchen Equipment orders." />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container policy-page">
          <h1 className="page-h1">Shipping Policy</h1>
          <p className="policy-updated">Last updated: November 2024</p>

          <section>
            <h2>Order Processing</h2>
            <p>All orders placed through this website are enquiry-based. After you submit an enquiry or place an order, our team will contact you within 2 business days to confirm availability, delivery timelines, and logistics arrangements.</p>
          </section>

          <section>
            <h2>Delivery Areas</h2>
            <p>We deliver commercial tandoors and kitchen equipment across India. Delivery to remote or hilly areas may require additional lead time. International enquiries are considered on a case-by-case basis.</p>
          </section>

          <section>
            <h2>Delivery Timelines</h2>
            <p>Estimated delivery times vary depending on the product, your location, and current order volumes. Our team will provide a specific delivery estimate when confirming your order.</p>
            <ul>
              <li>Standard delivery to major metros: typically 7–14 business days after order confirmation</li>
              <li>Delivery to other locations: 14–21 business days after order confirmation</li>
              <li>Custom or made-to-order products may require additional lead time</li>
            </ul>
          </section>

          <section>
            <h2>Shipping Charges</h2>
            <p>Shipping charges, if applicable, will be communicated to you during the order confirmation process. Charges depend on the product size, weight, and delivery destination.</p>
          </section>

          <section>
            <h2>Damage During Transit</h2>
            <p>All products are carefully packed to prevent transit damage. In the unlikely event that a product arrives damaged, please document the damage with photographs at the time of delivery and contact us within 48 hours.</p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For shipping-related queries, please use our <a href="/contact">contact page</a>.</p>
          </section>
        </div>
      </main>
    </>
  );
}
