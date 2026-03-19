'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Merchandise', href: '/merchandise' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      {/* ── Pill container ── */}
      <div
        className="w-full max-w-4xl flex items-center justify-between px-4 py-2.5 rounded-full"
        style={{
          background: 'rgba(14, 14, 14, 0.92)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0">
          {/* Triangle / pyramid icon */}

          <span className="text-white font-bold text-lg tracking-tight">Vybex Studio</span>
        </a>

        {/* Desktop nav links — centered */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              whileHover={{ color: '#ffffff' }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA — "Let's Talk" with green arrow circle */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden md:flex items-center gap-2 pl-5 pr-2 py-2 rounded-full text-sm font-semibold text-white flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Let&apos;s Talk
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
            style={{ background: '#22c55e' }}
          >
            <ArrowRight size={14} color="#000" strokeWidth={2.5} />
          </span>
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(14,14,14,0.97)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-white"
                style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                Let&apos;s Talk <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
