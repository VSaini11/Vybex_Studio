'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { FeedbackModal } from './feedback-modal';

const featurePills = [
  'Web Development',
  'UI/UX & Branding',
  'Next.js & React',
  'TypeScript',
  'Performance SEO',
  'Branding',
  'Growth Strategy',
];

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
    <section className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Background glow blobs - refined */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-6">
              I Build <span className="text-green-400">Impactful</span>
              <br />
              <span className="italic font-light text-gray-300 opacity-90">— Digital Products</span>
            </h1>
          </motion.div>

          {/* Subheader */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I help startups and businesses grow with conversion-focused websites, powerful branding, and scalable digital systems.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <motion.a
              href="mailto:vaibhavsaini709@gmail.com"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(34,197,94,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-black bg-green-400 w-[240px] sm:w-[280px] transition-all"
              style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              }}
            >
              Get Started Now
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
            <motion.button
              onClick={() => setIsFeedbackOpen(true)}
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-white border border-white/10 w-[240px] sm:w-[280px] backdrop-blur-sm transition-all"
            >
              Feedback
            </motion.button>
          </motion.div>

          {/* Social Proof Card */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 sm:mt-12 w-full flex justify-center scale-90 sm:scale-100"
          >
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex -space-x-2.5 sm:-space-x-3">
                {feedbackInitials.length > 0 ? (
                  feedbackInitials.slice(0, 4).map((initial, i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#090909] bg-zinc-800 flex items-center justify-center overflow-hidden relative shadow-lg">
                      <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-green-600/40 to-emerald-600/40' : 'from-blue-600/40 to-teal-600/40'}`} />
                      <span className="relative z-10 text-[9px] sm:text-[11px] font-black text-white/90">{initial}</span>
                    </div>
                  ))
                ) : (
                  [1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#090909] bg-zinc-800" />
                  ))
                )}
              </div>
              
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={12} 
                        className={`sm:w-[14px] sm:h-[14px] ${star <= Math.round(averageRating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-black text-white ml-1">
                    {averageRating > 0 ? averageRating.toFixed(1) : '5.0'}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-bold whitespace-nowrap">
                  from {totalFeedbacks >= 1 ? `${totalFeedbacks}+ happy clients` : 'Start your journey'} worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
      
      <div className="absolute bottom-0 left-0 right-0 py-8 lg:py-12">
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
