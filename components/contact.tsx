'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const cardStyle = {
    background: 'rgba(18,18,18,0.95)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '1rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '10px',
    color: '#e2e8f0',
    outline: 'none',
    fontSize: '14px',
  };

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* background glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Heading */}
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-black leading-tight mb-2 sm:mb-3">
              <span style={{ color: '#4ade80' }}>Go Ahead</span>
              <br />
              <span className="text-white italic font-light">— Ask us anything</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-10 max-w-xs">
              We&apos;re here to help you build, grow, and scale your digital presence.
            </p>

            {/* Contact information card */}
            <div className="p-4 sm:p-6" style={cardStyle}>
              <p className="text-white font-semibold text-sm mb-3 sm:mb-5">Contact Information</p>

              {/* Phone + Email row */}
              <div className="flex flex-wrap gap-3 mb-3">
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gray-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Phone size={14} color="#4ade80" />
                  +91-8829061103
                </div>
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gray-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Mail size={14} color="#4ade80" />
                  vybex.signal@gmail.com
                </div>
              </div>

              {/* Address row */}
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gray-300 w-fit"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <MapPin size={14} color="#4ade80" />
                India — Remote Worldwide
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-5 sm:p-7"
            style={cardStyle}
          >
            <p className="text-white font-semibold text-base mb-4 sm:mb-6">Get in Touch</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    style={inputStyle}
                    className="placeholder-gray-600 focus:border-green-500/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    style={inputStyle}
                    className="placeholder-gray-600 focus:border-green-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Write message here..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  className="placeholder-gray-600 focus:border-green-500/40 transition-colors"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm"
                style={
                  submitted
                    ? { background: '#16a34a', color: '#fff' }
                    : { background: '#fff', color: '#000' }
                }
              >
                {submitted ? 'Sent! ✓' : 'Submit'}
                {!submitted && (
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                    style={{ background: '#22c55e' }}
                  >
                    <ArrowRight size={14} color="#000" strokeWidth={2.5} />
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
