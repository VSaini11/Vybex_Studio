'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const marqueeItems = [
  'Scalable Digital Products',
  'Growth-Focused Development',
  'Premium UI/UX & Branding',
  'Engineered for Growth',
  'Brand Identity',
  'Web Development',
  'Growth-Focused Development',
  'Premium UI/UX & Branding',
  
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subStatus, setSubStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  return (
    <footer style={{ background: '#060606' }}>

      {/* ── Top scrolling marquee ── */}
      <div
        className="py-3 overflow-hidden border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <style>{`
          @keyframes footer-mq {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .footer-mq-track {
            display: flex;
            width: max-content;
            animation: footer-mq 22s linear infinite;
          }
        `}</style>
        <div
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="footer-mq-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 flex-shrink-0 mx-8"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{item}</span>
                {/* globe-ish decorative icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" opacity="0.6">
                  <circle cx="10" cy="10" r="8.5" stroke="#4ade80" strokeWidth="1.2" />
                  <ellipse cx="10" cy="10" rx="4.5" ry="8.5" stroke="#4ade80" strokeWidth="1.2" />
                  <line x1="1.5" y1="10" x2="18.5" y2="10" stroke="#4ade80" strokeWidth="1.2" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">

          {/* LEFT — CTA heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Let&apos;s Build Your Digital
              <br />
              Growth Engine{' '}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full align-middle ml-1"
                style={{ background: '#22c55e', verticalAlign: 'middle' }}
              >
                <ArrowRight size={20} color="#000" strokeWidth={2.5} />
              </motion.a>
            </h2>
          </motion.div>

          {/* RIGHT — Subscribe + Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* Subscribe */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Subscribe now</p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email || isSubmitting) return;
                  setIsSubmitting(true);
                  setSubStatus(null);
                  try {
                    const res = await fetch('/api/subscribe', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setSubStatus({ type: 'success', message: data.message });
                      setEmail('');
                    } else {
                      setSubStatus({ type: 'error', message: data.error });
                    }
                  } catch {
                    setSubStatus({ type: 'error', message: 'Network error. Please try again.' });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="flex items-center rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-10 h-10 mr-1 rounded-lg flex-shrink-0 transition-opacity"
                  style={{ background: '#22c55e', opacity: isSubmitting ? 0.5 : 1 }}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={15} color="#000" strokeWidth={2.5} />
                  )}
                </button>
              </form>
              {subStatus && (
                <p className={`text-xs mt-2 ${subStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {subStatus.message}
                </p>
              )}
            </div>

            {/* Links */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Links</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-gray-500 hover:text-green-400 transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-gray-500 hover:text-green-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-green-400 transition-colors"
                  >
                    Error 404
                  </a>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-600">
              © Vybex Studio · From branding to backend  &amp; — we build it right.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── Watermark "Aiss" ── */}
      <div className="relative overflow-hidden h-24 select-none pointer-events-none">
        <span
          className="absolute bottom-0 right-6 text-[120px] font-black leading-none"
          style={{ color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.04em' }}
        >
          Vybex Studio
        </span>
      </div>

    </footer>
  );
}
