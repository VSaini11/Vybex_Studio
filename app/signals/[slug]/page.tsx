'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Signal as SignalIcon, Calendar, Clock, User, ChevronLeft, Share2, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getSignalBySlug, getSignals } from '../../admin/signals/actions';
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

export default function SignalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [signal, setSignal] = useState<SignalItem | null>(null);
  const [moreSignals, setMoreSignals] = useState<SignalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getSignalBySlug(slug);
      if (result.success && result.signal) {
        setSignal(result.signal);
        
        // Load more signals for recommendation
        const allResult = await getSignals();
        if (allResult.success && allResult.signals) {
          setMoreSignals(allResult.signals.filter((s: SignalItem) => s.slug !== slug).slice(0, 2));
        }
      }
      setIsLoading(false);
    }
    loadData();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080d08] flex items-center justify-center">
        <Loader2 className="animate-spin text-green-500" size={48} strokeWidth={1} />
      </div>
    );
  }

  if (!signal) {
    return (
      <div className="min-h-screen bg-[#080d08] text-[#d4e8d4] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <SignalIcon size={40} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Signal Lost</h1>
        <p className="text-gray-500 mb-8 max-w-md">The transmission you are looking for does not exist or has been terminated.</p>
        <Link href="/signals" className="px-6 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
          Return to Signals
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d08] text-[#d4e8d4] font-sans selection:bg-green-500/30 pb-20">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-green-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 pt-10 pb-4 z-20">
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
      <header className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {signal.image ? (
          <>
            <img src={signal.image} alt={signal.title} className="w-full h-full object-cover brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d08] via-[#080d08]/40 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#111811] to-[#080d08]" />
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                 <Clock size={12} className="text-green-500/50" />
                 {signal.readTime}
               </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {signal.title}
            </h1>

            <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center overflow-hidden">
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
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                title="Share Signal"
              >
                <Share2 size={20} className="text-gray-400 group-hover:text-green-500 transition-colors" />
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
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-2">
             <SignalIcon size={24} className="text-green-500" />
             <span className="font-bold tracking-tighter text-lg">Broadcast Complete // Vybex Signals</span>
           </div>
           
           <Link 
            href="/signals"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-[10px]"
           >
             Read More Signals
             <ArrowRight size={14} />
           </Link>
        </div>
      </main>

      {/* More Signals Section */}
      {moreSignals.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Recent Synchronizations</h2>
            <Link href="/signals" className="text-xs font-bold uppercase tracking-widest text-green-500 hover:underline">
              View All Signals
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {moreSignals.map((s) => (
              <Link 
                key={s._id} 
                href={`/signals/${s.slug}`}
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-[#0d140d]/80 border border-white/5 hover:border-green-500/20 transition-all"
              >
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-gray-900 flex-shrink-0">
                  {s.image ? (
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SignalIcon size={24} className="text-gray-700" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-green-500 font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Clock size={10} />
                    {s.readTime}
                  </span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
                    {s.title}
                  </h3>
                  <div className="text-xs text-gray-500 font-medium">Broadcasted on {new Date(s.createdAt).toLocaleDateString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
