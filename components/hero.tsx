'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Play } from 'lucide-react';
import { useState } from 'react';
import { FeedbackModal } from './feedback-modal';

export function Hero({
  totalFeedbacks = 0,
  averageRating = 0,
  feedbackInitials = []
}: {
  totalFeedbacks?: number;
  averageRating?: number;
  feedbackInitials?: string[];
}) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  } as const;

  return (
    <section className="min-h-dvh flex flex-col justify-between pt-24 sm:pt-28 relative overflow-hidden bg-black text-white">
      {/* ── Dim Atmospheric Background Image ─────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/hero-arch-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-right lg:object-center opacity-30 brightness-90 filter"
        />
        {/* Soft edge gradients so image blends into pure black */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      {/* ── Main Hero Content (2-Column Grid) ───────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Text, CTA, and Stats ───────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Kicker badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
                Digital Experience Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Where ideas <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-emerald-400">
                  become digital.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-[14px] font-medium tracking-wider text-zinc-400 max-w-xl mb-8 sm:mb-10 leading-relaxed uppercase"
            >
              We design and build high-performance websites, brands and digital systems for ambitious startups and businesses.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10 sm:mb-12 w-full sm:w-auto"
            >
              <motion.a
                href="mailto:vaibhavsaini709@gmail.com?subject=Project%20Inquiry%20-%20Vybex%20Studio"
                onClick={(e) => {
                  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                  if (!isMobile) {
                    window.open(
                      'https://mail.google.com/mail/?view=cm&fs=1&to=vaibhavsaini709@gmail.com&su=Project%20Inquiry%20-%20Vybex%20Studio',
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(34,197,94,0.45)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-black transition-all shadow-lg cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                }}
              >
                Start a project
                <ArrowRight size={17} className="rotate-[-45deg]" />
              </motion.a>

              <motion.button
                onClick={() => setIsFeedbackOpen(true)}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base text-zinc-300 border border-white/10 bg-white/5 backdrop-blur-md transition-all cursor-pointer"
              >
                <Play size={13} className="fill-current text-zinc-300" />
                Feedback
              </motion.button>
            </motion.div>

            {/* Social Proof Badges with Initials and Star Rating */}
            <motion.div
              variants={itemVariants}
              className="mt-2 flex items-center gap-3.5 sm:gap-4"
            >
              <div className="flex -space-x-2.5 sm:-space-x-3">
                {feedbackInitials.length > 0 ? (
                  feedbackInitials.slice(0, 4).map((initial, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden relative shadow-lg"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          i % 2 === 0
                            ? 'from-green-600/50 to-emerald-600/50'
                            : 'from-blue-600/50 to-teal-600/50'
                        }`}
                      />
                      <span className="relative z-10 text-[9px] sm:text-[11px] font-black text-white">
                        {initial}
                      </span>
                    </div>
                  ))
                ) : (
                  ['D', 'D', 'N', 'S'].map((char, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden relative shadow-lg"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          i % 2 === 0
                            ? 'from-green-600/50 to-emerald-600/50'
                            : 'from-blue-600/50 to-teal-600/50'
                        }`}
                      />
                      <span className="relative z-10 text-[9px] sm:text-[11px] font-black text-white">
                        {char}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      className={`sm:w-[15px] sm:h-[15px] ${
                        star <= Math.round(averageRating || 5)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-black text-white ml-0.5">
                  {averageRating > 0 ? averageRating.toFixed(1) : '4.8'}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Transformation Banner Image (Hidden on Mobile) ────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.25 }}
            className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end items-center relative mt-4 lg:mt-0"
          >
            {/* Ambient soft glow backdrop */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
            
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-[460px] sm:max-w-[520px] lg:max-w-none"
            >
              <img
                src="/ChatGPT Image Sep 20, 2026, 10_43_36 AM.png"
                alt="Vybex Studio Transformation"
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.85)] filter brightness-105"
              />
            </motion.div>
          </motion.div>

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
          animation: hero-marquee 30s linear infinite;
        }
      `}</style>

      <div className="relative z-10 w-full py-6 lg:py-8 mt-auto">
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <div className="hero-mq-track">
            {[
              { name: 'Vybex.ai', icon: '⊕' },
              { name: 'GoLinkHub', icon: '✦' },
              { name: 'IntelliTrack', icon: '◎' },
              { name: 'DwV Brand', icon: '⊛' },
              { name: 'TechCorp', icon: '◈' },
              { name: 'SafeDrop', icon: '⬡' },
              { name: 'ZeroDup', icon: '◆' },
              { name: 'NovaSoft', icon: '◉' },
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
                className="flex items-center gap-3 mx-10 opacity-30 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-xl text-white">{icon}</span>
                <span className="text-sm font-bold tracking-wider text-white uppercase">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </section>
  );
}
