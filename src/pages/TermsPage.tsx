import { seo } from '../config/site';

export function TermsPage() {
  return (
    <>
      <title>{`Terms &amp; Conditions | ${seo.title}`}</title>
      <meta name="description" content="Terms and conditions for using the Raj Tandoor & Kitchen Equipment website." />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container policy-page">
          <h1 className="page-h1">Terms &amp; Conditions</h1>
          <p className="policy-updated">Last updated: November 2024</p>

          <section>
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using this website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.</p>
          </section>

          <section>
            <h2>Use of This Website</h2>
            <p>This website is intended for business customers and individuals seeking commercial kitchen equipment. You agree to use this website only for lawful purposes and in accordance with these terms.</p>
            <p>You must not use this website to:</p>
            <ul>
              <li>Transmit any unsolicited or unauthorised advertising material</li>
              <li>Attempt to gain unauthorised access to any part of the website</li>
              <li>Submit false or misleading information in forms or accounts</li>
            </ul>
          </section>

          <section>
            <h2>Enquiry-Based Ordering</h2>
            <p>All orders placed through this website are enquiries. Submitting an order does not constitute a binding contract of sale. A sale is concluded only after our team confirms availability, pricing, and delivery arrangements with you directly.</p>
          </section>

          <section>
            <h2>Product Information</h2>
            <p>We make every effort to ensure product information on this website is accurate. However, specifications and availability are subject to change without notice. Photographs are representative and actual products may vary slightly.</p>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>All content on this website — including text, images, logos, and design — is the property of Raj Tandoor &amp; Kitchen Equipment or its licensors and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without prior written permission.</p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of this website or any products purchased through it.</p>
          </section>

          <section>
            <h2>Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes arising from these terms or your use of this website shall be subject to the jurisdiction of the courts of India.</p>
          </section>

          <section>
            <h2>Changes to These Terms</h2>
            <p>We reserve the right to update these terms at any time. Changes will be reflected by an updated date at the top of this page. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For queries about these terms, please use our <a href="/contact">contact page</a>.</p>
          </section>
        </div>
      </main>
    </>
  );
}
