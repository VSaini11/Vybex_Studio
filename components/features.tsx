'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CheckCircle } from 'lucide-react';

export function Features() {
  const { ref, isInView } = useScrollAnimation();

  const features = [
    'Quick turnaround times without compromising quality',
    'Transparent communication throughout the project',
    'Modern, scalable, and maintainable code',
    'SEO and performance optimization built-in',
    'Ongoing support and maintenance available',
    'Flexible engagement models for your needs',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Why Work With Me</h2>
          <div className="h-1 w-20 rounded-full" style={{ background: 'linear-gradient(90deg, #4ade80, #22c55e)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={featureVariants}
                className="flex items-start gap-4"
                whileHover={{ x: 8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex-shrink-0 mt-0.5 text-green-400"
                >
                  <CheckCircle size={20} />
                </motion.div>
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: 'rgba(15, 26, 16, 0.7)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(34, 197, 94, 0.15)' }}
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Let&apos;s discuss your project and how I can help bring your vision to life. I&apos;m available for freelance projects and consulting work.
              </p>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-block w-full text-center px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{
                  background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                  boxShadow: '0 0 20px rgba(34,197,94,0.3)',
                }}
              >
                Schedule a Call
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
