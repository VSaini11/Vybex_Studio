'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowRight, Brain, Zap, Globe, Sparkles, Database, BarChart3, Fingerprint, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useScroll, useTransform } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function EcosystemPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle background grain */}
      <div className="fixed inset-0 pointer-events-none grain opacity-20" />
      
      <Navbar />

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 px-4 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-bold tracking-widest uppercase mb-6">
              The Vybex Network
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight">
              One Unified <span className="text-green-400">Ecosystem</span><br />
              Infinite Possibilities.
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              From creative strategy to artificial intelligence and predictive engines, Vybex spans the entire digital spectrum to build the future of intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Evolution Flow Section ─────────────────────────────── */}
      <EcosystemFlow />

      

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-[40px] p-10 sm:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          
          <h2 className="text-3xl sm:text-5xl font-black mb-8 relative z-10">
            Ready to be part of the<br />
            <span className="text-green-400">Vybex Ecosystem?</span>
          </h2>
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-black font-bold text-lg relative z-10"
          >
            Start Your Journey <ArrowRight size={20} />
          </motion.a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function EcosystemFlow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const flowNodes = [
    { id: 'studio', label: 'Vybex Studio', icon: <Sparkles className="w-5 h-5" />, desc: 'The Origin: Creative Strategy' },
    { id: 'ai', label: 'Vybex AI', icon: <Brain className="w-5 h-5" />, desc: 'The Evolution: Intelligence Layer' },
    { id: 'dna', label: 'Vybex DNA', icon: <Fingerprint className="w-5 h-5" />, desc: 'The Future: Prediction Engine' },
  ];

  return (
    <section ref={containerRef} className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div style={{ opacity }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Evolutionary <span className="text-green-400">Roadmap</span></h2>
          <p className="text-gray-500">Mapping the genetic progression of the Vybex Ecosystem.</p>
        </motion.div>

        <div className="relative w-full flex flex-col items-center gap-24">
          {/* Central Path SVG */}
          <div className="absolute inset-0 flex justify-center pointer-events-none" style={{ zIndex: 0 }}>
             <svg width="2" height="100%" className="h-full">
                <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="8 8" />
                <motion.line 
                  x1="1" y1="0" x2="1" y2="100%" 
                  stroke="#22c55e" 
                  strokeWidth="2" 
                  style={{ pathLength }} 
                />
             </svg>
          </div>

          {flowNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative z-10 flex items-center gap-8 w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`flex-1 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 backdrop-blur-sm hover:border-green-500/30 transition-all group ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase mb-2 block">Phase 0{index + 1}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">{node.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{node.desc}</p>
                </div>
              </div>

              {/* Central Node Dot */}
              <div className="relative flex items-center justify-center w-12 h-12">
                 <div className="absolute inset-0 bg-green-500/20 blur-md rounded-full" />
                 <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-black z-10" />
                 <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border border-green-500/50 rounded-full" 
                 />
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection({ 
  id,
  title, 
  subtitle, 
  description, 
  features, 
  imageChild,
  icon,
  gradient,
  reversed = false 
}: { 
  id: string,
  title: string, 
  subtitle: string, 
  description: string, 
  features: {title: string, desc: string}[],
  imageChild: React.ReactNode,
  icon: React.ReactNode,
  gradient: string,
  reversed?: boolean
}) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id={id} ref={ref} className="py-20 sm:py-32 px-4 border-t border-white/5">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Text Content */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={reversed ? 'lg:order-2' : ''}
        >
          <motion.div variants={itemVariants} className="mb-4">
             {icon}
          </motion.div>
          <motion.span variants={itemVariants} className="text-green-400 text-xs font-bold tracking-[0.2em] mb-3 block">
            {subtitle}
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-black mb-6">
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-10 leading-relaxed">
            {description}
          </motion.p>
          
          <div className="space-y-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors group">
                 <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <Zap className="w-5 h-5 text-green-400" />
                 </div>
                 <div>
                    <h3 className="text-white font-bold mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className={`relative ${reversed ? 'lg:order-1' : ''}`}
        >
           <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-[80px] rounded-full opacity-40`} />
           {imageChild}
        </motion.div>

      </div>
    </section>
  );
}
