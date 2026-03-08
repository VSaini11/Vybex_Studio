'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';

export function About() {
  const { ref, isInView } = useScrollAnimation();

  const stats = [
    { value: '15+ ', label: 'Projects Delivered' },
    { value: '4.9★', label: 'Average Client Rating' },
  ];

  return (
    <section id="about" ref={ref} className="py-14 sm:py-24" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Headline ─────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-8 sm:mb-14 max-w-4xl"
        >
          From{' '}
          <span style={{ backgroundImage: 'linear-gradient(135deg,#4ade80,#22c55e)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            strategy
          </span>{' '}
          to execution,{' '}
          <em className="not-italic" style={{ backgroundImage: 'linear-gradient(135deg,#4ade80,#22c55e)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            we build
          </em>{' '}
          digital systems that drive growth
        </motion.h2>

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* LEFT — big visual card with orb + stat */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg,#0f1e10 0%,#081208 50%,#0a0a0a 100%)',
              border: '1px solid #1c1c1c',
              minHeight: '260px',
            }}
          >
            {/* Subtle grid lines */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Vertical stripe accent (like the reference image) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-30">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="absolute inset-y-0 rounded-full"
                  style={{ left: `${i * 14}%`, width: '8px', background: `linear-gradient(180deg,transparent,rgba(34,197,94,${0.15 + i * 0.04}),transparent)` }} />
              ))}
            </div>

            {/* Glowing orb */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ paddingRight: '30%' }}>
              <motion.div
                className="relative"
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* outer glow */}
                <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle,rgba(34,197,94,0.25) 0%,transparent 70%)', transform: 'scale(1.6)' }} />
                {/* orb */}
                <div className="w-24 sm:w-36 h-24 sm:h-36 rounded-full relative"
                  style={{ background: 'radial-gradient(circle at 35% 30%,#4ade80 0%,#16a34a 35%,#052e16 70%,#010a01 100%)', boxShadow: '0 0 50px rgba(34,197,94,0.35),0 0 100px rgba(34,197,94,0.1),inset 0 0 30px rgba(0,0,0,0.5)' }}>
                  {/* highlight */}
                  <div className="absolute rounded-full" style={{ top: '22%', left: '24%', width: '22%', height: '14%', background: 'rgba(255,255,255,0.3)', filter: 'blur(3px)', transform: 'rotate(-30deg)' }} />
                </div>
              </motion.div>
            </div>

            {/* Stat overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-24" style={{ background: 'linear-gradient(to top,rgba(5,12,5,0.95) 60%,transparent)' }}>
              <div className="text-2xl sm:text-4xl font-black text-white">15+</div>
              <div className="text-xs sm:text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Projects Delivered</div>
            </div>
          </motion.div>

          {/* RIGHT — text + stat boxes + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Subtitle */}
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              We create modern digital solutions that help startups and businesses move faster, convert better, and scale confidently — combining clean engineering, premium design, and growth-focused thinking.
            </p>

            {/* Stat boxes */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5"
                  style={{ background: '#111111', border: '1px solid #1e1e1e' }}
                >
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">{s.value}</div>
                  <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Extra stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl p-5"
              style={{ background: '#111111', border: '1px solid #1e1e1e' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">100%</div>
              <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>On-time delivery track record</div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold text-white"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Get Started Now
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#4ade80,#22c55e)' }}
                >
                  <ArrowRight size={14} className="text-black" />
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
