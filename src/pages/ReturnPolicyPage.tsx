import { seo } from '../config/site';

export function ReturnPolicyPage() {
  return (
    <>
      <title>{`Return &amp; Refund Policy | ${seo.title}`}</title>
      <meta name="description" content="Return and refund policy for Raj Tandoor & Kitchen Equipment." />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container policy-page">
          <h1 className="page-h1">Return &amp; Refund Policy</h1>
          <p className="policy-updated">Last updated: November 2024</p>

          <section>
            <h2>Returns</h2>
            <p>We want you to be completely satisfied with your purchase. If you receive a product that is defective, damaged in transit, or materially different from what was ordered, you may request a return within 7 days of delivery.</p>
            <p>Returns are not accepted for products that have been installed, used, or modified.</p>
          </section>

          <section>
            <h2>How to Initiate a Return</h2>
            <ol>
              <li>Contact us via the <a href="/contact">contact page</a> within 7 days of receiving your order.</li>
              <li>Provide your order number, a description of the issue, and photographs of the product.</li>
              <li>Our team will review your request and respond within 3 business days.</li>
              <li>If your return is approved, we will arrange for collection and provide further instructions.</li>
            </ol>
          </section>

          <section>
            <h2>Refunds</h2>
            <p>Once a return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed within 7–10 business days using the original payment method where applicable.</p>
          </section>

          <section>
            <h2>Exclusions</h2>
            <ul>
              <li>Custom or made-to-order products cannot be returned unless defective.</li>
              <li>Products damaged due to misuse, improper installation, or neglect are not eligible for return.</li>
              <li>Consumables and accessories may not be eligible for return once opened.</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For return and refund enquiries, please use our <a href="/contact">contact page</a>.</p>
          </section>
        </div>
      </main>
    </>
  );
}
