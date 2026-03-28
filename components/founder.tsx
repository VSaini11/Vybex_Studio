'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Twitter, Linkedin, ExternalLink, Zap, Target, Cpu } from 'lucide-react';

const expertisePills = [
  { name: 'Web Architecture', icon: <Cpu size={14} /> },
  { name: 'UI/UX Design', icon: <Target size={14} /> },
  { name: 'Growth Strategy', icon: <Zap size={14} /> },
];

const socialLinks = [
  { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/vaibhav-saini-522398252/', label: 'LinkedIn' },
];

export function Founder() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section id="founder" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Image Side */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative group">
            <div className="absolute -inset-3 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="relative aspect-[4/5] max-w-[360px] mx-auto overflow-hidden rounded-[1.8rem] border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-xl shadow-black/40">
              <Image 
                src="/founder.jpg" 
                alt="Vaibhav Saini - Founder" 
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 360px"
                priority
              />
              
              {/* Glass overlay with label */}
              <div className="absolute bottom-5 left-5 right-5 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
                <p className="text-white font-medium text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Building Vybex Studio
                </p>
              </div>
            </div>
          </motion.div>

          {/* Details Side */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              <motion.span 
                variants={itemVariants}
                className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-500/10 text-green-400 border border-green-500/20 mb-3"
              >
                The Visionary
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                Vaibhav <span className="text-green-400 italic">Saini</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-medium">
                Founder & Lead Architect
              </motion.p>
            </div>

            <motion.p 
              variants={itemVariants}
              className="text-base text-gray-400 leading-relaxed max-w-xl"
            >
              Passionate about bridging the gap between imagination and execution. I specialize in building high-performance digital products that don&apos;t just look beautiful but solve real business challenges. Through Vybex Studio, I help startups scale with cutting-edge technology and conversion-focused design.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">Core Expertise</h3>
              <div className="flex flex-wrap gap-2.5">
                {expertisePills.map((skill, i) => (
                  <div 
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-gray-300 text-xs hover:border-green-500/30 transition-colors"
                  >
                    <span className="text-green-400">{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 flex items-center gap-5">
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, color: '#4ade80' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <motion.a
                href="mailto:vaibhavsaini709@gmail.com"
                whileHover={{ gap: '10px' }}
                className="flex items-center gap-2 group text-xs font-bold text-white uppercase tracking-wider"
              >
                Work with me
                <ExternalLink size={14} className="text-green-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
