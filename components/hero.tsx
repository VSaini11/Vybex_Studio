'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const featurePills = [
  'Web Development',
  'UI/UX & Branding',
  'Next.js & React',
  'TypeScript',
  'Performance SEO',
  'Branding',
  'Growth Strategy',
];

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  } as const;

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 sm:pt-20 relative overflow-hidden">
      {/* Background glow blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-6 items-center lg:min-h-[80vh]">

          {/* LEFT — Headline + CTA */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left pt-2 lg:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-black leading-tight text-white mb-4">
                I Build{' '}
                <span className="text-green-400">Impactful</span>
                <br />
                <span className="italic font-light text-gray-300">— Digital Products</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed"
            >
              I help startups and businesses grow with conversion-focused websites, powerful branding, and scalable digital systems.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm text-black"
                style={{
                  background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                  boxShadow: '0 0 24px rgba(34,197,94,0.35)',
                }}
              >
                Get Started Now
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.04, borderColor: 'rgba(74,222,128,0.6)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm text-white border border-green-500/30 transition-colors"
              >
                View Work
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="mt-8 sm:mt-12 flex justify-center lg:justify-start gap-6 sm:gap-8">
              {[
                { value: '10+', label: 'Projects Delivered' },
                { value: '5/5', label: 'Client Satisfaction' },
                { value: '100%', label: 'On-Time Delivery' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">{s.value}</div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* CENTER + RIGHT — single overlapping zone (hidden on very small, visible from md) */}
          <div className="hidden md:flex lg:col-span-7 relative items-center" style={{ minHeight: '480px' }}>

            {/* ── Abstract geometric sphere (center, bleeds right) ── */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: '-8%', top: '50%', transform: 'translateY(-50%)', width: '58%', height: '400px', zIndex: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2 }}
            >
              {/* ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.06) 0%,transparent 70%)', filter: 'blur(28px)' }} />
              </div>

              {/* Static fine-line rings */}
              <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full" fill="none" style={{ opacity: 0.6 }}>
                <ellipse cx="150" cy="150" rx="128" ry="48" stroke="rgba(34,197,94,0.15)" strokeWidth="0.6" />
                <ellipse cx="150" cy="150" rx="106" ry="38" stroke="rgba(34,197,94,0.11)" strokeWidth="0.5" />
                <ellipse cx="150" cy="150" rx="84" ry="28" stroke="rgba(34,197,94,0.09)" strokeWidth="0.5" />
                <ellipse cx="150" cy="150" rx="46" ry="128" stroke="rgba(34,197,94,0.13)" strokeWidth="0.6" />
                <ellipse cx="150" cy="150" rx="36" ry="106" stroke="rgba(34,197,94,0.08)" strokeWidth="0.5" />
                <ellipse cx="150" cy="150" rx="128" ry="48" stroke="rgba(34,197,94,0.08)" strokeWidth="0.5" transform="rotate(50 150 150)" />
                <ellipse cx="150" cy="150" rx="128" ry="48" stroke="rgba(34,197,94,0.06)" strokeWidth="0.4" transform="rotate(-50 150 150)" />
                {/* Faint meridian lines */}
                <line x1="22" y1="150" x2="278" y2="150" stroke="rgba(34,197,94,0.05)" strokeWidth="0.4" />
                <line x1="150" y1="22" x2="150" y2="278" stroke="rgba(34,197,94,0.05)" strokeWidth="0.4" />
                {/* Centre node */}
                <circle cx="150" cy="150" r="2.5" fill="rgba(34,197,94,0.55)" />
                <circle cx="150" cy="150" r="6" stroke="rgba(34,197,94,0.18)" strokeWidth="0.7" fill="none" />
                <circle cx="150" cy="150" r="13" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" fill="none" />
                {/* Accent dots on orbits */}
                <circle cx="150" cy="22" r="1.8" fill="rgba(34,197,94,0.45)" />
                <circle cx="278" cy="150" r="1.5" fill="rgba(34,197,94,0.3)" />
                <circle cx="237" cy="90" r="1.2" fill="rgba(34,197,94,0.28)" />
                <circle cx="63" cy="210" r="1.2" fill="rgba(34,197,94,0.2)" />
              </svg>

              {/* Slow-rotating outer ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
                  <ellipse cx="150" cy="150" rx="118" ry="43" stroke="rgba(34,197,94,0.07)" strokeWidth="0.5" transform="rotate(18 150 150)" />
                  <circle cx="150" cy="32" r="1.8" fill="rgba(34,197,94,0.35)" />
                </svg>
              </motion.div>

              {/* Slow counter-rotating ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
                  <ellipse cx="150" cy="150" rx="95" ry="35" stroke="rgba(34,197,94,0.06)" strokeWidth="0.5" transform="rotate(-25 150 150)" />
                  <circle cx="150" cy="55" r="1.4" fill="rgba(34,197,94,0.28)" />
                </svg>
              </motion.div>

              {/* Breathing core glow */}
              <motion.div
                className="absolute"
                style={{ top: '50%', left: '50%', width: '90px', height: '90px', transform: 'translate(-50%,-50%)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.15) 0%,transparent 70%)', filter: 'blur(14px)' }} />
              </motion.div>

            </motion.div>

            {/* ── RIGHT Feature Card ───────────────────────────────── */}
            <motion.div
              className="absolute right-0"
              style={{ width: '65%', zIndex: 10 }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: 0.35 }}
            >
              <div
                className="rounded-2xl p-5 md:p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(9,13,9,0.88)',
                  border: '1px solid rgba(34,197,94,0.14)',
                  backdropFilter: 'blur(22px)',
                  boxShadow: '0 0 0 1px rgba(34,197,94,0.05), 0 24px 64px rgba(0,0,0,0.65)',
                }}
              >


                <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-5 leading-snug relative z-10">
                  Digital isn&apos;t the future.{' '}
                  <span className="text-green-400">It&apos;s the now.</span>
                </h3>

                <div className="flex flex-wrap gap-2 md:gap-2.5 relative z-10">
                  {featurePills.map((pill, i) => (
                    <motion.span
                      key={pill}
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm cursor-default"
                      style={{
                        border: '1px solid rgba(34,197,94,0.18)',
                        background: 'rgba(34,197,94,0.05)',
                        color: 'rgba(134,239,172,0.75)',
                      }}
                    >
                      {pill}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-4 md:mt-6 pt-4 md:pt-5 border-t relative z-10" style={{ borderColor: 'rgba(34,197,94,0.08)' }}>
                  <p className="text-xs text-gray-500">
                    Available for freelance &amp; consulting work —{' '}
                    <span className="text-green-400">Currently open</span>
                  </p>
                  <motion.div
                    className="inline-block w-2 h-2 bg-green-400 rounded-full ml-1"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ── Trusted-by marquee ───────────────────────────────── */}
      <style>{`
        @keyframes hero-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-mq-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: hero-marquee 28s linear infinite;
        }
      `}</style>

      <div className="relative mt-8 sm:mt-0 sm:absolute sm:bottom-0 left-0 right-0">
        <div className="py-5">
          {/* Full-width marquee, edge-to-edge */}
          <div
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
            }}
          >
            <div className="hero-mq-track">
              {[
                /* ── Replace with real client logos / names later ── */
                { name: 'Vybex.ai', icon: '⊕' },
                { name: 'GoLinkHub', icon: '✦' },
                { name: 'IntelliTrack', icon: '◎' },
                { name: 'DwV Brand', icon: '⊛' },
                { name: 'TechCorp', icon: '◈' },
                { name: 'SafeDrop', icon: '⬡' },
                { name: 'ZeroDup', icon: '◆' },
                { name: 'NovaSoft', icon: '◉' },
                /* ── duplicate for seamless loop ── */
                { name: 'Vybex.ai', icon: '⊕' },
                { name: 'GoLinkHub', icon: '✦' },
                { name: 'IntelliTrack', icon: '◎' },
                { name: 'DwV Brand', icon: '⊛' },
                { name: 'TechCorp', icon: '◈' },
                { name: 'SafeDrop', icon: '⬡' },
                { name: 'ZeroDup', icon: '◆' },
                { name: 'NovaSoft', icon: '◉' },
              ].map(({ name, icon }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 flex-shrink-0"
                  style={{ marginLeft: '56px', marginRight: '56px' }}
                >
                  <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: 1 }}>{icon}</span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: 'rgba(255,255,255,0.88)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
