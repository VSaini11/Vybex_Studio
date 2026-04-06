'use client';

import { motion } from 'framer-motion';
import { Signal as SignalIcon, Calendar, Clock, User, ChevronLeft, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { MarkdownRenderer } from '@/components/markdown-renderer';

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

export default function SignalDetailClient({ 
  signal, 
  moreSignals 
}: { 
  signal: SignalItem; 
  moreSignals: SignalItem[] 
}) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#080d08] text-[#d4e8d4] font-sans selection:bg-green-500/30 pb-20">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-green-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 pt-36 pb-4 z-20">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            href="/signals" 
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-500/80 hover:text-green-400 transition-colors"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Signals
          </Link>
        </motion.div>
      </div>

      {/* Hero Header */}
      <header className="relative h-[50vh] sm:h-[60vh] min-h-[350px] sm:min-h-[400px] w-full overflow-hidden">
        {signal.image ? (
          <>
            {/* Immersive Background Blur Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-20 blur-[120px] scale-150 z-0">
               <img src={signal.image} alt="" className="w-full h-full object-cover" />
            </div>
            
            <img src={signal.image} alt={signal.title} className="w-full h-full object-cover brightness-[0.4] relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d08] via-[#080d08]/60 to-transparent z-20" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#111811] to-[#080d08]" />
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-20 max-w-5xl mx-auto z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-4">
               <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                 <Clock size={12} className="text-green-500/50" />
                 {signal.readTime}
               </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] sm:leading-[1.1]">
              {signal.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-6 sm:pt-8 mt-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center overflow-hidden shrink-0">
                  <User size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{signal.author}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <Calendar size={12} />
                    {new Date(signal.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleShare}
                className="flex items-center justify-center sm:w-auto w-full gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                title="Share Signal"
              >
                <Share2 size={16} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Share Transmission</span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-green max-w-none"
        >
          <MarkdownRenderer content={signal.content} />
        </motion.div>

        {/* Footer of the article */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
               <SignalIcon size={20} className="text-green-500" />
             </div>
             <span className="font-bold tracking-tighter text-base sm:text-lg">Broadcast Complete // Vybex Signals</span>
           </div>
           
           <Link 
            href="/signals"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-black uppercase tracking-[0.2em] text-[10px] w-full sm:w-auto"
           >
             Read More Signals
             <ArrowRight size={14} />
           </Link>
        </div>
      </main>

      {/* More Signals Section */}
      {moreSignals.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Recent Syncs</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Latest platform transmissions</p>
            </div>
            <Link href="/signals" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors bg-green-500/5 px-4 py-2 rounded-full border border-green-500/10 w-fit">
              View All Signals
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {moreSignals.map((s) => (
              <Link 
                key={s._id} 
                href={`/signals/${s.slug}`}
                className="group flex flex-col sm:flex-row gap-6 p-5 sm:p-6 rounded-[2rem] bg-[#0d140d]/80 border border-white/5 hover:border-green-500/20 transition-all relative overflow-hidden"
              >
                <div className="w-full sm:w-32 h-40 sm:h-32 rounded-2xl overflow-hidden bg-gray-900 border border-white/5 flex-shrink-0">
                  {s.image ? (
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-500/5">
                      <SignalIcon size={24} className="text-green-500/20" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={10} />
                      {s.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                       {new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
                    {s.title}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                  <SignalIcon size={48} strokeWidth={1} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
