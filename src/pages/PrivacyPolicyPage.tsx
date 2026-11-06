import { seo } from '../config/site';

export function PrivacyPolicyPage() {
  return (
    <>
      <title>{`Privacy Policy | ${seo.title}`}</title>
      <meta name="description" content="Privacy policy for Raj Tandoor & Kitchen Equipment — how we collect, use, and protect your data." />

      <main id="main" tabIndex={-1} className="page-main">
        <div className="container policy-page">
          <h1 className="page-h1">Privacy Policy</h1>
          <p className="policy-updated">Last updated: November 2024</p>

          <section>
            <h2>Information We Collect</h2>
            <p>When you use this website, we may collect the following types of information:</p>
            <ul>
              <li><strong>Account information:</strong> Name, email address, and phone number when you create an account.</li>
              <li><strong>Enquiry information:</strong> Business name, product interest, quantity, and other details you provide in contact or quote forms.</li>
              <li><strong>Order information:</strong> Items enquired about, delivery address, and order status.</li>
              <li><strong>Usage data:</strong> Pages visited, browser type, and IP address, collected automatically for website analytics.</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to your enquiries and process your orders</li>
              <li>To manage your account and provide customer support</li>
              <li>To improve our website and services</li>
              <li>To send transactional communications related to your orders</li>
            </ul>
            <p>We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>This website uses session cookies required for authentication (stored as httpOnly cookies). We do not use third-party advertising cookies. You can disable cookies in your browser settings, but this will prevent you from logging in to your account.</p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>We retain your account data for as long as your account is active. Enquiry and order data is retained for a reasonable period for business and legal purposes. You may request deletion of your account by contacting us.</p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact us through our <a href="/contact">contact page</a>.</p>
          </section>

          <section>
            <h2>Security</h2>
            <p>We use industry-standard security practices including hashed passwords, httpOnly session cookies, and HTTPS to protect your data. No system is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes will be reflected by an updated date at the top of this page.</p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For privacy-related queries, please use our <a href="/contact">contact page</a>.</p>
          </section>
        </div>
      </main>
    </>
  );
}
