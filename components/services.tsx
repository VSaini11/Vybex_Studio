'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAutoSlide } from '@/hooks/useAutoSlide';
import { Code, Palette, Zap } from 'lucide-react';

export function Services() {
  const { ref, isInView } = useScrollAnimation();

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern, scalable web applications built with React, Next.js, and TypeScript. Full-stack solutions that perform.',
      gradient: 'from-green-400 to-emerald-500',
      glow: 'rgba(34,197,94,0.2)',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, user-centered designs that convert. From wireframes to prototypes, I create experiences that matter.',
      gradient: 'from-emerald-400 to-teal-500',
      glow: 'rgba(52,211,153,0.2)',
    },
    {
      icon: Zap,
      title: 'Branding & Strategy',
      description: 'Building your digital identity. Logo design, brand guidelines, and strategic positioning that sets you apart.',
      gradient: 'from-teal-400 to-green-500',
      glow: 'rgba(45,212,191,0.2)',
    },
  ];

  const { scrollRef, activeIndex } = useAutoSlide(services.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Services</h2>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #4ade80, #22c55e)' }} />
          <p className="text-gray-400 text-sm sm:text-lg mt-6 max-w-2xl mx-auto">
            A full range of digital services to help you build, design, and grow your online presence.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl p-7 overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(15, 26, 16, 0.7)',
                  border: '1px solid rgba(34, 197, 94, 0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: 'left' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow}, transparent 70%)` }}
                />
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm flex-grow leading-relaxed">{service.description}</p>
                <motion.div
                  className="mt-5 inline-flex items-center text-green-400 text-sm font-semibold"
                  whileHover={{ x: 5 }}
                >
                  Learn more →
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile horizontal auto-slide */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85vw] snap-center group relative rounded-2xl p-6 overflow-hidden flex flex-col"
                  style={{
                    background: 'rgba(15, 26, 16, 0.7)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`}
                  />
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm flex-grow leading-relaxed">{service.description}</p>
                  <div className="mt-4 inline-flex items-center text-green-400 text-sm font-semibold">
                    Learn more →
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {services.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex ? '#4ade80' : 'rgba(255,255,255,0.15)',
                  transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
