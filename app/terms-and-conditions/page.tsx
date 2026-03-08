import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Vybex Studio',
  description: 'Terms and Conditions for Vybex Studio — read our terms of service.',
};

export default function TermsAndConditions() {
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
          <span style={{ color: '#4ade80' }}>Terms</span>{' '}
          <span className="text-white italic font-light">& Conditions</span>
        </h1>
        <p className="text-gray-500 text-sm mb-16">Last updated: March 8, 2026</p>

        <div className="space-y-12">
          <Section title="1. Acceptance of Terms">
            By accessing and using the Vybex Studio website and services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of
            these terms, you must not use our services.
          </Section>

          <Section title="2. Services">
            Vybex Studio provides digital products, web development, UI/UX design, branding, and related
            technology services. The scope, deliverables, and timelines for specific projects will be defined
            in individual agreements or statements of work between Vybex Studio and the client.
          </Section>

          <Section title="3. Intellectual Property">
            All content on this website — including but not limited to text, graphics, logos, images, code, and
            design — is the intellectual property of Vybex Studio unless otherwise stated. Upon full payment for
            a project, ownership of the final deliverables transfers to the client as specified in the project
            agreement.
          </Section>

          <Section title="4. User Obligations">
            You agree to use our website and services only for lawful purposes. You shall not attempt to gain
            unauthorized access to any part of our systems, interfere with the operation of the site, or use
            the services in a manner that infringes upon the rights of others.
          </Section>

          <Section title="5. Payment Terms">
            Payment terms, including amounts, schedules, and methods, will be outlined in individual project
            agreements. Unless otherwise agreed, a deposit may be required before work begins. Late payments
            may result in suspension of services.
          </Section>

          <Section title="6. Limitation of Liability">
            Vybex Studio shall not be liable for any indirect, incidental, special, or consequential damages
            arising out of or in connection with our services. Our total liability shall not exceed the amount
            paid by the client for the specific project in question.
          </Section>

          <Section title="7. Termination">
            Either party may terminate a project agreement with written notice. In the event of termination,
            the client shall pay for all work completed up to the date of termination. Vybex Studio reserves
            the right to retain work product until outstanding payments are settled.
          </Section>

          <Section title="8. Modifications">
            Vybex Studio reserves the right to update or modify these Terms and Conditions at any time.
            Changes will be effective immediately upon posting to this page. Your continued use of our
            services constitutes acceptance of any modifications.
          </Section>

          <Section title="9. Governing Law">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of
            India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction
            of the courts in India.
          </Section>

          <Section title="10. Contact">
            If you have any questions about these Terms and Conditions, please contact us at{' '}
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
