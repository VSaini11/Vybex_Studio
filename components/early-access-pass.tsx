'use client';

import { motion } from 'framer-motion';
import { Ticket, Unlock, Sparkles, Star, CalendarClock, Gift } from 'lucide-react';
import { CountdownTimer } from './countdown-timer';

export function EarlyAccessPass({ 
  isActive = true, 
  nextDrawDate = new Date('2026-03-22T18:00:00+05:30'),
  prizeDescription = 'Vybex VIP Pass'
}: { 
  isActive?: boolean;
  nextDrawDate?: Date;
  prizeDescription?: string;
}) {
  if (!isActive) {
    return (
      <section className="relative w-full overflow-hidden py-24 sm:py-32 border-y border-white/5 bg-[#050505] min-h-[600px] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full" 
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">Next Drop Preparation</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Brilliant</span> Is Coming
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The Vybex VIP giveaway is currently transitioning to the next phase. Our algorithms are preparing the next batch of exclusive rewards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="flex -space-x-3 items-center mb-4 sm:mb-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-500 to-purple-500' : 'from-emerald-500 to-teal-500'} opacity-50`} />
                </div>
              ))}
              <div className="pl-6 text-sm text-gray-500 font-medium">1,200+ Subscribed for the next drop</div>
            </div>
          </motion.div>
          
          {/* Decorative element */}
          <div className="mt-20 w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 border-y border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left: Info */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Limited Opportunity</span>
            </motion.div>
            
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Win the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-sm">{prizeDescription}</span> 🎫
              </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400 mb-8 max-w-lg"
            >
              Random subscribers will be selected to receive a unique code. Use this code to unlock exceptional value and exclusive access.
            </motion.p>
            
            <div className="space-y-4 w-full max-w-md">
              {[
                { icon: Unlock, text: "Use future paid features for free" },
                { icon: Star, text: "Get early access before public release" },
                { icon: Gift, text: "Be part of exclusive Vybex drops" },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={18} className="text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 w-fit"
            >
              <CalendarClock className="text-blue-400" size={28} />
              <div className="text-left">
                <p className="text-[11px] text-blue-300/70 mb-0.5 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Results Announcement
                </p>
                  <CountdownTimer targetDate={nextDrawDate} />
              </div>
            </motion.div>
          </div>

          {/* Right: The Pass UI */}
          <div className="lg:w-1/2 flex justify-center w-full mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative w-full max-w-[380px] aspect-[1/1.4]"
              style={{ perspective: "1000px" }}
            >
              <motion.div 
                className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-white/5 p-[1px] shadow-2xl shadow-blue-500/20"
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 rounded-[2rem] bg-zinc-950/90 backdrop-blur-xl flex flex-col overflow-hidden">
                  
                  {/* Glowing header of the ticket */}
                  <div className="relative h-36 bg-gradient-to-br from-blue-600/90 to-purple-800/90 p-7 flex flex-col justify-between overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
                    
                    <div className="flex justify-between items-start relative z-10">
                      <Ticket className="text-white" size={28} />
                      <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 shadow-inner">
                        VIP Access
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-white tracking-widest mb-1 shadow-black drop-shadow-md">VYBEX</h3>
                      <p className="text-[10px] text-white/70 uppercase tracking-[0.3em] font-medium">VIP Pass</p>
                    </div>
                  </div>

                  {/* Body of the ticket */}
                  <div className="flex-1 p-7 flex flex-col justify-between relative bg-gradient-to-b from-transparent to-black/40">
                    <div className="w-full h-px bg-white/10 absolute top-0 left-0 border-t border-dashed border-white/20" />
                    
                    <div className="space-y-7 mt-2">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Privilege Level</p>
                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{prizeDescription}</p>
                      </div>

                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Secret Code</p>
                        <div className="h-12 w-full bg-black/50 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-inner">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          <span className="text-xl font-mono text-white/20 tracking-[0.25em] blur-[3px] select-none">XXXX-XXXX</span>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                            <span className="text-xs text-blue-400 font-medium tracking-widest uppercase">Hidden</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5 opacity-40">
                        <div className="flex gap-[3px]">
                          {Array.from({length: 12}).map((_, i) => (
                            <div key={i} className="w-1 h-8 bg-white rounded-full" style={{ opacity: Math.random() * 0.5 + 0.2, height: `${Math.random() * 16 + 16}px` }} />
                          ))}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px] shadow-lg shadow-blue-500/20">
                        <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 text-lg font-black italic">V</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ticket cutouts */}
                  <div className="absolute top-36 -left-4 w-8 h-8 rounded-full bg-[#050505] border-r border-white/10 shadow-inner" />
                  <div className="absolute top-36 -right-4 w-8 h-8 rounded-full bg-[#050505] border-l border-white/10 shadow-inner" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
