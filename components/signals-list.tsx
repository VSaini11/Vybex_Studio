'use client';

import { motion } from 'framer-motion';
import { Signal as SignalIcon, ArrowRight } from 'lucide-react';
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

export default function SignalsList({ signals }: { signals: SignalItem[] }) {
  if (signals.length === 0) {
    return (
      <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-[2.5rem] opacity-50">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Awaiting further transmissions...</p>
      </div>
    );
  }

  return (
    <>
      {/* Featured Signal section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 sm:mb-32"
      >
        <div className="group relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-5 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-[#0d140d]/40 border border-white/5 hover:border-green-500/20 transition-all duration-700 overflow-hidden">
          
          {/* Faded Background Glow Layer */}
          {signals[0].image && (
            <div className="absolute inset-0 pointer-events-none opacity-[0.08] blur-[100px] scale-150">
              <img 
                src={signals[0].image} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Image Left */}
          <div className="w-full lg:w-1/2 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] aspect-[16/10] sm:aspect-[4/3] relative z-10 transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] shadow-2xl shadow-black">
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
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-[10px] text-green-500/60 font-bold uppercase tracking-widest bg-green-500/5 px-3 py-1 rounded-full border border-green-500/10">
                {signals[0].readTime}
              </span>
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                {new Date(signals[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <Link href={`/signals/${signals[0].slug}`} className="group-hover:text-green-400 transition-colors">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-[1.2] tracking-tight text-white group-hover:translate-x-1 transition-transform">
                {signals[0].title}
              </h2>
            </Link>

            <p className="text-gray-500 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed line-clamp-3 max-w-xl">
              {signals[0].content.replace(/[#*`]/g, '').substring(0, 200)}...
            </p>

            <Link 
              href={`/signals/${signals[0].slug}`}
              className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-green-500 group-hover:gap-5 transition-all w-fit"
            >
              Synchronize Signal
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Recent Articles Grid */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-4">
            Latest Intel
            <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-green-500/50 to-transparent" />
          </h2>
          <div className="hidden sm:block text-[10px] font-black bg-white/5 px-4 py-2 rounded-full border border-white/10 text-gray-500 uppercase tracking-[0.2em]">
            Archive // {signals.length - 1} Signals
          </div>
        </div>

        {signals.length <= 1 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-[2.5rem] opacity-50">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Awaiting further transmissions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {signals.slice(1).map((signal, index) => (
              <motion.div
                key={signal._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white/[0.01] hover:bg-white/[0.02] p-4 rounded-[2.5rem] border border-transparent hover:border-white/5 transition-all duration-500"
              >
                {/* Image Card Style */}
                <Link href={`/signals/${signal.slug}`} className="block overflow-hidden rounded-[2rem] aspect-[16/10] mb-6 border border-white/5 relative group shadow-xl">
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
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">
                    {new Date(signal.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                  </span>
                  <span className="text-[9px] text-green-500/50 font-bold uppercase tracking-widest">
                    {signal.readTime}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <div className="px-2 flex-1 flex flex-col">
                  <Link href={`/signals/${signal.slug}`}>
                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
                      {signal.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-xs mb-6 line-clamp-3 leading-relaxed">
                    {signal.content.replace(/[#*`]/g, '').substring(0, 120)}...
                  </p>

                  <Link 
                    href={`/signals/${signal.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 group-hover:translate-x-1 transition-all"
                  >
                    Synchronize
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
