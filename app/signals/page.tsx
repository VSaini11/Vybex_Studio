'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Signal as SignalIcon, Calendar, Clock, ArrowRight, User, Loader2, Sparkles } from 'lucide-react';
import { getSignals } from '../admin/signals/actions';
import Link from 'next/link';

interface SignalItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
  category: string;
  createdAt: string;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<SignalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSignals() {
      const result = await getSignals();
      if (result.success && result.signals) {
        setSignals(result.signals);
      }
      setIsLoading(false);
    }
    loadSignals();
  }, []);

  return (
    <div className="min-h-screen bg-[#080d08] text-[#d4e8d4] font-sans selection:bg-green-500/30 overflow-hidden relative">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        

        {/* Featured Signal section (only if signals exist) */}
        {!isLoading && signals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="group relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-6 sm:p-10 rounded-[3rem] bg-[#0d140d]/40 border border-white/5 hover:border-green-500/20 transition-all duration-700">
              {/* Image Left */}
              <div className="w-full lg:w-1/2 overflow-hidden rounded-[2.5rem] aspect-[4/3] relative">
                {signals[0].image ? (
                  <img 
                    src={signals[0].image} 
                    alt={signals[0].title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-500/10 to-transparent flex items-center justify-center">
                    <SignalIcon size={64} className="text-green-500/20" strokeWidth={1} />
                  </div>
                )}
              </div>

              {/* Content Right */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    {signals[0].readTime}
                  </span>
                </div>

                <Link href={`/signals/${signals[0].slug}`} className="group-hover:text-green-400 transition-colors">
                  <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-[1.1] tracking-tight text-white">
                    {signals[0].title}
                  </h2>
                </Link>

                <p className="text-gray-500 text-lg mb-10 leading-relaxed line-clamp-3 max-w-xl">
                  {signals[0].content.replace(/[#*`]/g, '').substring(0, 200)}...
                </p>

                <Link 
                  href={`/signals/${signals[0].slug}`}
                  className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-green-500 group-hover:gap-5 transition-all"
                >
                  Synchronize Signal
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Articles Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black tracking-tight flex items-center gap-4">
              Latest Intel
              <div className="h-px w-24 bg-gradient-to-r from-green-500/50 to-transparent" />
            </h2>
          </div>

          {!isLoading && signals.length <= 1 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-[2.5rem] opacity-50">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Awaiting further transmissions...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {signals.slice(1).map((signal, index) => (
                <motion.div
                  key={signal._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col h-full"
                >
                  {/* Image Card Style */}
                  <Link href={`/signals/${signal.slug}`} className="block overflow-hidden rounded-[2rem] aspect-[16/10] mb-8 border border-white/5 relative group">
                    {signal.image ? (
                      <img 
                        src={signal.image} 
                        alt={signal.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                        <SignalIcon size={32} className="text-white/10" strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Link>

                  {/* Metadata above title */}
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                      {new Date(signal.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="px-2 flex-1 flex flex-col">
                    <Link href={`/signals/${signal.slug}`}>
                      <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
                        {signal.title}
                      </h3>
                    </Link>

                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {signal.content.replace(/[#*`]/g, '').substring(0, 140)}...
                    </p>

                    <Link 
                      href={`/signals/${signal.slug}`}
                      className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 group-hover:translate-x-1 transition-all"
                    >
                      Read Signal
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Never miss a signal.</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get the latest platform updates and ecosystem news delivered straight to your inbox.</p>
          <Link 
            href="/"
            className="px-8 py-4 rounded-2xl bg-green-500 text-black font-black uppercase tracking-widest hover:bg-green-400 transition-all hover:scale-105 inline-block shadow-xl shadow-green-500/20"
          >
            Subscribe to Vybex
          </Link>
        </motion.div>

      </div>
      
      {/* Bottom Helix Visualization (Inspired by layout) */}
      <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#080d08] to-transparent pointer-events-none z-0" />
    </div>
  );
}
