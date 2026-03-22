'use client';

import { motion } from 'framer-motion';
import { Award, Quote, Star } from 'lucide-react';

function ReviewCard({ review, index = 0 }: { review: any; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-emerald-500/20 transition-all hover:bg-zinc-900/50 h-full"
    >
      <div className="absolute -top-3 -right-3 w-12 h-12 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
        <Quote className="text-emerald-500/40" size={20} />
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-white text-xs">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{review.name}</p>
          <p className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-widest flex items-center gap-1">
             Verified Winner
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed italic mb-4">
        "{review.message}"
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Prize: {review.prizeWon || 'VIP Pass'}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={10} className={j < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function WinnersCircle({ winnerReviews = [] }: { winnerReviews?: any[] }) {
  if (!winnerReviews || winnerReviews.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4"
          >
            <Award size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Winners' Circle</span>
          </motion.div>
          <h3 className="text-3xl font-black text-white tracking-tight">Voices of the <span className="text-emerald-400">Chosen</span></h3>
        </div>

        {winnerReviews.length > 3 ? (
          <div className="overflow-hidden relative">
            <style>{`
              @keyframes winners-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .winners-mq-track {
                display: flex;
                width: max-content;
                animation: winners-marquee 40s linear infinite;
              }
              .winners-mq-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="winners-mq-track py-4">
              {[...winnerReviews, ...winnerReviews].map((review, i) => (
                <div key={i} className="px-3 w-[350px] flex-shrink-0">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winnerReviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
