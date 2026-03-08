import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vybex Studio',
  description: 'Privacy Policy for Vybex Studio — learn how we handle your data.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background grain */}
      <div className="fixed inset-0 pointer-events-none grain" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-400 transition-colors mb-12"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
          <span style={{ color: '#4ade80' }}>Privacy</span>{' '}
          <span className="text-white italic font-light">Policy</span>
        </h1>
        <p className="text-gray-500 text-sm mb-16">Last updated: March 8, 2026</p>

        <div className="space-y-12">
          <Section title="1. Information We Collect">
            We may collect information you provide directly to us, including your name, email address, and
            any message content submitted through our contact form. We also automatically collect certain
            technical information such as your browser type, device information, and IP address when you
            visit our website.
          </Section>

          <Section title="2. How We Use Your Information">
            We use the information we collect to respond to your inquiries and communications, provide and
            improve our services, send newsletters or updates (if you have opted in), analyze website usage
            to improve user experience, and comply with legal obligations.
          </Section>

          <Section title="3. Information Sharing">
            We do not sell, trade, or rent your personal information to third parties. We may share your
            information with trusted service providers who assist us in operating our website and conducting
            our business, provided they agree to keep this information confidential. We may also disclose
            information when required by law or to protect our rights.
          </Section>

          <Section title="4. Cookies and Tracking">
            Our website may use cookies and similar tracking technologies to enhance your browsing experience,
            analyze site traffic, and understand where our visitors come from. You can control cookie
            preferences through your browser settings. Disabling cookies may limit certain features of our website.
          </Section>

          <Section title="5. Data Security">
            We implement appropriate technical and organizational measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
            absolute security.
          </Section>

          <Section title="6. Third-Party Links">
            Our website may contain links to third-party websites or services. We are not responsible for the
            privacy practices or content of these external sites. We encourage you to read the privacy policies
            of any third-party sites you visit.
          </Section>

          <Section title="7. Data Retention">
            We retain your personal information only for as long as necessary to fulfill the purposes for
            which it was collected, or as required by applicable laws and regulations. When your data is
            no longer needed, we will securely delete or anonymize it.
          </Section>

          <Section title="8. Your Rights">
            You have the right to access, correct, or delete your personal information held by us. You may
            also request that we restrict the processing of your data or object to certain uses. To exercise
            these rights, please contact us using the details provided below.
          </Section>

          <Section title="9. Children&rsquo;s Privacy">
            Our services are not directed at individuals under the age of 13. We do not knowingly collect
            personal information from children. If we become aware that we have inadvertently collected data
            from a child, we will take steps to delete it promptly.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with
            an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically
            to stay informed about how we protect your information.
          </Section>

          <Section title="11. Contact Us">
            If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
            <a href="mailto:vybex.signal@gmail.com" className="text-green-400 hover:underline">
              vybex.signal@gmail.com
            </a>.
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <p className="text-sm leading-relaxed text-gray-400">{children}</p>
    </div>
  );
}
