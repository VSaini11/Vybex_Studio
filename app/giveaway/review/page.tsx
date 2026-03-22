'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Award, Ticket, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { submitFeedback } from '@/app/admin/control-center/actions';

function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    prizeWon: 'Vybex VIP Pass & Exclusive Merchandise',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitFeedback({
      ...formData,
      isWinner: true,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert('Failed to submit review. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-6 rounded-3xl bg-zinc-900/50 border border-emerald-500/20 backdrop-blur-xl"
      >
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4 shadow-emerald-400">Review Submitted!</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Thank you for sharing your experience! Your review will be featured in our Winners Gallery soon.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Return Home
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group lg:hover:scale-[1.01] transition-transform duration-700"
      >
        {/* Holographic Border Glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/20 via-emerald-500/20 to-purple-500/20 rounded-[2rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />

        <div className="relative p-8 sm:p-10 rounded-[2rem] bg-zinc-950/80 border border-white/5 backdrop-blur-[40px] shadow-2xl overflow-hidden">
          {/* Internal Grain Overlay */}
          <div className="absolute inset-0 pointer-events-none grain opacity-[0.15]" />

          {/* Focal Glows */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full" />

          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-10">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5"
              >
                <Award size={32} className="text-white" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">Chosen One's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Word</span></h1>
              <div className="h-px w-12 bg-blue-500/30 mb-2" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Share Your Vybex Journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Identity</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Achievement</label>
                  <div className="relative">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50" size={16} />
                    <input
                      required
                      type="text"
                      value={formData.prizeWon}
                      onChange={(e) => setFormData({ ...formData, prizeWon: e.target.value })}
                      className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-emerald-400 focus:outline-none focus:border-emerald-500/40 transition-all text-sm font-bold tracking-tight"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-center">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-1">Satisfaction</label>
                  <div className="flex justify-center gap-2 py-3 rounded-xl bg-black/40 border border-white/5 inline-flex w-full">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-all hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                      >
                        <Star
                          size={20}
                          className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400 animate-pulse' : 'text-zinc-800'}
                          style={{ animationDuration: '3s' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Your Story</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How does it feel to win?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/5 text-gray-300 placeholder:text-gray-800 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all resize-none text-sm leading-relaxed"
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600/90 to-emerald-600/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group mt-4 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isSubmitting ? 'Transmitting...' : 'Seal My Story'}
                {!isSubmitting && <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function GiveawayReviewPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 pointer-events-none grain opacity-30" />
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 relative">
        <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading Form...</div>}>
          <ReviewForm />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
